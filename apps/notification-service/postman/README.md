# Postman Collection — Notification Service

Complete Postman collection for Notification Service API.

## Files

- `Notification Service.postman_collection.json` — Main collection (১৮ folders · ~৭৮ requests)
- `environments/dev.postman_environment.json` — Dev (localhost:3003)
- `environments/staging.postman_environment.json` — Staging
- `environments/prod.postman_environment.json` — Production

## Quick Start

1. Import collection into Postman
2. Import `environments/dev.postman_environment.json`
3. Select environment (top-right dropdown)
4. Set `accessToken` variable with valid JWT
5. Start testing from **🏥 Health** folder

## Folder Overview (১৮)

| # | Folder | Requests | Purpose |
|---|--------|----------|---------|
| 1 | 🏥 Health | 1 | Health check |
| 2 | 🔔 Notifications | 9 | Send, cancel, list, get |
| 3 | 🔴 Feed & Unread | 2 | User feed, unread count |
| 4 | 📧 Email | 3 | Send, template, bulk |
| 5 | 📱 SMS | 2 | Send, bulk |
| 6 | 🔔 Push | 2 | Send, bulk |
| 7 | 📬 In-App | 2 | Create, dismiss |
| 8 | 📝 Templates | 5 | CRUD + test |
| 9 | ⏰ Schedules | 5 | CRUD |
| 10 | 📣 Broadcasts | 6 | Create, start, result |
| 11 | 📰 Digests | 4 | Create, send, list |
| 12 | ⚙️ Preferences | 6 | Get, update, bulk, unsubscribe |
| 13 | 📲 Devices | 5 | Register, unregister, list |
| 14 | 🪝 Webhooks | 5 | CRUD + test |
| 15 | 📈 Analytics | 4 | Rates, channels, engagement |
| 16 | 🔗 Provider Webhooks | 7 | Inbound from providers |
| 17 | 📦 Delivery Tracking | 3 | Status, attempts, retry |
| 18 | 📊 Broadcast Results | 2 | Results |

## Authentication

Set `accessToken` environment variable with a valid JWT:
```
POST http://localhost:3001/auth/login
{ "email": "...", "password": "..." }
```

## Auto-Variables

| Variable | Source |
|----------|--------|
| `uniqueSuffix` | Auto-set on prerequest |
| `timestamp` | Auto-set on prerequest |
| `notificationId` | Auto-saved on send success |
| `templateId` | Auto-saved on template create |
| `broadcastId` | Auto-saved on broadcast create |
| `scheduleId` | Auto-saved on schedule create |
| `deviceId` | Auto-saved on device register |
| `webhookId` | Auto-saved on webhook create |
| `digestId` | Auto-saved on digest create |

## Test Assertions

Every request has assertions that accept:
- **2xx** success
- **400, 401, 403, 404, 409, 422** validation/auth errors
- **500, 503** server/infra errors (Termux-safe)

## Running with Newman

```bash
npm install -g newman
newman run "postman/Notification Service.postman_collection.json" \
  -e "postman/environments/dev.postman_environment.json" \
  --delay-request 200 \
  --bail
```

## Regenerate

```bash
npm run generate:postman
# or
node scripts/generate-postman-collection.mjs
```
