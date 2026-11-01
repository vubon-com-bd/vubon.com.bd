# Order Service — vubon.com.bd

Production-grade Order microservice — DDD-based 5-layer architecture.

## Overview

| Attribute | Value |
|-----------|-------|
| Package | @vubon/order-service |
| Port | 3004 |
| Framework | NestJS 12 |
| Architecture | DDD + CQRS + Event Bridge |
| DB | PostgreSQL (Prisma) / InMemory (dual-mode) |
| Tests | 1922 unit + 173 e2e (100% pass) |
| Coverage | 86.74% statements |

## Quick Start

### Prerequisites
- Node.js 22+
- pnpm 9+
- PostgreSQL 14+ (only for DB_MODE=prisma)
- Redis 6+

### Install
    pnpm install

### Env Setup
    cp .env.example .env

Set DB_MODE=memory (default — no DB) or DB_MODE=prisma (production).

### Run
    DB_MODE=memory pnpm start:dev
    DB_MODE=prisma pnpm start:dev
    pnpm build && node dist/main.js

### Health Check
    curl http://localhost:3004/health

## Architecture

    src/module/
      domain/           Business logic (no framework)
      application/      Use cases (CQRS handlers)
      infrastructure/   Persistence, queues, external
      interfaces/       Controllers, guards, DTOs
      modules/          DI wiring (NestJS modules)

### Key Features
- Domain Layer: 45 VOs, 13 entities, 13 repositories, 37 events, 9 services, 6 specifications
- Application Layer: 31 commands, 21 queries, 11 services, 7 sagas
- Infrastructure: Prisma + InMemory repos, 7 queues, 8 workers
- Interfaces: 11 REST controllers, 3 GraphQL resolvers, 4 guards, 3 interceptors
- Modules: 14 feature modules + common + health

## Database Mode

| Mode | Use case | DB Required |
|------|----------|-------------|
| memory | Termux dev, CI, local testing | No |
| prisma | Staging, production | Yes |

Set via DB_MODE env var. Switch is transparent to application code.

## Testing

    pnpm test:unit
    pnpm test:e2e:custom
    pnpm test:unit:cov

## Endpoints Overview

| Group | Count | Base Path |
|-------|-------|-----------|
| Health | 1 | /health |
| Orders | 11 | /orders |
| Order Items | 5 | /orders/:id/items |
| Checkouts | 7 | /checkouts |
| Deliveries | 5 | /deliveries |
| Cancels | 4 | /cancels |
| Returns | 5 | /returns |
| Fulfillments | 5 | /fulfillments |
| Tracking | 5 | /tracking |

Total: 48 REST endpoints

## Project Structure

    apps/order-service/
      src/
        main.ts
        module/
          domain/
          application/
          infrastructure/
          interfaces/
          modules/
      test/
        unit/
        e2e/
        fixtures/
      postman/
      prisma/
      docs/

## Security

- JWT bearer auth (shared with identity-service)
- Rate limiting via @nestjs/throttler
- Idempotency keys for mutations
- Domain-level invariants + validation
- HTTPS-only in production

## Documentation

- ARCHITECTURE.md — 5-layer DDD detail
- API.md — Full endpoint reference
- TESTING.md — Test suite
- DEVELOPMENT.md — Dev guide
- DEPLOYMENT.md — Deploy guide
- CHANGELOG.md — Version history

## License

MIT — see LICENSE
