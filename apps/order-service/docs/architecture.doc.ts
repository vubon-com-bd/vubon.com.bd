/**
 * ORDER SERVICE — ARCHITECTURE DOCUMENTATION
 * @module order-service/docs
 *
 * ══════════════════════════════════════════════════════════════════
 *  🏛️  OVERVIEW
 * ══════════════════════════════════════════════════════════════════
 *
 *  Order lifecycle microservice for Vubon.com.bd.
 *  Built with DDD + CQRS + Hexagonal architecture.
 *
 *  Storage strategy:
 *    • PostgreSQL — primary store (Order, OrderItem, Checkout, Delivery,
 *                   OrderCancel, OrderReturn, OrderFulfillment,
 *                   OrderHistory, OrderTracking, addresses)
 *    • Redis      — hot-read cache (order, checkout, delivery, tracking)
 *    • BullMQ     — background jobs (processing, cleanup, timeout,
 *                   delivery-tracking, return-processing, analytics)
 *
 *  Design principles:
 *    • Order is immutable snapshot (price at purchase time)
 *    • Cross-service references by ID only (no embedding)
 *    • Cross-service communication: Event-based only
 *    • Business rules in domain, not in services/repos/controllers
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📐 5-LAYER ARCHITECTURE
 * ══════════════════════════════════════════════════════════════════
 *
 *    ┌──────────────────────────────────────────────────────┐
 *    │  interfaces/   HTTP controllers, guards, DTOs        │  ← inbound
 *    ├──────────────────────────────────────────────────────┤
 *    │  application/  CQRS handlers, sagas, services        │  ← use cases
 *    ├──────────────────────────────────────────────────────┤
 *    │  domain/       VOs, entities, specs, services        │  ← pure
 *    ├──────────────────────────────────────────────────────┤
 *    │  infrastructure/ Prisma, Redis, BullMQ, external     │  ← outbound
 *    ├──────────────────────────────────────────────────────┤
 *    │  modules/      NestJS DI wiring                      │  ← composition
 *    └──────────────────────────────────────────────────────┘
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🔒 IMPORT RULES
 * ══════════════════════════════════════════════════════════════════
 *
 *  | From ↓ / To →  | kernel | domain | app | infra | interface | module |
 *  |----------------|:------:|:------:|:---:|:-----:|:---------:|:------:|
 *  | domain         |   ✅   |   ❌   |  ❌ |   ❌  |    ❌     |   ❌   |
 *  | application    |   ✅   |   ✅   |  ❌ |   ❌  |    ❌     |   ❌   |
 *  | infrastructure |   ✅   |   ✅   |  ✅ |   ❌  |    ❌     |   ❌   |
 *  | interfaces     |   ✅   |   ✅   |  ✅ |   ❌  |    ❌     |   ❌   |
 *  | modules        |   ✅   |   ✅   |  ✅ |   ✅  |    ✅     |   ❌   |
 *
 *  Rule: higher layer may import lower; never the reverse.
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🧩 DOMAIN LAYER (pure business)
 * ══════════════════════════════════════════════════════════════════
 *
 *  48 primitive VOs   — order-id, order-number, order-status, ...
 *  15 composite VOs   — OrderVO, OrderItemVO, OrderTotalsCompositeVO, ...
 *  13 entities        — OrderEntity (aggregate root), OrderItem, Checkout,
 *                       Delivery, OrderCancel, OrderReturn,
 *                       OrderFulfillment, OrderHistory, OrderTracking, ...
 *   9 domain services — order-number, order-total, status-transition,
 *                       cancel-policy, return-policy, delivery-scheduling,
 *                       fulfillment-allocation, eligibility, snapshot
 *   6 specifications  — can-place, can-cancel, can-return, can-ship,
 *                       can-deliver, can-refund
 *   9 error classes   — order, order-item, checkout, delivery, cancel,
 *                       return, fulfillment, tracking
 *   8 event files     — order, order-item, checkout, delivery, cancel,
 *                       return, fulfillment, tracking
 *
 *  Invariants live in entity constructors and business methods.
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🎯 APPLICATION LAYER (use cases)
 * ══════════════════════════════════════════════════════════════════
 *
 *  Commands (32)       — Write operations, one handler per command
 *  Queries  (22)       — Read operations, cache-aware
 *  Services (10)       — Orchestrate repository + domain
 *  Sagas    (7)        — Event-driven workflows (RxJS)
 *  Mappers  (8)        — Entity ↔ DTO boundary
 *  Validators (5)      — Schema-based (Zod)
 *  Errors   (9)        — Application-level errors
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🔌 INFRASTRUCTURE LAYER
 * ══════════════════════════════════════════════════════════════════
 *
 *  13 Prisma repositories    — Implement domain repository interfaces
 *   4 Redis cache repos      — Read-through / write-through
 *   6 internal services      — Wrap domain statics as injectables
 *   4 external services      — Payment, shipping, notification, analytics
 *   5 BullMQ queues          — Order, checkout, delivery, notification,
 *                              analytics
 *   6 workers                — Job processors
 *   8 config files           — Type-safe config from env
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🌐 INTERFACES LAYER
 * ══════════════════════════════════════════════════════════════════
 *
 *  8 REST controllers    — Thin (bus.execute() only)
 *  3 guards              — OwnOrder, VendorOrder, OrderStatus
 *  2 interceptors        — OrderCache, CheckoutTimeout
 *  3 decorators          — @OwnOrder, @VendorOrder, @OrderStatus
 *  16 DTOs               — Request/response with @ApiProperty
 *  5 mappers             — HTTP DTO ↔ Application DTO
 *  3 validators          — HTTP-layer schema validation
 *  7 swagger helpers     — Reusable @Api* compositions
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🔄 EVENT FLOW
 * ══════════════════════════════════════════════════════════════════
 *
 *  1. Request arrives → Controller
 *  2. commandBus.execute(new CreateOrderCommand(...))
 *  3. CommandHandler → OrderService.create()
 *  4. OrderEntity.create() → emits OrderCreatedEvent
 *  5. OrderRepository.save()
 *  6. EventBus publishes OrderCreatedEvent
 *  7. Sagas react:
 *       • OrderPaymentSaga   → ReserveInventory, NotifyCustomer
 *       • OrderShippingSaga  → CreateShipment
 *       • OrderDeliverySaga  → NotifyCustomer
 *       • ...
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📸 SNAPSHOT PATTERN
 * ══════════════════════════════════════════════════════════════════
 *
 *  Order items capture the **price at purchase time** — not current
 *  price. This is critical for historical accuracy and invoice
 *  generation.
 *
 *  Fields captured at purchase:
 *    • unitPrice
 *    • compareAtPrice
 *    • discountAmount
 *    • taxAmount
 *    • shippingAmount
 *    • name
 *    • sku
 *    • imageUrl
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🔁 STATE MACHINE
 * ══════════════════════════════════════════════════════════════════
 *
 *  13-status lifecycle:
 *
 *    pending ─┬→ confirmed → processing → packed → shipped
 *             │                                    ↓
 *             ├→ cancelled                    out_for_delivery
 *             ├→ failed                             ↓
 *             └→ on_hold ─→ confirmed           delivered → completed
 *                                                ↓
 *                                              returned → refunded
 *
 *  All transitions validated by OrderStatusVO.canTransitionTo().
 */
