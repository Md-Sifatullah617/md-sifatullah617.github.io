import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const buildDir = path.join(rootDir, 'build');
const indexPath = path.join(buildDir, 'index.html');
const notFoundPath = path.join(buildDir, '404.html');

if (!fs.existsSync(indexPath)) {
  console.error('[optimize-build] build/index.html not found!');
  process.exit(1);
}

let html = fs.readFileSync(indexPath, 'utf8');

// 1. Inline critical CSS into <style> to eliminate render-blocking CSS (A1 audit)
const cssLinkRegex = /<link href="(\/static\/css\/main\.[a-f0-9]+\.css)" rel="stylesheet"\/?>/i;
const cssMatch = html.match(cssLinkRegex);

if (cssMatch) {
  const cssHref = cssMatch[1];
  const cssFilePath = path.join(buildDir, cssHref);
  if (fs.existsSync(cssFilePath)) {
    const cssContent = fs.readFileSync(cssFilePath, 'utf8');
    html = html.replace(cssMatch[0], `<style>${cssContent}</style>`);
    console.log(`[optimize-build] Inlined CSS: ${cssHref} (${(cssContent.length / 1024).toFixed(1)} KB)`);
  } else {
    console.warn(`[optimize-build] CSS file ${cssFilePath} not found`);
  }
} else {
  console.log('[optimize-build] No external main.*.css link found to inline.');
}

// 2. Discover and preload LCP avatar image (A6 audit)
const mediaDir = path.join(buildDir, 'static', 'media');
if (fs.existsSync(mediaDir)) {
  const files = fs.readdirSync(mediaDir);
  const portraitFile = files.find(f => f.startsWith('sifat-portrait.') && f.endsWith('.webp'));
  if (portraitFile) {
    const portraitHref = `/static/media/${portraitFile}`;
    const preloadTag = `<link rel="preload" fetchpriority="high" as="image" href="${portraitHref}" type="image/webp"/>`;
    if (!html.includes(portraitHref)) {
      html = html.replace('</head>', `${preloadTag}</head>`);
      console.log(`[optimize-build] Preloaded LCP image: ${portraitHref}`);
    }
  }
}

// 3. Write optimized index.html and update 404.html
fs.writeFileSync(indexPath, html, 'utf8');
fs.writeFileSync(notFoundPath, html, 'utf8');
console.log('[optimize-build] Successfully updated build/index.html and build/404.html');
