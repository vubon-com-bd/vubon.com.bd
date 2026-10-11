<!-- See docs/architecture/ARCHITECTURE.md for the full document. -->

# Notification Service — Architecture

DDD + CQRS microservice on NestJS 12.

## Layers

    Interfaces  →  Application  →  Domain
    Infrastructure  →  Application  →  Domain

- **Domain**        — Entities, VOs, events, repo interfaces, specs
- **Application**   — Services, commands, queries, sagas, DTOs
- **Infrastructure** — Prisma repos, cache, queues, workers, providers
- **Interfaces**    — Controllers, guards, DTOs, mappers
- **Modules**       — Feature wiring

## Storage

- PostgreSQL — Notifications, Templates, Schedules, Broadcasts, Digests, Preferences, Devices, Webhooks
- Redis      — Cache (preferences, unread, rate-limit, idempotency) + BullMQ queues
- BullMQ     — Async workers per channel + housekeeping

## Aggregates

Notification, Template, Schedule, Broadcast, Digest, Preference, Device, Webhook

## Sagas

NotificationDelivery, NotificationRetry, ScheduleTrigger, BroadcastProcessing,
DigestGeneration, BounceHandling, Unsubscribe, QuietHours

## Providers

- Email: Resend, SMTP
- SMS: Twilio, SSLWireless
- Push: FCM, Web Push

Full architecture: [docs/architecture/ARCHITECTURE.md](docs/architecture/ARCHITECTURE.md)
Glossary: [docs/architecture/GLOSSARY.md](docs/architecture/GLOSSARY.md)
