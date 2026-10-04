# Changelog — cart-service

All notable changes to this service are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- GraphQL resolver for cart (currently REST-only)
- Redis Cluster sharding for horizontal cart distribution
- Real-time cart sync via WebSocket for multi-device users
- A/B test framework for coupon strategies

---

## [1.0.0] — 2026-10-03

Initial production release.

### Added

**Domain Layer (108 files)**
- 32 primitive Value Objects (Cart ID, Status, Type, Quantity, Coupon Code, Voucher Code, Tax Rate, Shipping Method, Merge Strategy, Guest Token, etc.)
- 12 composite Value Objects (Cart, CartItem, CartTotals, CartCoupon, CartVoucher, CartTax, CartShipping, SavedForLater, AbandonedCart, GuestCart, CartMerger, CartSummary)
- 10 aggregates + entities (Cart, CartItem, CartCoupon, CartVoucher, CartTax, CartShipping, SavedForLater, AbandonedCart, GuestCart, CartMerger)
- 39 domain events (cart lifecycle, item lifecycle, coupon/voucher, saved, abandoned, guest, merger)
- 10 repository interfaces with DI tokens
- 10 pure domain services (calculation, validation, merge, eligibility, coupon-validation, voucher-validation, limits, abandonment-detector, price-sync, stock-check)
- 6 specifications (can-add-item, can-checkout, can-apply-coupon, can-merge, can-save-for-later, can-recover)
- 8 domain error groups (cart, cart-item, coupon, voucher, limits, price, merge, abandoned-cart)

**Application Layer (187 files)**
- 37 request + response DTOs
- 24 command + handler pairs (cart, item, coupon, voucher, shipping, saved, guest, checkout)
- 12 query + handler pairs (cart, item, totals, saved, abandoned, analytics)
- 4 sagas (cart-abandonment, cart-recovery, price-sync, stock-sync)
- 7 saga commands
- 10 service interfaces + 10 implementations
- 5 mappers, 4 validators, 5 error groups

**Infrastructure Layer (86 files)**
- 7 Redis repositories (Cart, CartItem, GuestCart, Coupon, Voucher, Tax, Shipping)
- 3 Prisma repositories (Saved, Abandoned, Merger)
- 2 Cache repositories (Totals, Summary)
- 5 external clients (Product, Pricing, Tax, Shipping, Coupon)
- 6 internal services (Guest-token, Abandonment-detector, Cart-calculation, Cart-merge, Price-sync, Stock-check)
- 5 BullMQ queues + 7 workers
- 9 config modules
- Email / SMS / Push services with templates
- Health check service

**Interfaces Layer (53 files)**
- 9 REST controllers with Swagger decorators
- 3 guards (OwnCart, CartNotEmpty, GuestCart)
- 2 interceptors (CartLock, CartCache)
- 2 decorators (OwnCart, Idempotent)
- 7 HTTP DTO pairs (request + response)
- 4 HTTP mappers, 3 Zod validators
- 2 middlewares (GuestToken, CartContext)

**Modules Layer (50 files)**
- 11 feature modules (Cart, CartItem, CartCoupon, CartVoucher, CartTax, CartShipping, SavedForLater, AbandonedCart, GuestCart, CartMerger, Health)
- Common module (kernel cross-cutting)
- AppModule (root)
- RedisRepositoriesModule + PrismaRepositoriesModule + QueuesWorkersModule

**Testing (165 unit + 5 E2E)**
- 1,217 unit tests passing (100%)
- 16 E2E tests passing (100%)
- ~87% statement coverage
- Full Domain + Application + Infrastructure + Interfaces coverage

**Documentation**
- README.md (main readme)
- ARCHITECTURE.md (5-layer + domain model)
- API.md (REST reference)
- DEVELOPMENT.md (setup + troubleshooting)
- TESTING.md (test strategy + patterns)
- DEPLOYMENT.md (Docker + Railway)
- CHANGELOG.md (this file)
- Auto-generated via `docs/extract-docs.cjs`

### Technical Notes

- **Runtime:** Node.js 22, ESM modules
- **Framework:** NestJS 12 + CQRS
- **Storage:** Redis (primary) + PostgreSQL via Prisma (persistent)
- **Queue:** BullMQ 5
- **Validation:** Zod + class-validator
- **Testing:** Jest 29 + ts-jest + supertest
- **Port:** 4003
- **API prefix:** `/api/v1`

### Known Limitations

- Prisma engine unavailable on Termux ARM64 (graceful degrade to Redis-only; persistent features return 503)
- GraphQL resolver not implemented (REST-only)
- WebSocket cart sync not implemented
- Rate limiting relies on shared-kernel RateLimitGuard

---

## Version History

| Version | Date | Notes |
|---------|------|-------|
| 1.0.0 | 2026-10-03 | Initial release — 5 layers, 484 source files, 1,217 unit tests |
