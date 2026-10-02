/**
 * CartItemCompositeVO — Unit Tests
 */
import { CartItemCompositeVO } from '../../../../../src/module/domain/value-objects/composites/cart-item.vo.js';
import { CartItemIdVO } from '../../../../../src/module/domain/value-objects/primitives/cart-item-id.vo.js';
import { CartItemQuantityVO } from '../../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { CART_ITEM_STATUS, CART_LIMIT } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeProps(overrides: Partial<Parameters<typeof CartItemCompositeVO.create>[0]> = {}) {
  return {
    id: CartItemIdVO.create(UUID),
    productId: CartProductIdVO.create(UUID),
    sku: 'SKU-1',
    name: 'Test Product',
    unitPrice: 100,
    quantity: CartItemQuantityVO.create(2),
    discountAmount: 0,
    status: CartItemStatusVO.create(CART_ITEM_STATUS.ACTIVE),
    isAvailable: true,
    currency: 'BDT',
    addedAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
    ...overrides,
  };
}

describe('CartItemCompositeVO', () => {
  describe('create()', () => {
    it('creates valid VO', () => {
      const vo = CartItemCompositeVO.create(makeProps());
      expect(vo.unitPrice).toBe(100);
      expect(vo.quantity).toBe(2);
    });

    it('throws on negative unit price', () => {
      expect(() => CartItemCompositeVO.create(makeProps({ unitPrice: -1 }))).toThrow();
    });

    it('throws on negative discount', () => {
      expect(() => CartItemCompositeVO.create(makeProps({ discountAmount: -1 }))).toThrow();
    });

    it('throws when discount exceeds line subtotal', () => {
      expect(() =>
        CartItemCompositeVO.create(makeProps({ unitPrice: 100, discountAmount: 9999 })),
      ).toThrow();
    });

    it('throws when compareAtPrice < unitPrice', () => {
      expect(() =>
        CartItemCompositeVO.create(makeProps({ unitPrice: 100, compareAtPrice: 50 })),
      ).toThrow();
    });

    it('throws on empty SKU', () => {
      expect(() => CartItemCompositeVO.create(makeProps({ sku: '' }))).toThrow();
    });
  });

  describe('lineSubtotal getter', () => {
    it('computes unitPrice × quantity', () => {
      const vo = CartItemCompositeVO.create(makeProps({ unitPrice: 100 }));
      expect(vo.lineSubtotal).toBe(200);
    });
  });

  describe('lineTotal getter', () => {
    it('subtracts discount from line subtotal', () => {
      const vo = CartItemCompositeVO.create(
        makeProps({ unitPrice: 100, discountAmount: 50 }),
      );
      expect(vo.lineTotal).toBe(150);
    });
  });

  describe('discountPercent getter', () => {
    it('computes percent of subtotal', () => {
      const vo = CartItemCompositeVO.create(
        makeProps({ unitPrice: 100, discountAmount: 50 }),
      );
      expect(vo.discountPercent).toBe(25);
    });

    it('returns 0 for zero subtotal', () => {
      const vo = CartItemCompositeVO.reconstitute(
        makeProps({ unitPrice: 0, discountAmount: 0 }),
      );
      expect(vo.discountPercent).toBe(0);
    });
  });

  describe('savings getter', () => {
    it('computes total savings vs compareAtPrice', () => {
      const vo = CartItemCompositeVO.create(
        makeProps({ unitPrice: 80, compareAtPrice: 100 }),
      );
      expect(vo.savings).toBe(40);
    });

    it('returns 0 when no compareAtPrice', () => {
      const vo = CartItemCompositeVO.create(makeProps({ unitPrice: 100 }));
      expect(vo.savings).toBe(0);
    });
  });

  describe('isPurchasable()', () => {
    it('true when available + active', () => {
      expect(CartItemCompositeVO.create(makeProps()).isPurchasable()).toBe(true);
    });

    it('false when unavailable', () => {
      expect(CartItemCompositeVO.create(makeProps({ isAvailable: false })).isPurchasable()).toBe(
        false,
      );
    });

    it('false when status not purchasable', () => {
      expect(
        CartItemCompositeVO.create(
          makeProps({ status: CartItemStatusVO.create(CART_ITEM_STATUS.REMOVED) }),
        ).isPurchasable(),
      ).toBe(false);
    });
  });

  describe('canIncreaseQuantity()', () => {
    it('true within limit', () => {
      const vo = CartItemCompositeVO.create(makeProps({ quantity: CartItemQuantityVO.create(2) }));
      expect(vo.canIncreaseQuantity(5)).toBe(true);
    });

    it('false beyond max', () => {
      const vo = CartItemCompositeVO.create(
        makeProps({ quantity: CartItemQuantityVO.create(CART_LIMIT.MAX_QUANTITY_PER_ITEM) }),
      );
      expect(vo.canIncreaseQuantity(1)).toBe(false);
    });
  });

  describe('withQuantity() / withStatus() / withUnitPrice()', () => {
    it('withQuantity returns new instance', () => {
      const vo = CartItemCompositeVO.create(makeProps());
      const updated = vo.withQuantity(CartItemQuantityVO.create(5));
      expect(updated.quantity).toBe(5);
      expect(vo.quantity).toBe(2);
    });

    it('withStatus returns new instance', () => {
      const vo = CartItemCompositeVO.create(makeProps());
      const updated = vo.withStatus(CartItemStatusVO.create(CART_ITEM_STATUS.SAVED));
      expect(updated.status.value).toBe(CART_ITEM_STATUS.SAVED);
    });

    it('withUnitPrice returns new instance', () => {
      const vo = CartItemCompositeVO.create(makeProps());
      const updated = vo.withUnitPrice(500);
      expect(updated.unitPrice).toBe(500);
    });
  });
});
