# Scripts — cart-service

Utility scripts for development, deployment, and diagnostics.

---

## Documentation

### `docs:build`

Generate all `.md` files from `docs/*.doc.ts` source.

    pnpm docs:build

**Source files:**
- `docs/architecture.doc.ts` → `ARCHITECTURE.md`
- `docs/api.doc.ts` → `API.md`
- `docs/development.doc.ts` → `DEVELOPMENT.md`
- `docs/deployment.doc.ts` → `DEPLOYMENT.md`
- `docs/testing.doc.ts` → `TESTING.md`

**Note:** All generated `.md` files carry header `<!-- AUTO-GENERATED -->`. Do not edit directly — edit the `.doc.ts` source then re-run.

---

## Development

### Build & run

    pnpm build          # TypeScript → dist/
    pnpm start:dev      # watch mode
    pnpm start:prod     # node dist/main.js

### Test

    pnpm test           # unit tests
    pnpm test:cov       # unit + coverage
    pnpm test:e2e       # E2E tests
    pnpm type-check     # TypeScript validation

### Lint

    pnpm lint           # ESLint auto-fix

### Prisma

    pnpm prisma:generate   # regenerate client
    pnpm prisma:migrate    # apply migrations

---

## Diagnostics (Termux)

### Check running server

    ps aux | grep node

### Kill server

    pkill -f "node.*cart-service"

### Redis inspection

    redis-cli ping
    redis-cli keys "cart:*"
    redis-cli get "cart:<uuid>"
    redis-cli ttl "cart:<uuid>"

### File counts by layer

    for d in domain application infrastructure interfaces modules; do
      echo "$d: $(find src/module/$d -name '*.ts' | wc -l) files"
    done

### Test counts by layer

    for d in domain application infrastructure interfaces modules; do
      echo "$d: $(find test/unit/$d -name '*.spec.ts' | wc -l) tests"
    done
