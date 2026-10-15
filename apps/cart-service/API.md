# API Reference — Cart Service

**Base URL:** http://localhost:3003
**Swagger UI:** http://localhost:3003/api/docs

## 🔐 Authentication

All endpoints (except public) require Bearer JWT:

```
Authorization: Bearer <accessToken>
```

**Public endpoints:**

- `GET /health`
- `POST /guest-carts`
- `POST /guest-carts/merge`

## 📊 Endpoints Summary

| Group | Count | Base Path |
|-------|-------|-----------|
| 🏥 Health | 1 | `/health` |
| 🛒 Carts | 12 | `/carts` |
| 🎨 Cart Items | 8 | `/carts/:cartId/items` |
| 🎟️ Coupons | 3 | `/carts/:cartId/coupon` |
| 🎫 Vouchers | 2 | `/carts/:cartId/voucher` |
| 🚚 Shipping | 4 | `/carts/:cartId/shipping` |
| ⭐ Saved | 4 | `/saved` |
| 📭 Abandoned | 4 | `/abandoned-carts` |
| 👤 Guest Carts | 4 | `/guest-carts` |

## 🏥 Health

### GET /health

**Response 200:**

```json
{
  "service": "cart-service",
  "healthy": true,
  "timestamp": "2026-10-16T...",
  "uptimeSeconds": 123,
  "dependencies": [
    {"name": "database", "healthy": true},
    {"name": "redis", "healthy": true}
  ]
}
```

## 🛒 Carts

### POST /carts

**Headers:** `Idempotency-Key: <key>` (optional)

**Body:**

```json
{
  "type": "user",
  "currency": "BDT"
}
```

**Response 201:**

```json
{
  "success": true,
  "cartId": "7c9e6679-...",
  "type": "user",
  "status": "active",
  "createdAt": "2026-10-16T..."
}
```

### GET /carts/me

Current user's active cart.

### GET /carts

**Query:** `page`, `limit`, `status`, `type`

### GET /carts/:id

Get cart by ID (owner or admin).

### PATCH /carts/:id

**Body:** `{"notes": "..."}`

### POST /carts/:id/clear

### DELETE /carts/:id

### POST /carts/recover

## 🎨 Cart Items

### POST /carts/:cartId/items

**Body:**

```json
{
  "productId": "...",
  "variantId": "...",
  "quantity": 2
}
```

### GET /carts/:cartId/items

### PATCH /carts/:cartId/items/:itemId/quantity

**Body:** `{"quantity": 5}`

### DELETE /carts/:cartId/items/:itemId

## 🎟️ Coupons

### POST /carts/:cartId/coupon

**Body:** `{"code": "SAVE10"}`

### POST /carts/:cartId/coupon/validate

### DELETE /carts/:cartId/coupon

## 🎫 Vouchers

### POST /carts/:cartId/voucher

**Body:** `{"code": "GIFT2026ABC"}`

### DELETE /carts/:cartId/voucher

## 🚚 Shipping

### POST /carts/:cartId/shipping

**Body:**

```json
{
  "method": "standard",
  "cost": 60
}
```

### POST /carts/:cartId/shipping/calculate

### GET /carts/:cartId/shipping/totals

### DELETE /carts/:cartId/shipping

## ⭐ Saved for Later

### POST /saved

### GET /saved

### POST /saved/:id/move-to-cart

### DELETE /saved/:id

## 📭 Abandoned Carts

### GET /abandoned-carts

### GET /abandoned-carts/stats

### GET /abandoned-carts/:id

### POST /abandoned-carts/:id/remind

## 👤 Guest Carts

### POST /guest-carts

**Body:**

```json
{
  "currency": "BDT",
  "sessionId": "sess_abc",
  "ttlHours": 168
}
```

**Response 201:**

```json
{
  "success": true,
  "guestCartId": "...",
  "token": "UOQDvI-Y0Xr4grle...",
  "expiresAt": "2026-10-22T..."
}
```

### POST /guest-carts/merge

### GET /guest-carts/:id

**Headers:** `X-Guest-Token: <token>`

### POST /guest-carts/:id/expire

## 📋 Error Format

```json
{
  "statusCode": 401,
  "code": "AUTH-004",
  "message": "Authentication required",
  "timestamp": "2026-10-16T...",
  "path": "/carts/me"
}
```

## 🔄 HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Validation Failed |
| 500 | Internal Server Error |
| 503 | Service Unavailable |
