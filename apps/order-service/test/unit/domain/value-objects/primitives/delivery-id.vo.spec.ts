/**
 * DeliveryIdVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { DeliveryIdVO } from '@domain/primitives/delivery-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000';

describe('DeliveryIdVO', () => {
  it('creates from valid UUID', () => {
    expect(DeliveryIdVO.create(VALID_UUID).value).toBe(VALID_UUID);
  });
  it('throws for empty', () => {
    expect(() => DeliveryIdVO.create('')).toThrow(ValidationError);
  });
  it('throws for non-UUID', () => {
    expect(() => DeliveryIdVO.create('abc')).toThrow(ValidationError);
  });
  it('reconstitute skips validation', () => {
    expect(DeliveryIdVO.reconstitute('legacy').value).toBe('legacy');
  });
});
