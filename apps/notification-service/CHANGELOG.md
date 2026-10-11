# Changelog

All notable changes to the notification-service.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
Versioning: [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

## [Unreleased]

### Planned
- WebSocket/SSE real-time in-app delivery
- APNs native provider for iOS
- AWS SES email provider
- Admin dashboard for provider status
- Delivery analytics dashboard
- Bulk template import/export
- A/B testing framework

## [1.0.0] — 2026-10-11

### Added — Initial Release

**Domain Layer**
- 8 aggregate roots: Notification, Template, Schedule, Broadcast, Digest,
  Preference, Device, Webhook
- 54 primitive value objects
- 16 composite value objects
- 9 domain event groups (notification, delivery, template, schedule,
  broadcast, digest, preference, device, webhook)
- 8 repository interfaces (with Symbol tokens)
- 6 domain services (dispatcher, rate limiter, preference checker,
  template renderer, retry policy, channel planner)
- 4 specifications

**Application Layer**
- 15 service interfaces + implementations
- 75 command handlers across 15 feature groups
- 60 query handlers
- 8 orchestration sagas
- 30 request DTOs + 12 response DTOs
- 11 mappers
- 7 validators

**Infrastructure Layer**
- Prisma schema for 20 notification models
- 8 Prisma repositories with mappers
- 6 cache repositories (notification, template, preference, rate-limit,
  idempotency, device-token)
- 12 queue wrappers
- 12 BullMQ workers
- 8 internal services (template renderer, rate limiter, quiet hours, etc.)
- 6 external service clients (user, order, product, vendor, payment,
  analytics)

**Providers (Multi-Provider)**
- Base HTTP provider with timeout + error mapping
- Email: Resend (3000/mo free), SMTP (Gmail 500/day free)
- SMS: Twilio ($15 trial), SSLWireless (BD-local)
- Push: FCM (free unlimited), Web Push VAPID (free)
- Per-channel resolvers with fallback + per-message override

**Interfaces Layer**
- 16 REST controllers
- 90+ HTTP endpoints
- 40 request DTOs with class-validator + Swagger
- 12 response DTOs
- 11 HTTP DTO mappers
- 2 feature guards (owner, status)
- 1 cache interceptor
- 1 status decorator

**Modules**
- 7 feature modules (Notification, Template, Schedule, Broadcast,
  Preference, Webhook, Health)
- CommonModule aggregating kernel + infrastructure globals
- AppModule root

**Testing**
- 244 unit test suites / 2554 tests
- 19 E2E test suites / 204 tests
- 94% overall coverage
- 105 provider-specific tests
- 12 provider E2E integration tests

**Documentation**
- README with quick start + provider matrix
- Provider setup guide (Resend, SMTP, Twilio, SSLWireless, FCM, WebPush)
- Architecture guide with data flow + state machines
- API reference with all endpoints + examples
- Deployment guide (systemd, Docker, K8s, nginx, scaling)
- Local development guide
- Testing guide
- Glossary

### Security
- JWT authentication via kernel `JwtAuthGuard`
- Role-based access via `RolesGuard`
- Permission-based access via `PermissionsGuard`
- HMAC-SHA256 webhook signature verification
- Idempotency keys for safe retries
- Rate limiting per user + per channel
- Constant-time signature comparison (`timingSafeEqual`)

### Performance
- Redis caching for hot reads (preferences, unread counts, templates)
- BullMQ for async processing
- Sliding-window rate limiting via Redis INCR
- Batch processing for broadcasts
- Concurrent worker processing (configurable per queue)

### Compatibility
- Node 22+
- pnpm 9+
- PostgreSQL 15+
- Redis 6+
- NestJS 12

## [0.1.0] — Earlier

Initial scaffolding and domain model. Superseded by 1.0.0.

---

## Versioning Policy

**MAJOR** — Breaking HTTP API or provider contract change
**MINOR** — New endpoints, new provider, new channel
**PATCH** — Bug fixes, dependency updates, non-breaking refactors

## Deprecation Policy

- Deprecated features marked in Swagger + docs
- Supported for 2 minor versions after deprecation
- Removed in next major version

## Migration Notes

When upgrading, check:
1. `docs/setup/PROVIDER-SETUP.md` — env var changes
2. `docs/guides/API-REFERENCE.md` — endpoint changes
3. `docs/architecture/ARCHITECTURE.md` — schema changes

## Contributing

Every PR must update:
- `CHANGELOG.md` (add to Unreleased)
- Relevant docs in `docs/`
- Tests

See main repo CONTRIBUTING.md for full guidelines.
