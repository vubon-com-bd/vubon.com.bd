/**
 * BkashWebhookVerifier — unit tests (config-independent)
 */
import { describe, it, expect, jest, beforeEach, beforeAll } from '@jest/globals';

// Mock the config module using alias
jest.unstable_mockModule('@infrastructure/gateways/bkash/bkash.config', () => ({
  PAYMENT_BKASH_CONFIG: {
    enabled: true,
    appKey: 'test',
    appSecret: '',
    username: 'test',
    password: 'test',
    baseUrl: 'http://localhost:9999',
    callbackUrl: 'http://localhost/cb',
    timeoutMs: 30000,
    tokenCacheTtlSeconds: 3300,
    merchantShortCode: 'test',
    intent: 'sale',
  },
}));

let BkashWebhookVerifier: typeof import('@infrastructure/gateways/bkash/bkash.webhook').BkashWebhookVerifier;

beforeAll(async () => {
  const mod = await import('@infrastructure/gateways/bkash/bkash.webhook');
  BkashWebhookVerifier = mod.BkashWebhookVerifier;
});

describe('BkashWebhookVerifier', () => {
  let verifier: InstanceType<typeof BkashWebhookVerifier>;

  beforeEach(() => {
    verifier = new BkashWebhookVerifier();
  });

  describe('verify()', () => {
    it('returns valid=true for well-formed payload', () => {
      const result = verifier.verify({
        headers: {},
        payload: {
          paymentID: 'PAY123',
          trxID: 'TRX456',
          amount: '1500.00',
          transactionStatus: 'Completed',
        },
      });
      expect(result.valid).toBe(true);
      expect(result.eventType).toBe('Completed');
      expect(result.externalId).toBe('TRX456');
      expect(result.paymentId).toBe('PAY123');
    });

    it('returns valid=false for missing required fields', () => {
      const result = verifier.verify({
        headers: {},
        payload: { paymentID: 'PAY123' },
      });
      expect(result.valid).toBe(false);
    });
  });

  describe('verifySignature()', () => {
    it('returns true when no secret configured', async () => {
      const ok = await verifier.verifySignature(
        {
          paymentID: 'PAY123',
          trxID: 'TRX456',
          amount: '1500.00',
          transactionStatus: 'Completed',
        },
        'sig_abc',
      );
      expect(ok).toBe(true);
    });
  });
});
