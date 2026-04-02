import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeExternalLinks from 'rehype-external-links';

import { DEFAULT_LOCALE, LOCALES, SITEMAP_LOCALES } from './src/i18n/config';
import { codeBlock } from '@/lib/markdown/rehype';

export default defineConfig({
  output: 'static',
  site: process.env.PUBLIC_SITE_URL || 'https://dihgg.com',
  i18n: {
    locales: [...LOCALES],
    defaultLocale: DEFAULT_LOCALE,
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: SITEMAP_LOCALES
      }
    })
  ],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['noopener', 'noreferrer']
        }
      ],
      codeBlock
    ]
  },
  vite: {
    plugins: [tailwindcss()]
  }
});