/**
 * PaypalWebhookVerifier — unit tests (config-independent)
 */
import { describe, it, expect, jest, beforeEach, beforeAll } from '@jest/globals';

jest.unstable_mockModule('@infrastructure/gateways/paypal/paypal.config', () => ({
  PAYMENT_PAYPAL_CONFIG: {
    enabled: true,
    clientId: 'test',
    clientSecret: 'test',
    webhookId: '',  // empty — skip remote verification
    baseUrl: 'https://api-m.sandbox.paypal.com',
    timeoutMs: 30000,
    brandName: 'Test',
    landingPage: 'LOGIN',
    returnUrl: 'http://localhost/return',
    cancelUrl: 'http://localhost/cancel',
    tokenCacheTtlSeconds: 3000,
  },
}));

// Mock PaypalClient to prevent HTTP calls
jest.unstable_mockModule('@infrastructure/gateways/paypal/paypal.client', () => ({
  PaypalClient: class MockPaypalClient {
    async verifyWebhook() {
      return { verification_status: 'SUCCESS' };
    }
    async authenticate() { return 'token'; }
    async createOrder() { return { id: 'ORDER', links: [] }; }
    async captureOrder() { return { id: 'CAP', status: 'COMPLETED' }; }
    async getOrder() { return { id: 'ORDER', status: 'APPROVED' }; }
    async refundCapture() { return { id: 'REF', status: 'COMPLETED' }; }
  },
}));

let PaypalWebhookVerifier: typeof import('@infrastructure/gateways/paypal/paypal.webhook').PaypalWebhookVerifier;

beforeAll(async () => {
  const mod = await import('@infrastructure/gateways/paypal/paypal.webhook');
  PaypalWebhookVerifier = mod.PaypalWebhookVerifier;
});

describe('PaypalWebhookVerifier', () => {
  let verifier: InstanceType<typeof PaypalWebhookVerifier>;

  beforeEach(async () => {
    const { PaypalClient } = await import('@infrastructure/gateways/paypal/paypal.client');
    verifier = new PaypalWebhookVerifier(new PaypalClient() as never);
  });

  describe('verify()', () => {
    it('returns valid=true for well-formed payload', () => {
      const result = verifier.verify({
        headers: {},
        payload: {
          id: 'WH-123',
          event_type: 'PAYMENT.CAPTURE.COMPLETED',
          resource: { custom_id: 'PAY456' },
        },
      });
      expect(result.valid).toBe(true);
      expect(result.eventType).toBe('PAYMENT.CAPTURE.COMPLETED');
      expect(result.paymentId).toBe('PAY456');
    });

    it('returns valid=false for missing fields', () => {
      const result = verifier.verify({
        headers: {},
        payload: { id: 'WH-123' },
      });
      expect(result.valid).toBe(false);
    });
  });

  describe('verifySignature()', () => {
    it('returns true when no webhookId configured', async () => {
      const ok = await verifier.verifySignature({
        headers: {},
        payload: { id: 'WH-123', event_type: 'x' },
      });
      expect(ok).toBe(true);
    });
  });
});
