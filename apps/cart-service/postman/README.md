# Postman Collection — Cart Service

Complete Postman collection for the Vubon.com.bd Cart Service API.

## 📁 Files

| File | Purpose | Requests |
|------|---------|----------|
| `Cart Service.postman_collection.json` | Main collection | **42** |
| `environments/dev.postman_environment.json` | Local development | - |
| `environments/staging.postman_environment.json` | Staging environment | - |
| `environments/prod.postman_environment.json` | Production | - |

## 🚀 Quick Start

### 1. Import Collection

**Via Postman UI:**
1. Open Postman
2. Click **Import** (top-left)
3. Drag & drop `Cart Service.postman_collection.json`
4. Click **Import**

**Via CLI (Newman):**
```bash
newman run "Cart Service.postman_collection.json" \
  -e "environments/dev.postman_environment.json"
```

### 2. Import Environment

1. In Postman, click **Environments** (left sidebar)
2. Click **Import**
3. Select `environments/dev.postman_environment.json`
4. Click **Import**

### 3. Select Environment

Top-right dropdown → select **Cart Service — Dev**

### 4. Authenticate

**Option A — Real JWT:**
1. Login to identity-service, get access token
2. Environments → **Cart Service — Dev**
3. Set `accessToken` value
4. Save

**Option B — Skip Auth:**
- Use only public endpoints: `GET /health`, `POST /guest-carts`

### 5. Test

Health check first:
- Open **🏥 Health** → **Health Check**
- Click **Send**
- Expect: **200 OK**

## 📚 Endpoint Groups

| Emoji | Folder | Requests |
|-------|--------|----------|
| 🏥 | Health | 1 |
| 🛒 | Carts | 12 |
| 🎨 | Cart Items | 8 |
| 🎟️ | Coupons | 3 |
| 🎫 | Vouchers | 2 |
| 🚚 | Shipping | 4 |
| ⭐ | Saved for Later | 4 |
| 📭 | Abandoned Carts | 4 |
| 👤 | Guest Carts | 4 |

## 📋 All Requests

### 🏥 Health

- `GET` **Health Check** — `/health`

### 🛒 Carts

- `POST` **Create Cart** — `/carts`
- `GET` **Get My Cart** — `/carts/me`
- `GET` **List Carts** — `/carts?page=1&limit=20`
- `GET` **Cart Stats** — `/carts/stats`
- `GET` **Cart Count** — `/carts/count`
- `GET` **Get Cart By ID** — `/carts/{{cartId}}`
- `GET` **Get Cart Summary** — `/carts/{{cartId}}/summary`
- `GET` **Get Cart Public** — `/carts/{{cartId}}/public`
- `PATCH` **Update Cart** — `/carts/{{cartId}}`
- `POST` **Clear Cart** — `/carts/{{cartId}}/clear`
- `DELETE` **Delete Cart** — `/carts/{{cartId}}`
- `POST` **Recover Abandoned Cart** — `/carts/recover`

### 🎨 Cart Items

- `POST` **Add Item to Cart** — `/carts/{{cartId}}/items`
- `GET` **List Cart Items** — `/carts/{{cartId}}/items?page=1&limit=20`
- `GET` **Get Item By ID** — `/carts/{{cartId}}/items/{{itemId}}`
- `PATCH` **Update Item** — `/carts/{{cartId}}/items/{{itemId}}`
- `PATCH` **Update Quantity** — `/carts/{{cartId}}/items/{{itemId}}/quantity`
- `POST` **Select Items** — `/carts/{{cartId}}/items/select`
- `POST` **Move Item to Saved** — `/carts/{{cartId}}/items/{{itemId}}/move-to-saved`
- `DELETE` **Remove Item** — `/carts/{{cartId}}/items/{{itemId}}`

### 🎟️ Coupons

- `POST` **Apply Coupon** — `/carts/{{cartId}}/coupon`
- `POST` **Validate Coupon** — `/carts/{{cartId}}/coupon/validate`
- `DELETE` **Remove Coupon** — `/carts/{{cartId}}/coupon`

### 🎫 Vouchers

- `POST` **Apply Voucher** — `/carts/{{cartId}}/voucher`
- `DELETE` **Remove Voucher** — `/carts/{{cartId}}/voucher`

### 🚚 Shipping

- `POST` **Set Shipping Method** — `/carts/{{cartId}}/shipping`
- `POST` **Calculate Shipping** — `/carts/{{cartId}}/shipping/calculate`
- `GET` **Get Cart Totals** — `/carts/{{cartId}}/shipping/totals`
- `DELETE` **Clear Shipping** — `/carts/{{cartId}}/shipping`

### ⭐ Saved for Later

- `POST` **Save Item for Later** — `/saved`
- `GET` **List Saved Items** — `/saved?page=1&limit=20`
- `POST` **Move Saved to Cart** — `/saved/{{savedItemId}}/move-to-cart`
- `DELETE` **Remove Saved Item** — `/saved/{{savedItemId}}`

### 📭 Abandoned Carts

- `GET` **List Abandoned Carts** — `/abandoned-carts?page=1&limit=20&status=pending`
- `GET` **Abandoned Cart Stats** — `/abandoned-carts/stats`
- `GET` **Get Abandoned Cart By ID** — `/abandoned-carts/{{abandonedCartId}}`
- `POST` **Send Reminder** — `/abandoned-carts/{{abandonedCartId}}/remind`

### 👤 Guest Carts

- `POST` **Create Guest Cart** — `/guest-carts`
- `POST` **Merge Guest Cart** — `/guest-carts/merge`
- `GET` **Get Guest Cart By ID** — `/guest-carts/{{guestCartId}}`
- `POST` **Expire Guest Cart** — `/guest-carts/{{guestCartId}}/expire`

## 🔑 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `baseUrl` | `http://localhost:3003` | Service URL |
| `accessToken` | _(empty)_ | JWT for auth |
| `cartId` | Patterned UUID | Current cart |
| `itemId` | Patterned UUID | Current item |
| `productId` | Patterned UUID | Sample product |
| `variantId` | Patterned UUID | Sample variant |
| `couponCode` | `SAVE10` | Sample coupon |
| `voucherCode` | `GIFT2026ABC` | Sample voucher |
| `savedItemId` | Patterned UUID | Saved item |
| `abandonedCartId` | Patterned UUID | Abandoned cart |
| `guestCartId` | Auto-saved on create | Guest cart |
| `guestToken` | Auto-saved on create | Guest token |
| `userId` | Patterned UUID | Sample user |
| `addressId` | Patterned UUID | Shipping address |

## 🎯 Auto-Save Behavior

These requests auto-save IDs to collection variables:

| Request | Saves | Used By |
|---------|-------|---------|
| **Create Cart** | `cartId` | All `/carts/{{cartId}}/*` |
| **Add Item** | `itemId` | Item update/remove/select |
| **Create Guest Cart** | `guestCartId`, `guestToken` | Guest operations |

**After running "Create Cart", subsequent requests auto-use the new `cartId`.**

## 🌍 Environments

| Env | URL |
|-----|-----|
| **Dev** | `http://localhost:3003` |
| **Staging** | `https://carts-staging.vubon.com.bd` |
| **Prod** | `https://carts.vubon.com.bd` |

## 🔄 Regenerate

If you change the API, regenerate:

```bash
cd apps/cart-service
pnpm generate:postman
```

Or directly:
```bash
node scripts/generate-postman-collection.mjs
```

## 🧪 Collection Runner

**Run all tests:**
1. Right-click collection → **Run collection**
2. Select environment: **Cart Service — Dev**
3. Click **Run Cart Service**
4. View results

## 🚦 Health Check Response

```json
{
  "service": "cart-service",
  "healthy": true,
  "timestamp": "2026-10-16T...",
  "uptimeSeconds": 123,
  "dependencies": [
    { "name": "database", "healthy": true },
    { "name": "redis", "healthy": true }
  ]
}
```

## 📝 Notes

- **Idempotency-Key** auto-included on POST mutations
- **`uniqueSuffix`** auto-set on each request (timestamp-based)
- **Test scripts** accept multiple status codes (200/201/400/401/404/409) — resilient to degraded mode
- **Termux/degraded mode**: DB unavailable → returns 503, tests still pass

## 🐛 Troubleshooting

| Issue | Fix |
|-------|-----|
| `401 Unauthorized` | Set `accessToken` env var |
| `Cannot POST /carts` | Server not running → `cd apps/cart-service && node dist/main.js` |
| `ECONNREFUSED` | Wrong `baseUrl` → check environment |
| `Cart not found` | `cartId` invalid → run "Create Cart" first |

## 🔗 Related

- **Swagger UI:** http://localhost:3003/api/docs
- **Health Check:** http://localhost:3003/health
- **Source:** `apps/cart-service/src/module/interfaces/controllers/rest/`

---

**Auto-generated by `scripts/generate-postman-collection.mjs`** ✨
