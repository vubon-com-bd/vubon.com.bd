<!-- AUTO-GENERATED from docs/changelog.doc.ts. Do not edit directly. -->

Changelog

All notable changes to the Vendor Service are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

## [1.0.0] — 2026-01-01

### Added

- **Domain layer**
  - 62 primitive value objects (IDs, names, slugs, statuses, types, codes, money, addresses, bank info, team tokens, subscriptions, documents, verification, approval, shipping, warranty, return-policy, invoice, rating, ...)
  - 23 composite value objects (identity, contact, business-info, location, branding, bank-account, commission-config, payout-config, document-info, verification-summary, approval-summary, performance-summary, rating-summary, shipping-config, warranty-config, return-policy-config, subscription-info, team-summary, suspension-info, tier-info, stats-summary, onboarding-progress, aggregate-snapshot)
  - 23 entities — `VendorEntity` (aggregate root) + 22 supporting entities
  - 10 domain services (commission calculator, tier evaluator, rating calculator, performance evaluator, slug generator, ID generator, payout scheduler, suspension policy, approval workflow, stats aggregator)
  - 10 specifications
  - 151 domain events across 22 files
  - 23 repository interfaces + symbol tokens

- **Application layer**
  - 35 request DTOs, 17 response DTOs
  - 23 service interfaces + implementations
  - 69 commands + handlers
  - 46 queries + handlers
  - 5 sagas + 7 saga commands
  - 5 mappers
  - 3 validators
  - 7 error modules

- **Infrastructure layer**
  - 23 Prisma mappers, 23 Prisma repositories
  - 4 Redis cache repositories
  - 5 external services (bank verifier, file storage, notification, analytics, slug reservation)
  - 6 BullMQ queues + 6 workers
  - `PrismaRepositoriesModule`, `RedisRepositoriesModule`, `ExternalServicesModule`, `QueuesWorkersModule`, `InfrastructureModule`

- **Interfaces layer**
  - 21 REST controllers under `/api/v1`
  - 3 custom guards (`VendorOwnerGuard`, `VendorStatusGuard`, `VendorTierGuard`)
  - 4 custom decorators (`@VendorOwner`, `@VendorStatus`, `@VendorTier`, `@IdempotencyKey`)
  - 1 cache interceptor
  - HTTP DTO mappers
  - Swagger tags + bearer auth constants
  - Zod validators

- **Modules**
  - `CommonModule` (globals: kernel + vendor infra)
  - `VendorCoreModule`, `VendorOnboardingModule`, `VendorTeamModule`, `VendorPayoutModule`, `VendorSubscriptionModule`, `VendorFeedbackModule`, `VendorOperationalModule`
  - `HealthModule`

- **Prisma**
  - 23 vendor tables added to `packages/shared-kernel/prisma/schema.prisma`

- **Tests**
  - 214 unit test files, 3103 tests
  - 5 e2e test files, 135 tests
  - Overall coverage: 90.72% statements | 91.42% functions | 91.30% lines

- **Documentation**
  - `README.md`, `ARCHITECTURE.md`, `API.md`, `DEVELOPMENT.md`, `TESTING.md`, `DEPLOYMENT.md`, `CHANGELOG.md`
  - Auto-generation from `.doc.ts` via `docs/extract-docs.cjs`

### Notes

- All money amounts are stored as `Decimal(14, 2)` in the DB and as `number` in TS.
- Vendor IDs are UUID v4.
- Domain events are published post-commit via Redis-backed kernel event bus.
- Prisma schema is shared across all services in the monorepo (single source of truth).

## [Unreleased]

### Planned

- Additional admin dashboards for bulk vendor operations.
- WhatsApp / SMS notification templates for vendor lifecycle events.
- Vendor KYC integration with third-party providers.
- Multi-currency commission rules with FX conversion.
- Advanced analytics (cohort, retention, LTV).
