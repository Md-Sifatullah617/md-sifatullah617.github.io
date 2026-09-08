---
title: Rural healthtech needs Health Care Agent Points, not another app
description: >-
  Why Manobsheba reaches rural citizens of Bangladesh through trained local
  agents instead of asking them to download something — the model, the problem
  it answers, and my role as CTO.
pubDate: 2026-08-20
tags: [Manobsheba, healthtech, ventures]
draft: false
---

<!-- OWNER DRAFT — first pass, held to the same restraint as the Ventures
     section: no internal architecture, no metrics. Confirm the wording before
     publishing, then delete this comment. -->

Most digital health services assume three things: a smartphone, reliable
connectivity, and enough digital literacy to get through an onboarding flow. For
a large share of rural Bangladesh, all three assumptions fail at once. The
service that is meant to close the distance to a clinic is itself unreachable.

Manobsheba, the healthtech venture I co-founded and lead as CTO, is built around
that failure rather than around it.

## The Health Care Agent Point

Manobsheba reaches people through a **Health Care Agent Point** — a local,
in-person delivery point. A trained agent at an agent point operates the
Manobsheba platform on behalf of a citizen who would not otherwise have digital
access. The citizen gets the service without needing their own device or their
own connectivity. The agent is the interface.

This is a deliberate choice. An app puts the entire burden of access on the
person with the least of it. An agent point moves that burden to someone trained,
equipped, and local — and it means the technology only has to work well for one
kind of user we can actually support.

## What this changes about building it

Designing for an operator rather than an end user changes the priorities. The
platform has to be fast and legible for someone using it many times a day on
behalf of others. It has to hold up on the connectivity an agent point actually
has. And it has to make the agent's job easier, because the agent is the product
as much as the software is.

Manobsheba is in private beta. There is more to say about how it is built, and I
will say it when the venture is public.

More on the venture at [manobshebabd.com](https://manobshebabd.com).
