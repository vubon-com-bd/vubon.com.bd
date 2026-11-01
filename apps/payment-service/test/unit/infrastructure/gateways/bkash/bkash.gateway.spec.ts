/**
 * BkashGatewayAdapter — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { BkashGatewayAdapter } from '@infrastructure/gateways/bkash/bkash.gateway';
import { BkashClient } from '@infrastructure/gateways/bkash/bkash.client';
import { BkashWebhookVerifier } from '@infrastructure/gateways/bkash/bkash.webhook';
import { PaymentPrismaMapper } from '@infrastructure/mappers/payment.prisma.mapper';
import { makePrismaPaymentRow } from '@test-infra/entity-makers';
import type { PaymentEntity } from '@domain/entities/payment.entity';

// ─── Mock config ────────────────────────
jest.mock('@infrastructure/gateways/bkash/bkash.config', () => ({
  PAYMENT_BKASH_CONFIG: {
    enabled: true,
    appKey: 'test-app-key',
    appSecret: 'test-secret',
    username: 'test-user',
    password: 'test-pass',
    baseUrl: 'https://sandbox.bkash.test',
    callbackUrl: 'https://cb',
    timeoutMs: 5000,
    tokenCacheTtlSeconds: 3300,
    merchantShortCode: '',
    intent: 'sale',
  },
}));

function makeClientMock() {
  return {
    authenticate: jest.fn(),
    createPayment: jest.fn(),
    executePayment: jest.fn(),
    queryPayment: jest.fn(),
    refund: jest.fn(),
  };
}

function makeWebhookMock() {
  return {
    verify: jest.fn(),
    verifySignature: jest.fn(),
  };
}

describe('BkashGatewayAdapter', () => {
  let gateway: BkashGatewayAdapter;
  let clientMock: ReturnType<typeof makeClientMock>;
  let webhookMock: ReturnType<typeof makeWebhookMock>;
  let payment: PaymentEntity;

  beforeEach(() => {
    clientMock = makeClientMock();
    webhookMock = makeWebhookMock();
    gateway = new BkashGatewayAdapter(
      clientMock as unknown as BkashClient,
      webhookMock as unknown as BkashWebhookVerifier,
    );
    payment = PaymentPrismaMapper.toDomain(
      makePrismaPaymentRow({
        method: 'mobile_banking',
        methodType: 'online',
        provider: 'bkash',
        providerEnv: 'sandbox',
        amount: 1000,
      }),
    );
  });

  it('has gatewayId = "bkash"', () => {
    expect(gateway.gatewayId).toBe('bkash');
  });

  it('isEnabled returns true when config set', () => {
    expect(gateway.isEnabled()).toBe(true);
  });

  describe('initiate()', () => {
    it('calls client.createPayment and returns redirect', async () => {
      clientMock.createPayment.mockResolvedValue({
        paymentID: 'pi_123',
        bkashURL: 'https://bkash.test/checkout/pi_123',
        statusCode: '0000',
      });
      const result = await gateway.initiate({
        payment,
        returnUrl: 'https://return',
      });
      expect(result.success).toBe(true);
      expect(result.gatewayPaymentId).toBe('pi_123');
      expect(result.redirectUrl).toContain('pi_123');
    });

    it('returns failure when statusCode not 0000', async () => {
      clientMock.createPayment.mockResolvedValue({
        paymentID: 'pi_123',
        bkashURL: '',
        statusCode: '9999',
        statusMessage: 'Internal error',
      });
      const result = await gateway.initiate({ payment });
      expect(result.success).toBe(false);
      expect(result.error).toContain('Internal error');
    });

    it('wraps errors via wrapError', async () => {
      clientMock.createPayment.mockRejectedValue(new Error('Network down'));
      const result = await gateway.initiate({ payment });
      expect(result.success).toBe(false);
      expect(result.error).toContain('Network down');
    });
  });

  describe('verify()', () => {
    it('returns verified when status Completed', async () => {
      clientMock.queryPayment.mockResolvedValue({
        paymentID: 'pi_123',
        transactionStatus: 'Completed',
        amount: '1000',
        currency: 'BDT',
        statusCode: '0000',
      });
      const result = await gateway.verify({
        payment,
        callbackPayload: { paymentID: 'pi_123' },
      });
      expect(result.verified).toBe(true);
      expect(result.status).toBe('Completed');
      expect(result.amount).toBe(1000);
    });

    it('returns unverified when status not Completed', async () => {
      clientMock.queryPayment.mockResolvedValue({
        paymentID: 'pi_123',
        transactionStatus: 'Initiated',
        amount: '1000',
        currency: 'BDT',
        statusCode: '0000',
      });
      const result = await gateway.verify({
        payment,
        callbackPayload: { paymentID: 'pi_123' },
      });
      expect(result.verified).toBe(false);
    });

    it('fails without paymentID', async () => {
      const result = await gateway.verify({ payment, callbackPayload: {} });
      expect(result.verified).toBe(false);
      expect(result.error).toContain('paymentID');
    });
  });

  describe('capture()', () => {
    it('calls executePayment and returns captured', async () => {
      clientMock.executePayment.mockResolvedValue({
        paymentID: 'pi_123',
        transactionStatus: 'Completed',
        paymentExecuteTime: '2025-01-15T10:00:00.000Z',
        statusCode: '0000',
      });
      const result = await gateway.capture({ payment, amount: 1000 });
      expect(result.success).toBe(true);
      expect(result.capturedAt).toBeDefined();
    });

    it('fails on non-Completed status', async () => {
      clientMock.executePayment.mockResolvedValue({
        paymentID: 'pi_123',
        transactionStatus: 'Failed',
        paymentExecuteTime: '2025-01-15T10:00:00.000Z',
        statusCode: '2001',
      });
      const result = await gateway.capture({ payment, amount: 1000 });
      expect(result.success).toBe(false);
    });

    it('rejects over-amount capture', async () => {
      await expect(gateway.capture({ payment, amount: 99999 })).rejects.toThrow(
        /exceeds/,
      );
    });
  });

  describe('refund()', () => {
    it('calls client.refund and returns refundTrxID', async () => {
      clientMock.refund.mockResolvedValue({
        refundTrxID: 'RF_999',
        transactionStatus: 'Completed',
        statusCode: '0000',
      });
      const result = await gateway.refund({ payment, amount: 500 });
      expect(result.success).toBe(true);
      expect(result.gatewayRefundId).toBe('RF_999');
    });

    it('fails on non-0000 statusCode', async () => {
      clientMock.refund.mockResolvedValue({
        refundTrxID: '',
        statusCode: '9999',
        statusMessage: 'Refund failed',
      });
      const result = await gateway.refund({ payment, amount: 500 });
      expect(result.success).toBe(false);
      expect(result.error).toContain('Refund failed');
    });
  });

  describe('cancel()', () => {
    it('returns notSupported', async () => {
      const result = await gateway.cancel(payment.id);
      expect(result.success).toBe(false);
      expect(result.error).toContain('cancel');
    });
  });

  describe('verifyWebhook()', () => {
    it('delegates to webhook verifier', () => {
      webhookMock.verify.mockReturnValue({
        valid: true,
        eventType: 'Completed',
      });
      const result = gateway.verifyWebhook({ headers: {}, payload: {} });
      expect(result.valid).toBe(true);
      expect(webhookMock.verify).toHaveBeenCalled();
    });
  });
});
