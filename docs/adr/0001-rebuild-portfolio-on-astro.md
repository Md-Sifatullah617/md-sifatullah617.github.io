# Rebuild the portfolio on Astro instead of Flutter web

The site was a Flutter-web canvas SPA on GitHub Pages. Its purpose is shifting to a
personal-brand hub that positions Md Sifatullah as a technical leader / founder, with
Manobsheba as the flagship proof — a goal that is almost entirely about search
discoverability, shareable link previews, fast first paint, and content velocity (a
blog and real case studies). Flutter web is structurally weak at all four: it renders
to `<canvas>` so there is near-zero crawlable text, it cannot emit per-page OpenGraph
tags, a prior perf pass hit a hard ceiling (~66 Lighthouse mobile, 1.5s TBT, 2.6 MB,
~2s blank paint) that is the Flutter + GitHub-Pages floor, and prose lives inside Dart
widgets.

**Decision:** rebuild on Astro — static HTML, Markdown content, per-page OG tags,
near-perfect Lighthouse, trivial blog, deploys to the same GitHub Pages target. Port
the existing copy, project data, and images across.

**Considered and rejected:** keeping Flutter with another polish pass (does not fix the
structural SEO/preview/perf problems); a JS SPA framework like Next.js (heavier than
needed for a content site, worse default perf than Astro's zero-JS baseline).

**Consequences:** the Flutter app under `lib/` is retired; `main` (the built output
branch) and the deploy workflow will serve Astro's `dist/` instead. Flutter/Dart
tooling files can be removed once the migration lands.
