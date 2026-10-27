/**
 * CheckoutEntity — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { CheckoutEntity } from '@domain/entities/checkout.entity.js';
import { CheckoutVO } from '@domain/composites/checkout.vo.js';
import { CheckoutStatusVO } from '@domain/primitives/checkout-status.vo.js';
import { CheckoutStepVO } from '@domain/primitives/checkout-step.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { fixtureCheckoutId, fixtureCustomerId, UUID_1 } from '@fixtures/domain/primitive-fixtures.js';

const NOW = '2024-01-01T10:00:00.000Z';

function makeCheckoutVO(status: 'started' | 'in_progress' = 'started', step: string = 'cart') {
  return CheckoutVO.create({
    id: fixtureCheckoutId,
    customerId: fixtureCustomerId,
    status: CheckoutStatusVO.create(status),
    currentStep: CheckoutStepVO.create(step),
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  });
}

function makeCreateParams(overrides: Partial<Parameters<typeof CheckoutEntity.create>[0]> = {}) {
  return {
    id: fixtureCheckoutId.value,
    vo: makeCheckoutVO(),
    now: NOW,
    ...overrides,
  };
}

describe('CheckoutEntity', () => {
  describe('create', () => {
    it('creates started checkout', () => {
      const entity = CheckoutEntity.create(makeCreateParams());
      expect(entity.id).toBe(fixtureCheckoutId.value);
      expect(entity.isStarted()).toBe(true);
    });

    it('emits CheckoutStartedEvent', () => {
      const entity = CheckoutEntity.create(makeCreateParams());
      const events = entity.domainEvents;
      expect(events.length).toBe(1);
      expect(events[0].type).toBe('order.checkout.started');
    });

    it('throws for non-started status', () => {
      expect(() =>
        CheckoutEntity.create({
          id: fixtureCheckoutId.value,
          vo: makeCheckoutVO('in_progress'),
          now: NOW,
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('rehydrates existing checkout', () => {
      const entity = CheckoutEntity.reconstitute({
        id: fixtureCheckoutId.value,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeCheckoutVO() },
      });
      expect(entity.id).toBe(fixtureCheckoutId.value);
    });
  });

  describe('advanceTo', () => {
    it('advances to next step', () => {
      const entity = CheckoutEntity.create(makeCreateParams());
      entity.advanceTo(CheckoutStepVO.create('shipping_address'), NOW);
      expect(entity.currentStep.value).toBe('shipping_address');
      expect(entity.status.isInProgress()).toBe(true);
    });

    it('throws on skipping step', () => {
      const entity = CheckoutEntity.create(makeCreateParams());
      expect(() => entity.advanceTo(CheckoutStepVO.create('review'), NOW)).toThrow(
        BusinessRuleError,
      );
    });

    it('throws on terminal checkout', () => {
      const entity = CheckoutEntity.create(makeCreateParams());
      entity.abandon(undefined, NOW);
      expect(() => entity.advanceTo(CheckoutStepVO.create('shipping_address'), NOW)).toThrow(
        BusinessRuleError,
      );
    });
  });

  describe('complete', () => {
    it('completes checkout and emits event', () => {
      const entity = CheckoutEntity.create(makeCreateParams());
      entity.advanceTo(CheckoutStepVO.create('shipping_address'), NOW);
      const beforeCount = entity.domainEvents.length;
      entity.complete(UUID_1, NOW);
      expect(entity.isCompleted()).toBe(true);
      expect(entity.domainEvents.length).toBe(beforeCount + 1);
    });
  });

  describe('abandon', () => {
    it('abandons checkout', () => {
      const entity = CheckoutEntity.create(makeCreateParams());
      entity.abandon('user left', NOW);
      expect(entity.isAbandoned()).toBe(true);
    });

    it('throws when abandoning completed checkout', () => {
      const entity = CheckoutEntity.create(makeCreateParams());
      entity.complete(UUID_1, NOW);
      expect(() => entity.abandon(undefined, NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('expire', () => {
    it('expires checkout', () => {
      const entity = CheckoutEntity.create(makeCreateParams());
      entity.expire(NOW);
      expect(entity.isExpired()).toBe(true);
    });

    it('does nothing when already terminal', () => {
      const entity = CheckoutEntity.create(makeCreateParams());
      entity.complete(UUID_1, NOW);
      const beforeVersion = entity.version;
      entity.expire(NOW);
      expect(entity.version).toBe(beforeVersion);
    });
  });

  describe('predicates', () => {
    it('isTerminal false for started', () => {
      const entity = CheckoutEntity.create(makeCreateParams());
      expect(entity.isTerminal()).toBe(false);
    });

    it('isTerminal true for completed', () => {
      const entity = CheckoutEntity.create(makeCreateParams());
      entity.complete(UUID_1, NOW);
      expect(entity.isTerminal()).toBe(true);
    });
  });
});

// ═══════════════ Branch edge cases ═══════════════
describe('CheckoutEntity — branch coverage', () => {
  describe('abandon branch', () => {
    it('abandons with undefined reason', () => {
      const entity = CheckoutEntity.create(makeCreateParams());
      entity.abandon(undefined, NOW);
      expect(entity.isAbandoned()).toBe(true);
    });

    it('abandons with explicit reason', () => {
      const entity = CheckoutEntity.create(makeCreateParams());
      entity.abandon('user timeout', NOW);
      expect(entity.isAbandoned()).toBe(true);
    });
  });

  describe('expire branch', () => {
    it('expires in-progress checkout', () => {
      const entity = CheckoutEntity.create(makeCreateParams());
      entity.advanceTo(CheckoutStepVO.create('shipping_address'), NOW);
      entity.expire(NOW);
      expect(entity.isExpired()).toBe(true);
    });

    it('does nothing when already expired', () => {
      const entity = CheckoutEntity.create(makeCreateParams());
      entity.expire(NOW);
      const version = entity.version;
      entity.expire(NOW);
      expect(entity.version).toBe(version);
    });
  });

  describe('complete on terminal', () => {
    it('throws when completing abandoned checkout', () => {
      const entity = CheckoutEntity.create(makeCreateParams());
      entity.abandon(undefined, NOW);
      expect(() => entity.complete(UUID_1, NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('currentStep getter', () => {
    it('returns current step', () => {
      const entity = CheckoutEntity.create(makeCreateParams());
      expect(entity.currentStep.value).toBe('cart');
    });
  });
});
