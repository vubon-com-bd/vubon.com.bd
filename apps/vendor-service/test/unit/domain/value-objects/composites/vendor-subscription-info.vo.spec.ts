import { VendorSubscriptionInfoVO } from '../../../../../src/module/domain/value-objects/composites/vendor-subscription-info.vo.js';
import { SubscriptionPlanVO } from '../../../../../src/module/domain/value-objects/primitives/subscription-plan.vo.js';
import { SubscriptionStatusVO } from '../../../../../src/module/domain/value-objects/primitives/subscription-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const NOW = '2026-01-01T00:00:00.000Z';
const END = '2026-02-01T00:00:00.000Z';
const TRIAL_END = '2026-01-15T00:00:00.000Z';
const CANCELLED_AT = '2026-01-20T00:00:00.000Z';

function makeInfo(overrides: {
  plan?: string;
  status?: SubscriptionStatusVO;
  cancelAtPeriodEnd?: boolean;
  trialEndsAt?: string;
  cancelledAt?: string;
} = {}): VendorSubscriptionInfoVO {
  return VendorSubscriptionInfoVO.create({
    plan: SubscriptionPlanVO.create(overrides.plan ?? 'basic'),
    status: overrides.status ?? SubscriptionStatusVO.active(),
    startedAt: NOW,
    currentPeriodStart: NOW,
    currentPeriodEnd: END,
    trialEndsAt: overrides.trialEndsAt,
    cancelledAt: overrides.cancelledAt,
    cancelAtPeriodEnd: overrides.cancelAtPeriodEnd ?? false,
    autoRenew: true,
  });
}

describe('VendorSubscriptionInfoVO', () => {
  describe('create()', () => {
    it('creates active subscription', () => {
      const v = makeInfo();
      expect(v.plan.value).toBe('basic');
      expect(v.isUsable()).toBe(true);
    });

    it('throws on invalid period', () => {
      expect(() =>
        VendorSubscriptionInfoVO.create({
          plan: SubscriptionPlanVO.create('basic'),
          status: SubscriptionStatusVO.active(),
          startedAt: NOW,
          currentPeriodStart: END,
          currentPeriodEnd: NOW,
          cancelAtPeriodEnd: false,
          autoRenew: true,
        }),
      ).toThrow(ValidationError);
    });

    it('throws when trial missing trialEndsAt', () => {
      expect(() =>
        makeInfo({ status: SubscriptionStatusVO.trial() }),
      ).toThrow(ValidationError);
    });

    it('throws when cancelled missing cancelledAt', () => {
      expect(() =>
        makeInfo({ status: SubscriptionStatusVO.cancelled() }),
      ).toThrow(ValidationError);
    });
  });

  describe('isUsable / isTrial', () => {
    it('isUsable true for active', () => {
      expect(makeInfo().isUsable()).toBe(true);
    });

    it('isTrial true for trial', () => {
      const v = makeInfo({ status: SubscriptionStatusVO.trial(), trialEndsAt: TRIAL_END });
      expect(v.isTrial()).toBe(true);
    });
  });

  describe('isExpired / daysUntilRenewal', () => {
    it('isExpired false within period', () => {
      expect(makeInfo().isExpired(new Date(NOW))).toBe(false);
    });

    it('isExpired true past period', () => {
      expect(makeInfo().isExpired(new Date('2030-01-01T00:00:00Z'))).toBe(true);
    });

    it('daysUntilRenewal positive', () => {
      expect(makeInfo().daysUntilRenewal(new Date(NOW))).toBeGreaterThan(0);
    });
  });

  describe('trialDaysRemaining', () => {
    it('positive for active trial', () => {
      const v = makeInfo({ status: SubscriptionStatusVO.trial(), trialEndsAt: TRIAL_END });
      expect(v.trialDaysRemaining(new Date(NOW))).toBeGreaterThan(0);
    });

    it('0 when not trial', () => {
      expect(makeInfo().trialDaysRemaining(new Date(NOW))).toBe(0);
    });
  });

  describe('willCancelAtPeriodEnd', () => {
    it('true when flag set', () => {
      expect(makeInfo({ cancelAtPeriodEnd: true }).willCancelAtPeriodEnd()).toBe(true);
    });

    it('false when flag unset', () => {
      expect(makeInfo().willCancelAtPeriodEnd()).toBe(false);
    });
  });

  describe('canAddProducts / productLimit', () => {
    it('canAddProducts true within limit', () => {
      expect(makeInfo({ plan: 'premium' }).canAddProducts(100)).toBe(true);
    });

    it('canAddProducts false when not usable', () => {
      const v = makeInfo({
        status: SubscriptionStatusVO.cancelled(),
        cancelledAt: CANCELLED_AT,
      });
      expect(v.canAddProducts(0)).toBe(false);
    });

    it('productLimit returns number or null', () => {
      const limit = makeInfo({ plan: 'basic' }).productLimit();
      expect(limit === null || typeof limit === 'number').toBe(true);
    });
  });
});
