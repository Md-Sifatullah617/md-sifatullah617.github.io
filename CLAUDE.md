# CLAUDE

Flutter web portfolio, deployed to GitHub Pages at `sifatullah.me`. Push to any branch
with `[deploy-web]` in the commit message to trigger the deploy workflow; `main` is the
built output, not source. Source lives on `sifat`.

## Agent skills

### Issue tracker

Issues and PRDs live as GitHub issues in `Md-Sifatullah617/md-sifatullah617.github.io`, via the `gh` CLI. External PRs are also a triage surface. See `docs/agents/issue-tracker.md`.

### Triage labels

Canonical vocabulary, unchanged: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` + `docs/adr/` at the repo root (created lazily by `/domain-modeling`). See `docs/agents/domain.md`.
