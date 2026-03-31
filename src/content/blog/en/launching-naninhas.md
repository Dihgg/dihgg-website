---
title: "Naninhas: Zomboid mod about plushies with real gameplay impact"
description: "My First Zomboid mod compatible with build 42"
featuredImage: "https://cdn.buymeacoffee.com/uploads/project_updates/10333055/2026/03/27/175221_1774633941479_pastedimage.jpg.png"
featuredImageAlt: "Featured image for the Naninhas mod"
date: 2026-03-29
tags:
  - project-zomboid
  - modding
  - games
  - typescript
  - lua
locale: en
translationKey: naninhas-launch
---

[Naninhas](https://steamcommunity.com/sharedfiles/filedetails/?id=3624617298) was born from a simple question: if the attachable plushies from [AuthenticZ](https://steamcommunity.com/sharedfiles/filedetails/?id=2335368829) already add personality to **Project Zomboid**, why not also add a gameplay element?

The goal was never to break game balance. The focus was always to build something small, thematic, and naturally integrated into the regular game flow.

## The challenge was stability, not just effects

Applying a bonus on equip sounds simple, but the hard part is keeping the system reliable over time.

In **Naninhas**, that required strong attention to:

- safe trait application and removal
- explicit tracking of suppressed traits
- prevention of unwanted XP multiplier stacking
- idempotent periodic loops

Most of this work is invisible while playing, but it is what sustains mod quality.

## Build 42 raised the technical bar

Supporting **Build 42** was not just about renaming things. Trait integration had to be revised, since this build introduced new **APIs** that broke the **mod**.

That made me rethink parts of the implementation and introduce:

- better typing for game APIs
- more precise trait resolution logic
- modeling that is closer to real runtime behavior

**Result:** cleaner code, higher stability, and easier evolution.

## Why TypeScript-to-Lua + PipeWrench

The mod uses a **TypeScript-to-Lua** workflow with [PipeWrench](https://github.com/asledgehammer/PipeWrench). For systems with temporary state, traits, XP bonuses, and an observer pattern, this stack provided:

- modular architecture
- safer refactoring
- better testability
- more sustainable maintenance

## Architecture and tests made the difference

The **Naninhas** foundation separates a core that scans equipped items from plush modules that own their own behavior.

This approach makes it easier to add new effects without rewriting everything and cleanly separates gameplay rules from the game integration layer.

Tests were also essential to prevent regressions in stateful behavior.

## Publishing well is also development

Finishing a mod involves more than code: documentation, compatibility notes, screenshots, metadata, and clear communication about requirements.

This layer reduces friction and improves the installation experience.

## Links

- [Steam Workshop](https://steamcommunity.com/sharedfiles/filedetails/?id=3624617298)
- [GitHub](https://github.com/Dihgg/naninhas)
- [Original Post](https://buymeacoffee.com/dihgg/naninhas-zomboid-mod)
