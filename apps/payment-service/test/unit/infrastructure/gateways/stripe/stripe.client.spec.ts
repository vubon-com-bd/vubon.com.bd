/**
 * StripeClient — Unit Tests
 */
import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { StripeClient } from '@infrastructure/gateways/stripe/stripe.client';
import { installFetchMock } from '@test-infra/http-mock';
import { GatewayOperationError } from '@infrastructure/gateways/base/gateway.errors';

jest.mock('@infrastructure/gateways/stripe/stripe.config', () => ({
  PAYMENT_STRIPE_CONFIG: {
    enabled: true,
    secretKey: 'sk_test_123',
    publishableKey: 'pk_test',
    webhookSecret: 'whsec_test',
    apiVersion: '2024-10-28.acacia',
    timeoutMs: 5000,
    maxRetries: 3,
    captureMethod: 'automatic',
    returnUrl: 'https://r',
    successUrl: 'https://s',
    cancelUrl: 'https://c',
  },
}));

describe('StripeClient', () => {
  let client: StripeClient;
  let originalFetch: typeof globalThis.fetch;

  beforeEach(() => {
    client = new StripeClient();
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  describe('createPaymentIntent()', () => {
    it('returns intent with client_secret', async () => {
      installFetchMock({
        ok: true,
        status: 200,
        body: {
          id: 'pi_123',
          object: 'payment_intent',
          amount: 100000,
          currency: 'bdt',
          status: 'requires_payment_method',
          client_secret: 'pi_123_secret_xyz',
        },
      });
      const res = await client.createPaymentIntent({
        amount: 1000,
        currency: 'BDT',
        description: 'Test',
      });
      expect(res.id).toBe('pi_123');
      expect(res.client_secret).toBe('pi_123_secret_xyz');
    });

    it('throws on HTTP failure', async () => {
      installFetchMock({
        ok: false,
        status: 400,
        body: { error: { message: 'Invalid amount' } },
      });
      await expect(
        client.createPaymentIntent({ amount: 0, currency: 'BDT' }),
      ).rejects.toThrow(GatewayOperationError);
    });

    it('sends correct amount as cents', async () => {
      const fetchMock = installFetchMock({
        ok: true,
        status: 200,
        body: { id: 'pi_x', status: 'requires_payment_method', amount: 50000 },
      });
      await client.createPaymentIntent({ amount: 500, currency: 'BDT' });
      const call = fetchMock.mock.calls[0] as [string, RequestInit];
      const body = call[1].body as string;
      expect(body).toContain('amount=50000');
      expect(body).toContain('currency=bdt');
    });
  });

  describe('capturePaymentIntent()', () => {
    it('returns captured intent', async () => {
      installFetchMock({
        ok: true,
        status: 200,
        body: { id: 'pi_123', status: 'succeeded' },
      });
      const res = await client.capturePaymentIntent('pi_123', { amount_to_capture: 500 });
      expect(res.status).toBe('succeeded');
    });
  });

  describe('retrievePaymentIntent()', () => {
    it('returns intent detail', async () => {
      installFetchMock({
        ok: true,
        status: 200,
        body: { id: 'pi_123', status: 'succeeded', amount: 100000, currency: 'bdt' },
      });
      const res = await client.retrievePaymentIntent('pi_123');
      expect(res.id).toBe('pi_123');
      expect(res.status).toBe('succeeded');
    });
  });

  describe('cancelPaymentIntent()', () => {
    it('returns cancelled intent', async () => {
      installFetchMock({
        ok: true,
        status: 200,
        body: { id: 'pi_123', status: 'canceled' },
      });
      const res = await client.cancelPaymentIntent('pi_123');
      expect(res.status).toBe('canceled');
    });
  });

  describe('createRefund()', () => {
    it('returns refund object', async () => {
      installFetchMock({
        ok: true,
        status: 200,
        body: {
          id: 're_123',
          object: 'refund',
          amount: 50000,
          currency: 'bdt',
          status: 'succeeded',
          payment_intent: 'pi_123',
        },
      });
      const res = await client.createRefund({
        payment_intent: 'pi_123',
        amount: 500,
        reason: 'requested_by_customer',
      });
      expect(res.id).toBe('re_123');
      expect(res.status).toBe('succeeded');
    });
  });
});
