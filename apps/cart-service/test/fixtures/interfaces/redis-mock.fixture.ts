import { jest } from '@jest/globals';

/**
 * Redis Service Mock (for interceptors)
 * @module test/fixtures/interfaces
 */
export interface MockRedis {
  readonly get: jest.Mock;
  readonly set: jest.Mock;
  readonly del: jest.Mock;
  readonly exists: jest.Mock;
  readonly isHealthy: jest.Mock;
  readonly raw: { readonly set: jest.Mock };
  readonly _store: Map<string, unknown>;
}

export const createMockRedis = (): MockRedis => {
  const store = new Map<string, unknown>();
  return {
    get: jest.fn(async (key: string) => store.get(key) ?? null),
    set: jest.fn(async (key: string, value: unknown) => {
      store.set(key, value);
    }),
    del: jest.fn(async (key: string) => {
      store.delete(key);
    }),
    exists: jest.fn(async (key: string) => store.has(key)),
    isHealthy: jest.fn(async () => true),
    raw: {
      set: jest.fn(async (key: string, value: string) => {
        store.set(key, value);
      }),
    },
    _store: store,
  };
};
