/**
 * SubscriptionStatusVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { SubscriptionStatusVO } from '@domain/primitives/subscription-status.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('SubscriptionStatusVO', () => {
  describe('create()', () => {
    it('accepts all statuses', () => {
      for (const s of ['trialing', 'active', 'past_due', 'paused', 'cancelled', 'expired']) {
        expect(SubscriptionStatusVO.create(s).value).toBe(s);
      }
    });
    it('normalizes case', () => {
      expect(SubscriptionStatusVO.create('ACTIVE').value).toBe('active');
    });
    it('throws on invalid', () => {
      expect(() => SubscriptionStatusVO.create('unknown')).toThrow(ValidationError);
    });
  });

  describe('factory helpers', () => {
    it('trialing()', () => expect(SubscriptionStatusVO.trialing().value).toBe('trialing'));
    it('active()', () => expect(SubscriptionStatusVO.active().value).toBe('active'));
    it('pastDue()', () => expect(SubscriptionStatusVO.pastDue().value).toBe('past_due'));
    it('paused()', () => expect(SubscriptionStatusVO.paused().value).toBe('paused'));
    it('cancelled()', () => expect(SubscriptionStatusVO.cancelled().value).toBe('cancelled'));
    it('expired()', () => expect(SubscriptionStatusVO.expired().value).toBe('expired'));
  });

  describe('predicates', () => {
    it('isTrialing', () => expect(SubscriptionStatusVO.trialing().isTrialing()).toBe(true));
    it('isActive', () => expect(SubscriptionStatusVO.active().isActive()).toBe(true));
    it('isPastDue', () => expect(SubscriptionStatusVO.pastDue().isPastDue()).toBe(true));
    it('isPaused', () => expect(SubscriptionStatusVO.paused().isPaused()).toBe(true));
    it('isCancelled', () => expect(SubscriptionStatusVO.cancelled().isCancelled()).toBe(true));
    it('isExpired', () => expect(SubscriptionStatusVO.expired().isExpired()).toBe(true));
  });

  describe('isEntitled', () => {
    it('true for trialing/active', () => {
      expect(SubscriptionStatusVO.trialing().isEntitled()).toBe(true);
      expect(SubscriptionStatusVO.active().isEntitled()).toBe(true);
    });
    it('false for cancelled/expired/past_due', () => {
      expect(SubscriptionStatusVO.cancelled().isEntitled()).toBe(false);
      expect(SubscriptionStatusVO.expired().isEntitled()).toBe(false);
      expect(SubscriptionStatusVO.pastDue().isEntitled()).toBe(false);
    });
  });

  describe('isFinal', () => {
    it('true for expired only', () => {
      expect(SubscriptionStatusVO.expired().isFinal()).toBe(true);
    });
    it('false for active/cancelled', () => {
      expect(SubscriptionStatusVO.active().isFinal()).toBe(false);
      expect(SubscriptionStatusVO.cancelled().isFinal()).toBe(false);
    });
  });

  describe('isCancellable', () => {
    it('true for active/past_due/paused', () => {
      expect(SubscriptionStatusVO.active().isCancellable()).toBe(true);
      expect(SubscriptionStatusVO.pastDue().isCancellable()).toBe(true);
      expect(SubscriptionStatusVO.paused().isCancellable()).toBe(true);
    });
    it('false for cancelled/expired', () => {
      expect(SubscriptionStatusVO.cancelled().isCancellable()).toBe(false);
      expect(SubscriptionStatusVO.expired().isCancellable()).toBe(false);
    });
  });

  describe('canTransitionTo()', () => {
    it('trialing → active ok', () => {
      expect(SubscriptionStatusVO.trialing().canTransitionTo('active')).toBe(true);
    });
    it('active → past_due ok', () => {
      expect(SubscriptionStatusVO.active().canTransitionTo('past_due')).toBe(true);
    });
    it('past_due → active ok', () => {
      expect(SubscriptionStatusVO.pastDue().canTransitionTo('active')).toBe(true);
    });
    it('paused → active ok', () => {
      expect(SubscriptionStatusVO.paused().canTransitionTo('active')).toBe(true);
    });
    it('cancelled → expired ok', () => {
      expect(SubscriptionStatusVO.cancelled().canTransitionTo('expired')).toBe(true);
    });
    it('expired → anything NOT ok', () => {
      expect(SubscriptionStatusVO.expired().canTransitionTo('active')).toBe(false);
    });
  });
});
