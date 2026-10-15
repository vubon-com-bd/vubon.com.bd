# Development Guide — Cart Service

## 📋 Prerequisites

- **Node.js:** 22+
- **pnpm:** 9+
- **PostgreSQL:** 15+ (only for `DB_MODE=prisma`)
- **Redis:** 7+ (only for `DB_MODE=prisma`)

## 🚀 Quick Start

```bash
cd ~/vubon.com.bd
pnpm install
cd apps/cart-service
cp .env.example .env
pnpm build
DB_MODE=memory node dist/main.js
```

## 🗄️ Database Setup

**Manual SQL (Termux compatible):**

```bash
createdb -h localhost -U $(whoami) vubon_cart
psql -h localhost -U $(whoami) -d vubon_cart \
  -f ~/.db-manual-migrations/cart-service/20261101_create_cart_tables.sql
cd ~/vubon.com.bd/packages/shared-kernel && npx prisma generate
```

## 🔴 Redis Setup

```bash
redis-server --daemonize yes
redis-cli ping  # → PONG
```

## 🏗️ Development Workflow

```bash
# Watch mode
pnpm start:dev

# Build
pnpm build

# Run
node dist/main.js
```

## 🧪 Testing

```bash
pnpm test              # All tests
pnpm test:unit         # Unit only
pnpm test:e2e          # E2E only
pnpm test:cov          # Coverage
```

## 🔧 Generators

```bash
pnpm generate:postman    # Postman collection
pnpm generate:inmemory   # InMemory repos
pnpm generate:docs       # Documentation
```

## 🎯 Common Tasks

| Task | Command |
|------|---------|
| Add new VO | Create in `domain/value-objects/primitives/` |
| Add new entity | Create in `domain/entities/` |
| Add new command | `application/commands/<concept>/` |
| Add new endpoint | `interfaces/controllers/rest/` |
| Add new guard | `interfaces/guards/` |

## 🐛 Debugging

**Enable debug logs:**
```bash
LOG_LEVEL=debug node dist/main.js
```

**Inspect Prisma:**
```bash
DB_LOGGING=true node dist/main.js
```

**Redis CLI:**
```bash
redis-cli
> KEYS cart:*
> GET cart:svc:by-id:xxx
```

## 🎯 Code Style

- **Files:** kebab-case
- **Classes:** PascalCase
- **Imports:** Always `.js` extension
- **Strict TS:** No `any` (except InMemory repos)

## 🔐 Security Best Practices

- Never commit `.env`
- JWT secrets min 32 chars
- Validate all inputs (class-validator + Zod)
- Idempotency on mutations
- Rate limit external calls

## 🎯 Troubleshooting

| Issue | Fix |
|-------|-----|
| Port 3003 busy | `lsof -i :3003` then kill |
| Prisma engine fail | Use `DB_MODE=memory` on Termux |
| Redis down | `redis-server --daemonize yes` |
| Tests fail | `pnpm clean && pnpm install` |

## 📚 Additional Resources

- [NestJS Docs](https://docs.nestjs.com)
- [DDD Reference](https://martinfowler.com/tags/domain%20driven%20design.html)
- [CQRS Pattern](https://martinfowler.com/bliki/CQRS.html)
