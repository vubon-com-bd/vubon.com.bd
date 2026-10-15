import { describe, it, expect } from '@jest/globals';
import { CartItemMapper } from '../../../../src/module/application/mappers/cart-item.mapper.js';
import { CartItemEntity } from '../../../../src/module/domain/entities/cart-item.entity.js';
import { CartItemIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-id.vo.js';
import { CartIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import { ProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '../../../../src/module/domain/value-objects/primitives/variant-id.vo.js';
import { CartItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartItemNoteVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-note.vo.js';

const ITEM_ID = '123e4567-e89b-12d3-a456-426614174000';
const CART_ID = '223e4567-e89b-12d3-a456-426614174000';
const PRODUCT_ID = '323e4567-e89b-12d3-a456-426614174000';
const VARIANT_ID = '423e4567-e89b-12d3-a456-426614174000';
const NOW = '2024-01-15T10:00:00.000Z';

function makeItem(withVariant = true): CartItemEntity {
  return CartItemEntity.create({
    id: CartItemIdVO.create(ITEM_ID),
    now: NOW,
    props: {
      cartId: CartIdVO.create(CART_ID),
      productId: ProductIdVO.create(PRODUCT_ID),
      variantId: withVariant ? VariantIdVO.create(VARIANT_ID) : undefined,
      quantity: CartItemQuantityVO.create(3),
      status: CartItemStatusVO.active(),
      unitPrice: 250.5,
      currency: 'BDT',
    },
  });
}

describe('CartItemMapper', () => {
  describe('toResponse', () => {
    it('should map all fields correctly', () => {
      const entity = makeItem();
      const dto = CartItemMapper.toResponse(entity);

      expect(dto.id).toBe(ITEM_ID);
      expect(dto.cartId).toBe(CART_ID);
      expect(dto.productId).toBe(PRODUCT_ID);
      expect(dto.variantId).toBe(VARIANT_ID);
      expect(dto.quantity).toBe(3);
      expect(dto.status).toBe('active');
      expect(dto.unitPrice).toBe(250.5);
      expect(dto.currency).toBe('BDT');
      expect(dto.subtotal).toBe(751.5);
    });

    it('should handle item without variant', () => {
      const entity = makeItem(false);
      const dto = CartItemMapper.toResponse(entity);
      expect(dto.variantId).toBeUndefined();
    });

    it('should include note when present', () => {
      const entity = makeItem();
      const now = new Date().toISOString();
      entity.updateNote(CartItemNoteVO.create('gift wrap'), now);
      const dto = CartItemMapper.toResponse(entity);
      expect(dto.note).toBe('gift wrap');
    });
  });

  describe('toPublicResponse', () => {
    it('should produce customer-safe response', () => {
      const entity = makeItem();
      const dto = CartItemMapper.toPublicResponse(entity);

      expect(dto.id).toBe(ITEM_ID);
      expect(dto.productId).toBe(PRODUCT_ID);
      expect(dto.isAvailable).toBe(true);
      expect((dto as Record<string, unknown>).cartId).toBeUndefined();
    });
  });

  describe('toSummary', () => {
    it('should produce minimal summary', () => {
      const entity = makeItem();
      const dto = CartItemMapper.toSummary(entity);

      expect(dto.id).toBe(ITEM_ID);
      expect(dto.productId).toBe(PRODUCT_ID);
      expect(dto.quantity).toBe(3);
      expect(dto.subtotal).toBe(751.5);
    });
  });
});
