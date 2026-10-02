<!-- AUTO-GENERATED from docs/api.doc.ts. Do not edit directly. -->

CART SERVICE — API DOCUMENTATION
@module cart-service/docs

══════════════════════════════════════════════════════════════════
 🌐 REST API — Base URL
══════════════════════════════════════════════════════════════════

 Development:   http://localhost:4003/api/v1
 Production:    https://cart.vubon.com.bd/api/v1
 Swagger UI:    /api/v1/docs
 OpenAPI JSON:  /api/v1/docs-json

 Auth:         Bearer JWT in Authorization header
 Content-Type: application/json

---

══════════════════════════════════════════════════════════════════
 🛒 CART ENDPOINTS
══════════════════════════════════════════════════════════════════

 POST   /cart                    — Create a new cart
 GET    /cart/me                 — Get current user's active cart
 GET    /cart/:cartId            — Get cart by ID
 GET    /cart/:cartId/summary    — Get lightweight cart summary
 PATCH  /cart/:cartId            — Update cart (notes/currency/expiry)
 POST   /cart/:cartId/clear      — Clear all items
 POST   /cart/:cartId/recover    — Recover abandoned cart
 DELETE /cart/:cartId            — Soft-delete cart (admin only)

 Create cart body:
   {
     "type": "user" | "guest" | "wishlist" | "saved" | "subscription",
     "currency": "BDT",
     "notes": "optional",
     "expiresAt": "optional ISO datetime"
   }

 Response (201):
   {
     "id": "uuid",
     "type": "user",
     "status": "active",
     "currency": "BDT",
     "items": [],
     "itemCount": 0,
     "uniqueItemCount": 0,
     "selectedItemCount": 0,
     "totals": { "subtotal": 0, "grandTotal": 0, ... },
     "expiresAt": "...",
     "lastActivityAt": "...",
     "createdAt": "...",
     "updatedAt": "..."
   }

---

══════════════════════════════════════════════════════════════════
 📦 CART ITEM ENDPOINTS
══════════════════════════════════════════════════════════════════

 POST   /cart/:cartId/items                    — Add item to cart
 GET    /cart/:cartId/items                    — List all items
 GET    /cart/:cartId/items/:itemId            — Get single item
 PATCH  /cart/:cartId/items/:itemId            — Update item (qty/price/discount)
 PATCH  /cart/:cartId/items/:itemId/quantity   — Update quantity only
 PATCH  /cart/:cartId/items/:itemId/select     — Select / deselect for checkout
 DELETE /cart/:cartId/items/:itemId            — Remove item

 Add item body:
   {
     "productId": "uuid",
     "variantId": "uuid (optional)",
     "vendorId": "uuid (optional)",
     "sku": "WBH-00001",
     "name": "Wireless Bluetooth Headphones",
     "imageUrl": "https://... (optional)",
     "unitPrice": 199.99,
     "compareAtPrice": 249.99 (optional),
     "quantity": 2,
     "currency": "BDT",
     "attributes": { "color": "black", "size": "M" } (optional)
   }

 Duplicate handling:
   If same (productId, variantId) exists → quantities merge.
   Response returns full cart with merged item.

---

══════════════════════════════════════════════════════════════════
 🎟️ COUPON ENDPOINTS
══════════════════════════════════════════════════════════════════

 POST   /cart/:cartId/coupon           — Apply coupon to cart
 POST   /cart/:cartId/coupon/validate  — Validate coupon (no state change)
 DELETE /cart/:cartId/coupon           — Remove coupon

 Apply/Validate body:
   { "code": "SAVE10" }

 Validation response:
   {
     "valid": true,
     "code": "SAVE10",
     "discountAmount": 100,
     "reason": "optional",
     "errorCode": "optional"
   }

---

══════════════════════════════════════════════════════════════════
 🎁 VOUCHER ENDPOINTS
══════════════════════════════════════════════════════════════════

 POST   /cart/:cartId/voucher          — Apply voucher (gift card / store credit)
 DELETE /cart/:cartId/voucher          — Remove voucher

 Apply body:
   { "code": "GC-ABCD1234" }

---

══════════════════════════════════════════════════════════════════
 🚚 SHIPPING ENDPOINTS
══════════════════════════════════════════════════════════════════

 POST   /cart/:cartId/shipping            — Set shipping method
 POST   /cart/:cartId/shipping/calculate  — Calculate shipping totals

 Set method body:
   {
     "method": "standard" | "express" | "same_day" | "next_day" |
               "overnight" | "economy" | "international" | "freight" |
               "pickup" | "local_delivery",
     "cost": 100,
     "currency": "BDT",
     "freeShippingThreshold": 1000 (optional),
     "addressId": "uuid (optional — required unless pickup)"
   }

---

══════════════════════════════════════════════════════════════════
 💰 CART TOTALS ENDPOINTS
══════════════════════════════════════════════════════════════════

 GET    /cart/:cartId/totals   — Get cart totals (subtotal, discount,
                                  tax, shipping, grand total)

 Response:
   {
     "currency": "BDT",
     "itemCount": 3,
     "subtotal": 500,
     "itemDiscounts": 20,
     "couponDiscount": 50,
     "voucherDiscount": 30,
     "totalDiscounts": 100,
     "taxAmount": 60,
     "shippingAmount": 100,
     "grandTotal": 560,
     "discountPercent": 20,
     "hasDiscount": true,
     "hasFreeShipping": false
   }

---

══════════════════════════════════════════════════════════════════
 💾 SAVED-FOR-LATER ENDPOINTS
══════════════════════════════════════════════════════════════════

 POST   /saved/cart/:cartId/items/:itemId   — Save cart item for later
 POST   /saved/:savedItemId/move-to-cart    — Move saved back to cart
 DELETE /saved/:savedItemId                 — Remove saved item
 GET    /saved                              — List saved items (paginated)

 List query params:
   • page  (default: 1)
   • limit (default: 20, max: 100)

---

══════════════════════════════════════════════════════════════════
 🕳️ ABANDONED CART ENDPOINTS (ADMIN)
══════════════════════════════════════════════════════════════════

 GET    /admin/abandoned-carts            — List abandoned carts
 GET    /admin/abandoned-carts/stats      — Abandonment statistics

 List query params:
   • page (default: 1)
   • limit (default: 20)

 Stats response:
   {
     "total": 100,
     "pending": 40,
     "reminded": 20,
     "recovered": 30,
     "lost": 10,
     "recoveryRate": 0.3,
     "averageCartValue": 750
   }

 Requires: role = admin

---

══════════════════════════════════════════════════════════════════
 👤 GUEST CART ENDPOINTS
══════════════════════════════════════════════════════════════════

 POST   /guest-cart         — Create guest cart (public, no auth)
 POST   /guest-cart/merge   — Merge guest cart into user cart

 Create body:
   {
     "token": "base64-url-safe-32-bytes",
     "currency": "BDT",
     "expiresAt": "optional ISO datetime"
   }

 Merge body:
   {
     "guestToken": "base64-url-safe",
     "targetCartId": "uuid",
     "strategy": "sum_quantity" | "max_quantity" | "keep_latest" |
                 "keep_existing" | "replace"
   }

 Merge response:
   {
     "mergerId": "uuid",
     "sourceCartId": "uuid",
     "targetCartId": "uuid",
     "strategy": "sum_quantity",
     "itemsMerged": 5,
     "itemsDropped": 0,
     "conflicts": [],
     "mergedAt": "ISO datetime"
   }

---

══════════════════════════════════════════════════════════════════
 🏥 HEALTH ENDPOINTS
══════════════════════════════════════════════════════════════════

 GET    /health   — Service health check (public)

 Response:
   {
     "status": "ok" | "degraded",
     "service": "cart-service",
     "checks": {
       "redis": true,
       "prisma": false,
       "prismaEngineAvailable": false
     },
     "timestamp": "ISO datetime"
   }

 Note: Prisma may degrade on unsupported platforms (e.g. Termux ARM64).
 Cart continues to work via Redis.

---

══════════════════════════════════════════════════════════════════
 📋 ERROR RESPONSE FORMAT
══════════════════════════════════════════════════════════════════

 All errors follow:
   {
     "statusCode": 404,
     "code": "USR-001",
     "message": "Cart \"uuid\" not found",
     "timestamp": "ISO datetime",
     "path": "/api/v1/cart/uuid"
   }

 Status codes:
   400 — Bad Request (validation)
   401 — Unauthorized (missing/invalid token)
   403 — Forbidden (not owner / insufficient role)
   404 — Not Found
   409 — Conflict (already exists, merge conflict)
   422 — Unprocessable Entity (domain validation)
   429 — Too Many Requests (rate limit)
   500 — Internal Server Error

---

══════════════════════════════════════════════════════════════════
 🔑 SAMPLE CART LIFECYCLE (cURL)
══════════════════════════════════════════════════════════════════

 # 1. Create cart
 curl -X POST http://localhost:4003/api/v1/cart \
   -H "Authorization: Bearer $TOKEN" \
   -H "Content-Type: application/json" \
   -d '{"type":"user","currency":"BDT"}'

 # 2. Add item
 curl -X POST http://localhost:4003/api/v1/cart/$CART_ID/items \
   -H "Authorization: Bearer $TOKEN" \
   -H "Content-Type: application/json" \
   -d '{
     "productId":"11111111-1111-1111-1111-111111111111",
     "sku":"SKU-1","name":"Item","unitPrice":100,
     "quantity":2,"currency":"BDT"
   }'

 # 3. Get totals
 curl http://localhost:4003/api/v1/cart/$CART_ID/totals \
   -H "Authorization: Bearer $TOKEN"

 # 4. Apply coupon
 curl -X POST http://localhost:4003/api/v1/cart/$CART_ID/coupon \
   -H "Authorization: Bearer $TOKEN" \
   -H "Content-Type: application/json" \
   -d '{"code":"SAVE10"}'

 # 5. Clear cart
 curl -X POST http://localhost:4003/api/v1/cart/$CART_ID/clear \
   -H "Authorization: Bearer $TOKEN" \
   -H "Content-Type: application/json" \
   -d '{}'
