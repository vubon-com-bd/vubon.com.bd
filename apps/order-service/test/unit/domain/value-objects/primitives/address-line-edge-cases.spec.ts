/**
 * Address Line VO edge cases
 * @module order-service/test/unit/domain/value-objects/primitives
 */
import { describe, it, expect } from '@jest/globals';
import { BillingAddressLineVO } from '@domain/primitives/billing-address-line.vo.js';
import { ShippingAddressLineVO } from '@domain/primitives/shipping-address-line.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('Address Line VOs edge cases', () => {
  describe('BillingAddressLineVO', () => {
    it('throws for too short line', () => {
      expect(() => BillingAddressLineVO.create('ab')).toThrow(ValidationError);
    });

    it('throws for non-string', () => {
      expect(() => BillingAddressLineVO.create(123 as unknown as string)).toThrow(ValidationError);
    });

    it('reconstitute accepts any value', () => {
      const vo = BillingAddressLineVO.reconstitute('ab');
      expect(vo.value).toBe('ab');
    });
  });

  describe('ShippingAddressLineVO', () => {
    it('throws for too short line', () => {
      expect(() => ShippingAddressLineVO.create('ab')).toThrow(ValidationError);
    });

    it('throws for non-string', () => {
      expect(() => ShippingAddressLineVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });
});
