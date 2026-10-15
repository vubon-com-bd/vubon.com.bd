/**
 * Prisma mock fixtures
 * @module cart-service/test/fixtures/infrastructure
 *
 * Provides a mockable CartPrismaService for repository unit tests.
 */
import { jest } from '@jest/globals';

export type MockDelegate = {
  findFirst: jest.Mock;
  findUnique: jest.Mock;
  findMany: jest.Mock;
  create: jest.Mock;
  update: jest.Mock;
  delete: jest.Mock;
  count: jest.Mock;
};

export function makeMockDelegate(): MockDelegate {
  return {
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  };
}

export type MockCartPrismaService = {
  getModel: jest.Mock;
  withEngine: jest.Mock;
  isHealthy: jest.Mock;
  isEngineAvailable: jest.Mock;
};

export interface MockPrismaOptions {
  readonly delegates?: Record<string, MockDelegate>;
  readonly engineAvailable?: boolean;
}

/**
 * Creates a mock of CartPrismaService.
 * Each delegate is auto-registered under the given key.
 */
export function makeMockPrismaService(
  options: MockPrismaOptions = {},
): MockCartPrismaService {
  const delegates = options.delegates ?? {};
  const engineAvailable = options.engineAvailable ?? true;

  const getModel = jest.fn((name: string): MockDelegate => {
    const delegate = delegates[name];
    if (!delegate) {
      // Auto-create a fresh delegate for unknown models
      const fresh = makeMockDelegate();
      delegates[name] = fresh;
      return fresh;
    }
    return delegate;
  });

  return {
    getModel,
    withEngine: jest.fn(),
    isHealthy: jest.fn().mockResolvedValue(engineAvailable),
    isEngineAvailable: jest.fn().mockReturnValue(engineAvailable),
  };
}

/**
 * Convenience: default mock for all Cart delegates.
 */
export function makeDefaultCartPrismaMock(): {
  service: MockCartPrismaService;
  cart: MockDelegate;
  savedItem: MockDelegate;
  abandonedCart: MockDelegate;
  cartMerger: MockDelegate;
} {
  const cart = makeMockDelegate();
  const savedItem = makeMockDelegate();
  const abandonedCart = makeMockDelegate();
  const cartMerger = makeMockDelegate();

  const service = makeMockPrismaService({
    delegates: { cart, savedItem, abandonedCart, cartMerger },
  });

  return { service, cart, savedItem, abandonedCart, cartMerger };
}
