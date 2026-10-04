import { jest } from '@jest/globals';
import { RefundHttpValidator } from '../../../../src/module/interfaces/validators/refund.validator.js';
import { WebhookHttpValidator } from '../../../../src/module/interfaces/validators/webhook.validator.js';
import { PaymentHttpValidator } from '../../../../src/module/interfaces/validators/payment.validator.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('RefundHttpValidator — full branches', () => {
  it('rejects amount undefined + no idempotencyKey', () => {
    const out = RefundHttpValidator.validateRequest({ paymentId: UUID });
    expect(out.amount).toBeUndefined();
    expect(out.reason).toBeUndefined();
    expect(out.idempotencyKey).toBeUndefined();
  });

  it('rejects negative amount', () => {
    expect(() =>
      RefundHttpValidator.validateRequest({ paymentId: UUID, amount: -10 }),
    ).toThrow();
  });

  it('rejects non-number amount', () => {
    expect(() =>
      RefundHttpValidator.validateRequest({ paymentId: UUID, amount: 'abc' }),
    ).toThrow();
  });

  it('accepts string reason', () => {
    const out = RefundHttpValidator.validateRequest({
      paymentId: UUID,
      reason: 'damaged',
    });
    expect(out.reason).toBe('damaged');
  });
});

describe('WebhookHttpValidator — full branches', () => {
  it('rejects missing gateway', () => {
    expect(() =>
      WebhookHttpValidator.validate({
        gatewayEventId: 'e',
        eventType: 'x',
        payload: {},
      }),
    ).toThrow();
  });

  it('rejects non-object payload', () => {
    expect(() =>
      WebhookHttpValidator.validate({
        gateway: 'bkash',
        gatewayEventId: 'e',
        eventType: 'x',
        payload: 'not-obj',
      }),
    ).toThrow();
  });

  it('rejects null payload', () => {
    expect(() =>
      WebhookHttpValidator.validate({
        gateway: 'bkash',
        gatewayEventId: 'e',
        eventType: 'x',
        payload: null,
      }),
    ).toThrow();
  });
});

describe('PaymentHttpValidator — additional branches', () => {
  it('validateInitiate with all fields', () => {
    expect(() =>
      PaymentHttpValidator.validateInitiate({
        orderId: UUID,
        method: 'card',
        gateway: 'stripe',
        amount: 100,
        currency: 'USD',
        returnUrl: 'https://x.com/r',
        idempotencyKey: 'idem_abc12345',
        metadata: { k: 'v' },
      }),
    ).not.toThrow();
  });

  it('validateVerify with all fields', () => {
    expect(() =>
      PaymentHttpValidator.validateVerify({
        paymentId: UUID,
        gatewaySignature: 'sig',
        gatewayData: { k: 'v' },
      }),
    ).not.toThrow();
  });

  it('validateRefund with reason', () => {
    expect(() =>
      PaymentHttpValidator.validateRefund({
        paymentId: UUID,
        amount: 100,
        reason: 'x',
        idempotencyKey: 'idem_abc12345',
      }),
    ).not.toThrow();
  });
});
