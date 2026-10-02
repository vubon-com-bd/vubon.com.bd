/**
 * CartEntity — Unit Tests
 */
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../src/module/domain/entities/cart-item.entity.js';
import { CartTotalsCompositeVO } from '../../../../src/module/domain/value-objects/composites/cart-totals.vo.js';
import { CartStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { CART_STATUS, CART_TYPE, CART_ITEM_STATUS } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER_UUID = '00000000-0000-0000-0000-000000000001';
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';
const PAST = '2020-01-01T00:00:00Z';

function makeProps(overrides = {}) {
  return {
    type: CartTypeVO.create(CART_TYPE.USER),
    status: CartStatusVO.create(CART_STATUS.ACTIVE),
    userId: CartUserIdVO.create(USER_UUID),
    currency: 'BDT',
    expiresAt: FUTURE,
    lastActivityAt: NOW,
    ...overrides,
  };
}

function makeItem(id = UUID) {
  return CartItemEntity.create({
    id,
    now: NOW,
    props: {
      productId: CartProductIdVO.create(UUID),
      sku: 'SKU-1',
      name: 'Item',
      unitPrice: 100,
      quantity: CartItemQuantityVO.create(2),
      discountAmount: 0,
      status: CartItemStatusVO.create(CART_ITEM_STATUS.ACTIVE),
      isAvailable: true,
      currency: 'BDT',
    },
  });
}

describe('CartEntity', () => {
  describe('create()', () => {
    it('creates cart with valid props', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      expect(c.id).toBe(UUID);
      expect(c.type.isUser()).toBe(true);
      expect(c.isActive()).toBe(true);
    });

    it('throws when guest cart has userId', () => {
      expect(() =>
        CartEntity.create({
          id: UUID,
          props: makeProps({ type: CartTypeVO.create(CART_TYPE.GUEST) }),
          now: NOW,
        }),
      ).toThrow();
    });

    it('throws when user cart has no userId', () => {
      expect(() =>
        CartEntity.create({
          id: UUID,
          props: makeProps({ userId: undefined }),
          now: NOW,
        }),
      ).toThrow();
    });

    it('emits CartCreatedEvent', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      expect(c.domainEvents.some((e) => e.type === 'cart.created')).toBe(true);
    });
  });

  describe('addItem()', () => {
    it('adds new item', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      c.addItem(makeItem(), NOW);
      expect(c.uniqueItemCount).toBe(1);
      expect(c.itemCount).toBe(2);
    });

    it('merges with existing item', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      c.addItem(makeItem(), NOW);
      c.addItem(makeItem(), NOW);
      expect(c.uniqueItemCount).toBe(1);
      expect(c.itemCount).toBe(4);
    });

    it('throws when cart expired', () => {
      const c = CartEntity.create({
        id: UUID,
        props: makeProps({ expiresAt: PAST }),
        now: NOW,
      });
      expect(() => c.addItem(makeItem(), NOW)).toThrow();
    });
  });

  describe('removeItem()', () => {
    it('removes existing item', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      c.addItem(makeItem(), NOW);
      c.removeItem(UUID, undefined, NOW);
      expect(c.uniqueItemCount).toBe(0);
    });

    it('no-op for missing item', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      expect(() => c.removeItem('missing', undefined, NOW)).not.toThrow();
    });
  });

  describe('changeItemQuantity()', () => {
    it('updates quantity', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      c.addItem(makeItem(), NOW);
      c.changeItemQuantity(UUID, CartItemQuantityVO.create(5), NOW);
      expect(c.findItem(UUID)?.quantity.value).toBe(5);
    });

    it('throws when item not found', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      expect(() => c.changeItemQuantity('missing', CartItemQuantityVO.create(5), NOW)).toThrow();
    });
  });

  describe('selectItem()', () => {
    it('selects item', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      c.addItem(makeItem(), NOW);
      c.selectItem(UUID, true, NOW);
      expect(c.findItem(UUID)?.isSelected).toBe(true);
    });

    it('deselects item', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      c.addItem(makeItem(), NOW);
      c.selectItem(UUID, false, NOW);
      expect(c.findItem(UUID)?.isSelected).toBe(false);
    });

    it('throws when item not found', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      expect(() => c.selectItem('missing', true, NOW)).toThrow();
    });
  });

  describe('selectedItemCount getter', () => {
    it('counts selected items', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      c.addItem(makeItem(), NOW);
      expect(c.selectedItemCount).toBe(1);
      c.selectItem(UUID, false, NOW);
      expect(c.selectedItemCount).toBe(0);
    });
  });

  describe('clear()', () => {
    it('removes all items and sets status CLEARED', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      c.addItem(makeItem(), NOW);
      c.clear(undefined, NOW);
      expect(c.uniqueItemCount).toBe(0);
      expect(c.status.value).toBe(CART_STATUS.CLEARED);
    });

    it('no-op for empty cart', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      expect(() => c.clear(undefined, NOW)).not.toThrow();
    });
  });

  describe('applyCoupon() / removeCoupon()', () => {
    it('applies coupon on non-empty cart', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      c.addItem(makeItem(), NOW);
      c.applyCoupon('SAVE10', 100, NOW);
      expect(c.couponCode).toBe('SAVE10');
    });

    it('throws on empty cart', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      expect(() => c.applyCoupon('SAVE10', 100, NOW)).toThrow();
    });

    it('removes coupon', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      c.addItem(makeItem(), NOW);
      c.applyCoupon('SAVE10', 100, NOW);
      c.removeCoupon(undefined, NOW);
      expect(c.couponCode).toBeUndefined();
    });
  });

  describe('applyVoucher() / removeVoucher()', () => {
    it('applies voucher on non-empty cart', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      c.addItem(makeItem(), NOW);
      c.applyVoucher('GC-ABCD1234', 100, NOW);
      expect(c.voucherCode).toBe('GC-ABCD1234');
    });

    it('throws on empty cart', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      expect(() => c.applyVoucher('GC-ABCD1234', 100, NOW)).toThrow();
    });
  });

  describe('recalculateTotals()', () => {
    it('computes subtotal from items', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      c.addItem(makeItem(), NOW);
      c.recalculateTotals({ now: NOW });
      expect(c.totals.subtotal).toBe(200);
    });

    it('applies coupon discount', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      c.addItem(makeItem(), NOW);
      c.recalculateTotals({ couponDiscount: 50, now: NOW });
      expect(c.totals.couponDiscount).toBe(50);
    });

    it('applies tax', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      c.addItem(makeItem(), NOW);
      c.recalculateTotals({ taxRate: 15, now: NOW });
      expect(c.totals.taxAmount).toBe(30);
    });

    it('adds shipping', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      c.addItem(makeItem(), NOW);
      c.recalculateTotals({ shippingCost: 50, now: NOW });
      expect(c.totals.shippingAmount).toBe(50);
    });
  });

  describe('abandon()', () => {
    it('sets status ABANDONED', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      c.addItem(makeItem(), NOW);
      c.abandon(undefined, NOW);
      expect(c.status.isAbandoned()).toBe(true);
    });

    it('throws when already abandoned', () => {
      const c = CartEntity.create({
        id: UUID,
        props: makeProps({ status: CartStatusVO.create(CART_STATUS.ABANDONED) }),
        now: NOW,
      });
      expect(() => c.abandon(undefined, NOW)).toThrow();
    });
  });

  describe('expire()', () => {
    it('sets status EXPIRED', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      c.expire(NOW);
      expect(c.status.isExpired()).toBe(true);
    });
  });

  describe('softDelete()', () => {
    it('sets deletedAt + status CLEARED', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      c.softDelete(undefined, NOW);
      expect(c.isDeleted()).toBe(true);
      expect(c.status.isCleared()).toBe(true);
    });
  });

  describe('canCheckout()', () => {
    it('false when empty', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      expect(c.canCheckout()).toBe(false);
    });

    it('true when active + has items', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      c.addItem(makeItem(), NOW);
      expect(c.canCheckout()).toBe(true);
    });

    it('false when expired cart has items (built via reconstitute)', () => {
      const c = CartEntity.reconstitute({
        id: UUID,
        createdAt: NOW,
        updatedAt: NOW,
        props: makeProps({ expiresAt: PAST }),
        totals: CartTotalsCompositeVO.empty('BDT'),
        items: [makeItem()],
      });
      expect(c.canCheckout()).toBe(false);
    });
  });

  describe('domain events', () => {
    it('emits ItemAddedEvent on new item', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      c.addItem(makeItem(), NOW);
      expect(c.domainEvents.some((e) => e.type === 'cart.item.added')).toBe(true);
    });

    it('emits ItemQuantityChangedEvent on merge', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      c.addItem(makeItem(), NOW);
      c.addItem(makeItem(), NOW);
      expect(c.domainEvents.some((e) => e.type === 'cart.item.quantity.changed')).toBe(true);
    });

    it('emits ItemRemovedEvent on removal', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      c.addItem(makeItem(), NOW);
      c.removeItem(UUID, undefined, NOW);
      expect(c.domainEvents.some((e) => e.type === 'cart.item.removed')).toBe(true);
    });

    it('emits CouponAppliedEvent on applyCoupon', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      c.addItem(makeItem(), NOW);
      c.applyCoupon('SAVE10', 100, NOW);
      expect(c.domainEvents.some((e) => e.type === 'cart.coupon.applied')).toBe(true);
    });

    it('emits CartClearedEvent on clear', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      c.addItem(makeItem(), NOW);
      c.clear(undefined, NOW);
      expect(c.domainEvents.some((e) => e.type === 'cart.cleared')).toBe(true);
    });

    it('emits CartAbandonedEvent on abandon', () => {
      const c = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
      c.addItem(makeItem(), NOW);
      c.abandon(undefined, NOW);
      expect(c.domainEvents.some((e) => e.type === 'cart.abandoned')).toBe(true);
    });
  });

  describe('reconstitute()', () => {
    it('rebuilds cart with items', () => {
      const c = CartEntity.reconstitute({
        id: UUID,
        createdAt: NOW,
        updatedAt: NOW,
        props: makeProps(),
        totals: CartTotalsCompositeVO.empty('BDT'),
        items: [makeItem()],
      });
      expect(c.uniqueItemCount).toBe(1);
    });
  });
});
