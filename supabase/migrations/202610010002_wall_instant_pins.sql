-- Run this single update on an existing wall database. Includes the drawing-studio upgrade.
begin;
alter table public.wall_notes drop constraint if exists wall_notes_color_check;
alter table public.wall_notes add constraint wall_notes_color_check check(color in ('#7e22ce','#dc2626','#059669','#0284c7','#d97706','#db2777','#4f46e5','#0d9488','#be123c','#7c3aed','#ea580c','#16a34a','#4d2b80','#145a75','#7a254d','#79561d','#245645'));
alter table public.wall_notes drop constraint if exists wall_notes_message_check;
-- Retain older 201-220 character notes; new submissions are limited to 200 by the RPC.
alter table public.wall_notes add constraint wall_notes_message_check check(char_length(btrim(message)) <= 220 and (char_length(btrim(message)) > 0 or drawing is not null));
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
     or p_message is null or char_length(btrim(p_message)) > 200 or (char_length(btrim(p_message))=0 and p_drawing is null)
     or p_color is null or p_color not in ('#7e22ce','#dc2626','#059669','#0284c7','#d97706','#db2777','#4f46e5','#0d9488','#be123c','#7c3aed','#ea580c','#16a34a','#4d2b80','#145a75','#7a254d','#79561d','#245645') then
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
       or substring(image_bytes from 17 for 8) not in (decode('0000032000000168','hex'),decode('0000038400000258','hex')) then
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
  insert into public.wall_notes(user_id,author_name,message,color,drawing,approved)
  values(caller,btrim(p_name),btrim(p_message),p_color,p_drawing,true) returning * into saved;
  return saved;
end;
$$;
revoke all on function public.submit_wall_note(text,text,text,text) from public,anon;
grant execute on function public.submit_wall_note(text,text,text,text) to authenticated;
alter table public.wall_notes alter column approved set default true;
-- Visitor submissions are intended for the public wall; publish earlier queued pins too.
update public.wall_notes set approved=true where approved=false;
create or replace function public.wall_api_version() returns integer language sql immutable set search_path='' as $$ select 3 $$;
revoke all on function public.wall_api_version() from public;
grant execute on function public.wall_api_version() to anon,authenticated;
notify pgrst, 'reload schema';
commit;
