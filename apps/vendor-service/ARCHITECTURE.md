<!-- AUTO-GENERATED from docs/architecture.doc.ts. Do not edit directly. -->

Architecture

Vendor-service follows Clean Architecture + DDD + CQRS + Hexagonal (Ports & Adapters).

## Layer Overview

    ┌──────────────────────────────────────────────────────┐
    │  interfaces/         HTTP / Guards / Decorators      │
    ├──────────────────────────────────────────────────────┤
    │  application/        Commands / Queries / Sagas      │
    ├──────────────────────────────────────────────────────┤
    │  domain/             Entities / VO / Services / Specs│
    ├──────────────────────────────────────────────────────┤
    │  infrastructure/     Prisma / Redis / Queues / Ext   │
    └──────────────────────────────────────────────────────┘

Dependency direction: **inward only** — outer layers depend on inner, never the reverse.

## 1. Domain Layer

**Pure business logic — no framework, no I/O.**

    domain/
      errors/                Domain errors (VendorNotFound, InvalidStatus, ...)
      value-objects/
        primitives/          ~62 VO (VendorIdVO, VendorStatusVO, ...)
        composites/          ~23 VO (VendorIdentityVO, VendorContactVO, ...)
      entities/              23 entities (VendorEntity + 22 supporting)
      events/                22 event files (151 event classes)
      repositories/          23 repository interfaces + symbol tokens
      services/              10 stateless domain services
      specifications/        10 Specification<T> classes

**Key primitives:**

- `BaseVO<T>`, `BaseIdVO`, `BaseNameVO`, `BaseSlugVO`, `BaseStatusVO`, `BaseTypeVO`, `BaseCodeVO`
- `BaseEntity<TId>`, `AggregateRoot<TId>`
- `BaseDomainEvent`, `DomainEvent`, `EventEnvelope`
- `BaseRepository<TEntity, TId>`
- `Specification<T>` + And/Or/Not/Composite

## 2. Application Layer

**Use-case orchestration — no HTTP, no SQL.**

    application/
      errors/               Application-level errors
      dtos/requests/        35 request DTOs
      dtos/responses/       17 response DTOs
      services/
        interfaces/         23 service contracts + symbol tokens
        impl/               23 service implementations
      commands/             69 commands + handlers (NestJS CQRS)
      queries/              46 queries + handlers
      sagas/                5 sagas + 7 saga-commands
      mappers/              5 mappers (entity → DTO)
      validators/           3 Zod-based validators

**Pattern:**

    Controller → CommandBus → CommandHandler → Service → Repository
                         ↓
                       Domain events
                         ↓
                       Sagas / Projections

## 3. Infrastructure Layer

**Adapters — I/O, persistence, messaging, external.**

    infrastructure/
      persistence/
        prisma/
          mappers/          23 Prisma↔Domain mappers
          repositories/     23 Prisma repository implementations
          prisma-repositories.module.ts
        cache/
          repositories/     4 Redis-backed cache repos
          redis-repositories.module.ts
      services/
        external/           5 external services (bank, storage, notify, analytics, slug)
      queues/               6 BullMQ queues
      workers/              6 BullMQ workers + base
      queues-workers.module.ts
      infrastructure.module.ts

## 4. Interfaces Layer

**HTTP edges + cross-cutting HTTP concerns.**

    interfaces/
      controllers/rest/     21 REST controllers
      guards/               3 vendor-specific guards
      decorators/           4 custom decorators
      interceptors/         1 cache interceptor
      dtos/                 HTTP request/response DTOs
      mappers/              HTTP DTO ↔ Application DTO
      swagger/              tags + bearer auth constants
      validators/           Zod schemas for input

## 5. Modules Layer

**NestJS DI wiring — one module per bounded context.**

    modules/
      common/               kernel + vendor infra globals
      vendor-core/          register + lifecycle + profile + search
      vendor-onboarding/    document + verification + approval + suspension
      vendor-team/          team + invites
      vendor-payout/        payout + settlement + invoice
      vendor-subscription/  subscription + commission
      vendor-feedback/      rating + review + performance
      vendor-operational/   shipping + warranty + return-policy + settings + stats + report
      health/               liveness / readiness / health
      app.module.ts         root

## Data Flow Example — Register Vendor

1. `POST /api/v1/vendors` hits `VendorController.register()`
2. Controller maps HTTP DTO → `RegisterVendorRequestDto` via `VendorControllerMapper`
3. Dispatches `RegisterVendorCommand` on `CommandBus`
4. `RegisterVendorHandler` invokes `VendorService.register()`
5. Service validates uniqueness (repo.exists*), builds VOs, calls `VendorEntity.create()`
6. Entity emits `VendorRegisteredEvent`; repo persists via `VendorPrismaRepository.save()`
7. Mapper converts entity → `VendorResponseDto`
8. Controller returns the DTO

## Domain Events

151 typed events across 22 files. Emitted by aggregates; published post-commit
via `KernelEventBusModule` → `EventBusModule` (Redis-backed).

## CQRS

- **Commands** mutate state; validated, single write.
- **Queries** read-only; may hit cache.
- **Sagas** coordinate multi-step workflows (registration, payout, suspension, approval, subscription).

## Persistence

Prisma schema lives at `packages/shared-kernel/prisma/schema.prisma` — **single source of truth**.
Vendor tables (23): vendors, vendor_profiles, vendor_settings, vendor_documents, ... (see schema).

## Caching

4 cache repos:

- `VendorCacheRepository` — vendor snapshots
- `VendorSlugCacheRepository` — slug → id maps
- `VendorStatsCacheRepository` — stats rollups
- `VendorSearchCacheRepository` — search results

## Queues

6 BullMQ queues + 6 workers:

| Queue | Worker | Purpose |
|-------|--------|---------|
| vendor-payout-processing | PayoutProcessingWorker | Move approved → paid |
| vendor-report-generation | ReportGenerationWorker | Async report building |
| vendor-stats-aggregation | StatsAggregationWorker | Daily rollups |
| vendor-suspension-auto-lift | SuspensionAutoLiftWorker | Lift expired suspensions |
| vendor-document-expiry | DocumentExpiryWorker | Mark expired docs |
| vendor-tier-evaluation | TierEvaluationWorker | Promote/demote |

## Testing

See [TESTING.md](./TESTING.md). Current coverage: **90.72%** statements, **91.42%** functions, **91.30%** lines.

## Quality Rules

- **No framework imports in `domain/`** — only pure TS + kernel base classes.
- **No Prisma types leaked outside `infrastructure/persistence/prisma/mappers`**.
- **Every VO has `create()` and `reconstitute()`** — validate on create, trust on reconstitute.
- **Every entity emits typed events**; never mutate state silently.
- **Repository interfaces live in `domain/repositories`**, impls in `infrastructure/persistence/prisma/repositories`.
- **`.js` extensions on all relative imports** (ESM).
