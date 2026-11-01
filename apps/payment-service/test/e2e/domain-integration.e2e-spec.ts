/**
 * E2E — Cross-aggregate domain integration
 */
import { describe, it, expect } from '@jest/globals';
import {
  makeE2EPayment,
  makeE2ERefund,
  makeE2ESubscription,
  E2E_DATES,
} from './setup/e2e-fixtures';
import { FeeCalculationService } from '@domain/services/fee-calculation.service';
import { RefundEligibilityService } from '@domain/services/refund-eligibility.service';
import { RefundReasonVO } from '@domain/primitives/refund-reason.vo';
import { CanInitiatePaymentSpecification } from '@domain/specifications/can-initiate-payment.specification';
import { CanRefundSpecification } from '@domain/specifications/can-refund.specification';

describe('E2E — Domain integration', () => {
  it('full payment flow with fee calculation', () => {
    // 1. Check can initiate
    const canInit = CanInitiatePaymentSpecification.strict();
    expect(
      canInit.isSatisfiedBy({
        amount: 1000,
        currency: 'BDT',
        existingPayments: [],
      }),
    ).toBe(true);

    // 2. Calculate fee
    const fee = FeeCalculationService.calculate({
      amount: 1000,
      currency: 'BDT',
      provider: 'stripe',
      method: 'card',
    });
    expect(fee.platformFee).toBe(25);
    expect(fee.vatAmount).toBe(3.75);
    expect(fee.netAmount).toBe(971.25);

    // 3. Execute payment
    const payment = makeE2EPayment({ amount: 1000 });
    payment.startProcessing(E2E_DATES.NOW);
    payment.capture(1000, 'ch_test_123', E2E_DATES.NOW);
    payment.markPaid(E2E_DATES.NOW);

    expect(payment.isPaid()).toBe(true);
    expect(payment.amount.amount).toBe(1000);
  });

  it('payment + refund eligibility gate', () => {
    const payment = makeE2EPayment({ amount: 100 });
    payment.startProcessing(E2E_DATES.CAPTURED_30_DAYS_AGO);
    payment.capture(100, 'ch_x', E2E_DATES.CAPTURED_30_DAYS_AGO);
    payment.markPaid(E2E_DATES.CAPTURED_30_DAYS_AGO);

    const refundSpec = CanRefundSpecification.strict();
    const eligible = refundSpec.isSatisfiedBy({
      payment,
      refundAmount: 50,
      reason: RefundReasonVO.create('customer_request'),
      referenceDate: new Date(E2E_DATES.NOW),
    });
    expect(eligible).toBe(true);
  });

  it('expired window blocks refund', () => {
    const payment = makeE2EPayment({ amount: 100 });
    payment.startProcessing(E2E_DATES.CAPTURED_91_DAYS_AGO);
    payment.capture(100, 'ch_x', E2E_DATES.CAPTURED_91_DAYS_AGO);
    payment.markPaid(E2E_DATES.CAPTURED_91_DAYS_AGO);

    const check = RefundEligibilityService.check({
      payment,
      refundAmount: 50,
      reason: RefundReasonVO.create('customer_request'),
      referenceDate: new Date(E2E_DATES.NOW),
    });
    expect(check.eligible).toBe(false);
    expect(check.reason).toContain('window');
  });

  it('payment + refund + subscription orchestration', () => {
    // Payment
    const payment = makeE2EPayment({ amount: 500 });
    payment.startProcessing(E2E_DATES.NOW);
    payment.capture(500, 'ch_sub_123', E2E_DATES.NOW);
    payment.markPaid(E2E_DATES.NOW);

    // Refund
    const refund = makeE2ERefund(payment.id, 50);
    refund.approve('admin', E2E_DATES.NOW);
    refund.startProcessing(E2E_DATES.NOW);
    refund.complete(E2E_DATES.NOW);
    payment.applyRefund(refund.amount.amount, refund.id, E2E_DATES.NOW);

    // Subscription
    const sub = makeE2ESubscription();

    // Cross-check
    expect(payment.isPartiallyRefunded()).toBe(true);
    expect(refund.isCompleted()).toBe(true);
    expect(sub.isActive()).toBe(true);
  });

  it('event flow: pull all domain events across aggregates', () => {
    const payment = makeE2EPayment();
    payment.startProcessing(E2E_DATES.NOW);
    payment.capture(100, 'ch_x', E2E_DATES.NOW);
    payment.markPaid(E2E_DATES.NOW);

    const events = payment.pullDomainEvents();
    expect(events.length).toBeGreaterThanOrEqual(4);
    expect(payment.domainEvents.length).toBe(0);
  });
});
