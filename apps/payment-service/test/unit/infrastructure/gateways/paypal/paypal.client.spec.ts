/**
 * PaypalClient — Unit Tests
 */
import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { PaypalClient } from '@infrastructure/gateways/paypal/paypal.client';
import { installFetchMock } from '@test-infra/http-mock';
import { GatewayOperationError } from '@infrastructure/gateways/base/gateway.errors';

jest.mock('@infrastructure/gateways/paypal/paypal.config', () => ({
  PAYMENT_PAYPAL_CONFIG: {
    enabled: true,
    clientId: 'paypal-client',
    clientSecret: 'paypal-secret',
    webhookId: 'wh-id',
    baseUrl: 'https://api.sandbox.paypal.test',
    timeoutMs: 5000,
    brandName: 'Vubon',
    landingPage: 'LOGIN',
    returnUrl: 'https://r',
    cancelUrl: 'https://c',
    tokenCacheTtlSeconds: 3000,
  },
}));

describe('PaypalClient', () => {
  let client: PaypalClient;
  let originalFetch: typeof globalThis.fetch;

  beforeEach(() => {
    client = new PaypalClient();
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  describe('authenticate()', () => {
    it('fetches and caches access token', async () => {
      const fetchMock = installFetchMock({
        ok: true,
        status: 200,
        body: { access_token: 'pp-token-123', token_type: 'Bearer', expires_in: 3600 },
      });
      const token = await client.authenticate();
      expect(token).toBe('pp-token-123');
      expect(fetchMock).toHaveBeenCalledTimes(1);

      // Second call — cached
      await client.authenticate();
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('throws on auth failure', async () => {
      installFetchMock({
        ok: false,
        status: 401,
        body: {},
      });
      await expect(client.authenticate()).rejects.toThrow(GatewayOperationError);
    });
  });

  describe('createOrder()', () => {
    beforeEach(() => {
      // Auth token prime
      installFetchMock([
        { ok: true, status: 200, body: { access_token: 'tok', expires_in: 3600 } },
        {
          ok: true,
          status: 201,
          body: {
            id: 'ORDER_123',
            status: 'CREATED',
            links: [
              { href: 'https://pp.test/checkout/ORDER_123', rel: 'approve', method: 'GET' },
            ],
          },
        },
      ]);
    });

    it('creates order with approve link', async () => {
      const res = await client.createOrder({
        intent: 'CAPTURE',
        purchase_units: [
          { reference_id: 'pay-1', amount: { currency_code: 'BDT', value: '1000.00' } },
        ],
      });
      expect(res.id).toBe('ORDER_123');
      expect(res.links[0].rel).toBe('approve');
    });
  });

  describe('captureOrder()', () => {
    it('returns capture response', async () => {
      installFetchMock([
        { ok: true, status: 200, body: { access_token: 'tok', expires_in: 3600 } },
        { ok: true, status: 201, body: { id: 'ORDER_123', status: 'COMPLETED' } },
      ]);
      const res = await client.captureOrder('ORDER_123');
      expect(res.status).toBe('COMPLETED');
    });
  });

  describe('getOrder()', () => {
    it('returns order detail', async () => {
      installFetchMock([
        { ok: true, status: 200, body: { access_token: 'tok', expires_in: 3600 } },
        {
          ok: true,
          status: 200,
          body: {
            id: 'ORDER_123',
            status: 'APPROVED',
            links: [],
            purchase_units: [{ amount: { currency_code: 'BDT', value: '1000.00' } }],
          },
        },
      ]);
      const res = await client.getOrder('ORDER_123');
      expect(res.status).toBe('APPROVED');
    });
  });

  describe('refundCapture()', () => {
    it('returns refund response', async () => {
      installFetchMock([
        { ok: true, status: 200, body: { access_token: 'tok', expires_in: 3600 } },
        {
          ok: true,
          status: 201,
          body: { id: 'REFUND_1', status: 'COMPLETED' },
        },
      ]);
      const res = await client.refundCapture('CAP_123', {
        value: '500.00',
        currency_code: 'BDT',
      });
      expect(res.id).toBe('REFUND_1');
      expect(res.status).toBe('COMPLETED');
    });
  });

  describe('verifyWebhook()', () => {
    it('returns verification response', async () => {
      installFetchMock([
        { ok: true, status: 200, body: { access_token: 'tok', expires_in: 3600 } },
        { ok: true, status: 200, body: { verification_status: 'SUCCESS' } },
      ]);
      const res = await client.verifyWebhook({
        auth_algo: 'sha256',
        cert_url: 'https://cert',
        transmission_id: 'tid',
        transmission_sig: 'tsig',
        transmission_time: 'time',
        webhook_id: 'wh-id',
        webhook_event: { id: 'evt_1' },
      });
      expect(res.verification_status).toBe('SUCCESS');
    });
  });
});
