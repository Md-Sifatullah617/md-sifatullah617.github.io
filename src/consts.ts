/** Site-wide constants. Single source of truth for identity and metadata. */

export const SITE_URL = 'https://sifatullah.me';

export const SITE_TITLE = 'Md Sifatullah';
export const SITE_DESCRIPTION =
  'Md Sifatullah builds production software end-to-end and leads the people who ship it. Software Engineer at Metal Plus, CTO at Manobsheba, founding a software studio.';

export const EMAIL = 'sifatullah.swe.617@gmail.com';
export const LINKEDIN = 'https://www.linkedin.com/in/md-sifatullah617';
export const GITHUB = 'https://github.com/Md-Sifatullah617';

export const JOB_TITLE = 'Software Engineer';

/** Default OpenGraph image, relative to site root. */
export const DEFAULT_OG_IMAGE = '/og-default.png';

// Grows per slice as landing sections land. Ventures / About / Contact arrive in slice 5.
export const NAV_LINKS = [
  { href: '/#work', label: 'Work' },
  { href: '/#ventures', label: 'Ventures' },
  { href: '/blog', label: 'Blog' },
  { href: '/cv', label: 'CV' },
  { href: '/#contact', label: 'Contact' },
];
