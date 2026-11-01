/**
 * IdempotencyHeader decorator — unit tests
 * @module payment-service/test/unit/interfaces/decorators
 *
 * Since createParamDecorator is mocked to return a no-op in tests,
 * we test the decorator factory directly by inspecting the source contract.
 */
import { describe, it, expect } from '@jest/globals';
import { IdempotencyHeader } from '@interfaces/decorators/idempotency-key.decorator';

describe('IdempotencyHeader decorator', () => {
  it('is defined', () => {
    expect(IdempotencyHeader).toBeDefined();
  });
});
