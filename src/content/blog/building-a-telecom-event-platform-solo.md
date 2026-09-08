---
title: Building a telecom event platform solo — Go API, Flutter, Next.js admin
description: >-
  The architecture decisions behind a field-operations platform I built and
  deployed alone for a Grameenphone contract — why layered Go, hand-owned auth,
  and migration-driven Postgres, and what I'd change.
pubDate: 2026-09-01
tags: [Go, Flutter, architecture, backend]
draft: false
---

<!-- OWNER DRAFT — first pass written from the CV and the grilling session. Edit
     for voice and accuracy, then delete this comment before publishing. -->

For about a year I was the only engineer on a platform that runs large telecom
events end to end for Metal Plus, on a Grameenphone contract: a Go REST API, a
Flutter app for field staff, and a Next.js admin console. One person, three
codebases, in production on AWS. Here is how it was put together and what I would
do differently.

## The shape of the problem

Events were coordinated over spreadsheets and phone calls. Attendance, equipment,
and staff assignments lived in files that were emailed around and went stale the
moment they were sent. Nobody had a live picture of an event in progress, and
reconciling the numbers afterwards took days.

So the system had exactly one job: be the single place that both field staff and
back-office coordinators trust, at the same time.

## Layered Go, no ORM

The API is a layered REST service — transport handlers call a service layer, the
service layer calls repositories, and nothing skips a layer. It is more
boilerplate than a framework would ask for, and I would make the same choice
again: when you are the only person who will ever debug this at 2am, "obvious"
beats "clever".

Data access is `sqlx` with hand-written SQL. No ORM. The queries are readable,
the `EXPLAIN` output is predictable, and there is no translation layer to fight
when a query gets complicated. `golang-migrate` versions the schema so every
environment rebuilds from zero and a rollback is a known quantity.

## Owning the auth

Auth is deliberately small: JWTs signed with HMAC-SHA256, verified in middleware,
with a role check gating every route that mutates event data. I wrote it rather
than pulling an identity provider because the requirements were simple and stable,
and an owned 150 lines I understand completely is safer here than a dependency I
understand partially.

The thing I would watch: hand-rolled auth only stays safe if it stays simple. The
day requirements grow past "a few roles, one token type" is the day to replace
it, not extend it.

## Excel in both directions

The reporting path is Excel — upload and download. Coordinators fill in a
spreadsheet and the API parses it with `excelize`; they can also export the
platform's live state back into the same layout. This was not in the original
plan and it turned out to matter more than any feature: it let people keep
working the way they already worked while the platform quietly became the source
of truth underneath them.

## The Flutter client

The field app is Flutter on Clean Architecture — presentation to BLoC, BLoC to
use-cases, use-cases to repositories — with `Dio` for transport, `GetIt` for
wiring, and Firebase Messaging for assignment pushes. The constraint that shaped
it: a staffer at a venue with one bar of signal still has to be able to record
attendance and sync later.

## What I would change

- **Introduce an offline queue earlier.** The client tolerates bad networks now,
  but the sync model was retrofitted. It should have been the first design
  decision, not a later one.
- **Contract tests between the API and the two clients.** With one engineer,
  "the types are in my head" works until it doesn't. A generated client or a
  shared schema would have paid for itself.
- **Split the admin console's Excel screens into their own module.** They grew
  into the most-changed part of the codebase and they drag the rest of the
  Next.js app around with them.

The case study has the full architecture:
[Telecom Event Management Platform](/work/telecom-event-platform).
