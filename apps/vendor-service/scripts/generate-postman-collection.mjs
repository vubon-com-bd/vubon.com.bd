#!/usr/bin/env node
/**
 * Postman Collection Generator — Vendor Service
 * @module vendor-service/scripts
 *
 * Generates:
 *  1. postman/Vendor Service.postman_collection.json
 *  2. postman/environments/{dev,staging,prod}.postman_environment.json
 *  3. postman/README.md
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
const SERVICE_NAME = 'Vendor Service';
const SERVICE_PORT = 3004;
const SERVICE_SLUG = 'vendor-service';
const STAGING_URL = 'https://vendors-staging.vubon.com.bd';
const PROD_URL = 'https://vendors.vubon.com.bd';

const SAMPLE_ID = (n) => `00000000-0000-0000-0000-${String(n).padStart(12, '0')}`;

// ─────────────────────────────────────────────
// HELPER BUILDERS
// ─────────────────────────────────────────────
function simpleGet(name, path, description = '', query = null) {
  const url = {
    raw:
      `{{baseUrl}}${path}` +
      (query
        ? '?' +
          Object.entries(query)
            .map(([k, v]) => `${k}=${v}`)
            .join('&')
        : ''),
    host: ['{{baseUrl}}'],
    path: path.split('/').filter(Boolean),
  };
  if (query) {
    url.query = Object.entries(query).map(([key, value]) => ({ key, value }));
  }
  return {
    name,
    request: { method: 'GET', header: [], url, description },
  };
}

function pathGet(name, path, description = '') {
  return simpleGet(name, path, description);
}

function postWithBody(name, path, body, options = {}) {
  const request = {
    name,
    request: {
      method: 'POST',
      header: [
        { key: 'Content-Type', value: 'application/json' },
        ...(options.idempotent
          ? [
              {
                key: 'Idempotency-Key',
                value: `${name.toLowerCase().replace(/\s+/g, '-')}-{{uniqueSuffix}}`,
              },
            ]
          : []),
      ],
      body: { mode: 'raw', raw: JSON.stringify(body, null, 2) },
      url: {
        raw: `{{baseUrl}}${path}`,
        host: ['{{baseUrl}}'],
        path: path.split('/').filter(Boolean),
      },
      description: options.description ?? '',
    },
  };

  if (options.saveAs || options.testStatus) {
    const statuses = options.testStatus ?? [201, 400, 401, 403, 404, 409, 500, 503];
    const scriptLines = [
      `pm.test('Status is one of [${statuses.join(', ')}]', () => pm.expect([${statuses.join(', ')}]).to.include(pm.response.code));`,
    ];
    if (options.saveAs) {
      scriptLines.push(
        `if (pm.response.code === 200 || pm.response.code === 201) {`,
        `  const json = pm.response.json();`,
        `  if (json && json.${options.saveAs}) {`,
        `    pm.collectionVariables.set('${options.saveAs}', json.${options.saveAs});`,
        `  }`,
        `}`,
      );
    }
    request.event = [
      { listen: 'test', script: { type: 'text/javascript', exec: scriptLines } },
    ];
  }

  return request;
}

function pathPatch(name, path, body, options = {}) {
  const request = {
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
      description: options.description ?? '',
    },
  };
  if (options.testStatus) {
    request.event = [
      {
        listen: 'test',
        script: {
          type: 'text/javascript',
          exec: [
            `pm.test('Status is one of [${options.testStatus.join(', ')}]', () => pm.expect([${options.testStatus.join(', ')}]).to.include(pm.response.code));`,
          ],
        },
      },
    ];
  }
  return request;
}

function pathDelete(name, path, options = {}) {
  const request = {
    name,
    request: {
      method: 'DELETE',
      header: [],
      url: {
        raw: `{{baseUrl}}${path}`,
        host: ['{{baseUrl}}'],
        path: path.split('/').filter(Boolean),
      },
      description: options.description ?? '',
    },
  };
  if (options.testStatus) {
    request.event = [
      {
        listen: 'test',
        script: {
          type: 'text/javascript',
          exec: [
            `pm.test('Status is one of [${options.testStatus.join(', ')}]', () => pm.expect([${options.testStatus.join(', ')}]).to.include(pm.response.code));`,
          ],
        },
      },
    ];
  }
  return request;
}

// ─────────────────────────────────────────────
// FOLDERS (25 groups)
// ─────────────────────────────────────────────
const FOLDERS = [
  {
    name: '🏥 Health',
    requests: [simpleGet('Health Check', '/health', 'Service health check (public)')],
  },
  {
    name: '🌐 Public Vendors',
    requests: [
      simpleGet('List Public Vendors', '/public/vendors', 'Public vendor list (paginated)', {
        page: '1',
        limit: '20',
      }),
      simpleGet('Search Public Vendors', '/public/vendors/search', 'Public vendor search', {
        q: 'test',
        limit: '10',
      }),
      pathGet('Public Vendor By Slug', '/public/vendors/slug/{{vendorSlug}}', 'Public vendor by slug'),
      pathGet('Public Vendor By ID', '/public/vendors/{{vendorId}}', 'Public vendor by ID'),
    ],
  },
  {
    name: '🏢 Vendors',
    requests: [
      postWithBody(
        'Register Vendor',
        '/vendors',
        {
          userId: SAMPLE_ID(2),
          name: 'E2E Vendor {{uniqueSuffix}}',
          displayName: 'E2E Vendor {{uniqueSuffix}}',
          slug: 'e2e-vendor-{{uniqueSuffix}}',
          type: 'individual',
          businessType: 'retailer',
          email: 'vendor-{{uniqueSuffix}}@example.com',
          phone: '+8801712345678',
          acceptTerms: true,
        },
        { saveAs: 'vendorId', idempotent: true, testStatus: [201, 400, 401, 409, 500, 503] },
      ),
      simpleGet('List Vendors', '/vendors', 'Paginated vendor list', { page: '1', limit: '20' }),
      pathGet('Get My Vendor', '/vendors/me', 'Current user vendor'),
      simpleGet('Search Vendors', '/vendors/search', 'Vendor search', { q: 'test', limit: '10' }),
      pathGet('Get Vendor Stats', '/vendors/stats', 'Vendor statistics'),
      pathGet('Get Vendor By Slug', '/vendors/slug/{{vendorSlug}}', 'Vendor by slug'),
      pathGet('Get Vendor By ID', '/vendors/{{vendorId}}', 'Vendor by ID'),
      pathGet('Get Public Vendor View', '/vendors/{{vendorId}}/public', 'Public-facing vendor view'),
      pathGet('Get Vendor Detail', '/vendors/{{vendorId}}/detail', 'Vendor detail with children'),
      pathPatch(
        'Update Vendor',
        '/vendors/{{vendorId}}',
        { name: 'Updated Vendor {{uniqueSuffix}}', displayName: 'Updated' },
        { testStatus: [200, 400, 401, 403, 404, 500, 503] },
      ),
      pathDelete('Delete Vendor', '/vendors/{{vendorId}}', {
        testStatus: [200, 204, 400, 401, 403, 404, 500, 503],
      }),
    ],
  },
  {
    name: '👤 Profile',
    requests: [
      pathGet('Get Vendor Profile', '/vendors/{{vendorId}}/profile', 'Vendor profile'),
      pathPatch(
        'Update Vendor Profile',
        '/vendors/{{vendorId}}/profile',
        { displayName: 'Updated Profile {{uniqueSuffix}}', tagline: 'Fast & Reliable' },
        { testStatus: [200, 400, 401, 403, 404, 500, 503] },
      ),
    ],
  },
  {
    name: '💼 Business',
    requests: [
      pathGet('Get Vendor Business', '/vendors/{{vendorId}}/business', 'Business info'),
      pathPatch(
        'Update Vendor Business',
        '/vendors/{{vendorId}}/business',
        {
          legalName: 'Vendor Pvt Ltd',
          registrationNumber: 'REG123456',
          taxId: 'TAX123456',
          establishedYear: 2020,
          employeeCount: 25,
        },
        { testStatus: [200, 400, 401, 403, 404, 500, 503] },
      ),
    ],
  },
  {
    name: '📞 Contacts',
    requests: [pathGet('List Vendor Contacts', '/vendors/{{vendorId}}/contacts', 'List contacts')],
  },
  {
    name: '📍 Addresses',
    requests: [pathGet('List Vendor Addresses', '/vendors/{{vendorId}}/addresses', 'List addresses')],
  },
  {
    name: '🏦 Bank Accounts',
    requests: [
      pathGet('List Vendor Bank Accounts', '/vendors/{{vendorId}}/bank-accounts', 'List bank accounts'),
    ],
  },
  {
    name: '📄 Documents',
    requests: [pathGet('List Vendor Documents', '/vendors/{{vendorId}}/documents', 'List documents')],
  },
  {
    name: '✅ Verifications',
    requests: [
      postWithBody(
        'Submit Verification',
        '/vendors/{{vendorId}}/verifications',
        { type: 'email', referenceId: 'REF-{{uniqueSuffix}}' },
        { saveAs: 'verificationId', testStatus: [201, 400, 401, 403, 409, 500, 503] },
      ),
      pathGet('List Verifications', '/vendors/{{vendorId}}/verifications', 'List verifications'),
      pathGet(
        'Get Verification By ID',
        '/vendors/{{vendorId}}/verifications/{{verificationId}}',
        'Verification by ID',
      ),
      postWithBody(
        'Reverify',
        '/vendors/{{vendorId}}/verifications/{{verificationId}}/reverify',
        { referenceId: 'REF-RE-{{uniqueSuffix}}' },
        { testStatus: [200, 201, 400, 401, 403, 404, 500, 503] },
      ),
    ],
  },
  {
    name: '📋 Approvals',
    requests: [
      pathGet('Get Approval Status', '/vendors/{{vendorId}}/approvals/status', 'Approval status'),
    ],
  },
  {
    name: '🚫 Suspensions',
    requests: [
      pathGet('Get Vendor Suspension', '/vendors/{{vendorId}}/suspensions', 'Current suspension'),
    ],
  },
  {
    name: '💰 Commissions',
    requests: [
      pathGet('List Commissions', '/vendors/{{vendorId}}/commissions', 'List commissions'),
      pathGet(
        'Get Commission By ID',
        '/vendors/{{vendorId}}/commissions/{{commissionId}}',
        'Commission by ID',
      ),
      pathGet('Get Commission Summary', '/vendors/{{vendorId}}/commissions/summary', 'Commission stats'),
      pathPatch(
        'Update Commission',
        '/vendors/{{vendorId}}/commissions',
        { type: 'percentage', rate: 15, effectiveFrom: '{{timestamp}}' },
        { testStatus: [200, 400, 401, 403, 404, 500, 503] },
      ),
      postWithBody(
        'Calculate Commission',
        '/vendors/{{vendorId}}/commissions/calculate',
        { orderAmount: 1500, currency: 'BDT' },
        { testStatus: [200, 400, 401, 403, 500, 503] },
      ),
    ],
  },
  {
    name: '💸 Payouts',
    requests: [
      postWithBody(
        'Request Payout',
        '/vendors/{{vendorId}}/payouts',
        { amount: 5000, method: 'bank_transfer', notes: 'Test payout {{uniqueSuffix}}' },
        { saveAs: 'payoutId', idempotent: true, testStatus: [201, 400, 401, 403, 409, 500, 503] },
      ),
      pathGet('List Payouts', '/vendors/{{vendorId}}/payouts', 'List payouts', {
        page: '1',
        limit: '20',
      }),
      pathGet('Get Payout By ID', '/vendors/{{vendorId}}/payouts/{{payoutId}}', 'Payout by ID'),
      pathGet('Get Payout Summary', '/vendors/{{vendorId}}/payouts/summary', 'Payout stats'),
      postWithBody(
        'Approve Payout',
        '/vendors/{{vendorId}}/payouts/{{payoutId}}/approve',
        { notes: 'Approved' },
        { testStatus: [200, 400, 401, 403, 404, 409, 500, 503] },
      ),
      postWithBody(
        'Reject Payout',
        '/vendors/{{vendorId}}/payouts/{{payoutId}}/reject',
        { reason: 'Bank account unverified' },
        { testStatus: [200, 400, 401, 403, 404, 409, 500, 503] },
      ),
      postWithBody(
        'Process Payout',
        '/vendors/{{vendorId}}/payouts/{{payoutId}}/process',
        { transactionId: 'txn-{{uniqueSuffix}}' },
        { testStatus: [200, 400, 401, 403, 404, 409, 500, 503] },
      ),
    ],
  },
  {
    name: '📊 Settlements',
    requests: [pathGet('List Settlements', '/vendors/{{vendorId}}/settlements', 'List settlements')],
  },
  {
    name: '⭐ Performances',
    requests: [
      pathGet('Get Vendor Performance', '/vendors/{{vendorId}}/performances', 'Latest performance'),
    ],
  },
  {
    name: '🌟 Ratings',
    requests: [pathGet('List Vendor Ratings', '/vendors/{{vendorId}}/ratings', 'Vendor ratings')],
  },
  {
    name: '💬 Reviews',
    requests: [pathGet('List Vendor Reviews', '/vendors/{{vendorId}}/reviews', 'Vendor reviews')],
  },
  {
    name: '🚚 Shipping',
    requests: [pathGet('Get Shipping Config', '/vendors/{{vendorId}}/shippings', 'Shipping config')],
  },
  {
    name: '↩️ Return Policies',
    requests: [
      pathGet('Get Return Policy', '/vendors/{{vendorId}}/return-policys', 'Return policy'),
    ],
  },
  {
    name: '🛡️ Warranties',
    requests: [pathGet('Get Warranty', '/vendors/{{vendorId}}/warrantys', 'Warranty config')],
  },
  {
    name: '👥 Team',
    requests: [
      postWithBody(
        'Add Team Member',
        '/vendors/{{vendorId}}/team',
        { email: 'member-{{uniqueSuffix}}@example.com', role: 'vendor_staff', message: 'Welcome' },
        { saveAs: 'inviteId', idempotent: true, testStatus: [201, 400, 401, 403, 409, 500, 503] },
      ),
      pathGet('List Team Members', '/vendors/{{vendorId}}/team', 'List team', {
        page: '1',
        limit: '20',
      }),
      pathGet('Get Team Member By ID', '/vendors/{{vendorId}}/team/{{memberId}}', 'Team member by ID'),
      pathPatch(
        'Update Team Member',
        '/vendors/{{vendorId}}/team/{{memberId}}',
        { fullName: 'Updated Member' },
        { testStatus: [200, 400, 401, 403, 404, 500, 503] },
      ),
      postWithBody(
        'Assign Role',
        '/vendors/{{vendorId}}/team/{{memberId}}/role',
        { role: 'vendor_manager' },
        { testStatus: [200, 400, 401, 403, 404, 500, 503] },
      ),
      pathDelete('Remove Team Member', '/vendors/{{vendorId}}/team/{{memberId}}', {
        testStatus: [200, 204, 400, 401, 403, 404, 500, 503],
      }),
    ],
  },
  {
    name: '🎁 Features',
    requests: [pathGet('List Vendor Features', '/vendors/{{vendorId}}/features', 'List feature flags')],
  },
  {
    name: '💎 Subscriptions',
    requests: [
      postWithBody(
        'Create Subscription',
        '/vendors/{{vendorId}}/subscriptions',
        { plan: 'basic', cycle: 'monthly', startTrial: false },
        { saveAs: 'subscriptionId', testStatus: [201, 400, 401, 403, 409, 500, 503] },
      ),
      pathGet(
        'List Available Plans',
        '/vendors/{{vendorId}}/subscriptions/plans',
        'Available subscription plans (public)',
      ),
      pathGet(
        'Get Current Subscription',
        '/vendors/{{vendorId}}/subscriptions/current',
        'Current active subscription',
      ),
      postWithBody(
        'Upgrade Subscription',
        '/vendors/{{vendorId}}/subscriptions/{{subscriptionId}}/upgrade',
        { plan: 'standard' },
        { testStatus: [200, 400, 401, 403, 404, 500, 503] },
      ),
      postWithBody(
        'Downgrade Subscription',
        '/vendors/{{vendorId}}/subscriptions/{{subscriptionId}}/downgrade',
        { plan: 'free', reason: 'Cost reduction' },
        { testStatus: [200, 400, 401, 403, 404, 500, 503] },
      ),
      postWithBody(
        'Cancel Subscription',
        '/vendors/{{vendorId}}/subscriptions/{{subscriptionId}}/cancel',
        { reason: 'No longer needed', cancelAtPeriodEnd: true },
        { testStatus: [200, 400, 401, 403, 404, 500, 503] },
      ),
    ],
  },
  {
    name: '🔐 Permissions',
    requests: [
      pathGet('List Vendor Permissions', '/vendors/{{vendorId}}/permissions', 'Vendor team permissions'),
    ],
  },
];

// ─────────────────────────────────────────────
// BUILD COLLECTION
// ─────────────────────────────────────────────
function buildCollection() {
  const totalRequests = FOLDERS.reduce((s, f) => s + f.requests.length, 0);
  return {
    info: {
      _postman_id: `${SERVICE_SLUG}-v1-${new Date().getFullYear()}`,
      name: SERVICE_NAME,
      description: `Vubon.com.bd — ${SERVICE_NAME} REST API\n\nBase URL: http://localhost:${SERVICE_PORT}\nSwagger: http://localhost:${SERVICE_PORT}/api/docs\n\nGroups: ${FOLDERS.length}\nRequests: ${totalRequests}`,
      schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
    },
    auth: {
      type: 'bearer',
      bearer: [{ key: 'token', value: '{{accessToken}}', type: 'string' }],
    },
    variable: [
      { key: 'baseUrl', value: `http://localhost:${SERVICE_PORT}`, type: 'string' },
      { key: 'userId', value: SAMPLE_ID(2), type: 'string' },
      { key: 'vendorId', value: SAMPLE_ID(1), type: 'string' },
      { key: 'vendorSlug', value: 'e2e-vendor', type: 'string' },
      { key: 'verificationId', value: SAMPLE_ID(3), type: 'string' },
      { key: 'commissionId', value: SAMPLE_ID(4), type: 'string' },
      { key: 'payoutId', value: SAMPLE_ID(5), type: 'string' },
      { key: 'memberId', value: SAMPLE_ID(6), type: 'string' },
      { key: 'inviteId', value: SAMPLE_ID(7), type: 'string' },
      { key: 'subscriptionId', value: SAMPLE_ID(8), type: 'string' },
      { key: 'accessToken', value: '', type: 'string' },
    ],
    event: [
      {
        listen: 'prerequest',
        script: {
          type: 'text/javascript',
          exec: [
            "pm.variables.set('timestamp', new Date().toISOString());",
            "pm.variables.set('uniqueSuffix', Date.now().toString(36));",
          ],
        },
      },
    ],
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
  const isDev = env === 'dev';
  return {
    id: `${SERVICE_SLUG}-${env}-env`,
    name: `${SERVICE_NAME} — ${env.charAt(0).toUpperCase() + env.slice(1)}`,
    values: [
      { key: 'baseUrl', value: urls[env], enabled: true },
      { key: 'accessToken', value: '', enabled: true, type: 'secret' },
      { key: 'userId', value: isDev ? SAMPLE_ID(2) : '', enabled: true },
      { key: 'vendorId', value: isDev ? SAMPLE_ID(1) : '', enabled: true },
      { key: 'vendorSlug', value: isDev ? 'e2e-vendor' : '', enabled: true },
      { key: 'verificationId', value: isDev ? SAMPLE_ID(3) : '', enabled: true },
      { key: 'commissionId', value: isDev ? SAMPLE_ID(4) : '', enabled: true },
      { key: 'payoutId', value: isDev ? SAMPLE_ID(5) : '', enabled: true },
      { key: 'memberId', value: isDev ? SAMPLE_ID(6) : '', enabled: true },
      { key: 'inviteId', value: isDev ? SAMPLE_ID(7) : '', enabled: true },
      { key: 'subscriptionId', value: isDev ? SAMPLE_ID(8) : '', enabled: true },
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
  const totalRequests = FOLDERS.reduce((s, f) => s + f.requests.length, 0);

  // Emoji map per folder for the table
  const folderTable = FOLDERS.map((f) => {
    // Split "🏥 Health" → emoji + name
    const parts = f.name.split(' ');
    const emoji = parts[0];
    const title = parts.slice(1).join(' ');
    return `| ${emoji} | ${title} | ${f.requests.length} |`;
  }).join('\n');

  return `# Postman Collection — ${SERVICE_NAME}

Complete Postman collection for the ${SERVICE_NAME} API, auto-generated from the standard Vubon pattern.

## Summary

- **Groups:** ${FOLDERS.length}
- **Requests:** ${totalRequests}
- **Environments:** 3 (dev / staging / prod)
- **Auth:** Bearer JWT

## Files

- \`${SERVICE_NAME}.postman_collection.json\` — Main collection
- \`environments/dev.postman_environment.json\` — Local development
- \`environments/staging.postman_environment.json\` — Staging
- \`environments/prod.postman_environment.json\` — Production
- \`README.md\` — This file (auto-generated)

## Quick Start

1. Open Postman
2. **Import** → drop \`${SERVICE_NAME}.postman_collection.json\`
3. **Import** → drop \`environments/dev.postman_environment.json\`
4. Select env (top-right dropdown) → **${SERVICE_NAME} — Dev**
5. Test health: \`GET {{baseUrl}}/health\`

## Authentication

All requests inherit \`Bearer {{accessToken}}\` from the collection-level auth.

To test authenticated routes:

1. Login via Auth service → copy the \`access_token\`
2. Set collection variable \`accessToken\` (or env var)

## Variables

### Collection-level

| Variable | Purpose | Example |
|---|---|---|
| \`baseUrl\` | Service URL | \`http://localhost:${SERVICE_PORT}\` |
| \`accessToken\` | JWT (empty by default) | \`eyJ...\` |
| \`userId\` | Sample user UUID | \`${SAMPLE_ID(2)}\` |
| \`vendorId\` | Sample vendor UUID (auto-saved on create) | \`${SAMPLE_ID(1)}\` |
| \`vendorSlug\` | Sample vendor slug | \`e2e-vendor\` |
| \`verificationId\` | Auto-saved on submit | \`${SAMPLE_ID(3)}\` |
| \`commissionId\` | Auto-saved on update | \`${SAMPLE_ID(4)}\` |
| \`payoutId\` | Auto-saved on request | \`${SAMPLE_ID(5)}\` |
| \`memberId\` | Sample team member UUID | \`${SAMPLE_ID(6)}\` |
| \`inviteId\` | Auto-saved on invite | \`${SAMPLE_ID(7)}\` |
| \`subscriptionId\` | Auto-saved on create | \`${SAMPLE_ID(8)}\` |
| \`uniqueSuffix\` | Auto-generated per request | \`lx9k2j\` |
| \`timestamp\` | ISO timestamp per request | \`2026-10-14T...\` |

## Endpoint Groups (${FOLDERS.length} folders)

| Emoji | Group | Requests |
|---|---|---:|
${folderTable}

## Auto-Save Behaviour

The following requests auto-save IDs into collection variables on success:

- **Register Vendor** → \`vendorId\`
- **Submit Verification** → \`verificationId\`
- **Request Payout** → \`payoutId\`
- **Add Team Member** → \`inviteId\`
- **Create Subscription** → \`subscriptionId\`

After running one of these, subsequent requests using \`{{<concept>Id}}\` will resolve automatically.

## Idempotency

POST requests that create resources send \`Idempotency-Key: <action>-{{uniqueSuffix}}\` header automatically. This allows safe retries without duplicate creation.

## Running with Newman

\`\`\`bash
# Install newman once
npm install -g newman

# Run against dev
newman run "${SERVICE_NAME}.postman_collection.json" \\
  -e "environments/dev.postman_environment.json" \\
  --bail

# Run against staging with token
newman run "${SERVICE_NAME}.postman_collection.json" \\
  -e "environments/staging.postman_environment.json" \\
  --env-var "accessToken=\\$STAGING_TOKEN" \\
  --reporters cli,json \\
  --reporter-json-export ./newman-report.json
\`\`\`

## Regenerating

\`\`\`bash
cd ~/vubon.com.bd/apps/${SERVICE_SLUG}
node scripts/generate-postman-collection.mjs
\`\`\`

Or via pnpm:

\`\`\`bash
pnpm generate:postman
\`\`\`

## Notes

- **Termux / degraded mode:** Some tests accept a range of statuses (200, 400, 401, 403, 404, 409, 500, 503) because the Prisma engine may be unavailable in Termux ARM64.
- **Auto-save IDs:** Successful creates auto-save the returned ID into collection variables.
- **Environment switcher:** Same collection works with different \`baseUrl\` per environment.

---

🤖 Auto-generated by \`scripts/generate-postman-collection.mjs\`
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

  const totalRequests = FOLDERS.reduce((s, f) => s + f.requests.length, 0);
  console.log(`\n📊 ${FOLDERS.length} folders · ${totalRequests} requests · 3 environments`);
}

main();
