/**
 * PaypalGatewayAdapter — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { PaypalGatewayAdapter } from '@infrastructure/gateways/paypal/paypal.gateway';
import { PaypalClient } from '@infrastructure/gateways/paypal/paypal.client';
import { PaypalWebhookVerifier } from '@infrastructure/gateways/paypal/paypal.webhook';
import { PaymentPrismaMapper } from '@infrastructure/mappers/payment.prisma.mapper';
import { makePrismaPaymentRow } from '@test-infra/entity-makers';
import type { PaymentEntity } from '@domain/entities/payment.entity';

jest.mock('@infrastructure/gateways/paypal/paypal.config', () => ({
  PAYMENT_PAYPAL_CONFIG: {
    enabled: true,
    clientId: 'c',
    clientSecret: 's',
    webhookId: 'wh',
    baseUrl: 'https://pp.test',
    timeoutMs: 5000,
    brandName: 'Vubon',
    landingPage: 'LOGIN',
    returnUrl: 'https://r',
    cancelUrl: 'https://c',
    tokenCacheTtlSeconds: 3000,
  },
}));

function makeClientMock() {
  return {
    createOrder: jest.fn(),
    captureOrder: jest.fn(),
    getOrder: jest.fn(),
    refundCapture: jest.fn(),
    verifyWebhook: jest.fn(),
  };
}

function makeWebhookMock() {
  return {
    verify: jest.fn().mockReturnValue({ valid: true }),
    verifySignature: jest.fn().mockResolvedValue(true),
  };
}

describe('PaypalGatewayAdapter', () => {
  let gateway: PaypalGatewayAdapter;
  let clientMock: ReturnType<typeof makeClientMock>;
  let webhookMock: ReturnType<typeof makeWebhookMock>;
  let payment: PaymentEntity;

  beforeEach(() => {
    clientMock = makeClientMock();
    webhookMock = makeWebhookMock();
    gateway = new PaypalGatewayAdapter(
      clientMock as unknown as PaypalClient,
      webhookMock as unknown as PaypalWebhookVerifier,
    );
    payment = PaymentPrismaMapper.toDomain(
      makePrismaPaymentRow({
        method: 'card',
        methodType: 'online',
        provider: 'paypal',
        providerEnv: 'sandbox',
        amount: 1000,
        currency: 'USD',
      }),
    );
  });

  it('has gatewayId = "paypal"', () => {
    expect(gateway.gatewayId).toBe('paypal');
  });

  it('isEnabled returns true', () => {
    expect(gateway.isEnabled()).toBe(true);
  });

  describe('initiate()', () => {
    it('returns approve link redirect', async () => {
      clientMock.createOrder.mockResolvedValue({
        id: 'ORDER_123',
        status: 'CREATED',
        links: [
          { href: 'https://pp.test/checkout/ORDER_123', rel: 'approve', method: 'GET' },
        ],
      });
      const result = await gateway.initiate({ payment, returnUrl: 'https://r' });
      expect(result.success).toBe(true);
      expect(result.gatewayPaymentId).toBe('ORDER_123');
      expect(result.redirectUrl).toContain('ORDER_123');
    });

    it('handles VOIDED order', async () => {
      clientMock.createOrder.mockResolvedValue({
        id: 'ORDER_1',
        status: 'VOIDED',
        links: [],
      });
      const result = await gateway.initiate({ payment });
      expect(result.success).toBe(false);
    });

    it('wraps errors', async () => {
      clientMock.createOrder.mockRejectedValue(new Error('boom'));
      const result = await gateway.initiate({ payment });
      expect(result.success).toBe(false);
      expect(result.error).toContain('boom');
    });
  });

  describe('verify()', () => {
    it('verified when APPROVED', async () => {
      clientMock.getOrder.mockResolvedValue({
        id: 'ORDER_123',
        status: 'APPROVED',
        links: [],
        purchase_units: [{ amount: { currency_code: 'USD', value: '1000.00' } }],
      });
      const result = await gateway.verify({
        payment,
        callbackPayload: { token: 'ORDER_123' },
      });
      expect(result.verified).toBe(true);
      expect(result.amount).toBe(1000);
      expect(result.currency).toBe('USD');
    });

    it('verified when COMPLETED', async () => {
      clientMock.getOrder.mockResolvedValue({
        id: 'ORDER_1',
        status: 'COMPLETED',
        links: [],
        purchase_units: [{ amount: { currency_code: 'USD', value: '10.00' } }],
      });
      const result = await gateway.verify({
        payment,
        callbackPayload: { token: 'ORDER_1' },
      });
      expect(result.verified).toBe(true);
    });

    it('unverified when CREATED', async () => {
      clientMock.getOrder.mockResolvedValue({
        id: 'ORDER_1',
        status: 'CREATED',
        links: [],
        purchase_units: [],
      });
      const result = await gateway.verify({ payment, callbackPayload: {} });
      expect(result.verified).toBe(false);
    });

    it('fails without token', async () => {
      const result = await gateway.verify({ payment, callbackPayload: {} });
      expect(result.verified).toBe(false);
      expect(result.error).toContain('token');
    });
  });

  describe('capture()', () => {
    it('calls captureOrder', async () => {
      clientMock.captureOrder.mockResolvedValue({
        id: 'ORDER_1',
        status: 'COMPLETED',
      });
      const result = await gateway.capture({ payment, amount: 500 });
      expect(result.success).toBe(true);
      expect(result.capturedAt).toBeDefined();
    });

    it('fails when not COMPLETED', async () => {
      clientMock.captureOrder.mockResolvedValue({
        id: 'ORDER_1',
        status: 'DECLINED',
      });
      const result = await gateway.capture({ payment, amount: 500 });
      expect(result.success).toBe(false);
    });

    it('rejects over-amount', async () => {
      await expect(gateway.capture({ payment, amount: 99999 })).rejects.toThrow();
    });
  });

  describe('refund()', () => {
    it('returns refund', async () => {
      clientMock.refundCapture.mockResolvedValue({
        id: 'REFUND_1',
        status: 'COMPLETED',
      });
      const result = await gateway.refund({ payment, amount: 500 });
      expect(result.success).toBe(true);
      expect(result.gatewayRefundId).toBe('REFUND_1');
    });

    it('fails on failed refund', async () => {
      clientMock.refundCapture.mockResolvedValue({
        id: 'REFUND_1',
        status: 'FAILED',
      });
      const result = await gateway.refund({ payment, amount: 500 });
      expect(result.success).toBe(false);
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
    it('delegates to verifier', () => {
      const result = gateway.verifyWebhook({ headers: {}, payload: {} });
      expect(result.valid).toBe(true);
      expect(webhookMock.verify).toHaveBeenCalled();
    });
  });
});
