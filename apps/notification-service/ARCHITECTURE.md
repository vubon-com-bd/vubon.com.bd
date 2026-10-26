# 🏗️ Architecture — Notification Service

Deep dive into the 5-layer architecture, dependencies, and patterns.

## 🎯 The 5 Layers

```
┌─────────────────────────────────────────────────────────┐
│  1. Interfaces                                          │
│     Controllers · Guards · Interceptors · Webhooks      │
│     ~86 files · 298 tests · 99.17% coverage             │
├─────────────────────────────────────────────────────────┤
│  2. Application                                         │
│     Commands · Queries · Sagas · Services · DTOs        │
│     ~325 files · 442 tests · 92.97% coverage            │
├─────────────────────────────────────────────────────────┤
│  3. Domain                                              │
│     VOs · Entities · Events · Repositories · Services   │
│     185 files · 1839 tests · 96.88% coverage            │
├─────────────────────────────────────────────────────────┤
│  4. Infrastructure                                      │
│     Prisma · Redis · Queues · Providers · Workers       │
│     188 files · 1443 tests · 93.59% coverage            │
├─────────────────────────────────────────────────────────┤
│  5. Modules                                             │
│     AppModule · Feature modules · DI wiring             │
│     ~76 files · 140 tests · 100% coverage               │
└─────────────────────────────────────────────────────────┘
```

## 🔗 Dependency Rules

| Layer | Can Import From | Must NOT Import From |
|-------|-----------------|---------------------|
| **Domain** | shared-kernel/domain, constants | anything else |
| **Application** | domain, shared-kernel/app, DTOs | infrastructure, interfaces |
| **Infrastructure** | domain, kernel/infra, providers | application (except via DI) |
| **Interfaces** | application, domain (readonly), kernel/interfaces | infrastructure |
| **Modules** | all layers (wiring only) | — |

**One-way flow:** Interfaces → Application → Domain ← Infrastructure

## 📁 1. Domain Layer

```
domain/
├── errors/                   ← 11 typed error files
├── value-objects/
│   ├── primitives/           ← 60 base VOs
│   └── composites/           ← 25 combined VOs
├── events/                   ← 12 domain event files
├── entities/                 ← 19 aggregates + children
├── repositories/             ← 18 repository interfaces
├── event-store/              ← 5 event stores
├── services/                 ← 20 domain services
├── specifications/           ← 7 business rules
└── index.ts                  ← Root barrel
```

### Rules
- ✅ Pure TypeScript (no NestJS, no Prisma, no HTTP)
- ✅ Typed errors (`ValidationError`, `BusinessRuleError`, etc.)
- ✅ `create()` vs `reconstitute()` pattern
- ✅ `assertInvariants()` in every aggregate
- ✅ Business methods (not just getters)

### Example — Entity
```typescript
export class NotificationEntity extends AggregateRoot<string> {
  private constructor(id: string, /* ... */) {
    super(id, /* ... */);
    this.assertInvariants();
  }

  static create(params: {...}): NotificationEntity { /* emits Created event */ }
  static reconstitute(params: {...}): NotificationEntity { /* rebuilds from DB */ }

  private assertInvariants(): void { /* throws typed errors */ }
}
```

## 📁 2. Application Layer

```
application/
├── errors/                   ← 11 application errors
├── dtos/
│   ├── requests/             ← 52 request DTOs (from shared-schemas)
│   └── responses/            ← 14 response DTOs (multi-shape)
├── services/
│   ├── interfaces/           ← 19 DI tokens + interfaces
│   └── impl/                 ← 19 service implementations
├── commands/                 ← ~90 CQRS command handlers
├── queries/                  ← ~70 CQRS query handlers
├── sagas/                    ← 18 sagas (cross-service workflows)
├── mappers/                  ← 10 entity → DTO mappers
├── validators/               ← 5 Zod wrapper validators
└── index.ts                  ← Root barrel
```

### Rules
- ✅ DI tokens via `Symbol()` for services & repos
- ✅ Multi-shape DTOs (full/public/summary/list/stats/detail)
- ✅ `@Inject(TOKEN)` in all handlers
- ✅ `@CommandHandler` / `@QueryHandler` decorators
- ✅ `DomainEventBridgeService.publishFromEntity()`

## 📁 3. Infrastructure Layer

```
infrastructure/
├── persistence/
│   ├── prisma/               ← 18 Prisma repos + 22 mappers
│   └── cache/                ← 5 Redis cache repos
├── queues/                   ← 10 BullMQ queues
├── workers/                  ← 13 queue workers
├── providers/                ← 41 provider implementations
│   ├── base/                 ← provider abstraction
│   ├── email/                ← SendGrid, Mailgun, Resend, SES...
│   ├── sms/                  ← SSLWireless, Twilio, GP, Robi...
│   ├── push/                 ← FCM, APNs, WebPush, OneSignal...
│   ├── webhook/              ← HTTP, Slack, Discord, Telegram
│   └── in-app/               ← WebSocket, SSE
├── template-engine/          ← Handlebars, Mustache, EJS, MJML
├── services/                 ← 6 external clients + 14 internal
├── config/                   ← 16 config files
├── modules/                  ← 7 sub-modules
└── index.ts                  ← Root barrel
```

### Dynamic Switch — `InfrastructureModule.forRoot()`
```typescript
const driver = process.env['PERSISTENCE_DRIVER'] ?? 'prisma';
const reposModule = driver === 'memory'
  ? MemoryRepositoriesModule
  : PrismaRepositoriesModule;
```

### Prisma vs Memory
| Mode | Provider | Requires DB |
|------|----------|-------------|
| `PERSISTENCE_DRIVER=prisma` | `PrismaRepositoriesModule` | ✅ Yes |
| `PERSISTENCE_DRIVER=memory` | `MemoryRepositoriesModule` | ❌ No |

## 📁 4. Interfaces Layer

```
interfaces/
├── controllers/
│   ├── rest/                 ← 14 REST controllers
│   ├── webhooks/             ← 7 provider webhook controllers
│   └── graphql/              ← (optional)
├── guards/                   ← 6 custom guards
├── interceptors/             ← 3 cross-cutting interceptors
├── decorators/               ← 3 custom decorators
├── dtos/
│   ├── requests/             ← 7 HTTP request DTOs
│   └── responses/            ← 12 HTTP response DTOs
├── mappers/                  ← 5 HTTP ↔ App mappers
├── validators/               ← 6 wrapper validators
├── middlewares/              ← 2 middlewares
├── swagger/                  ← 6 Swagger bundles
├── errors/                   ← HTTP error translator
└── index.ts                  ← Root barrel
```

### Rules
- ✅ `extends BaseController`
- ✅ `class-validator` on all request DTOs
- ✅ `@ApiProperty` on all DTO fields
- ✅ Return DTOs — never expose domain entities
- ✅ `@UseGuards(JwtAuthGuard)` on protected routes

## 📁 5. Modules Layer

```
modules/
├── app.module.ts             ← Root AppModule
├── common/
│   └── common.module.ts      ← @Global aggregator
├── health/
│   ├── health.module.ts
│   └── notification.health.ts
├── notification/
│   ├── notification.module.ts
│   ├── commands/index.ts
│   ├── queries/index.ts
│   ├── events/index.ts
│   └── sagas/index.ts
├── email/ sms/ push/ in-app/
├── template/ schedule/ broadcast/ digest/
├── preference/ device/ webhook/ delivery/
├── provider-gateways/
└── index.ts                  ← Root barrel
```

### Rules
- ✅ `ConfigModule.forRoot({ isGlobal: true })` in app.module.ts
- ✅ `CqrsModule.forRoot()` at root level
- ✅ DI token binding: `{ provide: TOKEN, useExisting: Service }`
- ✅ Handler arrays cast: `as readonly unknown[] as never[]`

## 📊 Statistics

| Layer | Files | LOC | Tests | Coverage |
|-------|-------|-----|-------|----------|
| Domain | 185 | ~14,000 | 1,839 | 96.88% |
| Application | ~325 | ~8,700 | 442 | 92.97% |
| Infrastructure | 188 | ~11,000 | 1,443 | 93.59% |
| Interfaces | ~86 | ~6,000 | 298 | 99.17% |
| Modules | ~76 | ~2,000 | 140 | 100% |
| **Total** | **~860** | **~42,000** | **4,162** | **96.88%** |

## 🎯 10 Core Pattern Rules

1. **Typed errors** — `ValidationError`, `BusinessRuleError`, `NotFoundError`
2. **`reconstitute()`** — on every VO + Entity (skip validation from DB)
3. **`assertInvariants()`** — separate method in every aggregate
4. **`assertTransitionTo()`** — before every status change
5. **`emitStatusChange()`** — audit trail via domain events
6. **Rich predicates** — `isPending()`, `canBeSent()`, `isTerminal()`
7. **Business methods** — `send()`, `cancel()`, `markDelivered()`
8. **DI tokens** — `Symbol('SERVICE_NAME')` for every interface
9. **Multi-shape DTOs** — full / public / summary / list / stats / detail
10. **Alias imports** — `@domain/*`, `@application/*`, `@infrastructure/*`

## 🔗 Related Documentation

- [README.md](./README.md) — overview + quick start
- [API.md](./API.md) — REST API reference
- [TESTING.md](./TESTING.md) — test patterns
- [DEVELOPMENT.md](./DEVELOPMENT.md) — local setup
- [DEPLOYMENT.md](./DEPLOYMENT.md) — production deployment
