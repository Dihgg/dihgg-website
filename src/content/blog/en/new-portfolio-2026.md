---
title: "New portfolio! (Astro + React + Tailwind + Pagefind)"
description: "Behind the scenes of my redesigned personal portfolio: static architecture, markdown content, local search, pagination, and automated deployment."
date: 2026-03-31
featuredImage: /content/astro.jpg
featuredImageAlt: "Astro logo on gradient background"
tags: [astro, react, tailwind, pagefind, typescript, github-actions]
locale: en
translationKey: portfolio-rebuild-2026
---

Over the last few days, I rebuilt my personal portfolio website with a focus on three things: **ease of maintenance**, **performance**, and **frictionless content workflow**.

The goal wasn't to create a "super complex" project. Quite the opposite: to build a solid, static, and scalable foundation to use for years to come.

## Stack and decisions

I used:

- **Astro** as the static foundation
- **React + TypeScript** for interactive components
- **Tailwind CSS** with `@apply` and BEM (**B**lock **E**lement **M**odifier) -organized CSS components
- **Astro Content Collections** for blog posts, projects, skills, and work history
- **Pagefind** for local blog search (no backend needed)
- **GitHub Actions** for automated build and deployment

### Why Astro?

Astro pairs really well with content-focused websites:

- generates static files
- excellent performance out of the box
- markdown content works naturally
- allows interactive islands when needed

In practice, I can use a simple hosting provider since Astro delivers static files.

## Content driven by markdown

The old site used a mix of hardcoded content and SQL database, which was unnecessarily complex for what the site actually needed.

In this new version, all content is managed via markdown files that are automatically compiled on each push.

This simplifies maintenance significantly. To add new content, just create a file!

**Metadata** is controlled through frontmatter.
Example blog post frontmatter:

```yaml
title: "My post"
description: "Summary"
date: 2026-03-31
tags: [astro, typescript]
locale: en
translationKey: my-post
```

## Internationalization!

I wanted the site to support multiple languages without duplicating code across separate websites.
What I did was organize content by locale (`pt-BR` and `en`), while keeping all rendering logic in shared components.

## Local search with Pagefind

I wanted to include blog search without relying on external services. **Pagefind** solved this perfectly:

- indexes at build time
- runs 100% on the client
- no backend required
- works great on static sites

I also added support for filters by language and tags.

## True static pagination

I implemented blog pagination using **Astro's** static model.

- `/blog/` and `/en/blog/` for the first page
- paginated routes for subsequent pages
- no duplication across languages

This improves SEO, URL shareability, and navigation predictability.

## CSS: less scattered utilities, more structure

I love **Tailwind**, but inline utility classes make code verbose and tedious to maintain long-term. So I reorganized styles into:

- semantic BEM classes
- `@apply` to leverage **Tailwind** in CSS files
- CSS files organized by domain (`components`, `content`, `foundation`, etc.)

**Result:** easier to read and modify without fear.

## Deployment

Deployment was simplified to what's necessary:

1. build the static site
2. generate search index
3. optimize images
4. upload the `dist` folder via GitHub Actions

No release stage, no intermediate zips, no unnecessary complexity.

## Conclusion

This new portfolio uses the technologies I work with daily, runs faster, looks better, is better organized, and most importantly, is sustainable for continued evolution.

If you also want a personal website that doesn't become technical debt, the recommendation is:

- prioritize static architecture
- treat content as code
- automate deployment early
- make styling scalable from the start

In the end, what mattered most wasn't adding more tools—it was reducing unnecessary complexity!
