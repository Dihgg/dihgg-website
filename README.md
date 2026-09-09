# Dihgg Portfolio & Blog

Personal website and multilingual blog for Diego Lopes, built with Astro, React, and Tailwind.

## Stack

- Astro 5 (static output)
- React 19 for selected UI components
- Tailwind CSS 4 with `@apply` + BEM-style classes
- Astro Content Collections for blog/work/projects/skills
- Pagefind for static full-text blog search
- Jest + Testing Library for unit tests

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:4321`.

## Scripts

- `npm run dev`: local development server
- `npm run build`: Astro production build + Pagefind indexing (`dist/pagefind`)
- `npm run preview`: preview built output
- `npm run test`: run test suite
- `npm run coverage`: test coverage report
- `npm run release`: bump package version and update `changelog.md` using standard-version

## Project Structure

```text
src/
	components/
		astro/            # Astro-only components such as blog search
		*.tsx             # reusable React UI components
	content/
		blog/             # markdown posts
		work/             # markdown timeline entries
		projects/         # markdown projects
		skills/           # markdown skills
	data/               # localized UI copy + portfolio data
	layouts/            # shared layout shell
	lib/                # constants + blog/date/content helpers
	pages/              # route wrappers (pt-BR and /en)
	styles/             # split css partials (foundation/components/content)
```

## Path Alias

The project uses the alias below (configured in `tsconfig.json`):

- `@/*` -> `src/*`

Example:

```ts
import Base from '@/layouts/Base.layout.astro';
```

## Content Model

Defined in `src/content.config.ts`.

### Blog frontmatter

```yaml
title: "Post title"
description: "Short description"
date: 2026-03-30
locale: pt-BR # or en
translationKey: post-slug-shared-between-languages
tags: [astro, css]
draft: false
featuredImage: /images/example.jpg # optional
featuredImageAlt: Example image      # optional
```

## Internationalization

- Portuguese root: `/`
- English root: `/en/`
- Blog listing: `/blog/` and `/en/blog/`
- Blog posts: `/blog/[slug]/` and `/en/blog/[slug]/`

Localized labels are in `src/data/translations.ts`; locale constants and helpers
are in `src/i18n/config.ts`.

## Blog Pagination

Pagination is statically generated for both locales.

- First page: `/blog/` and `/en/blog/`
- Additional pages: `/blog/page/2/`, `/en/blog/page/2/`, etc.

Page size is controlled by:

- `BLOG_POSTS_PER_PAGE` in `src/lib/constants.ts`

## Blog Search (Pagefind)

- Search UI is rendered by `src/components/astro/BlogSearch.component.astro`
- Index is generated during `npm run build`
- Search assets are output to `dist/pagefind`

Note: search requires built output (`build` + `preview`).

## Environment Variables

Copy `.env.example` to `.env` for local configuration when needed.

- `PUBLIC_SITE_URL`: canonical production URL used by Astro, the sitemap, and share links
- `PUBLIC_GTAG_ID`: optional Google Analytics measurement ID; analytics are omitted when empty

## Styling Approach

- Global entrypoint: `src/styles/global.css`
- Split partials in `src/styles/foundation`, `src/styles/components`, and `src/styles/content`
- BEM naming + Tailwind `@apply` for maintainable class composition

## Fonts

Fonts are self-hosted via `@fontsource` imports in `src/styles/global.css`:

- Bricolage Grotesque
- IBM Plex Mono
- Press Start 2P

## Deployment Notes

The project builds to static files only (`dist/`).
It can be deployed on any static hosting/CDN setup.

The GitHub Actions workflow runs on non-bot pushes to `main`. It creates a
`standard-version` release commit and tag, builds the site, publishes a GitHub
Release containing the static output, and deploys `dist/` over FTP. Configure
the repository variables `PUBLIC_SITE_URL`, `PUBLIC_GTAG_ID`, `FTP_SERVER`, and
`FTP_USERNAME`, plus the `FTP_PASSWORD` secret, before using this workflow.
