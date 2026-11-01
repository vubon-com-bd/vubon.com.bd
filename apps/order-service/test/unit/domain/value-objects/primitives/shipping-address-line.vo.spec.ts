import { describe, it, expect } from '@jest/globals';
import { ShippingAddressLineVO } from '@domain/primitives/shipping-address-line.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('ShippingAddressLineVO', () => {
  it('creates from valid text', () => {
    expect(ShippingAddressLineVO.create('123 Main Street').value).toBe('123 Main Street');
  });
  it('trims whitespace', () => {
    expect(ShippingAddressLineVO.create('  hello  ').value).toBe('hello');
  });
  it('throws for too short', () => {
    expect(() => ShippingAddressLineVO.create('ab')).toThrow(ValidationError);
  });
  it('throws for too long', () => {
    expect(() => ShippingAddressLineVO.create('a'.repeat(256))).toThrow(ValidationError);
  });
  it('throws for non-string', () => {
    expect(() => ShippingAddressLineVO.create(1 as unknown as string)).toThrow(ValidationError);
  });
});
