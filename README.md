# sifatullah.me

The personal-brand hub for Md Sifatullah — a fast, content-first static site built
with [Astro](https://astro.build). See `CONTEXT.md` for the brand vocabulary and
`docs/adr/0001-rebuild-portfolio-on-astro.md` for why it's no longer a Flutter app
(the old Flutter source is archived on the `sifat` branch).

## Develop

```sh
npm install
npm run dev        # local dev server
npm run build      # build to dist/
npm test           # build, then run the Seam 1 assertions against dist/
```

## Content & structure

- `src/consts.ts` — identity, links, nav. Single source of truth.
- `src/layouts/BaseLayout.astro` — `<head>` (via `Seo`), skip link, header, footer,
  no-flash theme script.
- `src/components/` — `Hero`, `Header`, `Footer`, `ThemeToggle`, `Seo`, `PersonSchema`.
- `public/cv/` — the CV, served verbatim at `/cv`.
- `tests/built-output.test.ts` — **Seam 1**: routes, `<head>` metadata, internal-link
  resolution, build artifacts. The reference for future tests here.
- `lighthouserc.json` — **Seam 3**: Lighthouse budget gate (Perf/A11y/BP ≥ 95, SEO = 100).

## Deploy

Push to `main`. `.github/workflows/deploy.yml` builds, runs both seams, and deploys via
the official GitHub Pages actions. No magic commit-message string.

> **Repo setting:** Pages source must be **"GitHub Actions"** (Settings → Pages).
