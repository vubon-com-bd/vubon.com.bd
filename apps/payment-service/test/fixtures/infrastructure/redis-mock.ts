/**
 * Redis Mock — for cache repository tests
 * @module payment-service/test/fixtures/infrastructure
 */
import { jest } from '@jest/globals';

export function makeMockRedisService() {
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
    exists: jest.fn(async (key: string): Promise<boolean> => {
      return store.has(key);
    }),
    isHealthy: jest.fn(async (): Promise<boolean> => true),
    // test helpers
    __store: store,
    __clear: () => store.clear(),
  };
}

export type MockRedisService = ReturnType<typeof makeMockRedisService>;
