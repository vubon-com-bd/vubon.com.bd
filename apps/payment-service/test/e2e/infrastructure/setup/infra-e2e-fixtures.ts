/**
 * Infrastructure E2E Fixtures — shared mocks & factories
 * @module payment-service/test/e2e/infrastructure/setup
 */
import { jest } from '@jest/globals';

// ─── Prisma Mock (delegate-based) ──────
export function makePrismaMock() {
  const delegates = new Map<string, ReturnType<typeof makeDelegate>>();
  const getDelegate = (name: string) => {
    let d = delegates.get(name);
    if (!d) {
      d = makeDelegate();
      delegates.set(name, d);
    }
    return d;
  };
  return {
    getPaymentModel: jest.fn((name: string) => getDelegate(name)),
    getModel: jest.fn((name: string) => getDelegate(name)),
    isEngineAvailable: jest.fn().mockReturnValue(true),
    isHealthy: jest.fn().mockResolvedValue(true),
    __delegate: getDelegate,
    __clear: () => delegates.clear(),
  };
}

function makeDelegate() {
  return {
    findFirst: jest.fn(async () => null),
    findUnique: jest.fn(async () => null),
    findMany: jest.fn(async () => []),
    create: jest.fn(async (args: unknown) => args),
    update: jest.fn(async (args: unknown) => args),
    delete: jest.fn(async () => null),
    count: jest.fn(async () => 0),
  };
}

export type PrismaMock = ReturnType<typeof makePrismaMock>;

// ─── Redis Mock ─────────────────────────
export function makeRedisMock() {
  const store = new Map<string, unknown>();
  return {
    get: jest.fn(async <T>(key: string): Promise<T | null> => {
      return (store.get(key) as T) ?? null;
    }),
    set: jest.fn(async <T>(key: string, value: T, _ttl?: number): Promise<void> => {
      store.set(key, value);
    }),
    del: jest.fn(async (key: string): Promise<void> => {
      store.delete(key);
    }),
    exists: jest.fn(async (key: string): Promise<boolean> => store.has(key)),
    isHealthy: jest.fn(async () => true),
    __store: store,
    __clear: () => store.clear(),
  };
}

export type RedisMock = ReturnType<typeof makeRedisMock>;

// ─── Queue Mock ─────────────────────────
export function makeQueueMock() {
  const enqueuedJobs: Array<{ queue: string; name: string; payload: unknown }> = [];
  const workers: Array<{ queue: string; processor: (payload: unknown) => Promise<unknown> }> = [];

  return {
    enqueue: jest.fn(async (queue: string, name: string, payload: unknown) => {
      enqueuedJobs.push({ queue, name, payload });
      return `job-${enqueuedJobs.length}`;
    }),
    registerWorker: jest.fn(
      (queue: string, processor: (payload: unknown) => Promise<unknown>) => {
        workers.push({ queue, processor });
      },
    ),
    getQueue: jest.fn(),
    onModuleDestroy: jest.fn().mockResolvedValue(undefined),
    // test helpers
    __jobs: enqueuedJobs,
    __workers: workers,
    __clear: () => {
      enqueuedJobs.length = 0;
      workers.length = 0;
    },
    __runWorker: async (queue: string, payload: unknown) => {
      const worker = workers.find((w) => w.queue === queue);
      if (!worker) throw new Error(`No worker for queue "${queue}"`);
      return worker.processor(payload);
    },
  };
}

export type QueueMock = ReturnType<typeof makeQueueMock>;

// ─── Common UUIDs ───────────────────────
export const UUID = {
  PAYMENT: '11111111-1111-4111-8111-111111111111',
  ORDER: '22222222-2222-4222-8222-222222222222',
  USER: '33333333-3333-4333-8333-333333333333',
  REFUND: '44444444-4444-4444-8444-444444444444',
  TXN: '55555555-5555-4555-8555-555555555555',
  INVOICE: '99999999-9999-4999-8999-999999999999',
  SUB: '88888888-8888-4888-8888-888888888888',
} as const;

export const NOW = '2025-01-15T10:00:00.000Z';

// ─── Gateway Adapter Mock ───────────────
export function makeMockGatewayAdapter(
  gatewayId = 'mock',
  enabled = true,
) {
  return {
    gatewayId,
    isEnabled: jest.fn(() => enabled),
    initiate: jest.fn(async () => ({
      success: true,
      gatewayPaymentId: `${gatewayId}_pi_123`,
      redirectUrl: `https://${gatewayId}.test/checkout/123`,
    })),
    verify: jest.fn(async () => ({
      verified: true,
      gatewayPaymentId: `${gatewayId}_pi_123`,
      amount: 1000,
      currency: 'BDT',
      status: 'succeeded',
    })),
    capture: jest.fn(async () => ({
      success: true,
      gatewayPaymentId: `${gatewayId}_pi_123`,
      capturedAt: new Date().toISOString(),
    })),
    refund: jest.fn(async () => ({
      success: true,
      gatewayRefundId: `${gatewayId}_re_123`,
      processedAt: new Date().toISOString(),
    })),
    cancel: jest.fn(async () => ({ success: true })),
    verifyWebhook: jest.fn(() => ({
      valid: true,
      eventType: 'payment.succeeded',
      externalId: `${gatewayId}_evt_123`,
    })),
  };
}
