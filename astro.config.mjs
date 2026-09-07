// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://sifatullah.me',
  trailingSlash: 'ignore',
  // /cv is a raw-HTML passthrough in public/, so the sitemap integration can't
  // discover it automatically.
  integrations: [sitemap({ customPages: ['https://sifatullah.me/cv'] })],
  build: {
    // Inline small stylesheets so the site ships effectively zero render-blocking CSS.
    inlineStylesheets: 'always',
  },
});
