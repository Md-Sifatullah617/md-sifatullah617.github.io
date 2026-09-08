/**
 * Seam 1 — assertions against the built site in dist/.
 *
 * This suite is the reference for all future tests in this repo. It asserts
 * externally observable behaviour of the built output — routes, <head> metadata,
 * link resolvability, build artifacts — never component internals or class names.
 * It should survive a full restyle.
 *
 * Run with `npm test` (which builds first).
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, it, expect, beforeAll } from 'vitest';
import * as cheerio from 'cheerio';

const DIST = join(process.cwd(), 'dist');

/** The ported CV is a raw HTML passthrough — only its <title> is under contract. */
const PASSTHROUGH = new Set(['cv/index.html']);

function htmlFiles(): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) walk(full);
      else if (entry.endsWith('.html')) out.push(relative(DIST, full).split(/[\\/]/).join('/'));
    }
  };
  walk(DIST);
  return out;
}

/** Map an internal href (as found on a page) to the dist file it should resolve to. */
function hrefToDistFile(href: string): string | null {
  let path = href.split('#')[0].split('?')[0];
  if (path === '') return null; // pure fragment / query — same page
  if (!path.startsWith('/')) return null; // leave relative links out of scope
  path = path.replace(/\/$/, '');
  const candidates = [
    `.${path}.html`,
    `.${path}/index.html`,
    `.${path}`, // direct asset (e.g. /og-default.png)
  ].map((c) => c.replace(/^\.\//, ''));
  for (const c of candidates) {
    if (existsSync(join(DIST, c))) return c;
  }
  return null;
}

beforeAll(() => {
  if (!existsSync(DIST)) {
    throw new Error('dist/ not found — run `npm run build` first (or use `npm test`).');
  }
});

describe('routes', () => {
  it.each(['index.html', 'cv/index.html', '404.html'])('generates %s', (file) => {
    expect(existsSync(join(DIST, file)), `${file} missing`).toBe(true);
  });
});

describe('per-page <head>', () => {
  const pages = htmlFiles();

  it('found at least the core pages', () => {
    expect(pages).toEqual(expect.arrayContaining(['index.html', '404.html', 'cv/index.html']));
  });

  const titles: string[] = [];

  it.each(pages)('%s has a non-empty <title>', (file) => {
    const $ = cheerio.load(readFileSync(join(DIST, file), 'utf8'));
    const title = $('title').first().text().trim();
    expect(title.length, `${file} has an empty <title>`).toBeGreaterThan(0);
    titles.push(title);
  });

  it('every <title> is unique', () => {
    expect(new Set(titles).size).toBe(titles.length);
  });

  const managed = pages.filter((p) => !PASSTHROUGH.has(p));

  it.each(managed)('%s has full head metadata', (file) => {
    const $ = cheerio.load(readFileSync(join(DIST, file), 'utf8'));
    expect($('meta[name="description"]').attr('content')?.trim()).toBeTruthy();
    expect($('link[rel="canonical"]').attr('href')?.trim()).toBeTruthy();
    expect($('meta[property="og:title"]').attr('content')?.trim()).toBeTruthy();
    expect($('meta[property="og:description"]').attr('content')?.trim()).toBeTruthy();
    expect($('meta[property="og:image"]').attr('content')?.trim()).toBeTruthy();
    expect($('meta[name="twitter:card"]').attr('content')?.trim()).toBeTruthy();
  });
});

describe('internal links from the home page resolve', () => {
  const $ = cheerio.load(readFileSync(join(DIST, 'index.html'), 'utf8'));
  const hrefs = [
    ...new Set(
      $('a[href]')
        .map((_, el) => $(el).attr('href')!)
        .get()
        .filter((h) => !/^(https?:|mailto:|tel:)/i.test(h)),
    ),
  ];

  it('home page has internal links to check', () => {
    expect(hrefs.length).toBeGreaterThan(0);
  });

  it.each(hrefs)('%s resolves to a generated file', (href) => {
    const path = href.split('#')[0].split('?')[0];
    if (path === '' || path === '/') {
      expect(existsSync(join(DIST, 'index.html'))).toBe(true);
      return;
    }
    expect(hrefToDistFile(href), `${href} does not map to a file in dist/`).not.toBeNull();
  });
});

describe('blog + RSS', () => {
  const PUBLISHED = [
    'building-a-telecom-event-platform-solo',
    'rural-healthtech-needs-agent-points',
    'three-years-of-flutter-shipping',
  ];

  it('/blog/ index exists', () => {
    expect(existsSync(join(DIST, 'blog/index.html'))).toBe(true);
  });

  it.each(PUBLISHED)('published post /blog/%s/ exists', (slug) => {
    expect(existsSync(join(DIST, `blog/${slug}/index.html`))).toBe(true);
  });

  it('the blog index lists posts newest-first', () => {
    const $ = cheerio.load(readFileSync(join(DIST, 'blog/index.html'), 'utf8'));
    const dates = $('.bloglist__item time')
      .map((_, el) => new Date($(el).attr('datetime')!).getTime())
      .get();
    expect(dates.length).toBe(PUBLISHED.length);
    expect([...dates].sort((a, b) => b - a)).toEqual(dates);
  });

  it('a draft post is excluded from routes, the index, and the feed', () => {
    expect(existsSync(join(DIST, 'blog/draft-example'))).toBe(false);
    const index = readFileSync(join(DIST, 'blog/index.html'), 'utf8');
    const rss = readFileSync(join(DIST, 'rss.xml'), 'utf8');
    expect(index).not.toMatch(/draft example/i);
    expect(rss).not.toMatch(/draft example/i);
  });

  it('RSS feed exists and is well-formed with the published posts', () => {
    const rss = readFileSync(join(DIST, 'rss.xml'), 'utf8');
    expect(rss).toMatch(/^<\?xml/);
    expect(rss).toContain('<rss');
    expect(rss).toContain('</rss>');
    const items = rss.match(/<item>/g) ?? [];
    expect(items.length).toBe(PUBLISHED.length);
  });

  it('RSS feed is discoverable from every page <head>', () => {
    for (const file of htmlFiles().filter((f) => !PASSTHROUGH.has(f))) {
      const $ = cheerio.load(readFileSync(join(DIST, file), 'utf8'));
      expect(
        $('link[rel="alternate"][type="application/rss+xml"]').attr('href'),
        `${file} missing RSS <link>`,
      ).toBe('/rss.xml');
    }
  });
});

describe('work collection / case studies', () => {
  it('the flagship case study is generated', () => {
    expect(existsSync(join(DIST, 'work/telecom-event-platform/index.html'))).toBe(true);
  });

  it('draft entries produce no route (manobsheba is draft: true)', () => {
    expect(existsSync(join(DIST, 'work/manobsheba'))).toBe(false);
    expect(existsSync(join(DIST, 'work/manobsheba/index.html'))).toBe(false);
  });

  it('the flagship case study has CreativeWork or Article JSON-LD', () => {
    const html = readFileSync(join(DIST, 'work/telecom-event-platform/index.html'), 'utf8');
    const ld = cheerio
      .load(html)('script[type="application/ld+json"]')
      .map((_, el) => cheerio.load(html)(el).text())
      .get()
      .join(' ');
    expect(ld).toMatch(/"@type":"(CreativeWork|Article)"/);
  });

  it('internal links on the case study resolve', () => {
    const $ = cheerio.load(
      readFileSync(join(DIST, 'work/telecom-event-platform/index.html'), 'utf8'),
    );
    const internal = $('a[href^="/"]')
      .map((_, el) => $(el).attr('href')!)
      .get()
      .filter((h) => !h.startsWith('/#'));
    for (const href of internal) {
      expect(hrefToDistFile(href), `${href} unresolved`).not.toBeNull();
    }
  });
});

describe('Selected Work section', () => {
  const $ = cheerio.load(readFileSync(join(DIST, 'index.html'), 'utf8'));

  it('renders the curated project cards', () => {
    // Kept in sync with src/data/projects.ts deliberately — the count is a curation decision.
    expect($('#work .card').length).toBe(6);
  });

  it('has a "More projects on GitHub" link', () => {
    const more = $('#work a')
      .filter((_, el) => /more projects on github/i.test($(el).text()))
      .attr('href');
    expect(more).toMatch(/github\.com/i);
  });

  it('every internal card link resolves to a generated file', () => {
    const internal = $('#work a[href^="/"]')
      .map((_, el) => $(el).attr('href')!)
      .get()
      .filter((h) => !h.startsWith('/#'));
    for (const href of internal) {
      expect(hrefToDistFile(href), `${href} does not map to a file in dist/`).not.toBeNull();
    }
  });
});

describe('build artifacts', () => {
  it('dist/CNAME equals sifatullah.me', () => {
    expect(readFileSync(join(DIST, 'CNAME'), 'utf8').trim()).toBe('sifatullah.me');
  });

  it('dist/robots.txt exists and references the sitemap', () => {
    const robots = readFileSync(join(DIST, 'robots.txt'), 'utf8');
    expect(robots.toLowerCase()).toContain('sitemap:');
  });

  it('a sitemap is generated', () => {
    expect(existsSync(join(DIST, 'sitemap-index.xml'))).toBe(true);
  });

  it('theme is set before first paint (no-flash script in <head>, before <body>)', () => {
    const html = readFileSync(join(DIST, 'index.html'), 'utf8');
    const headEnd = html.indexOf('</head>');
    const setsTheme = /document\.documentElement\.dataset\.theme\s*=/;
    const headScript = html.slice(0, headEnd);
    expect(setsTheme.test(headScript), 'no-flash theme script not found in <head>').toBe(true);
  });

  it('a real theme-toggle button ships on the home page', () => {
    const $ = cheerio.load(readFileSync(join(DIST, 'index.html'), 'utf8'));
    const btn = $('button#theme-toggle');
    expect(btn.length).toBe(1);
    expect(btn.attr('aria-label')?.trim()).toBeTruthy();
  });

  it('Person JSON-LD is present on the home page', () => {
    const $ = cheerio.load(readFileSync(join(DIST, 'index.html'), 'utf8'));
    const ld = $('script[type="application/ld+json"]').first().text();
    expect(ld).toContain('"@type":"Person"');
  });
});
