/**
 * CanSplitSpecification unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CanSplitSpecification } from '@domain/specifications/can-split.specification';
import { PaymentEntity } from '@domain/entities/payment.entity';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { PaymentCurrencyVO } from '@domain/primitives/payment-currency.vo';
import { PaymentMethodTypeVO } from '@domain/primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';
import { PaymentStatusVO } from '@domain/primitives/payment-status.vo';
import { OrderIdVO } from '@domain/primitives/order-id.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makePaid(): PaymentEntity {
  return PaymentEntity.reconstitute({
    id: TEST_IDS.PAYMENT_ID,
    createdAt: TEST_DATES.LAST_MONTH,
    updatedAt: TEST_DATES.NOW,
    props: {
      orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
      userId: UserIdVO.create(TEST_IDS.USER_ID),
      amount: PaymentAmountVO.reconstitute(100, 'BDT'),
      currency: PaymentCurrencyVO.reconstitute('BDT'),
      status: PaymentStatusVO.paid(),
      method: PaymentMethodTypeVO.create('card', 'online'),
      provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
      capturedAt: TEST_DATES.NOW,
      paidAt: TEST_DATES.NOW,
    },
  });
}

function makePending(): PaymentEntity {
  return PaymentEntity.create({
    id: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
    props: {
      orderId: OrderIdVO.create(TEST_IDS.ORDER_ID),
      userId: UserIdVO.create(TEST_IDS.USER_ID),
      amount: PaymentAmountVO.create(100, 'BDT'),
      currency: PaymentCurrencyVO.create('BDT'),
      method: PaymentMethodTypeVO.create('card', 'online'),
      provider: PaymentMethodProviderVO.create('stripe', 'sandbox'),
    },
    now: TEST_DATES.NOW,
  });
}

describe('CanSplitSpecification', () => {
  const spec = CanSplitSpecification.strict();

  describe('isSatisfiedBy()', () => {
    it('true for paid + 2 receivers + amount <= payment', () => {
      expect(
        spec.isSatisfiedBy({
          payment: makePaid(),
          receiverCount: 2,
          totalAmount: 80,
        }),
      ).toBe(true);
    });

    it('false for pending payment', () => {
      expect(
        spec.isSatisfiedBy({
          payment: makePending(),
          receiverCount: 2,
          totalAmount: 80,
        }),
      ).toBe(false);
    });

    it('false when < 2 receivers', () => {
      expect(
        spec.isSatisfiedBy({
          payment: makePaid(),
          receiverCount: 1,
          totalAmount: 80,
        }),
      ).toBe(false);
    });

    it('false when split total > payment amount', () => {
      expect(
        spec.isSatisfiedBy({
          payment: makePaid(),
          receiverCount: 2,
          totalAmount: 200,
        }),
      ).toBe(false);
    });

    it('false when totalAmount <= 0', () => {
      expect(
        spec.isSatisfiedBy({
          payment: makePaid(),
          receiverCount: 2,
          totalAmount: 0,
        }),
      ).toBe(false);
    });
  });

  describe('explain()', () => {
    it('null when satisfied', () => {
      expect(
        spec.explain({
          payment: makePaid(),
          receiverCount: 2,
          totalAmount: 80,
        }),
      ).toBeNull();
    });

    it('explains when < 2 receivers', () => {
      const msg = spec.explain({
        payment: makePaid(),
        receiverCount: 1,
        totalAmount: 80,
      });
      expect(msg).toContain('2');
    });

    it('explains when totalAmount exceeds', () => {
      const msg = spec.explain({
        payment: makePaid(),
        receiverCount: 2,
        totalAmount: 200,
      });
      expect(msg).toContain('exceeds');
    });
  });
});
