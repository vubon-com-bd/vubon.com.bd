import { VendorSubscriptionEntity } from '../../../../src/module/domain/entities/vendor-subscription.entity.js';
import { SubscriptionPlanVO } from '../../../../src/module/domain/value-objects/primitives/subscription-plan.vo.js';
import { SubscriptionStatusVO } from '../../../../src/module/domain/value-objects/primitives/subscription-status.vo.js';
import { SubscriptionCycleVO } from '../../../../src/module/domain/value-objects/primitives/subscription-cycle.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeSub(): VendorSubscriptionEntity {
  return VendorSubscriptionEntity.create({
    id: UUID, vendorId: UUID,
    plan: SubscriptionPlanVO.create('basic'),
    cycle: SubscriptionCycleVO.create('monthly'),
    price: 500, currency: 'BDT',
    trialDays: 0, now: NOW,
  });
}

describe('VendorSubscriptionEntity — branches', () => {
  describe('renew — all branches', () => {
    it('lifetime throws', () => {
      const s = VendorSubscriptionEntity.reconstitute({
        id: UUID, createdAt: NOW, updatedAt: NOW,
        props: {
          vendorId: UUID,
          plan: SubscriptionPlanVO.create('basic'),
          status: SubscriptionStatusVO.active(),
          cycle: SubscriptionCycleVO.create('lifetime'),
          price: 5000, currency: 'BDT',
          startedAt: NOW,
          currentPeriodStart: NOW,
          currentPeriodEnd: '2026-02-01T00:00:00.000Z',
          cancelAtPeriodEnd: false, autoRenew: true, features: [],
        },
      });
      expect(() => s.renew(NOW)).toThrow();
    });

    it('cancelAtPeriodEnd throws', () => {
      const s = makeSub();
      s.cancel(false, NOW);
      expect(() => s.renew(NOW)).toThrow();
    });

    it('normal renew works', () => {
      const s = makeSub();
      s.cancel(false, NOW);
      s.resume(NOW);
      s.renew(NOW);
      expect(s.isActive()).toBe(true);
    });
  });

  describe('changePlan — all branches', () => {
    it('throws when not usable and not pastDue', () => {
      const s = VendorSubscriptionEntity.reconstitute({
        id: UUID, createdAt: NOW, updatedAt: NOW,
        props: {
          vendorId: UUID,
          plan: SubscriptionPlanVO.create('basic'),
          status: SubscriptionStatusVO.expired(),
          cycle: SubscriptionCycleVO.create('monthly'),
          price: 500, currency: 'BDT',
          startedAt: NOW,
          currentPeriodStart: NOW,
          currentPeriodEnd: '2026-02-01T00:00:00.000Z',
          cancelAtPeriodEnd: false, autoRenew: false, features: [],
        },
      });
      expect(() => s.changePlan(SubscriptionPlanVO.create('premium'), 2000, false, NOW)).toThrow();
    });

    it('deferred change keeps period', () => {
      const s = makeSub();
      const before = s.currentPeriodEnd;
      s.changePlan(SubscriptionPlanVO.create('premium'), 2000, false, NOW);
      expect(s.currentPeriodEnd).toBe(before);
    });

    it('negative price throws', () => {
      const s = makeSub();
      expect(() => s.changePlan(SubscriptionPlanVO.create('premium'), -1, false, NOW)).toThrow();
    });
  });

  describe('cancel — immediate vs deferred', () => {
    it('immediate sets cancelled', () => {
      const s = makeSub();
      s.cancel(true, NOW);
      expect(s.status.isCancelled()).toBe(true);
    });

    it('deferred keeps active with flag', () => {
      const s = makeSub();
      s.cancel(false, NOW);
      expect(s.cancelAtPeriodEnd).toBe(true);
      expect(s.status.isActive()).toBe(true);
    });

    it('throws when cannot cancel', () => {
      const s = VendorSubscriptionEntity.reconstitute({
        id: UUID, createdAt: NOW, updatedAt: NOW,
        props: {
          vendorId: UUID,
          plan: SubscriptionPlanVO.create('basic'),
          status: SubscriptionStatusVO.expired(),
          cycle: SubscriptionCycleVO.create('monthly'),
          price: 500, currency: 'BDT',
          startedAt: NOW,
          currentPeriodStart: NOW,
          currentPeriodEnd: '2026-02-01T00:00:00.000Z',
          cancelAtPeriodEnd: false, autoRenew: false, features: [],
        },
      });
      expect(() => s.cancel(false, NOW)).toThrow();
    });
  });

  describe('resume — throws when not cancelling', () => {
    it('throws when cancelAtPeriodEnd false', () => {
      const s = makeSub();
      // Cancel deferred first, then resume, then resume again should throw
      s.cancel(false, NOW);
      s.resume(NOW);
      expect(() => s.resume(NOW)).toThrow();
    });

    it('works when cancelling', () => {
      const s = makeSub();
      s.cancel(false, NOW);
      s.resume(NOW);
      expect(s.cancelAtPeriodEnd).toBe(false);
    });
  });

  describe('markPastDue / expire', () => {
    it('pastDue from active', () => {
      const s = makeSub();
      s.markPastDue(NOW);
      expect(s.needsPayment()).toBe(true);
    });

    it('pastDue throws from expired', () => {
      const s = VendorSubscriptionEntity.reconstitute({
        id: UUID, createdAt: NOW, updatedAt: NOW,
        props: {
          vendorId: UUID,
          plan: SubscriptionPlanVO.create('basic'),
          status: SubscriptionStatusVO.expired(),
          cycle: SubscriptionCycleVO.create('monthly'),
          price: 500, currency: 'BDT',
          startedAt: NOW,
          currentPeriodStart: NOW,
          currentPeriodEnd: '2026-02-01T00:00:00.000Z',
          cancelAtPeriodEnd: false, autoRenew: false, features: [],
        },
      });
      expect(() => s.markPastDue(NOW)).toThrow();
    });

    it('expire sets flag', () => {
      const s = makeSub();
      s.expire(NOW);
      expect(s.status.isExpired()).toBe(true);
    });
  });

  describe('features — add/remove/has', () => {
    it('add new feature', () => {
      const s = makeSub();
      s.addFeature('analytics', NOW);
      expect(s.hasFeature('analytics')).toBe(true);
    });

    it('add duplicate ignored', () => {
      const s = makeSub();
      s.addFeature('f1', NOW);
      s.addFeature('f1', NOW);
      expect(s.features).toHaveLength(1);
    });

    it('add empty ignored', () => {
      const s = makeSub();
      s.addFeature('   ', NOW);
      expect(s.features).toHaveLength(0);
    });

    it('remove existing', () => {
      const s = makeSub();
      s.addFeature('f1', NOW);
      s.removeFeature('f1', NOW);
      expect(s.hasFeature('f1')).toBe(false);
    });
  });

  describe('productLimit / daysUntilRenewal', () => {
    it('productLimit returns number or null', () => {
      const limit = makeSub().productLimit();
      expect(limit === null || typeof limit === 'number').toBe(true);
    });

    it('daysUntilRenewal > 0', () => {
      expect(makeSub().daysUntilRenewal(new Date(NOW))).toBeGreaterThan(0);
    });

    it('daysUntilRenewal 0 past end', () => {
      expect(makeSub().daysUntilRenewal(new Date('2030-01-01T00:00:00Z'))).toBe(0);
    });
  });

  describe('trialDaysRemaining', () => {
    it('0 for non-trial', () => {
      expect(makeSub().trialDaysRemaining(new Date(NOW))).toBe(0);
    });

    it('> 0 for trial', () => {
      const s = VendorSubscriptionEntity.create({
        id: UUID, vendorId: UUID,
        plan: SubscriptionPlanVO.create('basic'),
        cycle: SubscriptionCycleVO.create('monthly'),
        price: 500, currency: 'BDT',
        trialDays: 14, now: NOW,
      });
      expect(s.trialDaysRemaining(new Date(NOW))).toBeGreaterThan(0);
    });
  });
});
