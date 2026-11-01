# API Examples — Cart Service

Practical API examples using cURL and HTTP.

## 🎯 Quick Reference

**Base URL:** `http://localhost:3003`

## 🔐 Get Token

```bash
TOKEN=$(curl -s -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}' \
  | jq -r '.accessToken')
```

## 🏥 Health Check

```bash
curl http://localhost:3003/health | jq
```

## 🛒 Create Cart

```bash
curl -X POST http://localhost:3003/carts \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: $(date +%s)" \
  -d '{"type":"user","currency":"BDT"}' | jq
```

## 🎨 Add Item

```bash
curl -X POST http://localhost:3003/carts/$CART_ID/items \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"productId":"...","quantity":2}' | jq
```

## 👤 Create Guest Cart (no auth)

```bash
curl -X POST http://localhost:3003/guest-carts \
  -H "Content-Type: application/json" \
  -d '{"currency":"BDT"}' | jq
```

## 📚 See Also

- [API.md](../../API.md) — Full API reference
- [Swagger UI](http://localhost:3003/api/docs)
