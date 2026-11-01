/**
 * Domain Events — combined unit tests
 *
 * Validates:
 *   - Event type constants
 *   - BaseDomainEvent contract (id, type, aggregateId, aggregateType, payload, occurredAt, version)
 *   - Helper functions (newEventId, now)
 *   - Aggregate type registry
 */
import { describe, it, expect } from '@jest/globals';
import {
  PAYMENT_AGGREGATE_TYPE,
  newEventId,
  now,
} from '@domain/events/event.helpers';

import {
  PAYMENT_EVENT_TYPE,
  PaymentCreatedEvent,
  PaymentStatusChangedEvent,
  PaymentCapturedEvent,
  PaymentFailedEvent,
  PaymentRefundedEvent,
} from '@domain/events/payment.events';

import {
  TRANSACTION_EVENT_TYPE,
  TransactionCreatedEvent,
  TransactionStatusChangedEvent,
  TransactionSettledEvent,
} from '@domain/events/transaction.events';

import {
  REFUND_EVENT_TYPE,
  RefundRequestedEvent,
  RefundCompletedEvent,
} from '@domain/events/refund.events';

import {
  SPLIT_EVENT_TYPE,
  SplitCreatedEvent,
  SplitExecutedEvent,
} from '@domain/events/split.events';

import {
  RECURRING_EVENT_TYPE,
  RecurringScheduledEvent,
  RecurringRunEvent,
} from '@domain/events/recurring.events';

import {
  SUBSCRIPTION_EVENT_TYPE,
  SubscriptionCreatedEvent,
  SubscriptionRenewedEvent,
} from '@domain/events/subscription.events';

import {
  INVOICE_EVENT_TYPE,
  InvoiceCreatedEvent,
  InvoicePaidEvent,
} from '@domain/events/invoice.events';

import {
  VERIFICATION_EVENT_TYPE,
  VerificationInitiatedEvent,
  VerificationVerifiedEvent,
} from '@domain/events/verification.events';

import { TEST_IDS, TEST_DATES } from '@fixtures/index';

describe('Event Helpers', () => {
  it('PAYMENT_AGGREGATE_TYPE has all keys', () => {
    expect(PAYMENT_AGGREGATE_TYPE.PAYMENT).toBe('Payment');
    expect(PAYMENT_AGGREGATE_TYPE.TRANSACTION).toBe('Transaction');
    expect(PAYMENT_AGGREGATE_TYPE.REFUND).toBe('Refund');
    expect(PAYMENT_AGGREGATE_TYPE.SPLIT).toBe('SplitPayment');
    expect(PAYMENT_AGGREGATE_TYPE.RECURRING).toBe('RecurringPayment');
    expect(PAYMENT_AGGREGATE_TYPE.SUBSCRIPTION).toBe('Subscription');
    expect(PAYMENT_AGGREGATE_TYPE.INVOICE).toBe('Invoice');
    expect(PAYMENT_AGGREGATE_TYPE.VERIFICATION).toBe('Verification');
  });

  it('newEventId generates unique ids', () => {
    const a = newEventId();
    const b = newEventId();
    expect(a).not.toBe(b);
    expect(typeof a).toBe('string');
  });

  it('now returns ISO timestamp', () => {
    const t = now();
    expect(new Date(t).getTime()).not.toBeNaN();
  });
});

describe('Payment Events', () => {
  it('PAYMENT_EVENT_TYPE constants', () => {
    expect(PAYMENT_EVENT_TYPE.CREATED).toBe('payment.payment.created');
    expect(PAYMENT_EVENT_TYPE.CAPTURED).toBe('payment.payment.captured');
    expect(PAYMENT_EVENT_TYPE.REFUNDED).toBe('payment.payment.refunded');
  });

  it('PaymentCreatedEvent has correct structure', () => {
    const e = new PaymentCreatedEvent({
      aggregateId: TEST_IDS.PAYMENT_ID,
      payload: {
        paymentId: TEST_IDS.PAYMENT_ID,
        orderId: TEST_IDS.ORDER_ID,
        userId: TEST_IDS.USER_ID,
        amount: 100,
        currency: 'BDT',
        method: 'card',
        createdAt: TEST_DATES.NOW,
      },
      version: 1,
    });
    expect(e.type).toBe(PAYMENT_EVENT_TYPE.CREATED);
    expect(e.aggregateType).toBe('Payment');
    expect(e.aggregateId).toBe(TEST_IDS.PAYMENT_ID);
    expect(e.version).toBe(1);
    expect(e.payload.amount).toBe(100);
    expect(typeof e.id).toBe('string');
    expect(e.occurredAt).toBeDefined();
  });

  it('PaymentStatusChangedEvent captures from/to', () => {
    const e = new PaymentStatusChangedEvent({
      aggregateId: TEST_IDS.PAYMENT_ID,
      payload: {
        paymentId: TEST_IDS.PAYMENT_ID,
        fromStatus: 'pending',
        toStatus: 'processing',
        changedBy: 'system',
      },
      version: 2,
    });
    expect(e.type).toBe(PAYMENT_EVENT_TYPE.STATUS_CHANGED);
    expect(e.payload.fromStatus).toBe('pending');
    expect(e.payload.toStatus).toBe('processing');
  });

  it('PaymentCapturedEvent payload shape', () => {
    const e = new PaymentCapturedEvent({
      aggregateId: TEST_IDS.PAYMENT_ID,
      payload: {
        paymentId: TEST_IDS.PAYMENT_ID,
        capturedAmount: 100,
        currency: 'BDT',
        gatewayReference: 'ch_test_123',
        capturedAt: TEST_DATES.NOW,
      },
      version: 3,
    });
    expect(e.type).toBe(PAYMENT_EVENT_TYPE.CAPTURED);
    expect(e.payload.capturedAmount).toBe(100);
    expect(e.payload.gatewayReference).toBe('ch_test_123');
  });

  it('PaymentFailedEvent has failure details', () => {
    const e = new PaymentFailedEvent({
      aggregateId: TEST_IDS.PAYMENT_ID,
      payload: {
        paymentId: TEST_IDS.PAYMENT_ID,
        reason: 'card_declined',
        failureCode: 'CARD_DECLINED',
        failedAt: TEST_DATES.NOW,
      },
      version: 2,
    });
    expect(e.type).toBe(PAYMENT_EVENT_TYPE.FAILED);
    expect(e.payload.reason).toBe('card_declined');
    expect(e.payload.failureCode).toBe('CARD_DECLINED');
  });

  it('PaymentRefundedEvent payload', () => {
    const e = new PaymentRefundedEvent({
      aggregateId: TEST_IDS.PAYMENT_ID,
      payload: {
        paymentId: TEST_IDS.PAYMENT_ID,
        refundId: TEST_IDS.REFUND_ID,
        refundedAmount: 50,
        currency: 'BDT',
        refundedAt: TEST_DATES.NOW,
      },
      version: 4,
    });
    expect(e.type).toBe(PAYMENT_EVENT_TYPE.REFUNDED);
    expect(e.payload.refundedAmount).toBe(50);
  });

  it('accepts optional id override', () => {
    const customId = 'custom-event-id';
    const e = new PaymentCreatedEvent({
      id: customId,
      aggregateId: TEST_IDS.PAYMENT_ID,
      payload: {
        paymentId: TEST_IDS.PAYMENT_ID,
        orderId: TEST_IDS.ORDER_ID,
        userId: TEST_IDS.USER_ID,
        amount: 100,
        currency: 'BDT',
        method: 'card',
        createdAt: TEST_DATES.NOW,
      },
      version: 1,
    });
    expect(e.id).toBe(customId);
  });
});

describe('Transaction Events', () => {
  it('TRANSACTION_EVENT_TYPE constants', () => {
    expect(TRANSACTION_EVENT_TYPE.CREATED).toBe('payment.transaction.created');
    expect(TRANSACTION_EVENT_TYPE.SETTLED).toBe('payment.transaction.settled');
  });

  it('TransactionCreatedEvent structure', () => {
    const e = new TransactionCreatedEvent({
      aggregateId: TEST_IDS.TRANSACTION_ID,
      payload: {
        transactionId: TEST_IDS.TRANSACTION_ID,
        paymentId: TEST_IDS.PAYMENT_ID,
        type: 'payment',
        amount: 100,
        currency: 'BDT',
        createdAt: TEST_DATES.NOW,
      },
      version: 1,
    });
    expect(e.aggregateType).toBe('Transaction');
    expect(e.payload.type).toBe('payment');
  });

  it('TransactionSettledEvent', () => {
    const e = new TransactionSettledEvent({
      aggregateId: TEST_IDS.TRANSACTION_ID,
      payload: {
        transactionId: TEST_IDS.TRANSACTION_ID,
        paymentId: TEST_IDS.PAYMENT_ID,
        amount: 100,
        currency: 'BDT',
        settledAt: TEST_DATES.NOW,
      },
      version: 2,
    });
    expect(e.type).toBe(TRANSACTION_EVENT_TYPE.SETTLED);
  });
});

describe('Refund Events', () => {
  it('REFUND_EVENT_TYPE constants', () => {
    expect(REFUND_EVENT_TYPE.REQUESTED).toBe('payment.refund.requested');
    expect(REFUND_EVENT_TYPE.COMPLETED).toBe('payment.refund.completed');
  });

  it('RefundRequestedEvent', () => {
    const e = new RefundRequestedEvent({
      aggregateId: TEST_IDS.REFUND_ID,
      payload: {
        refundId: TEST_IDS.REFUND_ID,
        paymentId: TEST_IDS.PAYMENT_ID,
        amount: 50,
        currency: 'BDT',
        reason: 'customer_request',
        requestedAt: TEST_DATES.NOW,
      },
      version: 1,
    });
    expect(e.aggregateType).toBe('Refund');
    expect(e.payload.reason).toBe('customer_request');
  });

  it('RefundCompletedEvent', () => {
    const e = new RefundCompletedEvent({
      aggregateId: TEST_IDS.REFUND_ID,
      payload: {
        refundId: TEST_IDS.REFUND_ID,
        paymentId: TEST_IDS.PAYMENT_ID,
        refundedAmount: 50,
        currency: 'BDT',
        completedAt: TEST_DATES.NOW,
      },
      version: 2,
    });
    expect(e.type).toBe(REFUND_EVENT_TYPE.COMPLETED);
  });
});

describe('Split Events', () => {
  it('SPLIT_EVENT_TYPE constants', () => {
    expect(SPLIT_EVENT_TYPE.CREATED).toBe('payment.split.created');
    expect(SPLIT_EVENT_TYPE.EXECUTED).toBe('payment.split.executed');
  });

  it('SplitCreatedEvent', () => {
    const e = new SplitCreatedEvent({
      aggregateId: TEST_IDS.SPLIT_ID,
      payload: {
        splitId: TEST_IDS.SPLIT_ID,
        paymentId: TEST_IDS.PAYMENT_ID,
        totalAmount: 100,
        currency: 'BDT',
        receivers: [
          { receiverId: 'a', amount: 60, currency: 'BDT' },
          { receiverId: 'b', amount: 40, currency: 'BDT' },
        ],
        createdAt: TEST_DATES.NOW,
      },
      version: 1,
    });
    expect(e.aggregateType).toBe('SplitPayment');
    expect(e.payload.receivers.length).toBe(2);
  });

  it('SplitExecutedEvent', () => {
    const e = new SplitExecutedEvent({
      aggregateId: TEST_IDS.SPLIT_ID,
      payload: {
        splitId: TEST_IDS.SPLIT_ID,
        paymentId: TEST_IDS.PAYMENT_ID,
        executedAt: TEST_DATES.NOW,
      },
      version: 2,
    });
    expect(e.type).toBe(SPLIT_EVENT_TYPE.EXECUTED);
  });
});

describe('Recurring Events', () => {
  it('RECURRING_EVENT_TYPE constants', () => {
    expect(RECURRING_EVENT_TYPE.SCHEDULED).toBe('payment.recurring.scheduled');
    expect(RECURRING_EVENT_TYPE.RUN).toBe('payment.recurring.run');
  });

  it('RecurringScheduledEvent', () => {
    const e = new RecurringScheduledEvent({
      aggregateId: TEST_IDS.RECURRING_ID,
      payload: {
        recurringId: TEST_IDS.RECURRING_ID,
        paymentId: TEST_IDS.PAYMENT_ID,
        amount: 100,
        currency: 'BDT',
        interval: 'monthly',
        intervalCount: 1,
        startAt: TEST_DATES.NOW,
      },
      version: 1,
    });
    expect(e.aggregateType).toBe('RecurringPayment');
    expect(e.payload.interval).toBe('monthly');
  });

  it('RecurringRunEvent', () => {
    const e = new RecurringRunEvent({
      aggregateId: TEST_IDS.RECURRING_ID,
      payload: {
        recurringId: TEST_IDS.RECURRING_ID,
        paymentId: TEST_IDS.PAYMENT_ID,
        runAt: TEST_DATES.NOW,
        attemptCount: 3,
      },
      version: 4,
    });
    expect(e.payload.attemptCount).toBe(3);
  });
});

describe('Subscription Events', () => {
  it('SUBSCRIPTION_EVENT_TYPE constants', () => {
    expect(SUBSCRIPTION_EVENT_TYPE.CREATED).toBe('payment.subscription.created');
    expect(SUBSCRIPTION_EVENT_TYPE.RENEWED).toBe('payment.subscription.renewed');
  });

  it('SubscriptionCreatedEvent', () => {
    const e = new SubscriptionCreatedEvent({
      aggregateId: TEST_IDS.SUBSCRIPTION_ID,
      payload: {
        subscriptionId: TEST_IDS.SUBSCRIPTION_ID,
        userId: TEST_IDS.USER_ID,
        plan: 'premium',
        price: 500,
        currency: 'BDT',
        createdAt: TEST_DATES.NOW,
      },
      version: 1,
    });
    expect(e.aggregateType).toBe('Subscription');
    expect(e.payload.plan).toBe('premium');
  });

  it('SubscriptionRenewedEvent', () => {
    const e = new SubscriptionRenewedEvent({
      aggregateId: TEST_IDS.SUBSCRIPTION_ID,
      payload: {
        subscriptionId: TEST_IDS.SUBSCRIPTION_ID,
        periodStart: TEST_DATES.NOW,
        periodEnd: TEST_DATES.NEXT_MONTH,
        renewedAt: TEST_DATES.NOW,
      },
      version: 2,
    });
    expect(e.payload.periodEnd).toBe(TEST_DATES.NEXT_MONTH);
  });
});

describe('Invoice Events', () => {
  it('INVOICE_EVENT_TYPE constants', () => {
    expect(INVOICE_EVENT_TYPE.CREATED).toBe('payment.invoice.created');
    expect(INVOICE_EVENT_TYPE.PAID).toBe('payment.invoice.paid');
  });

  it('InvoiceCreatedEvent', () => {
    const e = new InvoiceCreatedEvent({
      aggregateId: TEST_IDS.INVOICE_ID,
      payload: {
        invoiceId: TEST_IDS.INVOICE_ID,
        invoiceNumber: TEST_IDS.INVOICE_NUMBER,
        userId: TEST_IDS.USER_ID,
        total: 115,
        currency: 'BDT',
        createdAt: TEST_DATES.NOW,
      },
      version: 1,
    });
    expect(e.aggregateType).toBe('Invoice');
    expect(e.payload.invoiceNumber).toBe(TEST_IDS.INVOICE_NUMBER);
  });

  it('InvoicePaidEvent', () => {
    const e = new InvoicePaidEvent({
      aggregateId: TEST_IDS.INVOICE_ID,
      payload: {
        invoiceId: TEST_IDS.INVOICE_ID,
        paidAmount: 115,
        currency: 'BDT',
        paidAt: TEST_DATES.NOW,
      },
      version: 2,
    });
    expect(e.payload.paidAmount).toBe(115);
  });
});

describe('Verification Events', () => {
  it('VERIFICATION_EVENT_TYPE constants', () => {
    expect(VERIFICATION_EVENT_TYPE.INITIATED).toBe('payment.verification.initiated');
    expect(VERIFICATION_EVENT_TYPE.VERIFIED).toBe('payment.verification.verified');
  });

  it('VerificationInitiatedEvent', () => {
    const e = new VerificationInitiatedEvent({
      aggregateId: TEST_IDS.VERIFICATION_ID,
      payload: {
        verificationId: TEST_IDS.VERIFICATION_ID,
        paymentId: TEST_IDS.PAYMENT_ID,
        method: 'otp_sms',
        expiresAt: TEST_DATES.EXPIRES_IN_1_HOUR,
        initiatedAt: TEST_DATES.NOW,
      },
      version: 1,
    });
    expect(e.aggregateType).toBe('Verification');
    expect(e.payload.method).toBe('otp_sms');
  });

  it('VerificationVerifiedEvent', () => {
    const e = new VerificationVerifiedEvent({
      aggregateId: TEST_IDS.VERIFICATION_ID,
      payload: {
        verificationId: TEST_IDS.VERIFICATION_ID,
        paymentId: TEST_IDS.PAYMENT_ID,
        method: 'otp_sms',
        attempts: 2,
        completedAt: TEST_DATES.NOW,
      },
      version: 3,
    });
    expect(e.payload.attempts).toBe(2);
  });
});
