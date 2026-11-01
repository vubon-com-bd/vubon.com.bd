# GitHub Actions Workflows

CI/CD pipelines for the `vubon.com.bd` monorepo. All workflows operate
on the entire workspace — new services are picked up automatically.

---

## Workflows

| File | Trigger | Purpose |
|------|---------|---------|
| `ci.yml` | Push / PR / Manual | Lint, type-check, build, test, security scan |
| `codeql.yml` | Push to main / PR / Weekly | CodeQL security analysis |
| `deploy.yml` | Push to main | (Optional) Trigger Railway deploy per service |

---

## Pipeline Overview

### `ci.yml` — Main CI

    lint → type-check → build → ┬─► test
                                ├─► security (CodeQL + audit)
                                └─► status (aggregate gate)

Runs on push to: `main`, `master`, `develop`, `feature/auth-ports`, `feature/Bishmillah`.

### `codeql.yml` — Security

Full CodeQL analysis for `javascript-typescript`.

Runs on:
- Push / PR to `main`, `master`
- Weekly schedule: `0 0 * * 0` (Sunday 00:00 UTC)

### `deploy.yml` — Deployment (optional)

Triggers Railway deploy on push to `main`. Railway also auto-deploys on
push by default, so this workflow is only needed if you want explicit
GitHub-triggered deploys.

---

## Adding a New Service

Because the workflows operate at the workspace level, a new service in
`apps/<service-name>/` will automatically be included when:

1. It is added to `pnpm-workspace.yaml` (already covered by `apps/*`).
2. It has a `type-check`, `build`, and `test` script in its `package.json`.
3. Its dependencies are declared in `packages/*/package.json`.

No workflow edits are required.

---

## Required Secrets (optional)

| Secret | Purpose | Needed? |
|--------|---------|---------|
| `RAILWAY_TOKEN` | Railway CLI deployment | Only if using `deploy.yml` |

---

## Required Variables

None. The CI uses stub env values or in-memory fallbacks for tests.

---

## Artifacts

| Artifact | Retention | Content |
|----------|-----------|---------|
| `vubon-build-<sha>` | 7 days | `dist/` folders from all packages |

---

## Local Equivalent

To reproduce the CI locally, run from the repo root:

    pnpm install --no-frozen-lockfile
    pnpm -r run build
    pnpm -r run type-check
    pnpm -r run test

---

## Notes

- **pnpm version:** 9.15.9 (pinned in workflows)
- **Node version:** latest LTS (`actions/setup-node@v4`)
- **Lockfile mode:** `--no-frozen-lockfile` for flexible installs
- **CodeQL action:** `github/codeql-action@v4`
- **Branch protection:** recommend enabling "Require status checks" on `main`
