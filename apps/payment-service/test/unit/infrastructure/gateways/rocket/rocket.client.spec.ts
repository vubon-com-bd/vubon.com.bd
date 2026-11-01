/**
 * RocketClient — Unit Tests
 */
import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { RocketClient } from '@infrastructure/gateways/rocket/rocket.client';
import { installFetchMock } from '@test-infra/http-mock';
import { GatewayOperationError } from '@infrastructure/gateways/base/gateway.errors';

jest.mock('@infrastructure/gateways/rocket/rocket.config', () => ({
  PAYMENT_ROCKET_CONFIG: {
    enabled: true,
    merchantId: 'test-merchant',
    apiKey: 'test-key',
    baseUrl: 'https://sandbox.rocket.test',
    callbackUrl: 'https://cb',
    timeoutMs: 5000,
    returnUrl: '',
    cancelUrl: '',
  },
}));

describe('RocketClient', () => {
  let client: RocketClient;
  let originalFetch: typeof globalThis.fetch;

  beforeEach(() => {
    client = new RocketClient();
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  describe('createPayment()', () => {
    it('returns success response', async () => {
      installFetchMock({
        ok: true,
        status: 200,
        body: {
          success: true,
          rocketPaymentId: 'rp_123',
          redirectUrl: 'https://rocket.test/checkout/rp_123',
        },
      });
      const res = await client.createPayment({
        merchantId: 'm',
        orderId: 'pay-1',
        amount: '1000',
        currency: 'BDT',
        successUrl: 'https://s',
        failUrl: 'https://f',
        cancelUrl: 'https://c',
      });
      expect(res.success).toBe(true);
      expect(res.rocketPaymentId).toBe('rp_123');
    });

    it('throws on HTTP failure', async () => {
      installFetchMock({
        ok: false,
        status: 400,
        body: { statusMessage: 'Bad request' },
      });
      await expect(
        client.createPayment({
          merchantId: 'm',
          orderId: 'p',
          amount: '1',
          currency: 'BDT',
          successUrl: 's',
          failUrl: 'f',
          cancelUrl: 'c',
        }),
      ).rejects.toThrow(GatewayOperationError);
    });
  });

  describe('verifyPayment()', () => {
    it('returns verify response', async () => {
      installFetchMock({
        ok: true,
        status: 200,
        body: {
          success: true,
          rocketPaymentId: 'rp_123',
          status: 'Success',
          amount: '1000',
          currency: 'BDT',
        },
      });
      const res = await client.verifyPayment('rp_123');
      expect(res.success).toBe(true);
      expect(res.status).toBe('Success');
    });
  });
});
