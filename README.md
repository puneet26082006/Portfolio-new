# Puneet Saxena - Portfolio

A responsive portfolio built with Next.js 16, React 19, TypeScript, and Tailwind CSS. The site exports static files; visitor authentication and messages use Supabase and Formspree.

## Run locally

Use Node.js 22.6 or later (Node 22 LTS recommended).

```sh
npm ci
```

Copy `.env.example` to `.env.local`, fill the public settings, then run:

```sh
npm run dev
```

The development site opens at `http://localhost:3000`. Keep `.env.local` private.

## How the code works

| Location                         | Responsibility                                                                                                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/`                           | Pages, metadata, global layout, and styles. `layout.tsx` adds navigation, theme initialization, smooth scrolling, the context menu, and footer.               |
| `components/`                    | Page sections and reusable interfaces. GSAP handles the intro and scroll effects; Framer Motion handles component transitions.                                |
| `lib/content.ts`                 | Project case studies and existing local journal articles. Static detail routes come from these records.                                                       |
| `lib/projects.ts`                | Featured project previews and their display order. `project-catalog.ts` combines previews with case-study content for the gallery.                            |
| `lib/medium-posts.ts`            | Five published Medium articles with original links, images, dates, and estimated reading times. The journal filters this data locally; it is not a live feed. |
| `lib/site.ts`                    | Name, contact links, and the downloadable resume path.                                                                                                        |
| `lib/theme.ts`                   | Dark/light preference, browser storage, and synchronization between open tabs. Theme colors live in CSS variables.                                            |
| `lib/contact-service.ts`         | Validates contact fields and sends an HTTPS request to Formspree. Success appears only after the provider accepts it.                                         |
| `lib/supabase.ts`, `lib/wall.ts` | Browser-safe Supabase setup, wall data mapping, pin colors, and error messages.                                                                               |
| `lib/drawing.ts`                 | Canvas coordinates, drawing rendering, undo, and redo. The drawing editor loads only when opened.                                                             |
| `supabase/migrations/`           | Database tables, row-level security, posting validation, ownership, and rate limits. Apply files in filename order.                                           |
| `public/`                        | Images, site icon, and `Puneet-Saxena-Resume.pdf`. Files here are publicly accessible.                                                                        |
| `tests/`                         | Contact validation, drawing behavior, PostgreSQL security checks, and static-preview checks.                                                                  |
| `scripts/`                       | Local production preview and a read-only wall backend version check.                                                                                          |

### Pages and interactions

- `/`: introduction, about/education, coding profiles, skills, featured projects, achievements, GitHub contributions, miscellaneous artwork, and contact link.
- `/projects/` and `/projects/[slug]/`: gallery and project details. SmartFlow AI, Pixora AI, and Fair Relief Routing appear first.
- `/blog/`: searchable Medium journal. Existing `/blog/[slug]/` pages remain available.
- `/contact/`: message form and optional embedded booking calendar.
- `/wall/`: visitors sign in with Google or GitHub, write a note or draw, choose a color, and publish immediately. Only the owner's notes can be deleted by that owner. Database rules validate every submission and enforce posting limits.
- `/privacy/` and `/terms/`: service and data-use information.

Right-click opens resume, social, email, and page actions. Arrow keys navigate the menu; Escape closes it. Shift+F10 opens it from the keyboard. Native menus remain available in text fields and drawings, with selected text, or by holding Shift while right-clicking. Resume links also appear in About, navigation, and the footer for touch users.

## Configuration

| Variable                               | Value                                                                 |
| -------------------------------------- | --------------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`             | Supabase project URL                                                  |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable key (or legacy anon key), never a secret/service-role key |
| `NEXT_PUBLIC_FORMSPREE_FORM_ID`        | Final segment of the Formspree endpoint                               |
| `NEXT_PUBLIC_BOOKING_URL`              | Full HTTPS Cal.com or Calendly event URL                              |

OAuth client secrets belong in Supabase Authentication settings. Follow [backend setup](docs/BACKEND_SETUP.md) for provider callbacks, allowed redirects, database setup, and contact delivery. See [drawing studio](docs/WALL_STUDIO.md) for editor behavior.

## Check and deploy

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run check:seo
npm run preview
```

The build writes `out/`. Preview serves it at `http://localhost:3001` (override with `PORT`). `npm start` is an alias for this local preview; no Next.js server is needed in production.

Vercel and Netlify configurations are included. Import this GitHub repository, set the four public application variables and `SITE_URL` in the host dashboard **before building**, and deploy. The build command is `npm run build`; publish directory is `out`. Other static hosts can publish the same directory, serve directory `index.html` files, and use `404.html` for missing pages. Do not rewrite every URL to the home page.

For a custom domain, add `https://your-domain/wall/` to Supabase's allowed redirect URLs and configure the production Site URL. Set the domain in Formspree if using domain restrictions. Rebuild whenever a public environment setting changes. `.env.local`, dependencies, caches, and build output are excluded from Git.

## Updating content

Edit the relevant data file and rebuild. Update Medium metadata when publishing new articles. Replace the PDF in `public/` when the resume changes. The current resume uses embedded Times New Roman, selectable text, and a single-column layout; tailor its wording to the job rather than relying on a universal ATS score. Project phone images are illustrative interface concepts.

## Search and production setup

Production domain: https://puneet-saxena-portfolio.vercel.app/

`SITE_URL` controls canonical links, sitemap URLs, social previews, and structured data. Set it to the final HTTPS origin before building. Without a public origin, or on Vercel preview deployments, indexing is disabled. Optional `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` values add ownership-verification meta tags; these are public codes, not account credentials.

Each page has its own title, description, canonical address, and social metadata. The home page describes the portfolio owner with Person/ProfilePage structured data. Project and article pages add breadcrumbs and content information. `robots.txt` and `sitemap.xml` are generated during the static build. `npm run check:seo` verifies the exported HTML rather than relying on JavaScript to inject metadata.

See [production launch and search setup](docs/PRODUCTION_SETUP.md) for exact Supabase, Google, GitHub, Formspree, and Search Console settings. `VERCEL_TOKEN` is only for local deployment administration; never add it to browser code, public variables, or the deployed application's environment.
