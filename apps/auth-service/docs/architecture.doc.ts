/**
 * AUTH SERVICE — ARCHITECTURE DOCUMENTATION
 * @module auth-service/docs
 *
 * ══════════════════════════════════════════════════════════════════
 *  📐 CLEAN ARCHITECTURE — 5 LAYERS
 * ══════════════════════════════════════════════════════════════════
 *
 *  Layers (top → bottom):
 *
 *    ┌─────────────────────────────────────┐
 *    │  L5  Modules      (NestJS wiring)   │
 *    ├─────────────────────────────────────┤
 *    │  L4  Interfaces   (HTTP/Controllers) │
 *    ├─────────────────────────────────────┤
 *    │  L3  Infrastructure (DB/Cache/Queue) │
 *    ├─────────────────────────────────────┤
 *    │  L2  Application  (Use Cases/CQRS)  │
 *    ├─────────────────────────────────────┤
 *    │  L1  Domain       (Business rules)  │
 *    └─────────────────────────────────────┘
 *
 *  Rule: Higher layer may import from lower. Never reverse.
 *  Rule: Cross-service communication = Event only.
 */

export const AUTH_SERVICE_ARCHITECTURE = {
  name: 'auth-service',
  version: '1.0.0',
  layers: 5,
  endpoints: 70,
  prismaModels: 27,
  totalSourceFiles: 730,
  totalTests: 2293,
  testSuites: 309,
} as const;

/**
 * ══════════════════════════════════════════════════════════════════
 *  L1 — DOMAIN LAYER (Pure Business)
 * ══════════════════════════════════════════════════════════════════
 *
 *  Location: src/module/domain/
 *  Files:    162
 *  Tests:    1016
 *
 *  Folders:
 *    ├── value-objects/
 *    │   ├── primitives/     (46 VOs) — UserId, Email, Password, ...
 *    │   └── composites/     (23 VOs) — UserVO, AuthSessionVO, ...
 *    ├── entities/           (23)     — UserEntity, AuthSessionEntity, ...
 *    ├── repositories/       (23)     — Interfaces only
 *    ├── events/             (6)      — Domain events
 *    ├── event-store/        (6)      — Event storage contracts
 *    ├── services/           (8)      — Pure domain services
 *    ├── specifications/     (6)      — Business rule predicates
 *    └── errors/             (13)     — Domain error classes
 *
 *  Rules:
 *    ✅ Pure TypeScript
 *    ✅ Immutable value objects
 *    ✅ Entities with identity + invariants
 *    ✅ Domain events on state change
 *    ❌ NO NestJS, Prisma, HTTP, or DI
 *    ❌ NO imports from higher layers
 */

export const DOMAIN_LAYER = {
  location: 'src/module/domain/',
  files: 162,
  tests: 1016,
  valueObjects: 69,
  entities: 23,
  repositories: 23,
  events: 6,
  services: 8,
  specifications: 6,
  errors: 13,
} as const;

/**
 * ══════════════════════════════════════════════════════════════════
 *  L2 — APPLICATION LAYER (Use Cases / CQRS)
 * ══════════════════════════════════════════════════════════════════
 *
 *  Location: src/module/application/
 *  Files:    343
 *  Tests:    527
 *
 *  Folders:
 *    ├── dtos/
 *    │   ├── requests/       (50)  — Input DTOs
 *    │   └── responses/      (25)  — Output DTOs
 *    ├── services/
 *    │   ├── interfaces/     (28)  — Service contracts
 *    │   └── impl/           (28)  — Service implementations
 *    ├── commands/           (50)  — Command + Handler pairs
 *    ├── queries/            (25)  — Query + Handler pairs
 *    ├── sagas/              (4)   — Long-running workflows
 *    ├── mappers/            (5)   — Entity → DTO
 *    ├── validators/         (3)   — Zod validators
 *    └── errors/             (9)   — Application errors
 *
 *  CQRS Pattern:
 *    Command → CommandBus → Handler → Domain → Repository
 *    Query   → QueryBus   → Handler → Repository → DTO
 */

export const APPLICATION_LAYER = {
  location: 'src/module/application/',
  files: 343,
  tests: 527,
  requestDtos: 50,
  responseDtos: 25,
  services: 28,
  commands: 50,
  queries: 25,
  sagas: 4,
  mappers: 5,
  validators: 3,
} as const;

/**
 * ══════════════════════════════════════════════════════════════════
 *  L3 — INFRASTRUCTURE LAYER (Adapters)
 * ══════════════════════════════════════════════════════════════════
 *
 *  Location: src/module/infrastructure/
 *  Files:    96
 *  Tests:    393
 *
 *  Folders:
 *    ├── persistence/
 *    │   ├── prisma/repositories/   (23)  — Prisma repos
 *    │   └── cache/repositories/    (5)   — Redis cache repos
 *    ├── services/
 *    │   ├── internal/              (13)  — bcrypt, TOTP, JWT, ...
 *    │   └── external/              (3)   — Email, SMS, Push
 *    ├── config/                    (16)  — All config files
 *    ├── workers/                   (8)   — BullMQ workers
 *    ├── queues/                    (5)   — BullMQ queues
 *    └── external/
 *        └── email/templates/       (7)   — Email templates
 *
 *  Adapters:
 *    • Prisma ↔ Domain (mapper per repo)
 *    • Redis ↔ Cache (JSON serialize)
 *    • BullMQ ↔ Workers (job processing)
 *    • bcrypt, jsonwebtoken, otplib, crypto
 */

export const INFRASTRUCTURE_LAYER = {
  location: 'src/module/infrastructure/',
  files: 96,
  tests: 393,
  prismaRepos: 23,
  cacheRepos: 5,
  internalServices: 13,
  externalServices: 3,
  configs: 16,
  workers: 8,
  queues: 5,
  emailTemplates: 7,
} as const;

/**
 * ══════════════════════════════════════════════════════════════════
 *  L4 — INTERFACES LAYER (HTTP Boundary)
 * ══════════════════════════════════════════════════════════════════
 *
 *  Location: src/module/interfaces/
 *  Files:    98
 *  Tests:    ~325
 *
 *  Folders:
 *    ├── controllers/
 *    │   ├── rest/          (29)  — HTTP controllers
 *    │   └── graphql/       (2)   — GraphQL resolvers
 *    ├── dtos/
 *    │   ├── requests/      (18)  — Swagger-annotated request classes
 *    │   └── responses/     (18)  — Swagger-annotated response classes
 *    ├── guards/            (4)   — MFA, Biometric, Verified, Device
 *    ├── interceptors/      (2)   — Cache, TokenRefresh
 *    ├── decorators/        (5)   — CurrentUser, MfaRequired, ...
 *    ├── mappers/           (4)   — App DTO → Interface DTO
 *    ├── validators/        (2)   — Zod validators
 *    └── swagger/           (4)   — Swagger decorator factories
 *
 *  Principle:
 *    • Controllers MUST be thin — dispatch to CommandBus/QueryBus only
 *    • NO business logic in controllers
 *    • NO direct repository access
 */

export const INTERFACES_LAYER = {
  location: 'src/module/interfaces/',
  files: 98,
  tests: 325,
  restControllers: 29,
  graphqlResolvers: 2,
  requestDtos: 18,
  responseDtos: 18,
  guards: 4,
  interceptors: 2,
  decorators: 5,
  mappers: 4,
  validators: 2,
  swaggerDocs: 4,
} as const;

/**
 * ══════════════════════════════════════════════════════════════════
 *  L5 — MODULES LAYER (NestJS Wiring)
 * ══════════════════════════════════════════════════════════════════
 *
 *  Location: src/module/modules/
 *  Files:    31
 *  Tests:    32
 *
 *  Feature Modules (28):
 *    auth           auth-session     auth-token
 *    auth-mfa       auth-recovery-code auth-account-lock
 *    auth-login-attempt auth-device   auth-social
 *    auth-oauth     auth-sso         auth-2fa
 *    auth-biometric auth-permission  auth-role
 *    auth-settings  auth-preferences user
 *    user-profile   user-settings    user-preferences
 *    user-address   user-contact     user-verification
 *    user-kyc       user-activity    user-role-permission
 *    auth-common    app.module
 *
 *  DI Pattern:
 *    @Module({
 *      imports:     [...],
 *      controllers: [...],
 *      providers:   [...service, ...repos, ...handlers],
 *      exports:     [...shared, token bindings],
 *    })
 */

export const MODULES_LAYER = {
  location: 'src/module/modules/',
  files: 31,
  tests: 32,
  featureModules: 28,
  rootModule: 'app.module.ts',
} as const;

/**
 * ══════════════════════════════════════════════════════════════════
 *  🔒 IMPORT RULES MATRIX
 * ══════════════════════════════════════════════════════════════════
 *
 *  From ↓ \ To →   kernel  domain  app  infra  iface  modules
 *  ────────────────────────────────────────────────────────────
 *  kernel            ❌      ❌     ❌    ❌     ❌      ❌
 *  domain            ✅      ❌     ❌    ❌     ❌      ❌
 *  application       ✅      ✅     ❌    ❌     ❌      ❌
 *  infrastructure    ✅      ✅     ✅    ❌     ❌      ❌
 *  interfaces        ✅      ✅     ✅    ❌     ❌      ❌
 *  modules           ✅      ✅     ✅    ✅     ✅      ❌
 *
 *  Reading: ✅ = allowed, ❌ = forbidden
 */

export const IMPORT_RULES = {
  kernel: [],
  domain: ['kernel'],
  application: ['kernel', 'domain'],
  infrastructure: ['kernel', 'domain', 'application'],
  interfaces: ['kernel', 'domain', 'application'],
  modules: ['kernel', 'domain', 'application', 'infrastructure', 'interfaces'],
} as const;

/**
 * ══════════════════════════════════════════════════════════════════
 *  📊 SUMMARY
 * ══════════════════════════════════════════════════════════════════
 *
 *  Total Source Files:      730
 *  Total Test Files:        309
 *  Total Tests:             2293
 *  Test Runtime:            68 seconds
 *  TypeScript Errors:       0
 *  Test Failures:           0
 *  Coverage:                100%
 *
 *  Company:                 Vubon.com.bd
 *  Runtime:                 Node.js 22, NestJS 10
 *  Database:                PostgreSQL (Supabase)
 *  Cache:                   Redis
 *  Queue:                   BullMQ
 */

export const ALL_LAYERS_SUMMARY = {
  domain: DOMAIN_LAYER,
  application: APPLICATION_LAYER,
  infrastructure: INFRASTRUCTURE_LAYER,
  interfaces: INTERFACES_LAYER,
  modules: MODULES_LAYER,
  totals: {
    files: 730,
    tests: 2293,
    testSuites: 309,
    coverage: '100%',
  },
} as const;
