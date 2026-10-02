# Production launch and search setup

Website: **https://puneet-saxena-portfolio.vercel.app/**

This is a free Vercel subdomain under your account. The Vercel project is `puneet-saxena-portfolio`, linked to `puneet26082006/Portfolio-new`. Production follows `main`. The app is a static Next.js export; Supabase provides the wall backend, and Formspree handles contact delivery.

## 1. Hosting settings

Vercel → project → Settings → Environment Variables:

| Setting | Production value |
| --- | --- |
| `SITE_URL` | `https://puneet-saxena-portfolio.vercel.app` |
| `NEXT_PUBLIC_SUPABASE_URL` | Keep the existing Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Keep the existing publishable/anon key |
| `NEXT_PUBLIC_FORMSPREE_FORM_ID` | Keep the existing form ID |
| `NEXT_PUBLIC_BOOKING_URL` | `https://cal.com/puneet-saxena-12xhfs/30min` |
| `GOOGLE_SITE_VERIFICATION` | Optional: the content value of Google's verification meta tag |
| `BING_SITE_VERIFICATION` | Optional: the content value of Bing's verification meta tag |

The application settings and canonical origin were configured during deployment. Verification codes can be added later. After changing an environment setting, use Deployments → latest production deployment → Redeploy. A local `.env.local` edit does not update Vercel. Public settings are compiled into the static files.

`VERCEL_TOKEN` authorizes deployment management only. Keep it in your ignored local `.env.local` if needed; it is not a runtime key and must not be copied into Vercel's application variables. Revoke the temporary token at https://vercel.com/account/settings/tokens after the deployment is complete if you no longer need it. Git-connected deployments continue without that token.

No Google API key, Search Console API key, or Supabase service-role key is required for this website.

## 2. Supabase URL configuration — change this for hosted login

Open your existing Supabase project → Authentication → URL Configuration.

1. Set **Site URL** to `https://puneet-saxena-portfolio.vercel.app`.
2. Under **Redirect URLs**, add `https://puneet-saxena-portfolio.vercel.app/wall/` exactly, including the final slash.
3. Keep `http://localhost:3000/wall/` only if you still develop locally. It can remain alongside production; do not replace the Supabase project URL itself with the website domain.
4. Save. Keep the redirect list specific; do not add a broad wildcard for all Vercel sites.
5. Keep Google and GitHub enabled under Authentication → Sign In / Providers. Keep new-user signups enabled for visitors.

The portfolio already redirects OAuth back to the current website origin plus `/wall/`. No source change is needed when moving between localhost and the production domain.

These account-level settings need to be changed in Supabase. A Vercel deployment token cannot edit them. Existing database migrations, wall entries, row-level security policies, and publishable keys stay in the same Supabase project.

## 3. Google OAuth — website origins and consent details

Open https://console.cloud.google.com/auth/overview and choose the Google project already used for wall login.

Under **Clients → your Web application OAuth client**:

- Add **Authorized JavaScript origin**: `https://puneet-saxena-portfolio.vercel.app` (no path).
- Keep `http://localhost:3000` only if local testing is still needed.
- **Authorized redirect URI stays the hosted Supabase callback**, copied from Supabase's Google provider screen: `https://pzgdlxtqvdzicjumquva.supabase.co/auth/v1/callback`.
- Do not replace this callback with your portfolio domain or `/wall/`.

Under **Branding**, update:

| Field | URL |
| --- | --- |
| Application home page | `https://puneet-saxena-portfolio.vercel.app/` |
| Privacy policy | `https://puneet-saxena-portfolio.vercel.app/privacy/` |
| Terms of service | `https://puneet-saxena-portfolio.vercel.app/terms/` |

Follow any authorized-domain or ownership-verification requirements Google shows. Do not claim ownership of `vercel.app` or `supabase.co`, which are shared provider domains. If Google requires control of a registrable domain for branding verification, attach a domain you own and verify it with the requested method. The OAuth callback remains Supabase's unless you separately configure a Supabase custom auth domain.

Under **Audience**, an external application left in Testing only works for its configured test users. Move to Production when ready for public access and complete any verification Google requests. This wall needs only basic identity scopes; do not add Gmail, Drive, or other permissions. Your existing Google Client ID and Client Secret stay in Supabase's Google provider settings, not `.env.local` or Vercel browser variables.

## 4. GitHub OAuth

Open https://github.com/settings/developers → OAuth Apps → the existing app used for the visitor wall.

- **Homepage URL**: `https://puneet-saxena-portfolio.vercel.app/`.
- **Authorization callback URL** stays `https://pzgdlxtqvdzicjumquva.supabase.co/auth/v1/callback`.
- Save. Keep the existing client ID and secret in Supabase's GitHub provider settings. No new repository permissions are needed for visitor sign-in.

## 5. Contact and booking

In Formspree, open the current form. If you enabled submission-domain restrictions, add `puneet-saxena-portfolio.vercel.app`; keep localhost only if needed for testing. Keep the verified notification recipient and spam protection enabled. The form ID does not change after deployment.

Send a test message from `/contact/` and check the receiving inbox and spam folder. A success response means Formspree accepted the submission, not that an email has reached the inbox.

The Cal.com event URL stays the same. If you have enabled embedding or domain restrictions in the scheduling provider, allow the portfolio domain there. The booking link also works as a direct link.

## 6. Submit the site to Google

1. Open https://search.google.com/search-console and add a **URL-prefix** property: `https://puneet-saxena-portfolio.vercel.app/`.
2. Choose **HTML tag** verification. Copy only the `content` value from `<meta name="google-site-verification" content="...">`.
3. Add it as `GOOGLE_SITE_VERIFICATION` in Vercel's production environment, then redeploy. Do not paste a Google login token or password.
4. Return to Search Console and click Verify.
5. Open **Sitemaps** and submit `sitemap.xml`. The public sitemap is `https://puneet-saxena-portfolio.vercel.app/sitemap.xml`.
6. Use **URL Inspection → Test live URL** on the homepage and the three main project pages. If the pages are eligible, request indexing once. Repeated requests do not guarantee faster indexing.
7. Review **Page indexing**, **Performance**, and **Core Web Vitals** after Google collects data. Search Console reports real search impressions, clicks, and queries; it does not require tracking scripts on the portfolio.

Use a URL-prefix property for the free Vercel subdomain. A Domain property requires control of DNS for the domain being verified. Search Console ownership verification is separate from Google OAuth configuration.

For Bing, open https://www.bing.com/webmasters/. Import the verified Search Console property if offered, or use its meta-tag method with `BING_SITE_VERIFICATION`, redeploy, verify, and submit the same sitemap.

## 7. Build genuine search visibility

The site now supplies page-specific titles/descriptions, HTTPS canonical URLs, a sitemap, crawler rules, structured identity and content data, a signature favicon, and social previews. Content and metadata are present in the exported HTML. Project notes are linked from the journal so they are discoverable by readers and crawlers. Preview deployments are marked noindex; production is indexable.

These features help discovery; they cannot guarantee indexing, first place, or a traffic volume. Name searches can still compete with other people named Puneet Saxena. Google may take days or weeks to crawl and evaluate a new site, and ranking changes can take longer.

- Add the production URL to your GitHub profile, LinkedIn contact/featured section, Medium profile, coding profiles where supported, and resume.
- Link each project repository's About/README to its matching portfolio case study.
- Publish useful original case studies with your real technical decisions, screenshots, limitations, benchmarks, and lessons. Keep claims current and verifiable.
- Share work with relevant communities when it answers a real question. Avoid paid links, keyword stuffing, fabricated testimonials, or artificial traffic.
- Review actual Search Console queries and improve the relevant page instead of repeating your name throughout the site.

## 8. If you buy a custom domain later

A simple personal name such as `puneetsaxena.dev` is a suitable option, subject to availability and price; it has not been purchased or reserved.

1. Add the domain in Vercel → Settings → Domains and follow Vercel's DNS instructions at your registrar.
2. Set one preferred HTTPS domain; redirect the alternate `www` address and the old Vercel address to it where supported.
3. Update `SITE_URL` in Vercel and local development, then rebuild.
4. Repeat the Supabase redirect, Google homepage/origin/branding, GitHub homepage, and Formspree domain updates above using the new origin.
5. Keep Google/GitHub's Supabase callback unchanged unless the Supabase auth domain itself changed.
6. Verify the new Search Console property, submit its sitemap, and update profile links. Keep redirects from the previous public URLs.

## 9. Final hosted checks

- Open the site in a signed-out browser. Main pages, favicon, PDF download, sitemap, and robots.txt should work without a Vercel login.
- Test Google and GitHub login separately on `/wall/`; finish on the production domain. Post a real note and confirm it remains after refresh. Only its author should be able to delete it.
- Test contact delivery and booking.
- Run `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, and `npm run check:seo` for future changes. A build used for deployment must have the production `SITE_URL`.

Official references: [Google SEO guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [Search Console verification](https://support.google.com/webmasters/answer/9008080), [Supabase redirects](https://supabase.com/docs/guides/auth/redirect-urls), [Supabase Google](https://supabase.com/docs/guides/auth/social-login/auth-google), [Supabase GitHub](https://supabase.com/docs/guides/auth/social-login/auth-github), [Vercel domains](https://vercel.com/docs/domains/working-with-domains/add-a-domain).
