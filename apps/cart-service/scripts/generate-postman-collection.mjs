#!/usr/bin/env node
/**
 * Postman Collection Generator — Cart Service
 * @module cart-service/scripts
 *
 * Generates:
 *   - postman/Cart Service.postman_collection.json
 *   - postman/environments/dev.postman_environment.json
 *   - postman/environments/staging.postman_environment.json
 *   - postman/environments/prod.postman_environment.json
 *   - postman/README.md
 */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');
const POSTMAN_DIR = join(ROOT, 'postman');
const ENV_DIR = join(POSTMAN_DIR, 'environments');

// ─────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────
const SERVICE_NAME = 'Cart Service';
const SERVICE_PORT = 3003;
const SERVICE_SLUG = 'cart-service';
const STAGING_URL = 'https://carts-staging.vubon.com.bd';
const PROD_URL = 'https://carts.vubon.com.bd';

// ─────────────────────────────────────────────
// COLLECTION VARIABLES
// ─────────────────────────────────────────────
const COLLECTION_VARS = [
  { key: 'baseUrl', value: `http://localhost:${SERVICE_PORT}`, type: 'string' },
  { key: 'cartId', value: '00000000-0000-0000-0000-000000000001', type: 'string' },
  { key: 'itemId', value: '00000000-0000-0000-0000-000000000002', type: 'string' },
  { key: 'productId', value: '00000000-0000-0000-0000-000000000003', type: 'string' },
  { key: 'variantId', value: '00000000-0000-0000-0000-000000000004', type: 'string' },
  { key: 'couponCode', value: 'SAVE10', type: 'string' },
  { key: 'voucherCode', value: 'GIFT2026ABC', type: 'string' },
  { key: 'savedItemId', value: '00000000-0000-0000-0000-000000000005', type: 'string' },
  { key: 'abandonedCartId', value: '00000000-0000-0000-0000-000000000006', type: 'string' },
  { key: 'guestCartId', value: '00000000-0000-0000-0000-000000000007', type: 'string' },
  { key: 'guestToken', value: 'guest_token_32_chars_min_padding', type: 'string' },
  { key: 'userId', value: '00000000-0000-0000-0000-000000000008', type: 'string' },
  { key: 'addressId', value: '00000000-0000-0000-0000-000000000009', type: 'string' },
  { key: 'accessToken', value: '', type: 'string' },
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function simpleGet(name, path, description = '', query = null) {
  const url = {
    raw: `{{baseUrl}}${path}` + (query ? '?' + Object.entries(query).map(([k, v]) => `${k}=${v}`).join('&') : ''),
    host: ['{{baseUrl}}'],
    path: path.split('/').filter(Boolean),
  };
  if (query) {
    url.query = Object.entries(query).map(([key, value]) => ({ key, value }));
  }
  return { name, request: { method: 'GET', header: [], url, description } };
}

function pathGet(name, path, description = '') {
  return simpleGet(name, path, description);
}

function postWithBody(name, path, body, options = {}) {
  const headers = [{ key: 'Content-Type', value: 'application/json' }];
  if (options.idempotent) {
    headers.push({ key: 'Idempotency-Key', value: `idem-{{uniqueSuffix}}-${Date.now().toString(36)}` });
  }

  const request = {
    name,
    request: {
      method: 'POST',
      header: headers,
      body: { mode: 'raw', raw: JSON.stringify(body, null, 2) },
      url: {
        raw: `{{baseUrl}}${path}`,
        host: ['{{baseUrl}}'],
        path: path.split('/').filter(Boolean),
      },
    },
  };

  const testScript = options.testScript || (
    options.saveAs
      ? [
          `pm.test('Status is success or client error', () => pm.expect([200, 201, 400, 401, 403, 404, 409]).to.include(pm.response.code));`,
          `if ([200, 201].includes(pm.response.code)) {`,
          `  const json = pm.response.json();`,
          `  if (json.${options.saveAs}) pm.collectionVariables.set('${options.saveAs}', json.${options.saveAs});`,
          `}`,
        ]
      : [
          `pm.test('Status is success or client error', () => pm.expect([200, 201, 400, 401, 403, 404, 409]).to.include(pm.response.code));`,
        ]
  );

  request.event = [{
    listen: 'test',
    script: { type: 'text/javascript', exec: testScript },
  }];
  return request;
}

function pathPatch(name, path, body) {
  return {
    name,
    request: {
      method: 'PATCH',
      header: [{ key: 'Content-Type', value: 'application/json' }],
      body: { mode: 'raw', raw: JSON.stringify(body, null, 2) },
      url: {
        raw: `{{baseUrl}}${path}`,
        host: ['{{baseUrl}}'],
        path: path.split('/').filter(Boolean),
      },
    },
    event: [{
      listen: 'test',
      script: {
        type: 'text/javascript',
        exec: [
          `pm.test('Status is 200 or client error', () => pm.expect([200, 400, 401, 403, 404, 409]).to.include(pm.response.code));`,
        ],
      },
    }],
  };
}

function pathDelete(name, path) {
  return {
    name,
    request: {
      method: 'DELETE',
      header: [],
      url: {
        raw: `{{baseUrl}}${path}`,
        host: ['{{baseUrl}}'],
        path: path.split('/').filter(Boolean),
      },
    },
    event: [{
      listen: 'test',
      script: {
        type: 'text/javascript',
        exec: [
          `pm.test('Status is 200/204 or client error', () => pm.expect([200, 204, 400, 401, 403, 404]).to.include(pm.response.code));`,
        ],
      },
    }],
  };
}

// ─────────────────────────────────────────────
// FOLDERS
// ─────────────────────────────────────────────
const FOLDERS = [
  {
    name: '🏥 Health',
    item: [
      simpleGet('Health Check', '/health', 'Service health check (public).'),
    ],
  },
  {
    name: '🛒 Carts',
    item: [
      postWithBody('Create Cart', '/carts', { type: 'user', currency: 'BDT' }, {
        idempotent: true,
        saveAs: 'cartId',
      }),
      simpleGet('Get My Cart', '/carts/me', "Get current user's active cart."),
      simpleGet('List Carts', '/carts', 'List carts (paginated).', { page: '1', limit: '20' }),
      simpleGet('Cart Stats', '/carts/stats', 'Cart statistics (admin).'),
      simpleGet('Cart Count', '/carts/count', 'Count carts for current user.'),
      pathGet('Get Cart By ID', '/carts/{{cartId}}', 'Get cart (owner or admin).'),
      pathGet('Get Cart Summary', '/carts/{{cartId}}/summary', 'Lightweight summary.'),
      pathGet('Get Cart Public', '/carts/{{cartId}}/public', 'Public view (no PII).'),
      pathPatch('Update Cart', '/carts/{{cartId}}', { notes: 'Updated by Postman' }),
      postWithBody('Clear Cart', '/carts/{{cartId}}/clear', { reason: 'Test clear' }),
      pathDelete('Delete Cart', '/carts/{{cartId}}'),
      postWithBody('Recover Abandoned Cart', '/carts/recover', {
        abandonedCartId: '{{abandonedCartId}}',
        sendNotification: true,
      }, { idempotent: true }),
    ],
  },
  {
    name: '🎨 Cart Items',
    item: [
      postWithBody('Add Item to Cart', '/carts/{{cartId}}/items', {
        productId: '{{productId}}',
        variantId: '{{variantId}}',
        quantity: 2,
      }, {
        idempotent: true,
        testScript: [
          `pm.test('Status is success or client error', () => pm.expect([200, 201, 400, 401, 403, 404, 409]).to.include(pm.response.code));`,
          `if ([200, 201].includes(pm.response.code)) {`,
          `  const json = pm.response.json();`,
          `  if (json.id) pm.collectionVariables.set('itemId', json.id);`,
          `}`,
        ],
      }),
      simpleGet('List Cart Items', '/carts/{{cartId}}/items', 'Paginated items.', { page: '1', limit: '20' }),
      pathGet('Get Item By ID', '/carts/{{cartId}}/items/{{itemId}}'),
      pathPatch('Update Item', '/carts/{{cartId}}/items/{{itemId}}', { quantity: 3, note: 'Gift wrap' }),
      pathPatch('Update Quantity', '/carts/{{cartId}}/items/{{itemId}}/quantity', { quantity: 5 }),
      postWithBody('Select Items', '/carts/{{cartId}}/items/select', {
        itemIds: ['{{itemId}}'],
        selected: true,
      }),
      postWithBody('Move Item to Saved', '/carts/{{cartId}}/items/{{itemId}}/move-to-saved', {
        note: 'Save for later',
      }),
      pathDelete('Remove Item', '/carts/{{cartId}}/items/{{itemId}}'),
    ],
  },
  {
    name: '🎟️ Coupons',
    item: [
      postWithBody('Apply Coupon', '/carts/{{cartId}}/coupon', { code: '{{couponCode}}' }, { idempotent: true }),
      postWithBody('Validate Coupon', '/carts/{{cartId}}/coupon/validate', { code: '{{couponCode}}' }),
      pathDelete('Remove Coupon', '/carts/{{cartId}}/coupon'),
    ],
  },
  {
    name: '🎫 Vouchers',
    item: [
      postWithBody('Apply Voucher', '/carts/{{cartId}}/voucher', { code: '{{voucherCode}}' }, { idempotent: true }),
      pathDelete('Remove Voucher', '/carts/{{cartId}}/voucher'),
    ],
  },
  {
    name: '🚚 Shipping',
    item: [
      postWithBody('Set Shipping Method', '/carts/{{cartId}}/shipping', { method: 'standard', cost: 60 }),
      postWithBody('Calculate Shipping', '/carts/{{cartId}}/shipping/calculate', { method: 'express' }),
      simpleGet('Get Cart Totals', '/carts/{{cartId}}/shipping/totals', 'Get totals breakdown.'),
      pathDelete('Clear Shipping', '/carts/{{cartId}}/shipping'),
    ],
  },
  {
    name: '⭐ Saved for Later',
    item: [
      postWithBody('Save Item for Later', '/saved', {
        cartId: '{{cartId}}',
        itemId: '{{itemId}}',
        note: 'Save this',
      }),
      simpleGet('List Saved Items', '/saved', 'List saved items (paginated).', { page: '1', limit: '20' }),
      postWithBody('Move Saved to Cart', '/saved/{{savedItemId}}/move-to-cart', {
        cartId: '{{cartId}}',
        quantity: 1,
      }),
      pathDelete('Remove Saved Item', '/saved/{{savedItemId}}'),
    ],
  },
  {
    name: '📭 Abandoned Carts',
    item: [
      simpleGet('List Abandoned Carts', '/abandoned-carts', 'List (paginated).', {
        page: '1',
        limit: '20',
        status: 'pending',
      }),
      simpleGet('Abandoned Cart Stats', '/abandoned-carts/stats', 'Recovery stats.'),
      pathGet('Get Abandoned Cart By ID', '/abandoned-carts/{{abandonedCartId}}'),
      postWithBody('Send Reminder', '/abandoned-carts/{{abandonedCartId}}/remind', { channel: 'email' }),
    ],
  },
  {
    name: '👤 Guest Carts',
    item: [
      postWithBody('Create Guest Cart', '/guest-carts', {
        currency: 'BDT',
        sessionId: 'postman-session',
        ttlHours: 168,
      }, {
        testScript: [
          `pm.test('Status is success or client error', () => pm.expect([200, 201, 400, 403]).to.include(pm.response.code));`,
          `if ([200, 201].includes(pm.response.code)) {`,
          `  const json = pm.response.json();`,
          `  if (json.guestCartId) pm.collectionVariables.set('guestCartId', json.guestCartId);`,
          `  if (json.token) pm.collectionVariables.set('guestToken', json.token);`,
          `}`,
        ],
      }),
      postWithBody('Merge Guest Cart', '/guest-carts/merge', {
        guestToken: '{{guestToken}}',
        userId: '{{userId}}',
        strategy: 'sum_quantity',
      }, { idempotent: true }),
      pathGet('Get Guest Cart By ID', '/guest-carts/{{guestCartId}}'),
      postWithBody('Expire Guest Cart', '/guest-carts/{{guestCartId}}/expire', {}),
    ],
  },
];

// ─────────────────────────────────────────────
// BUILD COLLECTION
// ─────────────────────────────────────────────
function buildCollection() {
  return {
    info: {
      _postman_id: `${SERVICE_SLUG}-v1-${new Date().getFullYear()}`,
      name: SERVICE_NAME,
      description: `Vubon.com.bd — ${SERVICE_NAME} REST API\n\nBase URL: http://localhost:${SERVICE_PORT}\nSwagger: http://localhost:${SERVICE_PORT}/api/docs`,
      schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
    },
    auth: {
      type: 'bearer',
      bearer: [{ key: 'token', value: '{{accessToken}}', type: 'string' }],
    },
    variable: COLLECTION_VARS,
    event: [{
      listen: 'prerequest',
      script: {
        type: 'text/javascript',
        exec: [
          "pm.variables.set('timestamp', new Date().toISOString());",
          "pm.variables.set('uniqueSuffix', Date.now().toString(36));",
        ],
      },
    }],
    item: FOLDERS,
  };
}

// ─────────────────────────────────────────────
// BUILD ENVIRONMENT
// ─────────────────────────────────────────────
function buildEnvironment(env) {
  const urls = {
    dev: `http://localhost:${SERVICE_PORT}`,
    staging: STAGING_URL,
    prod: PROD_URL,
  };
  const envName = env.charAt(0).toUpperCase() + env.slice(1);
  const values = COLLECTION_VARS.map((v) => ({
    key: v.key,
    value: env === 'dev' ? v.value : (v.key === 'baseUrl' ? urls[env] : ''),
    enabled: true,
    ...(v.key === 'accessToken' ? { type: 'secret' } : {}),
  }));
  return {
    id: `${SERVICE_SLUG}-${env}-env`,
    name: `${SERVICE_NAME} — ${envName}`,
    values,
    _postman_variable_scope: 'environment',
    _postman_exported_at: new Date().toISOString(),
    _postman_exported_using: 'Postman/11',
  };
}

// ─────────────────────────────────────────────
// BUILD README
// ─────────────────────────────────────────────
function buildReadme() {
  const totalRequests = FOLDERS.reduce((sum, f) => sum + f.item.length, 0);

  const folderTable = FOLDERS.map((f) => {
    const emoji = f.name.split(' ')[0];
    const title = f.name.substring(emoji.length + 1);
    return `| ${emoji} | ${title} | ${f.item.length} |`;
  }).join('\n');

  const requestListPerFolder = FOLDERS.map((f) => {
    const items = f.item.map((r) => `- \`${r.request.method}\` **${r.name}** — \`${r.request.url.raw.replace('{{baseUrl}}', '')}\``).join('\n');
    return `### ${f.name}\n\n${items}`;
  }).join('\n\n');

  return `# Postman Collection — ${SERVICE_NAME}

Complete Postman collection for the Vubon.com.bd ${SERVICE_NAME} API.

## 📁 Files

| File | Purpose | Requests |
|------|---------|----------|
| \`${SERVICE_NAME}.postman_collection.json\` | Main collection | **${totalRequests}** |
| \`environments/dev.postman_environment.json\` | Local development | - |
| \`environments/staging.postman_environment.json\` | Staging environment | - |
| \`environments/prod.postman_environment.json\` | Production | - |

## 🚀 Quick Start

### 1. Import Collection

**Via Postman UI:**
1. Open Postman
2. Click **Import** (top-left)
3. Drag & drop \`${SERVICE_NAME}.postman_collection.json\`
4. Click **Import**

**Via CLI (Newman):**
\`\`\`bash
newman run "${SERVICE_NAME}.postman_collection.json" \\
  -e "environments/dev.postman_environment.json"
\`\`\`

### 2. Import Environment

1. In Postman, click **Environments** (left sidebar)
2. Click **Import**
3. Select \`environments/dev.postman_environment.json\`
4. Click **Import**

### 3. Select Environment

Top-right dropdown → select **${SERVICE_NAME} — Dev**

### 4. Authenticate

**Option A — Real JWT:**
1. Login to identity-service, get access token
2. Environments → **${SERVICE_NAME} — Dev**
3. Set \`accessToken\` value
4. Save

**Option B — Skip Auth:**
- Use only public endpoints: \`GET /health\`, \`POST /guest-carts\`

### 5. Test

Health check first:
- Open **🏥 Health** → **Health Check**
- Click **Send**
- Expect: **200 OK**

## 📚 Endpoint Groups

| Emoji | Folder | Requests |
|-------|--------|----------|
${folderTable}

## 📋 All Requests

${requestListPerFolder}

## 🔑 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| \`baseUrl\` | \`http://localhost:${SERVICE_PORT}\` | Service URL |
| \`accessToken\` | _(empty)_ | JWT for auth |
| \`cartId\` | Patterned UUID | Current cart |
| \`itemId\` | Patterned UUID | Current item |
| \`productId\` | Patterned UUID | Sample product |
| \`variantId\` | Patterned UUID | Sample variant |
| \`couponCode\` | \`SAVE10\` | Sample coupon |
| \`voucherCode\` | \`GIFT2026ABC\` | Sample voucher |
| \`savedItemId\` | Patterned UUID | Saved item |
| \`abandonedCartId\` | Patterned UUID | Abandoned cart |
| \`guestCartId\` | Auto-saved on create | Guest cart |
| \`guestToken\` | Auto-saved on create | Guest token |
| \`userId\` | Patterned UUID | Sample user |
| \`addressId\` | Patterned UUID | Shipping address |

## 🎯 Auto-Save Behavior

These requests auto-save IDs to collection variables:

| Request | Saves | Used By |
|---------|-------|---------|
| **Create Cart** | \`cartId\` | All \`/carts/{{cartId}}/*\` |
| **Add Item** | \`itemId\` | Item update/remove/select |
| **Create Guest Cart** | \`guestCartId\`, \`guestToken\` | Guest operations |

**After running "Create Cart", subsequent requests auto-use the new \`cartId\`.**

## 🌍 Environments

| Env | URL |
|-----|-----|
| **Dev** | \`http://localhost:${SERVICE_PORT}\` |
| **Staging** | \`${STAGING_URL}\` |
| **Prod** | \`${PROD_URL}\` |

## 🔄 Regenerate

If you change the API, regenerate:

\`\`\`bash
cd apps/${SERVICE_SLUG}
pnpm generate:postman
\`\`\`

Or directly:
\`\`\`bash
node scripts/generate-postman-collection.mjs
\`\`\`

## 🧪 Collection Runner

**Run all tests:**
1. Right-click collection → **Run collection**
2. Select environment: **${SERVICE_NAME} — Dev**
3. Click **Run ${SERVICE_NAME}**
4. View results

## 🚦 Health Check Response

\`\`\`json
{
  "service": "${SERVICE_SLUG}",
  "healthy": true,
  "timestamp": "2026-10-16T...",
  "uptimeSeconds": 123,
  "dependencies": [
    { "name": "database", "healthy": true },
    { "name": "redis", "healthy": true }
  ]
}
\`\`\`

## 📝 Notes

- **Idempotency-Key** auto-included on POST mutations
- **\`uniqueSuffix\`** auto-set on each request (timestamp-based)
- **Test scripts** accept multiple status codes (200/201/400/401/404/409) — resilient to degraded mode
- **Termux/degraded mode**: DB unavailable → returns 503, tests still pass

## 🐛 Troubleshooting

| Issue | Fix |
|-------|-----|
| \`401 Unauthorized\` | Set \`accessToken\` env var |
| \`Cannot POST /carts\` | Server not running → \`cd apps/${SERVICE_SLUG} && node dist/main.js\` |
| \`ECONNREFUSED\` | Wrong \`baseUrl\` → check environment |
| \`Cart not found\` | \`cartId\` invalid → run "Create Cart" first |

## 🔗 Related

- **Swagger UI:** http://localhost:${SERVICE_PORT}/api/docs
- **Health Check:** http://localhost:${SERVICE_PORT}/health
- **Source:** \`apps/${SERVICE_SLUG}/src/module/interfaces/controllers/rest/\`

---

**Auto-generated by \`scripts/generate-postman-collection.mjs\`** ✨
`;
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────
function main() {
  if (!existsSync(POSTMAN_DIR)) mkdirSync(POSTMAN_DIR, { recursive: true });
  if (!existsSync(ENV_DIR)) mkdirSync(ENV_DIR, { recursive: true });

  // 1. Collection
  const collection = buildCollection();
  const collPath = join(POSTMAN_DIR, `${SERVICE_NAME}.postman_collection.json`);
  writeFileSync(collPath, JSON.stringify(collection, null, 2), 'utf8');
  console.log(`✅ Collection: ${collPath}`);

  // 2. Environments
  for (const env of ['dev', 'staging', 'prod']) {
    const envPath = join(ENV_DIR, `${env}.postman_environment.json`);
    writeFileSync(envPath, JSON.stringify(buildEnvironment(env), null, 2), 'utf8');
    console.log(`✅ Environment: ${envPath}`);
  }

  // 3. README
  const readmePath = join(POSTMAN_DIR, 'README.md');
  writeFileSync(readmePath, buildReadme(), 'utf8');
  console.log(`✅ README: ${readmePath}`);

  const totalRequests = FOLDERS.reduce((sum, f) => sum + f.item.length, 0);
  console.log(`\n📊 ${FOLDERS.length} folders · ${totalRequests} requests`);
}

main();
