/**
 * AamarpayWebhookVerifier — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AamarpayWebhookVerifier } from '@infrastructure/gateways/aamarpay/aamarpay.webhook';
import { AamarpayClient } from '@infrastructure/gateways/aamarpay/aamarpay.client';

jest.mock('@infrastructure/gateways/aamarpay/aamarpay.config', () => ({
  PAYMENT_AAMARPAY_CONFIG: {
    enabled: true,
    storeId: 's',
    signatureKey: 'k',
    baseUrl: 'https://aamarpay.test',
    successUrl: '',
    failUrl: '',
    cancelUrl: '',
    ipnUrl: '',
    timeoutMs: 5000,
  },
}));

function makeClientMock() {
  return {
    verifyPayment: jest.fn(),
  };
}

describe('AamarpayWebhookVerifier', () => {
  let clientMock: ReturnType<typeof makeClientMock>;
  let verifier: AamarpayWebhookVerifier;

  beforeEach(() => {
    clientMock = makeClientMock();
    verifier = new AamarpayWebhookVerifier(
      clientMock as unknown as AamarpayClient,
    );
  });

  describe('verify()', () => {
    it('returns valid for well-formed payload', () => {
      const result = verifier.verify({
        headers: {},
        payload: {
          mer_txnid: 'pay-1',
          pg_txnid: 'pg-123',
          amount: '1000',
          pay_status: 'Successful',
        },
      });
      expect(result.valid).toBe(true);
      expect(result.eventType).toBe('Successful');
      expect(result.externalId).toBe('pg-123');
      expect(result.paymentId).toBe('pay-1');
    });

    it('rejects missing mer_txnid', () => {
      const result = verifier.verify({
        headers: {},
        payload: { pay_status: 'Successful' },
      });
      expect(result.valid).toBe(false);
    });

    it('rejects missing pay_status', () => {
      const result = verifier.verify({
        headers: {},
        payload: { mer_txnid: 'p' },
      });
      expect(result.valid).toBe(false);
    });

    it('rejects non-object', () => {
      const result = verifier.verify({
        headers: {},
        payload: null as unknown as Record<string, unknown>,
      });
      expect(result.valid).toBe(false);
    });
  });

  describe('verifyWithGateway()', () => {
    it('returns true on status_code=2', async () => {
      clientMock.verifyPayment.mockResolvedValue({
        status_code: '2',
        pay_status: 'Successful',
      });
      const ok = await verifier.verifyWithGateway({
        mer_txnid: 'pay-1',
        amount: '1000',
        pay_status: 'Successful',
      });
      expect(ok).toBe(true);
    });

    it('returns true on pay_status=Success', async () => {
      clientMock.verifyPayment.mockResolvedValue({
        status_code: '99',
        pay_status: 'Success',
      });
      const ok = await verifier.verifyWithGateway({
        mer_txnid: 'pay-1',
        amount: '1000',
        pay_status: 'Success',
      });
      expect(ok).toBe(true);
    });

    it('returns false on failure', async () => {
      clientMock.verifyPayment.mockResolvedValue({
        status_code: '1',
        pay_status: 'Failed',
      });
      const ok = await verifier.verifyWithGateway({
        mer_txnid: 'pay-1',
        amount: '1000',
        pay_status: 'Failed',
      });
      expect(ok).toBe(false);
    });

    it('returns false on HTTP error', async () => {
      clientMock.verifyPayment.mockRejectedValue(new Error('boom'));
      const ok = await verifier.verifyWithGateway({
        mer_txnid: 'pay-1',
        amount: '1000',
        pay_status: 'Successful',
      });
      expect(ok).toBe(false);
    });
  });
});
