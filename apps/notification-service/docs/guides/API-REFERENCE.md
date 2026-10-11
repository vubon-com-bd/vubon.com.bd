# API Reference

Base URL: `http://localhost:4007/api/v1`

All endpoints require `Authorization: Bearer <JWT>` except those marked @Public.

## Health

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /health | Public | Full health check |
| GET | /health/live | Public | Liveness |
| GET | /health/ready | Public | Readiness |

## Notifications

| Method | Path | Description |
|--------|------|-------------|
| POST | /notifications | Send (fan-out) |
| POST | /notifications/bulk | Send to many users |
| POST | /notifications/schedule | Schedule for future |
| GET | /notifications | List (paginated) |
| GET | /notifications/stats | Stats |
| GET | /notifications/unread-count | Unread count |
| GET | /notifications/:id | Detail |
| GET | /notifications/:id/public | Public view |
| GET | /notifications/:id/detail | Detail + attempts |
| PATCH | /notifications/:id | Update pending |
| POST | /notifications/:id/cancel | Cancel |
| POST | /notifications/:id/retry | Retry |
| DELETE | /notifications/:id | Soft delete |
| POST | /notifications/:id/mark-read | Mark read |
| POST | /notifications/mark-many-read | Bulk mark read |
| POST | /notifications/mark-all-read | Mark all read |
| POST | /notifications/:id/archive | Archive |
| POST | /notifications/:id/snooze | Snooze |
| POST | /notifications/:id/star | Star |

### Send Example

    curl -X POST http://localhost:4007/api/v1/notifications \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $JWT" \
      -d '{
        "userId": "uuid",
        "type": "transactional",
        "category": "order",
        "channels": ["email", "push"],
        "priority": "high",
        "title": "Order confirmed",
        "body": "Your order #12345 is confirmed",
        "actions": [
          {"action":"view","type":"primary","label":"View","url":"https://..."}
        ],
        "reference": {"type":"order","id":"uuid"},
        "data": {"orderNumber":"12345"}
      }'

## Email

| Method | Path | Description |
|--------|------|-------------|
| POST | /email | Send email |
| POST | /email/with-template | Send via template |
| GET | /email | List |
| GET | /email/:id | Detail |
| POST | /email/:id/retry | Retry |
| POST | /email/:id/cancel | Cancel |

## SMS

| Method | Path | Description |
|--------|------|-------------|
| POST | /sms | Send SMS |
| POST | /sms/bulk | Send bulk |
| GET | /sms | List |
| GET | /sms/:id | Detail |
| POST | /sms/:id/retry | Retry |
| POST | /sms/:id/cancel | Cancel |

## Push

| Method | Path | Description |
|--------|------|-------------|
| POST | /push | Send push |
| POST | /push/topic | Send to topic |
| POST | /push/subscribe | Register token |
| POST | /push/unsubscribe/:token | Unregister |
| GET | /push | List |
| GET | /push/:id | Detail |
| POST | /push/:id/retry | Retry |

## In-App

| Method | Path | Description |
|--------|------|-------------|
| POST | /in-app | Send |
| GET | /in-app/inbox | Current user inbox |
| GET | /in-app/:id | Detail |
| POST | /in-app/:id/read | Mark read |
| POST | /in-app/:id/dismiss | Dismiss |
| POST | /in-app/:id/click | Record click |

## Templates

| Method | Path | Description |
|--------|------|-------------|
| POST | /templates | Create |
| GET | /templates | List |
| GET | /templates/by-slug/:slug | By slug |
| GET | /templates/:id | Detail |
| GET | /templates/:id/public | Public view |
| PATCH | /templates/:id | Update |
| POST | /templates/:id/activate | Activate |
| POST | /templates/:id/deactivate | Deactivate |
| POST | /templates/:id/deprecate | Deprecate |
| POST | /templates/:id/archive | Archive |
| POST | /templates/:id/versions | Create version |
| POST | /templates/:id/render | Render with data |
| GET | /templates/:id/preview | Preview |

## Schedules

| Method | Path | Description |
|--------|------|-------------|
| POST | /schedules | Create |
| GET | /schedules | List |
| GET | /schedules/due | Due schedules |
| GET | /schedules/:id | Detail |
| PATCH | /schedules/:id | Update |
| POST | /schedules/:id/activate | Activate |
| POST | /schedules/:id/pause | Pause |
| POST | /schedules/:id/resume | Resume |
| POST | /schedules/:id/cancel | Cancel |
| POST | /schedules/:id/trigger | Trigger now |

## Broadcasts

| Method | Path | Description |
|--------|------|-------------|
| POST | /broadcasts | Create |
| GET | /broadcasts | List |
| GET | /broadcasts/:id | Detail |
| GET | /broadcasts/:id/stats | Stats |
| GET | /broadcasts/:id/progress | Progress |
| PATCH | /broadcasts/:id | Update |
| POST | /broadcasts/:id/schedule | Schedule |
| POST | /broadcasts/:id/start | Start |
| POST | /broadcasts/:id/cancel | Cancel |
| POST | /broadcasts/:id/test | Test send |

## Digests

| Method | Path | Description |
|--------|------|-------------|
| POST | /digests | Create |
| POST | /digests/generate | Generate for user |
| GET | /digests | List |
| GET | /digests/preview | Preview |
| GET | /digests/:id | Detail |
| PATCH | /digests/:id | Update |
| POST | /digests/:id/send | Send |
| POST | /digests/:id/cancel | Cancel |

## Preferences

| Method | Path | Description |
|--------|------|-------------|
| GET | /preferences | Current user prefs |
| GET | /preferences/public | Public view |
| PATCH | /preferences | Update |
| POST | /preferences/toggle-channel | Toggle channel |
| POST | /preferences/toggle-category | Toggle category |
| POST | /preferences/quiet-hours | Update quiet hours |
| POST | /preferences/opt-out | Opt out |
| POST | /preferences/opt-in | Opt in |

## Devices

| Method | Path | Description |
|--------|------|-------------|
| POST | /devices | Register |
| GET | /devices | List |
| GET | /devices/active | Active for user |
| GET | /devices/:id | Detail |
| PATCH | /devices/:id | Update |
| POST | /devices/:id/refresh-token | Refresh token |
| POST | /devices/:id/block | Block |
| DELETE | /devices/:id | Unregister |

## Webhooks (Outbound)

| Method | Path | Description |
|--------|------|-------------|
| POST | /webhooks | Create |
| GET | /webhooks | List |
| GET | /webhooks/:id | Detail |
| GET | /webhooks/:id/deliveries | Delivery log |
| PATCH | /webhooks/:id | Update |
| POST | /webhooks/:id/activate | Activate |
| POST | /webhooks/:id/deactivate | Deactivate |
| POST | /webhooks/:id/disable | Disable |
| POST | /webhooks/:id/test | Send test |
| POST | /webhooks/deliveries/:id/retry | Retry delivery |

## Provider Webhooks (Inbound, Public)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /provider-webhooks/:provider | Public | Receive webhook |

`:provider` = sendgrid | twilio | ses | mailgun | fcm | apns

Signature verified inside ProviderWebhookService.

## Analytics

| Method | Path | Description |
|--------|------|-------------|
| GET | /analytics/overview | Overview metrics |
| GET | /analytics/time-series | Time series |
| GET | /analytics/channel-performance | Channel comparison |
| POST | /analytics/reports | Generate report |

## Delivery

| Method | Path | Description |
|--------|------|-------------|
| GET | /delivery/:notificationId | Delivery status |
| GET | /delivery | List deliveries |

## Error Format

    {
      "statusCode": 422,
      "code": "VAL_REQUIRED",
      "message": "Validation failed",
      "details": [...],
      "timestamp": "2026-10-11T18:30:00.000Z",
      "path": "/api/v1/notifications"
    }

Common codes:
- `VAL_REQUIRED` — validation error (422)
- `USER_NOT_FOUND` — not found (404)
- `VAL_DUPLICATE` — conflict (409)
- `AUTH_UNAUTHORIZED` — no/invalid JWT (401)
- `AUTH_FORBIDDEN` — no permission (403)
- `SERVER_INTERNAL` — internal error (500)

## Rate Limiting

Headers returned on every response:
- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `X-RateLimit-Reset`

429 response includes `Retry-After` header.

## Pagination

Query params: `page` (default 1), `limit` (default 20, max 100).

Response shape:

    {
      "items": [...],
      "total": 123,
      "page": 1,
      "limit": 20,
      "totalPages": 7
    }

## Correlation ID

Send `X-Correlation-Id` header to trace. Echoed back in response.
