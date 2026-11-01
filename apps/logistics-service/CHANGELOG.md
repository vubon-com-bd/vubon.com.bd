# Changelog — Product Service

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Initial Product Service implementation
- 5-layer clean architecture (Domain, Application, Infrastructure, Interfaces, Modules)
- 41 primitive VOs, 12 composite VOs, 11 entities
- 9 domain services (VAT/AIT, Bayesian avg, restock, etc.)
- 7 specifications (CanPublish, CanDelete, ...)
- 36 command handlers + 24 query handlers (CQRS)
- 3 process sagas (ProductPublish, ProductReview, InventoryAlert)
- 13 REST controllers (59 endpoints) + 4 GraphQL resolvers
- 11 Prisma + 11 InMemory repositories (DB_MODE switchable)
- 5 Redis cache repositories
- 5 BullMQ queues + 5 background workers
- Multi-shape DTOs (Full/Public/Summary/List/Detail/Stats)
- Idempotency + CorrelationId middlewares
- E2E test auto-generation (`pnpm generate:e2e`)
- InMemory repository generation (`pnpm generate:inmemory`)
- 319 unit tests + 54 e2e tests
- Termux ARM64 compatibility (graceful Prisma degrade)

### Security
- JWT auth guard on all protected endpoints
- Ownership guards (OwnProduct, VendorProduct)
- Visibility guard (ProductPublished)
- Rate limiting
- Idempotency key support

---

## [1.0.0] - 2026-10-14

### Added
- Initial release
- Production-ready product catalog microservice
- 725 files · 37,146 lines of code
- ~68% test coverage
- Full documentation (README, ARCHITECTURE, TESTING)

---

[Unreleased]: https://github.com/vubon/product-service/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/vubon/product-service/releases/tag/v1.0.0
