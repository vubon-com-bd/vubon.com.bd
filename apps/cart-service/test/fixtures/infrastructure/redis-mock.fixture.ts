/**
 * Redis mock fixtures
 * @module cart-service/test/fixtures/infrastructure
 *
 * In-memory backed mock of CartRedisService + RedisService (kernel).
 */
import { jest } from '@jest/globals';

export type MockCartRedisService = {
  get: jest.Mock;
  set: jest.Mock;
  setNoExpiry: jest.Mock;
  del: jest.Mock;
  delMany: jest.Mock;
  exists: jest.Mock;
  keys: jest.Mock;
  ttl: jest.Mock;
  expire: jest.Mock;
  increment: jest.Mock;
  isHealthy: jest.Mock;
  raw: unknown;
  store: Map<string, unknown>;
};

/**
 * In-memory Redis mock.
 *
 * Stores values as JS objects (not JSON strings) for simplicity.
 * Tests can inspect `store` directly for assertions.
 */
export function makeMockCartRedisService(): MockCartRedisService {
  const store = new Map<string, unknown>();

  const service: MockCartRedisService = {
    store,
    get: jest.fn(async <T = unknown>(key: string): Promise<T | null> => {
      return (store.get(key) as T) ?? null;
    }),
    set: jest.fn(async (key: string, value: unknown): Promise<void> => {
      store.set(key, value);
    }),
    setNoExpiry: jest.fn(async (key: string, value: unknown): Promise<void> => {
      store.set(key, value);
    }),
    del: jest.fn(async (key: string): Promise<void> => {
      store.delete(key);
    }),
    delMany: jest.fn(async (keys: readonly string[]): Promise<number> => {
      let count = 0;
      for (const k of keys) {
        if (store.delete(k)) count += 1;
      }
      return count;
    }),
    exists: jest.fn(async (key: string): Promise<boolean> => store.has(key)),
    keys: jest.fn(async (pattern: string): Promise<readonly string[]> => {
      const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
      return Array.from(store.keys()).filter((k) => regex.test(k));
    }),
    ttl: jest.fn(async (_key: string): Promise<number> => -1),
    expire: jest.fn(async (_key: string, _ttl: number): Promise<boolean> => true),
    increment: jest.fn(async (_key: string, delta = 1): Promise<number> => delta),
    isHealthy: jest.fn(async (): Promise<boolean> => true),
    raw: {},
  };

  return service;
}

/**
 * Kernel RedisService mock — used by Cache repositories.
 */
export type MockKernelRedisService = {
  get: jest.Mock;
  set: jest.Mock;
  del: jest.Mock;
  exists: jest.Mock;
  isHealthy: jest.Mock;
  store: Map<string, unknown>;
};

export function makeMockKernelRedisService(): MockKernelRedisService {
  const store = new Map<string, unknown>();
  return {
    store,
    get: jest.fn(async <T = unknown>(key: string): Promise<T | null> => {
      return (store.get(key) as T) ?? null;
    }),
    set: jest.fn(async (key: string, value: unknown): Promise<void> => {
      store.set(key, value);
    }),
    del: jest.fn(async (key: string): Promise<void> => {
      store.delete(key);
    }),
    exists: jest.fn(async (key: string): Promise<boolean> => store.has(key)),
    isHealthy: jest.fn(async (): Promise<boolean> => true),
  };
}
