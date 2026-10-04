/**
 * Type-safe Jest mock helpers for auth-service tests.
 *
 * Why this file?
 *   `@jest/globals` এর `jest.fn()` default generic `never`।
 *   `as jest.Mock` cast type restore করে না।
 *   এই helpers দিয়ে fully type-safe mock বানানো যায় — `any` ছাড়াই।
 */
import { jest } from '@jest/globals';

/**
 * Type-safe mock function factory.
 * Example:
 *   const getRecent = mockFn<(id: string) => Promise<unknown[]>>();
 *   getRecent.mockResolvedValue([]);
 */
export function mockFn<T extends (...args: never[]) => unknown>(): jest.Mock<T> {
  return jest.fn<T>();
}

/**
 * Type-safe resolved-value mock for async functions.
 * Example:
 *   const autoUnlock = mockAsync<() => Promise<number>>(0);
 */
export function mockAsync<T extends (...args: never[]) => Promise<unknown>>(
  defaultValue: Awaited<ReturnType<T>>,
): jest.Mock<T> {
  return jest.fn<T>().mockResolvedValue(defaultValue as never) as jest.Mock<T>;
}

/**
 * Type-safe sync mock.
 */
export function mockSync<T extends (...args: never[]) => unknown>(
  defaultValue: ReturnType<T>,
): jest.Mock<T> {
  return jest.fn<T>().mockReturnValue(defaultValue as never) as jest.Mock<T>;
}
