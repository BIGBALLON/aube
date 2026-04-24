import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkCjkFriendly from 'remark-cjk-friendly';

export default defineConfig({
  site: 'https://bigballon.github.io',
  base: '/aube/',
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkCjkFriendly],
  },
  output: 'static',
  build: {
    assets: '_astro',
  },
});
