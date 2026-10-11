# Architecture

DDD-layered NestJS microservice.

## Layer Boundaries

    ┌─────────────────────────────────────────┐
    │ Interfaces (Controllers, DTOs, Guards)  │  HTTP boundary
    ├─────────────────────────────────────────┤
    │ Application (Services, CQRS, Sagas)     │  Use cases / orchestration
    ├─────────────────────────────────────────┤
    │ Domain (Entities, VOs, Events, Specs)   │  Pure business rules
    ├─────────────────────────────────────────┤
    │ Infrastructure (Prisma, Redis, Queues,  │  I/O + external
    │                Providers, Workers)      │
    └─────────────────────────────────────────┘

## Import Rules

    interfaces  -> application -> domain
    infrastructure -> application -> domain
    modules -> all (wiring)

**Never** import infrastructure inside domain or application.

## Folder Layout

    src/module/
    ├── domain/
    │   ├── entities/                  # Aggregate roots
    │   ├── value-objects/
    │   │   ├── primitives/            # Atomic VOs
    │   │   └── composites/            # Composed VOs
    │   ├── events/                    # Domain events
    │   ├── repositories/              # Repo interfaces (Symbol tokens)
    │   ├── services/                  # Pure domain services (static)
    │   ├── specifications/            # Rule objects
    │   └── errors/                    # Domain errors
    ├── application/
    │   ├── services/                  # Orchestration services + interfaces
    │   ├── commands/                  # Write side (CQRS)
    │   ├── queries/                   # Read side (CQRS)
    │   ├── sagas/                     # Cross-aggregate orchestration
    │   ├── dtos/                      # Request + response shapes
    │   ├── mappers/                   # Entity -> DTO
    │   ├── validators/                # Zod validation
    │   └── errors/                    # Application errors
    ├── infrastructure/
    │   ├── persistence/
    │   │   ├── prisma/                # Repos + mappers + module
    │   │   └── cache/                 # Redis-backed caches + module
    │   ├── providers/
    │   │   ├── base/                  # IProvider + HttpProvider
    │   │   ├── email/                 # Resend + SMTP + resolver
    │   │   ├── sms/                   # Twilio + SSLWireless
    │   │   └── push/                  # FCM + WebPush
    │   ├── queues/                    # Queue wrappers
    │   ├── workers/                   # BullMQ processors
    │   ├── services/
    │   │   ├── internal/              # RateLimiter, QuietHours, etc
    │   │   └── external/              # Cross-service HTTP clients
    │   ├── queues-workers.module.ts
    │   └── infrastructure.module.ts
    ├── interfaces/
    │   ├── controllers/rest/          # HTTP endpoints
    │   ├── dtos/                      # HTTP request/response
    │   ├── mappers/                   # HTTP DTO <-> App DTO
    │   ├── guards/                    # Auth + feature guards
    │   ├── interceptors/              # Caching, logging
    │   ├── decorators/                # Custom metadata
    │   ├── middlewares/               # Correlation ID
    │   └── swagger/                   # Docs constants
    └── modules/
        ├── app.module.ts              # Root
        ├── common/                    # Kernel + infra globals
        ├── notification/              # Core feature
        ├── template/
        ├── schedule/
        ├── broadcast/
        ├── preference/
        ├── webhook/
        └── health/

## Data Flow (Send Notification)

    HTTP POST /api/v1/notifications
        │
        ▼
    NotificationController
        │  maps DTO -> app DTO
        ▼
    CommandBus.execute(SendNotificationCommand)
        │
        ▼
    SendNotificationHandler
        │  delegates
        ▼
    NotificationService.send()
        │
        ├─ ChannelPlanner picks channels
        ├─ PreferenceChecker loads user prefs (cached)
        ├─ RateLimiter checks quotas
        │
        ▼
    NotificationEntity.create() [per channel]
        │  addDomainEvent(NotificationCreated)
        ▼
    NotificationPrismaRepository.save()
        │
        ▼
    DomainEventBridgeService.publishFromEntity()
        │
        ├─ In-process: sagas react (DispatchNotificationCommand)
        └─ Cross-service: BullMQ event-bus
        │
        ▼
    NotificationDeliverySaga.onNotificationCreated
        │
        ▼
    DispatchNotificationCommand -> NotificationQueue
        │
        ▼
    NotificationDispatcherWorker
        │  routes by channel
        ▼
    EmailQueue / SmsQueue / PushQueue / InAppQueue
        │
        ▼
    EmailWorker / SmsWorker / PushWorker
        │  uses ProviderResolver
        ▼
    Resend / Twilio / FCM / WebPush actual API
        │
        ▼
    DeliveryQueue.recordAttempt() -> analytics

## Aggregates

| Aggregate | Root | Lifecycle |
|-----------|------|-----------|
| Notification | NotificationEntity | draft -> pending -> queued -> sending -> sent -> delivered |
| Template | TemplateEntity | draft -> active -> inactive -> deprecated -> archived |
| Schedule | ScheduleEntity | pending -> active -> paused -> completed |
| Broadcast | BroadcastEntity | draft -> scheduled -> sending -> sent |
| Digest | DigestEntity | pending -> generating -> ready -> sent |
| Preference | PreferenceEntity | (no status, editable) |
| Device | DeviceEntity | active -> inactive -> unregistered |
| Webhook | WebhookEntity | active -> inactive -> disabled |

## State Machines

Every status VO exposes `canTransitionTo(target)`. Entities call
`assertTransitionTo()` before mutating. Invalid transition throws
`BusinessRuleError` with rule code (e.g., `INVALID_NOTIFICATION_STATUS_TRANSITION`).

## Sagas (Cross-aggregate)

- NotificationDeliverySaga   — dispatch on create
- NotificationRetrySaga      — backoff on fail
- ScheduleTriggerSaga        — trigger due schedules
- BroadcastProcessingSaga    — batch broadcast
- DigestGenerationSaga       — send ready digests
- BounceHandlingSaga         — permanent failures
- UnsubscribeSaga            — opt-out events
- QuietHoursSaga             — defer non-critical

## Workers (BullMQ)

| Worker | Queue | Purpose |
|--------|-------|---------|
| NotificationDispatcherWorker | notification | Route by channel |
| EmailWorker | email | Send via Resend/SMTP |
| SmsWorker | sms | Send via Twilio/SSLWireless |
| PushWorker | push | Send via FCM/WebPush |
| InAppWorker | notification | Persist in-app |
| TemplateRendererWorker | notification | Render async |
| ScheduleTriggerWorker | notification | Trigger schedules |
| BroadcastProcessorWorker | notification | Batch broadcast |
| DigestGeneratorWorker | notification | Generate digest |
| WebhookDelivererWorker | webhook | Deliver outbound |
| DeliveryRecorderWorker | analytics | Record attempts |
| CleanupWorker | cleanup | Housekeeping |

## Providers (Multi-Provider Per Channel)

    IProvider (base)
        ├── IEmailProvider
        │   ├── ResendEmailProvider
        │   └── SmtpEmailProvider
        ├── ISmsProvider
        │   ├── TwilioSmsProvider
        │   └── SslWirelessSmsProvider
        └── IPushProvider
            ├── FcmPushProvider
            └── WebPushProvider

Each channel has a **Resolver** that picks the active provider based on
config or per-message override.

## Caching Strategy

| Key | TTL | Invalidated by |
|-----|-----|----------------|
| notif:detail:{id} | 5min | Any notification mutation |
| notif:list:user:{id} | 1min | Mark read, archive |
| notif:unread:{id} | 1min | Mark read |
| tmpl:render:{id}:v{n}:{loc}:{hash} | 30min | Template version bump |
| pref:user:{id} | 5min | Preference mutation |
| rl:user:{id}:{ch}:{day} | 24h | Auto-expire |
| rl:global:{ch}:{sec} | 2s | Auto-expire |
| idem:notif:{key} | 24h | Auto-expire |

## Rate Limiting

Sliding-window via Redis INCR + EXPIRE.

Per-user daily caps (constants):
- Email: 50/day
- SMS: 20/day
- Push: 100/day
- In-App: 500/day
- Webhook: 1000/day
- WhatsApp: 30/day

Global: 100 req/sec (configurable via NOTIFY_RATE_LIMIT_PER_SECOND).
Critical priority bypasses per-user cap.

## Testing Pyramid

    ┌──────────────┐
    │   E2E (204)  │  Full HTTP with mocked infra
    ├──────────────┤
    │ Unit (2554)  │  VOs, entities, services, mappers, providers
    └──────────────┘

Total: 2758 tests, 94% coverage.

## Shared Kernel

Heavy lifting comes from @vubon/shared-kernel:
- BaseVO, BaseEntity, AggregateRoot
- BaseRepository, BasePrismaRepository, BaseCacheRepository
- BaseCommand, BaseQuery, BaseSaga
- BaseGuard, BaseController
- PrismaService, RedisService, QueueService
- DomainEventBridgeService

Notification-service extends these with domain-specific implementations.
