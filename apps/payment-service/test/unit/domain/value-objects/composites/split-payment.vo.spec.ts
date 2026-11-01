/**
 * SplitPaymentVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { SplitPaymentVO, type SplitReceiver } from '@domain/composites/split-payment.vo';
import { SplitIdVO } from '@domain/primitives/split-id.vo';
import { SplitTypeVO } from '@domain/primitives/split-type.vo';
import { SplitAmountVO } from '@domain/primitives/split-amount.vo';
import { SplitPercentageVO } from '@domain/primitives/split-percentage.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makeReceivers(): SplitReceiver[] {
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

function makeProps(overrides: Partial<Parameters<typeof SplitPaymentVO.create>[0]> = {}) {
  return {
    id: SplitIdVO.create(TEST_IDS.SPLIT_ID),
    paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
    type: SplitTypeVO.create('percentage'),
    receivers: makeReceivers(),
    totalAmount: 100,
    currency: 'BDT',
    createdAt: TEST_DATES.NOW,
    updatedAt: TEST_DATES.NOW,
    ...overrides,
  };
}

describe('SplitPaymentVO', () => {
  describe('create()', () => {
    it('creates valid split', () => {
      const vo = SplitPaymentVO.create(makeProps());
      expect(vo.receiverCount()).toBe(2);
      expect(vo.totalAmount).toBe(100);
    });
    it('throws when less than 2 receivers', () => {
      expect(() =>
        SplitPaymentVO.create(makeProps({ receivers: [makeReceivers()[0]] })),
      ).toThrow(ValidationError);
    });
    it('throws when sum != total', () => {
      const bad: SplitReceiver[] = [
        { receiverId: 'a', amount: SplitAmountVO.create(30, 'BDT') },
        { receiverId: 'b', amount: SplitAmountVO.create(30, 'BDT') },
      ];
      expect(() => SplitPaymentVO.create(makeProps({ receivers: bad }))).toThrow(ValidationError);
    });
    it('throws when percentages != 100', () => {
      const bad: SplitReceiver[] = [
        {
          receiverId: 'a',
          amount: SplitAmountVO.create(50, 'BDT'),
          percentage: SplitPercentageVO.create(50),
        },
        {
          receiverId: 'b',
          amount: SplitAmountVO.create(50, 'BDT'),
          percentage: SplitPercentageVO.create(40),
        },
      ];
      expect(() => SplitPaymentVO.create(makeProps({ receivers: bad }))).toThrow(ValidationError);
    });
    it('accepts equal split without percentages', () => {
      const equal: SplitReceiver[] = [
        { receiverId: 'a', amount: SplitAmountVO.create(50, 'BDT') },
        { receiverId: 'b', amount: SplitAmountVO.create(50, 'BDT') },
      ];
      const vo = SplitPaymentVO.create(
        makeProps({ type: SplitTypeVO.create('equal'), receivers: equal }),
      );
      expect(vo.type.isEqual()).toBe(true);
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const bad: SplitReceiver[] = [
        { receiverId: 'a', amount: SplitAmountVO.create(30, 'BDT') },
      ];
      const vo = SplitPaymentVO.reconstitute(makeProps({ receivers: bad }));
      expect(vo.receiverCount()).toBe(1);
    });
  });
});
