/**
 * CanRefundSpecification unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CanRefundSpecification } from '@domain/specifications/can-refund.specification';
import { PaymentEntity } from '@domain/entities/payment.entity';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { PaymentCurrencyVO } from '@domain/primitives/payment-currency.vo';
import { PaymentMethodTypeVO } from '@domain/primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';
import { PaymentStatusVO } from '@domain/primitives/payment-status.vo';
import { OrderIdVO } from '@domain/primitives/order-id.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';
import { RefundReasonVO } from '@domain/primitives/refund-reason.vo';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makePaid(capturedAt = TEST_DATES.CAPTURED_30_DAYS_AGO): PaymentEntity {
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
      capturedAt,
      paidAt: capturedAt,
    },
  });
}

describe('CanRefundSpecification', () => {
  const spec = CanRefundSpecification.strict();
  const reason = RefundReasonVO.create('customer_request');
  const refDate = new Date(TEST_DATES.NOW);

  describe('isSatisfiedBy()', () => {
    it('true for paid + within window', () => {
      expect(
        spec.isSatisfiedBy({
          payment: makePaid(),
          refundAmount: 50,
          reason,
          referenceDate: refDate,
        }),
      ).toBe(true);
    });

    it('false for pending payment', () => {
      const pending = PaymentEntity.create({
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
      expect(
        spec.isSatisfiedBy({
          payment: pending,
          refundAmount: 50,
          reason,
          referenceDate: refDate,
        }),
      ).toBe(false);
    });

    it('false when window expired', () => {
      expect(
        spec.isSatisfiedBy({
          payment: makePaid(TEST_DATES.CAPTURED_91_DAYS_AGO),
          refundAmount: 50,
          reason,
          referenceDate: refDate,
        }),
      ).toBe(false);
    });

    it('true when fraud bypasses window', () => {
      expect(
        spec.isSatisfiedBy({
          payment: makePaid(TEST_DATES.CAPTURED_91_DAYS_AGO),
          refundAmount: 50,
          reason: RefundReasonVO.create('fraud'),
          referenceDate: refDate,
        }),
      ).toBe(true);
    });

    it('false when amount exceeds remaining', () => {
      expect(
        spec.isSatisfiedBy({
          payment: makePaid(),
          refundAmount: 200,
          reason,
          referenceDate: refDate,
        }),
      ).toBe(false);
    });
  });

  describe('explain()', () => {
    it('null when eligible', () => {
      expect(
        spec.explain({
          payment: makePaid(),
          refundAmount: 50,
          reason,
          referenceDate: refDate,
        }),
      ).toBeNull();
    });

    it('explains window expired', () => {
      const msg = spec.explain({
        payment: makePaid(TEST_DATES.CAPTURED_91_DAYS_AGO),
        refundAmount: 50,
        reason,
        referenceDate: refDate,
      });
      expect(msg).toContain('window');
    });
  });
});
