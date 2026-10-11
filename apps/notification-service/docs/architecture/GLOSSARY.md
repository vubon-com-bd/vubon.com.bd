# Glossary

Domain terms used throughout the notification service.

## Core Concepts

**Aggregate** — Cluster of domain objects treated as a unit for consistency.
Has one root entity. E.g., `NotificationEntity` is the root; its delivery
attempts and read-state are part of the aggregate.

**Aggregate Root** — The only object in an aggregate accessible from outside.
Extends `AggregateRoot<TId>` from `@vubon/shared-kernel`. Emits domain events.

**Value Object (VO)** — Immutable, identity-less domain primitive. E.g.,
`NotificationIdVO`, `NotificationPriorityVO`. Two VOs are equal if their
values are equal.

**Domain Event** — Something meaningful that happened in the domain.
E.g., `NotificationCreatedEvent`, `NotificationSentEvent`. Emitted by
aggregates, published by `DomainEventBridgeService`.

**Specification** — Encapsulates a boolean business rule. E.g.,
`CanSendNotificationSpecification`. Composable via `.and()`, `.or()`, `.not()`.

**Domain Service** — Stateless pure logic that doesn't belong to one entity.
E.g., `NotificationChannelPlannerService` (routing), `NotificationRateLimitService`
(quota), `NotificationRetryPolicyService` (backoff).

## Notification Specific

**Channel** — Delivery mechanism. One of:
`email | sms | push | in_app | webhook | whatsapp | telegram | messenger | slack | voice`

**Type** — Semantic category of the notification. One of:
`transactional | promotional | system | security | reminder | alert | welcome |
order_update | payment_update | shipping_update | account_update | marketing |
announcement | verification`

**Category** — Business context. One of:
`auth | user | order | payment | shipping | product | promotion | support |
system | security | marketing | reminder`

**Priority** — Urgency level. One of:
`critical | high | normal | low | silent`

- `critical` — bypasses rate limits + quiet hours
- `silent` — no sound/vibration on push

**Status** — Lifecycle state:
`draft | pending | queued | scheduled | sending | sent | delivered | failed |
cancelled | expired | archived`

**Read Status** — User-facing read state:
`unread | read | archived | deleted | starred | snoozed`

**Delivery Status** — Provider-side delivery state:
`queued | sending | sent | delivered | read | failed | bounced | rejected |
unsubscribed | blocked`

**Delivery Attempt** — One try at delivering via one provider. If retryable
failure → schedule next attempt with exponential backoff.

**Fan-out** — Sending one notification content via multiple channels.
Each channel produces a distinct `NotificationEntity`.

**Suppression** — Skipping delivery because of user preference, rate limit,
or quiet hours.

**Quiet Hours** — Window (e.g., 22:00–08:00) when non-critical notifications
are deferred. Critical priority bypasses.

## Providers

**Provider** — Adapter for an external service. Extends `IProvider`.
Channel-specific: `IEmailProvider`, `ISmsProvider`, `IPushProvider`.

**Provider Resolver** — Picks the active provider for a channel based on:
1. Explicit preferred name (per message)
2. Config default (`EMAIL_PROVIDER=resend`)
3. First enabled provider
4. Else `NO_PROVIDER` error

**Fallback** — If preferred provider unavailable, resolver drops to next
in priority order.

**Provider Message ID** — Provider's own tracking ID (e.g., Resend `msg_xxx`,
Twilio `SMxxx`, FCM message name). Stored for correlating webhooks.

## Delivery Pipeline

**Dispatch** — Routing a notification to the right queue based on channel.

**Queue** — BullMQ queue. Named by purpose: `email`, `sms`, `push`,
`notification`, `webhook`, `analytics`, `cleanup`.

**Worker** — BullMQ processor. Listens to a queue + processes jobs.
E.g., `EmailWorker` processes `email` queue.

**Job** — A unit of work in a queue. Has a name + payload + options
(priority, delay, attempts).

**Backoff** — Delay before next retry. Exponential: `base * 2^attempt`.
Webhooks use special sequence: 10s, 30s, 120s, 600s, 3600s.

**Retryable Error** — Failure that can be retried (5xx, network, rate limit).
Non-retryable (4xx with bad credentials) → mark permanent failure.

## Data Model

**Template** — Reusable message skeleton with `{{variable}}` placeholders.
Versioned. Locale-aware. Multiple types (email, sms, push).

**Schedule** — One-time or recurring notification trigger. Types:
`immediate | scheduled | recurring | delayed | triggered`.

**Broadcast** — Mass send to many users. Types:
`all_users | segment | role_based | location_based | behavior_based | custom_list`.
Batches processed via queue.

**Digest** — Aggregated summary of multiple notifications. Sent as one
message on a schedule. Frequencies:
`hourly | daily | weekly | biweekly | monthly`.

**Preference** — Per-user notification settings. Channel toggles,
category toggles, quiet hours, locale, timezone.

**Device** — Registered push target. Has type (android/ios/web/...),
status (active/inactive/blocked), token (FCM/APNs/WebPush).

**Webhook** — Outbound HTTP callback to external system on events.
Methods: GET/POST/PUT/PATCH/DELETE. Signed with HMAC-SHA256.

## Cross-Service

**Correlation ID** — Request-scoped ID propagated across services via
`x-correlation-id` header. Enables distributed tracing.

**Idempotency Key** — Client-supplied unique key ensuring retried requests
don't create duplicate resources. Cached 24h in Redis.

**Cross-Service Client** — HTTP client wrapper for calling user-service,
order-service, etc. Uses `@vubon/shared-api` `httpClient`.

## Infrastructure

**Kernel** — `@vubon/shared-kernel` package. Provides all base abstractions
(VO, entity, repo, event, guard, etc.).

**Prisma** — ORM. Schema at `packages/shared-kernel/prisma/schema.prisma`.
Single source of truth for all services.

**Redis** — Cache + queue backend. Cache keys prefixed `vubon:notify:`.

**CQRS** — Command Query Responsibility Segregation. Writes via CommandBus,
reads via QueryBus.

**Saga** — Long-running orchestration listening to events and issuing
follow-up commands. E.g., `NotificationDeliverySaga` reacts to
`NotificationCreatedEvent` and dispatches.

**Specification** — See "Core Concepts".

## Environment

**Monorepo Root** — `/path/to/vubon.com.bd` — has `pnpm-workspace.yaml`.

**Service** — Each app under `apps/` (e.g., `notification-service`).

**Package** — Each library under `packages/` (e.g., `shared-kernel`).

## Abbreviations

| Short | Full |
|-------|------|
| VO | Value Object |
| DTO | Data Transfer Object |
| AR | Aggregate Root |
| CQRS | Command Query Responsibility Segregation |
| DI | Dependency Injection |
| ESM | ECMAScript Modules |
| CJS | CommonJS |
| TTL | Time To Live |
| HMAC | Hash-based Message Authentication Code |
| VAPID | Voluntary Application Server Identification |
| FCM | Firebase Cloud Messaging |
| APNs | Apple Push Notification service |
| SPA | Single Page Application |
| SLA | Service Level Agreement |
| SMTP | Simple Mail Transfer Protocol |
| IMAP | Internet Message Access Protocol |
| CDN | Content Delivery Network |
| CI | Continuous Integration |
| CD | Continuous Deployment |

## Rules of Thumb

**"Should I make a VO?"** — If it's a primitive with validation rules,
yes. E.g., email address, phone, money, ID.

**"Entity or VO?"** — Entity has identity (ID + lifecycle). VO doesn't.
Order with same items ≠ same order. Email address = same email.

**"Domain Service or Application Service?"** — Domain Service: pure logic
across multiple entities, no I/O. Application Service: orchestrates use
case, injects repos/services, saves/publishes.

**"Saga or plain event handler?"** — Saga: multi-step orchestration with
compensation. Event handler: single reaction.

**"Event or Command?"** — Event: something happened (past tense). Command:
intent to do something (imperative).

**"Sync or async delivery?"** — Sync for immediate (in-app). Async via
queue for external providers (email/sms/push) so failures don't block HTTP.
