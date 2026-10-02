/**
 * CartShippingMethodVO — Unit Tests
 */
import { CartShippingMethodVO } from '../../../../../src/module/domain/value-objects/primitives/cart-shipping-method.vo.js';
import { SHIPPING_METHOD } from '@vubon/shared-constants/logistics';

describe('CartShippingMethodVO', () => {
  describe('create()', () => {
    it('accepts each valid shipping method', () => {
      Object.values(SHIPPING_METHOD).forEach((m) => {
        const vo = CartShippingMethodVO.create(m);
        expect(vo.value).toBe(m);
      });
    });

    it('throws on invalid method', () => {
      expect(() => CartShippingMethodVO.create('not-a-method')).toThrow();
    });

    it('throws on non-string input', () => {
      expect(() => CartShippingMethodVO.create(123 as never)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      expect(CartShippingMethodVO.reconstitute('custom').value).toBe('custom');
    });
  });

  describe('isExpress()', () => {
    it('true for express, overnight, same_day', () => {
      expect(CartShippingMethodVO.create(SHIPPING_METHOD.EXPRESS).isExpress()).toBe(true);
      expect(CartShippingMethodVO.create(SHIPPING_METHOD.OVERNIGHT).isExpress()).toBe(true);
      expect(CartShippingMethodVO.create(SHIPPING_METHOD.SAME_DAY).isExpress()).toBe(true);
    });

    it('false for standard', () => {
      expect(CartShippingMethodVO.create(SHIPPING_METHOD.STANDARD).isExpress()).toBe(false);
    });
  });

  describe('isStandard()', () => {
    it('true only for standard', () => {
      expect(CartShippingMethodVO.create(SHIPPING_METHOD.STANDARD).isStandard()).toBe(true);
      expect(CartShippingMethodVO.create(SHIPPING_METHOD.EXPRESS).isStandard()).toBe(false);
    });
  });

  describe('isPickup()', () => {
    it('true only for pickup', () => {
      expect(CartShippingMethodVO.create(SHIPPING_METHOD.PICKUP).isPickup()).toBe(true);
      expect(CartShippingMethodVO.create(SHIPPING_METHOD.STANDARD).isPickup()).toBe(false);
    });
  });

  describe('isInternational()', () => {
    it('true only for international', () => {
      expect(
        CartShippingMethodVO.create(SHIPPING_METHOD.INTERNATIONAL).isInternational(),
      ).toBe(true);
      expect(CartShippingMethodVO.create(SHIPPING_METHOD.STANDARD).isInternational()).toBe(false);
    });
  });

  describe('requiresAddress()', () => {
    it('false only for pickup', () => {
      expect(CartShippingMethodVO.create(SHIPPING_METHOD.PICKUP).requiresAddress()).toBe(false);
      expect(CartShippingMethodVO.create(SHIPPING_METHOD.STANDARD).requiresAddress()).toBe(true);
      expect(CartShippingMethodVO.create(SHIPPING_METHOD.EXPRESS).requiresAddress()).toBe(true);
    });
  });

  describe('estimatedDays()', () => {
    it('same_day → { min: 0, max: 1 }', () => {
      const r = CartShippingMethodVO.create(SHIPPING_METHOD.SAME_DAY).estimatedDays();
      expect(r).toEqual({ min: 0, max: 1 });
    });

    it('overnight → { min: 1, max: 2 }', () => {
      const r = CartShippingMethodVO.create(SHIPPING_METHOD.OVERNIGHT).estimatedDays();
      expect(r).toEqual({ min: 1, max: 2 });
    });

    it('next_day → { min: 1, max: 2 }', () => {
      const r = CartShippingMethodVO.create(SHIPPING_METHOD.NEXT_DAY).estimatedDays();
      expect(r).toEqual({ min: 1, max: 2 });
    });

    it('express → { min: 1, max: 3 }', () => {
      const r = CartShippingMethodVO.create(SHIPPING_METHOD.EXPRESS).estimatedDays();
      expect(r).toEqual({ min: 1, max: 3 });
    });

    it('standard → { min: 3, max: 7 }', () => {
      const r = CartShippingMethodVO.create(SHIPPING_METHOD.STANDARD).estimatedDays();
      expect(r).toEqual({ min: 3, max: 7 });
    });

    it('economy → { min: 5, max: 10 }', () => {
      const r = CartShippingMethodVO.create(SHIPPING_METHOD.ECONOMY).estimatedDays();
      expect(r).toEqual({ min: 5, max: 10 });
    });

    it('international → { min: 7, max: 30 }', () => {
      const r = CartShippingMethodVO.create(SHIPPING_METHOD.INTERNATIONAL).estimatedDays();
      expect(r).toEqual({ min: 7, max: 30 });
    });

    it('pickup → { min: 0, max: 0 }', () => {
      const r = CartShippingMethodVO.create(SHIPPING_METHOD.PICKUP).estimatedDays();
      expect(r).toEqual({ min: 0, max: 0 });
    });

    it('local_delivery → { min: 0, max: 2 }', () => {
      const r = CartShippingMethodVO.create(SHIPPING_METHOD.LOCAL_DELIVERY).estimatedDays();
      expect(r).toEqual({ min: 0, max: 2 });
    });

    it('freight → { min: 5, max: 15 }', () => {
      const r = CartShippingMethodVO.create(SHIPPING_METHOD.FREIGHT).estimatedDays();
      expect(r).toEqual({ min: 5, max: 15 });
    });
  });
});
