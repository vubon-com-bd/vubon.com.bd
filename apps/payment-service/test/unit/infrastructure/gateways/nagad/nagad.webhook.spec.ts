/**
 * NagadWebhookVerifier — Unit Tests
 * @module payment-service/test/unit/infrastructure/gateways/nagad
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { NagadWebhookVerifier } from '@infrastructure/gateways/nagad/nagad.webhook';

jest.mock('@infrastructure/gateways/nagad/nagad.config', () => ({
  PAYMENT_NAGAD_CONFIG: {
    enabled: true, merchantId: 'm', merchantPrivateKey: 'p', pgPublicKey: 'pub',
    baseUrl: 'https://n.test', callbackUrl: '', timeoutMs: 5000,
    merchantNumber: '', callbackUrlAlt: '',
  },
}));

describe('NagadWebhookVerifier', () => {
  let verifier: NagadWebhookVerifier;
  beforeEach(() => {
    verifier = new NagadWebhookVerifier();
  });

  it('returns valid for well-formed payload', () => {
    const result = verifier.verify({
      headers: {},
      payload: {
        orderId: 'pay-1',
        paymentRefId: 'pr-1',
        amount: '1000',
        status: 'Success',
        issuerPaymentRefNo: 'iss-1',
      },
    });
    expect(result.valid).toBe(true);
    expect(result.eventType).toBe('Success');
    expect(result.externalId).toBe('pr-1');
    expect(result.paymentId).toBe('pay-1');
  });

  it('rejects non-object', () => {
    const r = verifier.verify({
      headers: {},
      payload: 'not-object' as unknown as Record<string, unknown>,
    });
    expect(r.valid).toBe(false);
    expect(r.reason).toContain('object');
  });

  it('rejects missing orderId', () => {
    const r = verifier.verify({
      headers: {},
      payload: { paymentRefId: 'p', status: 'Success' },
    });
    expect(r.valid).toBe(false);
  });

  it('rejects missing paymentRefId', () => {
    const r = verifier.verify({
      headers: {},
      payload: { orderId: 'o', status: 'Success' },
    });
    expect(r.valid).toBe(false);
  });

  it('rejects missing status', () => {
    const r = verifier.verify({
      headers: {},
      payload: { orderId: 'o', paymentRefId: 'p' },
    });
    expect(r.valid).toBe(false);
  });

  it('handles null payload', () => {
    const r = verifier.verify({
      headers: {},
      payload: null as unknown as Record<string, unknown>,
    });
    expect(r.valid).toBe(false);
  });
});
