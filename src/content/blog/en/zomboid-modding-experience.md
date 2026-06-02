---
title: "My experience with Zomboid modding"
description: "How I went from basic Lua scripts to a full TypeScript pipeline with automated tests, and what I learned along the way."
featuredImage: "/content/posts/zomboid.jpg"
featuredImageAlt: "Project Zomboid steam cover"
date: 2026-06-02
tags:
  - project-zomboid
  - modding
  - games
  - typescript
  - lua
locale: en
translationKey: zomboid-modding-experience
---

Project Zomboid is not the most obvious game if you want to start modding. The official documentation is sparse, the **Java** **API** is hidden behind a Lua layer, and the *Build 41* to *Build 42* cycle broke a large chunk of existing mods without much ceremony. But that is exactly the kind of environment that attracts me: you really learn when the ground disappears beneath your feet.

![this is fine](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2M2enA5ZjltOWhnanVuem85dGRzY3JxdHpjMnEzOW5hNjkzeWxxaiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/NTur7XlVDUdqM/giphy.gif)

## How it all started: [Naninhas](https://steamcommunity.com/sharedfiles/filedetails/?id=3624617298)

The first mod I published was [**Naninhas**](https://steamcommunity.com/sharedfiles/filedetails/?id=3624617298) - a mod that adds buffs to AuthenticZ plushies when you attach them to your backpack. It is simple on the surface: each plushie gives a different bonus while equipped. But this project forced me to understand how the game loads items, how equip/unequip events work, and how to organize Lua code in a way I could actually maintain later.

The mod became an archaeology exercise: reading other mods' code on the Workshop, digging through the game's media files in `media/lua`, and doing a lot of trial and error. But it worked, it got published, and people are still using it.

## Adopting TypeScript with PipeWrench

Writing Lua works. But scaling Lua is another story: no types, no reliable autocomplete, no easy path to create tests. In projects with more complex logic, that can become a problem.

![kitten on the computer](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHd2c211YjNmNGg4ZGhlNHQyb3V5cG5vZXc5dXNoMWU3ZWtpYWdobyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/7NoNw4pMNTvgc/giphy.gif)
Then [PipeWrench](https://github.com/asledgehammer/PipeWrench) came in: a set of **Project Zomboid** API *type definitions* for **TypeScript**, combined with `typescript-to-lua` (TSTL) to compile TS directly into Lua. The result is a *pipeline* where you write **TypeScript** with full typing, run tests with **Jest**, and at the end of the build you have Lua files ready for the game to load.

This changed my workflow significantly. Instead of debugging behavior live in-game, most domain logic can be tested locally with **Jest**. It is oddly satisfying to run `npm test` to validate zombie survival game mechanics before even opening the game.

## The Build 42 nightmare (and solution)

Migration to Build 42 introduced a folder structure change for mods that caught many people by surprise. It is no longer enough to drop files in the root `media/` folder - there is now a specific hierarchy:

```
dist/{modName}/
  mod.info
  42/
    mod.info        <- with version=42 and B42 deps
    media/          <- ALL content goes here
      lua/
      ...
```

The annoying detail: **PipeWrench**'s **TSTL** plugin compiles Lua to `dist/{modId}/media/` (at root), but the game expects everything under `42/media/`. The solution was to create `postbuild` scripts that move the output to the right place. It sounds small, but it can cause massive confusion.

## Translation is not just a detail

One thing I learned early: localization cannot be an afterthought. In Build 42, Project Zomboid has a translation system based on `.json` files.

I created scripts that generate separate translation mods, for example: [**Naninhas - PTBR**](https://steamcommunity.com/sharedfiles/filedetails/?id=3624617298), a mod generated from a central source where translations live. The system still uses *Google Translate* when a translation is not yet available.

With [**Arianaland Posters**](https://steamcommunity.com/sharedfiles/filedetails/?id=3468675418), the challenge got more interesting: this mod supports both Build 42 and Build 41, and the older build uses `.txt` files with a specific translation format. The solution was to keep a folder of **JSON** files as the translation source of truth and generate both formats from it, so each build gets what it expects without manually duplicating translations.

Running `npm run translate -- pt` and getting files ready is much simpler than editing `.txt` by hand.


---

## Key takeaways


*Game modding* is an excellent school of pragmatic engineering. You do not get the luxury of refactoring forever; the game has to work, and players will complain if it does not. A few things stuck with me:

- **TypeScript + TSTL is viable for serious mods.** The setup curve exists, but it is worth the investment for larger projects.
- **Tests save time.** Especially for complex domain logic where opening the game just to test can take a while.
- **Read other mods' code.** The **Workshop** is full of solutions to problems you will run into. Do not reinvent the wheel before understanding how the original wheel was built.
- **Build 42 broke a lot, ~~and will keep breaking~~.** Your code should be ready for change: isolate game API integrations behind adapters and keep build scripts automated.

There is still a lot to learn. The **Java** **API** underneath Lua still has obscure parts, and *Build 42* is in active development. But if it were easy, it would not be fun.

![keep going!](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHVrb3BkNjZkbDh5dWZyeDZidXhkdWcwNHNvZDRiZmpuNWpmYjR6ciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LOQyoLIojnizS949is/giphy.gif)
