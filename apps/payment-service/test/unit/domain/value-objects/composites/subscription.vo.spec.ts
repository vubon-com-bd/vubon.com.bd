/**
 * SubscriptionVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { SubscriptionVO } from '@domain/composites/subscription.vo';
import { SubscriptionIdVO } from '@domain/primitives/subscription-id.vo';
import { SubscriptionStatusVO } from '@domain/primitives/subscription-status.vo';
import { SubscriptionPlanVO } from '@domain/primitives/subscription-plan.vo';
import { RecurringFrequencyVO } from '@domain/primitives/recurring-frequency.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makeProps(overrides: Partial<Parameters<typeof SubscriptionVO.create>[0]> = {}) {
  return {
    id: SubscriptionIdVO.create(TEST_IDS.SUBSCRIPTION_ID),
    userId: UserIdVO.create(TEST_IDS.USER_ID),
    status: SubscriptionStatusVO.active(),
    plan: SubscriptionPlanVO.create('premium'),
    frequency: RecurringFrequencyVO.create('monthly'),
    price: PaymentAmountVO.create(500, 'BDT'),
    startedAt: TEST_DATES.NOW,
    currentPeriodStart: TEST_DATES.NOW,
    currentPeriodEnd: TEST_DATES.NEXT_MONTH,
    cancelAtPeriodEnd: false,
    createdAt: TEST_DATES.NOW,
    updatedAt: TEST_DATES.NOW,
    ...overrides,
  };
}

describe('SubscriptionVO', () => {
  describe('create()', () => {
    it('creates valid subscription', () => {
      const vo = SubscriptionVO.create(makeProps());
      expect(vo.plan.value).toBe('premium');
      expect(vo.isEntitled()).toBe(true);
    });
    it('throws when price is 0', () => {
      expect(() =>
        SubscriptionVO.create(makeProps({ price: PaymentAmountVO.reconstitute(0, 'BDT') })),
      ).toThrow(ValidationError);
    });
    it('throws when period end <= start', () => {
      expect(() =>
        SubscriptionVO.create(
          makeProps({
            currentPeriodStart: TEST_DATES.NEXT_MONTH,
            currentPeriodEnd: TEST_DATES.NOW,
          }),
        ),
      ).toThrow(ValidationError);
    });
    it('throws when cancelled without cancelledAt', () => {
      expect(() =>
        SubscriptionVO.create(makeProps({ status: SubscriptionStatusVO.cancelled() })),
      ).toThrow(ValidationError);
    });
    it('accepts cancelled with cancelledAt', () => {
      const vo = SubscriptionVO.create(
        makeProps({ status: SubscriptionStatusVO.cancelled(), cancelledAt: TEST_DATES.NOW }),
      );
      expect(vo.cancelledAt).toBe(TEST_DATES.NOW);
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = SubscriptionVO.reconstitute(
        makeProps({ price: PaymentAmountVO.reconstitute(0, 'BDT') }),
      );
      expect(vo.price.amount).toBe(0);
    });
  });

  describe('predicates', () => {
    it('isActive', () => {
      expect(SubscriptionVO.create(makeProps()).isActive()).toBe(true);
    });
    it('isInTrial', () => {
      expect(
        SubscriptionVO.create(makeProps({ status: SubscriptionStatusVO.trialing() })).isInTrial(),
      ).toBe(true);
    });
    it('isCancellable', () => {
      expect(SubscriptionVO.create(makeProps()).isCancellable()).toBe(true);
      expect(
        SubscriptionVO.create(makeProps({ status: SubscriptionStatusVO.expired() })).isCancellable(),
      ).toBe(false);
    });
  });
});
