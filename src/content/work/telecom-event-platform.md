---
title: Telecom Event Management Platform
role: Sole full-stack engineer — architecture, API, clients, deployment
org: Metal Plus (for Grameenphone)
summary: >-
  A field-operations platform for running large-scale telecom events end to end:
  a Go REST API, a Flutter app for on-the-ground staff, and a Next.js admin
  console, designed, built, and deployed to production on AWS by one engineer.
problem: >-
  Grameenphone events were coordinated over spreadsheets, phone calls, and
  paper. Attendance, equipment, and staff assignments lived in files that were
  emailed around and went stale immediately, so no one had a reliable live
  picture of an event in progress and reconciling the numbers afterwards took
  days. Metal Plus needed a single system that field staff and back-office
  coordinators could both trust in real time.
contribution: >-
  I owned the whole system. I designed the data model and the API, built the Go
  backend, the Flutter field client, and the Next.js admin console, wrote the
  migrations, containerised the stack, and deployed and operated it on AWS. There
  was no other engineer — architecture decisions, code review of my own work
  against a written checklist, release, and production support were all mine.
stack:
  - Go 1.24
  - PostgreSQL
  - sqlx + golang-migrate
  - JWT (HMAC-SHA256) + RBAC
  - Flutter / Dart 3.10
  - BLoC + Clean Architecture
  - Next.js 16 / React 19 / TypeScript / MUI
  - Docker Compose + Nginx
  - AWS (EC2, S3, ap-southeast-1)
outcomes:
  - "Replaced the spreadsheet-and-phone workflow with one live system used by field staff and coordinators at the same time."
  - "Excel import/export (via excelize) let coordinators keep working in the format they knew while the platform stayed the source of truth."
  - "Shipped to production on AWS and maintained as a single-engineer service — layered architecture and migrations kept later changes safe."
  - "Proved end-to-end ownership: one person taking a telecom client's operations from spreadsheets to a deployed multi-client platform."
draft: false
order: 1
---

## Architecture

The platform is three deployables sharing one PostgreSQL database, all running in
Docker Compose behind Nginx on a single EC2 instance in `ap-southeast-1`.

### API — Go

The backend is a layered REST service: transport handlers call a service layer,
which calls repositories; nothing skips a layer. `sqlx` gives hand-written SQL
with struct scanning — no ORM — and `golang-migrate` versions the schema so every
environment is reproducible from zero.

Auth is deliberately small and owned rather than pulled from a framework: JWTs
signed with HMAC-SHA256, verified in middleware, with a role check
(`RBAC`) gating the routes that mutate event data. File uploads — attendance
sheets, equipment photos — go to S3 with the API issuing scoped access.

The reporting path is Excel in both directions. Coordinators upload a filled
spreadsheet and the API parses it with `excelize`; they can also export the
platform's live state back to the same layout for anyone still working in Excel.

### Field client — Flutter

The staff app is Flutter/Dart 3.10 on Clean Architecture: presentation talks to
BLoC, BLoC to use-cases, use-cases to repositories. `Dio` handles transport with
the JWT attached by an interceptor, `GetIt` wires dependencies, and Firebase Core
plus Messaging deliver push for assignment changes. The app is built so a staffer
with a patchy signal at a venue can still record attendance and sync later.

### Admin console — Next.js

Back-office coordinators use a Next.js 16 / React 19 / TypeScript console with
MUI: event setup, staff and equipment assignment, live monitoring of an event in
progress, and the Excel import/export screens.

### Operations

Everything is one `docker compose` file. Nginx terminates TLS and routes to the
API and the admin console; Postgres and the app containers are on a private
network. Deploys are a pull-and-restart on the EC2 host, and because the schema
is migration-driven, a rollback is a known quantity rather than a guess.
