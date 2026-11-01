# API Reference — Payment Service

**Base URL:** `http://localhost:3006`
**Swagger UI:** `http://localhost:3006/api/docs`
**OpenAPI JSON:** `http://localhost:3006/api/docs-json`

---

## Authentication

All endpoints require **JWT Bearer token** except:
- `GET /api/health`
- `GET /api/health/ready`
- `POST /api/webhooks/*` (signature-verified instead)

```
Authorization: Bearer <token>
```

**Idempotency:** All mutation endpoints (`POST`, `PATCH`, `PUT`, `DELETE`) require `Idempotency-Key` header:

```
Idempotency-Key: <unique-uuid-or-random-string-8-128-chars>
```

---

## Endpoints Summary

| Group | Count | Base Path |
|-------|-------|-----------|
| Health | 2 | `/api/health` |
| Payments | 9 | `/api/payments` |
| Payment Methods | 6 | `/api/payment-methods` |
| Payment Gateways | 2 | `/api/payment-gateways` |
| Transactions | 4 | `/api/transactions` |
| Refunds | 6 | `/api/refunds` |
| Split Payments | 2 | `/api/split-payments` |
| Recurring Payments | 4 | `/api/recurring-payments` |
| Subscriptions | 7 | `/api/subscriptions` |
| Invoices | 5 | `/api/invoices` |
| Verifications | 3 | `/api/verifications` |
| Analytics | 2 | `/api/analytics` |
| Webhooks | 8 | `/api/webhooks/:provider` |

**Total: 60 endpoints**

---

## 🏥 Health

### GET /api/health
Public. Returns service health + dependencies.

**Response 200:**
```json
{
  "service": "payment-service",
  "healthy": true,
  "timestamp": "2026-10-22T00:00:00.000Z",
  "uptimeSeconds": 3600,
  "dependencies": [
    { "name": "database", "healthy": true },
    { "name": "redis", "healthy": true }
  ]
}
```

### GET /api/health/ready
Public. Readiness probe (Kubernetes).

**Response 200:** `{ "ready": true }`

---

## 💳 Payments

### POST /api/payments
Initiate a new payment.

**Headers:** `Idempotency-Key` required

**Body:**
```json
{
  "orderId": "00000000-0000-4000-8000-000000000006",
  "method": "card",
  "gateway": "stripe",
  "amount": 1500.00,
  "currency": "BDT",
  "returnUrl": "https://app.vubon.com.bd/payments/callback",
  "metadata": { "source": "web" }
}
```

**Response 201:**
```json
{
  "success": true,
  "paymentId": "uuid-v4",
  "status": "pending",
  "redirectUrl": "https://gateway.checkout.url"
}
```

**Errors:** 400 (validation), 409 (idempotency conflict), 422 (business rule)

---

### GET /api/payments
List payments (paginated, filtered).

**Query params:**
- `page` (default 1)
- `limit` (default 20, max 100)
- `orderId`, `userId`, `status`, `method`, `gateway`
- `fromDate`, `toDate`

**Response 200:**
```json
{
  "items": [{ "id", "orderId", "status", "amount", "currency", "createdAt" }],
  "total": 1,
  "page": 1,
  "limit": 20,
  "totalPages": 1
}
```

### GET /api/payments/stats
Payment statistics (aggregated).

**Response 200:**
```json
{
  "total": 1,
  "totalAmount": 1500,
  "averageAmount": 1500,
  "currency": "BDT",
  "byStatus": { "pending": 1 },
  "byMethod": { "card": 1 }
}
```

### GET /api/payments/order/:orderId
All payments for a specific order.

### GET /api/payments/:id
Get payment by ID (full detail).

### POST /api/payments/:id/confirm
Confirm a payment (gateway callback / manual).

**Body:**
```json
{
  "gatewayReference": "pi_test_123",
  "gatewaySignature": "sig_abc",
  "confirmedAmount": 1500.00
}
```

### POST /api/payments/:id/verify
Verify payment with gateway.

**Body:** `{ "gatewaySignature": "...", "gatewayData": {...} }`

### POST /api/payments/:id/cancel
Cancel a pending/authorized payment.

**Body:** `{ "reason": "Customer requested cancellation" }`

### POST /api/payments/:id/retry
Retry a failed/declined payment.

**Body:** `{ "gateway": "stripe", "reason": "..." }`

---

## 🔖 Payment Methods

### POST /api/payment-methods
Add a saved payment method (card token / wallet).

**Body:**
```json
{
  "method": "card",
  "type": "online",
  "gateway": "stripe",
  "cardToken": "tok_visa_4242",
  "last4": "4242",
  "brand": "visa",
  "expiryMonth": 12,
  "expiryYear": 2030,
  "holderName": "Test User",
  "isDefault": true
}
```

**Response 201:** `{ "id", "method", "type", "label", "isActive", "isDefault", ... }`

### GET /api/payment-methods
List my payment methods (paginated).

### GET /api/payment-methods/:id
Get specific payment method.

### PATCH /api/payment-methods/:id
Update label, holder name, expiry.

### DELETE /api/payment-methods/:id
Soft-delete payment method. **Response 204.**

### POST /api/payment-methods/:id/default
Set as default payment method.

---

## 🔌 Payment Gateways

### GET /api/payment-gateways
List all configured gateways.

**Response 200:**
```json
{
  "items": [
    { "provider": "stripe", "displayName": "Stripe", "isActive": true, ... }
  ],
  "total": 8,
  "page": 1,
  "limit": 20
}
```

### GET /api/payment-gateways/health
Health status of all gateway adapters.

**Response 200:**
```json
[
  { "gateway": "bkash", "status": "healthy", "lastChecked": "..." }
]
```

---

## 💰 Transactions

### POST /api/transactions
Create a transaction (usually internal).

**Body:**
```json
{
  "paymentId": "uuid",
  "type": "payment",
  "amount": 1500.00,
  "currency": "BDT",
  "gatewayReference": "pi_test_123"
}
```

### GET /api/transactions
List transactions (paginated, filter by paymentId).

### GET /api/transactions/:id
Get transaction by ID.

### POST /api/transactions/:id/reverse
Reverse a transaction.

**Body:** `{ "reason": "Duplicate charge" }`

---

## 💸 Refunds

### POST /api/refunds/payments/:paymentId
Request refund for a payment.

**Headers:** `Idempotency-Key` required

**Body:**
```json
{
  "amount": 500.00,
  "reason": "customer_request",
  "note": "Partial refund"
}
```

**Response 201:**
```json
{ "success": true, "refundId": "uuid", "status": "requested" }
```

### GET /api/refunds
List refunds (paginated, filter by paymentId).

### GET /api/refunds/:id
Get refund by ID.

### POST /api/refunds/:id/approve
Approve refund.

**Body:** `{ "approvedAmount": 500, "note": "Approved" }`

### POST /api/refunds/:id/reject
Reject refund.

**Body:** `{ "reason": "Outside window" }`

### POST /api/refunds/partial
Direct partial refund.

**Body:** `{ "paymentId", "amount", "currency", "reason" }`

---

## 🔀 Split Payments

### POST /api/split-payments
Create split payment.

**Body:**
```json
{
  "paymentId": "uuid",
  "type": "percentage",
  "totalAmount": 1500.00,
  "currency": "BDT",
  "receivers": [
    { "receiverId": "vendor-1", "percentage": 60 },
    { "receiverId": "vendor-2", "percentage": 40 }
  ]
}
```

### GET /api/split-payments/payment/:paymentId
List splits for a payment.

---

## 🔁 Recurring Payments

### POST /api/recurring-payments
Create recurring payment schedule.

**Body:**
```json
{
  "paymentId": "uuid",
  "amount": 999.00,
  "currency": "BDT",
  "interval": "monthly",
  "intervalCount": 1,
  "startAt": "2026-11-01T00:00:00.000Z"
}
```

### GET /api/recurring-payments/:id
Get recurring payment.

### POST /api/recurring-payments/:id/pause
Pause recurring payment.

### POST /api/recurring-payments/:id/cancel
Cancel recurring payment.

---

## 📅 Subscriptions

### POST /api/subscriptions
Create subscription.

**Body:**
```json
{
  "plan": "premium",
  "interval": "monthly",
  "intervalCount": 1,
  "price": 999.00,
  "currency": "BDT",
  "method": "card",
  "gateway": "stripe",
  "trialDays": 7
}
```

### GET /api/subscriptions
List subscriptions (paginated).

### GET /api/subscriptions/:id
Get subscription.

### POST /api/subscriptions/:id/upgrade
Upgrade plan.

**Body:** `{ "newPlan", "newPrice", "currency", "prorate" }`

### POST /api/subscriptions/:id/downgrade
Downgrade plan.

**Body:** `{ "newPlan", "newPrice", "currency", "effectiveAt" }`

### POST /api/subscriptions/:id/pause
Pause subscription.

### POST /api/subscriptions/:id/cancel
Cancel subscription.

**Body:** `{ "reason", "cancelAtPeriodEnd": true }`

---

## 📄 Invoices

### POST /api/invoices
Generate invoice.

**Body:**
```json
{
  "userId": "uuid",
  "subtotal": 1000.00,
  "taxAmount": 150.00,
  "currency": "BDT",
  "notes": "Auto-generated"
}
```

**Response 201:**
```json
{
  "id": "uuid",
  "invoiceNumber": "INV-2026-301435",
  "status": "issued",
  "subtotal": 1000,
  "taxAmount": 150,
  "total": 1150,
  "currency": "BDT"
}
```

### GET /api/invoices
List invoices (paginated).

### GET /api/invoices/:id
Get invoice by ID.

### POST /api/invoices/:id/send
Send invoice (email/SMS/link).

**Body:** `{ "channel": "email", "recipientEmail": "..." }`

### POST /api/invoices/:id/void
Void invoice.

**Body:** `{ "reason": "Duplicate" }`

---

## 🔐 Verifications

### POST /api/verifications/payments/:paymentId
Initiate verification (OTP/CVV/3DS).

**Body:** `{ "method": "otp_sms", "ttlSeconds": 600 }`

### GET /api/verifications/:id
Get verification status.

### POST /api/verifications/:id/verify
Verify code.

**Body:** `{ "code": "123456" }`

---

## 📊 Analytics

### GET /api/analytics/revenue
Revenue analytics (aggregated).

**Query:** `userId`, `fromDate`, `toDate`

**Response 200:**
```json
{
  "total": 1,
  "totalAmount": 2500,
  "averageAmount": 2500,
  "currency": "BDT",
  "byStatus": { "pending": 1 },
  "byMethod": { "card": 1 }
}
```

### GET /api/analytics/payment-methods
Payment methods distribution analytics.

---

## 🪝 Webhooks (Public — Signature Verified)

All webhook endpoints accept `POST` with gateway-specific payloads.

| Provider | Endpoint | Signature Header |
|----------|----------|------------------|
| **bKash** | `POST /api/webhooks/bkash` | `X-Bkash-Signature` |
| **Nagad** | `POST /api/webhooks/nagad` | `X-Signature` |
| **Rocket** | `POST /api/webhooks/rocket` | `X-Signature` |
| **Stripe** | `POST /api/webhooks/stripe` | `Stripe-Signature` |
| **PayPal** | `POST /api/webhooks/paypal` | `PayPal-Transmission-Sig` |
| **SSLCommerz** | `POST /api/webhooks/sslcommerz` | Body `verify_sign` |
| **aamarPay** | `POST /api/webhooks/aamarpay` | Body `status_code` |
| **Crypto** | `POST /api/webhooks/crypto` | Body `status=confirmed` |

Each webhook expects a **gateway-specific payload** and returns `{ "acknowledged": true }` or `{ "received": true }`.

---

## Error Responses

All errors follow unified shape:

```json
{
  "statusCode": 400,
  "code": "VAL-001",
  "message": "Error message",
  "field": "amount",
  "details": [
    { "field": "amount", "message": "must be positive" }
  ],
  "timestamp": "2026-10-21T19:00:00.000Z",
  "path": "/api/payments"
}
```

### Error Codes

| Code | Meaning |
|------|---------|
| `PAY-001` | Payment failed |
| `PAY-002` | Payment declined |
| `PAY-003` | Payment not found |
| `PAY-004` | Payment already completed |
| `PAY-009` | Gateway timeout |
| `TXN-001` | Transaction not found |
| `TXN-002` | Transaction conflict |
| `RFD-001` | Refund not found |
| `RFD-002` | Refund window expired |
| `SUB-001` | Subscription not found |
| `SUB-002` | Subscription expired |
| `INV-001` | Invoice not found |
| `INV-002` | Invoice overdue |
| `VAL-001` | Validation failed |
| `AUTH-016` | Verification expired |
| `AUTH-040` | Verification not found |
| `SRV-001` | Internal server error |
| `PRISMA_ENGINE_UNAVAILABLE` | DB engine unavailable |

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| `200` | OK |
| `201` | Created |
| `204` | No Content |
| `400` | Bad Request |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Not Found |
| `409` | Conflict |
| `422` | Unprocessable Entity |
| `500` | Internal Server Error |
| `503` | Service Unavailable |

---

## Quick Start — curl Examples

### Initiate Payment

```bash
curl -X POST http://localhost:3006/api/payments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Idempotency-Key: $(date +%s)" \
  -d '{
    "orderId": "00000000-0000-4000-8000-000000000006",
    "method": "card",
    "gateway": "stripe",
    "amount": 1500,
    "currency": "BDT"
  }'
```

### List Payments

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:3006/api/payments?page=1&limit=20"
```

### Health Check

```bash
curl http://localhost:3006/api/health
```

---

**See also:** [ARCHITECTURE.md](./ARCHITECTURE.md) · [README.md](./README.md) · [postman/README.md](./postman/README.md)
