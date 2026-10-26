# 🌐 API Reference — Notification Service

Complete REST API reference for all 18 endpoint groups.

**Base URL:** `http://localhost:3003`
**Swagger UI:** `http://localhost:3003/api/docs`

## 🔐 Authentication

All protected endpoints require a **Bearer JWT** token:

```http
Authorization: Bearer <accessToken>
```

### Public Endpoints (no auth)
- `GET /health`
- `POST /webhooks/providers/{provider}` (signature-based)

### Dev Mode
Set `DISABLE_AUTH=true` in `.env` to bypass auth (never in production).

## 📊 Endpoints Summary

| # | Group | Base Path | Endpoints |
|---|-------|-----------|-----------|
| 1 | Health | `/health` | 1 |
| 2 | Notifications | `/notifications` | 9 |
| 3 | Feed & Unread | `/notifications/feed` | 2 |
| 4 | Email | `/emails` | 3 |
| 5 | SMS | `/sms` | 2 |
| 6 | Push | `/push` | 2 |
| 7 | In-App | `/in-app` | 2 |
| 8 | Templates | `/templates` | 5 |
| 9 | Schedules | `/schedules` | 5 |
| 10 | Broadcasts | `/broadcasts` | 6 |
| 11 | Digests | `/digests` | 4 |
| 12 | Preferences | `/preferences` | 6 |
| 13 | Devices | `/devices` | 5 |
| 14 | Webhooks | `/webhooks` | 5 |
| 15 | Analytics | `/analytics` | 4 |
| 16 | Provider Webhooks | `/webhooks/providers` | 7 |
| 17 | Delivery Tracking | `/notifications/{id}/delivery` | 3 |
| 18 | Broadcast Results | `/broadcasts/{id}/result` | 2 |
| | **Total** | | **~72** |

## 1️⃣ Health

### GET /health

Health check + dependency status.

**Response 200:**
```json
{
  "service": "notification-service",
  "healthy": true,
  "timestamp": "2026-10-26T10:00:00.000Z",
  "uptimeSeconds": 3600,
  "dependencies": [
    { "name": "database", "healthy": true },
    { "name": "redis", "healthy": true }
  ]
}
```

## 2️⃣ Notifications

### POST /notifications

Send a notification to a single user.

**Body:**
```json
{
  "userId": "00000000-0000-4000-8000-000000000008",
  "type": "transactional",
  "category": "order",
  "channels": ["email", "push"],
  "priority": "normal",
  "subject": "Order confirmed",
  "body": "Your order #12345 has been confirmed",
  "data": { "orderId": "ORD-001" }
}
```

**Headers:**
- `Idempotency-Key: <unique-key>` (optional, prevents duplicates)

**Response 201:**
```json
{
  "success": true,
  "notificationIds": ["uuid1", "uuid2"],
  "status": "queued",
  "queuedCount": 2,
  "failedCount": 0
}
```

### POST /notifications/bulk

Send to multiple users.

**Body:**
```json
{
  "userIds": ["uuid1", "uuid2"],
  "type": "promotional",
  "category": "marketing",
  "channels": ["email"],
  "subject": "Weekend sale",
  "body": "50% off this weekend!"
}
```

### GET /notifications

List notifications (paginated).

**Query:** `page`, `limit`, `type`, `category`, `channel`, `status`, `isRead`, `fromDate`, `toDate`

**Response 200:**
```json
{
  "items": [{ "id": "...", "title": "...", "isRead": false }],
  "total": 42,
  "page": 1,
  "limit": 20,
  "totalPages": 3,
  "unreadCount": 8
}
```

### GET /notifications/{id}

Get notification by ID (owner-only).

### GET /notifications/{id}/detail

Get with recipients + delivery attempts.

### GET /notifications/{id}/public

Customer-safe view (no internal PII).

### POST /notifications/{id}/cancel

Cancel a pending notification.

**Body:**
```json
{ "reason": "Customer requested" }
```

### POST /notifications/{id}/resend

Resend a failed notification.

### GET /notifications/stats

Get aggregated stats.

## 3️⃣ Feed & Unread

### GET /notifications/feed

Current user's notification feed.

**Query:** `page`, `limit`

### GET /notifications/unread-count

```json
{ "count": 8 }
```

## 4️⃣ Email

### POST /emails

Send a single email.

**Body:**
```json
{
  "to": ["user@example.com"],
  "subject": "Welcome",
  "html": "<h1>Welcome!</h1>",
  "priority": "normal"
}
```

### POST /emails/template

Send using a template.

**Body:**
```json
{
  "to": ["user@example.com"],
  "templateId": "uuid",
  "templateData": { "name": "User" }
}
```

### POST /emails/bulk

Send to many recipients.

## 5️⃣ SMS

### POST /sms

Send SMS (BD + international).

**Body:**
```json
{
  "to": "+8801712345678",
  "message": "Test SMS",
  "type": "transactional",
  "senderId": "VUBON"
}
```

### POST /sms/bulk

Send bulk SMS.

## 6️⃣ Push

### POST /push

Send push notification.

**Body:**
```json
{
  "tokens": ["fcm-token-1", "fcm-token-2"],
  "title": "New message",
  "body": "You have a new message",
  "data": { "chatId": "123" }
}
```

### POST /push/bulk

Send bulk push.

## 7️⃣ In-App

### POST /in-app

Create in-app notification.

### POST /in-app/{id}/dismiss

Dismiss an in-app notification.

## 8️⃣ Templates

### POST /templates

Create a template.

**Body:**
```json
{
  "name": "Order Confirmation",
  "slug": "order-confirmation",
  "type": "email",
  "category": "order",
  "locale": "en",
  "subject": "Order {{orderId}} confirmed",
  "body": "Hi {{userName}}, order {{orderId}} is confirmed.",
  "variables": [
    { "name": "userName", "type": "string", "required": true },
    { "name": "orderId", "type": "string", "required": true }
  ]
}
```

### PUT /templates/{id}

Update a template.

### POST /templates/{id}/test

Test-render a template.

### GET /templates

List templates (paginated).

### GET /templates/{id}

Get template by ID.

## 9️⃣ Schedules

### POST /schedules

Create a recurring schedule.

### PUT /schedules/{id}

Update a schedule.

### DELETE /schedules/{id}

Cancel a schedule.

### GET /schedules

List schedules.

### GET /schedules/{id}

Get schedule by ID.

## 🔟 Broadcasts

### POST /broadcasts

Create a broadcast (admin only).

### POST /broadcasts/{id}/start

Start sending.

### POST /broadcasts/{id}/cancel

Cancel.

### GET /broadcasts

List broadcasts.

### GET /broadcasts/{id}

Get broadcast.

### GET /broadcasts/{id}/result

Get delivery + engagement stats.

## 1️⃣1️⃣ Digests

### POST /digests

Create digest config.

### POST /digests/{id}/send

Force-send a digest.

### GET /digests

List digests.

### GET /digests/{id}

Get digest detail.

## 1️⃣2️⃣ Preferences

### GET /preferences/me

Get my preference.

### GET /preferences/me/matrix

Get full channel × category matrix.

### GET /preferences/defaults

Get default preferences (system-wide).

### PATCH /preferences/me

Update my preference.

### POST /preferences/bulk

Bulk-update preferences (admin).

### POST /preferences/unsubscribe

Unsubscribe from a channel/category.

## 1️⃣3️⃣ Devices

### POST /devices

Register a device.

**Body:**
```json
{
  "userId": "uuid",
  "type": "android",
  "token": "fcm-token",
  "platform": "android",
  "deviceName": "Pixel 7"
}
```

### PATCH /devices/{id}/token

Update token.

### DELETE /devices/{id}

Unregister device.

### GET /devices

List my devices.

### GET /devices/{id}

Get device.

## 1️⃣4️⃣ Webhooks

### POST /webhooks

Register outgoing webhook (admin).

**Body:**
```json
{
  "name": "Order webhook",
  "url": "https://example.com/webhook",
  "events": ["order.created", "order.updated"],
  "secret": "super-secret-key-12345678"
}
```

### PUT /webhooks/{id}

Update webhook.

### POST /webhooks/{id}/test

Test-fire.

### GET /webhooks

List webhooks.

### GET /webhooks/{id}

Get webhook.

## 1️⃣5️⃣ Analytics

### GET /analytics/delivery-rate

```json
{
  "totalAttempts": 1000,
  "delivered": 950,
  "failed": 50,
  "deliveryRate": 0.95
}
```

### GET /analytics/channels

Per-channel stats.

### GET /analytics/engagement

Open rate, click rate.

### GET /analytics/template-performance

Per-template stats.

## 1️⃣6️⃣ Provider Webhooks (Inbound)

Inbound callbacks from external providers — signature verified.

### POST /webhooks/providers/sendgrid

SendGrid delivery events.

### POST /webhooks/providers/mailgun

Mailgun events.

### POST /webhooks/providers/ses

AWS SES via SNS.

### POST /webhooks/providers/twilio

Twilio SMS status.

### POST /webhooks/providers/vonage

Vonage SMS.

### POST /webhooks/providers/fcm

FCM delivery feedback.

### POST /webhooks/providers/apns

APNs feedback.

## 1️⃣7️⃣ Delivery Tracking

### GET /notifications/{id}/delivery

Delivery status.

### GET /notifications/{id}/attempts

All delivery attempts.

### POST /notifications/{id}/retry

Retry failed delivery.

## 1️⃣8️⃣ Broadcast Results

### GET /broadcasts/{id}/result

Detailed broadcast result.

### GET /broadcasts/results

List recent broadcast results.

## 📋 Error Responses

All errors follow this format:

```json
{
  "statusCode": 400,
  "code": "VAL-001",
  "message": "Validation failed",
  "field": "userId",
  "details": [{ "field": "userId", "message": "userId must be a UUID" }],
  "timestamp": "2026-10-26T10:00:00.000Z",
  "path": "/notifications"
}
```

### Common Error Codes

| Code | HTTP | Meaning |
|------|------|---------|
| `VAL-001` | 422 | Validation failed |
| `AUTH-001` | 401 | Unauthorized |
| `AUTH-002` | 403 | Forbidden |
| `NOTIF-001` | 404 | Notification not found |
| `TMPL-001` | 404 | Template not found |
| `DUPE-001` | 409 | Duplicate (idempotency / slug) |
| `RATE-001` | 429 | Rate limit exceeded |
| `SRV-001` | 500 | Internal server error |
| `SRV-002` | 503 | Service unavailable |

## 🔄 HTTP Status Codes

| Status | Use |
|--------|-----|
| 200 | OK (GET, PUT, PATCH) |
| 201 | Created (POST) |
| 204 | No Content (DELETE) |
| 400 | Business rule violation |
| 401 | Unauthorized |
| 403 | Forbidden (not owner) |
| 404 | Not found |
| 409 | Conflict (duplicate) |
| 422 | Validation failed |
| 429 | Rate limited |
| 500 | Internal error |
| 503 | Degraded (DB down) |

## 📚 Related

- [README.md](./README.md) — overview
- [Postman Guide](../postman/README.md) — collection reference
- Swagger: http://localhost:3003/api/docs
