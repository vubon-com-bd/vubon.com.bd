import { describe, it, expect } from '@jest/globals';
import { ShippingAddressIdVO } from '@domain/primitives/shipping-address-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000';

describe('ShippingAddressIdVO', () => {
  it('creates from valid UUID', () => {
    expect(ShippingAddressIdVO.create(VALID_UUID).value).toBe(VALID_UUID);
  });
  it('throws for empty', () => {
    expect(() => ShippingAddressIdVO.create('')).toThrow(ValidationError);
  });
  it('throws for non-UUID', () => {
    expect(() => ShippingAddressIdVO.create('abc')).toThrow(ValidationError);
  });
  it('reconstitute skips validation', () => {
    expect(ShippingAddressIdVO.reconstitute('legacy').value).toBe('legacy');
  });
});
