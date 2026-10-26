/**
 * Infrastructure Test Fixtures — all shared mocks + factories
 * @module notification-service/test/fixtures/infrastructure
 *
 * Single file with all fixtures to keep test structure compact।
 */
import { jest } from '@jest/globals';

// ═══════════════════════════════════════════════════════════
// 1. Test UUIDs
// ═══════════════════════════════════════════════════════════
export const TEST_IDS = Object.freeze({
  USER: '11111111-1111-1111-1111-111111111111',
  USER_2: '22222222-2222-2222-2222-222222222222',
  NOTIFICATION: '33333333-3333-3333-3333-333333333333',
  TEMPLATE: '44444444-4444-4444-4444-444444444444',
  SCHEDULE: '55555555-5555-5555-5555-555555555555',
  BROADCAST: '66666666-6666-6666-6666-666666666666',
  DIGEST: '77777777-7777-7777-7777-777777777777',
  DEVICE: '88888888-8888-8888-8888-888888888888',
  WEBHOOK: '99999999-9999-9999-9999-999999999999',
  PREFERENCE: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  DELIVERY: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
} as const);

export const TEST_TIMESTAMPS = Object.freeze({
  NOW: '2026-01-15T10:00:00.000Z',
  PAST: '2026-01-01T00:00:00.000Z',
  FUTURE: '2026-02-15T10:00:00.000Z',
  CREATED: '2026-01-10T08:30:00.000Z',
  UPDATED: '2026-01-14T15:45:00.000Z',
} as const);

// ═══════════════════════════════════════════════════════════
// 2. Prisma Row Factories
// ═══════════════════════════════════════════════════════════
export function makePrismaNotification(overrides: Partial<Record<string, unknown>> = {}): any {
  return {
    id: TEST_IDS.NOTIFICATION,
    userId: TEST_IDS.USER,
    type: 'transactional',
    category: 'order',
    channel: 'email',
    priority: 'normal',
    status: 'pending',
    title: 'Test Notification',
    body: 'Test body content',
    imageUrl: null,
    iconUrl: null,
    actionUrl: null,
    actions: null,
    data: null,
    reference: null,
    recipient: {
      userId: TEST_IDS.USER,
      channel: 'email',
      email: 'test@example.com',
    },
    deliveryStatus: 'queued',
    deliveryAttempts: 0,
    retryAttempts: 0,
    provider: null,
    providerMessageId: null,
    failureReason: null,
    failureCode: null,
    readStatus: 'unread',
    expiresAt: null,
    scheduledAt: null,
    sentAt: null,
    deliveredAt: null,
    readAt: null,
    archivedAt: null,
    failedAt: null,
    cancelledAt: null,
    expiredAt: null,
    snoozedUntil: null,
    metadata: null,
    version: 0,
    createdAt: new Date(TEST_TIMESTAMPS.CREATED),
    updatedAt: new Date(TEST_TIMESTAMPS.UPDATED),
    deletedAt: null,
    ...overrides,
  };
}

export function makePrismaTemplate(overrides: Partial<Record<string, unknown>> = {}): any {
  return {
    id: TEST_IDS.TEMPLATE,
    name: 'Order Confirmation',
    slug: 'order-confirmation',
    type: 'transactional',
    status: 'active',
    category: 'order',
    locale: 'en',
    subject: 'Your order {{orderId}}',
    body: 'Hello {{name}}, your order is confirmed',
    bodyHtml: null,
    variables: [
      { name: 'name', type: 'string', required: true },
      { name: 'orderId', type: 'string', required: true },
    ],
    version: 1,
    parentId: null,
    createdBy: TEST_IDS.USER,
    updatedBy: null,
    deletedAt: null,
    createdAt: new Date(TEST_TIMESTAMPS.CREATED),
    updatedAt: new Date(TEST_TIMESTAMPS.UPDATED),
    ...overrides,
  };
}

export function makePrismaDevice(overrides: Partial<Record<string, unknown>> = {}): any {
  return {
    id: TEST_IDS.DEVICE,
    userId: TEST_IDS.USER,
    type: 'android',
    status: 'active',
    token: 'fcm_token_test_1234567890_abcdefghijklmnop',
    platform: 'android',
    appVersion: '1.0.0',
    osVersion: 'Android 13',
    deviceName: 'Test Phone',
    lastActiveAt: new Date(TEST_TIMESTAMPS.NOW),
    registeredAt: new Date(TEST_TIMESTAMPS.CREATED),
    version: 0,
    createdAt: new Date(TEST_TIMESTAMPS.CREATED),
    updatedAt: new Date(TEST_TIMESTAMPS.UPDATED),
    deletedAt: null,
    ...overrides,
  };
}

export function makePrismaPreference(overrides: Partial<Record<string, unknown>> = {}): any {
  return {
    id: TEST_IDS.PREFERENCE,
    userId: TEST_IDS.USER,
    channelPreferences: { email: true, sms: false, push: true, in_app: true },
    categoryPreferences: { 'email:marketing': false },
    quietHoursEnabled: false,
    quietHoursStart: null,
    quietHoursEnd: null,
    timezone: 'Asia/Dhaka',
    locale: 'en',
    version: 0,
    createdAt: new Date(TEST_TIMESTAMPS.CREATED),
    updatedAt: new Date(TEST_TIMESTAMPS.UPDATED),
    deletedAt: null,
    ...overrides,
  };
}

// ═══════════════════════════════════════════════════════════
// 3. Redis Mock
// ═══════════════════════════════════════════════════════════
export function makeRedisMock(): {
  get: jest.Mock;
  set: jest.Mock;
  del: jest.Mock;
  exists: jest.Mock;
  isHealthy: jest.Mock;
  raw: unknown;
} {
  const store = new Map<string, unknown>();
  return {
    get: jest.fn(async (key: string) => (store.has(key) ? store.get(key) : null)) as any,
    set: jest.fn(async (key: string, value: unknown) => {
      store.set(key, value);
    }) as any,
    del: jest.fn(async (key: string) => {
      store.delete(key);
    }) as any,
    exists: jest.fn(async (key: string) => store.has(key)) as any,
    isHealthy: jest.fn(async () => true) as any,
    raw: {} as unknown,
  };
}

// ═══════════════════════════════════════════════════════════
// 4. Queue Mock
// ═══════════════════════════════════════════════════════════
export function makeQueueMock(): {
  enqueue: jest.Mock;
  registerWorker: jest.Mock;
  getQueue: jest.Mock;
} {
  return {
    enqueue: jest.fn(async () => 'job-id-123') as any,
    registerWorker: jest.fn() as any,
    getQueue: jest.fn(() => ({
      getWaitingCount: jest.fn(async () => 0),
      getActiveCount: jest.fn(async () => 0),
      getFailedCount: jest.fn(async () => 0),
      getCompletedCount: jest.fn(async () => 0),
    })) as any,
  };
}

// ═══════════════════════════════════════════════════════════
// 5. Prisma Delegate Mock (for repositories)
// ═══════════════════════════════════════════════════════════
export function makePrismaDelegateMock(): {
  findUnique: jest.Mock;
  findFirst: jest.Mock;
  findMany: jest.Mock;
  create: jest.Mock;
  update: jest.Mock;
  delete: jest.Mock;
  deleteMany: jest.Mock;
  updateMany: jest.Mock;
  count: jest.Mock;
  aggregate: jest.Mock;
  groupBy: jest.Mock;
} {
  return {
    findUnique: jest.fn(async () => null) as any,
    findFirst: jest.fn(async () => null) as any,
    findMany: jest.fn(async () => []) as any,
    create: jest.fn(async () => ({})) as any,
    update: jest.fn(async () => ({})) as any,
    delete: jest.fn(async () => ({})) as any,
    deleteMany: jest.fn(async () => ({ count: 0 })) as any,
    updateMany: jest.fn(async () => ({ count: 0 })) as any,
    count: jest.fn(async () => 0) as any,
    aggregate: jest.fn(async () => ({})) as any,
    groupBy: jest.fn(async () => []) as any,
  };
}

// ═══════════════════════════════════════════════════════════
// 6. Prisma Service Mock
// ═══════════════════════════════════════════════════════════
export function makePrismaServiceMock(): any {
  const delegate = makePrismaDelegateMock();
  return {
    isEngineAvailable: jest.fn(() => true),
    isHealthy: jest.fn(async () => true),
    withEngine: jest.fn(async (op: (c: unknown) => Promise<unknown>) => op({})),
    getModel: jest.fn(() => delegate),
    // Direct delegate access (matches PrismaService extends PrismaClient)
    notification: delegate,
    notificationTemplate: delegate,
    notificationDevice: delegate,
    notificationPreference: delegate,
    notificationWebhook: delegate,
    notificationWebhookDelivery: delegate,
    notificationBroadcast: delegate,
    notificationBroadcastBatch: delegate,
    notificationDigest: delegate,
    notificationDigestItem: delegate,
    notificationSchedule: delegate,
    notificationDeliveryAttempt: delegate,
    notificationEvent: delegate,
    notificationRateLimit: delegate,
    notificationUnsubscribe: delegate,
    notificationBounce: delegate,
    notificationActionLog: delegate,
    notificationRule: delegate,
    notificationAuditLog: delegate,
  };
}

// ═══════════════════════════════════════════════════════════
// 7. Event Bridge Mock
// ═══════════════════════════════════════════════════════════
export function makeEventBridgeMock(): {
  publishInProcess: jest.Mock;
  publish: jest.Mock;
  publishBatch: jest.Mock;
  publishFromEntity: jest.Mock;
} {
  return {
    publishInProcess: jest.fn() as any,
    publish: jest.fn(async () => undefined) as any,
    publishBatch: jest.fn(async () => undefined) as any,
    publishFromEntity: jest.fn(async () => undefined) as any,
  };
}

// ═══════════════════════════════════════════════════════════
// 8. Generic Provider Result
// ═══════════════════════════════════════════════════════════
export const PROVIDER_RESULT = Object.freeze({
  SUCCESS: {
    success: true,
    providerMessageId: 'msg-test-123',
    status: 'sent',
    durationMs: 100,
  },
  FAILURE: {
    success: false,
    error: 'Test error',
    errorCode: 'TEST_ERROR',
    retryable: true,
    durationMs: 100,
  },
  NOT_CONFIGURED: {
    success: false,
    error: 'not configured',
    errorCode: 'NOT_CONFIGURED',
  },
} as const);
