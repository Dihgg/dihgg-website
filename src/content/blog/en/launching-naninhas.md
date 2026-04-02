---
title: "Naninhas: Zomboid mod about plushies with real gameplay impact"
description: "My first Zomboid mod compatible with Build 42"
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

[Naninhas](https://steamcommunity.com/sharedfiles/filedetails/?id=3624617298) was born from a simple question: if the attachable plushies from [AuthenticZ](https://steamcommunity.com/sharedfiles/filedetails/?id=2335368829) add personality to **Project Zomboid**, why not use them to provide gameplay advantages too, giving players a reason to collect Naninhas.

The proposal is not to break game balance. The focus has always been to create something small, thematic, and integrated into the normal gameplay loop.

## Stability beyond the effect 🤔

Applying bonuses when equipping something sounds simple, but there are nuances I had to consider:

- safe trait application and removal
- tracking which traits were suppressed (so they can be restored)
- preventing unintended XP multiplier stacking (to avoid exploits)
- periodic effects beyond traits

Most of this work is invisible to players, but it is what sustains the quality of the mod.

## How Naninhas code works in practice 👩‍💻

Each plushie has effects that can be activated when attached, and some plushies can also have effects that must be handled periodically (reducing fatigue, for example).

To make that happen, I chose an *[Observer pattern](https://refactoring.guru/design-patterns/observer)* where each Naninha object is responsible for its own behavior, and an observer handles activating, deactivating, and updating all attached Naninhas.

This approach makes it easier to add new effects without rewriting everything.

## Publishing was also part of the work 📦

Finishing a mod involves more than writing code: documentation, release notes, screenshots, metadata, and clear communication about requirements.

This reduces friction and improves the experience for people installing your mod.

The challenge now is to share the mod with as many people as possible!

---

## Links 🔗

- [Steam Workshop](https://steamcommunity.com/sharedfiles/filedetails/?id=3624617298)
- [GitHub](https://github.com/Dihgg/naninhas)
- [Original Post](https://buymeacoffee.com/dihgg/naninhas-zomboid-mod)
