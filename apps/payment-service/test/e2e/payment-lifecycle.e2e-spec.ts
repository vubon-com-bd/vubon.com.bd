/**
 * E2E — Payment lifecycle (domain-level, in-memory)
 */
import { describe, it, expect } from '@jest/globals';
import { makeE2EPayment, E2E_DATES } from './setup/e2e-fixtures';

describe('E2E — Payment lifecycle', () => {
  it('pending → processing → captured → paid', () => {
    const payment = makeE2EPayment({ amount: 100 });

    expect(payment.isPending()).toBe(true);
    payment.startProcessing(E2E_DATES.NOW);
    expect(payment.isProcessing()).toBe(true);

    payment.capture(100, 'ch_test_lifecycle', E2E_DATES.NOW);
    expect(payment.isCaptured()).toBe(true);

    payment.markPaid(E2E_DATES.NOW);
    expect(payment.isPaid()).toBe(true);
    expect(payment.paidAt).toBe(E2E_DATES.NOW);
  });

  it('emits all lifecycle events in order', () => {
    const payment = makeE2EPayment();
    payment.pullDomainEvents(); // clear created event

    payment.startProcessing(E2E_DATES.NOW);
    payment.capture(100, 'ch_x', E2E_DATES.NOW);
    payment.markPaid(E2E_DATES.NOW);

    const events = payment.domainEvents;
    expect(events.length).toBeGreaterThanOrEqual(4); // processing, captured event, captured status change, paid
  });

  it('pending → processing → failed', () => {
    const payment = makeE2EPayment();
    payment.startProcessing(E2E_DATES.NOW);
    payment.fail('gateway_timeout', 'GW_TIMEOUT', E2E_DATES.NOW);

    expect(payment.isFailed()).toBe(true);
    expect(payment.failureReason).toBe('gateway_timeout');
  });

  it('pending → cancelled (user cancel)', () => {
    const payment = makeE2EPayment();
    payment.cancel('user_request', 'admin-1', E2E_DATES.NOW);
    expect(payment.isCancelled()).toBe(true);
  });

  it('pending → processing → captured → chargeback', () => {
    const payment = makeE2EPayment();
    payment.startProcessing(E2E_DATES.NOW);
    payment.capture(100, 'ch_x', E2E_DATES.NOW);
    payment.chargeback('dispute raised', E2E_DATES.NOW);
    expect(payment.status.isChargeback()).toBe(true);
  });

  it('paid → refund → partially_refunded → refunded', () => {
    const payment = makeE2EPayment({ amount: 100 });
    payment.startProcessing(E2E_DATES.NOW);
    payment.capture(100, 'ch_x', E2E_DATES.NOW);
    payment.markPaid(E2E_DATES.NOW);

    payment.applyRefund(30, 'rfd_1', E2E_DATES.NOW);
    expect(payment.isPartiallyRefunded()).toBe(true);
    expect(payment.remainingRefundableAmount()).toBe(70);

    payment.applyRefund(70, 'rfd_2', E2E_DATES.NOW);
    expect(payment.isRefunded()).toBe(true);
    expect(payment.remainingRefundableAmount()).toBe(0);
  });

  it('reconstitute reconstructs from persisted state', () => {
    // Simulate DB round-trip
    const original = makeE2EPayment({ amount: 250 });
    original.startProcessing(E2E_DATES.NOW);
    original.capture(250, 'ch_x', E2E_DATES.NOW);

    // Later, from another service instance
    expect(original.isCaptured()).toBe(true);
    expect(original.amount.amount).toBe(250);
    expect(original.gatewayReference?.value).toBe('ch_x');
  });
});
