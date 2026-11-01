import { jest } from '@jest/globals';

/**
 * Command/Query Bus Mocks
 * @module test/fixtures/interfaces
 */
import { CommandBus, QueryBus } from '@nestjs/cqrs';

export const createMockCommandBus = (): {
  bus: CommandBus;
  executed: unknown[];
  mockExecute: jest.Mock;
} => {
  const executed: unknown[] = [];
  const mockExecute = jest.fn().mockImplementation((cmd: unknown) => {
    executed.push(cmd);
    return Promise.resolve({ ok: true });
  });
  const bus = { execute: mockExecute } as unknown as CommandBus;
  return { bus, executed, mockExecute };
};

export const createMockQueryBus = (returnValue: unknown = null): {
  bus: QueryBus;
  executed: unknown[];
  mockExecute: jest.Mock;
} => {
  const executed: unknown[] = [];
  const mockExecute = jest.fn().mockImplementation((q: unknown) => {
    executed.push(q);
    return Promise.resolve(returnValue);
  });
  const bus = { execute: mockExecute } as unknown as QueryBus;
  return { bus, executed, mockExecute };
};

export const createMockRedisService = () => {
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

export const createMockRepository = <T>(items: T[] = []) => ({
  findById: jest.fn(async (id: string) => items.find((i) => (i as { id: string }).id === id) ?? null),
  findAll: jest.fn(async () => items),
  save: jest.fn(async (entity: T) => entity),
  delete: jest.fn(async () => undefined),
  exists: jest.fn(async () => false),
  softDelete: jest.fn(async () => undefined),
  restore: jest.fn(async () => undefined),
});
