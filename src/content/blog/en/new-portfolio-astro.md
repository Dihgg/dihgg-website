---
title: "How I built my new portfolio (Astro + React + Tailwind + Pagefind)"
description: "A technical breakdown of my new portfolio architecture: static output, markdown content workflow, local search, pagination, and automated deployment."
date: 2026-03-31
featuredImage: /content/astro.jpg
featuredImageAlt: "Astro logo on gradient background"
tags: [astro, react, tailwind, pagefind, typescript, github-actions]
locale: en
translationKey: portfolio-rebuild-2026
---

Over the last few days, I rebuilt my portfolio with three priorities: **maintainability**, **real production performance**, and a **low-friction content workflow**.

The goal was not to build something overly complex. It was the opposite: create a solid, static, and long-term foundation.

## Stack and decisions

I used:

- **Astro** as the static foundation
- **React + TypeScript** for small interactive pieces
- **Tailwind CSS** with `@apply` and BEM-style component CSS
- **Astro Content Collections** for posts, projects, skills, and work history
- **Pagefind** for local blog search (no backend)
- **GitHub Actions** for automated build/deploy

### Why Astro?

It is a great fit for content-heavy websites:

- static output by default
- excellent performance baseline
- markdown-first authoring feels natural
- supports interactive islands only where needed

In practice, I avoid paying SPA complexity costs on every page.

## Markdown-driven content

One of the most important improvements was moving data that used to be hardcoded in TS into markdown files versioned in Git.

I now have collections for:

- blog
- work (timeline)
- projects
- skills

This makes maintenance much easier. To publish new content, I just add a file.

Example blog frontmatter:

```yaml
title: "My post"
description: "Summary"
date: 2026-03-31
tags: [astro, typescript]
locale: en
translationKey: my-post
```

## Internationalization without duplicating logic

Content is split by locale (`pt-BR` and `en`), but rendering logic is centralized in shared components.

So I keep clean locale URLs while avoiding duplicated page implementations.

## Local search with Pagefind

I wanted fast search without relying on an external service. Pagefind worked really well:

- indexes during build
- runs entirely in the client
- no backend required
- excellent fit for static sites

I also added support for language/tag filters and visible language labels in code blocks.

## Real static pagination

I implemented proper static pagination with Astro (not fake load-more):

- `/blog/` and `/en/blog/` for first page
- paginated routes for following pages
- no duplicate `/page/1`

This improves SEO, URL sharing, and navigation predictability.

## CSS: less utility sprawl, more structure

I like Tailwind, but too many inline utilities can become hard to maintain over time. I reorganized styles into:

- semantic BEM classes
- `@apply` for utility grouping
- smaller CSS files by domain (`components`, `content`, `foundation`)

The result is easier to read and safer to evolve.

## Deployment

Deployment was simplified to what is actually needed:

1. static site build
2. search index generation
3. upload `dist` through GitHub Actions

No semantic release step, no intermediate zip artifacts, no unnecessary complexity.

## Final thoughts

This new portfolio is faster, cleaner, and most importantly more sustainable to evolve.

If you also want a personal site that does not turn into technical debt, my recommendation is:

- prioritize static architecture
- treat content as code
- automate deployment early
- make styles scalable from day one

In the end, what mattered most was not adding more tools, but removing unnecessary complexity.
