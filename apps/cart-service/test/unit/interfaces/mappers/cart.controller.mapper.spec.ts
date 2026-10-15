/**
 * CartControllerMapper — Unit Tests
 * @module test/unit/interfaces/mappers
 */
import { describe, it, expect } from '@jest/globals';
import { CartControllerMapper } from '../../../../src/module/interfaces/mappers/cart.controller.mapper.js';
import { makeCreateCartDto, makeListCartsQuery } from '../../../fixtures/interfaces/http-dto.fixture.js';

describe('CartControllerMapper', () => {
  // ═══ HTTP → App ═══

  describe('toCreateAppDto', () => {
    it('should map CreateCartHttpDTO to App DTO', () => {
      const http = makeCreateCartDto({ type: 'user', currency: 'BDT' });
      const app = CartControllerMapper.toCreateAppDto(http);
      expect(app.type).toBe('user');
      expect(app.currency).toBe('BDT');
    });

    it('should handle optional sessionId', () => {
      const http = makeCreateCartDto({ sessionId: 'sess_123' });
      const app = CartControllerMapper.toCreateAppDto(http);
      expect(app.sessionId).toBe('sess_123');
    });

    it('should default type to user when missing', () => {
      const http = makeCreateCartDto({ type: undefined });
      const app = CartControllerMapper.toCreateAppDto(http);
      expect(app.type).toBe('user');
    });

    it('should default currency to BDT when missing', () => {
      const http = makeCreateCartDto({ currency: undefined });
      const app = CartControllerMapper.toCreateAppDto(http);
      expect(app.currency).toBe('BDT');
    });
  });

  describe('toUpdateAppDto', () => {
    it('should map cartId + notes', () => {
      const app = CartControllerMapper.toUpdateAppDto('cart-1', { notes: 'test' });
      expect(app.cartId).toBe('cart-1');
      expect(app.notes).toBe('test');
    });
  });

  describe('toListOptions', () => {
    it('should default page/limit', () => {
      const opts = CartControllerMapper.toListOptions({} as never);
      expect(opts.page).toBe(1);
      expect(opts.limit).toBe(20);
    });

    it('should map filter fields', () => {
      const q = makeListCartsQuery({
        status: 'active',
        type: 'user',
        currency: 'BDT',
      });
      const opts = CartControllerMapper.toListOptions(q);
      expect(opts.filter?.status).toBe('active');
      expect(opts.filter?.type).toBe('user');
      expect(opts.filter?.currency).toBe('BDT');
    });
  });

  // ═══ App → HTTP ═══

  describe('toHttpResponse', () => {
    it('should map full CartResponseDTO', () => {
      const app = {
        id: 'cart-1',
        type: 'user',
        status: 'active',
        itemCount: 3,
        subtotal: 100,
        discountAmount: 10,
        taxAmount: 13.5,
        shippingAmount: 60,
        total: 163.5,
        currency: 'BDT',
        expiresAt: '2026-12-31T00:00:00.000Z',
        lastActivityAt: '2026-01-01T00:00:00.000Z',
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      };
      const http = CartControllerMapper.toHttpResponse(app as never);
      expect(http.id).toBe('cart-1');
      expect(http.total).toBe(163.5);
    });
  });

  describe('toInitiateHttp', () => {
    it('should map to success response', () => {
      const app = {
        success: true,
        cartId: 'cart-1',
        type: 'user',
        status: 'active',
        createdAt: '2026-01-01T00:00:00.000Z',
      };
      const http = CartControllerMapper.toInitiateHttp(app as never);
      expect(http.success).toBe(true);
      expect(http.cartId).toBe('cart-1');
    });
  });

  describe('toSummaryHttp', () => {
    it('should map summary shape', () => {
      const app = { id: 'cart-1', itemCount: 3, total: 100, currency: 'BDT' };
      const http = CartControllerMapper.toSummaryHttp(app as never);
      expect(http.id).toBe('cart-1');
      expect(http.itemCount).toBe(3);
    });
  });

  describe('toListHttp', () => {
    it('should map paginated list', () => {
      const app = {
        items: [{ id: 'c1', itemCount: 1, total: 10, currency: 'BDT' }],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      };
      const http = CartControllerMapper.toListHttp(app as never);
      expect(http.items.length).toBe(1);
      expect(http.total).toBe(1);
    });
  });

  describe('toStatsHttp', () => {
    it('should map stats fields', () => {
      const app = {
        total: 10,
        totalValue: 1000,
        averageValue: 100,
        averageItemCount: 3,
        currency: 'BDT',
        byStatus: { active: 8, abandoned: 2 },
        byType: { user: 10 },
      };
      const http = CartControllerMapper.toStatsHttp(app as never);
      expect(http.total).toBe(10);
      expect(http.byStatus['active']).toBe(8);
    });
  });

  describe('toActionHttp', () => {
    it('should map action response', () => {
      const app = { success: true, cartId: 'c1', message: 'Cleared', at: '2026-01-01' };
      const http = CartControllerMapper.toActionHttp(app as never);
      expect(http.success).toBe(true);
      expect(http.message).toBe('Cleared');
    });
  });

  describe('toPublicHttp', () => {
    it('should map public shape with items', () => {
      const app = {
        id: 'cart-1',
        type: 'user',
        status: 'active',
        itemCount: 1,
        subtotal: 100,
        discountAmount: 0,
        taxAmount: 15,
        shippingAmount: 60,
        total: 175,
        currency: 'BDT',
        items: [
          {
            id: 'item-1',
            productId: 'p1',
            quantity: 1,
            unitPrice: 100,
            currency: 'BDT',
            isAvailable: true,
          },
        ],
      };
      const http = CartControllerMapper.toPublicHttp(app as never);
      expect(http.items.length).toBe(1);
      expect(http.items[0].subtotal).toBe(100);
    });
  });
});
