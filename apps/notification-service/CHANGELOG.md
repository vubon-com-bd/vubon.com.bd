# Changelog — Notification Service

All notable changes to this project. Follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) + [SemVer](https://semver.org/).

## [Unreleased]

### Added

**Domain Layer**
- 11 typed error classes (notification, template, schedule, broadcast, digest, preference, device, webhook, delivery, rate-limit, provider)
- 60 primitive value objects (IDs, types, statuses, subjects, bodies, etc.)
- 25 composite value objects (Notification, Template, Schedule, Broadcast, Digest, Preference, Device, Webhook, etc.)
- 12 domain event files (~63 event classes)
- 19 entities (8 aggregates + 11 children)
- 18 repository interfaces + DI tokens
- 5 event stores (Notification, Delivery, Broadcast, Digest)
- 20 domain services (builder, channel-selector, priority-calculator, template-renderer, retry-policy, etc.)
- 7 specifications (can-send, can-broadcast, can-schedule, can-retry, can-unsubscribe, etc.)

**Application Layer**
- 11 application errors
- 52 request DTOs (from shared-schemas)
- 14 response DTOs (multi-shape: full/public/summary/list/stats/detail)
- 19 service interfaces + 19 implementations
- ~90 command handlers (CQRS write side)
- ~70 query handlers (CQRS read side)
- 18 sagas (delivery, retry, schedule, broadcast, digest, bounce, unsubscribe, quiet-hours)
- 10 mappers (entity → DTO)
- 5 validators (Zod wrappers)

**Infrastructure Layer**
- Prisma schema (19 models: Notification, Template, Schedule, Broadcast, Digest, Preference, Device, Webhook, etc.)
- 18 Prisma repositories
- 22 Prisma mappers (entity ↔ row)
- 18 InMemory repositories (dev/offline mode)
- 5 Redis cache repositories
- 1 Idempotency cache repository
- 10 BullMQ queues (send, broadcast, schedule, digest, webhook, retry, email, sms, push, in-app)
- 13 queue workers (senders, processors, cleanup)
- 41 provider implementations:
  - Email: SendGrid, Mailgun, Resend, SES, Postmark, SMTP
  - SMS: SSLWireless, BulkSMSBD, MIMSMS, Banglalink, Grameenphone, Robi, Airtel, Teletalk, Twilio
  - Push: FCM, APNs, WebPush, OneSignal, Expo
  - Webhook: HTTP, Slack, Discord, Telegram
  - In-App: WebSocket, SSE
- 16 config files (notification, email, sms, push, webhook, template, schedule, broadcast, digest, rate-limit, quiet-hours, retry, etc.)
- Template engine (Handlebars, Mustache, EJS, MJML) + 3 partials + 3 helpers
- 6 external service clients (user, order, product, vendor, payment, analytics)
- 14 internal services (composer, channel-selector, recipient-resolver, rate-limiter, quiet-hours, retry-scheduler, bounce-handler, unsubscribe-token, device-token-validator, webhook-signer, webhook-verifier, sms-splitter, content-sanitizer)

**Interfaces Layer**
- 14 REST controllers (notification, email, sms, push, in-app, template, schedule, broadcast, digest, preference, device, webhook, analytics, health)
- 7 provider webhook controllers (inbound)
- 6 custom guards (own-notification, admin-only, template-owner, webhook-signature, device-owner, notification-rate-limit)
- 3 interceptors (cache, rate-limit, delivery-tracking)
- 3 decorators (idempotency-key, notification-owner, api-paginated)
- 2 middlewares (webhook-logger, idempotency)
- 7 request DTOs + 12 response DTOs
- 6 validators (HTTP wrappers)
- 5 mappers (HTTP ↔ App)
- HTTP error translator

**Modules Layer**
- 15 feature modules (notification, email, sms, push, in-app, template, schedule, broadcast, digest, preference, device, webhook, delivery, provider-gateways, health)
- Common module (@Global aggregator)
- App module (root)
- Dynamic `InfrastructureModule.forRoot()` (Prisma/Memory switch)

**Tooling**
- Postman collection generator (18 folders · 73 requests)
- README generator (from TS constant)
- InMemory repos generator (18 spec-driven)
- E2E test generators

**Documentation**
- README.md — project overview
- ARCHITECTURE.md — 5-layer deep dive
- API.md — REST API reference
- TESTING.md — test patterns
- DEVELOPMENT.md — local setup
- DEPLOYMENT.md — production deployment
- CHANGELOG.md — version history
- docs/ folder (README, architecture/, api/)

**Testing**
- 4,162 tests (unit: 3,712 · e2e: 97)
- 96.88% statement coverage
- 89.81% branch coverage
- 97.09% function coverage
- 96.91% line coverage

### Security

- JWT authentication (Bearer token)
- Role-based access control (`@Roles()`)
- Ownership guards (notification, device, template)
- Rate limiting (10/min per user for send endpoints)
- Webhook signature verification (HMAC-SHA256)
- Input sanitization (XSS, CRLF, SSRF)
- Idempotency keys (Redis-backed)

## [1.0.0] — 2026-10-26

### Added

- Initial release
- Full 5-layer DDD architecture
- Multi-channel notification support (email, SMS, push, in-app, webhook)
- Multi-provider support (Bangladesh + international)
- Template engine with 4 engines (Handlebars, Mustache, EJS, MJML)
- Scheduled + recurring notifications
- Broadcast campaigns (mass notifications)
- Daily/weekly digests
- User preference management
- Device registration + push token management
- Outgoing webhook registration + delivery
- Inbound provider webhooks (SendGrid, Mailgun, SES, Twilio, Vonage, FCM, APNs)
- Analytics + reporting
- In-Memory mode for Termux/dev (no DB required)

### Fixed

- N/A (initial release)

### Changed

- N/A (initial release)

### Deprecated

- N/A (initial release)

### Removed

- N/A (initial release)

---

## Version Format

Given a version number `MAJOR.MINOR.PATCH`:

- **MAJOR** — incompatible API changes
- **MINOR** — new functionality (backwards compatible)
- **PATCH** — bug fixes (backwards compatible)

## Change Categories

- **Added** — new features
- **Changed** — changes in existing functionality
- **Deprecated** — soon-to-be removed features
- **Removed** — removed features
- **Fixed** — bug fixes
- **Security** — security improvements
