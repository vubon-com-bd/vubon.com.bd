/**
 * RecurringPaymentVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { RecurringPaymentVO } from '@domain/composites/recurring-payment.vo';
import { RecurringIdVO } from '@domain/primitives/recurring-id.vo';
import { RecurringStatusVO } from '@domain/primitives/recurring-status.vo';
import { RecurringFrequencyVO } from '@domain/primitives/recurring-frequency.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makeProps(overrides: Partial<Parameters<typeof RecurringPaymentVO.create>[0]> = {}) {
  return {
    id: RecurringIdVO.create(TEST_IDS.RECURRING_ID),
    paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
    status: RecurringStatusVO.active(),
    frequency: RecurringFrequencyVO.create('monthly'),
    amount: PaymentAmountVO.create(100, 'BDT'),
    startAt: TEST_DATES.NOW,
    attemptCount: 0,
    createdAt: TEST_DATES.NOW,
    updatedAt: TEST_DATES.NOW,
    ...overrides,
  };
}

describe('RecurringPaymentVO', () => {
  describe('create()', () => {
    it('creates valid recurring', () => {
      const vo = RecurringPaymentVO.create(makeProps());
      expect(vo.frequency.interval).toBe('monthly');
      expect(vo.isActive()).toBe(true);
    });
    it('throws on negative attemptCount', () => {
      expect(() => RecurringPaymentVO.create(makeProps({ attemptCount: -1 }))).toThrow(ValidationError);
    });
    it('throws when endAt <= startAt', () => {
      expect(() =>
        RecurringPaymentVO.create(
          makeProps({ startAt: TEST_DATES.NOW, endAt: TEST_DATES.YESTERDAY }),
        ),
      ).toThrow(ValidationError);
    });
    it('accepts valid endAt > startAt', () => {
      const vo = RecurringPaymentVO.create(
        makeProps({ endAt: TEST_DATES.NEXT_MONTH }),
      );
      expect(vo.endAt).toBe(TEST_DATES.NEXT_MONTH);
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = RecurringPaymentVO.reconstitute(makeProps({ attemptCount: -1 }));
      expect(vo.attemptCount).toBe(-1);
    });
  });

  describe('isDue()', () => {
    it('false without nextRunAt', () => {
      const vo = RecurringPaymentVO.create(makeProps());
      expect(vo.isDue()).toBe(false);
    });
    it('true when nextRunAt <= now', () => {
      const vo = RecurringPaymentVO.create(
        makeProps({ nextRunAt: TEST_DATES.YESTERDAY }),
      );
      expect(vo.isDue(new Date(TEST_DATES.NOW))).toBe(true);
    });
    it('false when nextRunAt > now', () => {
      const vo = RecurringPaymentVO.create(
        makeProps({ nextRunAt: TEST_DATES.NEXT_MONTH }),
      );
      expect(vo.isDue(new Date(TEST_DATES.NOW))).toBe(false);
    });
  });

  describe('isFinal()', () => {
    it('true for completed/cancelled', () => {
      expect(RecurringPaymentVO.create(makeProps({ status: RecurringStatusVO.completed() })).isFinal()).toBe(true);
      expect(RecurringPaymentVO.create(makeProps({ status: RecurringStatusVO.cancelled() })).isFinal()).toBe(true);
    });
  });
});
