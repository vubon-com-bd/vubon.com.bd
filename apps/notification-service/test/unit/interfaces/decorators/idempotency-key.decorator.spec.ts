/**
 * IdempotencyHeader Decorator Tests
 * @module notification-service/test/unit/interfaces/decorators
 *
 * ⚠️ In setup-interfaces.ts, createParamDecorator is mocked to return
 * an identity function. So we cannot test the real factory here.
 * We verify the module exports correctly + the decorator callable shape.
 */
import { describe, expect, it } from '@jest/globals';
import { IdempotencyHeader } from '@interfaces/decorators/idempotency-key.decorator.js';

describe('IdempotencyHeader decorator', () => {
  it('is defined', () => {
    expect(IdempotencyHeader).toBeDefined();
  });

  it('is a function (decorator factory)', () => {
    expect(typeof IdempotencyHeader).toBe('function');
  });

  it('can be called as a factory (returns decorator)', () => {
    const result = (IdempotencyHeader as unknown as () => unknown)();
    expect(result).toBeDefined();
  });

  it('the returned decorator is callable', () => {
    const decorator = (IdempotencyHeader as unknown as () => (
      target: unknown,
      key?: string,
      index?: number,
    ) => void)();
    expect(typeof decorator).toBe('function');
    // Should not throw when called
    expect(() => decorator(class {}, 'method', 0)).not.toThrow();
  });
});
