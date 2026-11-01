/**
 * DeliveryMethodIdVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { DeliveryMethodIdVO } from '@domain/primitives/delivery-method-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000';

describe('DeliveryMethodIdVO', () => {
  it('creates from valid UUID', () => {
    expect(DeliveryMethodIdVO.create(VALID_UUID).value).toBe(VALID_UUID);
  });
  it('throws for empty', () => {
    expect(() => DeliveryMethodIdVO.create('')).toThrow(ValidationError);
  });
  it('throws for non-UUID', () => {
    expect(() => DeliveryMethodIdVO.create('abc')).toThrow(ValidationError);
  });
  it('reconstitute skips validation', () => {
    expect(DeliveryMethodIdVO.reconstitute('legacy').value).toBe('legacy');
  });
});
