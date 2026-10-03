# API

PRODUCT SERVICE — API DOCUMENTATION
@module product-service/docs

══════════════════════════════════════════════════════════════════
 🌐 REST API — Base URL
══════════════════════════════════════════════════════════════════

 Development:   http://localhost:4002/api/v1
 Production:    https://product.vubon.com.bd/api/v1
 Swagger UI:    /api/v1/docs
 OpenAPI JSON:  /api/v1/docs-json

 Auth:         Bearer JWT in Authorization header
 Content-Type: application/json

---

══════════════════════════════════════════════════════════════════
 📦 PRODUCT ENDPOINTS
══════════════════════════════════════════════════════════════════

 GET    /products                           — List (paginated)
 GET    /products/search                    — Full-text search
 GET    /products/:productId                — Get detail
 POST   /products                           — Create (admin/vendor)
 PATCH  /products/:productId                — Update (admin/vendor)
 DELETE /products/:productId                — Soft delete (admin)
 POST   /products/:productId/publish        — Publish
 POST   /products/:productId/unpublish      — Unpublish
 POST   /products/:productId/archive        — Archive
 POST   /products/:productId/feature        — Feature / unfeature (admin)
 POST   /products/:productId/duplicate      — Duplicate with new name

 Query params (list):
   • page        (default: 1)
   • limit       (default: 20, max: 100)
   • status      (draft | pending | approved | published | archived | ...)
   • type        (physical | digital | service | subscription | bundle | ...)
   • categoryId  (uuid)
   • brandId     (uuid)
   • isFeatured  (true | false)
   • search      (free text)

---

══════════════════════════════════════════════════════════════════
 🎨 VARIANT ENDPOINTS
══════════════════════════════════════════════════════════════════

 GET    /products/:productId/variants               — List variants
 POST   /products/:productId/variants               — Add variant
 PATCH  /products/:productId/variants/:variantId    — Update variant
 DELETE /products/:productId/variants/:variantId    — Remove variant

 Variant fields:
   • name      (required, 1-100 chars)
   • sku       (required, unique, 2-64 chars)
   • barcode   (optional, max 64)
   • type      (size | color | material | style | weight | volume | pack)
   • options   (array of { name, value }, 1-50 items)
   • price     (positive decimal)
   • cost      (optional)
   • weight    (optional, kg)
   • imageUrl  (optional)

 Business rules:
   • Max 100 variants per product
   • SKU must be unique across all variants
   • At least one option required

---

══════════════════════════════════════════════════════════════════
 🏷️  ATTRIBUTE ENDPOINTS
══════════════════════════════════════════════════════════════════

 GET    /products/:productId/attributes              — List
 POST   /products/:productId/attributes              — Add
 PATCH  /products/:productId/attributes/:attrId      — Update
 DELETE /products/:productId/attributes/:attrId      — Remove

 Attribute types:
   text | number | boolean | select | multiselect | date | color

 Business rules:
   • Max 50 attributes per product
   • Select/multiselect require options array
   • Values validated against type

---

══════════════════════════════════════════════════════════════════
 📦 INVENTORY ENDPOINTS
══════════════════════════════════════════════════════════════════

 GET    /inventory/low-stock                     — Low stock list
 GET    /inventory/product/:productId            — Inventory by product
 PATCH  /inventory/:inventoryId/adjust           — Adjust stock (+/-)
 POST   /inventory/:inventoryId/reserve          — Reserve stock
 POST   /inventory/:inventoryId/release          — Release reserved

 Business rules:
   • available = quantity - reserved
   • Cannot reserve more than available
   • LOW_STOCK when qty <= threshold
   • OUT_OF_STOCK when qty = 0

---

══════════════════════════════════════════════════════════════════
 💰 PRICING ENDPOINTS
══════════════════════════════════════════════════════════════════

 GET    /pricing/product/:productId                       — Get pricing
 GET    /pricing/product/:productId/quote                 — Quote total
 PATCH  /pricing/:pricingId                               — Update price
 POST   /pricing/product/:productId/discount              — Apply discount
 POST   /pricing/product/:productId/discount/remove       — Remove discount

 Business rules:
   • sellingPrice <= basePrice
   • Discount max 90%
   • Tax rate 0-1
   • Tax inclusive/exclusive based on flag

---

══════════════════════════════════════════════════════════════════
 📚 COLLECTION ENDPOINTS
══════════════════════════════════════════════════════════════════

 GET    /collections                                — List
 GET    /collections/featured                       — Featured
 GET    /collections/active                         — Active
 GET    /collections/:collectionId                  — Get by ID
 POST   /collections                                — Create (admin)
 PATCH  /collections/:collectionId                  — Update
 POST   /collections/:collectionId/products/:productId   — Add product
 DELETE /collections/:collectionId/products/:productId   — Remove product
 DELETE /collections/:collectionId                  — Delete

 Collection types:
   manual | automatic | seasonal | featured | trending |
   new_arrival | best_seller

 Business rules:
   • Max 500 products per collection
   • Automatic collections reject manual product add
   • startAt < endAt

---

══════════════════════════════════════════════════════════════════
 ⭐ REVIEW ENDPOINTS
══════════════════════════════════════════════════════════════════

 GET    /reviews/product/:productId                 — List reviews
 GET    /reviews/product/:productId/stats           — Rating stats
 POST   /reviews                                    — Submit review
 PATCH  /reviews/:reviewId                          — Update own review
 POST   /reviews/:reviewId/approve                  — Approve (moderator)
 POST   /reviews/:reviewId/reject                   — Reject (moderator)
 DELETE /reviews/:reviewId                          — Delete own review

 Business rules:
   • Rating 1-5
   • One review per user per product
   • Edit window: 24 hours
   • Auto-flag spam when reportCount >= 5
   • Verified purchase toggle

---

══════════════════════════════════════════════════════════════════
 🖼️  MEDIA ENDPOINTS
══════════════════════════════════════════════════════════════════

 GET    /media/product/:productId            — List media
 POST   /media                               — Add media
 DELETE /media/:mediaId                      — Remove media

 Media types: image | video | document

 Business rules:
   • Image: max 5 MB
   • Video: max 100 MB
   • Document: max 10 MB
   • Only images can be primary

---

══════════════════════════════════════════════════════════════════
 🏢 BRAND ENDPOINTS
══════════════════════════════════════════════════════════════════

 GET    /brands                             — (via query) Get
 GET    /brands/featured                    — Featured
 GET    /brands/slug/:slug                  — By slug
 GET    /brands/:brandId                    — By ID
 POST   /brands                             — Create (admin)
 PATCH  /brands/:brandId                    — Update
 POST   /brands/:brandId/activate           — Activate
 POST   /brands/:brandId/deactivate         — Deactivate
 POST   /brands/:brandId/feature            — Feature
 DELETE /brands/:brandId                    — Delete (admin)

 Business rules:
   • Slug unique
   • Cannot delete brand with products

---

══════════════════════════════════════════════════════════════════
 📂 CATEGORY ENDPOINTS
══════════════════════════════════════════════════════════════════

 GET    /categories                         — Roots
 GET    /categories/tree                    — Full tree
 GET    /categories/parent/:parentId        — Children
 GET    /categories/:categoryId             — Get by ID
 POST   /categories                         — Create (admin)
 PATCH  /categories/:categoryId             — Update
 POST   /categories/:categoryId/move        — Move to new parent
 DELETE /categories/:categoryId             — Delete (admin)

 Business rules:
   • Max depth: 5 levels
   • Cannot move into own descendant
   • Cannot delete with children

---

══════════════════════════════════════════════════════════════════
 🌐 PUBLIC ENDPOINTS (no auth)
══════════════════════════════════════════════════════════════════

 GET    /public/products                    — Published products
 GET    /public/products/search             — Search published
 GET    /public/products/:slug              — Detail by slug

 Response excludes:
   ❌ Vendor details
   ❌ Internal pricing
   ❌ Unpublished variants

 Includes:
   ✅ id, name, slug, price, currency
   ✅ images, tags, category, brand
   ✅ totalStock (from published inventory)
   ✅ review summary

---

══════════════════════════════════════════════════════════════════
 📋 COMMON RESPONSE CODES
══════════════════════════════════════════════════════════════════

 200 OK              — Success
 201 Created         — Resource created
 204 No Content      — Successful delete
 400 Bad Request     — Validation failure / business rule
 401 Unauthorized    — Missing / invalid token
 403 Forbidden       — Insufficient permissions
 404 Not Found       — Resource not found
 409 Conflict        — Duplicate (slug, sku)
 422 Unprocessable   — Domain validation failure
 429 Too Many        — Rate limit exceeded
 500 Internal        — Server error
 503 Unavailable     — Dependency down

---

══════════════════════════════════════════════════════════════════
 🔐 AUTHENTICATION
══════════════════════════════════════════════════════════════════

 All protected endpoints require:

   Authorization: Bearer <access_token>

 Token issued by auth-service:
   • Access token  — 15 min TTL
   • Refresh token — 7 days TTL

 Role-based access:
   • Public          — read-only published products
   • Vendor          — own products; create/update/publish
   • Admin           — any product; feature; delete; brand; category
   • Moderator       — review approve/reject

---

══════════════════════════════════════════════════════════════════
 📄 EXAMPLE REQUESTS
══════════════════════════════════════════════════════════════════

 Create product:

   POST /api/v1/products
   {
     "name": "Wireless Bluetooth Headphones",
     "slug": "wireless-bluetooth-headphones",
     "sku": "WBH-00001",
     "type": "physical",
     "categoryId": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
     "brandId": "3d4b0d0f-1a2b-4c3d-8e9f-123456789abc",
     "description": "Premium wireless headphones",
     "price": 2499.99,
     "currency": "BDT",
     "tags": ["wireless", "audio"],
     "images": ["https://cdn.vubon.com.bd/p/1.jpg"]
   }

 Add variant:

   POST /api/v1/products/:productId/variants
   {
     "name": "Red / Large",
     "sku": "WBH-RED-L",
     "type": "color",
     "options": [
       { "name": "Color", "value": "Red" },
       { "name": "Size", "value": "L" }
     ],
     "price": 2699.99
   }

 Adjust inventory:

   PATCH /api/v1/inventory/:inventoryId/adjust
   { "delta": 50, "reason": "manual restock", "reference": "PO-2024-001" }

 Apply discount:

   POST /api/v1/pricing/product/:productId/discount
   { "discountPercent": 20 }

 Public search:

   GET /api/v1/public/products/search?q=headphones&page=1&limit=20
