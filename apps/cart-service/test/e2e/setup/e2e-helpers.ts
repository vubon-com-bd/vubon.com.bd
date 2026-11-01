/**
 * E2E helpers — domain-layer utilities
 * @module cart-service/test/e2e/setup
 *
 * No NestJS or HTTP — these are domain-level E2E helpers.
 */

/**
 * Assert that a function throws with a specific message pattern.
 */
export function expectToThrowWith(fn: () => unknown, pattern: RegExp): void {
  let threw = false;
  try {
    fn();
  } catch (err) {
    threw = true;
    const message = err instanceof Error ? err.message : String(err);
    if (!pattern.test(message)) {
      throw new Error(
        `Expected error message to match ${pattern}, got: ${message}`,
      );
    }
  }
  if (!threw) {
    throw new Error(`Expected function to throw, but it did not`);
  }
}

/**
 * Delay helper for async tests.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
