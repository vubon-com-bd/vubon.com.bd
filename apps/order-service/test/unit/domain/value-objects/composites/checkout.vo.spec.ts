/**
 * CheckoutVO — Unit Tests
 * @module order-service/test/unit/domain/value-objects/composites
 */
import { describe, it, expect } from '@jest/globals';
import { CheckoutVO } from '@domain/composites/checkout.vo.js';
import { CheckoutStatusVO } from '@domain/primitives/checkout-status.vo.js';
import { CheckoutStepVO } from '@domain/primitives/checkout-step.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import {
  fixtureCheckoutId,
  fixtureCustomerId,
} from '@fixtures/domain/primitive-fixtures.js';

function makeProps(overrides: Partial<Parameters<typeof CheckoutVO.create>[0]> = {}) {
  return {
    id: fixtureCheckoutId,
    customerId: fixtureCustomerId,
    status: CheckoutStatusVO.started(),
    currentStep: CheckoutStepVO.cart(),
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // +1 hour
    ...overrides,
  };
}

describe('CheckoutVO', () => {
  describe('create', () => {
    it('creates with valid props', () => {
      const vo = CheckoutVO.create(makeProps());
      expect(vo.id.value).toBe(fixtureCheckoutId.value);
    });

    it('throws when expiresAt empty', () => {
      expect(() => CheckoutVO.create(makeProps({ expiresAt: '' }))).toThrow(ValidationError);
    });
  });

  describe('isExpired', () => {
    it('false for future expiresAt', () => {
      const vo = CheckoutVO.create(makeProps());
      expect(vo.isExpired()).toBe(false);
    });

    it('true for past expiresAt', () => {
      const vo = CheckoutVO.create(
        makeProps({ expiresAt: new Date(Date.now() - 1000).toISOString() }),
      );
      expect(vo.isExpired()).toBe(true);
    });
  });

  describe('business methods', () => {
    it('isCompleted false for started', () => {
      const vo = CheckoutVO.create(makeProps());
      expect(vo.isCompleted()).toBe(false);
    });

    it('isTerminal false for started', () => {
      const vo = CheckoutVO.create(makeProps());
      expect(vo.isTerminal()).toBe(false);
    });

    it('isAtFinalStep false for cart', () => {
      const vo = CheckoutVO.create(makeProps());
      expect(vo.isAtFinalStep()).toBe(false);
    });

    it('isAtFinalStep true for confirmation', () => {
      const vo = CheckoutVO.create(
        makeProps({ currentStep: CheckoutStepVO.confirmation() }),
      );
      expect(vo.isAtFinalStep()).toBe(true);
    });
  });
});
