/**
 * SslcommerzGatewayAdapter — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { SslcommerzGatewayAdapter } from '@infrastructure/gateways/sslcommerz/sslcommerz.gateway';
import { SslcommerzClient } from '@infrastructure/gateways/sslcommerz/sslcommerz.client';
import { SslcommerzWebhookVerifier } from '@infrastructure/gateways/sslcommerz/sslcommerz.webhook';
import { PaymentPrismaMapper } from '@infrastructure/mappers/payment.prisma.mapper';
import { makePrismaPaymentRow } from '@test-infra/entity-makers';
import type { PaymentEntity } from '@domain/entities/payment.entity';

jest.mock('@infrastructure/gateways/sslcommerz/sslcommerz.config', () => ({
  PAYMENT_SSLCOMMERZ_CONFIG: {
    enabled: true,
    storeId: 'store-123',
    storePassword: 'pass-123',
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
    createSession: jest.fn(),
    validateTransaction: jest.fn(),
  };
}

function makeWebhookMock() {
  return {
    verify: jest.fn().mockReturnValue({ valid: true, eventType: 'VALID' }),
    verifyWithGateway: jest.fn().mockResolvedValue(true),
  };
}

describe('SslcommerzGatewayAdapter', () => {
  let gateway: SslcommerzGatewayAdapter;
  let clientMock: ReturnType<typeof makeClientMock>;
  let webhookMock: ReturnType<typeof makeWebhookMock>;
  let payment: PaymentEntity;

  beforeEach(() => {
    clientMock = makeClientMock();
    webhookMock = makeWebhookMock();
    gateway = new SslcommerzGatewayAdapter(
      clientMock as unknown as SslcommerzClient,
      webhookMock as unknown as SslcommerzWebhookVerifier,
    );
    payment = PaymentPrismaMapper.toDomain(
      makePrismaPaymentRow({
        method: 'card',
        methodType: 'online',
        provider: 'sslcommerz',
        providerEnv: 'sandbox',
        amount: 1000,
      }),
    );
  });

  it('has gatewayId = "sslcommerz"', () => {
    expect(gateway.gatewayId).toBe('sslcommerz');
  });

  it('isEnabled returns true', () => {
    expect(gateway.isEnabled()).toBe(true);
  });

  describe('initiate()', () => {
    it('returns success with GatewayPageURL', async () => {
      clientMock.createSession.mockResolvedValue({
        status: 'SUCCESS',
        sessionkey: 'sess_123',
        GatewayPageURL: 'https://ssl.test/pay/sess_123',
      });
      const result = await gateway.initiate({ payment });
      expect(result.success).toBe(true);
      expect(result.gatewayPaymentId).toBe('sess_123');
      expect(result.redirectUrl).toContain('sess_123');
    });

    it('fails on non-SUCCESS', async () => {
      clientMock.createSession.mockResolvedValue({
        status: 'FAILED',
        failedreason: 'Invalid',
      });
      const result = await gateway.initiate({ payment });
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid');
    });

    it('wraps errors', async () => {
      clientMock.createSession.mockRejectedValue(new Error('Network down'));
      const result = await gateway.initiate({ payment });
      expect(result.success).toBe(false);
      expect(result.error).toContain('Network down');
    });
  });

  describe('verify()', () => {
    it('verified when VALID', async () => {
      clientMock.validateTransaction.mockResolvedValue({
        status: 'VALID',
        val_id: 'v',
        amount: '1000',
        currency: 'BDT',
        tran_id: 'pay-1',
      });
      const result = await gateway.verify({
        payment,
        callbackPayload: { val_id: 'v' },
      });
      expect(result.verified).toBe(true);
      expect(result.amount).toBe(1000);
    });

    it('verified when VALIDATED', async () => {
      clientMock.validateTransaction.mockResolvedValue({
        status: 'VALIDATED',
        val_id: 'v',
        amount: '1000',
        currency: 'BDT',
        tran_id: 'pay-1',
      });
      const result = await gateway.verify({
        payment,
        callbackPayload: { val_id: 'v' },
      });
      expect(result.verified).toBe(true);
    });

    it('unverified when INVALID_TRANSACTION', async () => {
      clientMock.validateTransaction.mockResolvedValue({
        status: 'INVALID_TRANSACTION',
        val_id: 'v',
        amount: '1000',
        currency: 'BDT',
        tran_id: 'p',
      });
      const result = await gateway.verify({
        payment,
        callbackPayload: { val_id: 'v' },
      });
      expect(result.verified).toBe(false);
    });

    it('fails without val_id', async () => {
      const result = await gateway.verify({ payment, callbackPayload: {} });
      expect(result.verified).toBe(false);
      expect(result.error).toContain('val_id');
    });
  });

  describe('capture()', () => {
    it('auto-captures (SSLCommerz)', async () => {
      const result = await gateway.capture({ payment, amount: 1000 });
      expect(result.success).toBe(true);
      expect(result.capturedAt).toBeDefined();
    });
  });

  describe('refund()', () => {
    it('returns success', async () => {
      const result = await gateway.refund({ payment, amount: 500 });
      expect(result.success).toBe(true);
      expect(result.gatewayRefundId).toMatch(/^ssl_rf_/);
    });
  });

  describe('cancel()', () => {
    it('returns notSupported', async () => {
      const result = await gateway.cancel(payment.id);
      expect(result.success).toBe(false);
    });
  });

  describe('verifyWebhook()', () => {
    it('delegates to verifier', () => {
      const result = gateway.verifyWebhook({ headers: {}, payload: {} });
      expect(result.valid).toBe(true);
      expect(webhookMock.verify).toHaveBeenCalled();
    });
  });
});
