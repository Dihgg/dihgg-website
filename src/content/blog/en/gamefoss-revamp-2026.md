---
title: "Gamefoss: back from the (not) dead"
description: "Preserving WordPress posts and using AI to speed up a complete rebuild."
featuredImage: "/content/posts/gamefoss-screenshot.png"
featuredImageAlt: "Gamefoss logo"
date: 2026-10-20
tags:
  - astro
  - wordpress
  - tailwind
  - pagefind
  - github-actions
locale: en
translationKey: gamefoss-revamp-2026
---

**[Gamefoss](https://gamefoss.com.br/)** is back from the dead! Or rather, the **not quite dead**, because it never completely disappeared.

This project started in 2019, but between the pandemic and adult life, it ended up frozen in time. It always bothered me that it never reached the potential I imagined. Deep down, I kept asking myself: "What if I brought the project back?"

Well, I finally worked up the courage and said:

> "Let's update this website!"

![Now that's courage](https://media1.tenor.com/m/OC3Og5FK_c0AAAAC/brunno-sarttori-bruno-sartori.gif)

The website got a complete rebuild that went far beyond swapping out a [**WordPress**](https://wordpress.com/) theme. I moved from an old **WordPress** installation to a static website built with [**Astro**](https://astro.build/), migrated the important content, redesigned the experience from scratch, and set up a more robust publishing workflow, with CI/CD using **GitHub Actions**.

The goal was to modernize everything without erasing the project's personality. [Gamefoss](https://gamefoss.com.br) should still be a place for games, technology, society, and whatever else comes to mind. Now, though, it runs on a much more modern and streamlined foundation.

## The original problem

There's a reason I kept putting off this rebuild: making a website takes work. Unfortunately, the saying *"do what you love, and you'll never love anything again"* rings true. At the end of a workday, it's hard to give this project as much time and energy as I'd like.

So how did I get past that? Well, despite my reservations, with the technology of the moment: AI.

## AI, for better or worse

I have **A LOT** of reservations about using AI, especially when it comes to creative work. But there's no denying that the technology exists and is here to stay. As a technologist, I know how necessary it is to keep learning to stay relevant. Small personal projects are a great way to understand how these technologies work in a "smaller," more "manageable" environment.

Using AI as a development tool, I managed to finish this Herculean task in less than a week. In the past, it would have taken months. The old **WordPress** theme, for example, took about three months to finish!

Paradoxically, the productivity boost AI makes possible is one of my biggest concerns about the technology. After all, under late-stage capitalism, who profits from programmers becoming more productive?

![It's alive!](https://media.giphy.com/media/wrcHkJDzqdYZktVxRl/giphy.gif)

## Migrations and history

The old website wasn't empty: it had content I wanted to keep, including articles, authors, categories, and, of course, the episodes.

The first step, then, was to plan a migration to turn the **WordPress** content into **Markdown/MDX** files, preserving metadata and URLs wherever possible.
I also needed to keep a list of redirects for the old addresses. After that, it was a matter of reviewing the text, images, links, and formatting details.

Another important step was making sure the old website could be moved elsewhere and restored if necessary. You know the drill: *backups, backups, backups!*

## A new identity in the age of machines

I wanted the website to be fun and have its own visual identity. But with limited time and no background as a *designer*, how was I supposed to pull that off?

This is where the biggest difference between a "layperson" and a professional comes in, and why AI doesn't replace the human element.

A layperson will tell the machine: "Make a new website for **Gamefoss**." The result, even if it works, will look generic, another problem in this new era of AI.

Now, if you understand what's being built, which *stack* to use, and why, you can give the tool better direction. You can apply concepts like *theming*, *design systems*, and componentization, along with patterns that help you get better results and avoid *AI slop*.

I'm pretty happy with the new *layout*.

![Gamefoss's new layout](/content/posts/gamefoss-screenshot.png)

## Gamefoss's new stack

The current version uses the following stack:

| Technology | Description |
|------|-----------|
| **Astro + TypeScript** | Static site generation |
| **MDX** | Markdown content with custom components |
| **React** | Interactive components |
| **Tailwind CSS** | Styling and CSS framework |
| **Pagefind** | Local search without a backend |
| **Embla Carousel** | Custom carousels |
| **Media Chrome** | An audio player with a consistent look across browsers |

The result is a faster website that's simpler to host. Most pages are served as plain *HTML*, while interactive components are loaded only where they make sense, using *React*.

## *Automagic* podcast episodes

Unlike on the old website, episodes don't need to be added as "posts." An automated process reads the podcast's *RSS* feed directly from **Spotify** and generates the data **Astro** uses.

![MAGIC!](https://media.giphy.com/media/tgXFqkYLE6mWI/giphy.gif)

So when a new episode is published, all I need to do is run the workflow in **GitHub Actions**. The website checks the updated feed, rebuilds the pages, and publishes the new version. Magic!

## Search on a static website

> How do you make search work without a backend?

Easy! With [Pagefind](https://pagefind.app/) and **Astro**, you can build a working search feature that's well integrated into the website, highly customizable, and doesn't need a backend. A few attributes throughout the site are enough to guide indexing during the build.

## Analytics and advertising, but with consent

As much as nobody likes advertising, *AdSense* can bring in a few bucks to help cover the project's costs. So I've already prepared the *Analytics* and *AdSense* infrastructure and added a consent layer (care for a cookie?).

![Care for a cookie?](https://media.giphy.com/media/U8VTcEMvHuVz2z8xCH/giphy.gif)

These scripts are optional and only load after the visitor gives consent. Important interactions are identified through `data-ga` attributes on *HTML* components. This keeps the instrumentation explicit in the code.

## A staging environment

I organized the publishing workflow into two environments, using **Git**:

1. Changes to the `release/latest` branch are published to the development environment.
2. Changes to the `main` branch generate a production version, update the changelog, and deploy the website to the main domain.

There's also a manual rebuild option. This matters because it lets me update the website when an episode appears in the RSS feed without having to create a new commit.

It was the least flashy part of the project, but probably the most important for hitting the deploy button with confidence and peace of mind.

## What's next

The new Gamefoss is live. Stay tuned: new episodes are coming soon!

![Mission accomplished](https://media.giphy.com/media/zwb4AvXN67p6SlvbIW/giphy.gif)
