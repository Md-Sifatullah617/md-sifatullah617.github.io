# CLAUDE

Astro static site (personal-brand hub), deployed to GitHub Pages at `sifatullah.me`.
`main` is the source branch; pushing to `main` builds and deploys via
`.github/workflows/deploy.yml` (no magic commit-message string). The old Flutter app is
archived on the `sifat` branch. See `README.md` and `docs/adr/0001-rebuild-portfolio-on-astro.md`.

## Agent skills

### Issue tracker

Issues and PRDs live as GitHub issues in `Md-Sifatullah617/md-sifatullah617.github.io`, via the `gh` CLI. External PRs are also a triage surface. See `docs/agents/issue-tracker.md`.

### Triage labels

Canonical vocabulary, unchanged: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` + `docs/adr/` at the repo root (created lazily by `/domain-modeling`). See `docs/agents/domain.md`.
