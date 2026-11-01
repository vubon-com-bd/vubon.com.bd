# API Reference — Product Service

Complete REST API documentation. All endpoints use JSON.

**Base URL:** `http://localhost:3002`
**Swagger UI:** `http://localhost:3002/api/docs`
**OpenAPI JSON:** `http://localhost:3002/api/docs-json`

---

## 🔐 Authentication

Most endpoints require a JWT Bearer token:

\`\`\`
Authorization: Bearer <your-jwt-token>
\`\`\`

Public endpoints (no auth):
- `GET /health`
- `GET /public/products/*`

---

## 📊 Endpoints Summary

| Group | Count | Base Path |
|-------|-------|-----------|
| Health | 1 | `/health` |
| Products | 15 | `/products` |
| Public Products | 3 | `/public/products` |
| Variants | 5 | `/product-variants` |
| Attributes | 4 | `/products/:productId/attributes` |
| Inventory | 6 | `/product-inventory` |
| Pricing | 6 | `/product-pricing` |
| Pricing Rules | 6 | `/product-pricing-rules` |
| Collections | 9 | `/product-collections` |
| Reviews | 9 | `/product-reviews` |
| Media | 3 | `/products/:productId/media` |
| Brands | 7 | `/brands` |
| Categories | 10 | `/categories` |
| **TOTAL** | **59** | |

---

## 🏥 Health

### `GET /health`

Service health check. Public endpoint.

**Response 200:**
\`\`\`json
{
  "service": "product-service",
  "status": "ok",
  "timestamp": "2026-10-14T01:00:00.000Z"
}
\`\`\`

---

## 🛍️ Products

### `POST /products`

Create a new product (auth required).

**Request:**
\`\`\`json
{
  "name": "Premium T-Shirt",
  "slug": "premium-t-shirt",
  "sku": "TSHIRT-001",
  "type": "physical",
  "categoryId": "uuid",
  "price": 1250.00,
  "currency": "BDT",
  "description": "Soft cotton",
  "tags": ["summer", "cotton"],
  "images": ["https://example.com/img.jpg"]
}
\`\`\`

**Headers:**
- `Idempotency-Key: <unique-key>` (optional — for safe retries)

**Response 201:**
\`\`\`json
{
  "success": true,
  "productId": "uuid",
  "status": "draft",
  "slug": "premium-t-shirt"
}
\`\`\`

### `GET /products`

List products (paginated, auth required).

**Query:**
- `page` (number, default: 1)
- `limit` (number, default: 20, max: 100)
- `status` (string)
- `type` (string)
- `categoryId` (uuid)
- `brandId` (uuid)
- `isFeatured` (boolean)
- `inStock` (boolean)
- `minPrice`, `maxPrice` (number)
- `search` (string)
- `sortBy` (createdAt | updatedAt | name | price | totalStock)
- `sortDir` (asc | desc)

**Response 200:**
\`\`\`json
{
  "items": [{
    "id": "uuid",
    "name": "Premium T-Shirt",
    "slug": "premium-t-shirt",
    "sku": "TSHIRT-001",
    "thumbnailUrl": "...",
    "type": "physical",
    "status": "published",
    "totalStock": 100,
    "isFeatured": false,
    "createdAt": "2026-10-14T00:00:00.000Z"
  }],
  "total": 150,
  "page": 1,
  "limit": 20,
  "totalPages": 8,
  "hasNext": true,
  "hasPrev": false
}
\`\`\`

### `GET /products/:id`

Get product by ID (auth required).

**Response 200:** Full ProductResponseDTO

**Response 404:**
\`\`\`json
{
  "statusCode": 404,
  "code": "PRD-001",
  "message": "Product \"uuid\" not found",
  "context": { "resource": "Product", "resourceId": "uuid" },
  "timestamp": "..."
}
\`\`\`

### `GET /products/by-slug/:slug`

Get product by slug.

### `GET /products/:id/detail`

Get product with variants + attributes.

### `GET /products/:id/public`

Get public product (customer-safe — no PII).

### `GET /products/:id/related`

Get related products (same category).

**Query:** `limit` (default: 10)

### `GET /products/search`

Search products.

**Query:** `q` (required), `limit` (default: 20)

### `GET /products/featured`

Get featured products.

**Query:** `limit` (default: 20)

### `GET /products/stats`

Get product statistics.

**Response 200:**
\`\`\`json
{
  "total": 150,
  "publishedCount": 120,
  "draftCount": 25,
  "outOfStockCount": 5,
  "totalStockUnits": 15000,
  "byStatus": { "published": 120, "draft": 25 },
  "byType": { "physical": 100, "digital": 50 }
}
\`\`\`

### `PATCH /products/:id`

Update product (auth + owner guard).

### `POST /products/:id/publish`

Publish product (auth + owner guard).

**Response 200:** Updated ProductResponseDTO with `status: "published"`

### `POST /products/:id/archive`

Archive product.

### `POST /products/:id/duplicate`

Duplicate product.

**Response 201:** New ProductCreateResponseDTO

### `DELETE /products/:id`

Delete product (draft only).

---

## 🌐 Public Products

No authentication required.

### `GET /public/products/featured`
### `GET /public/products/search?q=<term>`
### `GET /public/products/:id`

---

## 🎨 Product Variants

### `POST /product-variants`

Add variant to product.

**Request:**
\`\`\`json
{
  "productId": "uuid",
  "name": "T-Shirt - Medium",
  "sku": "TSHIRT-M",
  "type": "size",
  "options": [{ "name": "size", "value": "M" }],
  "price": 1250.00
}
\`\`\`

### `GET /product-variants?page=1&limit=20`

### `GET /product-variants/:id`

### `GET /product-variants/stats`

### `PATCH /product-variants/:id`

---

## 📦 Product Attributes

### `POST /products/:productId/attributes`

**Request:**
\`\`\`json
{
  "name": "Color",
  "type": "text",
  "values": [{ "value": "Red", "label": "Red" }]
}
\`\`\`

### `GET /products/:productId/attributes`
### `PATCH /products/:productId/attributes/:attributeId`
### `DELETE /products/:productId/attributes/:attributeId`

---

## 📊 Product Inventory

### `GET /product-inventory/check-stock?productId=<uuid>&quantity=<number>`

**Response 200:**
\`\`\`json
{
  "inventoryId": "uuid",
  "sku": "TSHIRT-001",
  "available": 100,
  "canFulfill": true,
  "requestedQuantity": 5
}
\`\`\`

### `GET /product-inventory/stats`

### `GET /product-inventory/by-product/:productId`

### `GET /product-inventory/:id`

### `POST /product-inventory/:id/adjust`

**Request:**
\`\`\`json
{ "delta": 10, "reason": "restock", "reference": "PO-123" }
\`\`\`

### `POST /product-inventory/:id/update`

---

## 💰 Product Pricing

### `GET /product-pricing/stats`

### `GET /product-pricing/by-product/:productId`

### `GET /product-pricing/by-product/:productId/public`

### `POST /product-pricing/calculate`

Calculate price with discount + VAT + AIT.

**Request:**
\`\`\`json
{
  "productId": "uuid",
  "quantity": 2,
  "currency": "BDT",
  "applyAit": true
}
\`\`\`

**Response 200:**
\`\`\`json
{
  "basePrice": 2000,
  "discountAmount": 100,
  "finalPrice": 1900,
  "discountPercent": 5,
  "vat": 285,
  "ait": 95,
  "grossAmount": 2280,
  "netAmount": 1900,
  "currency": "BDT"
}
\`\`\`

### `PATCH /product-pricing/by-product/:productId`

### `GET /product-pricing/:id`

---

## 🏷️ Product Pricing Rules

### `POST /product-pricing-rules`
### `GET /product-pricing-rules?page=1&limit=20`
### `GET /product-pricing-rules/active`
### `GET /product-pricing-rules/:id`
### `PATCH /product-pricing-rules/:id`
### `DELETE /product-pricing-rules/:id`

---

## 📚 Product Collections

### `POST /product-collections`
### `GET /product-collections?page=1&limit=20`
### `GET /product-collections/stats`
### `GET /product-collections/by-slug/:slug`
### `GET /product-collections/:id`
### `PATCH /product-collections/:id`
### `DELETE /product-collections/:id`
### `POST /product-collections/:id/products/:productId`
### `DELETE /product-collections/:id/products/:productId`

---

## ⭐ Product Reviews

### `POST /product-reviews`

**Request:**
\`\`\`json
{
  "productId": "uuid",
  "rating": 5,
  "title": "Great product",
  "comment": "This is a test review comment."
}
\`\`\`

### `GET /product-reviews?page=1&limit=20`
### `GET /product-reviews/stats/:productId`
### `GET /product-reviews/:id`
### `PATCH /product-reviews/:id`
### `DELETE /product-reviews/:id`
### `POST /product-reviews/:id/approve`
### `POST /product-reviews/:id/reject`
### `POST /product-reviews/:id/helpful`

---

## 📷 Product Media

### `GET /products/:productId/media`
### `POST /products/:productId/media`
### `DELETE /products/:productId/media/:mediaUrl`

---

## 🏢 Brands

### `POST /brands`
### `GET /brands?page=1&limit=20`
### `GET /brands/stats`
### `GET /brands/by-slug/:slug`
### `GET /brands/:id`
### `PATCH /brands/:id`
### `DELETE /brands/:id`

---

## 📂 Categories

### `POST /categories`
### `GET /categories?page=1&limit=20`
### `GET /categories/tree`
### `GET /categories/roots`
### `GET /categories/stats`
### `GET /categories/by-slug/:slug`
### `GET /categories/:id`
### `PATCH /categories/:id`
### `DELETE /categories/:id`
### `POST /categories/:id/move`

---

## 📋 Error Responses

All errors follow this format:

\`\`\`json
{
  "statusCode": 404,
  "code": "PRD-001",
  "message": "Product \"uuid\" not found",
  "context": { ... },
  "timestamp": "2026-10-14T01:00:00.000Z"
}
\`\`\`

### Common Error Codes

| Code | HTTP | Meaning |
|------|------|---------|
| `PRD-001` | 404 | Product not found |
| `PRD-002` | 409 | Product out of stock |
| `VAL-001` | 422 | Validation failed |
| `VAL-004` | 409 | Duplicate (slug/sku) |
| `USR-001` | 404 | User not found |
| `AUTH-005` | 403 | Forbidden |
| `SERVER_INTERNAL` | 500 | Internal error |

---

## 🔄 HTTP Status Codes

| Status | Meaning |
|--------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized (no/invalid JWT) |
| 403 | Forbidden (owner check) |
| 404 | Not Found |
| 409 | Conflict (duplicate) |
| 422 | Unprocessable (validation) |
| 500 | Internal Server Error |
| 503 | Service Unavailable (DB down) |
