import rss from '@astrojs/rss';
import { getPublishedPosts } from '../lib/posts.ts';
import { SITE_TITLE } from '../consts.ts';

export async function GET(context) {
  const posts = await getPublishedPosts();
  return rss({
    title: `${SITE_TITLE} — Blog`,
    description:
      'Writing by Md Sifatullah on building and shipping production software, technical leadership, and Manobsheba.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
