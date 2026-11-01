/**
 * DEVELOPMENT.md Content — Notification Service
 * @module notification-service/docs
 */

export const DEVELOPMENT_CONTENT = String.raw`# 💻 Development Guide — Notification Service

Complete guide for local development, from setup to debugging.

## 📋 Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| **Node.js** | 22.x | [nvm](https://github.com/nvm-sh/nvm) |
| **pnpm** | 9.x | \`corepack enable\` |
| **PostgreSQL** | 15+ | \`apt install postgresql\` (Linux) / \`pkg install postgresql\` (Termux) |
| **Redis** | 7+ | \`apt install redis-server\` |
| **Git** | any | system default |

### Verify Installation

\`\`\`bash
node --version   # v22.x
pnpm --version   # 9.x
psql --version   # PostgreSQL 15.x
redis-server --version
\`\`\`

## 🚀 Quick Start (Memory Mode — Recommended for Dev)

No PostgreSQL needed — uses in-memory storage.

\`\`\`bash
# 1. Clone
git clone https://github.com/vubon/vubon.com.bd.git
cd vubon.com.bd

# 2. Install deps
pnpm install

# 3. Build shared packages
pnpm --filter @vubon/shared-kernel build
pnpm --filter @vubon/shared-types build
pnpm --filter @vubon/shared-constants build
pnpm --filter @vubon/shared-config build
pnpm --filter @vubon/shared-utils build
pnpm --filter @vubon/shared-schemas build

# 4. Setup env
cd apps/notification-service
cp .env.example .env

# 5. Run in memory mode
PERSISTENCE_DRIVER=memory \
PRISMA_SKIP_ENGINE_BOOTSTRAP=true \
DISABLE_AUTH=true \
pnpm start:dev

# 6. Open
# Swagger: http://localhost:3003/api/docs
# Health:  http://localhost:3003/health
\`\`\`

## 🗄️ Database Setup (Prisma Mode)

### Create Database

\`\`\`bash
# Via createdb
createdb vubon_notification -U vubon

# Or via psql
psql -U postgres
\`\`\`

\`\`\`sql
CREATE DATABASE vubon_notification;
CREATE USER vubon WITH PASSWORD 'vubon';
GRANT ALL PRIVILEGES ON DATABASE vubon_notification TO vubon;
\\q
\`\`\`

### Run Prisma Migrations (manual)

\`\`\`bash
cd apps/notification-service

# Generate Prisma Client
pnpm prisma:generate

# Run migrations
pnpm prisma:migrate:deploy

# Or open Prisma Studio
pnpm prisma:studio
\`\`\`

### Connection Check

\`\`\`bash
psql -U vubon -d vubon_notification -c "SELECT 1;"
\`\`\`

## 🔴 Redis Setup

\`\`\`bash
# Start Redis (system)
redis-server

# Or daemonized
redis-server --daemonize yes

# Check
redis-cli ping
# PONG

# Termux
pkg install redis
redis-server &
\`\`\`

## 🏗️ Development Workflow

### 1. Feature Branch

\`\`\`bash
git checkout -b feature/notification-new-channel
\`\`\`

### 2. Follow Layer Order

1. **Domain** — Entities, VOs, events, services
2. **Application** — Commands, queries, DTOs
3. **Infrastructure** — Repository impl, providers
4. **Interfaces** — Controllers, guards, DTOs
5. **Modules** — Wire everything
6. **Tests** — Unit + E2E

### 3. Generate Boilerplate

\`\`\`bash
# Postman collection
pnpm postman:generate

# InMemory repos
node scripts/generate-inmemory-repos.mjs

# README
pnpm generate:readme
\`\`\`

### 4. Type-check Frequently

\`\`\`bash
pnpm type-check
\`\`\`

### 5. Run Tests

\`\`\`bash
pnpm test:domain      # Fast — domain layer
pnpm test             # All unit tests
pnpm test:e2e         # E2E
\`\`\`

### 6. Commit

\`\`\`bash
git add .
git commit -m "feat(notification): add new channel support"
git push origin feature/notification-new-channel
\`\`\`

## 🧪 Testing

### Run Specific Layer

\`\`\`bash
pnpm test:domain
pnpm test:application
pnpm test:infra
pnpm test:interfaces
pnpm test:modules
\`\`\`

### Watch Mode

\`\`\`bash
pnpm test:watch
\`\`\`

### Coverage

\`\`\`bash
pnpm test:cov
termux-open coverage/lcov-report/index.html
\`\`\`

## 🔧 Generators

| Command | Output |
|---------|--------|
| \`pnpm postman:generate\` | \`postman/Notification Service.postman_collection.json\` + 3 envs |
| \`pnpm generate:readme\` | \`README.md\` from \`docs/readme-content.ts\` |
| \`node scripts/generate-inmemory-repos.mjs\` | 18 InMemory repos in \`src/.../memory/repositories/\` |
| \`pnpm generate:all\` | All three above |

## 📁 Project Structure

\`\`\`
apps/notification-service/
├── src/
│   ├── main.ts                   ← Entry point
│   └── module/
│       ├── domain/               ← Layer 1 (pure business logic)
│       ├── application/          ← Layer 2 (orchestration)
│       ├── infrastructure/       ← Layer 3 (DB, queue, providers)
│       ├── interfaces/           ← Layer 4 (HTTP)
│       └── modules/              ← Layer 5 (DI wiring)
├── test/                         ← Unit + E2E tests
├── scripts/                      ← Generators
├── postman/                      ← Postman collection
├── docs/                         ← Documentation
├── prisma/                       ← Schema + migrations
├── .env.example
├── Dockerfile
├── package.json
├── tsconfig.json
└── README.md
\`\`\`

## 🎯 Common Tasks

### Add a New Endpoint

1. **Application DTO** — \`application/dtos/requests/\`
2. **Command/Query** — \`application/commands/\` or \`queries/\`
3. **Handler** — same folder
4. **HTTP DTO** — \`interfaces/dtos/requests/\`
5. **Controller method** — \`interfaces/controllers/rest/\`
6. **Mapper** — \`interfaces/mappers/\`
7. **Register handler** — \`modules/<feature>/commands/index.ts\`
8. **Test** — \`test/unit/interfaces/\` + \`test/e2e/interfaces/\`
9. **Postman** — update \`scripts/generate-postman-collection.mjs\`

### Add a New Entity

1. **VO** — \`domain/value-objects/primitives/\`
2. **Entity** — \`domain/entities/\`
3. **Events** — \`domain/events/\`
4. **Repository interface** — \`domain/repositories/\`
5. **Service interface + impl** — \`application/services/\`
6. **Commands/Queries** — \`application/commands/\` + \`queries/\`
7. **HTTP controller + DTOs** — \`interfaces/\`
8. **Prisma repo + mapper** — \`infrastructure/persistence/prisma/\`
9. **InMemory repo** — run \`node scripts/generate-inmemory-repos.mjs\`
10. **Feature module** — \`modules/<new-entity>/\`
11. **Register** — \`app.module.ts\`

### Debug with VsCode

\`.vscode/launch.json\`:
\`\`\`json
{
  "version": "0.2.0",
  "configurations": [{
    "type": "node",
    "request": "launch",
    "name": "Debug",
    "program": "${workspaceFolder}/dist/main.js",
    "preLaunchTask": "build",
    "env": {
      "PERSISTENCE_DRIVER": "memory",
      "PRISMA_SKIP_ENGINE_BOOTSTRAP": "true",
      "DISABLE_AUTH": "true"
    }
  }]
}
\`\`\`

## 🐛 Debugging

### View Logs

\`\`\`bash
tail -f ~/notif-memory-*.log
\`\`\`

### Memory Mode Issues

| Problem | Solution |
|---------|----------|
| \`Cannot resolve dependency\` | Check \`PrismaRepositoriesModule\` not imported directly |
| \`Prisma engine unavailable\` | \`PRISMA_SKIP_ENGINE_BOOTSTRAP=true\` |
| \`AUTH failed\` | \`DISABLE_AUTH=true\` for dev |
| \`Port in use\` | \`pkill -f "node dist/main"\` |

### Health Check Fails

\`\`\`bash
curl http://localhost:3003/health | jq .
\`\`\`

- Memory mode: \`database.healthy: false\` (expected)
- Prisma mode: check \`DATABASE_URL\`

## 🎯 Code Style

### File Naming

| Type | Pattern | Example |
|------|---------|---------|
| VO (primitive) | \`<concept>-<prop>.vo.ts\` | \`notification-id.vo.ts\` |
| VO (composite) | \`<concept>.vo.ts\` | \`notification.vo.ts\` |
| Entity | \`<concept>.entity.ts\` | \`notification.entity.ts\` |
| Repository | \`<concept>.repository.interface.ts\` | \`notification.repository.interface.ts\` |
| Service | \`<concept>-<action>.service.ts\` | \`template-renderer.service.ts\` |
| Command | \`<action>-<concept>.command.ts\` | \`send-notification.command.ts\` |
| Query | \`<action>-<concept>.query.ts\` | \`get-notification.query.ts\` |
| Handler | \`<action>-<concept>.handler.ts\` | \`send-notification.handler.ts\` |
| Controller | \`<concept>.controller.ts\` | \`notification.controller.ts\` |
| Error | \`<concept>.errors.ts\` | \`notification.errors.ts\` |
| DTO | \`<concept>.request.dto.ts\` | \`notification.request.dto.ts\` |

### Class Naming

| Type | Pattern | Example |
|------|---------|---------|
| VO | \`<Concept><Property>VO\` | \`NotificationIdVO\` |
| Entity | \`<Concept>Entity\` | \`NotificationEntity\` |
| Repository | \`<Concept>Repository\` | \`NotificationRepository\` |
| Service | \`<Concept><Action>Service\` | \`TemplateRendererService\` |
| Command | \`<Action><Concept>Command\` | \`SendNotificationCommand\` |
| Handler | \`<Action><Concept>Handler\` | \`SendNotificationHandler\` |
| Controller | \`<Concept>Controller\` | \`NotificationController\` |
| Error | \`<Concept><Issue>Error\` | \`NotificationNotFoundError\` |

### Import Rules

\`\`\`typescript
// ✅ Always use alias
import { X } from '@domain/...';
import { Y } from '@application/...';
import { Z } from '@infrastructure/...';

// ❌ Never relative across layers
import { X } from '../../domain/...';  // WRONG
\`\`\`

### Always Append \`.js\` Extension

\`\`\`typescript
// ✅ Correct (ESM)
import { NotificationEntity } from './notification.entity.js';

// ❌ Wrong
import { NotificationEntity } from './notification.entity';
\`\`\`

## 🔐 Security Best Practices

1. **Never commit \`.env\`** — only \`.env.example\`
2. **Never hardcode secrets** — use env vars
3. **Validate all input** — class-validator + Zod
4. **Guard every route** — \`@UseGuards(JwtAuthGuard)\`
5. **Sanitize HTML** — \`ContentSanitizerInfraService\`
6. **Sign webhooks** — HMAC-SHA256
7. **Rate limit send endpoints** — \`NotificationRateLimitGuard\`
8. **Use idempotency keys** — for all mutations

## 🎯 Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | \`pnpm clean && pnpm build\` |
| Type error | \`pnpm type-check\` and fix aliases |
| Port in use | \`pkill -f "node dist/main"\` |
| DB connection refused | Check \`DATABASE_URL\` + \`psql -U vubon\` |
| Prisma engine error | \`PRISMA_SKIP_ENGINE_BOOTSTRAP=true\` |
| Redis unavailable | \`redis-cli ping\` |
| Auth fails | \`DISABLE_AUTH=true\` (dev only) |
| Test fails | \`pnpm test -- --detectOpenHandles\` |

## 📚 Additional Resources

- [README.md](./README.md) — overview
- [ARCHITECTURE.md](./ARCHITECTURE.md) — 5 layers
- [API.md](./API.md) — REST endpoints
- [TESTING.md](./TESTING.md) — test patterns
- [DEPLOYMENT.md](./DEPLOYMENT.md) — production

### External

- [NestJS Docs](https://docs.nestjs.com)
- [Prisma Docs](https://prisma.io/docs)
- [BullMQ Docs](https://docs.bullmq.io)
- [class-validator](https://github.com/typestack/class-validator)
`;

export function getDevelopmentContent(): string {
  return DEVELOPMENT_CONTENT;
}
