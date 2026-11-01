# Postman Collection — Payment Service

Complete Postman collection for **Payment Service** REST API.

---

## 📁 Files

| File | Purpose |
|------|---------|
| `Payment Service.postman_collection.json` | Main collection — 13 folders · 60 requests |
| `environments/dev.postman_environment.json` | Local dev (`http://localhost:3006`) |
| `environments/staging.postman_environment.json` | Staging (`https://payments-staging.vubon.com.bd`) |
| `environments/prod.postman_environment.json` | Production (`https://payments.vubon.com.bd`) |

---

## 🚀 Quick Start

### 1. Import into Postman

```
Postman → Import → Drag & drop both files:
  1. Payment Service.postman_collection.json
  2. environments/dev.postman_environment.json
```

### 2. Select environment

Top-right dropdown → **Payment Service — Dev**

### 3. Set auth token

Open environment → set `accessToken` with a valid JWT.

```bash
# Obtain JWT from identity-service
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@vubon.com.bd","password":"Test123!"}'
```

Copy `accessToken` from response → paste into env.

### 4. Test health

Open **🏥 Health → Health Check** → Send

Expected: `200 OK`

---

## 🎯 Testing Flows

### Flow 1 — Payment Lifecycle

```
1. 💳 Payments → Initiate Payment      ← saves {{paymentId}}
2. 💳 Payments → Confirm Payment
3. 💳 Payments → Get Payment By ID
4. 💳 Payments → Verify Payment        ← optional
```

### Flow 2 — Refund Lifecycle

```
1. 💸 Refunds → Request Refund         ← saves {{refundId}}
2. 💸 Refunds → Approve Refund
3. 💸 Refunds → Get Refund By ID
```

### Flow 3 — Subscription Lifecycle

```
1. 📅 Subscriptions → Create Subscription   ← saves {{subscriptionId}}
2. 📅 Subscriptions → Upgrade Subscription
3. 📅 Subscriptions → Pause Subscription
4. 📅 Subscriptions → Cancel Subscription
```

### Flow 4 — Invoice Lifecycle

```
1. 📄 Invoices → Generate Invoice    ← saves {{invoiceId}}
2. 📄 Invoices → Send Invoice
3. 📄 Invoices → Void Invoice        ← optional
```

### Flow 5 — Webhook Testing

Each webhook endpoint (`🪝 Webhooks`) expects a specific signature header:

| Gateway | Header | Example |
|---------|--------|---------|
| bKash | `X-Bkash-Signature` | `test_sig_bkash` |
| Nagad | `X-Signature` | `test_sig_nagad` |
| Rocket | `X-Signature` | `test_sig_rocket` |
| Stripe | `Stripe-Signature` | `t=123,v1=test_sig` |
| PayPal | `PayPal-Transmission-Sig` | `test_sig_paypal` |
| SSLCommerz | (body-based) | `verify_sign` in body |
| aamarPay | (body-based) | `status_code` in body |
| Crypto | (body-based) | `status=confirmed` + 6 confirmations |

Webhooks are `@Public()` — no auth needed. Send with signature header for full verification path.

---

## 🔐 Authentication

**Default**: Bearer JWT for all endpoints.

- Health endpoints: `@Public()` — no auth
- Webhook endpoints: `@Public()` — no auth, but signature required

Set env var: `accessToken`

---

## 🆔 Idempotency

`POST /payments` and `POST /refunds/payments/:id` require `Idempotency-Key` header.

Collection auto-generates via `{{uniqueSuffix}}`:

```
Idempotency-Key: init-payment-<uniqueSuffix>
```

---

## 📊 Folders (13)

| Folder | Requests |
|--------|----------|
| 🏥 Health | 2 |
| 💳 Payments | 9 |
| 🔖 Payment Methods | 6 |
| 🔌 Payment Gateways | 2 |
| 💰 Transactions | 4 |
| 💸 Refunds | 6 |
| 🔀 Split Payments | 2 |
| 🔁 Recurring Payments | 4 |
| 📅 Subscriptions | 7 |
| 📄 Invoices | 5 |
| 🔐 Verifications | 3 |
| 📊 Analytics | 2 |
| 🪝 Webhooks | 8 |

**Total: 60 requests**

---

## 🌍 Environments

| Env | baseUrl |
|-----|---------|
| Dev | `http://localhost:3006` |
| Staging | `https://payments-staging.vubon.com.bd` |
| Prod | `https://payments.vubon.com.bd` |

---

## 🔄 Auto-Saved IDs

Each flow saves IDs to collection variables:

| Flow | Variable | Set By |
|------|----------|--------|
| Payment | `{{paymentId}}` | Initiate Payment |
| Payment Method | `{{paymentMethodId}}` | Add Payment Method |
| Transaction | `{{transactionId}}` | Create Transaction |
| Refund | `{{refundId}}` | Request Refund |
| Recurring | `{{recurringId}}` | Create Recurring Payment |
| Subscription | `{{subscriptionId}}` | Create Subscription |
| Invoice | `{{invoiceId}}` | Generate Invoice |
| Verification | `{{verificationId}}` | Initiate Verification |

Chain flows without copy-pasting IDs.

---

## 🧪 Running with Newman (CLI)

```bash
# Install newman globally
npm install -g newman

# Run collection against dev
newman run "postman/Payment Service.postman_collection.json" \
  -e "postman/environments/dev.postman_environment.json" \
  --bail \
  --reporters cli,json \
  --reporter-json-export newman-report.json
```

---

## 🔁 Regenerate Collection

If endpoints change, regenerate:

```bash
cd apps/payment-service
node scripts/generate-postman-collection.mjs
```

Or via npm:

```bash
pnpm generate:postman
```

---

## 📝 Notes

- Test assertions use multi-status acceptance (`[200, 201, 400, 401, 404, 409, 422, 500, 503]`) — resilient in degraded mode (no Prisma engine on Termux)
- `DISABLE_AUTH=true` env + `NODE_ENV!=production` bypasses JWT guard for local dev
- All timestamps use ISO 8601
- All amounts: max 2 decimals, currency: 3-letter ISO code
