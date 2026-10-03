/**
 * CartSummaryCompositeVO — Unit Tests
 */
import { CartSummaryCompositeVO } from '../../../../../src/module/domain/value-objects/composites/cart-summary.vo.js';
import { CartIdVO } from '../../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import { CartStatusVO } from '../../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CART_STATUS, CART_TYPE } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeProps(overrides = {}) {
  return {
    id: CartIdVO.create(UUID),
    type: CartTypeVO.create(CART_TYPE.USER),
    status: CartStatusVO.create(CART_STATUS.ACTIVE),
    itemCount: 3,
    uniqueItemCount: 2,
    subtotal: 1000,
    discountAmount: 100,
    taxAmount: 50,
    shippingAmount: 30,
    total: 980,
    currency: 'BDT',
    hasCoupon: true,
    hasVoucher: false,
    lastActivityAt: '2026-01-01T00:00:00Z',
    ...overrides,
  };
}

describe('CartSummaryCompositeVO', () => {
  describe('create()', () => {
    it('creates valid VO', () => {
      const vo = CartSummaryCompositeVO.create(makeProps() as never);
      expect(vo.itemCount).toBe(3);
      expect(vo.total).toBe(980);
    });
  });

  describe('isEmpty()', () => {
    it('false when itemCount > 0', () => {
      const vo = CartSummaryCompositeVO.create(makeProps() as never);
      expect(vo.isEmpty()).toBe(false);
    });

    it('true when itemCount == 0', () => {
      const vo = CartSummaryCompositeVO.create(makeProps({ itemCount: 0 }) as never);
      expect(vo.isEmpty()).toBe(true);
    });
  });

  describe('hasDiscount()', () => {
    it('true when discountAmount > 0', () => {
      const vo = CartSummaryCompositeVO.create(makeProps() as never);
      expect(vo.hasDiscount()).toBe(true);
    });

    it('false when discountAmount == 0', () => {
      const vo = CartSummaryCompositeVO.create(makeProps({ discountAmount: 0 }) as never);
      expect(vo.hasDiscount()).toBe(false);
    });
  });

  describe('hasExtras getter', () => {
    it('true when tax or shipping > 0', () => {
      const vo = CartSummaryCompositeVO.create(makeProps() as never);
      expect(vo.hasExtras).toBe(true);
    });

    it('false when no tax/shipping', () => {
      const vo = CartSummaryCompositeVO.create(
        makeProps({ taxAmount: 0, shippingAmount: 0 }) as never,
      );
      expect(vo.hasExtras).toBe(false);
    });
  });
});
