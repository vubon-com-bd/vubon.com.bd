/**
 * Check if value is a callable function
 * @module shared-utils/common/validation
 */
export type AnyFunction = (...args: readonly unknown[]) => unknown;

export function isFunction(value: unknown): value is AnyFunction {
  return typeof value === 'function';
}
