-- Run once in the Supabase SQL editor as the project owner.
begin;
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table if not exists public.wall_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null check(char_length(btrim(author_name)) between 2 and 40),
  message text not null check(char_length(btrim(message)) between 1 and 220),
  color text not null check(color in ('#4d2b80','#145a75','#7a254d','#79561d','#245645')),
  drawing text check(drawing is null or (char_length(drawing)<=200000 and drawing ~ '^data:image/png;base64,[A-Za-z0-9+/]+={0,2}$')),
  created_at timestamptz not null default now(),
  approved boolean not null default false
);
create index if not exists wall_notes_public_order on public.wall_notes(created_at desc) where approved;
create index if not exists wall_notes_owner on public.wall_notes(user_id,created_at desc);
alter table public.wall_notes enable row level security;
revoke all on public.wall_notes from public,anon,authenticated;
grant select on public.wall_notes to anon,authenticated;
grant delete on public.wall_notes to authenticated;
drop policy if exists wall_read on public.wall_notes;
create policy wall_read on public.wall_notes for select to anon,authenticated using (approved or user_id=(select auth.uid()));
drop policy if exists wall_delete_own on public.wall_notes;
create policy wall_delete_own on public.wall_notes for delete to authenticated using(user_id=(select auth.uid()));
-- No direct insert/update grants: publishing and identity can only be set by this RPC.

create table if not exists private.wall_submission_log(
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
create index if not exists wall_submission_log_user_time on private.wall_submission_log(user_id,created_at desc);
revoke all on private.wall_submission_log from public,anon,authenticated;

create or replace function public.submit_wall_note(p_name text,p_message text,p_color text,p_drawing text default null)
returns public.wall_notes language plpgsql security definer set search_path='' as $$
declare
  caller uuid:=auth.uid();
  image_bytes bytea;
  saved public.wall_notes;
begin
  if caller is null or coalesce(auth.jwt()->'app_metadata'->>'provider','') not in ('google','github') then
    raise exception 'Sign-in required' using errcode='42501';
  end if;
  if not exists(select 1 from auth.users where id=caller and email_confirmed_at is not null) then
    raise exception 'Verified account required' using errcode='42501';
  end if;
  if p_name is null or char_length(btrim(p_name)) not between 2 and 40
     or p_message is null or char_length(btrim(p_message)) not between 1 and 220
     or p_color is null or p_color not in ('#4d2b80','#145a75','#7a254d','#79561d','#245645') then
    raise exception 'Invalid note' using errcode='22023';
  end if;
  if p_drawing is not null then
    if char_length(p_drawing)>200000 or p_drawing !~ '^data:image/png;base64,[A-Za-z0-9+/]+={0,2}$' then
      raise exception 'Invalid drawing' using errcode='22023';
    end if;
    image_bytes:=decode(substring(p_drawing from 23),'base64');
    -- Only canvas-sized PNGs; reject other formats and oversized image headers.
    if octet_length(image_bytes)<24 or octet_length(image_bytes)>150000
       or substring(image_bytes from 1 for 8)<>decode('89504e470d0a1a0a','hex')
       or substring(image_bytes from 13 for 4)<>decode('49484452','hex')
       or substring(image_bytes from 17 for 8)<>decode('0000032000000168','hex') then
      raise exception 'Invalid drawing dimensions' using errcode='22023';
    end if;
  end if;
  -- Serialize submissions for a user so concurrent requests cannot bypass limits.
  perform pg_advisory_xact_lock(hashtextextended(caller::text,0));
  if (select count(*) from private.wall_submission_log where user_id=caller and created_at>now()-interval '10 minutes')>=3
     or (select count(*) from private.wall_submission_log where user_id=caller and created_at>now()-interval '24 hours')>=10 then
    raise exception 'Posting limit reached' using errcode='P0001';
  end if;
  insert into private.wall_submission_log(user_id) values(caller);
  insert into public.wall_notes(user_id,author_name,message,color,drawing)
  values(caller,btrim(p_name),btrim(p_message),p_color,p_drawing) returning * into saved;
  return saved;
end;
$$;
revoke all on function public.submit_wall_note(text,text,text,text) from public,anon;
grant execute on function public.submit_wall_note(text,text,text,text) to authenticated;
commit;
