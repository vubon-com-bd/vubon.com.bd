<!-- AUTO-GENERATED from docs/readme.doc.ts. Do not edit directly. -->

Vendor Service

Vendor onboarding, profiles, verification, payouts, and operational APIs for the Vubon marketplace.

## Overview

The vendor-service is a NestJS microservice that owns the complete vendor lifecycle:

- **Registration & onboarding** — new vendors sign up, submit documents, and get verified.
- **Approval workflow** — admin reviews, approves, rejects, and handles appeals.
- **Team management** — owners invite members with role-based permissions.
- **Commission & payouts** — commission calculation, payout scheduling, settlement, invoicing.
- **Subscriptions** — vendor SaaS plans (free/basic/standard/premium/enterprise).
- **Ratings & reviews** — customer feedback aggregation with auto-hide/flag policies.
- **Performance evaluation** — grade (A+ → F), auto-suspend, reinstatement.
- **Shipping / warranty / return-policy** — operational configurations per vendor.
- **Reports** — async report generation and delivery.

## Architecture

Clean Architecture with 5 layers:

    src/module/
      domain/          — pure business logic (VO, entities, services, specs, events)
      application/     — use cases (commands, queries, sagas, mappers, validators)
      infrastructure/  — persistence (Prisma), cache (Redis), queues, workers, external
      interfaces/      — HTTP controllers, guards, interceptors, decorators
      modules/         — NestJS DI wiring (feature modules + common)

## Tech Stack

- **Runtime:** Node.js 22, TypeScript 5, ESM-only
- **Framework:** NestJS 12 + CQRS + BullMQ
- **Persistence:** PostgreSQL (Supabase) via Prisma 5
- **Cache / Queue:** Redis (ioredis)
- **Validation:** Zod + class-validator
- **Testing:** Jest 29 (unit) + Jest + Supertest (e2e)
- **Shared kernel:** `@vubon/shared-kernel`, `@vubon/shared-constants`, `@vubon/shared-types`, `@vubon/shared-schemas`, `@vubon/shared-utils`, `@vubon/shared-config`

## Quick Start

    cd ~/vubon.com.bd
    pnpm install

    # Ensure shared packages are built
    pnpm --filter @vubon/shared-kernel build
    pnpm --filter @vubon/shared-constants build
    pnpm --filter @vubon/shared-types build
    pnpm --filter @vubon/shared-schemas build
    pnpm --filter @vubon/shared-utils build
    pnpm --filter @vubon/shared-config build

    # Generate Prisma client
    cd packages/shared-kernel
    npx prisma generate --schema=prisma/schema.prisma
    cd ../..

    # Run unit tests
    pnpm --filter @vubon/vendor-service test

    # Run e2e tests
    pnpm --filter @vubon/vendor-service test:e2e

    # Start in dev mode
    pnpm --filter @vubon/vendor-service start:dev

Service listens on **http://localhost:4006/api/v1** (default; override via `PORT`).
Swagger docs: **http://localhost:4006/api/v1/docs**

## Scripts

| Script | Purpose |
|--------|---------|
| `pnpm build` | Compile TypeScript → `dist/` |
| `pnpm start:dev` | Dev server with hot reload |
| `pnpm start:prod` | Run compiled JS from `dist/` |
| `pnpm type-check` | TypeScript check without emit |
| `pnpm lint` | ESLint |
| `pnpm test` | Jest unit tests |
| `pnpm test:cov` | Unit tests + coverage |
| `pnpm test:e2e` | E2E (Supertest + mocked infra) |
| `pnpm prisma:generate` | Prisma client |
| `pnpm prisma:migrate` | Prisma migrations |
| `pnpm docs:build` | Regenerate markdown from `.doc.ts` |

## Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `NODE_ENV` | `development` | Runtime env |
| `PORT` | `4006` | HTTP port |
| `LOG_LEVEL` | `debug` | Logger level |
| `DATABASE_URL` | — | Postgres connection (Prisma) |
| `REDIS_URL` | `redis://localhost:6379` | Redis for cache + queues |
| `REDIS_DB` | `0` | Redis logical DB |
| `JWT_SECRET` | — | JWT verification secret |
| `STORAGE_BASE_URL` | `https://storage.vubon.local` | File storage base URL |

## Documentation Index

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — layers, DI, patterns
- **[API.md](./API.md)** — HTTP endpoints reference
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** — local setup, conventions, workflows
- **[TESTING.md](./TESTING.md)** — unit + e2e strategy
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** — build, migration, container, rollout
- **[CHANGELOG.md](./CHANGELOG.md)** — version history

## License

Proprietary — © Vubon.com.bd
