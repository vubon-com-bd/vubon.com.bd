# Architecture Deep Dive

## Layer Dependencies (Strict)

    Interfaces -> Application -> Domain
    Infrastructure -> Application + Domain
    Interfaces NEVER imports Prisma directly
    Application NEVER imports NestJS-Infra directly
    Domain is framework-free

## Domain Layer — 21 Aggregates

    Shipment              + ShipmentItem (child)
    Courier               + CourierRate (child)
    Delivery              + DeliveryAttempt (child)
    Tracking              + TrackingEvent (child)
    Warehouse
    InventoryLocation
    Fulfillment
    Dispatch
    Vehicle
    Driver
    Route
    Zone
    ShippingMethod
    Packaging
    ReturnShipment
    ReturnReason
    Insurance

## Aggregate Structure

    entity.ts         -> aggregate root
    VOs in primitives/ -> value objects
    events.ts         -> domain events
    repository.interface.ts -> ports
    specifications/   -> business rules
    services/         -> domain services (stateless)

## Application Layer — CQRS

Commands (write side):
    commands/<agg>/
        <action>.command.ts  (command)
        <action>.handler.ts  (CommandHandler)
        handlers.index.ts    (exports array)

Queries (read side):
    queries/<agg>/
        <action>.query.ts    (query)
        <action>.handler.ts  (QueryHandler)
        handlers.index.ts    (exports array)

Services:
    services/impl/<agg>.service.ts
    services/interfaces/<agg>.service.interface.ts

Sagas:
    sagas/<workflow>.saga.ts
    4 sagas: ShipmentLifecycle, DeliveryAttempt, ReturnPickup, InsuranceClaim

External events:
    events/external/<source>-<action>.handler.ts
    17 handlers: order.*, payment.*, vendor.*, product.*, user.*

## Infrastructure Layer

### Persistence (3 modes)
    persistence/memory/    in-memory (dev)
    persistence/prisma/    PostgreSQL (prod)
    persistence/cache/     Redis
    persistence/search/    Meilisearch/ES

### Services
    services/external/     8 cross-service HTTP clients
    services/internal/     6 internal (idempotency, HMAC, etc.)

### External
    external/couriers/     10 courier providers x 4 files
    external/maps/         Google + OSM
    external/storage/      local + S3
    external/email/        SMTP + 6 templates
    external/slack/        Webhook
    external/chart/        ChartJS + ECharts + Vega

### Queues + Workers
    queues/                9 BullMQ queues
    workers/               BaseWorker + 9 processors

### Security + Filters
    security/              JWT strategy + module
    filters/               4 filters (domain, application, prisma, http)

## Interfaces Layer

### Controllers
    controllers/rest/      17 REST controllers
    controllers/webhooks/  10 webhook receivers
    PublicTrackingController (in modules/public-logistics)

### HTTP DTOs
    dtos/requests/         class-validator + Swagger
    dtos/responses/        response shaping
    dtos/requests/webhook/ webhook DTOs

### Cross-cutting
    mappers/               HTTP DTO <-> App DTO
    validators/            HTTP validation
    guards/                JwtAuthGuard, OwnerGuard, WebhookSignatureGuard
    interceptors/          logging, timeout, cache
    decorators/            custom (@IdempotencyHeader, @Public)
    middlewares/           idempotency, correlation-id
    filters/               http-exception, validation-exception

## Modules Layer

Root:
    app.module.ts          imports all features + Infrastructure
    index.ts               barrel

Feature modules (23):
    <agg>/<agg>.module.ts  feature module (repos + services)
    <agg>/commands/index.ts  re-export handler arrays
    <agg>/queries/index.ts   re-export handler arrays
    <agg>/events/index.ts
    <agg>/sagas/index.ts     (7 aggregates)
    <agg>/health/index.ts

Child aggregates (no own commands — handled by parent):
    shipment-item
    courier-rate
    delivery-attempt
    tracking-event

Public feature:
    public-logistics/      public tracking endpoint

Global:
    common/common.module.ts

## Request Flow — Example (POST /shipments)

    1. Express receives POST /shipments
    2. IdempotencyMiddleware (X-Idempotency-Key)
    3. CorrelationIdMiddleware (X-Correlation-Id)
    4. JwtAuthGuard validates Bearer token
    5. ValidationPipe validates CreateShipmentHttpDTO
    6. ShipmentLoggingInterceptor starts timing
    7. ShipmentController.create() invoked
    8. ShipmentHttpValidator.validateCreate()
    9. ShipmentControllerMapper.toCreateAppDto()
    10. CommandBus.execute(CreateShipmentCommand)
    11. CreateShipmentHandler.execute()
    12. ShipmentService.create() (idempotency check)
    13. ShipmentNumberService.generate()
    14. ShipmentRepository.save()
    15. eventBridge.publishFromEntity() (ShipmentLifecycleSaga)
    16. ShipmentLifecycleSaga.handle() -> analytics
    17. ShipmentMapper.toResponse()
    18. ShipmentControllerMapper.toInitiateHttp()
    19. Response 201

## Event Flow — Example (order.order.created)

    1. Order service publishes event to Redis/BullMQ
    2. Event bus routes to logistics' registered handlers
    3. OrderCreatedHandler.execute()
    4. CommandBus executes CreateShipmentCommand
    5. Shipment created
    6. Event: logistics.shipment.created
    7. ShipmentLifecycleSaga triggered
    8. Analytics command executed

## Persistence Modes — Swap Points

Repository interface (Domain):
    ShipmentRepository interface

Providers (Infrastructure):
    Memory  -> persistence/memory/repositories/shipment.memory.repository.ts
    Prisma  -> persistence/prisma/repositories/shipment.prisma.repository.ts

Module wiring (feature module):
    providers: [{ provide: SHIPMENT_REPOSITORY, useExisting: <impl> }]

Mode selection:
    PERSISTENCE_DRIVER env -> InfrastructureModule.forRoot() picks impl

## Scaling Considerations

Stateless: All services stateless (state in Redis/Postgres)
Horizontally scalable: PM2 cluster / K8s replicas
BullMQ: Workers can scale independently
Cache: Redis shared across instances
Event Bus: Redis pub/sub
Idempotency: Redis SET NX atomic

## Security

JWT:
    JwtStrategy validates token
    JwtAuthGuard protects all controllers except @Public()
    WebhookSignatureGuard verifies HMAC-SHA256 per provider

Sensitive fields:
    EncryptionService (AES-256-GCM)
    ENCRYPTION_KEY from env

Secrets:
    Never commit .env
    Use env vars in production

Rate limiting:
    ThrottlerModule (default 100 req/min)

## Error Handling

4 domain error types:
    ValidationError (400)
    NotFoundError (404)
    BusinessRuleError (400)
    ConflictError (409)

Application errors (subclass):
    ApplicationValidationError
    ApplicationNotFoundError
    AuthorizationError

Infrastructure error:
    PrismaEngineUnavailableError (503)

Filter chain (order):
    1. ValidationExceptionFilter
    2. PrismaUnavailableFilter
    3. KernelDomainFilter (Kernel DomainError)
    4. DomainExceptionFilter (local DomainError)
    5. ApplicationExceptionFilter (ApplicationError)
    6. HttpExceptionFilter (fallback)
