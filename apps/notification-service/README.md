# @vubon/notification-service

Multi-channel notification microservice for the Vubon platform.

## Features

- 5 channels: Email, SMS, Push, In-App, Webhook
- Multiple providers per channel with auto-fallback
- Template engine with variable substitution
- Scheduled + recurring notifications
- Broadcast (mass-send) with batching
- Per-user preferences + quiet hours
- Device registry for push
- Outbound webhooks for events
- Inbound provider webhooks (delivery/bounce tracking)
- Analytics + delivery attempts
- Rate limiting per channel
- Redis caching + BullMQ queues

## Stack

- NestJS 12 + CQRS + EventBus
- Prisma + PostgreSQL (shared schema from @vubon/shared-kernel)
- Redis (cache + queues)
- Zod + class-validator
- DDD architecture (Domain / Application / Infrastructure / Interfaces)

## Quick Start

    cd ~/vubon.com.bd
    pnpm install
    pnpm --filter @vubon/notification-service build
    pnpm --filter @vubon/notification-service start:dev

Service runs on port 4007 by default. Swagger:

    http://localhost:4007/api/v1/docs

## Environment

Copy `.env.example` to `.env.local` and configure providers. See
[docs/setup/PROVIDER-SETUP.md](docs/setup/PROVIDER-SETUP.md).

Minimum for local dev:

    DATABASE_URL=postgresql://postgres@localhost:5432/vubon
    REDIS_URL=redis://localhost:6379
    JWT_SECRET=dev-secret-at-least-32-chars-long-xxx

## Architecture

    src/module/
    ├── domain/           # Entities, VOs, events, repos interfaces, specs
    ├── application/      # Services, commands, queries, sagas, DTOs
    ├── infrastructure/   # Prisma repos, cache, queues, workers, providers
    ├── interfaces/       # Controllers, guards, DTOs, mappers
    └── modules/          # Feature modules wiring

See [docs/architecture/ARCHITECTURE.md](docs/architecture/ARCHITECTURE.md).

## Testing

    pnpm test:unit        # Unit tests (Jest)
    pnpm test:e2e         # E2E tests (Supertest)
    pnpm test:cov         # Coverage

Current: 2758 tests, 94% coverage.

## Project Scripts

| Command | Purpose |
|---------|---------|
| pnpm build | Compile to dist/ |
| pnpm start:dev | Dev with watch |
| pnpm start:prod | Prod from dist/ |
| pnpm type-check | tsc --noEmit |
| pnpm lint | ESLint |
| pnpm test:unit | Jest unit |
| pnpm test:e2e | Jest E2E |
| pnpm prisma:generate | Prisma client |
| pnpm prisma:migrate | Prisma migrate dev |

## Directory Layout

    apps/notification-service/
    ├── src/
    │   └── module/
    │       ├── domain/
    │       ├── application/
    │       ├── infrastructure/
    │       ├── interfaces/
    │       └── modules/
    ├── test/
    │   ├── unit/
    │   └── e2e/
    ├── docs/
    │   ├── setup/
    │   ├── architecture/
    │   └── guides/
    ├── package.json
    ├── tsconfig.json
    └── main.ts

## API Endpoints (Snapshot)

| Domain | Routes |
|--------|--------|
| Notifications | 19 |
| Email | 6 |
| SMS | 6 |
| Push | 7 |
| In-App | 6 |
| Templates | 13 |
| Schedules | 10 |
| Broadcasts | 10 |
| Digests | 8 |
| Preferences | 8 |
| Devices | 8 |
| Webhooks | 10 |
| Provider Webhooks | 1 |
| Analytics | 4 |
| Delivery | 2 |
| Health | 3 |

Full reference: [docs/guides/API-REFERENCE.md](docs/guides/API-REFERENCE.md)

## Provider Matrix

| Channel | Providers | Free Tier |
|---------|-----------|-----------|
| Email | Resend, SMTP | 3000/mo, 500/day |
| SMS | Twilio, SSLWireless | $15 trial, paid |
| Push | FCM, Web Push | Unlimited |
| In-App | SSE (built-in) | Free |
| Webhook | HTTP | Free |

Setup guide: [docs/setup/PROVIDER-SETUP.md](docs/setup/PROVIDER-SETUP.md)

## Deployment

See [docs/guides/DEPLOYMENT.md](docs/guides/DEPLOYMENT.md) for:

- Systemd unit file
- Docker + Docker Compose
- Nginx reverse proxy config
- Kubernetes health probes
- Scaling strategies
- Zero-downtime deploy + rollback

## Links

- [Provider Setup](docs/setup/PROVIDER-SETUP.md)
- [Architecture](docs/architecture/ARCHITECTURE.md)
- [API Reference](docs/guides/API-REFERENCE.md)
- [Deployment](docs/guides/DEPLOYMENT.md)
- [Local Development](docs/guides/LOCAL-DEVELOPMENT.md)
- [Testing](docs/guides/TESTING.md)
- [Glossary](docs/architecture/GLOSSARY.md)

## License

UNLICENSED — Private monorepo package.
