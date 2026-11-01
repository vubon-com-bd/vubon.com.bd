/**
 * SslcommerzWebhookVerifier — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { SslcommerzWebhookVerifier } from '@infrastructure/gateways/sslcommerz/sslcommerz.webhook';
import { SslcommerzClient } from '@infrastructure/gateways/sslcommerz/sslcommerz.client';

jest.mock('@infrastructure/gateways/sslcommerz/sslcommerz.config', () => ({
  PAYMENT_SSLCOMMERZ_CONFIG: {
    enabled: true,
    storeId: 's',
    storePassword: 'p',
    baseUrl: 'https://ssl.test',
    successUrl: 'https://s',
    failUrl: 'https://f',
    cancelUrl: 'https://c',
    ipnUrl: 'https://ipn',
    timeoutMs: 5000,
    sandbox: true,
  },
}));

function makeClientMock() {
  return {
    validateTransaction: jest.fn(),
  };
}

describe('SslcommerzWebhookVerifier', () => {
  let clientMock: ReturnType<typeof makeClientMock>;
  let verifier: SslcommerzWebhookVerifier;

  beforeEach(() => {
    clientMock = makeClientMock();
    verifier = new SslcommerzWebhookVerifier(
      clientMock as unknown as SslcommerzClient,
    );
  });

  describe('verify()', () => {
    it('returns valid for well-formed payload', () => {
      const result = verifier.verify({
        headers: {},
        payload: {
          tran_id: 'pay-1',
          val_id: 'val-123',
          amount: '1000',
          status: 'VALID',
        },
      });
      expect(result.valid).toBe(true);
      expect(result.eventType).toBe('VALID');
      expect(result.externalId).toBe('val-123');
      expect(result.paymentId).toBe('pay-1');
    });

    it('rejects missing tran_id', () => {
      const result = verifier.verify({
        headers: {},
        payload: { val_id: 'v', status: 'VALID' },
      });
      expect(result.valid).toBe(false);
    });

    it('rejects missing status', () => {
      const result = verifier.verify({
        headers: {},
        payload: { tran_id: 'p', val_id: 'v' },
      });
      expect(result.valid).toBe(false);
    });

    it('rejects non-object', () => {
      const result = verifier.verify({
        headers: {},
        payload: 'bad' as unknown as Record<string, unknown>,
      });
      expect(result.valid).toBe(false);
    });
  });

  describe('verifyWithGateway()', () => {
    it('returns true when status VALID', async () => {
      clientMock.validateTransaction.mockResolvedValue({
        status: 'VALID',
        val_id: 'v',
        amount: '1000',
        currency: 'BDT',
        tran_id: 'p',
        verify_sign: 's',
        verify_key: 'k',
      });
      const ok = await verifier.verifyWithGateway({
        tran_id: 'p',
        val_id: 'v',
        amount: '1000',
        status: 'VALID',
      });
      expect(ok).toBe(true);
    });

    it('returns true when status VALIDATED', async () => {
      clientMock.validateTransaction.mockResolvedValue({
        status: 'VALIDATED',
        val_id: 'v',
        amount: '1000',
        currency: 'BDT',
        tran_id: 'p',
        verify_sign: 's',
        verify_key: 'k',
      });
      const ok = await verifier.verifyWithGateway({
        tran_id: 'p',
        val_id: 'v',
        amount: '1000',
        status: 'VALIDATED',
      });
      expect(ok).toBe(true);
    });

    it('returns false when status INVALID', async () => {
      clientMock.validateTransaction.mockResolvedValue({
        status: 'INVALID_TRANSACTION',
        val_id: 'v',
        amount: '1000',
        currency: 'BDT',
        tran_id: 'p',
        verify_sign: 's',
        verify_key: 'k',
      });
      const ok = await verifier.verifyWithGateway({
        tran_id: 'p',
        val_id: 'v',
        amount: '1000',
        status: 'INVALID_TRANSACTION',
      });
      expect(ok).toBe(false);
    });

    it('returns false on HTTP error', async () => {
      clientMock.validateTransaction.mockRejectedValue(new Error('boom'));
      const ok = await verifier.verifyWithGateway({
        tran_id: 'p',
        val_id: 'v',
        amount: '1000',
        status: 'VALID',
      });
      expect(ok).toBe(false);
    });
  });
});
