import {
  PaymentNotFoundError,
  PaymentAlreadyExistsError,
  InvalidPaymentStatusError,
  InvalidPaymentTypeError,
  InvalidPaymentMethodError,
  InvalidPaymentGatewayError,
  InvalidStatusTransitionError,
  PaymentAmountMismatchError,
  PaymentCannotBeRefundedError,
  PaymentCannotBeCapturedError,
  PaymentCannotBeCancelledError,
  PaymentExpiredError,
  PaymentAuthorizationWindowClosedError,
  PaymentRetryLimitExceededError,
  IdempotencyConflictError,
  PaymentGatewayError,
  PaymentCurrencyMismatchError,
} from '../../../../src/module/domain/errors/payment.errors.js';

import {
  RefundNotFoundError,
  InvalidRefundStatusError,
  RefundAmountExceededError,
  RefundWindowExpiredError,
  PartialRefundNotAllowedError,
  RefundReasonRequiredError,
  RefundCannotBeProcessedError,
} from '../../../../src/module/domain/errors/refund.errors.js';

import {
  TransactionNotFoundError,
  InvalidTransactionTypeError,
  InvalidTransactionStatusError,
  TransactionCannotBeReversedError,
  DuplicateIdempotencyKeyError,
} from '../../../../src/module/domain/errors/transaction.errors.js';

import {
  WebhookEventNotFoundError,
  WebhookSignatureInvalidError,
  WebhookAlreadyProcessedError,
  WebhookProcessingFailedError,
} from '../../../../src/module/domain/errors/webhook.errors.js';

describe('Domain Errors — payment', () => {
  it('PaymentNotFoundError → 404', () => {
    const e = new PaymentNotFoundError('abc');
    expect(e.httpStatus).toBe(404);
    expect(e.name).toBe('PaymentNotFoundError');
    expect(e.message).toContain('abc');
  });

  it('PaymentAlreadyExistsError → 409', () => {
    const e = new PaymentAlreadyExistsError('ref-1');
    expect(e.httpStatus).toBe(409);
  });

  it('InvalidPaymentStatusError → 422', () => {
    const e = new InvalidPaymentStatusError('bogus', ['pending', 'captured']);
    expect(e.httpStatus).toBe(422);
  });

  it('InvalidPaymentTypeError → 422', () => {
    expect(new InvalidPaymentTypeError('bad', ['one_time']).httpStatus).toBe(422);
  });

  it('InvalidPaymentMethodError → 422', () => {
    expect(new InvalidPaymentMethodError('bad', ['card']).httpStatus).toBe(422);
  });

  it('InvalidPaymentGatewayError → 422', () => {
    expect(new InvalidPaymentGatewayError('bad', ['bkash']).httpStatus).toBe(422);
  });

  it('InvalidStatusTransitionError → 400 (BusinessRuleError)', () => {
    const e = new InvalidStatusTransitionError('pending', 'captured');
    expect(e.httpStatus).toBe(400);
    expect(e.message).toContain('pending');
    expect(e.message).toContain('captured');
  });

  it('PaymentAmountMismatchError → 400', () => {
    const e = new PaymentAmountMismatchError(1000, 900, 'BDT');
    expect(e.message).toContain('1000');
    expect(e.message).toContain('900');
  });

  it('PaymentCannotBeRefundedError → 400', () => {
    expect(new PaymentCannotBeRefundedError('id', 'pending').httpStatus).toBe(400);
  });

  it('PaymentCannotBeCapturedError → 400', () => {
    expect(new PaymentCannotBeCapturedError('id', 'pending').httpStatus).toBe(400);
  });

  it('PaymentCannotBeCancelledError → 400', () => {
    expect(new PaymentCannotBeCancelledError('id', 'captured').httpStatus).toBe(400);
  });

  it('PaymentExpiredError → 400', () => {
    expect(new PaymentExpiredError('id', '2026-01-01').httpStatus).toBe(400);
  });

  it('PaymentAuthorizationWindowClosedError → 400', () => {
    expect(
      new PaymentAuthorizationWindowClosedError('id', '2026-01-01', 24).httpStatus,
    ).toBe(400);
  });

  it('PaymentRetryLimitExceededError → 400', () => {
    expect(new PaymentRetryLimitExceededError('id', 3, 3).httpStatus).toBe(400);
  });

  it('IdempotencyConflictError → 409', () => {
    expect(new IdempotencyConflictError('key-1', 'pay-1').httpStatus).toBe(409);
  });

  it('PaymentGatewayError → 400', () => {
    const e = new PaymentGatewayError('bkash', 'timeout', 'GW_TIMEOUT');
    expect(e.message).toContain('bkash');
    expect(e.message).toContain('timeout');
  });

  it('PaymentCurrencyMismatchError → 422', () => {
    expect(new PaymentCurrencyMismatchError('BDT', 'USD').httpStatus).toBe(422);
  });
});

describe('Domain Errors — refund', () => {
  it('RefundNotFoundError → 404', () => {
    expect(new RefundNotFoundError('id').httpStatus).toBe(404);
  });

  it('InvalidRefundStatusError → 422', () => {
    expect(new InvalidRefundStatusError('bogus', ['pending']).httpStatus).toBe(422);
  });

  it('RefundAmountExceededError → 400', () => {
    const e = new RefundAmountExceededError('pay-1', 1500, 1000, 'BDT');
    expect(e.message).toContain('1500');
    expect(e.message).toContain('1000');
  });

  it('RefundWindowExpiredError → 400', () => {
    expect(new RefundWindowExpiredError('pay-1', '2025-01-01', 90).httpStatus).toBe(400);
  });

  it('PartialRefundNotAllowedError → 400', () => {
    expect(new PartialRefundNotAllowedError('pay-1').httpStatus).toBe(400);
  });

  it('RefundReasonRequiredError → 422', () => {
    expect(new RefundReasonRequiredError().httpStatus).toBe(422);
  });

  it('RefundCannotBeProcessedError → 400', () => {
    expect(new RefundCannotBeProcessedError('rf-1', 'cancelled').httpStatus).toBe(400);
  });
});

describe('Domain Errors — transaction', () => {
  it('TransactionNotFoundError → 404', () => {
    expect(new TransactionNotFoundError('id').httpStatus).toBe(404);
  });

  it('InvalidTransactionTypeError → 422', () => {
    expect(new InvalidTransactionTypeError('bad', ['payment']).httpStatus).toBe(422);
  });

  it('InvalidTransactionStatusError → 422', () => {
    expect(new InvalidTransactionStatusError('bad', ['pending']).httpStatus).toBe(422);
  });

  it('TransactionCannotBeReversedError → 400', () => {
    expect(new TransactionCannotBeReversedError('tx-1', 'pending').httpStatus).toBe(400);
  });

  it('DuplicateIdempotencyKeyError → 400', () => {
    expect(new DuplicateIdempotencyKeyError('key-1', 'tx-1').httpStatus).toBe(400);
  });
});

describe('Domain Errors — webhook', () => {
  it('WebhookEventNotFoundError → 404', () => {
    expect(new WebhookEventNotFoundError('id').httpStatus).toBe(404);
  });

  it('WebhookSignatureInvalidError → 422', () => {
    expect(new WebhookSignatureInvalidError('bkash').httpStatus).toBe(422);
  });

  it('WebhookAlreadyProcessedError → 400', () => {
    expect(new WebhookAlreadyProcessedError('evt_1').httpStatus).toBe(400);
  });

  it('WebhookProcessingFailedError → 400', () => {
    expect(new WebhookProcessingFailedError('evt_1', 3, 'network').httpStatus).toBe(400);
  });
});
