import { WebhookValidator } from '../../../../src/module/application/validators/webhook.validator.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

describe('WebhookValidator', () => {
  const validPayload = {
    gateway: 'bkash',
    gatewayEventId: 'evt_123',
    eventType: 'payment.succeeded',
    payload: { paymentId: 'x' },
  };

  it('passes valid payload', () => {
    const out = WebhookValidator.validate(validPayload);
    expect(out.gateway).toBe('bkash');
    expect(out.eventType).toBe('payment.succeeded');
  });

  it('throws on non-object', () => {
    expect(() => WebhookValidator.validate(null)).toThrow(ApplicationValidationError);
    expect(() => WebhookValidator.validate('string')).toThrow(ApplicationValidationError);
  });

  it('throws on missing gateway', () => {
    expect(() =>
      WebhookValidator.validate({ ...validPayload, gateway: undefined }),
    ).toThrow(ApplicationValidationError);
  });

  it('throws on missing gatewayEventId', () => {
    expect(() =>
      WebhookValidator.validate({ ...validPayload, gatewayEventId: '' }),
    ).toThrow(ApplicationValidationError);
  });

  it('throws on missing eventType', () => {
    expect(() =>
      WebhookValidator.validate({ ...validPayload, eventType: '' }),
    ).toThrow(ApplicationValidationError);
  });

  it('throws on missing payload', () => {
    expect(() =>
      WebhookValidator.validate({ ...validPayload, payload: null }),
    ).toThrow(ApplicationValidationError);
  });
});
