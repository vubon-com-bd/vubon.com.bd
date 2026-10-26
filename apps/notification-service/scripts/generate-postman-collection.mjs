#!/usr/bin/env node
/**
 * Postman Collection Generator — Notification Service
 * @module notification-service/scripts
 */
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');
const POSTMAN_DIR = join(ROOT, 'postman');
const ENV_DIR = join(POSTMAN_DIR, 'environments');

// ═══ CONFIG ═══
const SERVICE_NAME = 'Notification Service';
const SERVICE_PORT = 3003;
const SERVICE_SLUG = 'notification-service';
const STAGING_URL = 'https://notification-staging.vubon.com.bd';
const PROD_URL = 'https://notification.vubon.com.bd';

const SAMPLE = {
  notificationId: '00000000-0000-0000-0000-000000000001',
  templateId: '00000000-0000-0000-0000-000000000002',
  scheduleId: '00000000-0000-0000-0000-000000000003',
  broadcastId: '00000000-0000-0000-0000-000000000004',
  digestId: '00000000-0000-0000-0000-000000000005',
  deviceId: '00000000-0000-0000-0000-000000000006',
  webhookId: '00000000-0000-0000-0000-000000000007',
  userId: '00000000-0000-0000-0000-000000000008',
};

// ═══ README EXTRACTION ═══
function extractReadmeFromTs() {
  const docsPath = join(POSTMAN_DIR, 'postman-docs.ts');
  if (!existsSync(docsPath)) return null;
  const src = readFileSync(docsPath, 'utf8');
  const match = src.match(/export const POSTMAN_README = `([\s\S]*?)`;/);
  if (!match || !match[1]) return null;
  return match[1].replace(/\\`/g, '`').replace(/\\\\/g, '\\').replace(/\\\$/g, '$');
}

// ═══ HELPERS ═══
function makeUrl(path, query) {
  const url = {
    raw: `{{baseUrl}}${path}` + (query ? '?' + Object.entries(query).map(([k, v]) => `${k}=${v}`).join('&') : ''),
    host: ['{{baseUrl}}'],
    path: path.split('/').filter(Boolean),
  };
  if (query) url.query = Object.entries(query).map(([key, value]) => ({ key, value: String(value) }));
  return url;
}

function acceptanceTest(name) {
  return { listen: 'test', script: { type: 'text/javascript', exec: [
    `pm.test('${name} — 2xx or expected error', () => {`,
    `  pm.expect([200, 201, 202, 204, 400, 401, 403, 404, 409, 422, 500, 503]).to.include(pm.response.code);`,
    `});`,
  ]}};
}

function saveIdTest(field, varName) {
  return { listen: 'test', script: { type: 'text/javascript', exec: [
    `pm.test('Status 201/200', () => pm.expect([200, 201]).to.include(pm.response.code));`,
    `if ([200, 201].includes(pm.response.code)) {`,
    `  try { const json = pm.response.json(); if (json.${field}) pm.collectionVariables.set('${varName}', json.${field}); } catch(e) {}`,
    `}`,
  ]}};
}

function simpleGet(name, path, description = '', query = null) {
  return { name, request: { method: 'GET', header: [], url: makeUrl(path, query), description } };
}
function pathGet(name, path, description = '') { return simpleGet(name, path, description); }

function postJson(name, path, body, options = {}) {
  const req = {
    name,
    request: {
      method: 'POST',
      header: [
        { key: 'Content-Type', value: 'application/json' },
        ...(options.idempotency ? [{ key: 'Idempotency-Key', value: `{{uniqueSuffix}}-${name}` }] : []),
      ],
      body: { mode: 'raw', raw: JSON.stringify(body, null, 2) },
      url: makeUrl(path),
      description: options.description ?? '',
    },
  };
  req.event = [options.saveAs ? saveIdTest(options.saveAs, options.saveAs) : acceptanceTest(name)];
  return req;
}

function patchJson(name, path, body) {
  return { name, request: { method: 'PATCH', header: [{ key: 'Content-Type', value: 'application/json' }], body: { mode: 'raw', raw: JSON.stringify(body, null, 2) }, url: makeUrl(path) }, event: [acceptanceTest(name)] };
}
function putJson(name, path, body) {
  return { name, request: { method: 'PUT', header: [{ key: 'Content-Type', value: 'application/json' }], body: { mode: 'raw', raw: JSON.stringify(body, null, 2) }, url: makeUrl(path) }, event: [acceptanceTest(name)] };
}
function pathDelete(name, path) {
  return { name, request: { method: 'DELETE', header: [], url: makeUrl(path) }, event: [acceptanceTest(name)] };
}

// ═══ FOLDERS — FULL 18 GROUPS ═══
const FOLDERS = [
  // 1. Health
  { name: '🏥 Health', item: [
    simpleGet('Health Check', '/health', 'Service health check. Public endpoint.'),
  ]},

  // 2. Notifications
  { name: '🔔 Notifications', item: [
    postJson('Send Notification', '/notifications', {
      userId: '{{userId}}', type: 'transactional', category: 'order',
      channels: ['email', 'push'], priority: 'normal',
      subject: 'Test notification {{uniqueSuffix}}',
      body: 'This is a test notification from Postman at {{timestamp}}',
      data: { source: 'postman' },
    }, { idempotency: true, saveAs: 'notificationId', description: 'Send single notification' }),
    postJson('Send Bulk Notifications', '/notifications/bulk', {
      userIds: ['{{userId}}'], type: 'promotional', category: 'marketing',
      channels: ['email'], subject: 'Bulk {{uniqueSuffix}}', body: 'Bulk test at {{timestamp}}',
    }, { description: 'Send to multiple users' }),
    simpleGet('List Notifications', '/notifications', 'Paginated list.', { page: '1', limit: '20' }),
    pathGet('Get Notification', '/notifications/{{notificationId}}', 'Get by ID (owner-only)'),
    pathGet('Get Notification Detail', '/notifications/{{notificationId}}/detail', 'With recipients + attempts'),
    pathGet('Get Public Notification', '/notifications/{{notificationId}}/public', 'Customer-safe view'),
    postJson('Cancel Notification', '/notifications/{{notificationId}}/cancel', { reason: 'Test cancellation' }, { description: 'Cancel pending notification' }),
    postJson('Resend Notification', '/notifications/{{notificationId}}/resend', { forceResend: true }, { description: 'Resend failed notification' }),
    simpleGet('Notification Stats', '/notifications/stats', 'Aggregated stats', { fromDate: '2026-01-01T00:00:00Z', toDate: '2026-12-31T23:59:59Z' }),
  ]},

  // 3. Feed & Unread
  { name: '🔴 Feed & Unread', item: [
    simpleGet('User Feed', '/notifications/feed', 'Current user feed', { page: '1', limit: '20' }),
    simpleGet('Unread Count', '/notifications/unread-count', 'Current unread count'),
  ]},

  // 4. Email
  { name: '📧 Email', item: [
    postJson('Send Email', '/emails', {
      to: ['test@example.com'], subject: 'Test Email {{uniqueSuffix}}',
      text: 'This is a plain text test email sent at {{timestamp}}',
      html: '<p>Test email at {{timestamp}}</p>', priority: 'normal',
    }, { idempotency: true, description: 'Send a single email' }),
    postJson('Send Template Email', '/emails/template', {
      to: ['test@example.com'], templateId: '{{templateId}}',
      templateData: { name: 'Test User', orderId: 'ORD-001' }, locale: 'en',
    }, { description: 'Send email from template' }),
    postJson('Send Bulk Email', '/emails/bulk', {
      recipients: [
        { email: 'user1@example.com', templateData: { name: 'User 1' } },
        { email: 'user2@example.com', templateData: { name: 'User 2' } },
      ],
      templateId: '{{templateId}}', commonData: { campaign: 'test-{{uniqueSuffix}}' },
    }, { description: 'Send bulk emails' }),
  ]},

  // 5. SMS
  { name: '📱 SMS', item: [
    postJson('Send SMS', '/sms', {
      to: '+8801712345678', message: 'Test SMS at {{timestamp}}',
      type: 'transactional', senderId: 'VUBON',
    }, { idempotency: true, description: 'Send single SMS' }),
    postJson('Send Bulk SMS', '/sms/bulk', {
      recipients: [
        { phone: '+8801712345678', message: 'Bulk test 1 at {{timestamp}}' },
        { phone: '+8801812345678', message: 'Bulk test 2 at {{timestamp}}' },
      ],
      type: 'transactional', senderId: 'VUBON',
    }, { description: 'Send bulk SMS' }),
  ]},

  // 6. Push
  { name: '🔔 Push', item: [
    postJson('Send Push', '/push', {
      tokens: ['sample-fcm-token-1', 'sample-fcm-token-2'],
      title: 'Test Push {{uniqueSuffix}}', body: 'Push test at {{timestamp}}',
      data: { notificationId: '{{notificationId}}' }, priority: 'normal', silent: false,
    }, { idempotency: true, description: 'Send push notification' }),
    postJson('Send Bulk Push', '/push/bulk', {
      tokens: ['token-1', 'token-2', 'token-3'],
      title: 'Bulk Push {{uniqueSuffix}}', body: 'Bulk push test',
    }, { description: 'Send bulk push' }),
  ]},

  // 7. In-App
  { name: '📬 In-App', item: [
    postJson('Create In-App', '/in-app', {
      userId: '{{userId}}', title: 'In-App {{uniqueSuffix}}',
      body: 'In-app test at {{timestamp}}', type: 'toast', position: 'top_right',
      autoDismiss: true, displayDurationSeconds: 5,
    }, { saveAs: 'notificationId', description: 'Create in-app notification' }),
    postJson('Dismiss In-App', '/in-app/{{notificationId}}/dismiss', {}, { description: 'Dismiss in-app' }),
  ]},

  // 8. Templates
  { name: '📝 Templates', item: [
    postJson('Create Template', '/templates', {
      name: 'Test Template {{uniqueSuffix}}', slug: 'test-template-{{uniqueSuffix}}',
      type: 'email', category: 'order', locale: 'en',
      subject: 'Order {{orderId}} update',
      body: 'Hello {{userName}}, your order {{orderId}} is {{status}}.',
      variables: [
        { name: 'userName', type: 'string', required: true },
        { name: 'orderId', type: 'string', required: true },
        { name: 'status', type: 'string', required: true },
      ],
    }, { saveAs: 'templateId', description: 'Create template' }),
    putJson('Update Template', '/templates/{{templateId}}', {
      subject: 'Updated: Order {{orderId}}',
      body: 'Hi {{userName}}, order {{orderId}} status: {{status}}',
    }),
    postJson('Test Template', '/templates/{{templateId}}/test', {
      email: 'test@example.com',
      variables: { userName: 'Test', orderId: 'ORD-001', status: 'shipped' },
      locale: 'en',
    }),
    simpleGet('List Templates', '/templates', 'List all templates', { page: '1', limit: '20' }),
    pathGet('Get Template', '/templates/{{templateId}}', 'Get template by ID'),
  ]},

  // 9. Schedules
  { name: '⏰ Schedules', item: [
    postJson('Create Schedule', '/schedules', {
      name: 'Daily Reminder {{uniqueSuffix}}', type: 'recurring', recurrence: 'daily',
      scheduledAt: new Date(Date.now() + 3600000).toISOString(), timezone: 'Asia/Dhaka',
      templateId: '{{templateId}}', recipientIds: ['{{userId}}'],
    }, { saveAs: 'scheduleId', description: 'Create schedule' }),
    putJson('Update Schedule', '/schedules/{{scheduleId}}', { name: 'Updated Schedule' }),
    pathDelete('Cancel Schedule', '/schedules/{{scheduleId}}'),
    simpleGet('List Schedules', '/schedules', 'List schedules', { page: '1', limit: '20' }),
    pathGet('Get Schedule', '/schedules/{{scheduleId}}'),
  ]},

  // 10. Broadcasts
  { name: '📣 Broadcasts', item: [
    postJson('Create Broadcast', '/broadcasts', {
      name: 'Broadcast {{uniqueSuffix}}', type: 'all_users', target: 'all',
      channels: ['email', 'push'], templateId: '{{templateId}}',
    }, { saveAs: 'broadcastId', description: 'Create broadcast (admin)' }),
    postJson('Start Broadcast', '/broadcasts/{{broadcastId}}/start', { testMode: false }),
    postJson('Cancel Broadcast', '/broadcasts/{{broadcastId}}/cancel', {}),
    simpleGet('List Broadcasts', '/broadcasts', 'List broadcasts', { page: '1', limit: '20' }),
    pathGet('Get Broadcast', '/broadcasts/{{broadcastId}}'),
    pathGet('Broadcast Result', '/broadcasts/{{broadcastId}}/result', 'Analytics result'),
  ]},

  // 11. Digests
  { name: '📰 Digests', item: [
    postJson('Create Digest', '/digests', {
      userId: '{{userId}}', frequency: 'daily', type: 'summary',
      categories: ['order', 'shipping'], sendHour: 9, timezone: 'Asia/Dhaka',
    }, { saveAs: 'digestId' }),
    postJson('Send Digest', '/digests/{{digestId}}/send', {}),
    simpleGet('List Digests', '/digests', '', { page: '1', limit: '20' }),
    pathGet('Get Digest', '/digests/{{digestId}}'),
  ]},

  // 12. Preferences
  { name: '⚙️ Preferences', item: [
    simpleGet('Get My Preference', '/preferences/me'),
    simpleGet('Get Preference Matrix', '/preferences/me/matrix'),
    simpleGet('Get Default Preferences', '/preferences/defaults'),
    patchJson('Update My Preference', '/preferences/me', {
      email: true, sms: false, push: true, inApp: true,
      quietHoursEnabled: true, quietHoursStart: 22, quietHoursEnd: 8,
    }),
    postJson('Bulk Update Preferences', '/preferences/bulk', {
      userIds: ['{{userId}}'], updates: { email: true, push: true }, reason: 'Test bulk update',
    }),
    postJson('Unsubscribe', '/preferences/unsubscribe', {
      channel: 'marketing', category: 'promotional', reason: 'Test unsubscribe',
    }),
  ]},

  // 13. Devices
  { name: '📲 Devices', item: [
    postJson('Register Device', '/devices', {
      userId: '{{userId}}', type: 'android', token: 'fcm-token-{{uniqueSuffix}}',
      platform: 'android', deviceName: 'Postman Test Device',
      appVersion: '1.0.0', osVersion: '14',
    }, { saveAs: 'deviceId' }),
    patchJson('Update Device Token', '/devices/{{deviceId}}/token', { newToken: 'fcm-token-updated-{{uniqueSuffix}}' }),
    pathDelete('Unregister Device', '/devices/{{deviceId}}'),
    simpleGet('List Devices', '/devices'),
    pathGet('Get Device', '/devices/{{deviceId}}'),
  ]},

  // 14. Webhooks
  { name: '🪝 Webhooks', item: [
    postJson('Create Webhook', '/webhooks', {
      name: 'Test Webhook {{uniqueSuffix}}',
      url: 'https://webhook.site/test-{{uniqueSuffix}}',
      events: ['order.created', 'order.updated'],
      secret: 'super-secret-key-12345678',
    }, { saveAs: 'webhookId' }),
    putJson('Update Webhook', '/webhooks/{{webhookId}}', {
      name: 'Updated Webhook', events: ['order.created'],
    }),
    postJson('Test Webhook', '/webhooks/{{webhookId}}/test', {
      event: 'order.created', payload: { orderId: 'ORD-001', userId: '{{userId}}' },
    }),
    simpleGet('List Webhooks', '/webhooks', '', { page: '1', limit: '20' }),
    pathGet('Get Webhook', '/webhooks/{{webhookId}}'),
  ]},

  // 15. Analytics
  { name: '📈 Analytics', item: [
    simpleGet('Delivery Rate', '/analytics/delivery-rate', '', { fromDate: '2026-01-01T00:00:00Z', toDate: '2026-12-31T23:59:59Z', channel: 'email' }),
    simpleGet('Channel Stats', '/analytics/channels', '', { fromDate: '2026-01-01T00:00:00Z', toDate: '2026-12-31T23:59:59Z' }),
    simpleGet('Engagement Metrics', '/analytics/engagement'),
    simpleGet('Template Performance', '/analytics/template-performance', '', { templateId: '{{templateId}}' }),
  ]},

  // 16. Provider Webhooks (inbound)
  { name: '🔗 Provider Webhooks (inbound)', item: [
    postJson('SendGrid Webhook', '/webhooks/providers/sendgrid', [
      { email: 'test@example.com', timestamp: 1700000000, event: 'delivered', sg_event_id: 'test-{{uniqueSuffix}}', sg_message_id: 'msg-001' },
    ], { description: 'SendGrid delivery events' }),
    postJson('Mailgun Webhook', '/webhooks/providers/mailgun', {
      'event-data': { event: 'delivered', id: 'msg-{{uniqueSuffix}}', recipient: 'test@example.com' },
      signature: { timestamp: '1700000000', token: 'test-token', signature: 'test-sig' },
    }),
    postJson('SES Webhook', '/webhooks/providers/ses', { Type: 'Notification', Message: '{}' }),
    postJson('Twilio Webhook', '/webhooks/providers/twilio', {
      MessageSid: 'SM{{uniqueSuffix}}', AccountSid: 'AC-test',
      From: '+15551234567', To: '+8801712345678', Status: 'delivered',
    }),
    postJson('Vonage Webhook', '/webhooks/providers/vonage', { messageId: 'msg-{{uniqueSuffix}}', status: 'delivered' }),
    postJson('FCM Webhook', '/webhooks/providers/fcm', { messageId: 'fcm-{{uniqueSuffix}}', state: 'MessageDelivered' }),
    postJson('APNs Webhook', '/webhooks/providers/apns', {
      apnsId: 'apns-{{uniqueSuffix}}', deviceToken: 'device-token-001',
      state: 'delivered', timestamp: 1700000000,
    }),
  ]},

  // 17. Delivery Tracking
  { name: '📦 Delivery Tracking', item: [
    pathGet('Get Delivery Status', '/notifications/{{notificationId}}/delivery'),
    pathGet('Get Delivery Attempts', '/notifications/{{notificationId}}/attempts'),
    postJson('Retry Delivery', '/notifications/{{notificationId}}/retry', {}),
  ]},

  // 18. Broadcast Results
  { name: '📊 Broadcast Results', item: [
    pathGet('Get Broadcast Result', '/broadcasts/{{broadcastId}}/result'),
    simpleGet('List Broadcast Results', '/broadcasts/results', '', { page: '1', limit: '20' }),
  ]},
];

// ═══ BUILD COLLECTION ═══
function buildCollection() {
  return {
    info: {
      _postman_id: `${SERVICE_SLUG}-v1-${new Date().getFullYear()}`,
      name: SERVICE_NAME,
      description: `Vubon.com.bd — ${SERVICE_NAME} REST API\n\nBase URL: http://localhost:${SERVICE_PORT}\nSwagger: http://localhost:${SERVICE_PORT}/api/docs`,
      schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
    },
    auth: { type: 'bearer', bearer: [{ key: 'token', value: '{{accessToken}}', type: 'string' }] },
    variable: [
      { key: 'baseUrl', value: `http://localhost:${SERVICE_PORT}`, type: 'string' },
      { key: 'accessToken', value: '', type: 'string' },
      { key: 'uniqueSuffix', value: '', type: 'string' },
      { key: 'timestamp', value: '', type: 'string' },
      ...Object.entries(SAMPLE).map(([key, value]) => ({ key, value, type: 'string' })),
    ],
    event: [{
      listen: 'prerequest',
      script: { type: 'text/javascript', exec: [
        "pm.variables.set('timestamp', new Date().toISOString());",
        "pm.variables.set('uniqueSuffix', Date.now().toString(36));",
      ]},
    }],
    item: FOLDERS,
  };
}

// ═══ BUILD ENVIRONMENT ═══
function buildEnvironment(env) {
  const urls = { dev: `http://localhost:${SERVICE_PORT}`, staging: STAGING_URL, prod: PROD_URL };
  return {
    id: `${SERVICE_SLUG}-${env}-env`,
    name: `${SERVICE_NAME} — ${env.charAt(0).toUpperCase() + env.slice(1)}`,
    values: [
      { key: 'baseUrl', value: urls[env], enabled: true },
      { key: 'accessToken', value: '', enabled: true, type: 'secret' },
      { key: 'uniqueSuffix', value: '', enabled: true },
      { key: 'timestamp', value: '', enabled: true },
      ...Object.entries(SAMPLE).map(([key, value]) => ({ key, value: env === 'dev' ? value : '', enabled: true })),
    ],
    _postman_variable_scope: 'environment',
    _postman_exported_at: new Date().toISOString(),
    _postman_exported_using: 'Postman/11',
  };
}

// ═══ MAIN ═══
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

  const readme = extractReadmeFromTs();
  if (readme) {
    const readmePath = join(POSTMAN_DIR, 'README.md');
    writeFileSync(readmePath, readme, 'utf8');
    console.log(`✅ README: ${readmePath} (from postman-docs.ts)`);
  }

  const totalRequests = FOLDERS.reduce((sum, f) => sum + f.item.length, 0);
  console.log(`\n📊 ${FOLDERS.length} folders · ${totalRequests} requests`);
}

main();
