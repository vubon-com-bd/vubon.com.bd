# 🌐 API Documentation

Extended API examples and resources.

## 📋 Contents

- **Request/response samples** — real payloads for every endpoint
- **Postman collection** — see [`../../postman/`](../../postman/)
- **cURL examples** — copy-paste ready commands
- **Error examples** — every error code with its scenario

## 🎯 Main API Reference

For complete endpoint documentation, see [`../../API.md`](../../API.md).

## 🚀 Swagger

Live interactive docs at:
- **Local**: http://localhost:3003/api/docs
- **Staging**: https://notification-staging.vubon.com.bd/api/docs
- **Prod**: https://notification.vubon.com.bd/api/docs

## 📊 Endpoint Groups (১৮ total)

| # | Group | Base Path | Endpoints |
|---|-------|-----------|-----------|
| 1 | Health | `/health` | 1 |
| 2 | Notifications | `/notifications` | 9 |
| 3 | Feed | `/notifications/feed` | 1 |
| 4 | Unread | `/notifications/unread-count` | 1 |
| 5 | Email | `/emails` | 3 |
| 6 | SMS | `/sms` | 2 |
| 7 | Push | `/push` | 2 |
| 8 | In-App | `/in-app` | 2 |
| 9 | Templates | `/templates` | 5 |
| 10 | Schedules | `/schedules` | 5 |
| 11 | Broadcasts | `/broadcasts` | 6 |
| 12 | Digests | `/digests` | 4 |
| 13 | Preferences | `/preferences` | 6 |
| 14 | Devices | `/devices` | 5 |
| 15 | Webhooks | `/webhooks` | 5 |
| 16 | Analytics | `/analytics` | 4 |
| 17 | Provider Webhooks | `/webhooks/providers` | 7 |
| 18 | Delivery Tracking | `/notifications/{id}/delivery` | 3 |
| | **Total** | | **~72** |

## 🔗 Related

- [`../../API.md`](../../API.md) — full API reference
- [`../../postman/README.md`](../../postman/README.md) — Postman guide
