/**
 * MethodControllerMapper — unit tests
 * @module payment-service/test/unit/interfaces/mappers
 */
import { describe, it, expect } from '@jest/globals';
import { MethodControllerMapper } from '@interfaces/mappers/method.controller.mapper';

describe('MethodControllerMapper', () => {
  describe('toAddAppDto', () => {
    it('maps full HTTP DTO', () => {
      const dto = {
        method: 'card',
        type: 'online',
        gateway: 'stripe',
        cardToken: 'tok_visa',
        last4: '4242',
        brand: 'visa',
        expiryMonth: 12,
        expiryYear: 2028,
        holderName: 'Test User',
        walletAddress: '0x123',
        walletNetwork: 'eth',
        isDefault: true,
      };
      const app = MethodControllerMapper.toAddAppDto(dto as never);
      expect(app.method).toBe('card');
      expect(app.cardToken).toBe('tok_visa');
      expect(app.expiryMonth).toBe(12);
      expect(app.isDefault).toBe(true);
    });

    it('handles minimal DTO', () => {
      const dto = { method: 'card', type: 'online' };
      const app = MethodControllerMapper.toAddAppDto(dto as never);
      expect(app.method).toBe('card');
      expect(app.cardToken).toBeUndefined();
    });
  });

  describe('toHttpResponse', () => {
    it('maps full app DTO', () => {
      const app = {
        id: 'm1',
        method: 'card' as never,
        type: 'online' as never,
        gateway: 'stripe' as never,
        label: 'Visa 4242',
        last4: '4242',
        brand: 'visa',
        expiryMonth: 12,
        expiryYear: 2028,
        holderName: 'Test',
        walletAddress: undefined,
        isActive: true,
        isDefault: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-02',
      };
      const http = MethodControllerMapper.toHttpResponse(app);
      expect(http.id).toBe('m1');
      expect(http.label).toBe('Visa 4242');
      expect(http.isActive).toBe(true);
    });
  });

  describe('toSummaryHttp', () => {
    it('maps summary', () => {
      const app = {
        id: 'm1',
        method: 'card' as never,
        type: 'online' as never,
        label: 'Visa',
        isActive: true,
        isDefault: false,
      };
      const http = MethodControllerMapper.toSummaryHttp(app);
      expect(http.id).toBe('m1');
      expect(http.isActive).toBe(true);
    });
  });

  describe('toListHttp', () => {
    it('maps list with pagination', () => {
      const app = {
        items: [
          {
            id: 'm1',
            method: 'card' as never,
            type: 'online' as never,
            label: 'Visa',
            isActive: true,
            isDefault: false,
          },
        ],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      };
      const http = MethodControllerMapper.toListHttp(app);
      expect(http.items).toHaveLength(1);
      expect(http.total).toBe(1);
      expect(http.totalPages).toBe(1);
    });
  });
});
