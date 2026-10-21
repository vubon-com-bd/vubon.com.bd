/**
 * RefundEligibilityService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { RefundEligibilityService } from '@domain/services/refund-eligibility.service';
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
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
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

describe('RefundEligibilityService', () => {
  const reason = RefundReasonVO.create('customer_request');
  const refDate = new Date(TEST_DATES.NOW);

  describe('check()', () => {
    it('eligible when paid + within 90-day window', () => {
      const r = RefundEligibilityService.check({
        payment: makePaid(),
        refundAmount: 50,
        reason,
        referenceDate: refDate,
      });
      expect(r.eligible).toBe(true);
      expect(r.remainingAmount).toBe(100);
    });

    it('not eligible — window expired (>90d)', () => {
      const r = RefundEligibilityService.check({
        payment: makePaid(TEST_DATES.CAPTURED_91_DAYS_AGO),
        refundAmount: 50,
        reason,
        referenceDate: refDate,
      });
      expect(r.eligible).toBe(false);
      expect(r.reason).toContain('window');
    });

    it('fraud bypasses expired window', () => {
      const r = RefundEligibilityService.check({
        payment: makePaid(TEST_DATES.CAPTURED_91_DAYS_AGO),
        refundAmount: 50,
        reason: RefundReasonVO.create('fraud'),
        referenceDate: refDate,
      });
      expect(r.eligible).toBe(true);
    });

    it('not eligible — pending payment', () => {
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
      const r = RefundEligibilityService.check({
        payment: pending,
        refundAmount: 50,
        reason,
        referenceDate: refDate,
      });
      expect(r.eligible).toBe(false);
    });

    it('not eligible — refund exceeds remaining', () => {
      const r = RefundEligibilityService.check({
        payment: makePaid(),
        refundAmount: 200,
        reason,
        referenceDate: refDate,
      });
      expect(r.eligible).toBe(false);
      expect(r.reason).toContain('exceeds');
    });

    it('not eligible — zero refund', () => {
      const r = RefundEligibilityService.check({
        payment: makePaid(),
        refundAmount: 0,
        reason,
        referenceDate: refDate,
      });
      expect(r.eligible).toBe(false);
    });
  });

  describe('assert()', () => {
    it('throws BusinessRuleError when not eligible', () => {
      expect(() =>
        RefundEligibilityService.assert({
          payment: makePaid(TEST_DATES.CAPTURED_91_DAYS_AGO),
          refundAmount: 50,
          reason,
          referenceDate: refDate,
        }),
      ).toThrow(BusinessRuleError);
    });
    it('does not throw when eligible', () => {
      expect(() =>
        RefundEligibilityService.assert({
          payment: makePaid(),
          refundAmount: 50,
          reason,
          referenceDate: refDate,
        }),
      ).not.toThrow();
    });
  });
});
