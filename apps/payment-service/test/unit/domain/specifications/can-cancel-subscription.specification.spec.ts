/**
 * CanCancelSubscriptionSpecification unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CanCancelSubscriptionSpecification } from '@domain/specifications/can-cancel-subscription.specification';
import { SubscriptionEntity } from '@domain/entities/subscription.entity';
import { SubscriptionIdVO } from '@domain/primitives/subscription-id.vo';
import { SubscriptionStatusVO } from '@domain/primitives/subscription-status.vo';
import { SubscriptionPlanVO } from '@domain/primitives/subscription-plan.vo';
import { RecurringFrequencyVO } from '@domain/primitives/recurring-frequency.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makeSub(status: ReturnType<typeof SubscriptionStatusVO.active> = SubscriptionStatusVO.active()): SubscriptionEntity {
  return SubscriptionEntity.reconstitute({
    id: TEST_IDS.SUBSCRIPTION_ID,
    createdAt: TEST_DATES.NOW,
    updatedAt: TEST_DATES.NOW,
    props: {
      userId: UserIdVO.create(TEST_IDS.USER_ID),
      status,
      plan: SubscriptionPlanVO.create('premium'),
      frequency: RecurringFrequencyVO.create('monthly'),
      price: PaymentAmountVO.reconstitute(500, 'BDT'),
      startedAt: TEST_DATES.LAST_MONTH,
      currentPeriodStart: TEST_DATES.LAST_MONTH,
      currentPeriodEnd: TEST_DATES.NEXT_MONTH,
      cancelAtPeriodEnd: false,
      cancelledAt: status.isCancelled() ? TEST_DATES.NOW : undefined,
    },
  });
}

describe('CanCancelSubscriptionSpecification', () => {
  const spec = CanCancelSubscriptionSpecification.strict();

  describe('isSatisfiedBy()', () => {
    it('true for active subscription', () => {
      expect(spec.isSatisfiedBy({ subscription: makeSub() })).toBe(true);
    });

    it('false when already cancelled', () => {
      expect(
        spec.isSatisfiedBy({ subscription: makeSub(SubscriptionStatusVO.cancelled()) }),
      ).toBe(false);
    });

    it('false when already expired', () => {
      expect(
        spec.isSatisfiedBy({ subscription: makeSub(SubscriptionStatusVO.expired()) }),
      ).toBe(false);
    });

    it('false when pending refund exists', () => {
      expect(
        spec.isSatisfiedBy({
          subscription: makeSub(),
          pendingRefundExists: true,
        }),
      ).toBe(false);
    });
  });

  describe('explain()', () => {
    it('null when satisfied', () => {
      expect(spec.explain({ subscription: makeSub() })).toBeNull();
    });

    it('explains already cancelled', () => {
      const msg = spec.explain({ subscription: makeSub(SubscriptionStatusVO.cancelled()) });
      expect(msg).toContain('already');
    });

    it('explains already expired', () => {
      const msg = spec.explain({ subscription: makeSub(SubscriptionStatusVO.expired()) });
      expect(msg).toContain('expired');
    });

    it('explains pending refund', () => {
      const msg = spec.explain({ subscription: makeSub(), pendingRefundExists: true });
      expect(msg).toContain('refund');
    });
  });
});
