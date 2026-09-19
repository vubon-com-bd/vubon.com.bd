/**
 * Assert condition — throw if falsy
 * @module shared-utils/common/misc
 *
 * @example
 * assert(user != null, 'User must be defined');
 * // TypeScript narrows user to non-null after this
 */
export function assert(condition: unknown, message = 'Assertion failed'): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

/**
 * Assert value is never (exhaustive check)
 * @module shared-utils/common/misc
 */
export function assertNever(value: never, message = 'Unexpected value'): never {
  throw new Error(`${message}: ${JSON.stringify(value)}`);
}
