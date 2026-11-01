/**
 * SslcommerzClient — Unit Tests
 */
import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { SslcommerzClient } from '@infrastructure/gateways/sslcommerz/sslcommerz.client';
import { installFetchMock } from '@test-infra/http-mock';
import { GatewayOperationError } from '@infrastructure/gateways/base/gateway.errors';

jest.mock('@infrastructure/gateways/sslcommerz/sslcommerz.config', () => ({
  PAYMENT_SSLCOMMERZ_CONFIG: {
    enabled: true,
    storeId: 'store-123',
    storePassword: 'pass-123',
    baseUrl: 'https://sandbox.sslcommerz.test',
    successUrl: 'https://s',
    failUrl: 'https://f',
    cancelUrl: 'https://c',
    ipnUrl: 'https://ipn',
    timeoutMs: 5000,
    sandbox: true,
  },
}));

describe('SslcommerzClient', () => {
  let client: SslcommerzClient;
  let originalFetch: typeof globalThis.fetch;

  beforeEach(() => {
    client = new SslcommerzClient();
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  describe('createSession()', () => {
    it('returns session with GatewayPageURL', async () => {
      installFetchMock({
        ok: true,
        status: 200,
        body: {
          status: 'SUCCESS',
          sessionkey: 'sess_123',
          GatewayPageURL: 'https://ssl.test/pay/sess_123',
        },
      });
      const res = await client.createSession({
        store_id: 'store-123',
        store_passwd: 'pass-123',
        total_amount: '1000',
        currency: 'BDT',
        tran_id: 'pay-1',
        success_url: 'https://s',
        fail_url: 'https://f',
        cancel_url: 'https://c',
        cus_name: 'Customer',
        cus_email: 'c@example.com',
        cus_add1: 'N/A',
        cus_city: 'Dhaka',
        cus_country: 'Bangladesh',
        cus_phone: '01700000000',
        shipping_method: 'NO',
        product_name: 'Payment',
        product_category: 'general',
        product_profile: 'general',
      });
      expect(res.status).toBe('SUCCESS');
      expect(res.sessionkey).toBe('sess_123');
      expect(res.GatewayPageURL).toContain('sess_123');
    });

    it('returns FAILED status', async () => {
      installFetchMock({
        ok: true,
        status: 200,
        body: { status: 'FAILED', failedreason: 'Invalid credentials' },
      });
      const res = await client.createSession({
        store_id: 'store-123',
        store_passwd: 'pass-123',
        total_amount: '1000',
        currency: 'BDT',
        tran_id: 'pay-1',
        success_url: 'https://s',
        fail_url: 'https://f',
        cancel_url: 'https://c',
        cus_name: 'C',
        cus_email: 'e@x.com',
        cus_add1: 'N/A',
        cus_city: 'Dhaka',
        cus_country: 'Bangladesh',
        cus_phone: '017',
        shipping_method: 'NO',
        product_name: 'P',
        product_category: 'g',
        product_profile: 'general',
      });
      expect(res.status).toBe('FAILED');
    });

    it('throws on HTTP error', async () => {
      installFetchMock({
        ok: false,
        status: 500,
        body: { failedreason: 'Server error' },
      });
      await expect(
        client.createSession({
          store_id: 'store-123',
          store_passwd: 'pass-123',
          total_amount: '1000',
          currency: 'BDT',
          tran_id: 'pay-1',
          success_url: 'https://s',
          fail_url: 'https://f',
          cancel_url: 'https://c',
          cus_name: 'C',
          cus_email: 'e@x.com',
          cus_add1: 'N/A',
          cus_city: 'Dhaka',
          cus_country: 'Bangladesh',
          cus_phone: '017',
          shipping_method: 'NO',
          product_name: 'P',
          product_category: 'g',
          product_profile: 'general',
        }),
      ).rejects.toThrow(GatewayOperationError);
    });
  });

  describe('validateTransaction()', () => {
    it('returns validation response', async () => {
      installFetchMock({
        ok: true,
        status: 200,
        body: {
          status: 'VALID',
          val_id: 'val-123',
          amount: '1000',
          currency: 'BDT',
          tran_id: 'pay-1',
          verify_sign: 'sig',
          verify_key: 'key',
        },
      });
      const res = await client.validateTransaction('val-123');
      expect(res.status).toBe('VALID');
      expect(res.val_id).toBe('val-123');
      expect(res.amount).toBe('1000');
    });

    it('returns VALIDATED status', async () => {
      installFetchMock({
        ok: true,
        status: 200,
        body: {
          status: 'VALIDATED',
          val_id: 'val-1',
          amount: '1000',
          currency: 'BDT',
          tran_id: 'p',
          verify_sign: 's',
          verify_key: 'k',
        },
      });
      const res = await client.validateTransaction('val-1');
      expect(res.status).toBe('VALIDATED');
    });

    it('throws on HTTP failure', async () => {
      installFetchMock({
        ok: false,
        status: 400,
        body: {},
      });
      await expect(client.validateTransaction('bad')).rejects.toThrow(
        GatewayOperationError,
      );
    });
  });
});
