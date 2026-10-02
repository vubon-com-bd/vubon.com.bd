import { jest } from '@jest/globals';
void jest;

import { CartItemMapper } from '../../../../src/module/application/mappers/cart-item.mapper.js';
import { CartItemEntity } from '../../../../src/module/domain/entities/cart-item.entity.js';
import { CartItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { CART_ITEM_STATUS } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const ITEM_UUID = '11111111-1111-1111-1111-111111111111';
const NOW = '2026-01-01T00:00:00Z';

function makeItem(overrides = {}) {
  return CartItemEntity.create({
    id: ITEM_UUID,
    now: NOW,
    props: {
      productId: CartProductIdVO.create(UUID),
      sku: 'SKU-1',
      name: 'Test',
      unitPrice: 100,
      quantity: CartItemQuantityVO.create(2),
      discountAmount: 0,
      status: CartItemStatusVO.create(CART_ITEM_STATUS.ACTIVE),
      isAvailable: true,
      currency: 'BDT',
      ...overrides,
    },
  });
}

describe('CartItemMapper', () => {
  describe('toResponse()', () => {
    it('maps all item fields', () => {
      const r = CartItemMapper.toResponse(makeItem(), UUID);
      expect(r.id).toBe(ITEM_UUID);
      expect(r.cartId).toBe(UUID);
      expect(r.productId).toBe(UUID);
      expect(r.sku).toBe('SKU-1');
      expect(r.unitPrice).toBe(100);
      expect(r.quantity).toBe(2);
      expect(r.lineSubtotal).toBe(200);
      expect(r.lineTotal).toBe(200);
      expect(r.isAvailable).toBe(true);
      expect(r.isSelected).toBe(true);
    });

    it('maps discount', () => {
      const r = CartItemMapper.toResponse(makeItem({ discountAmount: 50 }), UUID);
      expect(r.discountAmount).toBe(50);
      expect(r.lineTotal).toBe(150);
    });
  });

  describe('toResponseList()', () => {
    it('maps list', () => {
      const items = [makeItem(), makeItem()];
      const r = CartItemMapper.toResponseList(items, UUID);
      expect(r.length).toBe(2);
      expect(r[0].cartId).toBe(UUID);
    });

    it('handles empty list', () => {
      const r = CartItemMapper.toResponseList([], UUID);
      expect(r.length).toBe(0);
    });
  });
});
