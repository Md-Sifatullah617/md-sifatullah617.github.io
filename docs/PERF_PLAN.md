# sifatullah.me — Speed fix plan

## Result (deployed 2026-09-06, three deploys)

| | Baseline | After #1–6 | After #7–9 (final) |
|---|---|---|---|
| **Overall** | **46 / 100 (F)** | 77 / 100 (C) | **79 / 100 (C)** |
| Speed | 23 | 70 | 72 |
| Delivery | 90 | 90 | 90 |
| Assets | 0 | 79 | 79 |
| Lighthouse mobile (S1) | 0 | 60 | **66** |
| Lighthouse desktop | — | — | 61 |
| LCP (S2) | unmeasurable | 900 ms | **761 ms** ✅ |
| FCP (S5) | — | 900 ms | **761 ms** ✅ |
| CLS (S3) | 0.000 ✅ | 0.000 ✅ | 0.000 ✅ |
| TBT (S4) | not reported | 15.7 s | **1.5 s** ❌ (target ≤200 ms) |
| Page weight (A5) | 3.0 MB | 2.9 MB | **2.6 MB** (partial 1.5/3) |
| Minified (A2) | ungraded | 100% ✅ | 100% ✅ |
| Brotli (D3) | gzip | gzip | gzip (partial 2.5/5) |

**+33 points overall.** The boot splash + viewport let Lighthouse measure the
page at all; the dep/asset trimming pulled TBT from 15.7 s to 1.5 s and weight
to 2.6 MB. What's left (TBT ≤200 ms, Brotli, cache policy, ≤1.5 MB weight) is the
structural Flutter-web + GitHub-Pages floor.

---

Baseline (xspeedcache, 2026-09-06): **46/100 (F)**
- Core Web Vitals: 23/100 — Lighthouse mobile **0/100**, LCP/TBT unmeasurable
- Server & Caching: 90/100 — only gap is gzip vs Brotli
- Asset Optimization: 0/100 — 3.0 MB page weight

## Reality check

The site is a **Flutter web SPA**. Lighthouse scores it 0 because nothing paints
until ~2.5 MB (compressed) of JS + CanvasKit wasm downloads, parses and executes
under mobile CPU/network throttling, and everything renders to a `<canvas>` so
there's no DOM LCP element. **No amount of asset trimming makes a Flutter-web SPA
score well on Lighthouse mobile** — that ceiling is structural. The wins below are
real but incremental; the only large lever is not using Flutter for the landing
page, which is a rewrite and out of scope here.

## Prioritized plan

| # | Fix | Report check | Impact | Effort | Status |
|---|-----|--------------|--------|--------|--------|
| 1 | Restore `<meta viewport>` (was missing from `web/index.html`) | S1 mobile | Mobile Lighthouse can't score without it; fixes mobile layout | trivial | ✅ applied |
| 2 | Instant-paint boot splash (name + spinner as real HTML) before Flutter mounts | S2 LCP, S5 FCP | Gives Lighthouse a real FCP/LCP element instead of a blank canvas; better perceived load | small | ✅ applied |
| 3 | Fix broken build: `font_awesome_flutter` 10→11 + `Icon`→`FaIcon` | — | Repo would not build on current Flutter stable; next `[deploy-web]` push fails in CI | small | ✅ applied |
| 4 | Drop 4 unused deps: `device_preview`, `flutter_inappwebview`, `marquee`, `simple_ripple_animation` (28 packages) | A5 weight | Smaller `main.dart.js`, removes the render-blocking `web_support.js` script + its CI patch hack | small | ✅ applied |
| 5 | Real `<meta description>` + `lang="en"` + `theme-color` | (SEO, not scored here) | Search/social preview correctness | trivial | ✅ applied |
| 6 | `preload` hint for `flutter_bootstrap.js` | S1/S2 | Starts the critical script sooner | trivial | ✅ applied |
| 7 | Move the 34 MB of project `.mp4` to a GitHub release, load by URL | A5 weight | `build/web/assets` 36 MB → 2.2 MB; clips cost bandwidth only when a visitor hits "Watch Video". No page-weight change (already lazy) | medium | ✅ applied — release `media-v1` |
| 8 | Convert bundled images to WebP; drop dead `my.jpg` | A3, A5 | ~1.5 MB off the asset bundle (medilogy 827→18 KB, hero 124→60 KB, 4 PNGs) | small | ✅ applied |
| 9 | Drop `chewie`, minimal `video_player` dialog | A5 weight | Smaller bundle, one less dep, unblocks a future wasm attempt | small | ✅ applied |
| 9b | `--wasm` build (skwasm) | A5, S2, S4 | ~800 KB lighter critical path + faster parse | — | ❌ **not viable on GitHub Pages** — skwasm needs COOP/COEP cross-origin isolation, which GitHub Pages cannot serve. Renders a blank canvas. Only unlocks after #10 (a host that sets those headers) |
| 10 | Move hosting off GitHub Pages → Cloudflare Pages / Firebase Hosting / Netlify | D3 Brotli, D4 cache policy, unblocks 9b | Brotli (−15–20% on every text asset), `immutable` long-cache on hashed assets, and enables the wasm renderer. GitHub Pages does none of this and allows no header config | medium | ⛔ declined — staying on GitHub Pages. Caps the score near ~77 (TBT is the real limiter regardless) |

## Backlog complete

Everything actionable without a hosting migration is done. Remaining ceiling:
- **TBT 15.7 s** — Flutter main-thread cost. Only a non-Flutter landing page fixes this.
- **D3 Brotli (2.5/5)** and **D4 cache policy (0/5, ungraded)** — need a host that isn't GitHub Pages. Declined.
- **A5 page weight 2.9 MB** — CanvasKit + Dartcode floor for Flutter web. `--wasm` would help but needs #10.

## Applied in this branch

Files changed: `web/index.html`, `pubspec.yaml`, `pubspec.lock`,
`lib/features/videos/ui/{mobile,desktop}/videos_*_widget.dart`,
`.github/workflows/flutter_web_deploy.yml`, deleted dead `app_marquee_widget.dart`.

Verified locally: `flutter build web --release` succeeds; served build renders,
boot splash clears on Flutter mount, FontAwesome icons render, no app console
errors.

Measured effect on transfer size is modest (~25 KB off gzipped `main.dart.js`;
`web_support.js` gone). The meaningful score movement, if any, comes from #1 and
#2 letting Lighthouse register FCP/LCP at all.

## To verify against the live scan

Changes are **not deployed**. Re-running the xspeedcache scan only means anything
after a deploy (commit containing `[deploy-web]` → GitHub Actions → `main` →
Pages). Expected realistic outcome: small bump from asset/JS trim, possibly
Lighthouse producing non-zero sub-scores thanks to the boot splash + viewport.
Getting to a good grade needs #7–#10, and Flutter-web will still cap the
Lighthouse number.
