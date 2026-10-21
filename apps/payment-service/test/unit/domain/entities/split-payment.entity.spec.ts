/**
 * SplitPaymentEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { SplitPaymentEntity, type SplitReceiverData } from '@domain/entities/split-payment.entity';
import { SplitIdVO } from '@domain/primitives/split-id.vo';
import { SplitTypeVO } from '@domain/primitives/split-type.vo';
import { SplitAmountVO } from '@domain/primitives/split-amount.vo';
import { SplitPercentageVO } from '@domain/primitives/split-percentage.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makeReceivers(): SplitReceiverData[] {
  return [
    {
      receiverId: 'vendor-1',
      amount: SplitAmountVO.create(60, 'BDT'),
      percentage: SplitPercentageVO.create(60),
    },
    {
      receiverId: 'vendor-2',
      amount: SplitAmountVO.create(40, 'BDT'),
      percentage: SplitPercentageVO.create(40),
    },
  ];
}

function makeSplit(): SplitPaymentEntity {
  return SplitPaymentEntity.create({
    id: SplitIdVO.create(TEST_IDS.SPLIT_ID),
    props: {
      paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
      type: SplitTypeVO.create('percentage'),
      receivers: makeReceivers(),
      totalAmount: 100,
      currency: 'BDT',
    },
    now: TEST_DATES.NOW,
  });
}

describe('SplitPaymentEntity', () => {
  describe('create()', () => {
    it('creates valid split', () => {
      const s = makeSplit();
      expect(s.receiverCount()).toBe(2);
      expect(s.totalAmount).toBe(100);
      expect(s.isExecuted()).toBe(false);
    });
    it('throws when < 2 receivers', () => {
      expect(() =>
        SplitPaymentEntity.create({
          id: SplitIdVO.create(TEST_IDS.SPLIT_ID),
          props: {
            paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
            type: SplitTypeVO.create('percentage'),
            receivers: [makeReceivers()[0]],
            totalAmount: 100,
            currency: 'BDT',
          },
          now: TEST_DATES.NOW,
        }),
      ).toThrow(ValidationError);
    });
    it('throws when sum != total', () => {
      const bad: SplitReceiverData[] = [
        { receiverId: 'a', amount: SplitAmountVO.create(30, 'BDT') },
        { receiverId: 'b', amount: SplitAmountVO.create(30, 'BDT') },
      ];
      expect(() =>
        SplitPaymentEntity.create({
          id: SplitIdVO.create(TEST_IDS.SPLIT_ID),
          props: {
            paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
            type: SplitTypeVO.create('fixed'),
            receivers: bad,
            totalAmount: 100,
            currency: 'BDT',
          },
          now: TEST_DATES.NOW,
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('execute()', () => {
    it('sets executedAt', () => {
      const s = makeSplit();
      s.execute(TEST_DATES.NOW);
      expect(s.isExecuted()).toBe(true);
      expect(s.executedAt).toBe(TEST_DATES.NOW);
    });
    it('throws when already executed', () => {
      const s = makeSplit();
      s.execute(TEST_DATES.NOW);
      expect(() => s.execute(TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
    it('throws when failed', () => {
      const s = makeSplit();
      s.fail('gateway err', TEST_DATES.NOW);
      expect(() => s.execute(TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('fail()', () => {
    it('sets failureReason', () => {
      const s = makeSplit();
      s.fail('insufficient balance', TEST_DATES.NOW);
      expect(s.hasFailed()).toBe(true);
      expect(s.failureReason).toBe('insufficient balance');
    });
    it('throws when already executed', () => {
      const s = makeSplit();
      s.execute(TEST_DATES.NOW);
      expect(() => s.fail('late', TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('reconstitute()', () => {
    it('rebuilds executed state', () => {
      const s = SplitPaymentEntity.reconstitute({
        id: TEST_IDS.SPLIT_ID,
        createdAt: TEST_DATES.YESTERDAY,
        updatedAt: TEST_DATES.NOW,
        props: {
          paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
          type: SplitTypeVO.create('percentage'),
          receivers: makeReceivers(),
          totalAmount: 100,
          currency: 'BDT',
          executedAt: TEST_DATES.NOW,
        },
      });
      expect(s.isExecuted()).toBe(true);
    });
  });
});
