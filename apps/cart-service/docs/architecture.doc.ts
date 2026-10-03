/**
 * CART SERVICE — ARCHITECTURE DOCUMENTATION
 * @module cart-service/docs
 *
 * ══════════════════════════════════════════════════════════════════
 *  🏛️  OVERVIEW
 * ══════════════════════════════════════════════════════════════════
 *
 *  Ephemeral shopping-cart microservice for Vubon.com.bd.
 *  Built with DDD + CQRS + Hexagonal architecture.
 *
 *  Storage strategy:
 *    • Redis    — primary store (Cart, CartItem, GuestCart, Coupon,
 *                 Voucher, Tax, Shipping — ephemeral data)
 *    • Prisma   — persistent only (SavedItem, AbandonedCart, CartMerger)
 *    • BullMQ   — background jobs (expiry, abandonment, reminders,
 *                 price-sync, stock-sync, analytics)
 *
 *  Design principles:
 *    • Cart is ephemeral → Redis-first, TTL-based
 *    • Guest cart merges into user cart on login
 *    • Cart references product by ID (never embeds catalog data)
 *    • Cross-service communication: Event + API only
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📐 5-LAYER ARCHITECTURE
 * ══════════════════════════════════════════════════════════════════
 *
 *      ┌─────────────────────────────────────────┐
 *      │ Layer 5: MODULES       (NestJS wiring)  │
 *      ├─────────────────────────────────────────┤
 *      │ Layer 4: INTERFACES    (HTTP + Swagger) │
 *      ├─────────────────────────────────────────┤
 *      │ Layer 3: INFRASTRUCTURE (Redis, Prisma) │
 *      ├─────────────────────────────────────────┤
 *      │ Layer 2: APPLICATION   (CQRS handlers)  │
 *      ├─────────────────────────────────────────┤
 *      │ Layer 1: DOMAIN        (Business rules) │
 *      └─────────────────────────────────────────┘
 *
 *  Dependency rule: outer layers depend on inner, never reverse.
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📁  FOLDER STRUCTURE
 * ══════════════════════════════════════════════════════════════════
 *
 *  apps/cart-service/
 *  ├── prisma/                        # Prisma schema (saved/abandoned models)
 *  ├── src/
 *  │   ├── main.ts                    # Bootstrap entrypoint
 *  │   └── module/
 *  │       ├── domain/                # Layer 1 — pure business logic
 *  │       │   ├── entities/          # Aggregates + entities
 *  │       │   ├── value-objects/     # Immutable VOs (primitives + composites)
 *  │       │   ├── events/            # Domain events (~39)
 *  │       │   ├── repositories/      # Repo interfaces + DI tokens
 *  │       │   ├── services/          # Pure domain services
 *  │       │   ├── specifications/    # Business rule predicates
 *  │       │   └── errors/            # Domain error hierarchy
 *  │       ├── application/           # Layer 2 — CQRS use cases
 *  │       │   ├── dtos/              # Request + response DTOs
 *  │       │   ├── commands/          # 24 command + handler pairs
 *  │       │   ├── queries/           # 12 query + handler pairs
 *  │       │   ├── sagas/             # Long-running processes
 *  │       │   ├── services/          # Application services
 *  │       │   ├── mappers/           # Entity ↔ DTO
 *  │       │   ├── validators/        # Schema-based validation
 *  │       │   └── errors/            # Application-level errors
 *  │       ├── infrastructure/        # Layer 3 — adapters
 *  │       │   ├── persistence/       # Redis + Prisma + Cache repositories
 *  │       │   ├── services/          # External + internal services
 *  │       │   ├── external/          # Email / SMS / Push adapters
 *  │       │   ├── queues/            # BullMQ queue definitions
 *  │       │   ├── workers/           # BullMQ workers
 *  │       │   └── config/            # Env-based service config
 *  │       ├── interfaces/            # Layer 4 — HTTP transport
 *  │       │   ├── controllers/       # REST controllers
 *  │       │   ├── guards/            # Auth + ownership guards
 *  │       │   ├── interceptors/      # Cache + lock interceptors
 *  │       │   ├── decorators/        # Custom decorators
 *  │       │   ├── dtos/              # HTTP-level DTOs (Swagger)
 *  │       │   ├── mappers/           # App DTO → HTTP DTO
 *  │       │   ├── validators/        # Zod validators
 *  │       │   ├── middlewares/       # Guest-token + context middlewares
 *  │       │   └── swagger/           # Swagger constants
 *  │       └── modules/               # Layer 5 — NestJS wiring
 *  ├── test/
 *  │   ├── unit/                      # 165 unit test files
 *  │   └── e2e/                       # 5 E2E test suites
 *  ├── package.json
 *  └── README.md
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🧩 DOMAIN MODEL
 * ══════════════════════════════════════════════════════════════════
 *
 *  Aggregates (AggregateRoot):
 *    • CartEntity         — root of cart aggregate, holds items
 *    • CartCouponEntity   — applied coupon (state transitions)
 *    • CartVoucherEntity  — applied voucher (redeem lifecycle)
 *    • SavedForLaterEntity — user's saved items
 *    • AbandonedCartEntity — abandoned cart detection + recovery
 *    • GuestCartEntity    — anonymous cart lifecycle
 *
 *  Child entities (BaseEntity):
 *    • CartItemEntity     — item inside cart
 *    • CartTaxEntity      — cart tax config
 *    • CartShippingEntity — shipping method + cost
 *    • CartMergerEntity   — merge operation record
 *
 *  Value Objects (immutable):
 *    • ~32 primitive VOs   — IDs, codes, quantities, statuses, rates
 *    • ~12 composite VOs   — Cart, CartItem, CartTotals, Shipping, etc.
 *
 *  Domain Events (~39):
 *    • Cart lifecycle      — Created, Updated, Cleared, Deleted, Abandoned,
 *                            Recovered, Expired, StatusChanged, PriceChanged
 *    • Item lifecycle      — Added, Updated, Removed, QuantityChanged,
 *                            Selected, Deselected, Unavailable, BackInStock
 *    • Coupon / Voucher    — Applied, Removed, Invalidated, Redeemed
 *    • Saved / Abandoned   — Saved, MovedToCart, Detected, Recovered
 *    • Guest / Merger      — Created, Merged, Expired, MergeConflict
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🎯 CQRS PATTERN
 * ══════════════════════════════════════════════════════════════════
 *
 *  Commands (write) — 24 handlers:
 *    Cart      → create, update, clear, delete, recover
 *    Item      → add, update, remove, update-quantity, select, move-to-saved
 *    Coupon    → apply, remove, validate
 *    Voucher   → apply, remove
 *    Shipping  → set-method, calculate
 *    Saved     → save-for-later, move-to-cart, remove
 *    Guest     → create-guest-cart, merge-guest-cart
 *    Checkout  → proceed-to-checkout
 *
 *  Queries (read) — 12 handlers:
 *    Cart      → get, get-by-user, get-summary, get-count
 *    Item      → list, get
 *    Totals    → get-totals
 *    Saved     → list-saved
 *    Abandoned → list, stats
 *    Analytics → cart-analytics, abandonment-rate
 *
 *  Sagas (orchestration) — 4:
 *    • CartAbandonmentSaga — detect → reminder → analytics
 *    • CartRecoverySaga    — recovered → analytics → cache-clear
 *    • PriceSyncSaga       — price change → notify → cache-clear
 *    • StockSyncSaga       — stock-out → notify → cache-clear
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🔌 CROSS-SERVICE DEPENDENCIES
 * ══════════════════════════════════════════════════════════════════
 *
 *  Consumes (Event + HTTP API):
 *    • user-service       — UserCreatedEvent, UserLoggedInEvent
 *    • product-service    — ProductPriceChangedEvent,
 *                           ProductUnavailableEvent,
 *                           ProductBackInStockEvent
 *    • marketing-service  — Coupon validation API
 *    • tax-service        — Tax calculation API
 *    • logistics-service  — Shipping calculation API
 *    • order-service      — OrderCreatedEvent → clear cart
 *
 *  Exposes (Event only):
 *    CartCreatedEvent, CartUpdatedEvent, CartDeletedEvent,
 *    ItemAddedEvent, ItemUpdatedEvent, ItemRemovedEvent,
 *    ItemQuantityChangedEvent, CouponAppliedEvent, CouponRemovedEvent,
 *    VoucherAppliedEvent, VoucherRemovedEvent, ItemSavedForLaterEvent,
 *    ItemMovedToCartEvent, CartAbandonedEvent, CartRecoveredEvent,
 *    ReminderSentEvent, GuestCartCreatedEvent, GuestCartMergedEvent,
 *    CartMergedEvent, CartMergeConflictEvent, TaxCalculatedEvent,
 *    CartPriceChangedEvent
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📊 STORAGE STRATEGY MATRIX
 * ══════════════════════════════════════════════════════════════════
 *
 *  Entity            | Primary    | TTL       | Reason
 *  ------------------|-----------|-----------|-------------------------
 *  Cart              | Redis     | 7 days    | Ephemeral
 *  CartItem          | Redis     | 7 days    | Ephemeral
 *  CartCoupon        | Redis     | 7 days    | Ephemeral
 *  CartVoucher       | Redis     | 7 days    | Ephemeral
 *  CartTax           | Redis     | 7 days    | Ephemeral
 *  CartShipping      | Redis     | 7 days    | Ephemeral
 *  GuestCart         | Redis     | 7 days    | Ephemeral
 *  SavedItem         | Prisma    | ∞         | Persistent
 *  AbandonedCart     | Prisma    | ∞         | Persistent (analytics)
 *  CartMerger        | Prisma    | ∞         | Persistent (audit)
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🔄 BACKGROUND JOBS (BullMQ)
 * ══════════════════════════════════════════════════════════════════
 *
 *  Queues:
 *    • cart        — expiry, cleanup
 *    • abandonment — detect + mark abandoned
 *    • reminder    — send email/sms/push
 *    • price-sync  — refresh prices + stock
 *    • analytics   — track events
 *
 *  Workers:
 *    • CartExpiryWorker          — expire idle carts
 *    • CartAbandonmentWorker     — detect + persist abandonment
 *    • CartReminderWorker        — send tiered reminders
 *    • PriceSyncWorker           — refresh current prices
 *    • StockSyncWorker           — detect out-of-stock items
 *    • CartCleanupWorker         — orphaned data cleanup
 *    • AnalyticsProcessorWorker  — push events to analytics
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🛡️ SECURITY & AUTHORIZATION
 * ══════════════════════════════════════════════════════════════════
 *
 *  Authentication:
 *    • JWT Bearer token via JwtAuthGuard (shared-kernel)
 *    • Guest access via X-Guest-Token header
 *
 *  Authorization:
 *    • RolesGuard — role-based (admin, customer, vendor)
 *    • OwnCartGuard — verify cart ownership
 *    • CartNotEmptyGuard — prevent checkout on empty carts
 *    • GuestCartGuard — require guest token
 *
 *  Rate limiting:
 *    • RateLimitGuard (shared-kernel)
 *
 *  Idempotency:
 *    • @Idempotent() decorator for mutations
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📏 DESIGN RULES
 * ══════════════════════════════════════════════════════════════════
 *
 *  Domain Layer:
 *    ✅ Pure TypeScript only
 *    ❌ No NestJS / Prisma / Redis / HTTP
 *    ❌ No business logic leaking to outer layers
 *
 *  Application Layer:
 *    ✅ Orchestration only — no domain rules
 *    ✅ Repository interfaces (not concrete classes)
 *    ❌ No direct DB / HTTP calls
 *
 *  Infrastructure Layer:
 *    ✅ Adapters implement domain + application contracts
 *    ✅ Framework code allowed here
 *    ❌ No business logic in repositories
 *
 *  Interfaces Layer:
 *    ✅ HTTP transport only — call application use cases
 *    ❌ No domain entity leaking to client
 *    ❌ No business logic in controllers
 */
