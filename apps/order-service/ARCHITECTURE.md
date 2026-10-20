# Architecture — Order Service

## The 5 Layers

### 1. Domain Layer
Path: src/module/domain/

    domain/
      value-objects/primitives/     45 VOs
      value-objects/composites/     15 VOs
      entities/                     13 entities (AggregateRoot + BaseEntity)
      repositories/                 13 interfaces + DI tokens
      events/                       37 events + helpers
      services/                     9 domain services
      specifications/               6 specifications
      errors/                       62 error classes

Rules:
- No framework (no @nestjs/*)
- No Prisma, Redis, HTTP
- Pure TypeScript + shared-kernel base classes

### 2. Application Layer
Path: src/module/application/

    application/
      commands/             31 commands + 31 handlers
      queries/              21 queries + 21 handlers
      dtos/requests/        40 files
      dtos/responses/       9 files
      services/interfaces/  11 interfaces + DI tokens
      services/impl/        11 implementations
      sagas/                7 sagas + 9 helper commands
      mappers/              9 mappers
      validators/           6 validators

Rules:
- No direct controller or Prisma import
- Uses domain repository interfaces (DI tokens)
- Uses @CommandHandler / @QueryHandler

### 3. Infrastructure Layer
Path: src/module/infrastructure/

    infrastructure/
      persistence/prisma/   31 files (mappers + repositories)
      persistence/memory/   12 InMemory repos + module
      persistence/cache/    8 cache repos
      queues/               7 queue files
      workers/              8 workers
      external/             13 files (payment, shipping, notification, storage)
      services/external/    4 clients + notification
      services/internal/    4 internal services
      config/               9 config files (incl. db-mode)

Rules:
- Implements domain repository interfaces
- Dual mode via DB_MODE env
- NestJS @Injectable + @Module

### 4. Interfaces Layer
Path: src/module/interfaces/

    interfaces/
      controllers/rest/     11 REST controllers
      controllers/graphql/  3 resolvers
      dtos/requests/        7 DTO classes (class-validator)
      dtos/responses/       12 DTO classes
      mappers/              5 controller mappers
      guards/               4 guards
      interceptors/         2 interceptors
      decorators/           5 decorators
      errors/               2 HTTP error translator
      swagger/              9 swagger bundles

Rules:
- Extends BaseController from shared-kernel
- Uses @UseGuards, @UseInterceptors
- No business logic

### 5. Modules Layer
Path: src/module/modules/

    modules/
      app.module.ts         Root module
      common/               CommonModule with DB_MODE switch
      health/               Health module
      order/                Order feature module
      order-item/           5 files
      checkout/             5 files
      delivery/             6 files
      order-cancel/         5 files
      order-return/         5 files
      order-fulfillment/    5 files
      order-tracking/       4 files
      public-order/         3 files

## Dependency Rules

| Layer | Can Import | Must NOT Import |
|-------|-----------|-----------------|
| Domain | shared-kernel, shared-types, shared-constants | NestJS, Prisma, other layers |
| Application | domain, shared-kernel, shared-types, shared-schemas | infrastructure, interfaces |
| Infrastructure | domain, application (DTOs), shared-kernel | interfaces |
| Interfaces | application, domain (types only), shared-kernel | infrastructure |
| Modules | all layers (imports only for wiring) | — |

## Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| VO (primitive) | <concept>-<property>.vo.ts | order-id.vo.ts |
| VO (composite) | <concept>.vo.ts | order.vo.ts |
| Entity | <concept>.entity.ts | order.entity.ts |
| Repository interface | <concept>.repository.interface.ts | order.repository.interface.ts |
| Repository impl (Prisma) | <concept>.prisma.repository.ts | order.prisma.repository.ts |
| Repository impl (Memory) | <concept>.memory.repository.ts | order.memory.repository.ts |
| Command | <action>-<concept>.command.ts | create-order.command.ts |
| Handler | <action>-<concept>.handler.ts | create-order.handler.ts |
| Controller | <concept>.controller.ts | order.controller.ts |
| Module | <concept>.module.ts | order.module.ts |
| Error | <concept>.errors.ts | order.errors.ts |
| DTO (request) | <action>-<concept>.dto.ts | create-order.dto.ts |
| DTO (response) | <concept>-response.dto.ts | order-response.dto.ts |

## 10 Core Pattern Rules

1. Typed errors everywhere (ValidationError, BusinessRuleError)
2. reconstitute() on every VO + Entity (trusted DB load)
3. assertInvariants() separate method
4. assertTransitionTo() for state machines
5. emitStatusChange() for audit
6. Rich predicates (isActive(), canBeActivated())
7. Business methods (not just getters)
8. DI tokens for repositories (Symbol-based)
9. Filter + Options + Pagination + Stats types
10. Dual-mode persistence (memory + prisma)

## Total Stats

| Layer | Files | Classes | Interfaces |
|-------|-------|---------|-----------|
| Domain | 134 | ~150 | ~80 |
| Application | 238 | ~150 | ~60 |
| Infrastructure | 103 | ~90 | ~20 |
| Interfaces | 73 | ~50 | ~40 |
| Modules | 62 | ~50 | ~5 |
| **Total** | **610** | **~490** | **~205** |

## Data Flow

    HTTP Request
       ↓
    Controller (interfaces)
       ↓
    Command/Query (application)
       ↓
    Handler (application)
       ↓
    Service (application)
       ↓
    Entity/VO (domain)
       ↓
    Repository Interface (domain)
       ↓
    Prisma/Memory Repository (infrastructure)
       ↓
    Database / In-Memory Map
