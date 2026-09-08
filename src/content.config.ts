import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * `work` — case studies (see CONTEXT.md): a dedicated page per piece of work,
 * problem → role → architecture → outcome, written to be sent as a standalone link.
 *
 * The schema is a Seam 2 contract: malformed frontmatter fails `astro build`.
 * Structured fields drive a fixed layout; the Markdown body is the architecture
 * deep-dive.
 */
const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/[^_]*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      role: z.string(),
      /** Omit for confidential clients. */
      org: z.string().optional(),
      summary: z.string(),
      problem: z.string(),
      contribution: z.string(),
      stack: z.array(z.string()).min(1),
      outcomes: z.array(z.string()).min(1),
      links: z.array(z.object({ label: z.string(), url: z.string().url() })).optional(),
      cover: image().optional(),
      draft: z.boolean().default(false),
      order: z.number().int(),
    }),
});

/**
 * `blog` — hand-written posts. Schema is a Seam 2 contract. No automated feed
 * content lands here (see #5 / ADR 0001).
 */
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/[^_]*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    ogImage: z.string().optional(),
  }),
});

export const collections = { work, blog };
