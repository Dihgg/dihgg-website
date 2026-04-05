import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import postcssNested from 'postcss-nested';
import rehypeExternalLinks from 'rehype-external-links';
import mermaid from 'astro-mermaid';
import plantuml from 'astro-plantuml';

import { DEFAULT_LOCALE, LOCALES, SITEMAP_LOCALES } from './src/i18n/config';

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
    }),
    mermaid({
      theme: 'forest',
      autoTheme: true
    }),
    plantuml()
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
    ]
  },
  vite: {
    plugins: [tailwindcss()],
    css: {
      postcss: {
        plugins: [postcssNested()]
      }
    }
  }
});