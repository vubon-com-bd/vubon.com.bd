/**
 * CartMapper — Unit Tests
 */
import { CartMapper } from '../../../../src/module/application/mappers/cart.mapper.js';
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
const USER = '00000000-0000-0000-0000-000000000001';
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';

function makeItem() {
  return CartItemEntity.create({
    id: 'i1',
    now: NOW,
    props: {
      productId: CartProductIdVO.create(UUID),
      sku: 'SKU',
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

function makeCart(items: CartItemEntity[] = [makeItem()]) {
  const c = CartEntity.create({
    id: UUID,
    now: NOW,
    props: {
      type: CartTypeVO.create(CART_TYPE.USER),
      status: CartStatusVO.create(CART_STATUS.ACTIVE),
      userId: CartUserIdVO.create(USER),
      currency: 'BDT',
      expiresAt: FUTURE,
      lastActivityAt: NOW,
    },
  });
  c['_items'] = items;
  c.recalculateTotals({ now: NOW });
  return c;
}

describe('CartMapper', () => {
  describe('toResponse()', () => {
    it('maps all cart fields', () => {
      const r = CartMapper.toResponse(makeCart());
      expect(r.id).toBe(UUID);
      expect(r.type).toBe(CART_TYPE.USER);
      expect(r.status).toBe(CART_STATUS.ACTIVE);
      expect(r.userId).toBe(USER);
      expect(r.currency).toBe('BDT');
      expect(r.itemCount).toBe(2);
      expect(r.uniqueItemCount).toBe(1);
    });

    it('maps items correctly', () => {
      const r = CartMapper.toResponse(makeCart());
      expect(r.items.length).toBe(1);
      expect(r.items[0].productId).toBe(UUID);
      expect(r.items[0].unitPrice).toBe(100);
      expect(r.items[0].lineSubtotal).toBe(200);
      expect(r.items[0].isSelected).toBe(true);
    });

    it('includes totals', () => {
      const r = CartMapper.toResponse(makeCart());
      expect(r.totals.subtotal).toBe(200);
      expect(r.totals.grandTotal).toBe(200);
    });

    it('handles empty cart', () => {
      const r = CartMapper.toResponse(makeCart([]));
      expect(r.items.length).toBe(0);
      expect(r.itemCount).toBe(0);
    });
  });

  describe('toSummaryResponse()', () => {
    it('maps summary fields', () => {
      const r = CartMapper.toSummaryResponse(makeCart());
      expect(r.id).toBe(UUID);
      expect(r.itemCount).toBe(2);
      expect(r.uniqueItemCount).toBe(1);
      expect(r.subtotal).toBe(200);
      expect(r.total).toBe(200);
      expect(r.hasCoupon).toBe(false);
      expect(r.hasVoucher).toBe(false);
    });

    it('sets hasCoupon when coupon present', () => {
      const c = makeCart();
      c['_couponCode'] = 'SAVE10';
      const r = CartMapper.toSummaryResponse(c);
      expect(r.hasCoupon).toBe(true);
    });
  });

  describe('totalsToResponse()', () => {
    it('maps totals VO to DTO', () => {
      const totals = CartTotalsCompositeVO.calculate({
        currency: 'BDT',
        itemCount: 2,
        subtotal: 200,
        couponDiscount: 20,
        taxRate: 15,
        shippingCost: 30,
      });
      const r = CartMapper.totalsToResponse(totals);
      expect(r.currency).toBe('BDT');
      expect(r.subtotal).toBe(200);
      expect(r.couponDiscount).toBe(20);
      expect(r.taxAmount).toBe(27); // 15% of 180
      expect(r.shippingAmount).toBe(30);
      expect(r.grandTotal).toBe(237);
      expect(r.hasDiscount).toBe(true);
    });
  });
});
