/**
 * RocketWebhookVerifier — Unit Tests
 * @module payment-service/test/unit/infrastructure/gateways/rocket
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { RocketWebhookVerifier } from '@infrastructure/gateways/rocket/rocket.webhook';

jest.mock('@infrastructure/gateways/rocket/rocket.config', () => ({
  PAYMENT_ROCKET_CONFIG: {
    enabled: true, merchantId: 'm', apiKey: 'k', baseUrl: 'https://r.test',
    callbackUrl: '', timeoutMs: 5000, returnUrl: '', cancelUrl: '',
  },
}));

describe('RocketWebhookVerifier', () => {
  let verifier: RocketWebhookVerifier;
  beforeEach(() => {
    verifier = new RocketWebhookVerifier();
  });

  it('returns valid for well-formed payload', () => {
    const result = verifier.verify({
      headers: {},
      payload: {
        orderId: 'pay-1',
        rocketPaymentId: 'rp-1',
        amount: '1000',
        status: 'Success',
      },
    });
    expect(result.valid).toBe(true);
    expect(result.eventType).toBe('Success');
    expect(result.externalId).toBe('rp-1');
    expect(result.paymentId).toBe('pay-1');
  });

  it('rejects non-object', () => {
    const r = verifier.verify({
      headers: {},
      payload: 'bad' as unknown as Record<string, unknown>,
    });
    expect(r.valid).toBe(false);
  });

  it('rejects missing orderId', () => {
    const r = verifier.verify({
      headers: {},
      payload: { rocketPaymentId: 'rp', status: 'Success' },
    });
    expect(r.valid).toBe(false);
  });

  it('rejects missing rocketPaymentId', () => {
    const r = verifier.verify({
      headers: {},
      payload: { orderId: 'o', status: 'Success' },
    });
    expect(r.valid).toBe(false);
  });

  it('rejects missing status', () => {
    const r = verifier.verify({
      headers: {},
      payload: { orderId: 'o', rocketPaymentId: 'rp' },
    });
    expect(r.valid).toBe(false);
  });
});
