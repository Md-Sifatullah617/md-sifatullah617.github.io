---
title: From intern to owning production — what 3 years of Flutter taught me about shipping
description: >-
  Lessons from three years and several production Flutter apps: architecture is
  a communication tool, inheriting a codebase is a skill, and shipping is the
  part nobody teaches you.
pubDate: 2026-08-05
tags: [Flutter, career, shipping]
draft: false
---

<!-- OWNER DRAFT — first pass written from the CV timeline. Edit for voice and
     specifics, then delete this comment before publishing. -->

I started as a Flutter intern at DeshIT-BD and I have spent the years since
shipping mobile and full-stack products — ChargeAI for Mulytic Energy, health
apps, a telecom platform I built alone, and now the technology for Manobsheba.
A few things I did not know at the start.

## Architecture is a communication tool, not a correctness one

Early on I thought Clean Architecture and BLoC were about being *right*. They are
mostly about being *legible*. The value of drawing a hard line between
presentation, business logic, and data is that the next person — often me, six
months later — can find where a change belongs without reading the whole app.

On a solo project that "next person" is always future-me, and future-me has
forgotten everything. The layers are a note I leave for him.

## Inheriting a codebase is its own skill

Twice now I have been handed a legacy codebase and asked to stabilise it before
adding anything. The instinct is to rewrite. The skill is to resist that,
understand why the code is shaped the way it is, get it under test at the seams
that matter, and change it in small safe steps. Rewrites feel productive and
usually are not.

## Shipping is the part nobody teaches

University teaches you to build. It does not teach you migrations, rollbacks,
what to do when the production database is the thing that is wrong, how to cut a
release you can undo, or how to keep a service alive when you are the only person
who can. Those are the skills that decide whether software you wrote is software
anyone uses.

The shortest version of three years: the code is the easy part.
