# Development Guide — Product Service

Complete guide for setting up and developing the Product Service locally.

---

## 📋 Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| **Node.js** | >= 22 | Runtime |
| **pnpm** | >= 9 | Package manager |
| **PostgreSQL** | >= 14 | Database (optional for dev) |
| **Redis** | >= 6 | Cache + Queue (optional) |
| **Git** | >= 2.30 | Version control |

### Termux (Android) Notes
- Prisma engine unavailable on ARM64
- Use `DB_MODE=memory` for development
- Redis needs `--ignore-warnings ARM64-COW-BUG` flag

---

## 🚀 Quick Start

### 1. Clone & Install

\`\`\`bash
cd ~/vubon.com.bd/apps/product-service
pnpm install
\`\`\`

### 2. Setup Environment

\`\`\`bash
cp .env.example .env
# Edit .env — set DB_MODE=memory for Termux
\`\`\`

**Minimum .env:**
\`\`\`env
NODE_ENV=development
PORT=3002
DB_MODE=memory
DATABASE_URL=postgresql://vubon:vubon@localhost:5432/vubon_product
REDIS_URL=redis://localhost:6379
JWT_SECRET=test_jwt_secret_must_be_at_least_32_characters_long
\`\`\`

### 3. Start Development Server

\`\`\`bash
pnpm start:dev
\`\`\`

**Server:** http://localhost:3002
**Swagger:** http://localhost:3002/api/docs

---

## 🗄️ Database Setup

### Option A — InMemory Mode (Termux, no setup)

\`\`\`env
DB_MODE=memory
\`\`\`

- No database required
- Data is in-memory (resets on restart)
- Fast startup
- Perfect for development

### Option B — PostgreSQL Mode

#### Install PostgreSQL

**Ubuntu/Debian:**
\`\`\`bash
sudo apt install postgresql postgresql-contrib
\`\`\`

**macOS:**
\`\`\`bash
brew install postgresql
\`\`\`

**Termux:**
\`\`\`bash
pkg install postgresql
\`\`\`

#### Create Database

\`\`\`bash
createdb -h localhost -U $(whoami) vubon_product
\`\`\`

#### Apply Tables (Manual — Termux-safe)

\`\`\`bash
psql -h localhost -U $(whoami) -d vubon_product \\
  -f ~/.db-manual-migrations/product-service/20261013_create_all_product_tables.sql
\`\`\`

#### Verify

\`\`\`bash
psql -h localhost -U $(whoami) -d vubon_product -c "\\dt"
# Should show 12 tables
\`\`\`

#### Update .env

\`\`\`env
DB_MODE=prisma
DATABASE_URL=postgresql://vubon:vubon@localhost:5432/vubon_product
\`\`\`

---

## 🔴 Redis Setup

### Install

**Ubuntu:**
\`\`\`bash
sudo apt install redis-server
\`\`\`

**macOS:**
\`\`\`bash
brew install redis
\`\`\`

**Termux:**
\`\`\`bash
pkg install redis
\`\`\`

### Start

**Standard:**
\`\`\`bash
redis-server --daemonize yes
\`\`\`

**Termux (ARM64 fix):**
\`\`\`bash
redis-server --daemonize yes --ignore-warnings ARM64-COW-BUG
\`\`\`

### Verify

\`\`\`bash
redis-cli ping
# → PONG
\`\`\`

---

## 🏗️ Development Workflow

### Start Server (dev mode with hot reload)

\`\`\`bash
pnpm start:dev
\`\`\`

### Type-check (watch)

\`\`\`bash
pnpm type-check --watch
\`\`\`

### Build (production)

\`\`\`bash
pnpm build
\`\`\`

### Run compiled

\`\`\`bash
pnpm start:prod
\`\`\`

---

## 🧪 Testing

### Unit Tests

\`\`\`bash
pnpm test:unit              # Run once
pnpm test:unit:watch        # Watch mode
pnpm test:unit:cov          # Coverage
\`\`\`

### E2E Tests

\`\`\`bash
pnpm test:e2e               # Run all
pnpm test:e2e:watch         # Watch mode
\`\`\`

### All Tests

\`\`\`bash
pnpm test:all               # Unit + E2E
\`\`\`

See [TESTING.md](./TESTING.md) for details.

---

## 🔧 Generators

### Regenerate E2E Tests

\`\`\`bash
pnpm generate:e2e
\`\`\`

Reads: \`scripts/e2e/endpoints.mjs\`
Writes: \`test/e2e/*.e2e-spec.ts\`

### Regenerate InMemory Repositories

\`\`\`bash
node scripts/generate-inmemory-repos.mjs
\`\`\`

Writes: \`src/module/infrastructure/persistence/memory/repositories/*.ts\`

---

## 📁 Project Structure

\`\`\`
product-service/
├── src/
│   ├── main.ts                  ← Bootstrap
│   └── module/
│       ├── domain/              ← Business logic (pure)
│       ├── application/         ← Use cases (CQRS)
│       ├── infrastructure/      ← Adapters (DB, cache)
│       ├── interfaces/          ← HTTP boundary
│       └── modules/             ← NestJS wiring
├── test/
│   ├── unit/                    ← Unit specs
│   ├── e2e/                     ← E2E specs
│   └── helpers/                 ← Test helpers
├── scripts/                     ← Generators
├── prisma/                      ← Prisma schema (stub)
└── docs/                        ← Additional docs
\`\`\`

See [ARCHITECTURE.md](./ARCHITECTURE.md) for layer details.

---

## 🎯 Common Tasks

### Add a New Endpoint

1. **Domain** — Add method to entity/VO if business rule needed
2. **Application** — Add service method + command/query handler
3. **Interfaces** — Add REST controller route + DTOs
4. **Modules** — Register handler in feature module
5. **Tests** — Add unit + e2e tests
6. **Regenerate** — `pnpm generate:e2e`

### Add a New Value Object

1. Create `src/module/domain/value-objects/primitives/<name>.vo.ts`
2. Extend `BaseVO` or specific base (`BaseIdVO`, `BaseNameVO`, ...)
3. Add `static create()` + `static reconstitute()`
4. Export from `index.ts`
5. Add unit test in `test/unit/domain/value-objects/`

### Add a New Repository

1. **Domain** — Create interface in `domain/repositories/`
2. **Infrastructure** — Prisma impl + InMemory impl
3. **Module** — Register in `PrismaRepositoriesModule` + `MemoryRepositoriesModule`
4. **DI Token** — Add Symbol to domain interface

### Add a New Saga

1. Create `src/module/application/sagas/<process>.saga.ts`
2. Import in `<feature>/sagas/index.ts`
3. Register in `<feature>.module.ts`

---

## 🐛 Debugging

### Enable verbose logging

\`\`\`env
LOG_LEVEL=debug
\`\`\`

### Debug with Node inspector

\`\`\`bash
node --inspect dist/main.js
\`\`\`

Open `chrome://inspect` in Chrome.

### View recent logs

\`\`\`bash
tail -f ~/product-server.log
\`\`\`

### Test a specific endpoint

\`\`\`bash
curl -X GET http://localhost:3002/health
curl -X GET http://localhost:3002/api/docs-json | jq
\`\`\`

---

## 🎯 Code Style

### Layer Rules

- **Domain** — No NestJS, no external libs
- **Application** — Orchestration only
- **Infrastructure** — Adapters for external systems
- **Interfaces** — HTTP boundary
- **Modules** — Wiring only

### Naming

| Type | Pattern |
|------|---------|
| VO | `<concept>-<prop>.vo.ts` |
| Entity | `<concept>.entity.ts` |
| Command | `<action>-<concept>.command.ts` |
| Handler | `<action>-<concept>.handler.ts` |
| Controller | `<concept>.controller.ts` |
| Module | `<feature>.module.ts` |

### Linting

\`\`\`bash
pnpm lint
\`\`\`

### Formatting

\`\`\`bash
pnpm format:write
\`\`\`

---

## 🔐 Security Best Practices

- ✅ Never commit `.env` (in `.gitignore`)
- ✅ Use `JWT_SECRET` with min 32 chars
- ✅ Enable `DB_SSL=true` in production
- ✅ Use environment variables for secrets
- ✅ Enable rate limiting in production
- ✅ Use idempotency keys for mutations

---

## 🎯 Troubleshooting

### Port already in use

\`\`\`bash
# Find process
lsof -i :3002
# or Termux:
pkill -f "node dist/main.js"
\`\`\`

### Prisma engine unavailable

**On Termux ARM64** — expected behavior. Use:
\`\`\`env
DB_MODE=memory
\`\`\`

### Redis connection refused

\`\`\`bash
# Termux:
redis-server --daemonize yes --ignore-warnings ARM64-COW-BUG
redis-cli ping
\`\`\`

### Build fails with TS errors

\`\`\`bash
pnpm type-check
\`\`\`

### E2E tests fail

\`\`\`bash
# Ensure server is running
curl http://localhost:3002/health
# Or restart:
pkill -f "node dist/main.js"
pnpm build && node dist/main.js &
\`\`\`

### Prisma client not generated

\`\`\`bash
cd ../../packages/shared-kernel
npx prisma generate
\`\`\`

---

## 📚 Additional Resources

- [README.md](./README.md) — Project overview
- [ARCHITECTURE.md](./ARCHITECTURE.md) — Layer patterns
- [API.md](./API.md) — API reference
- [TESTING.md](./TESTING.md) — Test guide
- [DEPLOYMENT.md](./DEPLOYMENT.md) — Deployment guide
- [CHANGELOG.md](./CHANGELOG.md) — Version history

---

## 🎯 Getting Help

1. Check [ARCHITECTURE.md](./ARCHITECTURE.md) for pattern questions
2. Check [TESTING.md](./TESTING.md) for test issues
3. Check service logs: `tail -f ~/product-server.log`
4. Verify runtime: `curl http://localhost:3002/health`
