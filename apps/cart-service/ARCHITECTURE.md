# Architecture — Cart Service

## 🎯 The 5 Layers

```
┌─────────────────────────────────────────────────┐
│  Interfaces    (Controllers, Guards, DTOs)      │
├─────────────────────────────────────────────────┤
│  Application   (Commands, Queries, Sagas)       │
├─────────────────────────────────────────────────┤
│  Domain        (Entities, VOs, Services)        │
├─────────────────────────────────────────────────┤
│  Infrastructure (Prisma, Redis, Queue)          │
├─────────────────────────────────────────────────┤
│  Modules       (NestJS wiring)                  │
└─────────────────────────────────────────────────┘
```

## 1. Domain Layer (114 files)

**Purpose:** Business logic — no framework dependencies.

**Structure:**

```
domain/
├── value-objects/
│   ├── primitives/     # 34 single-value VOs
│   └── composites/     # 12 multi-value VOs
├── entities/           # 10 entities
├── events/             # Domain events
├── repositories/       # 10 repo interfaces
├── event-store/        # 4 event stores
├── services/           # 10 domain services
├── specifications/     # 6 specifications
└── errors/             # 8 typed error groups
```

**Rules:**

- ❌ NO NestJS, Prisma, Redis imports
- ❌ NO `console.log`
- ✅ Pure TypeScript + `@vubon/shared-kernel`
- ✅ All entities have `reconstitute()` + `assertInvariants()`

## 2. Application Layer (187 files)

**Purpose:** Orchestrate use cases.

**Structure:**

```
application/
├── commands/           # 52 CQRS write operations
├── queries/            # 30 CQRS read operations
├── sagas/              # 4 long-running processes
├── dtos/               # Multi-shape DTOs
├── services/           # 10 service interfaces + impls
├── mappers/            # Entity → DTO
├── errors/             # 6 typed error groups
└── validators/         # 4 validators
```

**Rules:**

- ✅ `@Injectable()` + DI token pattern
- ✅ Call domain methods (never touch DB directly)
- ✅ Publish events via `DomainEventBridgeService`
- ❌ NO Prisma/Redis imports (only via injected repos)

## 3. Infrastructure Layer (102 files)

**Purpose:** Adapters for external systems.

**Structure:**

```
infrastructure/
├── persistence/
│   ├── prisma/         # 15 files (repos, mappers)
│   ├── redis/          # 18 files (primary storage)
│   └── memory/         # 12 files (dev fallback)
├── queues/             # 7 BullMQ queues
├── workers/            # 9 background workers
├── external/           # Email + SMS + Push (17)
├── services/           # HTTP clients + internal (19)
└── config/             # 9 config files
```

**Rules:**

- ✅ Implements domain repository interfaces
- ✅ Handles DB/external APIs
- ❌ NO business logic

## 4. Interfaces Layer (65 files)

**Purpose:** HTTP/GraphQL contract.

**Structure:**

```
interfaces/
├── controllers/
│   ├── rest/           # 10 REST controllers
│   └── graphql/        # 1 GraphQL resolver
├── guards/             # 4 guards
├── interceptors/       # 3 interceptors
├── decorators/         # 6 decorators
├── dtos/               # class-validator + Swagger
├── mappers/            # HTTP DTO ↔ App DTO
├── swagger/            # Swagger bundles
└── middlewares/        # 2 middlewares
```

**Rules:**

- ✅ Thin controllers (delegate to CQRS)
- ✅ `extends BaseController` + `@CurrentUser()`
- ❌ NO DB calls

## 5. Modules Layer (48 files)

**Purpose:** NestJS DI wiring.

**Structure:**

```
modules/
├── common/             # Kernel + infra globals
├── health/             # Health indicator
├── cart/               # 7 files (feature)
├── cart-item/          # 4 files
├── cart-coupon/        # 4 files
├── cart-voucher/       # 4 files
├── cart-tax/           # 3 files
├── cart-shipping/      # 4 files
├── saved-for-later/    # 4 files
├── abandoned-cart/     # 5 files
├── guest-cart/         # 4 files
└── cart-merger/        # 3 files
```

## 🔗 Dependency Rules

| Layer | Can Import | Must NOT Import |
|-------|-----------|-----------------|
| Domain | shared-kernel/domain | NestJS, Prisma, everything else |
| Application | Domain, shared-kernel/application | Infrastructure, Interfaces |
| Infrastructure | Domain, Application, shared-kernel/infrastructure | Interfaces |
| Interfaces | Application, Domain, shared-kernel/interfaces | Infrastructure (except shared-kernel) |
| Modules | All | — |

## 📐 Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| VO | `<concept>-<property>.vo.ts` | `cart-id.vo.ts` |
| Entity | `<concept>.entity.ts` | `cart.entity.ts` |
| Event | `<aggregate>.events.ts` | `cart.events.ts` |
| Repository | `<aggregate>.repository.interface.ts` | `cart.repository.interface.ts` |
| Service | `<concept>-<action>.service.ts` | `cart-calculation.service.ts` |
| Command | `<action>-<concept>.command.ts` | `create-cart.command.ts` |
| Handler | `<action>-<concept>.handler.ts` | `create-cart.handler.ts` |
| Controller | `<concept>.controller.ts` | `cart.controller.ts` |
| Module | `<feature>.module.ts` | `cart.module.ts` |

## 🎯 10 Core Rules

1. **Typed errors** — `ValidationError`, `BusinessRuleError`, etc.
2. **`reconstitute()`** — on every VO + Entity
3. **`assertInvariants()`** — separate private method
4. **`assertTransitionTo()`** — for state machines
5. **`emitStatusChange()`** — for audit
6. **Rich predicates** — `isActive()`, `canBeActivated()`
7. **Business methods** — not just getters
8. **DI tokens** — `Symbol('X_REPOSITORY')`
9. **Multi-shape DTOs** — full / public / summary / list
10. **Event publishing** — after `repo.save()`

## 📊 Total Stats

| Layer | Files | Coverage |
|-------|-------|----------|
| Domain | 114 | 99% |
| Application | 187 | 95% |
| Infrastructure | 102 | 93% |
| Interfaces | 65 | 92% |
| Modules | 48 | 85% |
| **TOTAL** | **516** | **96.35%** |
