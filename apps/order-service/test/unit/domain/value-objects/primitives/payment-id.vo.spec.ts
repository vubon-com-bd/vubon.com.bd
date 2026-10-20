import { describe, it, expect } from '@jest/globals';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000';

describe('PaymentIdVO', () => {
  it('creates from valid UUID', () => {
    expect(PaymentIdVO.create(VALID_UUID).value).toBe(VALID_UUID);
  });
  it('throws for empty', () => {
    expect(() => PaymentIdVO.create('')).toThrow(ValidationError);
    expect(() => PaymentIdVO.create('')).toThrow('PaymentId cannot be empty');
  });
  it('throws for non-UUID', () => {
    expect(() => PaymentIdVO.create('abc')).toThrow(ValidationError);
  });
  it('reconstitute skips validation', () => {
    expect(PaymentIdVO.reconstitute('legacy').value).toBe('legacy');
  });
});
