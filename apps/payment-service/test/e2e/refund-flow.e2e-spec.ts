/**
 * E2E — Refund lifecycle (domain-level)
 */
import { describe, it, expect } from '@jest/globals';
import { makeE2EPayment, makeE2ERefund, E2E_DATES } from './setup/e2e-fixtures';

describe('E2E — Refund flow', () => {
  it('requested → approved → processing → completed', () => {
    const refund = makeE2ERefund();
    expect(refund.status.isRequested()).toBe(true);

    refund.approve('admin-1', E2E_DATES.NOW);
    expect(refund.status.isApproved()).toBe(true);

    refund.startProcessing(E2E_DATES.NOW);
    expect(refund.status.isProcessing()).toBe(true);

    refund.complete(E2E_DATES.NOW);
    expect(refund.isCompleted()).toBe(true);
    expect(refund.completedAt).toBe(E2E_DATES.NOW);
  });

  it('requested → rejected', () => {
    const refund = makeE2ERefund();
    refund.reject('policy violation', E2E_DATES.NOW);
    expect(refund.status.isRejected()).toBe(true);
    expect(refund.failureReason).toBe('policy violation');
  });

  it('approved → processing → failed', () => {
    const refund = makeE2ERefund();
    refund.approve('admin', E2E_DATES.NOW);
    refund.startProcessing(E2E_DATES.NOW);
    refund.fail('gateway down', E2E_DATES.NOW);
    expect(refund.status.isFailed()).toBe(true);
    expect(refund.isRetryable()).toBe(true);
  });

  it('refund + payment integration: partial refund updates payment', () => {
    const payment = makeE2EPayment({ amount: 100 });
    payment.startProcessing(E2E_DATES.NOW);
    payment.capture(100, 'ch_x', E2E_DATES.NOW);
    payment.markPaid(E2E_DATES.NOW);

    // Refund flow
    const refund = makeE2ERefund(payment.id, 30);
    refund.approve('admin', E2E_DATES.NOW);
    refund.startProcessing(E2E_DATES.NOW);
    refund.complete(E2E_DATES.NOW);

    // Payment should be notified (orchestration)
    payment.applyRefund(refund.amount.amount, refund.id, E2E_DATES.NOW);

    expect(payment.isPartiallyRefunded()).toBe(true);
    expect(payment.refundedAmount).toBe(30);
    expect(payment.remainingRefundableAmount()).toBe(70);
  });

  it('two partial refunds sum correctly', () => {
    const payment = makeE2EPayment({ amount: 100 });
    payment.startProcessing(E2E_DATES.NOW);
    payment.capture(100, 'ch_x', E2E_DATES.NOW);
    payment.markPaid(E2E_DATES.NOW);

    payment.applyRefund(30, 'rfd_1', E2E_DATES.NOW);
    payment.applyRefund(40, 'rfd_2', E2E_DATES.NOW);

    expect(payment.refundedAmount).toBe(70);
    expect(payment.isPartiallyRefunded()).toBe(true);
  });

  it('full refund transitions to refunded', () => {
    const payment = makeE2EPayment({ amount: 100 });
    payment.startProcessing(E2E_DATES.NOW);
    payment.capture(100, 'ch_x', E2E_DATES.NOW);
    payment.markPaid(E2E_DATES.NOW);

    payment.applyRefund(100, 'rfd_full', E2E_DATES.NOW);
    expect(payment.isRefunded()).toBe(true);
    expect(payment.remainingRefundableAmount()).toBe(0);
  });
});
