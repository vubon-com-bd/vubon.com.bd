/**
 * SubscriptionLifecycleService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { SubscriptionLifecycleService } from '@domain/services/subscription-lifecycle.service';
import { SubscriptionEntity } from '@domain/entities/subscription.entity';
import { SubscriptionIdVO } from '@domain/primitives/subscription-id.vo';
import { SubscriptionStatusVO } from '@domain/primitives/subscription-status.vo';
import { SubscriptionPlanVO } from '@domain/primitives/subscription-plan.vo';
import { RecurringFrequencyVO } from '@domain/primitives/recurring-frequency.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makeSub(overrides: Partial<{
  status: ReturnType<typeof SubscriptionStatusVO.active>;
  trialEndsAt: string;
  cancelAtPeriodEnd: boolean;
  currentPeriodEnd: string;
}> = {}): SubscriptionEntity {
  return SubscriptionEntity.reconstitute({
    id: TEST_IDS.SUBSCRIPTION_ID,
    createdAt: TEST_DATES.NOW,
    updatedAt: TEST_DATES.NOW,
    props: {
      userId: UserIdVO.create(TEST_IDS.USER_ID),
      status: overrides.status ?? SubscriptionStatusVO.active(),
      plan: SubscriptionPlanVO.create('premium'),
      frequency: RecurringFrequencyVO.create('monthly'),
      price: PaymentAmountVO.reconstitute(500, 'BDT'),
      startedAt: TEST_DATES.LAST_MONTH,
      trialEndsAt: overrides.trialEndsAt,
      currentPeriodStart: TEST_DATES.LAST_MONTH,
      currentPeriodEnd: overrides.currentPeriodEnd ?? TEST_DATES.NEXT_MONTH,
      cancelAtPeriodEnd: overrides.cancelAtPeriodEnd ?? false,
    },
  });
}

describe('SubscriptionLifecycleService', () => {
  describe('determineNextAction()', () => {
    it('active + not expired → none', () => {
      const r = SubscriptionLifecycleService.determineNextAction({
        subscription: makeSub(),
        referenceDate: new Date(TEST_DATES.NOW),
      });
      expect(r.action).toBe('none');
    });

    it('period ended + not cancelAtPeriodEnd → renew', () => {
      const r = SubscriptionLifecycleService.determineNextAction({
        subscription: makeSub({ currentPeriodEnd: TEST_DATES.YESTERDAY }),
        referenceDate: new Date(TEST_DATES.NOW),
      });
      expect(r.action).toBe('renew');
      expect(r.nextPeriodEnd).toBeDefined();
    });

    it('period ended + cancelAtPeriodEnd → cancel', () => {
      const r = SubscriptionLifecycleService.determineNextAction({
        subscription: makeSub({
          currentPeriodEnd: TEST_DATES.YESTERDAY,
          cancelAtPeriodEnd: true,
        }),
        referenceDate: new Date(TEST_DATES.NOW),
      });
      expect(r.action).toBe('cancel');
    });

    it('trialing + trial ends soon → reminder', () => {
      const r = SubscriptionLifecycleService.determineNextAction({
        subscription: makeSub({
          status: SubscriptionStatusVO.trialing(),
          trialEndsAt: TEST_DATES.TOMORROW,
        }),
        referenceDate: new Date(TEST_DATES.NOW),
      });
      expect(r.action).toBe('start_trial_reminder');
    });

    it('trialing + trial ended → convert_to_active', () => {
      const r = SubscriptionLifecycleService.determineNextAction({
        subscription: makeSub({
          status: SubscriptionStatusVO.trialing(),
          trialEndsAt: TEST_DATES.YESTERDAY,
        }),
        referenceDate: new Date(TEST_DATES.NOW),
      });
      expect(r.action).toBe('convert_to_active');
    });

    it('past_due → mark_past_due', () => {
      const r = SubscriptionLifecycleService.determineNextAction({
        subscription: makeSub({ status: SubscriptionStatusVO.pastDue() }),
        referenceDate: new Date(TEST_DATES.NOW),
      });
      expect(r.action).toBe('mark_past_due');
    });

    it('expired → none', () => {
      const r = SubscriptionLifecycleService.determineNextAction({
        subscription: makeSub({ status: SubscriptionStatusVO.expired() }),
        referenceDate: new Date(TEST_DATES.NOW),
      });
      expect(r.action).toBe('none');
    });
  });

  describe('computeMrr()', () => {
    it('monthly = price', () => {
      const mrr = SubscriptionLifecycleService.computeMrr(makeSub());
      expect(mrr).toBe(500);
    });
    it('quarterly = price / 3', () => {
      const sub = SubscriptionEntity.reconstitute({
        id: TEST_IDS.SUBSCRIPTION_ID,
        createdAt: TEST_DATES.NOW,
        updatedAt: TEST_DATES.NOW,
        props: {
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          status: SubscriptionStatusVO.active(),
          plan: SubscriptionPlanVO.create('premium'),
          frequency: RecurringFrequencyVO.create('quarterly'),
          price: PaymentAmountVO.reconstitute(3000, 'BDT'),
          startedAt: TEST_DATES.LAST_MONTH,
          currentPeriodStart: TEST_DATES.LAST_MONTH,
          currentPeriodEnd: TEST_DATES.NEXT_MONTH,
          cancelAtPeriodEnd: false,
        },
      });
      expect(SubscriptionLifecycleService.computeMrr(sub)).toBe(1000);
    });
    it('yearly = price / 12', () => {
      const sub = SubscriptionEntity.reconstitute({
        id: TEST_IDS.SUBSCRIPTION_ID,
        createdAt: TEST_DATES.NOW,
        updatedAt: TEST_DATES.NOW,
        props: {
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          status: SubscriptionStatusVO.active(),
          plan: SubscriptionPlanVO.create('premium'),
          frequency: RecurringFrequencyVO.create('yearly'),
          price: PaymentAmountVO.reconstitute(12000, 'BDT'),
          startedAt: TEST_DATES.LAST_MONTH,
          currentPeriodStart: TEST_DATES.LAST_MONTH,
          currentPeriodEnd: TEST_DATES.NEXT_MONTH,
          cancelAtPeriodEnd: false,
        },
      });
      expect(SubscriptionLifecycleService.computeMrr(sub)).toBe(1000);
    });
  });
});
