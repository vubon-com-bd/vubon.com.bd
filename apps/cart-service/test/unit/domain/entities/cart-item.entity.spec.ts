/**
 * CartItemEntity — Unit Tests
 */
import { CartItemEntity } from '../../../../src/module/domain/entities/cart-item.entity.js';
import { CartItemIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-id.vo.js';
import { CartItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { CART_ITEM_STATUS, CART_LIMIT } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00Z';

function makeProps(overrides: Partial<Parameters<typeof CartItemEntity.create>[0]['props']> = {}) {
  return {
    productId: CartProductIdVO.create(UUID),
    sku: 'SKU-001',
    name: 'Test Product',
    unitPrice: 100,
    quantity: CartItemQuantityVO.create(2),
    discountAmount: 0,
    status: CartItemStatusVO.create(CART_ITEM_STATUS.ACTIVE),
    isAvailable: true,
    currency: 'BDT',
    ...overrides,
  };
}

describe('CartItemEntity', () => {
  describe('create()', () => {
    it('creates entity with valid props', () => {
      const e = CartItemEntity.create({ id: UUID, props: makeProps(), now: NOW });
      expect(e.id).toBe(UUID);
      expect(e.unitPrice).toBe(100);
      expect(e.quantity.value).toBe(2);
    });

    it('throws on negative unit price', () => {
      expect(() =>
        CartItemEntity.create({ id: UUID, props: makeProps({ unitPrice: -1 }), now: NOW }),
      ).toThrow();
    });

    it('throws on negative discount', () => {
      expect(() =>
        CartItemEntity.create({ id: UUID, props: makeProps({ discountAmount: -1 }), now: NOW }),
      ).toThrow();
    });

    it('throws when discount exceeds line subtotal', () => {
      expect(() =>
        CartItemEntity.create({
          id: UUID,
          props: makeProps({ unitPrice: 100, discountAmount: 999 }),
          now: NOW,
        }),
      ).toThrow();
    });

    it('throws on empty SKU', () => {
      expect(() =>
        CartItemEntity.create({ id: UUID, props: makeProps({ sku: '' }), now: NOW }),
      ).toThrow();
    });

    it('throws when compareAtPrice < unitPrice', () => {
      expect(() =>
        CartItemEntity.create({
          id: UUID,
          props: makeProps({ unitPrice: 100, compareAtPrice: 50 }),
          now: NOW,
        }),
      ).toThrow();
    });
  });

  describe('lineSubtotal / lineTotal', () => {
    it('lineSubtotal = unitPrice × quantity', () => {
      const e = CartItemEntity.create({ id: UUID, props: makeProps(), now: NOW });
      expect(e.lineSubtotal).toBe(200);
    });

    it('lineTotal = subtotal - discount', () => {
      const e = CartItemEntity.create({
        id: UUID,
        props: makeProps({ discountAmount: 50 }),
        now: NOW,
      });
      expect(e.lineTotal).toBe(150);
    });
  });

  describe('changeQuantity()', () => {
    it('updates quantity', () => {
      const e = CartItemEntity.create({ id: UUID, props: makeProps(), now: NOW });
      e.changeQuantity(CartItemQuantityVO.create(5), '2026-01-02T00:00:00Z');
      expect(e.quantity.value).toBe(5);
    });

    it('throws when item is removed', () => {
      const e = CartItemEntity.create({ id: UUID, props: makeProps(), now: NOW });
      e.markRemoved('2026-01-02T00:00:00Z');
      expect(() => e.changeQuantity(CartItemQuantityVO.create(5), NOW)).toThrow();
    });
  });

  describe('applyDiscount()', () => {
    it('applies valid discount', () => {
      const e = CartItemEntity.create({ id: UUID, props: makeProps(), now: NOW });
      e.applyDiscount(50, '2026-01-02T00:00:00Z');
      expect(e.discountAmount).toBe(50);
    });

    it('throws on negative discount', () => {
      const e = CartItemEntity.create({ id: UUID, props: makeProps(), now: NOW });
      expect(() => e.applyDiscount(-1, NOW)).toThrow();
    });

    it('throws when exceeding line subtotal', () => {
      const e = CartItemEntity.create({ id: UUID, props: makeProps(), now: NOW });
      expect(() => e.applyDiscount(9999, NOW)).toThrow();
    });
  });

  describe('markUnavailable() / markAvailable()', () => {
    it('markUnavailable sets unavailable + deselects', () => {
      const e = CartItemEntity.create({ id: UUID, props: makeProps(), now: NOW });
      e.markUnavailable('2026-01-02T00:00:00Z');
      expect(e.isAvailable).toBe(false);
      expect(e.isSelected).toBe(false);
    });

    it('markAvailable sets available', () => {
      const e = CartItemEntity.create({
        id: UUID,
        props: makeProps({ isAvailable: false }),
        now: NOW,
      });
      e.markAvailable('2026-01-02T00:00:00Z');
      expect(e.isAvailable).toBe(true);
    });
  });

  describe('setSelected()', () => {
    it('sets selected true for purchasable item', () => {
      const e = CartItemEntity.create({ id: UUID, props: makeProps(), now: NOW });
      e.setSelected(true, NOW);
      expect(e.isSelected).toBe(true);
    });

    it('throws when selecting unavailable item', () => {
      const e = CartItemEntity.create({
        id: UUID,
        props: makeProps({ isAvailable: false }),
        now: NOW,
      });
      expect(() => e.setSelected(true, NOW)).toThrow();
    });

    it('allows deselecting unavailable item', () => {
      const e = CartItemEntity.create({
        id: UUID,
        props: makeProps({ isAvailable: false }),
        now: NOW,
      });
      expect(() => e.setSelected(false, NOW)).not.toThrow();
    });
  });

  describe('updateUnitPrice()', () => {
    it('updates unit price', () => {
      const e = CartItemEntity.create({ id: UUID, props: makeProps(), now: NOW });
      e.updateUnitPrice(500, '2026-01-02T00:00:00Z');
      expect(e.unitPrice).toBe(500);
    });

    it('throws on negative price', () => {
      const e = CartItemEntity.create({ id: UUID, props: makeProps(), now: NOW });
      expect(() => e.updateUnitPrice(-1, NOW)).toThrow();
    });
  });

  describe('isPurchasable()', () => {
    it('true when available + active', () => {
      const e = CartItemEntity.create({ id: UUID, props: makeProps(), now: NOW });
      expect(e.isPurchasable()).toBe(true);
    });

    it('false when unavailable', () => {
      const e = CartItemEntity.create({
        id: UUID,
        props: makeProps({ isAvailable: false }),
        now: NOW,
      });
      expect(e.isPurchasable()).toBe(false);
    });
  });

  describe('canIncreaseQuantity()', () => {
    it('true within max', () => {
      const e = CartItemEntity.create({
        id: UUID,
        props: makeProps({ quantity: CartItemQuantityVO.create(2) }),
        now: NOW,
      });
      expect(e.canIncreaseQuantity(5)).toBe(true);
    });

    it('false beyond max', () => {
      const e = CartItemEntity.create({
        id: UUID,
        props: makeProps({ quantity: CartItemQuantityVO.create(CART_LIMIT.MAX_QUANTITY_PER_ITEM) }),
        now: NOW,
      });
      expect(e.canIncreaseQuantity(1)).toBe(false);
    });
  });

  describe('markRemoved()', () => {
    it('sets status + unavailable + deselects', () => {
      const e = CartItemEntity.create({ id: UUID, props: makeProps(), now: NOW });
      e.markRemoved('2026-01-02T00:00:00Z');
      expect(e.status.isRemoved()).toBe(true);
      expect(e.isAvailable).toBe(false);
      expect(e.isSelected).toBe(false);
    });
  });

  describe('reconstitute()', () => {
    it('skips validation on construction', () => {
      const e = CartItemEntity.reconstitute({
        id: UUID,
        createdAt: NOW,
        updatedAt: NOW,
        props: makeProps(),
      });
      expect(e.id).toBe(UUID);
    });
  });

  describe('toIdVO()', () => {
    it('returns CartItemIdVO', () => {
      const e = CartItemEntity.create({ id: UUID, props: makeProps(), now: NOW });
      const vo = e.toIdVO;
      expect(vo.value).toBe(UUID);
    });
  });
});
