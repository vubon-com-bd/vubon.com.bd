<!-- See docs/guides/API-REFERENCE.md for the full reference. -->

# Notification Service — API

REST API base URL:

    Development:  http://localhost:4007/api/v1
    Production:   https://notify.vubon.com.bd/api/v1
    Swagger UI:   /api/v1/docs
    OpenAPI JSON: /api/v1/docs-json

Auth: Bearer JWT in `Authorization` header.
Content-Type: application/json

## Endpoint groups

- /notifications      — Send, list, mark read, cancel, retry
- /email              — Send, retry, cancel, list
- /sms                — Send, bulk, retry, cancel, list
- /push               — Send, topic, subscribe, unsubscribe, list
- /in-app             — Send, inbox, mark read, dismiss, click
- /templates          — CRUD, activate, deprecate, render, preview
- /schedules          — CRUD, activate, pause, resume, trigger
- /broadcasts         — CRUD, schedule, start, cancel, test
- /digests            — CRUD, generate, send, preview
- /preferences        — Get, update, toggle, quiet hours, opt-in/out
- /devices            — Register, update, block, unregister
- /webhooks           — CRUD, activate, disable, test, retry delivery
- /provider-webhooks  — Inbound (public, signature-verified)
- /analytics          — Overview, time-series, channel performance
- /delivery           — Delivery status, list
- /health             — Liveness, readiness, full check

Full reference: [docs/guides/API-REFERENCE.md](docs/guides/API-REFERENCE.md)
