---
title: "Electron Archshift: Running Apple Silicon Apps on Intel Macs"
description: "I built a small npm package to port Electron applications from Apple Silicon to Intel Macs"
featuredImage: "/content/posts/electron-archshift/main.png"
featuredImageAlt: "Electron banner"
date: 2026-10-26
tags:
  - node
  - npm
  - games
locale: en
translationKey: electron-archshift
---

> Check-out [electron-archshift](https://www.npmjs.com/package/electron-arcshift) at **npmjs**
## The Problem: Two Architectures, One macOS

Over the past few years, **Apple** has completely transformed its computers with the introduction of its **Apple Silicon** processors.

The company I work for has a program that allows employees to buy their work computers after a few years of use. That's how I ended up with my **Intel-based MacBook**.

And while it's still a great machine, now that **Apple Silicon** has become the standard, I've started running into compatibility issues with certain applications.

The other day, I came across a rather peculiar problem: I found a little indie game I wanted to try, and to my surprise, it actually had a **macOS** version (which is already something of a rarity!).

But when I tried to launch it, I was greeted with this lovely message:

![You cannot open this application because this application is not supported on this Mac](/content/posts/electron-archshift/screenshot-1.png)

Well, I don't exactly have **R$ 10,000** lying around to buy a new **Mac**. So, what now?

I had a few options:

1. Run the Windows version using [CrossOver](https://www.codeweavers.com/) or [Wine](https://www.winehq.org).
2. Ask the developer to compile an Intel-compatible version.
3. Cry.
4. Hack the game and adapt it to run on an architecture it wasn't originally built for.

Naturally, I went with option number four!

![Fine, I'll do it myself](https://media.giphy.com/media/0NTG9ffrXT870Wt9qv/giphy.gif)

## The Solution

The first thing I needed to figure out was: **how was this game built?**

For those unfamiliar with macOS, a `.app` file is actually a special kind of folder containing the executable and all the other files an application needs to run.

While digging through the game's contents, I stumbled upon an `.asar` file. I'd seen that format before, so I immediately recognized it: the game was built with [Electron](https://www.electronjs.org)!

The [.asar](https://www.electronjs.org/docs/latest/tutorial/asar-archives) format is used by Electron to package an application's files into a single archive.

Knowing that, and considering that Electron allows developers to turn web applications into desktop apps, I had an idea:

**Is it possible to extract the original files and repackage it to run on an Intel Mac?**

And the answer was: **Yes, It is!** 

With a bit of **Node.js** and a few tools from the **Electron** ecosystem, I managed to extract the application's contents and rebuild its package using an Intel-compatible version of Electron.

In other words, instead of recompiling the entire game, I reused its original files and replaced the runtime with one compatible with my Mac.

The result? The game ran perfectly on my **Intel MacBook**!

Of course, this approach won't necessarily work with every Electron application. Native dependencies, architecture-specific libraries, and other compiled components can prevent a successful conversion.

But in this particular case, it worked!

---

## Sharing the Result

But then I thought: what if I came across another game with the same problem?

Would I have to remember every single step and go through the whole process manually again?

Being a programmer, my first instinct was to automate the whole thing.

So, allow me to introduce **[electron-arcshift](https://www.npmjs.com/package/electron-arcshift)**!

It's a small npm package that lets you **analyze Electron applications and, when possible, convert them from one architecture to another**, all from the command line.

The idea is simple: determine whether an application can be ported and automate the repackaging process, saving you from all the manual work I had to do the first time around.

### How to Use It

It's pretty straightforward! The package provides two main commands:

**1. Check compatibility**

```bash
npx electron-arcshift check "/path/to/App.app"
```

This command analyzes the application and checks whether an architecture conversion might be possible.

**2. Convert the application**

```bash
npx electron-arcshift convert "/path/to/App.app" \
--out "/path/to/generated-files"
```

This command attempts to convert an `.app` built for **Apple Silicon (ARM64)** into a version compatible with **Intel Macs (x64)**, saving the result to the specified output directory.

And that's it! If the application is compatible with the process, you'll end up with a version you can run on your Intel Mac..

