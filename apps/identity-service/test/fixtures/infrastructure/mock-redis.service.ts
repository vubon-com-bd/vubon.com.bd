/**
 * MockRedisService — in-memory Redis fake
 * @module identity-service/test/fixtures/infrastructure
 */
import { jest } from '@jest/globals';

export interface MockRedisService {
  get: jest.Mock;
  set: jest.Mock;
  del: jest.Mock;
  exists: jest.Mock;
  isHealthy: jest.Mock;
  raw: unknown;
  __store: Map<string, string>;
  __clear: () => void;
}

export function makeMockRedisService(): MockRedisService {
  const store = new Map<string, string>();

  return {
    get: jest.fn(async <T = unknown>(key: string): Promise<T | null> => {
      const raw = store.get(key);
      if (raw === undefined) return null;
      try {
        return JSON.parse(raw) as T;
      } catch {
        return null;
      }
    }),
    set: jest.fn(async (key: string, value: unknown): Promise<void> => {
      store.set(key, JSON.stringify(value));
    }),
    del: jest.fn(async (key: string): Promise<void> => {
      store.delete(key);
    }),
    exists: jest.fn(async (key: string): Promise<boolean> => store.has(key)),
    isHealthy: jest.fn(async () => true),
    raw: {},
    __store: store,
    __clear: () => store.clear(),
  };
}

export type MockRedis = ReturnType<typeof makeMockRedisService>;
