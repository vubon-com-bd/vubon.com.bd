/**
 * CartItemControllerMapper — Unit Tests
 * @module test/unit/interfaces/mappers
 */
import { describe, it, expect } from '@jest/globals';
import { CartItemControllerMapper } from '../../../../src/module/interfaces/mappers/cart-item.controller.mapper.js';
import {
  makeAddItemDto,
  makeSelectItemsDto,
  CART_ID,
  ITEM_ID,
} from '../../../fixtures/interfaces/http-dto.fixture.js';

describe('CartItemControllerMapper', () => {
  describe('toAddAppDto', () => {
    it('should map with cartType default', () => {
      const http = makeAddItemDto({ quantity: 3 });
      const app = CartItemControllerMapper.toAddAppDto(CART_ID, http);
      expect(app.cartId).toBe(CART_ID);
      expect(app.quantity).toBe(3);
      expect(app.cartType).toBe('user');
    });

    it('should propagate idempotencyKey', () => {
      const http = makeAddItemDto();
      const app = CartItemControllerMapper.toAddAppDto(CART_ID, http, 'user', 'idem-123');
      expect(app.idempotencyKey).toBe('idem-123');
    });
  });

  describe('toUpdateAppDto', () => {
    it('should map quantity', () => {
      const app = CartItemControllerMapper.toUpdateAppDto(CART_ID, ITEM_ID, {
        quantity: 3,
      });
      expect(app.itemId).toBe(ITEM_ID);
      expect(app.quantity).toBe(3);
    });
  });

  describe('toUpdateQuantityAppDto', () => {
    it('should map only quantity', () => {
      const app = CartItemControllerMapper.toUpdateQuantityAppDto(CART_ID, ITEM_ID, {
        quantity: 5,
      });
      expect(app.quantity).toBe(5);
    });
  });

  describe('toSelectAppDto', () => {
    it('should spread readonly array to mutable', () => {
      const http = makeSelectItemsDto();
      const app = CartItemControllerMapper.toSelectAppDto(CART_ID, http);
      expect(app.itemIds.length).toBe(1);
      expect(app.selected).toBe(true);
    });
  });

  describe('toListOptions', () => {
    it('should default page/limit', () => {
      const opts = CartItemControllerMapper.toListOptions(CART_ID, {});
      expect(opts.page).toBe(1);
      expect(opts.limit).toBe(20);
      expect(opts.filter?.cartId).toBe(CART_ID);
    });
  });

  describe('toHttpResponse', () => {
    it('should map full item', () => {
      const app = {
        id: ITEM_ID,
        cartId: CART_ID,
        productId: 'p1',
        quantity: 2,
        status: 'active',
        unitPrice: 50,
        currency: 'BDT',
        subtotal: 100,
        addedAt: '2026-01-01',
        updatedAt: '2026-01-01',
      };
      const http = CartItemControllerMapper.toHttpResponse(app as never);
      expect(http.subtotal).toBe(100);
    });
  });

  describe('toPublicHttp', () => {
    it('should map public shape', () => {
      const app = {
        id: ITEM_ID,
        productId: 'p1',
        quantity: 2,
        unitPrice: 50,
        subtotal: 100,
        currency: 'BDT',
        isAvailable: true,
      };
      const http = CartItemControllerMapper.toPublicHttp(app as never);
      expect(http.isAvailable).toBe(true);
    });
  });

  describe('toSummaryHttp', () => {
    it('should map summary', () => {
      const app = { id: ITEM_ID, productId: 'p1', quantity: 2, subtotal: 100 };
      const http = CartItemControllerMapper.toSummaryHttp(app as never);
      expect(http.quantity).toBe(2);
    });
  });

  describe('toListHttp', () => {
    it('should map paginated list', () => {
      const app = {
        items: [{ id: ITEM_ID, productId: 'p1', quantity: 2, subtotal: 100 }],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      };
      const http = CartItemControllerMapper.toListHttp(app as never);
      expect(http.items.length).toBe(1);
    });
  });
});
