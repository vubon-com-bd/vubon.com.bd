/**
 * CheckoutSessionEntity — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { CheckoutSessionEntity } from '@domain/entities/checkout-session.entity.js';
import { CheckoutSessionVO } from '@domain/composites/checkout-session.vo.js';
import { CheckoutStatusVO } from '@domain/primitives/checkout-status.vo.js';
import { CheckoutStepVO } from '@domain/primitives/checkout-step.vo.js';
import { DeliveryMethodIdVO } from '@domain/primitives/delivery-method-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import {
  fixtureCheckoutId,
  fixtureShippingAddressId,
  UUID_1,
} from '@fixtures/domain/primitive-fixtures.js';

const NOW = '2024-01-01T10:00:00.000Z';

function makeVO() {
  return CheckoutSessionVO.create({
    checkoutId: fixtureCheckoutId,
    status: CheckoutStatusVO.started(),
    currentStep: CheckoutStepVO.cart(),
    startedAt: NOW,
    lastActivityAt: NOW,
  });
}

function makeCreateParams(overrides: Partial<Parameters<typeof CheckoutSessionEntity.create>[0]> = {}) {
  return {
    id: fixtureCheckoutId.value,
    vo: makeVO(),
    now: NOW,
    ...overrides,
  };
}

describe('CheckoutSessionEntity', () => {
  describe('create', () => {
    it('creates session', () => {
      const entity = CheckoutSessionEntity.create(makeCreateParams());
      expect(entity.id).toBe(fixtureCheckoutId.value);
    });
  });

  describe('reconstitute', () => {
    it('rehydrates session', () => {
      const entity = CheckoutSessionEntity.reconstitute({
        id: fixtureCheckoutId.value,
        createdAt: NOW,
        updatedAt: NOW,
        vo: makeVO(),
      });
      expect(entity.id).toBe(fixtureCheckoutId.value);
    });
  });

  describe('setShippingAddress', () => {
    it('sets shipping address', () => {
      const entity = CheckoutSessionEntity.create(makeCreateParams());
      entity.setShippingAddress(fixtureShippingAddressId, NOW);
      expect(entity.vo.hasShippingAddress()).toBe(true);
    });
  });

  describe('setDeliveryMethod', () => {
    it('sets delivery method', () => {
      const entity = CheckoutSessionEntity.create(makeCreateParams());
      entity.setDeliveryMethod(DeliveryMethodIdVO.create(UUID_1), NOW);
      expect(entity.vo.hasDeliveryMethod()).toBe(true);
    });
  });

  describe('setPaymentMethod', () => {
    it('sets payment method', () => {
      const entity = CheckoutSessionEntity.create(makeCreateParams());
      entity.setPaymentMethod('bkash', NOW);
      expect(entity.vo.hasPaymentMethod()).toBe(true);
    });

    it('throws for empty string', () => {
      const entity = CheckoutSessionEntity.create(makeCreateParams());
      expect(() => entity.setPaymentMethod('', NOW)).toThrow(ValidationError);
    });
  });
});

// ═══════════════ Branch edge cases ═══════════════
describe('CheckoutSessionEntity — branch coverage', () => {
  it('getters', () => {
    const entity = CheckoutSessionEntity.create(makeCreateParams());
    expect(entity.vo).toBeDefined();
    expect(entity.checkoutId).toBeDefined();
    expect(entity.currentStep).toBeDefined();
  });
});
