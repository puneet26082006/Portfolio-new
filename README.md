# Puneet Saxena — Portfolio

An editorial, motion-led portfolio for Puneet Saxena: competitive programmer, full-stack developer, and AI & Data Science undergraduate at JECRC.

## Included pages

- Animated home experience with profile, coding milestones, skills, projects, achievements, education, and contact CTA
- Searchable full-screen navigation with dark/light themes
- Project gallery and static case-study routes
- Journal with five verified Medium posts, topic filters, search, and links to the originals; existing local article routes remain available
- Supabase visitor wall with Google/GitHub sign-in, instant public notes, drawing studio, ownership controls, and posting limits
- Formspree contact form and an optional embedded Cal.com/Calendly booking calendar
- Privacy, terms, and custom 404 pages

## Stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Framer Motion
- Lenis smooth scrolling

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Project content lives in `lib/content.ts`; shared visual components live in `components/`.

## Configuration and deployment

Copy `.env.example` to `.env.local` and fill the browser-safe settings. Follow [backend setup](docs/BACKEND_SETUP.md) for Supabase providers, redirects, and migrations. OAuth secrets belong in the Supabase dashboard, never in a `NEXT_PUBLIC_` variable.

The production build exports `out/`. Configure the same public environment variables in your hosting provider **before building**: the Supabase URL/publishable key, Formspree form ID, and full booking event URL. Local `.env.local` values are deliberately not pushed to GitHub. Rebuild after changing public settings.

Medium article metadata lives in `lib/medium-posts.ts`; it is a verified snapshot, not a live feed. Update it when publishing new articles. Titles, dates, and original badge images come from [Puneet's Medium profile](https://medium.com/@puneetsaxena168). Reading times are estimates.

The portfolio quote is attributed to Edsger W. Dijkstra, [On the nature of Computing Science (EWD 896)](https://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD896.html).

Run `npm test`, `npm run lint`, and `npm run build` before publishing. See [verification notes](docs/verification/README.md) for completed checks and their limits.
