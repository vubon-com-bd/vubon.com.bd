/**
 * CartShippingCompositeVO — Unit Tests
 */
import { CartShippingCompositeVO } from '../../../../../src/module/domain/value-objects/composites/cart-shipping.vo.js';
import { CartShippingIdVO } from '../../../../../src/module/domain/value-objects/primitives/cart-shipping-id.vo.js';
import { CartShippingMethodVO } from '../../../../../src/module/domain/value-objects/primitives/cart-shipping-method.vo.js';
import { SHIPPING_METHOD } from '@vubon/shared-constants/logistics';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const ADDRESS_UUID = '00000000-0000-0000-0000-000000000001';

function makeProps(overrides: Partial<Parameters<typeof CartShippingCompositeVO.create>[0]> = {}) {
  return {
    id: CartShippingIdVO.create(UUID),
    method: CartShippingMethodVO.create(SHIPPING_METHOD.STANDARD),
    cost: 100,
    currency: 'BDT',
    freeShippingThreshold: 1000,
    addressId: ADDRESS_UUID,
    ...overrides,
  };
}

describe('CartShippingCompositeVO', () => {
  describe('create()', () => {
    it('creates valid VO', () => {
      const vo = CartShippingCompositeVO.create(makeProps());
      expect(vo.method.value).toBe(SHIPPING_METHOD.STANDARD);
    });

    it('throws on negative cost', () => {
      expect(() => CartShippingCompositeVO.create(makeProps({ cost: -1 }))).toThrow();
    });

    it('throws on negative threshold', () => {
      expect(() =>
        CartShippingCompositeVO.create(makeProps({ freeShippingThreshold: -1 })),
      ).toThrow();
    });

    it('throws when method requires address but none provided', () => {
      expect(() =>
        CartShippingCompositeVO.create(makeProps({ addressId: undefined })),
      ).toThrow();
    });

    it('accepts pickup without address', () => {
      const vo = CartShippingCompositeVO.create(
        makeProps({
          method: CartShippingMethodVO.create(SHIPPING_METHOD.PICKUP),
          addressId: undefined,
        }),
      );
      expect(vo.method.isPickup()).toBe(true);
    });
  });

  describe('effectiveCost()', () => {
    it('returns cost when subtotal below threshold', () => {
      const vo = CartShippingCompositeVO.create(makeProps());
      expect(vo.effectiveCost(500)).toBe(100);
    });

    it('returns 0 when subtotal >= threshold', () => {
      const vo = CartShippingCompositeVO.create(makeProps());
      expect(vo.effectiveCost(1000)).toBe(0);
      expect(vo.effectiveCost(2000)).toBe(0);
    });

    it('returns 0 for pickup method', () => {
      const vo = CartShippingCompositeVO.create(
        makeProps({
          method: CartShippingMethodVO.create(SHIPPING_METHOD.PICKUP),
          addressId: undefined,
          cost: 100,
        }),
      );
      expect(vo.effectiveCost(100)).toBe(0);
    });

    it('throws on negative subtotal', () => {
      const vo = CartShippingCompositeVO.create(makeProps());
      expect(() => vo.effectiveCost(-1)).toThrow();
    });
  });

  describe('amountToFreeShipping()', () => {
    it('returns remaining to threshold', () => {
      const vo = CartShippingCompositeVO.create(makeProps({ freeShippingThreshold: 1000 }));
      expect(vo.amountToFreeShipping(400)).toBe(600);
    });

    it('returns 0 when threshold already met', () => {
      const vo = CartShippingCompositeVO.create(makeProps({ freeShippingThreshold: 1000 }));
      expect(vo.amountToFreeShipping(1000)).toBe(0);
      expect(vo.amountToFreeShipping(2000)).toBe(0);
    });

    it('returns 0 when no threshold', () => {
      const vo = CartShippingCompositeVO.create(makeProps({ freeShippingThreshold: 0 }));
      expect(vo.amountToFreeShipping(100)).toBe(0);
    });
  });

  describe('isFree()', () => {
    it('true when threshold met', () => {
      const vo = CartShippingCompositeVO.create(makeProps());
      expect(vo.isFree(1000)).toBe(true);
    });

    it('false when below threshold', () => {
      const vo = CartShippingCompositeVO.create(makeProps());
      expect(vo.isFree(500)).toBe(false);
    });
  });

  describe('estimatedDays()', () => {
    it('delegates to method', () => {
      const vo = CartShippingCompositeVO.create(makeProps());
      expect(vo.estimatedDays()).toEqual({ min: 3, max: 7 });
    });
  });
});
