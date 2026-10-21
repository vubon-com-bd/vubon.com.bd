/**
 * SubscriptionEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { SubscriptionEntity } from '@domain/entities/subscription.entity';
import { SubscriptionIdVO } from '@domain/primitives/subscription-id.vo';
import { SubscriptionStatusVO } from '@domain/primitives/subscription-status.vo';
import { SubscriptionPlanVO } from '@domain/primitives/subscription-plan.vo';
import { RecurringFrequencyVO } from '@domain/primitives/recurring-frequency.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makeSub(): SubscriptionEntity {
  return SubscriptionEntity.create({
    id: SubscriptionIdVO.create(TEST_IDS.SUBSCRIPTION_ID),
    props: {
      userId: UserIdVO.create(TEST_IDS.USER_ID),
      plan: SubscriptionPlanVO.create('premium'),
      frequency: RecurringFrequencyVO.create('monthly'),
      price: PaymentAmountVO.create(500, 'BDT'),
      startedAt: TEST_DATES.NOW,
      currentPeriodStart: TEST_DATES.NOW,
      currentPeriodEnd: TEST_DATES.NEXT_MONTH,
    },
    now: TEST_DATES.NOW,
  });
}

describe('SubscriptionEntity', () => {
  describe('create()', () => {
    it('creates active subscription', () => {
      const s = makeSub();
      expect(s.isActive()).toBe(true);
      expect(s.plan.value).toBe('premium');
    });
    it('throws when price is 0', () => {
      expect(() =>
        SubscriptionEntity.create({
          id: SubscriptionIdVO.create(TEST_IDS.SUBSCRIPTION_ID),
          props: {
            userId: UserIdVO.create(TEST_IDS.USER_ID),
            plan: SubscriptionPlanVO.create('premium'),
            frequency: RecurringFrequencyVO.create('monthly'),
            price: PaymentAmountVO.reconstitute(0, 'BDT'),
            startedAt: TEST_DATES.NOW,
            currentPeriodStart: TEST_DATES.NOW,
            currentPeriodEnd: TEST_DATES.NEXT_MONTH,
          },
          now: TEST_DATES.NOW,
        }),
      ).toThrow(ValidationError);
    });
    it('throws when periodEnd <= periodStart', () => {
      expect(() =>
        SubscriptionEntity.create({
          id: SubscriptionIdVO.create(TEST_IDS.SUBSCRIPTION_ID),
          props: {
            userId: UserIdVO.create(TEST_IDS.USER_ID),
            plan: SubscriptionPlanVO.create('premium'),
            frequency: RecurringFrequencyVO.create('monthly'),
            price: PaymentAmountVO.create(500, 'BDT'),
            startedAt: TEST_DATES.NOW,
            currentPeriodStart: TEST_DATES.NEXT_MONTH,
            currentPeriodEnd: TEST_DATES.NOW,
          },
          now: TEST_DATES.NOW,
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('startTrial()', () => {
    it('sets trialing status + trialEndsAt', () => {
      const s = makeSub();
      s.startTrial(TEST_DATES.NEXT_WEEK, TEST_DATES.NOW);
      expect(s.isInTrial()).toBe(true);
      expect(s.trialEndsAt).toBe(TEST_DATES.NEXT_WEEK);
    });
  });

  describe('activate()', () => {
    it('trialing → active', () => {
      const s = makeSub();
      s.startTrial(TEST_DATES.NEXT_WEEK, TEST_DATES.NOW);
      s.activate(TEST_DATES.NOW);
      expect(s.isActive()).toBe(true);
    });
  });

  describe('renew()', () => {
    it('rolls period forward', () => {
      const s = makeSub();
      s.renew(TEST_DATES.NEXT_YEAR, TEST_DATES.NOW);
      expect(s.currentPeriodStart).toBe(TEST_DATES.NEXT_MONTH);
      expect(s.currentPeriodEnd).toBe(TEST_DATES.NEXT_YEAR);
    });
    it('past_due → renew → active', () => {
      const s = makeSub();
      s.markPastDue(TEST_DATES.NOW);
      s.renew(TEST_DATES.NEXT_YEAR, TEST_DATES.NOW);
      expect(s.isActive()).toBe(true);
    });
    it('throws when cancelled/expired', () => {
      const s = SubscriptionEntity.reconstitute({
        id: TEST_IDS.SUBSCRIPTION_ID,
        createdAt: TEST_DATES.NOW,
        updatedAt: TEST_DATES.NOW,
        props: {
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          status: SubscriptionStatusVO.expired(),
          plan: SubscriptionPlanVO.create('premium'),
          frequency: RecurringFrequencyVO.create('monthly'),
          price: PaymentAmountVO.reconstitute(500, 'BDT'),
          startedAt: TEST_DATES.YESTERDAY,
          currentPeriodStart: TEST_DATES.YESTERDAY,
          currentPeriodEnd: TEST_DATES.NOW,
          cancelAtPeriodEnd: false,
        },
      });
      expect(() => s.renew(TEST_DATES.NEXT_YEAR, TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('markPastDue() / pause() / resume()', () => {
    it('markPastDue sets past_due', () => {
      const s = makeSub();
      s.markPastDue(TEST_DATES.NOW);
      expect(s.status.isPastDue()).toBe(true);
    });
    it('pause → paused', () => {
      const s = makeSub();
      s.pause(TEST_DATES.NOW);
      expect(s.status.isPaused()).toBe(true);
    });
    it('resume from paused → active', () => {
      const s = makeSub();
      s.pause(TEST_DATES.NOW);
      s.resume(TEST_DATES.NOW);
      expect(s.isActive()).toBe(true);
    });
  });

  describe('cancel()', () => {
    it('immediate cancel sets cancelledAt', () => {
      const s = makeSub();
      s.cancel(false, TEST_DATES.NOW);
      expect(s.status.isCancelled()).toBe(true);
      expect(s.cancelledAt).toBe(TEST_DATES.NOW);
    });
    it('cancel at period end keeps active', () => {
      const s = makeSub();
      s.cancel(true, TEST_DATES.NOW);
      expect(s.cancelAtPeriodEnd).toBe(true);
      expect(s.isActive()).toBe(true);
    });
    it('throws when already expired', () => {
      const s = SubscriptionEntity.reconstitute({
        id: TEST_IDS.SUBSCRIPTION_ID,
        createdAt: TEST_DATES.NOW,
        updatedAt: TEST_DATES.NOW,
        props: {
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          status: SubscriptionStatusVO.expired(),
          plan: SubscriptionPlanVO.create('premium'),
          frequency: RecurringFrequencyVO.create('monthly'),
          price: PaymentAmountVO.reconstitute(500, 'BDT'),
          startedAt: TEST_DATES.YESTERDAY,
          currentPeriodStart: TEST_DATES.YESTERDAY,
          currentPeriodEnd: TEST_DATES.NOW,
          cancelAtPeriodEnd: false,
        },
      });
      expect(() => s.cancel(false, TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('expire()', () => {
    it('cancelled → expired', () => {
      const s = makeSub();
      s.cancel(false, TEST_DATES.NOW);
      s.expire(TEST_DATES.NOW);
      expect(s.status.isExpired()).toBe(true);
    });
  });
});
