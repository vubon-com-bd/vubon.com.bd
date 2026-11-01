/**
 * StripeWebhookVerifier — unit tests (config-independent)
 */
import { describe, it, expect, jest, beforeEach, beforeAll } from '@jest/globals';

jest.unstable_mockModule('@infrastructure/gateways/stripe/stripe.config', () => ({
  PAYMENT_STRIPE_CONFIG: {
    enabled: true,
    secretKey: 'sk_test_xxx',
    publishableKey: 'pk_test_xxx',
    webhookSecret: '',
    apiVersion: '2024-10-28.acacia',
    timeoutMs: 30000,
    maxRetries: 3,
    captureMethod: 'automatic',
    returnUrl: 'http://localhost/return',
    successUrl: 'http://localhost/success',
    cancelUrl: 'http://localhost/cancel',
  },
}));

let StripeWebhookVerifier: typeof import('@infrastructure/gateways/stripe/stripe.webhook').StripeWebhookVerifier;

beforeAll(async () => {
  const mod = await import('@infrastructure/gateways/stripe/stripe.webhook');
  StripeWebhookVerifier = mod.StripeWebhookVerifier;
});

describe('StripeWebhookVerifier', () => {
  let verifier: InstanceType<typeof StripeWebhookVerifier>;

  beforeEach(() => {
    verifier = new StripeWebhookVerifier();
  });

  describe('verify()', () => {
    it('returns valid=true for well-formed payload', () => {
      const result = verifier.verify({
        headers: {},
        payload: {
          id: 'evt_123',
          type: 'payment_intent.succeeded',
          data: { object: { id: 'pi_123', metadata: { paymentId: 'PAY456' } } },
        },
      });
      expect(result.valid).toBe(true);
      expect(result.eventType).toBe('payment_intent.succeeded');
      expect(result.paymentId).toBe('PAY456');
    });

    it('returns valid=false for missing fields', () => {
      const result = verifier.verify({
        headers: {},
        payload: { id: 'evt_123' },
      });
      expect(result.valid).toBe(false);
    });
  });

  describe('verifySignature()', () => {
    it('returns true when no webhookSecret configured', async () => {
      const body = '{"type":"payment_intent.succeeded"}';
      const timestamp = Math.floor(Date.now() / 1000);
      const header = `t=${timestamp},v1=fake`;
      const ok = await verifier.verifySignature(body, header);
      expect(ok).toBe(true);
    });
  });
});
