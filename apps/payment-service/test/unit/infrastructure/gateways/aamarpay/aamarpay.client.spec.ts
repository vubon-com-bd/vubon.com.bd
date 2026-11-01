/**
 * AamarpayClient — Unit Tests
 */
import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { AamarpayClient } from '@infrastructure/gateways/aamarpay/aamarpay.client';
import { installFetchMock } from '@test-infra/http-mock';
import { GatewayOperationError } from '@infrastructure/gateways/base/gateway.errors';

jest.mock('@infrastructure/gateways/aamarpay/aamarpay.config', () => ({
  PAYMENT_AAMARPAY_CONFIG: {
    enabled: true,
    storeId: 'store-1',
    signatureKey: 'sig-1',
    baseUrl: 'https://sandbox.aamarpay.test',
    successUrl: 'https://s',
    failUrl: 'https://f',
    cancelUrl: 'https://c',
    ipnUrl: 'https://ipn',
    timeoutMs: 5000,
  },
}));

describe('AamarpayClient', () => {
  let client: AamarpayClient;
  let originalFetch: typeof globalThis.fetch;

  beforeEach(() => {
    client = new AamarpayClient();
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  describe('createPayment()', () => {
    it('returns payment_url on success', async () => {
      installFetchMock({
        ok: true,
        status: 200,
        body: {
          result: 'true',
          payment_url: 'https://aamarpay.test/pay/pp_123',
        },
      });
      const res = await client.createPayment({
        store_id: 'store-1',
        signature_key: 'sig-1',
        tran_id: 'pay-1',
        amount: '1000',
        currency: 'BDT',
        desc: 'Payment',
        cus_name: 'C',
        cus_email: 'e@x.com',
        cus_phone: '017',
        cus_add1: 'N/A',
        cus_city: 'Dhaka',
        cus_country: 'Bangladesh',
        success_url: 'https://s',
        fail_url: 'https://f',
        cancel_url: 'https://c',
        type: 'json',
      });
      expect(res.result).toBe('true');
      expect(res.payment_url).toContain('pp_123');
    });

    it('returns error on failure', async () => {
      installFetchMock({
        ok: true,
        status: 200,
        body: { result: 'false', error: 'Invalid store' },
      });
      const res = await client.createPayment({
        store_id: 'store-1',
        signature_key: 'sig-1',
        tran_id: 'pay-1',
        amount: '1000',
        currency: 'BDT',
        desc: 'P',
        cus_name: 'C',
        cus_email: 'e@x',
        cus_phone: '017',
        cus_add1: 'N',
        cus_city: 'D',
        cus_country: 'B',
        success_url: 's',
        fail_url: 'f',
        cancel_url: 'c',
        type: 'json',
      });
      expect(res.result).toBe('false');
      expect(res.error).toContain('Invalid');
    });

    it('throws on HTTP failure', async () => {
      installFetchMock({
        ok: false,
        status: 500,
        body: { message: 'Server error' },
      });
      await expect(
        client.createPayment({
          store_id: 's',
          signature_key: 'k',
          tran_id: 'p',
          amount: '1',
          currency: 'BDT',
          desc: 'd',
          cus_name: 'c',
          cus_email: 'e',
          cus_phone: 'p',
          cus_add1: 'a',
          cus_city: 'c',
          cus_country: 'b',
          success_url: 's',
          fail_url: 'f',
          cancel_url: 'c',
          type: 'json',
        }),
      ).rejects.toThrow(GatewayOperationError);
    });
  });

  describe('verifyPayment()', () => {
    it('returns status_code 2 on success', async () => {
      installFetchMock({
        ok: true,
        status: 200,
        body: {
          status_code: '2',
          pay_status: 'Successful',
          amount: '1000',
          currency: 'BDT',
          mer_txnid: 'pay-1',
        },
      });
      const res = await client.verifyPayment('pay-1');
      expect(res.status_code).toBe('2');
      expect(res.pay_status).toBe('Successful');
    });

    it('throws on HTTP failure', async () => {
      installFetchMock({
        ok: false,
        status: 400,
        body: {},
      });
      await expect(client.verifyPayment('p')).rejects.toThrow(GatewayOperationError);
    });
  });
});
