/**
 * VendorSubscriptionEntity — branch coverage
 * @module vendor-service/test/unit/domain/entities
 */
import { describe, it, expect } from '@jest/globals';

import { VendorSubscriptionEntity } from '../../../../src/module/domain/entities/vendor-subscription.entity.js';
import { SubscriptionPlanVO } from '../../../../src/module/domain/value-objects/primitives/subscription-plan.vo.js';
import { SubscriptionStatusVO } from '../../../../src/module/domain/value-objects/primitives/subscription-status.vo.js';
import { SubscriptionCycleVO } from '../../../../src/module/domain/value-objects/primitives/subscription-cycle.vo.js';

const UUID = '11111111-1111-4111-8111-111111111111';
const VENDOR = '22222222-2222-4222-8222-222222222222';
const NOW = '2025-01-01T00:00:00.000Z';

function makeSubscription(overrides: {
  plan?: string;
  cycle?: string;
  trialDays?: number;
  price?: number;
  currency?: string;
} = {}) {
  return VendorSubscriptionEntity.create({
    id: UUID,
    vendorId: VENDOR,
    plan: SubscriptionPlanVO.create(overrides.plan ?? 'basic'),
    cycle: SubscriptionCycleVO.create(overrides.cycle ?? 'monthly'),
    price: overrides.price ?? 500,
    currency: overrides.currency ?? 'BDT',
    trialDays: overrides.trialDays ?? 14,
    now: NOW,
  });
}

function reconstitute(overrides: Record<string, unknown> = {}) {
  return VendorSubscriptionEntity.reconstitute({
    id: UUID,
    createdAt: NOW,
    updatedAt: NOW,
    props: {
      vendorId: VENDOR,
      plan: SubscriptionPlanVO.create('basic'),
      status: SubscriptionStatusVO.active(),
      cycle: SubscriptionCycleVO.create('monthly'),
      price: 500,
      currency: 'BDT',
      startedAt: NOW,
      currentPeriodStart: NOW,
      currentPeriodEnd: '2025-02-01T00:00:00.000Z',
      cancelAtPeriodEnd: false,
      autoRenew: true,
      features: [],
      ...overrides,
    },
  });
}

describe('VendorSubscriptionEntity — creation', () => {
  it('creates with trial', () => {
    const s = makeSubscription({ trialDays: 14 });
    expect(s.isTrial()).toBe(true);
    expect(s.isUsable()).toBe(true);
  });

  it('creates without trial', () => {
    const s = makeSubscription({ trialDays: 0 });
    expect(s.isTrial()).toBe(false);
    expect(s.isActive()).toBe(true);
  });

  it('starts with expected period end', () => {
    const s = makeSubscription({ trialDays: 14 });
    expect(s.currentPeriodEnd).toBeDefined();
    expect(s.trialEndsAt).toBeDefined();
  });
});

describe('VendorSubscriptionEntity — invariants', () => {
  it('rejects negative price', () => {
    expect(() => reconstitute({ price: -1 })).toThrow();
  });

  it('rejects invalid currency length', () => {
    expect(() => reconstitute({ currency: 'AB' })).toThrow();
  });

  it('rejects periodEnd <= periodStart', () => {
    expect(() =>
      reconstitute({
        currentPeriodStart: '2025-02-01T00:00:00.000Z',
        currentPeriodEnd: '2025-01-01T00:00:00.000Z',
      }),
    ).toThrow();
  });

  it('rejects trial status without trialEndsAt', () => {
    expect(() =>
      reconstitute({ status: SubscriptionStatusVO.trial(), trialEndsAt: undefined }),
    ).toThrow();
  });

  it('rejects too many features', () => {
    expect(() => reconstitute({ features: new Array(101).fill('f') })).toThrow();
  });
});

describe('VendorSubscriptionEntity — getters', () => {
  it('returns scalar getters', () => {
    const s = makeSubscription();
    expect(s.vendorId).toBe(VENDOR);
    expect(s.plan.value).toBe('basic');
    expect(s.cycle.value).toBe('monthly');
    expect(s.price).toBe(500);
    expect(s.currency).toBe('BDT');
    expect(s.startedAt).toBe(NOW);
    expect(s.currentPeriodStart).toBe(NOW);
    // autoRenew and cancelAtPeriodEnd come from VENDOR_SUBSCRIPTION constants
    expect(typeof s.autoRenew).toBe('boolean');
    expect(typeof s.cancelAtPeriodEnd).toBe('boolean');
  });

  it('isTrial/isActive/isUsable/needsPayment reflect status', () => {
    const trial = makeSubscription({ trialDays: 14 });
    expect(trial.isTrial()).toBe(true);
    expect(trial.isUsable()).toBe(true);
    expect(trial.needsPayment()).toBe(false);

    const active = reconstitute({ status: SubscriptionStatusVO.active() });
    expect(active.isActive()).toBe(true);

    const pastDue = reconstitute({ status: SubscriptionStatusVO.pastDue() });
    expect(pastDue.needsPayment()).toBe(true);
  });
});

describe('VendorSubscriptionEntity — date helpers', () => {
  it('isExpired returns true for past period end', () => {
    const s = reconstitute({
      currentPeriodEnd: '2025-01-15T00:00:00.000Z',
    });
    expect(s.isExpired(new Date('2025-02-01T00:00:00.000Z'))).toBe(true);
  });

  it('isExpired returns false for future period end', () => {
    const s = reconstitute({
      currentPeriodEnd: '2025-12-31T00:00:00.000Z',
    });
    expect(s.isExpired(new Date('2025-02-01T00:00:00.000Z'))).toBe(false);
  });

  it('daysUntilRenewal positive when future', () => {
    const s = reconstitute({
      currentPeriodEnd: '2025-01-31T00:00:00.000Z',
    });
    const days = s.daysUntilRenewal(new Date('2025-01-01T00:00:00.000Z'));
    expect(days).toBeGreaterThan(0);
  });

  it('daysUntilRenewal 0 when expired', () => {
    const s = reconstitute({
      currentPeriodStart: '2025-01-01T00:00:00.000Z',
      currentPeriodEnd: '2025-01-15T00:00:00.000Z',
    });
    expect(s.daysUntilRenewal(new Date('2025-02-01T00:00:00.000Z'))).toBe(0);
  });

  it('trialDaysRemaining 0 when no trialEndsAt', () => {
    const s = reconstitute({ trialEndsAt: undefined });
    expect(s.trialDaysRemaining()).toBe(0);
  });

  it('trialDaysRemaining positive when trial active', () => {
    const s = reconstitute({
      status: SubscriptionStatusVO.trial(),
      trialEndsAt: '2025-02-01T00:00:00.000Z',
    });
    expect(s.trialDaysRemaining(new Date('2025-01-15T00:00:00.000Z'))).toBeGreaterThan(0);
  });

  it('trialDaysRemaining 0 when expired', () => {
    const s = reconstitute({
      status: SubscriptionStatusVO.trial(),
      trialEndsAt: '2025-01-01T00:00:00.000Z',
    });
    expect(s.trialDaysRemaining(new Date('2025-02-01T00:00:00.000Z'))).toBe(0);
  });
});

describe('VendorSubscriptionEntity — renew', () => {
  it('renews active subscription', () => {
    const s = reconstitute({ status: SubscriptionStatusVO.active() });
    const originalEnd = s.currentPeriodEnd;
    s.renew(NOW);
    expect(s.currentPeriodStart).toBe(originalEnd);
    expect(s.currentPeriodEnd).not.toBe(originalEnd);
  });

  it('renew throws on lifetime cycle', () => {
    const s = reconstitute({
      status: SubscriptionStatusVO.active(),
      cycle: SubscriptionCycleVO.create('lifetime'),
    });
    expect(() => s.renew(NOW)).toThrow(/Lifetime/);
  });

  it('renew throws when cancelAtPeriodEnd=true', () => {
    const s = reconstitute({
      status: SubscriptionStatusVO.active(),
      cancelAtPeriodEnd: true,
    });
    expect(() => s.renew(NOW)).toThrow(/cannot auto-renew/i);
  });
});

describe('VendorSubscriptionEntity — changePlan', () => {
  it('changes plan with immediate=true', () => {
    const s = reconstitute({ status: SubscriptionStatusVO.active() });
    s.changePlan(SubscriptionPlanVO.create('premium'), 2000, true, NOW);
    expect(s.plan.value).toBe('premium');
    expect(s.price).toBe(2000);
  });

  it('changes plan with immediate=false', () => {
    const s = reconstitute({ status: SubscriptionStatusVO.active() });
    const originalStart = s.currentPeriodStart;
    s.changePlan(SubscriptionPlanVO.create('premium'), 2000, false, NOW);
    expect(s.plan.value).toBe('premium');
    // No period start change
    expect(s.currentPeriodStart).toBe(originalStart);
  });

  it('changePlan from invalid status throws', () => {
    const s = reconstitute({ status: SubscriptionStatusVO.expired() });
    expect(() =>
      s.changePlan(SubscriptionPlanVO.create('premium'), 2000, false, NOW),
    ).toThrow();
  });

  it('changePlan from pastDue allowed', () => {
    const s = reconstitute({ status: SubscriptionStatusVO.pastDue() });
    s.changePlan(SubscriptionPlanVO.create('premium'), 2000, false, NOW);
    expect(s.plan.value).toBe('premium');
  });

  it('changePlan with negative price throws', () => {
    const s = reconstitute({ status: SubscriptionStatusVO.active() });
    expect(() =>
      s.changePlan(SubscriptionPlanVO.create('premium'), -100, false, NOW),
    ).toThrow();
  });
});

describe('VendorSubscriptionEntity — cancel/resume', () => {
  it('cancel with immediate=false sets cancelAtPeriodEnd', () => {
    const s = reconstitute({ status: SubscriptionStatusVO.active() });
    s.cancel(false, NOW);
    expect(s.cancelAtPeriodEnd).toBe(true);
  });

  it('cancel with immediate=true sets status=cancelled', () => {
    const s = reconstitute({ status: SubscriptionStatusVO.active() });
    s.cancel(true, NOW);
    expect(s.status.isCancelled()).toBe(true);
  });

  it('cancel from invalid status throws', () => {
    const s = reconstitute({ status: SubscriptionStatusVO.expired() });
    expect(() => s.cancel(false, NOW)).toThrow();
  });

  it('resume clears cancelAtPeriodEnd', () => {
    const s = reconstitute({
      status: SubscriptionStatusVO.active(),
      cancelAtPeriodEnd: true,
    });
    s.resume(NOW);
    expect(s.cancelAtPeriodEnd).toBe(false);
  });

  it('resume throws when not pending cancellation', () => {
    const s = reconstitute({ status: SubscriptionStatusVO.active() });
    expect(() => s.resume(NOW)).toThrow();
  });

  it('markPastDue transitions active → past_due', () => {
    const s = reconstitute({ status: SubscriptionStatusVO.active() });
    s.markPastDue(NOW);
    expect(s.status.isPastDue()).toBe(true);
  });

  it('markPastDue from trial throws', () => {
    const s = reconstitute({
      status: SubscriptionStatusVO.trial(),
      trialEndsAt: '2025-02-01T00:00:00.000Z',
    });
    expect(() => s.markPastDue(NOW)).toThrow();
  });

  it('expire transitions active → expired', () => {
    const s = reconstitute({ status: SubscriptionStatusVO.active() });
    s.expire(NOW);
    expect(s.status.isExpired()).toBe(true);
    expect(s.autoRenew).toBe(false);
  });
});

describe('VendorSubscriptionEntity — features', () => {
  it('addFeature adds new feature', () => {
    const s = reconstitute({ status: SubscriptionStatusVO.active() });
    s.addFeature('analytics', NOW);
    expect(s.hasFeature('analytics')).toBe(true);
  });

  it('addFeature ignores empty feature', () => {
    const s = reconstitute({ status: SubscriptionStatusVO.active() });
    s.addFeature('', NOW);
    expect(s.hasFeature('')).toBe(false);
  });

  it('addFeature ignores duplicate', () => {
    const s = reconstitute({
      status: SubscriptionStatusVO.active(),
      features: ['analytics'],
    });
    s.addFeature('analytics', NOW);
    expect(s.hasFeature('analytics')).toBe(true);
  });

  it('removeFeature removes existing', () => {
    const s = reconstitute({
      status: SubscriptionStatusVO.active(),
      features: ['analytics', 'api'],
    });
    s.removeFeature('analytics', NOW);
    expect(s.hasFeature('analytics')).toBe(false);
    expect(s.hasFeature('api')).toBe(true);
  });

  it('removeFeature ignores missing', () => {
    const s = reconstitute({ status: SubscriptionStatusVO.active() });
    s.removeFeature('nonexistent', NOW);
  });

  it('productLimit delegates to plan', () => {
    const s = makeSubscription({ plan: 'free' });
    expect(s.productLimit()).toBeDefined();
  });
});

describe('VendorSubscriptionEntity — uncovered getters & version', () => {
  it('trialEndsAt getter returns value (line 103)', () => {
    const s = makeSubscription({ trialDays: 14 });
    expect(typeof s.trialEndsAt).toBe('string');
  });

  it('trialEndsAt getter returns undefined when no trial', () => {
    const s = reconstitute({ trialEndsAt: undefined });
    expect(s.trialEndsAt).toBeUndefined();
  });

  it('cancelledAt getter returns undefined when not cancelled (line 104)', () => {
    const s = reconstitute();
    expect(s.cancelledAt).toBeUndefined();
  });

  it('cancelledAt getter returns value when cancelled', () => {
    const s = reconstitute({ cancelledAt: NOW });
    expect(s.cancelledAt).toBe(NOW);
  });

  it('features getter returns array', () => {
    const s = reconstitute({ features: ['a', 'b'] });
    expect(s.features).toEqual(['a', 'b']);
  });

  it('reconstitute with version applies incrementVersion (line 286)', () => {
    const s = VendorSubscriptionEntity.reconstitute({
      id: UUID,
      createdAt: NOW,
      updatedAt: NOW,
      props: {
        vendorId: VENDOR,
        plan: SubscriptionPlanVO.create('basic'),
        status: SubscriptionStatusVO.active(),
        cycle: SubscriptionCycleVO.create('monthly'),
        price: 500,
        currency: 'BDT',
        startedAt: NOW,
        currentPeriodStart: NOW,
        currentPeriodEnd: '2025-02-01T00:00:00.000Z',
        cancelAtPeriodEnd: false,
        autoRenew: true,
        features: [],
      },
      version: 5,
    });
    expect(s.version).toBe(5);
  });
});
