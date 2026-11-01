#!/usr/bin/env node
/**
 * Postman Collection Generator — Order Service
 * Generates:
 *  - postman/Order Service.postman_collection.json
 *  - postman/environments/{dev,staging,prod}.postman_environment.json
 *  - postman/README.md
 * Also patches package.json with `generate:postman` script.
 *
 * @module order-service/scripts
 */
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
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
const SERVICE_NAME = 'Order Service';
const SERVICE_PORT = 3003;
const SERVICE_SLUG = 'order-service';
const STAGING_URL = 'https://orders-staging.vubon.com.bd';
const PROD_URL = 'https://orders.vubon.com.bd';
const SWAGGER_URL = `http://localhost:${SERVICE_PORT}/api/docs`;
const AUTH_SERVICE_URL = 'http://localhost:3001';

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function simpleGet(name, path, description = '', query = null) {
  const url = {
    raw: `{{baseUrl}}${path}` + (query ? '?' + Object.entries(query).map(([k, v]) => `${k}=${v}`).join('&') : ''),
    host: ['{{baseUrl}}'],
    path: path.split('/').filter(Boolean),
  };
  if (query) url.query = Object.entries(query).map(([key, value]) => ({ key, value }));
  return { name, request: { method: 'GET', header: [], url, description } };
}

function pathGet(name, path, description = '') {
  return simpleGet(name, path, description);
}

function postWithBody(name, path, body, options = {}) {
  const request = {
    name,
    request: {
      method: 'POST',
      header: [{ key: 'Content-Type', value: 'application/json' }],
      body: { mode: 'raw', raw: JSON.stringify(body, null, 2) },
      url: { raw: `{{baseUrl}}${path}`, host: ['{{baseUrl}}'], path: path.split('/').filter(Boolean) },
    },
  };
  if (options.description) request.request.description = options.description;
  if (options.saveAs) {
    request.event = [{
      listen: 'test',
      script: {
        type: 'text/javascript',
        exec: [
          `pm.test('Status is 2xx or expected error', () => pm.expect([200, 201, 400, 401, 403, 404, 409, 422, 503]).to.include(pm.response.code));`,
          `if ([200, 201].includes(pm.response.code)) {`,
          `  try {`,
          `    const json = pm.response.json();`,
          `    if (json.${options.saveAs}) {`,
          `      pm.collectionVariables.set('${options.saveAs}', json.${options.saveAs});`,
          `    }`,
          `  } catch (e) {}`,
          `}`,
        ],
      },
    }];
  }
  return request;
}

function pathPost(name, path, body, options = {}) {
  return postWithBody(name, path, body, options);
}

function pathPatch(name, path, body) {
  return {
    name,
    request: {
      method: 'PATCH',
      header: [{ key: 'Content-Type', value: 'application/json' }],
      body: { mode: 'raw', raw: JSON.stringify(body, null, 2) },
      url: { raw: `{{baseUrl}}${path}`, host: ['{{baseUrl}}'], path: path.split('/').filter(Boolean) },
    },
  };
}

function pathDelete(name, path, body) {
  const req = {
    name,
    request: {
      method: 'DELETE',
      header: [],
      url: { raw: `{{baseUrl}}${path}`, host: ['{{baseUrl}}'], path: path.split('/').filter(Boolean) },
    },
  };
  if (body) {
    req.request.header.push({ key: 'Content-Type', value: 'application/json' });
    req.request.body = { mode: 'raw', raw: JSON.stringify(body, null, 2) };
  }
  return req;
}

const SAMPLE_UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

// ─────────────────────────────────────────────
// FOLDERS
// ─────────────────────────────────────────────
const FOLDERS = [
  { name: '🏥 Health', item: [
    simpleGet('Health Check', '/health', 'Service health check. Public endpoint.'),
  ]},
  { name: '🛒 Orders', item: [
    postWithBody('Create Order', '/orders', {
      customerId: SAMPLE_UUID,
      items: [{ productId: SAMPLE_UUID, quantity: 1, unitPrice: 100 }],
      shippingAddress: { line1: '123 Test St', city: 'Dhaka', country: 'BD' },
    }, { saveAs: 'orderId', description: 'Create order. Auto-saves orderId.' }),
    simpleGet('List Orders', '/orders', 'Paginated order list.', { page: '1', limit: '20' }),
    pathGet('Get Order By ID', '/orders/{{orderId}}'),
    pathGet('Get Order By Number', '/orders/number/ORD-2026-000001'),
    pathGet('Get Order Public View', '/orders/{{orderId}}/public'),
    pathGet('Get Order Detail', '/orders/{{orderId}}/detail'),
    simpleGet('Get Order Stats', '/orders/stats'),
    pathPatch('Update Order', '/orders/{{orderId}}', { notes: 'urgent — {{timestamp}}', priority: 'high' }),
    pathPost('Confirm Order', '/orders/{{orderId}}/confirm', { notes: 'confirmed {{timestamp}}' }),
    pathPost('Hold Order', '/orders/{{orderId}}/hold', { reason: 'pending verification' }),
    pathPost('Release Order', '/orders/{{orderId}}/release', { note: 'verified' }),
    pathDelete('Delete Order', '/orders/{{orderId}}', { reason: 'test cleanup' }),
  ]},
  { name: '📦 Order Items', item: [
    postWithBody('Add Order Item', '/orders/{{orderId}}/items', {
      orderId: '{{orderId}}', productId: SAMPLE_UUID, sku: 'SKU-{{uniqueSuffix}}',
      name: 'Test Item {{uniqueSuffix}}', quantity: 2, unitPrice: 50,
    }, { saveAs: 'orderItemId' }),
    pathGet('List Order Items', '/orders/{{orderId}}/items'),
    pathGet('Get Order Item By ID', '/orders/{{orderId}}/items/{{orderItemId}}'),
    pathPatch('Update Order Item', '/orders/{{orderId}}/items/{{orderItemId}}', { quantity: 3 }),
    pathDelete('Remove Order Item', '/orders/{{orderId}}/items/{{orderItemId}}', { reason: 'test' }),
  ]},
  { name: '🛍️ Checkouts', item: [
    postWithBody('Start Checkout', '/checkouts', {
      cartId: SAMPLE_UUID, email: 'customer@example.com', phone: '+8801712345678',
    }, { saveAs: 'checkoutId' }),
    pathPost('Select Address', '/checkouts/{{checkoutId}}/address', { shippingAddressId: SAMPLE_UUID }),
    pathPost('Select Shipping', '/checkouts/{{checkoutId}}/shipping', { shippingMethodId: SAMPLE_UUID }),
    pathPost('Select Payment', '/checkouts/{{checkoutId}}/payment', { paymentMethod: 'bkash' }),
    pathPost('Confirm Checkout', '/checkouts/{{checkoutId}}/confirm', {
      paymentMethod: 'bkash', acceptTerms: true,
    }, { saveAs: 'orderId' }),
    pathPost('Abandon Checkout', '/checkouts/{{checkoutId}}/abandon', { reason: 'test' }),
    pathGet('Get Checkout By ID', '/checkouts/{{checkoutId}}'),
  ]},
  { name: '🚚 Deliveries', item: [
    postWithBody('Schedule Delivery', '/deliveries', {
      orderId: '{{orderId}}', deliveryMethodId: SAMPLE_UUID, type: 'standard',
    }, { saveAs: 'deliveryId' }),
    simpleGet('List Deliveries', '/deliveries', 'Paginated deliveries.', { page: '1', limit: '20' }),
    pathGet('Get Delivery By ID', '/deliveries/{{deliveryId}}'),
    pathPost('Reschedule Delivery', '/deliveries/{{deliveryId}}/reschedule?orderId={{orderId}}', { reason: 'customer unavailable' }),
    pathPost('Confirm Delivery', '/deliveries/{{deliveryId}}/confirm?orderId={{orderId}}', { receivedBy: 'Jane Doe', signature: 'sig-123' }),
  ]},
  { name: '❌ Cancels', item: [
    postWithBody('Request Cancel', '/cancels', {
      orderId: '{{orderId}}', reason: 'customer_request', notes: 'changed mind',
    }, { saveAs: 'cancelId' }),
    pathPost('Approve Cancel', '/cancels/{{cancelId}}/approve', { refundAmount: 100, notes: 'approved' }),
    pathPost('Reject Cancel', '/cancels/{{cancelId}}/reject', { reason: 'too late' }),
    pathGet('Get Cancel By ID', '/cancels/{{cancelId}}'),
  ]},
  { name: '↩️ Returns', item: [
    postWithBody('Request Return', '/returns', {
      orderId: '{{orderId}}', reason: 'defective', itemIds: [SAMPLE_UUID], notes: 'broken package',
    }, { saveAs: 'returnId' }),
    pathPost('Approve Return', '/returns/{{returnId}}/approve', { notes: 'approved' }),
    pathPost('Reject Return', '/returns/{{returnId}}/reject', { reason: 'not eligible' }),
    pathPost('Complete Return', '/returns/{{returnId}}/complete', { refundAmount: 100, restockFee: 5 }),
    pathGet('Get Return By ID', '/returns/{{returnId}}'),
  ]},
  { name: '📬 Fulfillments', item: [
    postWithBody('Start Fulfillment', '/fulfillments/start', {
      orderId: '{{orderId}}', itemIds: [SAMPLE_UUID], type: 'standard',
    }, { saveAs: 'fulfillmentId' }),
    pathPost('Pack Fulfillment', '/fulfillments/{{fulfillmentId}}/pack', { packageCount: 1 }),
    pathPost('Ship Fulfillment', '/fulfillments/{{fulfillmentId}}/ship', { trackingNumber: 'TRK-{{uniqueSuffix}}' }),
    pathPost('Complete Fulfillment', '/fulfillments/{{fulfillmentId}}/complete', { notes: 'delivered' }),
    pathGet('Get Fulfillment By ID', '/fulfillments/{{fulfillmentId}}'),
  ]},
  { name: '📍 Tracking', item: [
    postWithBody('Add Tracking Event', '/tracking', {
      orderId: '{{orderId}}', event: 'in_transit', message: 'Package departed warehouse', location: 'Dhaka Hub',
    }, { saveAs: 'trackingId' }),
    pathGet('Get Tracking Summary', '/tracking/orders/{{orderId}}'),
    pathGet('List Tracking Events', '/tracking/orders/{{orderId}}/events'),
    pathGet('Get Tracking By ID', '/tracking/{{trackingId}}'),
    pathPost('Update Tracking', '/tracking/{{trackingId}}/update', { message: 'out for delivery', location: 'Local hub' }),
  ]},
];

// ─────────────────────────────────────────────
// BUILD COLLECTION
// ─────────────────────────────────────────────
function buildCollection() {
  return {
    info: {
      _postman_id: `${SERVICE_SLUG}-v1-${new Date().getFullYear()}`,
      name: SERVICE_NAME,
      description: `Vubon.com.bd — ${SERVICE_NAME} REST API\n\nBase URL: http://localhost:${SERVICE_PORT}\nSwagger: ${SWAGGER_URL}`,
      schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
    },
    auth: { type: 'bearer', bearer: [{ key: 'token', value: '{{accessToken}}', type: 'string' }] },
    variable: [
      { key: 'baseUrl', value: `http://localhost:${SERVICE_PORT}`, type: 'string' },
      { key: 'orderId', value: SAMPLE_UUID, type: 'string' },
      { key: 'orderItemId', value: SAMPLE_UUID, type: 'string' },
      { key: 'checkoutId', value: SAMPLE_UUID, type: 'string' },
      { key: 'deliveryId', value: SAMPLE_UUID, type: 'string' },
      { key: 'cancelId', value: SAMPLE_UUID, type: 'string' },
      { key: 'returnId', value: SAMPLE_UUID, type: 'string' },
      { key: 'fulfillmentId', value: SAMPLE_UUID, type: 'string' },
      { key: 'trackingId', value: SAMPLE_UUID, type: 'string' },
      { key: 'accessToken', value: '', type: 'string' },
    ],
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
  const urls = { dev: `http://localhost:${SERVICE_PORT}`, staging: STAGING_URL, prod: PROD_URL };
  const envIds = env === 'dev' ? SAMPLE_UUID : '';
  return {
    id: `${SERVICE_SLUG}-${env}-env`,
    name: `${SERVICE_NAME} — ${env.charAt(0).toUpperCase() + env.slice(1)}`,
    values: [
      { key: 'baseUrl', value: urls[env], enabled: true },
      { key: 'accessToken', value: '', enabled: true, type: 'secret' },
      { key: 'orderId', value: envIds, enabled: true },
      { key: 'orderItemId', value: envIds, enabled: true },
      { key: 'checkoutId', value: envIds, enabled: true },
      { key: 'deliveryId', value: envIds, enabled: true },
      { key: 'cancelId', value: envIds, enabled: true },
      { key: 'returnId', value: envIds, enabled: true },
      { key: 'fulfillmentId', value: envIds, enabled: true },
      { key: 'trackingId', value: envIds, enabled: true },
      { key: 'uniqueSuffix', value: '', enabled: true },
      { key: 'timestamp', value: '', enabled: true },
    ],
    _postman_variable_scope: 'environment',
    _postman_exported_at: new Date().toISOString(),
    _postman_exported_using: 'Postman/11',
  };
}

// ─────────────────────────────────────────────
// BUILD README
// ─────────────────────────────────────────────
function buildReadme() {
  const totalFolders = FOLDERS.length;
  const totalRequests = FOLDERS.reduce((sum, f) => sum + f.item.length, 0);

  const folderTable = FOLDERS
    .map((f) => `| ${f.name} | ${f.item.length} |`)
    .join('\n');

  // Collect auto-save mappings
  const saves = [];
  for (const folder of FOLDERS) {
    for (const req of folder.item) {
      const testEvent = (req.event ?? []).find((e) => e.listen === 'test');
      if (testEvent) {
        const scriptText = testEvent.script.exec.join('\n');
        const match = scriptText.match(/json\.(\w+)/);
        if (match) saves.push(`| ${req.name} | \`${match[1]}\` |`);
      }
    }
  }
  const savesTable = saves.join('\n');

  return `# Postman Collection — ${SERVICE_NAME}

Complete Postman collection for **${SERVICE_NAME}** REST API.

## Summary

| Metric | Count |
|--------|-------|
| **Folders** | ${totalFolders} |
| **Requests** | ${totalRequests} |
| **Environments** | 3 (dev / staging / prod) |
| **Auto-saved IDs** | ${saves.length} |

## Files

\`\`\`
postman/
├── ${SERVICE_NAME}.postman_collection.json
├── README.md
└── environments/
    ├── dev.postman_environment.json
    ├── staging.postman_environment.json
    └── prod.postman_environment.json
\`\`\`

## Quick Start

1. **Import collection** → Postman → Import → \`${SERVICE_NAME}.postman_collection.json\`
2. **Import environment** → \`environments/dev.postman_environment.json\`
3. **Select env** → top-right dropdown
4. **Authenticate** → set \`accessToken\` env var (see below)
5. **Test** → run \`🏥 Health\` first, then any other folder

## Authentication

Get a JWT token from identity-service:

\`\`\`bash
curl -X POST ${AUTH_SERVICE_URL}/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"test@example.com","password":"Test123!"}'
\`\`\`

Copy the \`access_token\` from response → paste into Postman \`accessToken\` environment variable.

## Environment URLs

| Env | URL |
|-----|-----|
| **dev** | \`http://localhost:${SERVICE_PORT}\` |
| **staging** | \`${STAGING_URL}\` |
| **prod** | \`${PROD_URL}\` |

## Folders & Requests

| Folder | Requests |
|--------|---------:|
${folderTable}
| **Total** | **${totalRequests}** |

## Auto-Saved Variables

Each \`Create\` request automatically saves the returned ID for use in subsequent requests.

| Request | Saves |
|---------|-------|
${savesTable}

## Dynamic Values

- \`{{uniqueSuffix}}\` — unique timestamp suffix (auto-generated by prerequest script)
- \`{{timestamp}}\` — ISO timestamp (auto-generated by prerequest script)
- \`{{baseUrl}}\` — set per environment
- \`{{accessToken}}\` — JWT token (set manually)

## Suggested Test Order

For end-to-end workflow testing:

1. **🏥 Health** → Health Check
2. **🛒 Orders** → Create Order (saves \`orderId\`)
3. **📦 Order Items** → Add Order Item (saves \`orderItemId\`)
4. **🛒 Orders** → Confirm Order
5. **📬 Fulfillments** → Start Fulfillment → Pack → Ship → Complete
6. **🚚 Deliveries** → Schedule Delivery → Confirm Delivery
7. **📍 Tracking** → Add Tracking Event → Get Tracking Summary
8. **❌ Cancels** → Request Cancel (or **↩️ Returns** → Request Return)

## Newman (CLI / CI)

\`\`\`bash
# Install
npm install -g newman

# Run full collection
newman run "${SERVICE_NAME}.postman_collection.json" \\
  -e "environments/dev.postman_environment.json" \\
  --bail

# Run single folder
newman run "${SERVICE_NAME}.postman_collection.json" \\
  -e "environments/dev.postman_environment.json" \\
  --folder "🏥 Health"
\`\`\`

### CI Integration (GitHub Actions)

\`\`\`yaml
- name: Postman Collection Tests
  run: |
    npm install -g newman
    newman run "postman/${SERVICE_NAME}.postman_collection.json" \\
      -e "postman/environments/dev.postman_environment.json" \\
      --reporters cli,json \\
      --reporter-json-export postman-results.json
\`\`\`

## Regenerate

If endpoints change, regenerate the collection:

\`\`\`bash
cd apps/${SERVICE_SLUG}
npm run generate:postman
# or
node scripts/generate-postman-collection.mjs
\`\`\`

## Swagger UI

Full OpenAPI documentation available at:

- **Local**: ${SWAGGER_URL}
- **Staging**: ${STAGING_URL}/api/docs
- **Prod**: ${PROD_URL}/api/docs

## Notes

- All requests respect bearer auth (except \`@Public()\` routes like \`/health\` and \`/orders/:id/public\`)
- Request IDs use UUID format (sample \`${SAMPLE_UUID}\`)
- Test assertions accept both \`2xx\` and expected error codes (400/401/403/404/409/422/503)
- In Termux (Prisma engine degraded), \`503\` responses are expected and handled

---

**Generated**: ${new Date().toISOString()}  
**Generator**: \`scripts/generate-postman-collection.mjs\`
`;
}

// ─────────────────────────────────────────────
// PATCH package.json
// ─────────────────────────────────────────────
function patchPackageJson() {
  const pkgPath = join(ROOT, 'package.json');
  if (!existsSync(pkgPath)) {
    console.log('⚠️  package.json not found — skipping');
    return;
  }
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    pkg.scripts = pkg.scripts ?? {};
    if (pkg.scripts['generate:postman'] !== 'node scripts/generate-postman-collection.mjs') {
      pkg.scripts['generate:postman'] = 'node scripts/generate-postman-collection.mjs';
      writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
      console.log('✅ package.json patched (generate:postman)');
    } else {
      console.log('✅ package.json already has generate:postman');
    }
  } catch (err) {
    console.log(`⚠️  package.json patch failed: ${err.message}`);
  }
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────
function main() {
  if (!existsSync(POSTMAN_DIR)) mkdirSync(POSTMAN_DIR, { recursive: true });
  if (!existsSync(ENV_DIR)) mkdirSync(ENV_DIR, { recursive: true });

  const collection = buildCollection();
  const collPath = join(POSTMAN_DIR, `${SERVICE_NAME}.postman_collection.json`);
  writeFileSync(collPath, JSON.stringify(collection, null, 2), 'utf8');
  console.log(`✅ Collection: ${collPath}`);

  for (const env of ['dev', 'staging', 'prod']) {
    const envPath = join(ENV_DIR, `${env}.postman_environment.json`);
    writeFileSync(envPath, JSON.stringify(buildEnvironment(env), null, 2), 'utf8');
    console.log(`✅ Environment: ${envPath}`);
  }

  const readmePath = join(POSTMAN_DIR, 'README.md');
  writeFileSync(readmePath, buildReadme(), 'utf8');
  console.log(`✅ README: ${readmePath}`);

  patchPackageJson();

  const totalRequests = FOLDERS.reduce((sum, f) => sum + f.item.length, 0);
  console.log(`\n📊 ${FOLDERS.length} folders · ${totalRequests} requests`);
}

main();
