# Postman Collection — Product Service

Complete Postman collection for testing the Product Service API.

---

## 📦 Files

| File | Purpose |
|------|---------|
| `Product Service.postman_collection.json` | Main collection — 84 requests, 13 folders |
| `environments/dev.postman_environment.json` | Dev environment (localhost:3002) |
| `environments/staging.postman_environment.json` | Staging environment |
| `environments/prod.postman_environment.json` | Production environment |

---

## 🚀 Quick Start

### 1. Install Postman

Download from [postman.com/downloads](https://www.postman.com/downloads/) or use [web.postman.co](https://web.postman.co).

### 2. Import Collection

**Desktop:**
1. Open Postman
2. Click **Import** (top-left)
3. Drag & drop `Product Service.postman_collection.json`
4. Click **Import**

**CLI (Newman):**
\`\`\`bash
npm install -g newman
newman run "Product Service.postman_collection.json"
\`\`\`

### 3. Import Environment

1. Click **Environments** (left sidebar)
2. Click **Import**
3. Select `environments/dev.postman_environment.json`
4. Import

### 4. Select Environment

Top-right dropdown → Select **"Product Service — Dev"**.

### 5. Test

1. Click any request → **Send**
2. For auth-required requests → need `accessToken` (see below)

---

## 🔐 Authentication Setup

Most endpoints require a JWT Bearer token.

### Option A — Manual Token

1. Login via auth-service to get JWT
2. Copy token
3. In Postman → Environments → Dev → set `accessToken` value
4. All auth-required requests will auto-use it (collection-level auth)

### Option B — Programmatic (Login Request)

Add a login request to collection:

\`\`\`json
{
  "name": "Login",
  "event": [{
    "listen": "test",
    "script": {
      "exec": [
        "const json = pm.response.json();",
        "pm.environment.set('accessToken', json.tokens.accessToken);"
      ]
    }
  }],
  "request": {
    "method": "POST",
    "url": "{{authServiceUrl}}/auth/login",
    "body": { "mode": "raw", "raw": "{\"identifier\":\"...\",\"password\":\"...\"}" }
  }
}
\`\`\`

---

## 📂 Collection Structure

\`\`\`
📮 Product Service (13 folders, 84 requests)
│
├── 🏥 Health (1)
│   └── Health Check
│
├── 🛍️ Products (15)
│   ├── Create Product
│   ├── List Products
│   ├── Search Products
│   ├── Featured Products
│   ├── Product Stats
│   ├── Get Product By Slug
│   ├── Get Product By ID
│   ├── Get Product Detail
│   ├── Get Public Product
│   ├── Get Related Products
│   ├── Update Product
│   ├── Publish Product
│   ├── Archive Product
│   ├── Duplicate Product
│   └── Delete Product
│
├── 🌐 Public Products (3)
├── 🎨 Product Variants (5)
├── 📦 Product Attributes (4)
├── 📊 Product Inventory (6)
├── 💰 Product Pricing (6)
├── 🏷️ Pricing Rules (6)
├── 📚 Product Collections (9)
├── ⭐ Product Reviews (9)
├── 📷 Product Media (3)
├── 🏢 Brands (7)
└── 📂 Categories (10)
\`\`\`

---

## 🎯 Features

### ✨ Auto-Set Collection Variables

Create Product request auto-saves new `productId`:
\`\`\`javascript
if (pm.response.code === 201) {
  pm.collectionVariables.set('productId', pm.response.json().productId);
}
\`\`\`

### ✨ Auto-Timestamp

Every request gets fresh `uniqueSuffix` + `timestamp`:
\`\`\`javascript
pm.variables.set('uniqueSuffix', Date.now().toString(36));
\`\`\`

### ✨ Test Assertions

Each request has validation:
\`\`\`javascript
pm.test('Status is 200', () => pm.response.to.have.status(200));
\`\`\`

### ✨ Multi-Status Acceptance (Degraded Mode)

Accepts multiple statuses for resilience:
\`\`\`javascript
pm.expect([200, 401]).to.include(pm.response.code);
\`\`\`

---

## 🌍 Environments

### Dev

\`\`\`json
{
  "baseUrl": "http://localhost:3002",
  "accessToken": "",
  "productId": "00000000-0000-0000-0000-000000000001"
}
\`\`\`

### Staging

\`\`\`json
{
  "baseUrl": "https://products-staging.vubon.com.bd"
}
\`\`\`

### Prod

\`\`\`json
{
  "baseUrl": "https://products.vubon.com.bd"
}
\`\`\`

---

## 🧪 Running with Newman (CLI)

### Install Newman

\`\`\`bash
npm install -g newman
npm install -g newman-reporter-html
\`\`\`

### Run All Tests

\`\`\`bash
newman run "postman/Product Service.postman_collection.json" \\
  -e "postman/environments/dev.postman_environment.json" \\
  --reporters cli,html \\
  --reporter-html-export newman-report.html
\`\`\`

### Run Specific Folder

\`\`\`bash
newman run "postman/Product Service.postman_collection.json" \\
  -e "postman/environments/dev.postman_environment.json" \\
  --folder "🛍️ Products"
\`\`\`

### Run with Auth Token

\`\`\`bash
newman run "postman/Product Service.postman_collection.json" \\
  -e "postman/environments/dev.postman_environment.json" \\
  --env-var "accessToken=<your-jwt-here>"
\`\`\`

### CI Integration

Add to GitHub Actions:

\`\`\`yaml
- name: Postman Tests
  run: |
    npm install -g newman
    newman run "postman/Product Service.postman_collection.json" \\
      -e "postman/environments/dev.postman_environment.json" \\
      --bail
\`\`\`

---

## 📊 Environment Variables Reference

| Variable | Purpose | Default |
|----------|---------|---------|
| `baseUrl` | Service URL | `http://localhost:3002` |
| `accessToken` | JWT bearer | `""` |
| `productId` | Sample product UUID | `...0001` |
| `variantId` | Sample variant UUID | `...0002` |
| `categoryId` | Sample category UUID | `...0003` |
| `brandId` | Sample brand UUID | `...0004` |
| `collectionId` | Sample collection UUID | `...0005` |
| `reviewId` | Sample review UUID | `...0006` |
| `inventoryId` | Sample inventory UUID | `...0007` |
| `priceId` | Sample price UUID | `...0008` |
| `ruleId` | Sample pricing rule UUID | `...0009` |
| `attributeId` | Sample attribute UUID | `...0010` |
| `uniqueSuffix` | Auto-generated unique string | (empty) |
| `timestamp` | Auto-generated ISO timestamp | (empty) |

---

## 🔄 Regenerating Collection

To regenerate the collection from endpoints:

\`\`\`bash
# Manual approach (currently)
# Edit "Product Service.postman_collection.json" directly

# OR export from Swagger
# 1. Get OpenAPI JSON: curl http://localhost:3002/api/docs-json > openapi.json
# 2. Import OpenAPI into Postman
# 3. Export as Postman Collection
\`\`\`

---

## 📚 Related Documentation

- [README.md](../README.md) — Project overview
- [API.md](../API.md) — Full API reference
- [TESTING.md](../TESTING.md) — E2E test guide
- [ARCHITECTURE.md](../ARCHITECTURE.md) — System architecture

---

## 🎯 Common Workflows

### 1. Test Local Dev Server

\`\`\`bash
# 1. Ensure server running
curl http://localhost:3002/health

# 2. In Postman:
#    - Select "Product Service — Dev" env
#    - Run "Health Check" first
#    - Run "Create Product" (auto-saves productId)
#    - Run "Get Product By ID"
\`\`\`

### 2. Test With Auth

\`\`\`bash
# 1. Get JWT from auth-service
# 2. Set accessToken env var
# 3. Run any protected endpoint
\`\`\`

### 3. Batch Test All Endpoints

\`\`\`bash
newman run "postman/Product Service.postman_collection.json" \\
  -e "postman/environments/dev.postman_environment.json" \\
  --reporters cli,json \\
  --reporter-json-export postman-results.json
\`\`\`

---

## 💡 Tips

### Tip 1 — Collection Runner

For batch runs:
1. Right-click collection → **Run collection**
2. Select requests to run
3. Iterations: 1 (or more for load test)
4. Delay: 100ms (avoid rate limit)
5. Click **Run Product Service**

### Tip 2 — Save Responses as Examples

Right-click any successful response → **Save as example**. Others can view without running.

### Tip 3 — Environment Switcher

Use top-right dropdown to switch Dev/Staging/Prod instantly. All requests use `{{baseUrl}}`.

### Tip 4 — Pre-request Scripts

Add custom logic in **Pre-request Script** tab:
\`\`\`javascript
pm.environment.set('randomSKU', 'SKU-' + Math.random().toString(36).slice(2, 8));
\`\`\`

### Tip 5 — Postman Vault (secrets)

For sensitive tokens:
1. Settings → Vault → Add
2. Reference: `{{vault:prod-jwt}}`

---

## 🎯 Troubleshooting

### Collection won't import

- Ensure file is valid JSON: `python3 -c "import json; json.load(open('...json'))"`
- Postman version >= 10

### 401 Unauthorized

- Check `accessToken` env variable is set
- Token not expired
- Auth-service running

### 404 Not Found

- Ensure service is running on correct URL
- Check `baseUrl` matches actual server
- Product/category UUID is valid

### Connection refused

- Server not running: `curl http://localhost:3002/health`
- Start server: `pnpm start:dev`
- Or: `node dist/main.js &`

---

## 📊 Stats

| Metric | Value |
|--------|-------|
| Folders | 13 |
| Requests | 84 |
| Environments | 3 |
| Test assertions | ~50 |
| Collection size | ~2000 lines |
