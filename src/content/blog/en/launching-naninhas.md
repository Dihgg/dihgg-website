---
title: "Launching Naninhas: Plushies with Real Gameplay Impact"
description: "How Naninhas evolved from a small Build 41 idea into a stable Build 42 mod with safe state handling, TypeScript-to-Lua architecture, and real testing discipline."
featuredImage: "https://cdn.buymeacoffee.com/uploads/project_updates/10333055/2026/03/27/175221_1774633941479_pastedimage.jpg.png"
featuredImageAlt: "Naninhas mod featured image"
date: 2026-03-29
tags:
  - project-zomboid
  - modding
  - typescript
  - lua
  - build-42
locale: en
translationKey: naninhas-launch
---

Naninhas started from a simple question: if attachable plushies already add personality in Project Zomboid, why not let them add meaningful gameplay value too?

The goal was never to create an overpowered rebalance. The idea was to keep the mod small, thematic, and naturally integrated into normal playthroughs.

## The challenge was stability, not just effects

Adding a bonus on equip sounds easy on paper. The difficult part is making sure the system stays reliable over long saves.

For Naninhas, that meant investing heavily in:

- safe trait application and removal
- tracking suppressed traits explicitly
- preventing XP multipliers from drifting over time
- making periodic update loops idempotent
- surviving save/load cycles without residue

Most of this work is invisible to players, but it is exactly what makes a mod feel trustworthy.

## Build 42 forced a better implementation

Supporting Build 42 required more than quick compatibility patches. Trait integration had to be revisited with stricter runtime assumptions and cleaner type boundaries.

That led to:

- better type definitions around game-facing APIs
- less unsafe casting
- tighter trait resolution logic
- clearer modeling of real runtime behavior

The result is code that is easier to maintain and harder to break.

## Why TypeScript-to-Lua + PipeWrench

This mod uses a TypeScript-to-Lua workflow with PipeWrench. For stateful systems like traits, XP boosts, observers, and periodic updates, stronger structure paid off quickly.

It improved:

- modular architecture
- refactoring safety
- testability
- long-term maintainability

## Architecture and testing mattered

Naninhas is organized around a core system that scans equipped plushies plus individual plushie modules that own their behavior.

This made it easier to add new plushies without rewriting the whole system and kept gameplay logic separate from game-bound plumbing.

Tests also became essential. Even small mods benefit from regression coverage when stateful behavior is involved.

## Release quality is part of development

A good mod release is not just code. Documentation, compatibility notes, screenshots, metadata, and clear requirements all reduce friction for players.

That polish is part of the product.

## Links

- [Steam Workshop](https://steamcommunity.com/sharedfiles/filedetails/?id=3624617298)
- [GitHub](https://github.com/Dihgg/naninhas)
- [Original post](https://buymeacoffee.com/dihgg/naninhas-zomboid-mod)
