# sifatullah.me — Speed fix plan

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
| 7 | Move the 34 MB of project `.mp4` out of bundled assets → external host (YouTube / R2 / GitHub release) + `VideoPlayerController.networkUrl` | A5 weight, D4 | 34 MB out of the deploy; videos cost bandwidth only when actually watched | medium | ⏳ recommended |
| 8 | Convert PNG thumbnails to WebP (`medilogy.png` 828 KB, `my.jpg` 246 KB, `sifat.jpg`) | A3, A5 | ~1 MB off the asset bundle | small | ⏳ recommended |
| 9 | `--wasm` build (skwasm ~1.4 MB vs CanvasKit ~2.4 MB compressed) | A5, S2, S4 | ~1 MB lighter + faster parse | small | ❌ blocked — `chewie` calls `dart:io Platform`, throws on wasm. Needs chewie replaced or patched first |
| 10 | Move hosting off GitHub Pages → Cloudflare Pages / Firebase Hosting / Netlify | D3 Brotli, D4 cache policy | Brotli (−15–20% on every text asset) + `immutable` long-cache on hashed assets. GitHub Pages does neither and allows no header config | medium | ⏳ recommended |

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
