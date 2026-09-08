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
  no-flash theme script, RSS `<link>`.
- `src/components/` — landing sections (`Hero`, `SelectedWork`, `Ventures`, `About`,
  `Contact`) plus `Header`, `Footer`, `ThemeToggle`, `Seo`, `PersonSchema`.
- `src/data/projects.ts` — Selected Work cards (Zod-validated; **Seam 2**).
- `src/content.config.ts` + `src/content/` — `work` (case studies) and `blog`
  collections. Malformed frontmatter fails the build (**Seam 2**). `draft: true`
  entries produce no route, listing, or feed item.
- `src/lib/posts.ts` — the one published-post query (index, routes, RSS).
- `src/pages/` — `/`, `/blog` + `/blog/<slug>`, `/work/<slug>`, `/rss.xml`, `/404`.
- `public/cv/` — the CV, served verbatim at `/cv`.
- `tests/built-output.test.ts` — **Seam 1**: routes, `<head>` metadata, internal-link
  resolution, blog/work/draft handling, RSS, contact form, footer, build artifacts.
  The reference for future tests here.
- `lighthouserc.json` — **Seam 3**: Lighthouse budget gate (Perf/A11y/BP ≥ 95,
  SEO = 100) on the home page and the flagship case study.

### Adding content

- **Blog post:** add `src/content/blog/<slug>.md` with the required frontmatter.
- **Case study:** add `src/content/work/<slug>.md`; set `draft: true` to hold it back.
- **Selected Work card:** edit `src/data/projects.ts`.

## Configuration

- `PUBLIC_FORMSPREE_ID` — the Formspree form ID for the contact form. Set it in the
  deploy environment (repo → Settings → Secrets and variables → Actions → Variables,
  then expose it to the build step) or a local `.env`. Without it the form posts to a
  placeholder that 404s; the Email-me button always works.

## Deploy

Push to `main`. `.github/workflows/deploy.yml` builds, runs Seam 1 + Seam 3, and
deploys via the official GitHub Pages actions. No magic commit-message string.

> **Repo setting:** Pages source must be **"GitHub Actions"** (Settings → Pages).
