#!/usr/bin/env node
/**
 * Postman Collection Generator — Payment Service
 * @module payment-service/scripts
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
const SERVICE_NAME = 'Payment Service';
const SERVICE_PORT = 3006;
const SERVICE_SLUG = 'payment-service';
const STAGING_URL = 'https://payments-staging.vubon.com.bd';
const PROD_URL = 'https://payments.vubon.com.bd';

// ─────────────────────────────────────────────
// HELPER BUILDERS
// ─────────────────────────────────────────────
function simpleGet(name, path, description = '', query = null, noAuth = false) {
  const url = {
    raw: `{{baseUrl}}/api${path}` + (query ? '?' + Object.entries(query).map(([k, v]) => `${k}=${v}`).join('&') : ''),
    host: ['{{baseUrl}}'],
    path: path.split('/').filter(Boolean),
  };
  if (query) {
    url.query = Object.entries(query).map(([key, value]) => ({ key, value }));
  }
  const req = { name, request: { method: 'GET', header: [], url, description } };
  if (noAuth) req.request.auth = { type: 'noauth' };
  return req;
}

function pathGet(name, path, description = '') {
  return simpleGet(name, path, description);
}

function postWithBody(name, path, body, options = {}) {
  const headers = [{ key: 'Content-Type', value: 'application/json' }];
  if (options.idempotency) {
    headers.push({ key: 'Idempotency-Key', value: `${options.idempotency}-{{uniqueSuffix}}` });
  }
  if (options.extraHeaders) {
    for (const h of options.extraHeaders) headers.push(h);
  }

  const request = {
    name,
    request: {
      method: 'POST',
      header: headers,
      body: { mode: 'raw', raw: JSON.stringify(body, null, 2) },
      url: {
        raw: `{{baseUrl}}/api${path}`,
        host: ['{{baseUrl}}'],
        path: path.split('/').filter(Boolean),
      },
    },
  };

  if (options.noAuth) request.request.auth = { type: 'noauth' };

  if (options.saveAs || options.assertStatuses) {
    const statuses = options.assertStatuses ?? [200, 201, 400, 401, 404, 409, 422, 500, 503];
    const execLines = [
      `pm.test('Status is one of expected', () => pm.expect([${statuses.join(', ')}]).to.include(pm.response.code));`,
    ];
    if (options.saveAs) {
      execLines.push(`if ([200, 201].includes(pm.response.code)) {`);
      execLines.push(`  try {`);
      execLines.push(`    const json = pm.response.json();`);
      execLines.push(`    if (json && json.${options.saveAs}) {`);
      execLines.push(`      pm.collectionVariables.set('${options.saveAs}', json.${options.saveAs});`);
      execLines.push(`      pm.test('Has ${options.saveAs}', () => pm.expect(json).to.have.property('${options.saveAs}'));`);
      execLines.push(`    }`);
      execLines.push(`  } catch (e) { /* not JSON */ }`);
      execLines.push(`}`);
    }
    request.event = [{
      listen: 'test',
      script: { type: 'text/javascript', exec: execLines },
    }];
  }

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
        raw: `{{baseUrl}}/api${path}`,
        host: ['{{baseUrl}}'],
        path: path.split('/').filter(Boolean),
      },
    },
  };
}

function pathDelete(name, path) {
  return {
    name,
    request: {
      method: 'DELETE',
      header: [],
      url: {
        raw: `{{baseUrl}}/api${path}`,
        host: ['{{baseUrl}}'],
        path: path.split('/').filter(Boolean),
      },
    },
  };
}

// ─────────────────────────────────────────────
// FOLDERS
// ─────────────────────────────────────────────
const FOLDERS = [
  // ═══════════ HEALTH ═══════════
  {
    name: '🏥 Health',
    requests: [
      simpleGet('Health Check', '/health', 'Service health check. Public endpoint.', null, true),
      simpleGet('Readiness Check', '/health/ready', 'Kubernetes readiness probe. Public endpoint.', null, true),
    ],
  },

  // ═══════════ PAYMENTS ═══════════
  {
    name: '💳 Payments',
    requests: [
      postWithBody('Initiate Payment', '/payments', {
        orderId: '00000000-0000-0000-0000-000000000006',
        method: 'card',
        gateway: 'stripe',
        amount: 1500.0,
        currency: 'BDT',
        returnUrl: 'https://app.vubon.com.bd/payments/callback',
      }, { idempotency: 'init-payment', saveAs: 'paymentId' }),

      simpleGet('List Payments', '/payments', 'Paginated list of payments.', { page: '1', limit: '20' }),

      simpleGet('Get Payment Stats', '/payments/stats', 'Aggregated payment statistics.'),

      pathGet('Get Payments by Order', '/payments/order/{{orderId}}', 'All payments for an order.'),

      pathGet('Get Payment By ID', '/payments/{{paymentId}}'),

      postWithBody('Confirm Payment', '/payments/{{paymentId}}/confirm', {
        gatewayReference: 'pi_test_confirm_123',
        confirmedAmount: 1500.0,
      }, { assertStatuses: [200, 400, 404, 409, 422] }),

      postWithBody('Verify Payment', '/payments/{{paymentId}}/verify', {
        gatewaySignature: 'sig_test_verify',
        gatewayData: { trxID: 'TEST_TRX_1' },
      }, { assertStatuses: [200, 400, 404, 422] }),

      postWithBody('Cancel Payment', '/payments/{{paymentId}}/cancel', {
        reason: 'Customer requested cancellation',
      }, { assertStatuses: [200, 400, 404, 409, 422] }),

      postWithBody('Retry Payment', '/payments/{{paymentId}}/retry', {
        gateway: 'stripe',
        reason: 'Retry after transient failure',
      }, { assertStatuses: [200, 400, 404, 409, 422] }),
    ],
  },

  // ═══════════ PAYMENT METHODS ═══════════
  {
    name: '🔖 Payment Methods',
    requests: [
      postWithBody('Add Payment Method', '/payment-methods', {
        method: 'card',
        type: 'online',
        gateway: 'stripe',
        cardToken: 'tok_visa_test_{{uniqueSuffix}}',
        last4: '4242',
        brand: 'visa',
        expiryMonth: 12,
        expiryYear: 2030,
        holderName: 'Test User',
        isDefault: true,
      }, { saveAs: 'paymentMethodId' }),

      simpleGet('List My Payment Methods', '/payment-methods', 'List payment methods for current user.', { page: '1', limit: '20' }),

      pathGet('Get Payment Method', '/payment-methods/{{paymentMethodId}}'),

      pathPatch('Update Payment Method', '/payment-methods/{{paymentMethodId}}', {
        label: 'My Primary Card',
        holderName: 'Updated Name',
      }),

      postWithBody('Set Default Payment Method', '/payment-methods/{{paymentMethodId}}/default', {}),

      pathDelete('Delete Payment Method', '/payment-methods/{{paymentMethodId}}'),
    ],
  },

  // ═══════════ PAYMENT GATEWAYS ═══════════
  {
    name: '🔌 Payment Gateways',
    requests: [
      simpleGet('List Gateways', '/payment-gateways', 'List all configured payment gateways.', { page: '1', limit: '20' }),
      simpleGet('Gateway Health', '/payment-gateways/health', 'Health status of all gateway adapters.'),
    ],
  },

  // ═══════════ TRANSACTIONS ═══════════
  {
    name: '💰 Transactions',
    requests: [
      postWithBody('Create Transaction', '/transactions', {
        paymentId: '{{paymentId}}',
        type: 'payment',
        amount: 1500.0,
        currency: 'BDT',
        reference: 'txn-ref-{{uniqueSuffix}}',
      }, { saveAs: 'transactionId' }),

      simpleGet('List Transactions', '/transactions', 'List all transactions.', { page: '1', limit: '20', paymentId: '{{paymentId}}' }),

      pathGet('Get Transaction By ID', '/transactions/{{transactionId}}'),

      postWithBody('Reverse Transaction', '/transactions/{{transactionId}}/reverse', {
        reason: 'Duplicate charge reversal',
      }, { assertStatuses: [200, 400, 404, 409, 422] }),
    ],
  },

  // ═══════════ REFUNDS ═══════════
  {
    name: '💸 Refunds',
    requests: [
      postWithBody('Request Refund', '/refunds/payments/{{paymentId}}', {
        amount: 500.0,
        reason: 'customer_request',
        note: 'Partial refund for damaged items',
      }, { idempotency: 'refund-request', saveAs: 'refundId' }),

      simpleGet('List Refunds', '/refunds', 'List all refunds.', { page: '1', limit: '20', paymentId: '{{paymentId}}' }),

      pathGet('Get Refund By ID', '/refunds/{{refundId}}'),

      postWithBody('Approve Refund', '/refunds/{{refundId}}/approve', {
        approvedAmount: 500.0,
        note: 'Approved by admin',
      }, { assertStatuses: [200, 400, 404, 409, 422] }),

      postWithBody('Reject Refund', '/refunds/{{refundId}}/reject', {
        reason: 'Outside refund window',
      }, { assertStatuses: [200, 400, 404, 409, 422] }),

      postWithBody('Partial Refund', '/refunds/partial', {
        paymentId: '{{paymentId}}',
        amount: 200.0,
        currency: 'BDT',
        reason: 'Partial refund for one item',
      }, { assertStatuses: [201, 400, 404, 422] }),
    ],
  },

  // ═══════════ SPLIT PAYMENTS ═══════════
  {
    name: '🔀 Split Payments',
    requests: [
      postWithBody('Create Split Payment', '/split-payments', {
        paymentId: '{{paymentId}}',
        type: 'percentage',
        totalAmount: 1500.0,
        currency: 'BDT',
        receivers: [
          { receiverId: 'vendor-1', percentage: 60 },
          { receiverId: 'vendor-2', percentage: 40 },
        ],
      }, { assertStatuses: [201, 400, 404, 422] }),

      simpleGet('List Split Payments by Payment', '/split-payments/payment/{{paymentId}}', 'Splits for a specific payment.'),
    ],
  },

  // ═══════════ RECURRING PAYMENTS ═══════════
  {
    name: '🔁 Recurring Payments',
    requests: [
      postWithBody('Create Recurring Payment', '/recurring-payments', {
        paymentId: '{{paymentId}}',
        amount: 999.0,
        currency: 'BDT',
        interval: 'monthly',
        intervalCount: 1,
        startAt: new Date(Date.now() + 86400000).toISOString(),
      }, { saveAs: 'recurringId', assertStatuses: [201, 400, 404, 422] }),

      pathGet('Get Recurring Payment By ID', '/recurring-payments/{{recurringId}}'),

      postWithBody('Pause Recurring Payment', '/recurring-payments/{{recurringId}}/pause', {
        reason: 'Customer requested pause',
      }, { assertStatuses: [200, 400, 404, 409, 422] }),

      postWithBody('Cancel Recurring Payment', '/recurring-payments/{{recurringId}}/cancel', {
        reason: 'Customer requested cancellation',
      }, { assertStatuses: [200, 400, 404, 409, 422] }),
    ],
  },

  // ═══════════ SUBSCRIPTIONS ═══════════
  {
    name: '📅 Subscriptions',
    requests: [
      postWithBody('Create Subscription', '/subscriptions', {
        plan: 'premium',
        interval: 'monthly',
        intervalCount: 1,
        price: 999.0,
        currency: 'BDT',
        method: 'card',
        gateway: 'stripe',
        trialDays: 7,
      }, { saveAs: 'subscriptionId', assertStatuses: [201, 400, 404, 409, 422] }),

      simpleGet('List Subscriptions', '/subscriptions', 'List subscriptions.', { page: '1', limit: '20' }),

      pathGet('Get Subscription By ID', '/subscriptions/{{subscriptionId}}'),

      postWithBody('Upgrade Subscription', '/subscriptions/{{subscriptionId}}/upgrade', {
        newPlan: 'enterprise',
        newPrice: 1999.0,
        currency: 'BDT',
        prorate: true,
      }, { assertStatuses: [200, 400, 404, 409, 422] }),

      postWithBody('Downgrade Subscription', '/subscriptions/{{subscriptionId}}/downgrade', {
        newPlan: 'basic',
        newPrice: 499.0,
        currency: 'BDT',
        effectiveAt: 'period_end',
      }, { assertStatuses: [200, 400, 404, 409, 422] }),

      postWithBody('Pause Subscription', '/subscriptions/{{subscriptionId}}/pause', {
        reason: 'Customer requested pause',
      }, { assertStatuses: [200, 400, 404, 409, 422] }),

      postWithBody('Cancel Subscription', '/subscriptions/{{subscriptionId}}/cancel', {
        reason: 'Customer requested cancellation',
        cancelAtPeriodEnd: true,
      }, { assertStatuses: [200, 400, 404, 409, 422] }),
    ],
  },

  // ═══════════ INVOICES ═══════════
  {
    name: '📄 Invoices',
    requests: [
      postWithBody('Generate Invoice', '/invoices', {
        userId: '00000000-0000-0000-0000-000000000007',
        subtotal: 1000.0,
        taxAmount: 150.0,
        currency: 'BDT',
        dueAt: new Date(Date.now() + 15 * 86400000).toISOString(),
        notes: 'Auto-generated invoice',
      }, { saveAs: 'invoiceId', assertStatuses: [201, 400, 404, 409, 422] }),

      simpleGet('List Invoices', '/invoices', 'List invoices.', { page: '1', limit: '20' }),

      pathGet('Get Invoice By ID', '/invoices/{{invoiceId}}'),

      postWithBody('Send Invoice', '/invoices/{{invoiceId}}/send', {
        channel: 'email',
        recipientEmail: 'customer@example.com',
        message: 'Please find your invoice attached.',
      }, { assertStatuses: [200, 400, 404, 422] }),

      postWithBody('Void Invoice', '/invoices/{{invoiceId}}/void', {
        reason: 'Duplicate invoice',
      }, { assertStatuses: [200, 400, 404, 409, 422] }),
    ],
  },

  // ═══════════ VERIFICATIONS ═══════════
  {
    name: '🔐 Verifications',
    requests: [
      postWithBody('Initiate Verification', '/verifications/payments/{{paymentId}}', {
        method: 'otp_sms',
        ttlSeconds: 600,
      }, { saveAs: 'verificationId', assertStatuses: [201, 400, 404, 409, 422] }),

      pathGet('Get Verification By ID', '/verifications/{{verificationId}}'),

      postWithBody('Verify Code', '/verifications/{{verificationId}}/verify', {
        code: '123456',
      }, { assertStatuses: [200, 400, 404, 409, 422] }),
    ],
  },

  // ═══════════ ANALYTICS ═══════════
  {
    name: '📊 Analytics',
    requests: [
      simpleGet('Revenue Analytics', '/analytics/revenue', 'Revenue stats.', { userId: '', fromDate: '', toDate: '' }),
      simpleGet('Payment Methods Analytics', '/analytics/payment-methods', 'Payment method distribution.', { userId: '', fromDate: '', toDate: '' }),
    ],
  },

  // ═══════════ WEBHOOKS ═══════════
  {
    name: '🪝 Webhooks',
    requests: [
      postWithBody('bKash Webhook', '/webhooks/bkash', {
        paymentID: 'TR0011abc123',
        trxID: 'BK123456789',
        amount: '1500.00',
        currency: 'BDT',
        transactionStatus: 'Completed',
        signature: 'test_sig_bkash',
      }, {
        noAuth: true,
        extraHeaders: [{ key: 'X-Bkash-Signature', value: 'test_sig_bkash' }],
        assertStatuses: [200, 400, 401, 404, 422, 500, 503],
      }),

      postWithBody('Nagad Webhook', '/webhooks/nagad', {
        orderId: '{{paymentId}}',
        paymentRefId: 'NG123456',
        amount: '1500.00',
        status: 'Success',
        issuerPaymentRefNo: 'ISSUER123',
        signature: 'test_sig_nagad',
      }, {
        noAuth: true,
        extraHeaders: [{ key: 'X-Signature', value: 'test_sig_nagad' }],
        assertStatuses: [200, 400, 401, 404, 422, 500, 503],
      }),

      postWithBody('Rocket Webhook', '/webhooks/rocket', {
        orderId: '{{paymentId}}',
        rocketPaymentId: 'RCK123456',
        amount: '1500.00',
        status: 'Success',
        signature: 'test_sig_rocket',
      }, {
        noAuth: true,
        extraHeaders: [{ key: 'X-Signature', value: 'test_sig_rocket' }],
        assertStatuses: [200, 400, 401, 404, 422, 500, 503],
      }),

      postWithBody('Stripe Webhook', '/webhooks/stripe', {
        id: 'evt_test_{{uniqueSuffix}}',
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_test_123',
            amount: 150000,
            currency: 'bdt',
            metadata: { paymentId: '{{paymentId}}' },
          },
        },
      }, {
        noAuth: true,
        extraHeaders: [{ key: 'Stripe-Signature', value: 't=123,v1=test_sig_stripe' }],
        assertStatuses: [200, 400, 401, 404, 422, 500, 503],
      }),

      postWithBody('PayPal Webhook', '/webhooks/paypal', {
        id: 'WH-TEST-{{uniqueSuffix}}',
        event_type: 'PAYMENT.CAPTURE.COMPLETED',
        resource: {
          id: 'CAPTURE-1',
          custom_id: '{{paymentId}}',
          amount: { value: '15.00', currency_code: 'USD' },
        },
      }, {
        noAuth: true,
        extraHeaders: [{ key: 'PayPal-Transmission-Sig', value: 'test_sig_paypal' }],
        assertStatuses: [200, 400, 401, 404, 422, 500, 503],
      }),

      postWithBody('SSLCommerz Webhook', '/webhooks/sslcommerz', {
        tran_id: '{{paymentId}}',
        val_id: 'VAL_{{uniqueSuffix}}',
        amount: '1500.00',
        status: 'VALID',
        verify_sign: 'test_verify_sign',
        verify_key: 'test_verify_key',
      }, {
        noAuth: true,
        assertStatuses: [200, 400, 401, 404, 422, 500, 503],
      }),

      postWithBody('aamarPay Webhook', '/webhooks/aamarpay', {
        mer_txnid: '{{paymentId}}',
        pg_txnid: 'PG_{{uniqueSuffix}}',
        amount: '1500.00',
        pay_status: 'Successful',
        status_code: '2',
      }, {
        noAuth: true,
        assertStatuses: [200, 400, 401, 404, 422, 500, 503],
      }),

      postWithBody('Crypto Webhook', '/webhooks/crypto', {
        txHash: '0xabc{{uniqueSuffix}}',
        fromAddress: '0xfrom123',
        amount: '1500.00',
        currency: 'USDT',
        status: 'confirmed',
        confirmations: 6,
      }, {
        noAuth: true,
        assertStatuses: [200, 400, 401, 404, 422, 500, 503],
      }),
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
      description: `Vubon.com.bd — ${SERVICE_NAME} REST API\n\nBase URL: http://localhost:${SERVICE_PORT}\nSwagger: http://localhost:${SERVICE_PORT}/api/docs\n\n## Auth\nCollection uses Bearer token by default. Health + webhooks are public. Set {{accessToken}} env var.\n\n## Idempotency\nPayment + Refund creation require Idempotency-Key header (auto-set via {{uniqueSuffix}}).\n\n## Flows\n1. Initiate Payment → paymentId auto-saved\n2. Confirm / Verify / Cancel / Retry payment\n3. Request Refund → refundId auto-saved\n4. Approve / Reject refund`,
      schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
    },
    auth: {
      type: 'bearer',
      bearer: [{ key: 'token', value: '{{accessToken}}', type: 'string' }],
    },
    variable: [
      { key: 'baseUrl', value: `http://localhost:${SERVICE_PORT}`, type: 'string' },
      { key: 'orderId', value: '00000000-0000-0000-0000-000000000006', type: 'string' },
      { key: 'userId', value: '00000000-0000-0000-0000-000000000007', type: 'string' },
      { key: 'paymentId', value: '00000000-0000-0000-0000-000000000001', type: 'string' },
      { key: 'refundId', value: '00000000-0000-0000-0000-000000000002', type: 'string' },
      { key: 'subscriptionId', value: '00000000-0000-0000-0000-000000000003', type: 'string' },
      { key: 'invoiceId', value: '00000000-0000-0000-0000-000000000004', type: 'string' },
      { key: 'paymentMethodId', value: '00000000-0000-0000-0000-000000000005', type: 'string' },
      { key: 'transactionId', value: '00000000-0000-0000-0000-000000000008', type: 'string' },
      { key: 'recurringId', value: '00000000-0000-0000-0000-000000000009', type: 'string' },
      { key: 'verificationId', value: '00000000-0000-0000-0000-00000000000a', type: 'string' },
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
    item: FOLDERS.map((folder) => ({
      name: folder.name,
      item: folder.requests,
    })),
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
  const sampleIds = env === 'dev'
    ? {
        orderId: '00000000-0000-0000-0000-000000000006',
        userId: '00000000-0000-0000-0000-000000000007',
        paymentId: '00000000-0000-0000-0000-000000000001',
        refundId: '00000000-0000-0000-0000-000000000002',
        subscriptionId: '00000000-0000-0000-0000-000000000003',
        invoiceId: '00000000-0000-0000-0000-000000000004',
        paymentMethodId: '00000000-0000-0000-0000-000000000005',
        transactionId: '00000000-0000-0000-0000-000000000008',
        recurringId: '00000000-0000-0000-0000-000000000009',
        verificationId: '00000000-0000-0000-0000-00000000000a',
      }
    : {
        orderId: '', userId: '', paymentId: '', refundId: '', subscriptionId: '',
        invoiceId: '', paymentMethodId: '', transactionId: '', recurringId: '', verificationId: '',
      };

  return {
    id: `${SERVICE_SLUG}-${env}-env`,
    name: `${SERVICE_NAME} — ${env.charAt(0).toUpperCase() + env.slice(1)}`,
    values: [
      { key: 'baseUrl', value: urls[env], enabled: true },
      { key: 'accessToken', value: '', enabled: true, type: 'secret' },
      { key: 'orderId', value: sampleIds.orderId, enabled: true },
      { key: 'userId', value: sampleIds.userId, enabled: true },
      { key: 'paymentId', value: sampleIds.paymentId, enabled: true },
      { key: 'refundId', value: sampleIds.refundId, enabled: true },
      { key: 'subscriptionId', value: sampleIds.subscriptionId, enabled: true },
      { key: 'invoiceId', value: sampleIds.invoiceId, enabled: true },
      { key: 'paymentMethodId', value: sampleIds.paymentMethodId, enabled: true },
      { key: 'transactionId', value: sampleIds.transactionId, enabled: true },
      { key: 'recurringId', value: sampleIds.recurringId, enabled: true },
      { key: 'verificationId', value: sampleIds.verificationId, enabled: true },
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
  const totalRequests = FOLDERS.reduce((sum, f) => sum + f.requests.length, 0);
  const folderRows = FOLDERS.map(
    (f) => `| ${f.name} | ${f.requests.length} |`,
  ).join('\n');

  return `# Postman Collection — ${SERVICE_NAME}

Complete Postman collection for **${SERVICE_NAME}** REST API.

---

## 📁 Files

| File | Purpose |
|------|---------|
| \`${SERVICE_NAME}.postman_collection.json\` | Main collection — ${FOLDERS.length} folders · ${totalRequests} requests |
| \`environments/dev.postman_environment.json\` | Local dev (\`http://localhost:${SERVICE_PORT}\`) |
| \`environments/staging.postman_environment.json\` | Staging (\`${STAGING_URL}\`) |
| \`environments/prod.postman_environment.json\` | Production (\`${PROD_URL}\`) |

---

## 🚀 Quick Start

### 1. Import into Postman

\`\`\`
Postman → Import → Drag & drop both files:
  1. ${SERVICE_NAME}.postman_collection.json
  2. environments/dev.postman_environment.json
\`\`\`

### 2. Select environment

Top-right dropdown → **${SERVICE_NAME} — Dev**

### 3. Set auth token

Open environment → set \`accessToken\` with a valid JWT.

\`\`\`bash
# Obtain JWT from identity-service
curl -X POST http://localhost:3001/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"test@vubon.com.bd","password":"Test123!"}'
\`\`\`

Copy \`accessToken\` from response → paste into env.

### 4. Test health

Open **🏥 Health → Health Check** → Send

Expected: \`200 OK\`

---

## 🎯 Testing Flows

### Flow 1 — Payment Lifecycle

\`\`\`
1. 💳 Payments → Initiate Payment      ← saves {{paymentId}}
2. 💳 Payments → Confirm Payment
3. 💳 Payments → Get Payment By ID
4. 💳 Payments → Verify Payment        ← optional
\`\`\`

### Flow 2 — Refund Lifecycle

\`\`\`
1. 💸 Refunds → Request Refund         ← saves {{refundId}}
2. 💸 Refunds → Approve Refund
3. 💸 Refunds → Get Refund By ID
\`\`\`

### Flow 3 — Subscription Lifecycle

\`\`\`
1. 📅 Subscriptions → Create Subscription   ← saves {{subscriptionId}}
2. 📅 Subscriptions → Upgrade Subscription
3. 📅 Subscriptions → Pause Subscription
4. 📅 Subscriptions → Cancel Subscription
\`\`\`

### Flow 4 — Invoice Lifecycle

\`\`\`
1. 📄 Invoices → Generate Invoice    ← saves {{invoiceId}}
2. 📄 Invoices → Send Invoice
3. 📄 Invoices → Void Invoice        ← optional
\`\`\`

### Flow 5 — Webhook Testing

Each webhook endpoint (\`🪝 Webhooks\`) expects a specific signature header:

| Gateway | Header | Example |
|---------|--------|---------|
| bKash | \`X-Bkash-Signature\` | \`test_sig_bkash\` |
| Nagad | \`X-Signature\` | \`test_sig_nagad\` |
| Rocket | \`X-Signature\` | \`test_sig_rocket\` |
| Stripe | \`Stripe-Signature\` | \`t=123,v1=test_sig\` |
| PayPal | \`PayPal-Transmission-Sig\` | \`test_sig_paypal\` |
| SSLCommerz | (body-based) | \`verify_sign\` in body |
| aamarPay | (body-based) | \`status_code\` in body |
| Crypto | (body-based) | \`status=confirmed\` + 6 confirmations |

Webhooks are \`@Public()\` — no auth needed. Send with signature header for full verification path.

---

## 🔐 Authentication

**Default**: Bearer JWT for all endpoints.

- Health endpoints: \`@Public()\` — no auth
- Webhook endpoints: \`@Public()\` — no auth, but signature required

Set env var: \`accessToken\`

---

## 🆔 Idempotency

\`POST /payments\` and \`POST /refunds/payments/:id\` require \`Idempotency-Key\` header.

Collection auto-generates via \`{{uniqueSuffix}}\`:

\`\`\`
Idempotency-Key: init-payment-<uniqueSuffix>
\`\`\`

---

## 📊 Folders (${FOLDERS.length})

| Folder | Requests |
|--------|----------|
${folderRows}

**Total: ${totalRequests} requests**

---

## 🌍 Environments

| Env | baseUrl |
|-----|---------|
| Dev | \`http://localhost:${SERVICE_PORT}\` |
| Staging | \`${STAGING_URL}\` |
| Prod | \`${PROD_URL}\` |

---

## 🔄 Auto-Saved IDs

Each flow saves IDs to collection variables:

| Flow | Variable | Set By |
|------|----------|--------|
| Payment | \`{{paymentId}}\` | Initiate Payment |
| Payment Method | \`{{paymentMethodId}}\` | Add Payment Method |
| Transaction | \`{{transactionId}}\` | Create Transaction |
| Refund | \`{{refundId}}\` | Request Refund |
| Recurring | \`{{recurringId}}\` | Create Recurring Payment |
| Subscription | \`{{subscriptionId}}\` | Create Subscription |
| Invoice | \`{{invoiceId}}\` | Generate Invoice |
| Verification | \`{{verificationId}}\` | Initiate Verification |

Chain flows without copy-pasting IDs.

---

## 🧪 Running with Newman (CLI)

\`\`\`bash
# Install newman globally
npm install -g newman

# Run collection against dev
newman run "postman/${SERVICE_NAME}.postman_collection.json" \\
  -e "postman/environments/dev.postman_environment.json" \\
  --bail \\
  --reporters cli,json \\
  --reporter-json-export newman-report.json
\`\`\`

---

## 🔁 Regenerate Collection

If endpoints change, regenerate:

\`\`\`bash
cd apps/${SERVICE_SLUG}
node scripts/generate-postman-collection.mjs
\`\`\`

Or via npm:

\`\`\`bash
pnpm generate:postman
\`\`\`

---

## 📝 Notes

- Test assertions use multi-status acceptance (\`[200, 201, 400, 401, 404, 409, 422, 500, 503]\`) — resilient in degraded mode (no Prisma engine on Termux)
- \`DISABLE_AUTH=true\` env + \`NODE_ENV!=production\` bypasses JWT guard for local dev
- All timestamps use ISO 8601
- All amounts: max 2 decimals, currency: 3-letter ISO code
`;
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

  // README
  const readmePath = join(POSTMAN_DIR, 'README.md');
  writeFileSync(readmePath, buildReadme(), 'utf8');
  console.log(`✅ README: ${readmePath}`);

  const totalRequests = FOLDERS.reduce((sum, f) => sum + f.requests.length, 0);
  console.log(`\n📊 ${FOLDERS.length} folders · ${totalRequests} requests`);
}

main();
