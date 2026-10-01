# Connect login, the visitor wall, and contact email

The site stays compatible with its existing static deployment. Supabase supplies the authentication and database backend; Formspree delivers contact messages. No service-role key or OAuth secret belongs in browser code. External sign-in and delivery remain unavailable until the following account setup is completed.

## 1. Fill `.env.local`

The `.env.local` file is prepared beside `package.json`. Copy the following public settings from your accounts, then restart the development server. For production, add the same settings in the hosting dashboard and rebuild: Next.js embeds `NEXT_PUBLIC_` settings at build time.

| Setting | Where to get it |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project → Connect → Project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase project → Settings → API Keys → Publishable key (`sb_publishable_…`); a legacy **anon** key is also supported |
| `NEXT_PUBLIC_FORMSPREE_FORM_ID` | Formspree → your form → Integration → ID from `https://formspree.io/f/ID` |
| `NEXT_PUBLIC_BOOKING_URL` | Optional: your public Cal.com or Calendly booking page |

The Supabase publishable key is intentionally public; the database policies enforce access. **Do not paste a `service_role`, `sb_secret_…`, Google client secret, or GitHub client secret into a `NEXT_PUBLIC_` variable.** `.env.local` is ignored by Git.

Only the first two settings are needed for wall authentication. Formspree is for the contact form; the booking link is optional. Filling those two values alone does not enable OAuth: complete the database, redirect, and provider steps below too. Never paste provider secrets into a chat or commit them to Git.

## 2. Create the Supabase database

1. Create a project at [Supabase](https://supabase.com/dashboard).
2. Open SQL Editor and run `supabase/migrations/202609300001_visitor_wall.sql` if this is a new database. Then run **`supabase/migrations/202610010002_wall_instant_pins.sql`**. For an existing wall, run only that latest update: it includes the drawing-studio upgrade, accepts all 12 colors and 900�600 drawings, and publishes new pins immediately. Previously queued visitor notes become public too. Existing notes and ownership policies are preserved. No OAuth or environment changes are needed.

   Check the connection afterward with `node scripts/check-wall-backend.mjs`. A `ready: true` response confirms the database update is installed; this read-only check does not submit a note.

3. In Authentication → URL Configuration, set **Site URL** to your production site URL. Add these exact Redirect URLs:
   - `http://localhost:3000/wall/` for local development.
   - `https://YOUR-DOMAIN/wall/` for production.
4. Keep the redirect allowlist specific. Use a separate development project if you do not want localhost permitted in production.

For development before you have a domain, use `http://localhost:3000` as the Site URL. Update it to your HTTPS production origin before launch. Keep new user sign-ups enabled so first-time OAuth visitors can create an account. Leave unused sign-in providers disabled.

### The two different redirects

| Configure this in | Exact destination |
| --- | --- |
| Google Authorized redirect URIs and GitHub Authorization callback URL | `https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback` — copy this from the Supabase provider screen |
| Supabase Authentication → URL Configuration → Redirect URLs | `http://localhost:3000/wall/` and your deployed `https://YOUR-DOMAIN/wall/` |

This project uses hosted Supabase even when the portfolio runs on localhost. Do **not** use the CLI's localhost:54321 callback for this setup. The browser client automatically exchanges the PKCE code on `/wall/`; you do not need to create another Next.js callback endpoint. Start and finish login in the same browser, using the same host (`localhost` and `127.0.0.1` are different).

## 3. Google login

1. Open [Google Auth Platform](https://console.cloud.google.com/auth/overview) and create/select a project.
2. Configure Branding, Audience, and support/contact email. While the application is in Testing, add the Google accounts you will test with. Publish the consent configuration when you want general access.
3. Create an OAuth client of type **Web application** under Clients.
4. Add JavaScript origins `http://localhost:3000` and your production origin.
5. Add the exact callback URI shown by Supabase → Authentication → Sign In / Providers → Google. For a hosted project it is `https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback` (this differs from the portfolio `/wall/` redirect).
6. Copy the Google Client ID and Client Secret into that **Supabase Google provider screen**, enable the provider, and save. Do not put those secrets in the portfolio environment file.
7. Request only the standard identity scopes (`openid`, email, profile). This wall does not need access to Google Drive, Gmail, or other Google data.

Official guide: [Supabase Google authentication](https://supabase.com/docs/guides/auth/social-login/auth-google).

## 4. GitHub login

1. Open [GitHub Developer Settings → OAuth Apps](https://github.com/settings/developers) → New OAuth App.
2. Set the homepage URL to your portfolio and the authorization callback URL to the exact Supabase callback above.
3. Register the app and generate a client secret.
4. Paste the Client ID and Client Secret into Supabase → Authentication → Sign In / Providers → GitHub. Enable and save.
5. The portfolio requests sign-in only, not access to visitors' repositories.

Leave GitHub's **Enable Device Flow** unchecked. For a local-only first setup, the Homepage URL can be `http://localhost:3000`; the callback still points to hosted Supabase. Use a GitHub account with a verified email address.

Official guide: [Supabase GitHub authentication](https://supabase.com/docs/guides/auth/social-login/auth-github).

## 5. Receive contact messages directly

1. Create an account at [Formspree](https://formspree.io/) using the email where you want submissions delivered.
2. Create a form, select **puneetsaxena168@gmail.com** (or your chosen verified email) as its notification recipient, and complete email verification.
3. Copy only the form ID into `NEXT_PUBLIC_FORMSPREE_FORM_ID` and restart/rebuild.
4. In Formspree, enable its spam protection and restrict allowed submission domains to your production domain. Add localhost only for testing if your plan/settings support it. Keep CAPTCHA protection enabled if offered. The built-in honeypot is additional filtering, not a replacement for the service's protections.
5. Submit a test message yourself after setup and confirm it arrives. Check spam folders if needed. Service quotas and delivery settings are managed in Formspree.

The form sends name, email, selected topic, message, and consent to Formspree. It shows success only after an accepted response; network failures keep the entered message available. The recipient is configured in Formspree, not accepted from the visitor. No email service secret is exposed.

Official guide: [Formspree AJAX submissions](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax/).

## 6. Maintain the wall

- New visitor notes are **public immediately**. There is no approval queue. Only actual saved visitor notes appear; sample cards are not included.
- Pins are public immediately. Visitors can remove only their own notes; the site owner can remove unwanted content in Supabase Table Editor. The legacy `approved` column stays for compatibility and the posting function sets it to true.
- The posting function derives ownership from the verified session. Callers cannot choose another owner, modify existing content, or write directly to the table.
- PostgreSQL enforces 3 submissions per 10 minutes and 10 per 24 hours per account. Deleting a note does not reset that limit. Concurrent requests for one account are serialized.
- Names/messages have server-side length limits. New messages have a 200-character limit; a pin needs text or a drawing. Drawings are PNG only, with a 150 KB decoded cap and the exact 900×600 studio dimensions (legacy 800×360 drawings remain supported). React displays text without injecting HTML. No arbitrary drawing URLs or SVG uploads are accepted.
- Email addresses and provider tokens are not copied into the public wall table. Authentication sessions are managed by the official Supabase client. No admin key is shipped.
- Remove submission-log entries older than 30 days periodically in SQL Editor with `delete from private.wall_submission_log where created_at < now() - interval '30 days';`. The private schema is inaccessible to site visitors.
- Review Supabase Auth rate limits, usage, and logs before public launch. Add a managed bot challenge/WAF if abuse warrants it. Per-account limits and ownership checks reduce abuse; they do not guarantee protection from every attack.

Reference: [Supabase row-level security](https://supabase.com/docs/guides/database/postgres/row-level-security).

## Verification before launch

The included local tests exercise database permission boundaries, validation, immediate public visibility, and rate limits. They cannot verify credentials that have not yet been supplied.

After setup, test Google and GitHub separately, confirm redirect to `/wall/`, draw and submit a note, reload, and confirm another signed-out browser sees it immediately. Verify only its author can remove it. Finally send a contact message and verify receipt. Check both localhost and the production domain.

## Common setup problems

| Symptom | Check |
| --- | --- |
| Sign-in is unavailable | Fill both Supabase variables, then restart development or rebuild production. Use the publishable key from the same project as the URL. |
| Provider is not enabled | Enable and save Google/GitHub in Supabase Sign In / Providers. |
| Google `redirect_uri_mismatch` | Copy the exact Supabase callback into Google, including `/auth/v1/callback`. Do not enter the portfolio `/wall/` URL there. |
| Google access denied while testing | Add that account under Google Auth Platform → Audience → Test users, or complete the production publishing requirements. |
| Login returns to the wrong page | Check Supabase Site URL and the exact `/wall/` redirect allowlist entry, including the port and trailing slash. |
| Code verifier or session error | Start login again in the same browser and host; avoid private-window changes or clearing browser storage during login. |
| Notes fail to load or save | Run the SQL migration, then verify it was applied to the project named in the environment URL. Check Supabase logs without weakening the policies. |
| Note visible only to its author | Apply the latest instant-pins migration to publish previously queued pins. |

Use multi-factor authentication on the owner accounts for Supabase, Google Cloud, and GitHub. Keep the public site on HTTPS. Browser sessions are persisted by Supabase JS, so protecting the site against script injection and keeping dependencies updated remains necessary. These controls reduce risk; neither local tests nor any configuration can guarantee absolute security.
