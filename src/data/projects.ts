import { z } from 'astro:schema';
import type { ImageMetadata } from 'astro';

/**
 * Selected-work cards on the landing page. A "project card" is a one-paragraph
 * teaser (see CONTEXT.md) — distinct from a "case study", which is a dedicated page.
 *
 * This schema is the Seam 2 contract: a malformed entry throws at module load and
 * fails `astro build`.
 */
const ProjectSchema = z.object({
  name: z.string().min(1),
  blurb: z.string().min(1),
  tags: z.array(z.string()).default([]),
  /** Case study page, Play Store, App Store, GitHub, live demo, or a landing anchor. Omit for work with no public link. */
  href: z.string().min(1).optional(),
  caseStudy: z.boolean().default(false),
  order: z.number().int(),
  /** Filename under assets/project_image/. */
  image: z.string().optional(),
  /** Target page not built yet (e.g. a case study a later slice delivers) — render unlinked. */
  pending: z.boolean().default(false),
});

export type Project = z.infer<typeof ProjectSchema> & { cover?: ImageMetadata };

const raw: unknown[] = [
  {
    name: 'Telecom Event Management Platform',
    blurb:
      'Sole full-stack engineer on Metal Plus’ event-management platform for Grameenphone — Go REST API, PostgreSQL, a Flutter field client, and a Next.js admin, shipped to production on AWS.',
    tags: ['Go', 'PostgreSQL', 'Flutter', 'Next.js', 'AWS'],
    href: '/work/telecom-event-platform',
    caseStudy: true,
    pending: true, // slice 3 delivers the case study page and drops this
    order: 1,
  },
  {
    name: 'ChargeAI',
    blurb:
      'EV-charging companion app for Mulytic Energy — owned the Flutter build end to end, live on iOS and Android.',
    tags: ['Flutter', 'Mobile', 'Maps'],
    href: 'https://play.google.com/store/apps/details?id=com.mulytic_energy.chargeai',
    order: 2,
    image: 'chargeai.png',
  },
  {
    name: 'Manobsheba',
    blurb:
      'Healthtech venture bringing basic care to rural Bangladesh through Health Care Agent Points. Co-founder and CTO; in private beta.',
    tags: ['Venture', 'Healthtech', 'CTO'],
    href: '/#ventures',
    order: 3,
  },
  {
    name: 'Grameenphone delivery',
    blurb:
      'Rescued and stabilised the legacy GP Sync codebase, then took on the in-progress Grameenphone equipment-inventory system.',
    tags: ['Legacy rescue', 'Backend', 'Flutter'],
    order: 4,
  },
  {
    name: 'Blockchain-based property registration',
    blurb:
      'Land-registration prototype on Ethereum smart contracts, from a B.Sc. thesis on privacy in smart contracts. Live interactive demo.',
    tags: ['Solidity', 'Ethereum', 'Thesis'],
    href: 'https://sifatullah.me/Land-Registration/',
    order: 5,
    image: 'lrs.png',
  },
  {
    name: 'Hiye',
    blurb: 'Consumer health app built in Flutter, published on the Play Store.',
    tags: ['Flutter', 'Health'],
    href: 'https://play.google.com/store/apps/details?id=com.Hiye.hiye',
    order: 6,
    image: 'Hiye.webp',
  },
];

const covers = import.meta.glob<{ default: ImageMetadata }>(
  '../../assets/project_image/*.{png,webp,jpg,jpeg}',
  { eager: true },
);
const coverByName = new Map(
  Object.entries(covers).map(([path, mod]) => [path.split('/').pop()!, mod.default]),
);

export const projects: Project[] = z
  .array(ProjectSchema)
  .parse(raw)
  .sort((a, b) => a.order - b.order)
  .map((p) => {
    if (p.image && !coverByName.has(p.image)) {
      throw new Error(`projects.ts: image "${p.image}" not found under assets/project_image/`);
    }
    return { ...p, cover: p.image ? coverByName.get(p.image) : undefined };
  });
