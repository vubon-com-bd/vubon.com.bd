/**
 * Prisma Mock — realistic delegate + PaymentPrismaService mock
 * @module payment-service/test/fixtures/infrastructure
 */
import { jest } from '@jest/globals';

/**
 * Build a mock Prisma delegate (findUnique/findMany/create/update/delete/count).
 * All methods are jest.fn() and can be chained per test.
 */
export function makeMockDelegate<T = unknown>() {
  return {
    findFirst: jest.fn<() => Promise<T | null>>().mockResolvedValue(null),
    findUnique: jest.fn<() => Promise<T | null>>().mockResolvedValue(null),
    findMany: jest.fn<() => Promise<T[]>>().mockResolvedValue([]),
    create: jest.fn<() => Promise<T>>(),
    update: jest.fn<() => Promise<T>>(),
    delete: jest.fn<() => Promise<T>>(),
    count: jest.fn<() => Promise<number>>().mockResolvedValue(0),
  };
}

/**
 * Mock PaymentPrismaService — getPaymentModel() returns a stable delegate.
 * `getPaymentModel` is the primary API used by repositories.
 */
export function makeMockPrismaService() {
  const delegates = new Map<string, ReturnType<typeof makeMockDelegate>>();

  const getDelegate = (name: string) => {
    let d = delegates.get(name);
    if (!d) {
      d = makeMockDelegate();
      delegates.set(name, d);
    }
    return d;
  };

  return {
    getPaymentModel: jest.fn((name: string) => getDelegate(name)),
    getModel: jest.fn((name: string) => getDelegate(name)),
    isEngineAvailable: jest.fn().mockReturnValue(true),
    isHealthy: jest.fn().mockResolvedValue(true),
    // helper to grab a specific delegate for assertions
    __delegate: (name: string) => getDelegate(name),
  };
}

export type MockPrismaService = ReturnType<typeof makeMockPrismaService>;
