/**
 * AamarpayGatewayAdapter — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AamarpayGatewayAdapter } from '@infrastructure/gateways/aamarpay/aamarpay.gateway';
import { AamarpayClient } from '@infrastructure/gateways/aamarpay/aamarpay.client';
import { AamarpayWebhookVerifier } from '@infrastructure/gateways/aamarpay/aamarpay.webhook';
import { PaymentPrismaMapper } from '@infrastructure/mappers/payment.prisma.mapper';
import { makePrismaPaymentRow } from '@test-infra/entity-makers';
import type { PaymentEntity } from '@domain/entities/payment.entity';

jest.mock('@infrastructure/gateways/aamarpay/aamarpay.config', () => ({
  PAYMENT_AAMARPAY_CONFIG: {
    enabled: true,
    storeId: 'store-1',
    signatureKey: 'sig-1',
    baseUrl: 'https://aamarpay.test',
    successUrl: 'https://s',
    failUrl: 'https://f',
    cancelUrl: 'https://c',
    ipnUrl: 'https://ipn',
    timeoutMs: 5000,
  },
}));

function makeClientMock() {
  return {
    createPayment: jest.fn(),
    verifyPayment: jest.fn(),
  };
}

function makeWebhookMock() {
  return {
    verify: jest.fn().mockReturnValue({ valid: true }),
    verifyWithGateway: jest.fn().mockResolvedValue(true),
  };
}

describe('AamarpayGatewayAdapter', () => {
  let gateway: AamarpayGatewayAdapter;
  let clientMock: ReturnType<typeof makeClientMock>;
  let webhookMock: ReturnType<typeof makeWebhookMock>;
  let payment: PaymentEntity;

  beforeEach(() => {
    clientMock = makeClientMock();
    webhookMock = makeWebhookMock();
    gateway = new AamarpayGatewayAdapter(
      clientMock as unknown as AamarpayClient,
      webhookMock as unknown as AamarpayWebhookVerifier,
    );
    payment = PaymentPrismaMapper.toDomain(
      makePrismaPaymentRow({
        method: 'card',
        methodType: 'online',
        provider: 'aamarpay',
        providerEnv: 'sandbox',
        amount: 1000,
      }),
    );
  });

  it('has gatewayId = "aamarpay"', () => {
    expect(gateway.gatewayId).toBe('aamarpay');
  });

  it('isEnabled returns true', () => {
    expect(gateway.isEnabled()).toBe(true);
  });

  describe('initiate()', () => {
    it('returns success with payment_url', async () => {
      clientMock.createPayment.mockResolvedValue({
        result: 'true',
        payment_url: 'https://aamarpay.test/pay/pp_123',
      });
      const result = await gateway.initiate({ payment });
      expect(result.success).toBe(true);
      expect(result.redirectUrl).toContain('pp_123');
    });

    it('fails on result=false', async () => {
      clientMock.createPayment.mockResolvedValue({
        result: 'false',
        error: 'Invalid store',
      });
      const result = await gateway.initiate({ payment });
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid');
    });

    it('wraps errors', async () => {
      clientMock.createPayment.mockRejectedValue(new Error('boom'));
      const result = await gateway.initiate({ payment });
      expect(result.success).toBe(false);
      expect(result.error).toContain('boom');
    });
  });

  describe('verify()', () => {
    it('verified when status_code=2', async () => {
      clientMock.verifyPayment.mockResolvedValue({
        status_code: '2',
        pay_status: 'Successful',
        amount: '1000',
        currency: 'BDT',
        mer_txnid: 'pay-1',
      });
      const result = await gateway.verify({
        payment,
        callbackPayload: { mer_txnid: 'pay-1' },
      });
      expect(result.verified).toBe(true);
      expect(result.amount).toBe(1000);
    });

    it('verified when pay_status=Success', async () => {
      clientMock.verifyPayment.mockResolvedValue({
        status_code: '99',
        pay_status: 'Success',
        amount: '1000',
        currency: 'BDT',
      });
      const result = await gateway.verify({
        payment,
        callbackPayload: { mer_txnid: 'pay-1' },
      });
      expect(result.verified).toBe(true);
    });

    it('unverified when status_code=1', async () => {
      clientMock.verifyPayment.mockResolvedValue({
        status_code: '1',
        pay_status: 'Pending',
        amount: '1000',
        currency: 'BDT',
      });
      const result = await gateway.verify({
        payment,
        callbackPayload: { mer_txnid: 'pay-1' },
      });
      expect(result.verified).toBe(false);
    });
  });

  describe('capture()', () => {
    it('returns success (auto-capture)', async () => {
      const result = await gateway.capture({ payment, amount: 1000 });
      expect(result.success).toBe(true);
      expect(result.capturedAt).toBeDefined();
    });
  });

  describe('refund()', () => {
    it('returns success', async () => {
      const result = await gateway.refund({ payment, amount: 500 });
      expect(result.success).toBe(true);
      expect(result.gatewayRefundId).toMatch(/^aamarpay_rf_/);
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
