/**
 * NagadClient — Unit Tests
 */
import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { NagadClient } from '@infrastructure/gateways/nagad/nagad.client';
import { installFetchMock } from '@test-infra/http-mock';
import { GatewayOperationError } from '@infrastructure/gateways/base/gateway.errors';

jest.mock('@infrastructure/gateways/nagad/nagad.config', () => ({
  PAYMENT_NAGAD_CONFIG: {
    enabled: true,
    merchantId: 'test-merchant',
    merchantPrivateKey: 'priv',
    pgPublicKey: 'pub',
    baseUrl: 'https://sandbox.nagad.test',
    callbackUrl: 'https://cb',
    timeoutMs: 5000,
    merchantNumber: '',
    callbackUrlAlt: '',
  },
}));

describe('NagadClient', () => {
  let client: NagadClient;
  let originalFetch: typeof globalThis.fetch;

  beforeEach(() => {
    client = new NagadClient();
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  describe('initialize()', () => {
    it('posts to /initialize and returns response', async () => {
      installFetchMock({
        ok: true,
        status: 200,
        body: {
          sensitiveData: 'encrypted',
          signature: 'signed',
        },
      });
      const res = await client.initialize({
        accountNumber: '01700000000',
        dateTime: '2025-01-15T10:00:00.000Z',
        sensitiveData: 'sd',
        signature: 'sig',
      });
      expect(res.sensitiveData).toBe('encrypted');
      expect(res.signature).toBe('signed');
    });

    it('throws GatewayOperationError on HTTP failure', async () => {
      installFetchMock({
        ok: false,
        status: 500,
        body: { message: 'internal error' },
      });
      await expect(
        client.initialize({
          accountNumber: '017',
          dateTime: 'now',
          sensitiveData: '',
          signature: '',
        }),
      ).rejects.toThrow(GatewayOperationError);
    });
  });

  describe('complete()', () => {
    it('posts to /complete', async () => {
      installFetchMock({
        ok: true,
        status: 200,
        body: { sensitiveData: 'sd2', signature: 'sig2' },
      });
      const res = await client.complete({
        sensitiveData: 'sd',
        signature: 'sig',
      });
      expect(res.signature).toBe('sig2');
    });
  });
});
