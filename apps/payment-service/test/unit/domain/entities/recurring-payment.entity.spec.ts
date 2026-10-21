/**
 * RecurringPaymentEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { RecurringPaymentEntity } from '@domain/entities/recurring-payment.entity';
import { RecurringIdVO } from '@domain/primitives/recurring-id.vo';
import { RecurringStatusVO } from '@domain/primitives/recurring-status.vo';
import { RecurringFrequencyVO } from '@domain/primitives/recurring-frequency.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makeRecurring(): RecurringPaymentEntity {
  return RecurringPaymentEntity.create({
    id: RecurringIdVO.create(TEST_IDS.RECURRING_ID),
    props: {
      paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
      frequency: RecurringFrequencyVO.create('monthly'),
      amount: PaymentAmountVO.create(100, 'BDT'),
      startAt: TEST_DATES.NOW,
    },
    now: TEST_DATES.NOW,
  });
}

describe('RecurringPaymentEntity', () => {
  describe('create()', () => {
    it('creates scheduled recurring', () => {
      const r = makeRecurring();
      expect(r.status.isScheduled()).toBe(true);
      expect(r.attemptCount).toBe(0);
    });
    it('throws when endAt <= startAt', () => {
      expect(() =>
        RecurringPaymentEntity.create({
          id: RecurringIdVO.create(TEST_IDS.RECURRING_ID),
          props: {
            paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
            frequency: RecurringFrequencyVO.create('monthly'),
            amount: PaymentAmountVO.create(100, 'BDT'),
            startAt: TEST_DATES.NOW,
            endAt: TEST_DATES.YESTERDAY,
          },
          now: TEST_DATES.NOW,
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('activate()', () => {
    it('scheduled → active, sets nextRunAt', () => {
      const r = makeRecurring();
      r.activate(TEST_DATES.NOW);
      expect(r.isActive()).toBe(true);
      expect(r.nextRunAt).toBe(TEST_DATES.NOW);
    });
    it('throws when already active', () => {
      const r = makeRecurring();
      r.activate(TEST_DATES.NOW);
      expect(() => r.activate(TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('pause() / resume()', () => {
    it('active → paused → active', () => {
      const r = makeRecurring();
      r.activate(TEST_DATES.NOW);
      r.pause(TEST_DATES.NOW);
      expect(r.status.isPaused()).toBe(true);
      r.resume(TEST_DATES.NOW);
      expect(r.isActive()).toBe(true);
    });
    it('pause from scheduled throws', () => {
      const r = makeRecurring();
      expect(() => r.pause(TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('recordRun()', () => {
    it('increments attemptCount and updates nextRunAt', () => {
      const r = makeRecurring();
      r.activate(TEST_DATES.NOW);
      r.recordRun(TEST_DATES.NEXT_MONTH, TEST_DATES.NOW);
      expect(r.attemptCount).toBe(1);
      expect(r.nextRunAt).toBe(TEST_DATES.NEXT_MONTH);
    });
    it('marks completed when nextRunAt exceeds endAt', () => {
      const r = RecurringPaymentEntity.create({
        id: RecurringIdVO.create(TEST_IDS.RECURRING_ID),
        props: {
          paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
          frequency: RecurringFrequencyVO.create('monthly'),
          amount: PaymentAmountVO.create(100, 'BDT'),
          startAt: TEST_DATES.NOW,
          endAt: TEST_DATES.NEXT_WEEK,
        },
        now: TEST_DATES.NOW,
      });
      r.activate(TEST_DATES.NOW);
      r.recordRun(TEST_DATES.NEXT_MONTH, TEST_DATES.NOW);
      expect(r.status.isCompleted()).toBe(true);
    });
    it('throws when not active', () => {
      const r = makeRecurring();
      expect(() => r.recordRun(TEST_DATES.NEXT_MONTH, TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('fail() / cancel()', () => {
    it('fail sets failureReason', () => {
      const r = makeRecurring();
      r.activate(TEST_DATES.NOW);
      r.fail('card_declined', TEST_DATES.NOW);
      expect(r.status.isFailed()).toBe(true);
    });
    it('cancel sets cancelledAt', () => {
      const r = makeRecurring();
      r.activate(TEST_DATES.NOW);
      r.cancel('user request', TEST_DATES.NOW);
      expect(r.status.isCancelled()).toBe(true);
      expect(r.cancelledAt).toBe(TEST_DATES.NOW);
    });
    it('cancel throws when completed', () => {
      const r = RecurringPaymentEntity.reconstitute({
        id: TEST_IDS.RECURRING_ID,
        createdAt: TEST_DATES.NOW,
        updatedAt: TEST_DATES.NOW,
        props: {
          paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
          status: RecurringStatusVO.completed(),
          frequency: RecurringFrequencyVO.create('monthly'),
          amount: PaymentAmountVO.reconstitute(100, 'BDT'),
          startAt: TEST_DATES.NOW,
          attemptCount: 5,
        },
      });
      expect(() => r.cancel('late', TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('isDue()', () => {
    it('true when nextRunAt <= reference', () => {
      const r = makeRecurring();
      r.activate(TEST_DATES.NOW);
      expect(r.isDue(new Date(TEST_DATES.NOW))).toBe(true);
    });
    it('false when no nextRunAt', () => {
      const r = makeRecurring();
      expect(r.isDue()).toBe(false);
    });
  });
});
