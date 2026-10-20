/**
 * Checkout & CheckoutSession Mappers — Unit Tests
 * @module order-service/test/unit/application/mappers
 */
import { describe, it, expect } from '@jest/globals';
import {
  CheckoutMapper,
  CheckoutSessionMapper,
} from '@application/mappers/checkout.mapper.js';
import {
  makeCheckoutEntityStub,
  makeCheckoutSessionEntityStub,
} from '@fixtures/application/entity-factories.js';

describe('CheckoutMapper', () => {
  describe('toResponse', () => {
    it('maps full checkout', () => {
      const entity = makeCheckoutEntityStub();
      const dto = CheckoutMapper.toResponse(entity);
      expect(dto.id).toBe(entity.id);
      expect(dto.status).toBe('started');
      expect(dto.currentStep).toBe('cart');
      expect(dto.expiresAt).toBe('2024-06-15T13:00:00.000Z');
    });
  });

  describe('toPublicResponse', () => {
    it('hides customerId', () => {
      const entity = makeCheckoutEntityStub();
      const dto = CheckoutMapper.toPublicResponse(entity);
      expect(dto.id).toBe(entity.id);
      expect(dto.status).toBe('started');
      expect((dto as unknown as Record<string, unknown>).customerId).toBeUndefined();
    });
  });
});

describe('CheckoutSessionMapper', () => {
  describe('toResponse', () => {
    it('maps session state', () => {
      const entity = makeCheckoutSessionEntityStub();
      const dto = CheckoutSessionMapper.toResponse(entity);
      expect(dto.id).toBe(entity.id);
      expect(dto.status).toBe('started');
      expect(dto.currentStep).toBe('cart');
      expect(dto.paymentMethod).toBe('bkash');
    });

    it('handles missing optional fields', () => {
      const entity = makeCheckoutSessionEntityStub({
        shippingAddressId: undefined,
        deliveryMethodId: undefined,
        paymentMethod: undefined,
      });
      const dto = CheckoutSessionMapper.toResponse(entity);
      expect(dto.shippingAddressId).toBeUndefined();
      expect(dto.paymentMethod).toBeUndefined();
    });
  });
});
