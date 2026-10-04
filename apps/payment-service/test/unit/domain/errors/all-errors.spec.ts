import {
  PaymentNotFoundError, PaymentAlreadyExistsError,
  InvalidPaymentStatusError, InvalidPaymentTypeError,
  InvalidPaymentMethodError, InvalidPaymentGatewayError,
  InvalidStatusTransitionError, PaymentAmountMismatchError,
  PaymentCannotBeRefundedError, PaymentCannotBeCapturedError,
  PaymentCannotBeCancelledError, PaymentExpiredError,
  PaymentAuthorizationWindowClosedError, PaymentRetryLimitExceededError,
  IdempotencyConflictError, PaymentGatewayError, PaymentCurrencyMismatchError,
} from '../../../../src/module/domain/errors/payment.errors.js';
import {
  RefundNotFoundError, InvalidRefundStatusError,
  RefundAmountExceededError, RefundWindowExpiredError,
  PartialRefundNotAllowedError, RefundReasonRequiredError,
  RefundCannotBeProcessedError,
} from '../../../../src/module/domain/errors/refund.errors.js';
import {
  TransactionNotFoundError, InvalidTransactionTypeError,
  InvalidTransactionStatusError, TransactionCannotBeReversedError,
  DuplicateIdempotencyKeyError,
} from '../../../../src/module/domain/errors/transaction.errors.js';
import {
  WebhookEventNotFoundError, WebhookSignatureInvalidError,
  WebhookAlreadyProcessedError, WebhookProcessingFailedError,
} from '../../../../src/module/domain/errors/webhook.errors.js';

describe('All payment errors — instantiate & toJSON', () => {
  const errors = [
    new PaymentNotFoundError('id'),
    new PaymentAlreadyExistsError('ref'),
    new InvalidPaymentStatusError('bad', ['a']),
    new InvalidPaymentTypeError('bad', ['a']),
    new InvalidPaymentMethodError('bad', ['a']),
    new InvalidPaymentGatewayError('bad', ['a']),
    new InvalidStatusTransitionError('from', 'to', 'pid'),
    new PaymentAmountMismatchError(100, 90, 'BDT'),
    new PaymentCannotBeRefundedError('pid', 'pending', 'reason'),
    new PaymentCannotBeCapturedError('pid', 'pending'),
    new PaymentCannotBeCancelledError('pid', 'captured'),
    new PaymentExpiredError('pid', '2026-01-01'),
    new PaymentAuthorizationWindowClosedError('pid', '2026-01-01', 24),
    new PaymentRetryLimitExceededError('pid', 3, 3),
    new IdempotencyConflictError('key', 'pid'),
    new PaymentGatewayError('bkash', 'msg', 'CODE'),
    new PaymentCurrencyMismatchError('BDT', 'USD'),
  ];

  for (const e of errors) {
    it(`${e.name} has code, httpStatus, message, toJSON`, () => {
      expect(e.code).toBeDefined();
      expect(e.httpStatus).toBeGreaterThan(0);
      expect(e.message.length).toBeGreaterThan(0);
      const json = e.toJSON();
      expect(json['name']).toBe(e.name);
      expect(json['code']).toBe(e.code);
    });
  }

  it('PaymentGatewayError without code', () => {
    const e = new PaymentGatewayError('stripe', 'msg');
    expect(e.message).toContain('stripe');
    expect(e.message).not.toContain('[');
  });

  it('PaymentCannotBeRefundedError without reason', () => {
    const e = new PaymentCannotBeRefundedError('pid', 'pending');
    expect(e.message).not.toContain('—');
  });
});

describe('All refund errors', () => {
  const errors = [
    new RefundNotFoundError('id'),
    new InvalidRefundStatusError('bad', ['a']),
    new RefundAmountExceededError('pid', 1500, 1000, 'BDT'),
    new RefundWindowExpiredError('pid', '2025-01-01', 90),
    new PartialRefundNotAllowedError('pid'),
    new RefundReasonRequiredError(),
    new RefundCannotBeProcessedError('rid', 'cancelled'),
  ];
  for (const e of errors) {
    it(`${e.name} is instantiable`, () => {
      expect(e.code).toBeDefined();
      expect(e.httpStatus).toBeGreaterThan(0);
      expect(e.toJSON()['name']).toBe(e.name);
    });
  }
});

describe('All transaction errors', () => {
  const errors = [
    new TransactionNotFoundError('id'),
    new InvalidTransactionTypeError('bad', ['a']),
    new InvalidTransactionStatusError('bad', ['a']),
    new TransactionCannotBeReversedError('tid', 'pending'),
    new DuplicateIdempotencyKeyError('key', 'tid'),
  ];
  for (const e of errors) {
    it(`${e.name} is instantiable`, () => {
      expect(e.toJSON()['name']).toBe(e.name);
    });
  }
});

describe('All webhook errors', () => {
  const errors = [
    new WebhookEventNotFoundError('id'),
    new WebhookSignatureInvalidError('bkash'),
    new WebhookSignatureInvalidError('stripe', 'too short'),
    new WebhookAlreadyProcessedError('evt_1'),
    new WebhookProcessingFailedError('evt_1', 3, 'network'),
  ];
  for (const e of errors) {
    it(`${e.name} is instantiable`, () => {
      expect(e.toJSON()['name']).toBe(e.name);
    });
  }
});
