# 🏛️ Vubon.com.bd — Architecture

## Overview

Vubon follows **Domain-Driven Design (DDD)** + **CQRS** + **Hexagonal Architecture** across 7 independent microservices, communicating through an event bus.

---

## 1. Layered Architecture (per service)

Each service is a self-contained unit following 5 layers:

### Layer 1: DOMAIN (Business logic)

- **Entities** — Objects with identity (Order, Product, User)
- **Value Objects (VO)** — Immutable typed values (OrderId, PriceAmount, EmailAddress)
- **Aggregates** — Entity clusters with consistency boundaries
- **Domain Events** — Business-significant state changes
- **Specifications** — Composable business rules (CanPublish, CanRefund)
- **Domain Services** — Stateless operations (PricingService, TierCalculator)
- **Repositories (interfaces)** — Persistence contracts

**Rule:** Zero external dependencies. Pure TypeScript.

### Layer 2: APPLICATION (Use cases)

- **Commands** — Write operations (CreateOrderCommand)
- **Command Handlers** — Orchestrate domain logic
- **Queries** — Read operations (GetOrderQuery)
- **Query Handlers** — Return DTOs
- **Sagas** — Long-running workflows across services
- **Application Services** — Transaction boundaries
- **DTOs** — Request/response contracts
- **Mappers** — Domain ↔ DTO translation

### Layer 3: INFRASTRUCTURE (Technical implementations)

- **Persistence** — Prisma / Redis / Memory repositories
- **Cache** — Redis cache repositories
- **Queues** — BullMQ job queues
- **Workers** — Background processors
- **Providers** — External integrations (Email, SMS, Payment gateways)
- **External clients** — HTTP clients to other services
- **Config** — Environment-driven configuration
- **Event Bus** — Domain event dispatch

### Layer 4: INTERFACES (Entry points)

- **Controllers (REST)** — HTTP endpoints
- **Controllers (GraphQL)** — Query/mutation resolvers
- **Controllers (Webhooks)** — Provider callbacks
- **Guards** — Authorization (OwnProduct, VendorApproved)
- **Interceptors** — Cross-cutting (cache, rate limit, logging)
- **Validators** — Request validation (class-validator)
- **Decorators** — Metadata
- **Filters** — Exception → HTTP mapping
- **Swagger** — OpenAPI docs

### Layer 5: MODULES (NestJS wiring)

- Root `app.module.ts`
- Feature modules per aggregate
- CQRS handler registration
- DI provider setup
- Import/export boundaries

---

## 2. CQRS Pattern

### Commands (Write)

    SendNotificationCommand → SendNotificationHandler → NotificationService

- Mutate state
- Emit domain events
- Return minimal result

### Queries (Read)

    GetOrderQuery → GetOrderHandler → OrderRepository → OrderResponseDTO

- Never mutate state
- Return DTOs (not entities)
- Read from cache when possible

### Why separate?

- Different optimization strategies
- Audit trail
- Event sourcing foundation
- Independent scaling

---

## 3. Event-Driven Architecture

### Domain Events

Every aggregate emits events on state change:

    Order.placed() → OrderCreatedEvent
    Payment.completed() → PaymentCompletedEvent
    Vendor.approved() → VendorApprovedEvent

### Event Bridge

**Shared kernel** provides `DomainEventBridgeService`:

    entity.addDomainEvent(...) → repo.save(entity) →
      eventBridge.publishFromEntity(entity) → EventBus.publish(...)

### Cross-Service Handlers

Each service registers handlers for relevant events:

    // notification-service
    @OnEvent('order.order.created')
    class OrderCreatedHandler { ... }

    // cart-service
    @OnEvent('product.variant.stock_changed')
    class VariantStockChangedHandler { ... }

### Saga Orchestration

Long-running workflows via sagas:

    order-checkout.saga:
      1. reserve-inventory
      2. create-order
      3. create-payment
      4. send-notification

    payment-processing.saga:
      1. validate-payment
      2. call-gateway
      3. update-order
      4. send-receipt

38+ sagas total across services.

---

## 4. Multi-Provider Pattern

Every external integration is abstracted:

    interface IEmailProvider {
      send(input: EmailInput): Promise<ProviderResult>;
    }

    Providers: SMTP, SendGrid, Mailgun, Postmark, Resend, SES

    class FallbackDispatcherService {
      async dispatch(input) {
        for (const provider of sortedProviders) {
          try { return await provider.send(input); }
          catch (err) { continue; }
        }
      }
    }

Same pattern for SMS, Push, Payment gateways.

---

## 5. Database per Service

Each service has its own PostgreSQL database:

    vubon_identity      → identity models
    vubon_product       → product models
    vubon_vendors       → vendor models
    vubon_cart          → cart models
    vubon_order         → order models
    vubon_payment       → payment models
    vubon_notification  → notification models

**Cross-service data access:** via HTTP or events (never direct DB joins).

---

## 6. Shared Kernel

`packages/shared-kernel/` provides:

- **Base classes** — Entity, AggregateRoot, ValueObject
- **Event bus** — In-process + Redis pub/sub
- **Event bridge** — Domain event dispatcher
- **Repository base** — Generic CRUD
- **Filters** — DomainException, HttpException
- **Guards** — JWT, OwnResource, Public
- **Decorators** — CurrentUser, Public, Idempotency

**Rule:** Every service extends these, never reimplements.

---

## 7. Payment Gateway Abstraction

9 gateways unified:

    bkash, nagad, rocket, sslcommerz, aamarPay,
    stripe, paypal, cod, crypto

Each implements:

    interface IPaymentGateway {
      initiate(payload): Promise<GatewayResponse>;
      confirm(paymentId): Promise<GatewayResponse>;
      refund(paymentId, amount): Promise<GatewayResponse>;
      handleWebhook(payload): Promise<WebhookResult>;
    }

`GatewayResolverService` selects by `method` or `gateway` param.

---

## 8. Notification Pipeline

    Event → 410 handlers → Template render → Channel dispatch

    Channels:
      - IN_APP (WebSocket + SSE)
      - EMAIL (6 providers)
      - SMS (6 providers)
      - PUSH (FCM, APNS, WebPush, OneSignal, Expo)

    477 templates, Bengali + English.

---

## 9. Security

- **JWT** — 15min access + 7d refresh
- **MFA** — TOTP + backup codes
- **Biometric** — WebAuthn
- **RBAC** — Roles + permissions
- **KYC** — Document upload + verification
- **Account lock** — 5 failed → 30min lock
- **Idempotency** — Duplicate request prevention
- **Webhook signatures** — HMAC verification
- **Rate limiting** — Per endpoint + per user
- **Correlation IDs** — Request tracing

---

## 10. Deployment Architecture

### Termux (dev)

    PM2 → 7 processes → PostgreSQL + Redis (local)

### VPS (production)

    Nginx (port 80/443) → 7 containers → PostgreSQL + Redis (docker-compose)

### Scaling path

    Nginx → Load balancer → N × service replicas
    PostgreSQL primary + replicas
    Redis cluster

---

## Data Flow Example — Order Placement

    1. User → POST /orders (cart-service → order-service)
    2. Order service emits order.order.created
    3. Cart service clears cart
    4. Product service reserves inventory
    5. Payment service initiates payment
    6. User confirms payment
    7. Payment emits payment.payment.completed
    8. Order service auto-confirms order
    9. Notification sends confirmation email
    10. Vendor sees order in dashboard

All async, event-driven, saga-orchestrated.

---

## Principles

1. **Domain first** — Business logic in domain, not infrastructure
2. **Immutable VOs** — Value objects never mutate
3. **Explicit boundaries** — Aggregates define consistency scope
4. **Event-driven** — State changes emit events
5. **Idempotency** — Every mutation safe to retry
6. **Fail-safe** — Fallback providers, circuit breakers
7. **Observable** — Health checks, structured logs, metrics
8. **Testable** — Pure domain, mockable infra
