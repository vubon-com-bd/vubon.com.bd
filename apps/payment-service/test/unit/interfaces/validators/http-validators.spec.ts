import { jest } from '@jest/globals';
import { BadRequestException } from '@nestjs/common';
import { PaymentHttpValidator } from '../../../../src/module/interfaces/validators/payment.validator.js';
import { RefundHttpValidator } from '../../../../src/module/interfaces/validators/refund.validator.js';
import { WebhookHttpValidator } from '../../../../src/module/interfaces/validators/webhook.validator.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('PaymentHttpValidator', () => {
  it('accepts valid initiate payload', () => {
    expect(() =>
      PaymentHttpValidator.validateInitiate({
        orderId: UUID,
        method: 'mobile_banking',
        amount: 1000,
        currency: 'BDT',
      }),
    ).not.toThrow();
  });

  it('throws BadRequestException on invalid', () => {
    expect(() => PaymentHttpValidator.validateInitiate({})).toThrow(BadRequestException);
  });

  it('wraps application error as BadRequestException', () => {
    try {
      PaymentHttpValidator.validateInitiate({ orderId: 'bad', method: 'x', amount: 1, currency: 'BD' });
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
    }
  });
});

describe('RefundHttpValidator', () => {
  it('validates valid refund body', () => {
    const out = RefundHttpValidator.validateRequest({
      paymentId: UUID,
      amount: 500,
      reason: 'damaged',
    });
    expect(out.paymentId).toBe(UUID);
    expect(out.amount).toBe(500);
  });

  it('rejects non-object body', () => {
    expect(() => RefundHttpValidator.validateRequest(null)).toThrow(BadRequestException);
    expect(() => RefundHttpValidator.validateRequest('str')).toThrow(BadRequestException);
  });

  it('rejects missing paymentId', () => {
    expect(() => RefundHttpValidator.validateRequest({ amount: 500 })).toThrow(BadRequestException);
  });

  it('rejects non-positive amount', () => {
    expect(() =>
      RefundHttpValidator.validateRequest({ paymentId: UUID, amount: 0 }),
    ).toThrow(BadRequestException);
  });

  it('optional reason and idempotencyKey pass through', () => {
    const out = RefundHttpValidator.validateRequest({
      paymentId: UUID,
      idempotencyKey: 'idem_abc12345',
    });
    expect(out.idempotencyKey).toBe('idem_abc12345');
    expect(out.reason).toBeUndefined();
  });
});

describe('WebhookHttpValidator', () => {
  it('accepts valid webhook body', () => {
    expect(() =>
      WebhookHttpValidator.validate({
        gateway: 'bkash',
        gatewayEventId: 'evt_1',
        eventType: 'payment.succeeded',
        payload: {},
      }),
    ).not.toThrow();
  });

  it('throws on invalid payload', () => {
    expect(() => WebhookHttpValidator.validate({})).toThrow(BadRequestException);
  });
});
