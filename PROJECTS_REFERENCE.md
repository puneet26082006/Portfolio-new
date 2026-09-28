# Featured projects reference and verification

Reference: https://awrs.me/en, inspected 2026-09-28. The public client bundles and CSS are saved in the parent workspace's `_extract` directory.

## Extracted components

- `08u~9bq9d2pze.js`: FeaturedProjects — 700px cards, 32px gaps, the 72rem container inset, sticky full-height section, height equal to viewport + horizontal overflow, top/top to bottom/bottom, `ease: none`, `scrub: 1`.
- `06x08sm_w527u.js`: ProjectCard and PhoneFrame — metadata/title/description/image/tags hierarchy, 400px desktop preview, 192px phones, 9:19.5 screens, 1.5px bezel, 19.2px corners. Cursor: quickTo 0.3s power2.out, enter 0.35s back.out(1.7), leave 0.2s power2.in.
- `0c.xk48c.5pnx.css`: exact phone-stack translations, rotations, hover scales, 0.5s cubic-bezier(.4,0,.2,1) transitions, and 10s cursor rotation.
- `0lz8g30_ifsyg.js`: global masked blur layers — 70px / blur(16px) saturate(1.3), 120px / blur(8px), 180px / blur(3px), mounted below navigation at z-index 30.

## Geometry comparison at 1440 x 900

| Property | Reference | Portfolio |
| --- | --- | --- |
| Card width | 700px | 700px |
| Card height | 621.6875px | 621.7000px |
| Metadata row | 48.5px | 48.5px |
| Title row | 50px | 50px |
| Description row | 64px | 64px |
| Image panel | 400px | 400px |
| Phone width | 192px | 192px |
| Left phone rest transform | translateX(40%) translateY(4%) rotate(4deg) | identical |
| Center phone rest transform | translateY(-2%) | identical |
| Right phone rest transform | translateX(-40%) translateY(4%) rotate(-4deg) | identical |
| Cursor rotation | 10s | 10s |

The subpixel height difference is tag line-box rounding. No additional link row or custom viewport-based card resizing is used. The Smart Flow AI source link occupies the reference's existing title-arrow position; the card itself opens its live app. Honey Comb opens its repository. Mobile uses the reference's stacked 320px cards and 220px image panels; reduced motion uses a static layout.

## Generated project artwork

Built-in image generation produced three-screen mobile UI concept sprites for Pixora AI, Honey Comb, and Smart Flow AI. These illustrate the projects' features rather than claiming they are shipped native mobile apps. Each sprite is shown through three separately animated CSS phone frames. No flat image containing pre-baked phones is used, so hover and cursor behavior remain interactive.

Assets:
- `public/projects/pixora-mobile.webp`
- `public/projects/honey-comb-mobile.webp`
- `public/projects/smart-flow-mobile.webp`

Exact generation prompts: `docs/project-image-prompts.md`. Generated source originals are preserved in Codex's generated_images folder; project copies are compressed WebP. Project data is shared between the home section and `/projects` in `lib/projects.ts`.

Cursor tracking correction: movement is smoothed in viewport space (55ms damping) and translated into the moving card on every frame. Visibility and scale animate the inner disc independently, preventing hide animations from cancelling movement. Enter/leave timings and cursor artwork remain unchanged.
