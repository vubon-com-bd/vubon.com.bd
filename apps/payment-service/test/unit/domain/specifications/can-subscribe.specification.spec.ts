/**
 * CanSubscribeSpecification unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CanSubscribeSpecification } from '@domain/specifications/can-subscribe.specification';
import { SubscriptionEntity } from '@domain/entities/subscription.entity';
import { SubscriptionIdVO } from '@domain/primitives/subscription-id.vo';
import { SubscriptionStatusVO } from '@domain/primitives/subscription-status.vo';
import { SubscriptionPlanVO } from '@domain/primitives/subscription-plan.vo';
import { RecurringFrequencyVO } from '@domain/primitives/recurring-frequency.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makeActiveSub(plan = 'premium'): SubscriptionEntity {
  return SubscriptionEntity.reconstitute({
    id: TEST_IDS.SUBSCRIPTION_ID,
    createdAt: TEST_DATES.NOW,
    updatedAt: TEST_DATES.NOW,
    props: {
      userId: UserIdVO.create(TEST_IDS.USER_ID),
      status: SubscriptionStatusVO.active(),
      plan: SubscriptionPlanVO.create(plan),
      frequency: RecurringFrequencyVO.create('monthly'),
      price: PaymentAmountVO.reconstitute(500, 'BDT'),
      startedAt: TEST_DATES.LAST_MONTH,
      currentPeriodStart: TEST_DATES.LAST_MONTH,
      currentPeriodEnd: TEST_DATES.NEXT_MONTH,
      cancelAtPeriodEnd: false,
    },
  });
}

describe('CanSubscribeSpecification', () => {
  const spec = CanSubscribeSpecification.strict();

  describe('isSatisfiedBy()', () => {
    it('true for new subscription (no existing)', () => {
      expect(
        spec.isSatisfiedBy({
          price: 500,
          plan: 'premium',
          existingSubscriptions: [],
        }),
      ).toBe(true);
    });

    it('false when price <= 0', () => {
      expect(
        spec.isSatisfiedBy({
          price: 0,
          plan: 'premium',
          existingSubscriptions: [],
        }),
      ).toBe(false);
    });

    it('false when trialDays > 30', () => {
      expect(
        spec.isSatisfiedBy({
          price: 500,
          plan: 'premium',
          trialDays: 31,
          existingSubscriptions: [],
        }),
      ).toBe(false);
    });

    it('false when user already has active sub on same plan', () => {
      expect(
        spec.isSatisfiedBy({
          price: 500,
          plan: 'premium',
          existingSubscriptions: [makeActiveSub('premium')],
        }),
      ).toBe(false);
    });

    it('true when user has active sub on different plan', () => {
      expect(
        spec.isSatisfiedBy({
          price: 500,
          plan: 'enterprise',
          existingSubscriptions: [makeActiveSub('premium')],
        }),
      ).toBe(true);
    });
  });

  describe('explain()', () => {
    it('null when satisfied', () => {
      expect(
        spec.explain({
          price: 500,
          plan: 'premium',
          existingSubscriptions: [],
        }),
      ).toBeNull();
    });

    it('explains price issue', () => {
      const msg = spec.explain({
        price: 0,
        plan: 'premium',
        existingSubscriptions: [],
      });
      expect(msg).toContain('price');
    });

    it('explains trial duration issue', () => {
      const msg = spec.explain({
        price: 500,
        plan: 'premium',
        trialDays: 31,
        existingSubscriptions: [],
      });
      expect(msg).toContain('Trial');
    });

    it('explains existing active subscription', () => {
      const msg = spec.explain({
        price: 500,
        plan: 'premium',
        existingSubscriptions: [makeActiveSub('premium')],
      });
      expect(msg).toContain('already has');
    });
  });
});
