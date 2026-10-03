<!-- AUTO-GENERATED from docs/api.doc.ts. Do not edit directly. -->

ORDER SERVICE — API DOCUMENTATION
@module order-service/docs

══════════════════════════════════════════════════════════════════
 🌐 REST API — Base URL
══════════════════════════════════════════════════════════════════

 Development:   http://localhost:4004/api/v1
 Production:    https://orders.vubon.com.bd/api/v1
 Swagger UI:    /api/v1/docs
 OpenAPI JSON:  /api/v1/docs-json

 Auth:          Bearer JWT in Authorization header
 Content-Type:  application/json

---

══════════════════════════════════════════════════════════════════
 📦 ORDER ENDPOINTS
══════════════════════════════════════════════════════════════════

 POST   /orders                          — Create new order
 GET    /orders                          — List orders (paginated)
 GET    /orders/stats                    — Order statistics (admin)
 GET    /orders/customer/:customerId     — List by customer
 GET    /orders/number/:orderNumber      — Get by order number
 GET    /orders/:orderId                 — Get order by ID
 PATCH  /orders/:orderId                 — Update order
 POST   /orders/:orderId/confirm         — Confirm order
 POST   /orders/:orderId/hold            — Put on hold (admin)
 POST   /orders/:orderId/release         — Release from hold (admin)
 DELETE /orders/:orderId                 — Soft delete (admin)

 Create body:
   {
     "customerId": "uuid",
     "cartId": "uuid (optional)",
     "items": [
       {
         "productId": "uuid",
         "variantId": "uuid (optional)",
         "vendorId": "uuid (optional)",
         "quantity": 2,
         "unitPrice": 199.99,
         "discountAmount": 0,
         "notes": "optional"
       }
     ],
     "shippingAddress": {
       "fullName": "John Doe",
       "phone": "01700000000",
       "line1": "123 Main St",
       "city": "Dhaka",
       "country": "BD"
     },
     "currency": "BDT",
     "notes": "optional",
     "idempotencyKey": "optional"
   }

 Response (201):
   {
     "id": "uuid",
     "orderNumber": "ORD-2026-000001",
     "status": "pending",
     "items": [...],
     "subtotal": 199.99,
     "total": 199.99,
     "currency": "BDT",
     "createdAt": "...",
     "updatedAt": "..."
   }

---

══════════════════════════════════════════════════════════════════
 📋 ORDER ITEM ENDPOINTS
══════════════════════════════════════════════════════════════════

 POST   /orders/:orderId/items                — Add item
 GET    /orders/:orderId/items                — List items
 GET    /orders/:orderId/items/:itemId        — Get item
 PATCH  /orders/:orderId/items/:itemId        — Update item
 DELETE /orders/:orderId/items/:itemId        — Remove item

 Add item body:
   {
     "productId": "uuid",
     "variantId": "uuid (optional)",
     "vendorId": "uuid (optional)",
     "sku": "SKU-001",
     "name": "Product name",
     "quantity": 2,
     "unitPrice": 199.99,
     "discountAmount": 0,
     "attributes": { "color": "black" }
   }

---

══════════════════════════════════════════════════════════════════
 🛒 CHECKOUT ENDPOINTS
══════════════════════════════════════════════════════════════════

 POST   /checkouts                       — Start checkout
 GET    /checkouts/:checkoutId           — Get checkout
 POST   /checkouts/:checkoutId/address   — Select address
 POST   /checkouts/:checkoutId/shipping  — Select shipping
 POST   /checkouts/:checkoutId/payment   — Select payment
 POST   /checkouts/:checkoutId/confirm   — Confirm (creates order)
 POST   /checkouts/:checkoutId/abandon   — Abandon

 Start body:
   {
     "email": "c@example.com",
     "cartId": "uuid",
     "type": "registered",
     "phone": "01700000000 (optional)"
   }

 Address body:
   {
     "shippingAddress": {
       "line1": "123 Main",
       "city": "Dhaka",
       "country": "BD"
     }
   }

---

══════════════════════════════════════════════════════════════════
 🚚 DELIVERY ENDPOINTS
══════════════════════════════════════════════════════════════════

 POST   /deliveries                              — Schedule delivery
 GET    /deliveries/methods                      — List methods
 GET    /deliveries/:deliveryId                  — Get delivery
 GET    /deliveries/order/:orderId               — List by order
 POST   /deliveries/:deliveryId/reschedule       — Reschedule
 POST   /deliveries/:deliveryId/confirm          — Confirm delivery

---

══════════════════════════════════════════════════════════════════
 ❌ CANCEL ENDPOINTS
══════════════════════════════════════════════════════════════════

 POST   /order-cancels/request               — Request cancel
 GET    /order-cancels/:cancelId             — Get cancel
 GET    /order-cancels/order/:orderId        — List by order
 POST   /order-cancels/:cancelId/approve     — Approve (admin)
 POST   /order-cancels/:cancelId/reject      — Reject (admin)

 Request body:
   {
     "orderId": "uuid",
     "reason": "customer_request",
     "notes": "optional"
   }

 Cancel reasons:
   • customer_request
   • out_of_stock
   • payment_failed
   • fraud_suspected
   • address_invalid
   • delivery_unavailable
   • price_error
   • duplicate_order
   • other

---

══════════════════════════════════════════════════════════════════
 🔄 RETURN ENDPOINTS
══════════════════════════════════════════════════════════════════

 POST   /order-returns/request               — Request return
 GET    /order-returns/:returnId             — Get return
 GET    /order-returns/order/:orderId        — List by order
 POST   /order-returns/:returnId/approve     — Approve (admin)
 POST   /order-returns/:returnId/reject      — Reject (admin)
 POST   /order-returns/:returnId/complete    — Complete + refund

 Request body:
   {
     "orderId": "uuid",
     "reason": "defective",
     "itemIds": ["uuid1"],
     "images": ["url1", "url2"],
     "notes": "optional"
   }

 Return reasons:
   • defective
   • wrong_item
   • not_as_described
   • size_issue
   • changed_mind
   • damaged_in_transit
   • missing_parts
   • other

---

══════════════════════════════════════════════════════════════════
 📦 FULFILLMENT ENDPOINTS
══════════════════════════════════════════════════════════════════

 POST   /order-fulfillments/start                        — Start
 GET    /order-fulfillments/:fulfillmentId               — Get
 GET    /order-fulfillments/order/:orderId               — List
 POST   /order-fulfillments/pack                         — Pack order
 POST   /order-fulfillments/ship                         — Ship order
 POST   /order-fulfillments/:fulfillmentId/complete      — Complete

---

══════════════════════════════════════════════════════════════════
 📍 TRACKING ENDPOINTS
══════════════════════════════════════════════════════════════════

 POST   /order-tracking/add                          — Add event
 GET    /order-tracking/:trackingId                  — Get entry
 GET    /order-tracking/order/:orderId/events        — List (public)
 GET    /order-tracking/order/:orderId/summary       — Summary (public)
 POST   /order-tracking/:trackingId/update           — Update

 Add body:
   {
     "orderId": "uuid",
     "event": "in_transit",
     "message": "Package left hub",
     "location": "Dhaka (optional)",
     "latitude": 23.8103,
     "longitude": 90.4125
   }

---

══════════════════════════════════════════════════════════════════
 📊 RESPONSE SHAPES
══════════════════════════════════════════════════════════════════

 Success (200):
   {
     "id": "uuid",
     "orderNumber": "ORD-2026-000001",
     "status": "pending",
     "total": 199.99,
     "currency": "BDT",
     "createdAt": "2026-01-01T10:00:00Z"
   }

 Error:
   {
     "statusCode": 404,
     "code": "USER-404",
     "message": "Order \"uuid\" not found",
     "context": { "entityType": "Order", "entityId": "uuid" },
     "timestamp": "2026-01-01T10:00:00Z"
   }

 Status codes:
   • 200 — Success
   • 201 — Created
   • 204 — No content (delete)
   • 400 — Bad request
   • 401 — Unauthorized
   • 403 — Forbidden
   • 404 — Not found
   • 409 — Conflict
   • 410 — Gone (expired)
   • 422 — Unprocessable (validation)
   • 500 — Internal server error

---

══════════════════════════════════════════════════════════════════
 🔐 AUTHORIZATION
══════════════════════════════════════════════════════════════════

 Roles: super_admin, admin, moderator, vendor, vendor_manager,
        vendor_staff, customer, guest, support_agent,
        support_manager, logistics_manager, logistics_agent,
        delivery_driver, warehouse_manager

 Access patterns:
   • Orders create/update   → customer, admin
   • Orders delete/hold     → admin
   • Cancel approve/reject  → admin
   • Return approve/complete → admin
   • Fulfillment start/ship → vendor, admin
   • Tracking add/update    → admin, logistics_manager
   • Tracking summary       → public (no auth)
