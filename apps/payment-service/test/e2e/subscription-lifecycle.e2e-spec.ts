/**
 * E2E — Subscription lifecycle (domain-level)
 */
import { describe, it, expect } from '@jest/globals';
import { makeE2ESubscription, E2E_DATES } from './setup/e2e-fixtures';
import { SubscriptionLifecycleService } from '@domain/services/subscription-lifecycle.service';

describe('E2E — Subscription lifecycle', () => {
  it('active → past_due → renew → active', () => {
    const sub = makeE2ESubscription();
    expect(sub.isActive()).toBe(true);

    sub.markPastDue(E2E_DATES.NOW);
    expect(sub.status.isPastDue()).toBe(true);

    sub.renew(E2E_DATES.NEXT_YEAR, E2E_DATES.NOW);
    expect(sub.isActive()).toBe(true);
    expect(sub.currentPeriodEnd).toBe(E2E_DATES.NEXT_YEAR);
  });

  it('active → pause → resume → active', () => {
    const sub = makeE2ESubscription();
    sub.pause(E2E_DATES.NOW);
    expect(sub.status.isPaused()).toBe(true);

    sub.resume(E2E_DATES.NOW);
    expect(sub.isActive()).toBe(true);
  });

  it('cancel at period end keeps active', () => {
    const sub = makeE2ESubscription();
    sub.cancel(true, E2E_DATES.NOW);
    expect(sub.cancelAtPeriodEnd).toBe(true);
    expect(sub.isActive()).toBe(true);
  });

  it('immediate cancel → cancelled → expire', () => {
    const sub = makeE2ESubscription();
    sub.cancel(false, E2E_DATES.NOW);
    expect(sub.status.isCancelled()).toBe(true);

    sub.expire(E2E_DATES.NOW);
    expect(sub.status.isExpired()).toBe(true);
  });

  it('trial → active → renew', () => {
    const sub = makeE2ESubscription();
    // simulate trial
    sub.startTrial(E2E_DATES.NEXT_WEEK, E2E_DATES.NOW);
    expect(sub.isInTrial()).toBe(true);

    sub.activate(E2E_DATES.NOW);
    expect(sub.isActive()).toBe(true);

    sub.renew(E2E_DATES.NEXT_YEAR, E2E_DATES.NOW);
    expect(sub.currentPeriodEnd).toBe(E2E_DATES.NEXT_YEAR);
  });

  it('lifecycle service: active + not due → none', () => {
    const sub = makeE2ESubscription();
    const r = SubscriptionLifecycleService.determineNextAction({
      subscription: sub,
      referenceDate: new Date(E2E_DATES.NOW),
    });
    expect(r.action).toBe('none');
  });

  it('lifecycle service: period ended → renew', () => {
    const sub = makeE2ESubscription();
    // pretend currentPeriodEnd is yesterday
    // (created with NEXT_MONTH — so push referenceDate far forward)
    const r = SubscriptionLifecycleService.determineNextAction({
      subscription: sub,
      referenceDate: new Date('2025-06-01T00:00:00.000Z'),
    });
    expect(r.action).toBe('renew');
  });

  it('MRR computed from price', () => {
    const sub = makeE2ESubscription();
    const mrr = SubscriptionLifecycleService.computeMrr(sub);
    expect(mrr).toBe(500); // monthly = price
  });
});
