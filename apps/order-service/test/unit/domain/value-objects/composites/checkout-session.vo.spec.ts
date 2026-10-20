/**
 * CheckoutSessionVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { CheckoutSessionVO } from '@domain/composites/checkout-session.vo.js';
import { CheckoutStatusVO } from '@domain/primitives/checkout-status.vo.js';
import { CheckoutStepVO } from '@domain/primitives/checkout-step.vo.js';
import { DeliveryMethodIdVO } from '@domain/primitives/delivery-method-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import {
  fixtureCheckoutId,
  fixtureShippingAddressId,
  fixtureDeliveryMethodId,
  UUID_1,
} from '@fixtures/domain/primitive-fixtures.js';

function makeProps(overrides: Partial<Parameters<typeof CheckoutSessionVO.create>[0]> = {}) {
  return {
    checkoutId: fixtureCheckoutId,
    status: CheckoutStatusVO.started(),
    currentStep: CheckoutStepVO.cart(),
    startedAt: new Date().toISOString(),
    lastActivityAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('CheckoutSessionVO', () => {
  describe('create', () => {
    it('creates with minimal props', () => {
      const vo = CheckoutSessionVO.create(makeProps());
      expect(vo.checkoutId.value).toBe(fixtureCheckoutId.value);
    });

    it('creates with shipping address', () => {
      const vo = CheckoutSessionVO.create(
        makeProps({ shippingAddressId: fixtureShippingAddressId }),
      );
      expect(vo.hasShippingAddress()).toBe(true);
    });

    it('creates with delivery method', () => {
      const vo = CheckoutSessionVO.create(
        makeProps({ deliveryMethodId: fixtureDeliveryMethodId }),
      );
      expect(vo.hasDeliveryMethod()).toBe(true);
    });

    it('creates with payment method', () => {
      const vo = CheckoutSessionVO.create(makeProps({ paymentMethod: 'bkash' }));
      expect(vo.hasPaymentMethod()).toBe(true);
    });

    it('throws for empty paymentMethod', () => {
      expect(() => CheckoutSessionVO.create(makeProps({ paymentMethod: '' }))).toThrow(
        ValidationError,
      );
    });
  });

  describe('has*', () => {
    it('hasShippingAddress false when not set', () => {
      const vo = CheckoutSessionVO.create(makeProps());
      expect(vo.hasShippingAddress()).toBe(false);
    });

    it('hasDeliveryMethod false when not set', () => {
      const vo = CheckoutSessionVO.create(makeProps());
      expect(vo.hasDeliveryMethod()).toBe(false);
    });

    it('hasPaymentMethod false when not set', () => {
      const vo = CheckoutSessionVO.create(makeProps());
      expect(vo.hasPaymentMethod()).toBe(false);
    });
  });

  describe('canComplete', () => {
    it('false when missing required fields', () => {
      const vo = CheckoutSessionVO.create(makeProps());
      expect(vo.canComplete()).toBe(false);
    });

    it('false when only shipping set', () => {
      const vo = CheckoutSessionVO.create(
        makeProps({ shippingAddressId: fixtureShippingAddressId }),
      );
      expect(vo.canComplete()).toBe(false);
    });

    it('true when all required set', () => {
      const vo = CheckoutSessionVO.create(
        makeProps({
          shippingAddressId: fixtureShippingAddressId,
          deliveryMethodId: DeliveryMethodIdVO.create(UUID_1),
          paymentMethod: 'bkash',
        }),
      );
      expect(vo.canComplete()).toBe(true);
    });
  });
});
