# Changelog — Cart Service

All notable changes to this project are documented here.

Format: [Keep a Changelog](https://keepachangelog.com/)  
Versioning: [Semantic Versioning](https://semver.org/)

## [Unreleased]

### Added

- Initial Cart Service implementation
- DDD + CQRS architecture (5 layers)
- 46 Value Objects (34 primitives + 12 composites)
- 10 Entities (1 aggregate root: CartEntity)
- 10 Repositories (Prisma + Redis + InMemory)
- 10 Domain Services (calculation, merge, eligibility)
- 6 Specifications (can-add, can-checkout, can-merge, ...)
- 52 Commands (CQRS write side)
- 30 Queries (CQRS read side)
- 4 Sagas (abandonment, recovery, price-sync, stock-sync)
- 9 REST controllers + 1 GraphQL resolver
- 4 Guards (JWT, CartOwner, GuestCart, CartNotEmpty)
- 3 Interceptors (cache, lock, guest-token)
- 6 Queues + 7 Workers (BullMQ)
- Email + SMS + Push notification channels
- Prisma + Redis persistence layer
- InMemory fallback (10 repos) with DB_MODE switch
- Swagger documentation (33 endpoints)
- Postman collection (42 requests)
- 1,606 tests (96.35% coverage)
- Health check endpoint (aggregated)
- Idempotency support
- Multi-shape DTOs (full/public/summary/list/stats)
- Complete documentation (this file + 5 others)

### Security

- JWT authentication on protected endpoints
- Owner-based authorization
- Guest token validation
- Idempotency keys on mutations
- Input validation (class-validator + Zod)
- Rate limiting

### Changed

- DB_MODE=memory uses in-memory repos (no DB required)
- DB_MODE=prisma uses Prisma + Redis (production)
- DB_MODE=redis uses Redis only (hot-path)

### Fixed

- Path depth issues in InMemory repos
- CartItemStatusVO value import
- DynamicModule return types in common module

## [1.0.0] - 2026-10-16

### Added

- Initial release
- Production-ready Cart Service
- Full test coverage
- Complete API documentation
- Deployment guides
- Postman collection

---

**Legend:**

- **Added** — new features
- **Changed** — changes to existing functionality
- **Deprecated** — soon-to-be removed features
- **Removed** — removed features
- **Fixed** — bug fixes
- **Security** — security improvements
