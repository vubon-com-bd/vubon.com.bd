/**
 * RocketGatewayAdapter — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { RocketGatewayAdapter } from '@infrastructure/gateways/rocket/rocket.gateway';
import { RocketClient } from '@infrastructure/gateways/rocket/rocket.client';
import { RocketWebhookVerifier } from '@infrastructure/gateways/rocket/rocket.webhook';
import { PaymentPrismaMapper } from '@infrastructure/mappers/payment.prisma.mapper';
import { makePrismaPaymentRow } from '@test-infra/entity-makers';
import type { PaymentEntity } from '@domain/entities/payment.entity';

jest.mock('@infrastructure/gateways/rocket/rocket.config', () => ({
  PAYMENT_ROCKET_CONFIG: {
    enabled: true,
    merchantId: 'test-merchant',
    apiKey: 'test-key',
    baseUrl: 'https://sandbox.rocket.test',
    callbackUrl: 'https://cb',
    timeoutMs: 5000,
    returnUrl: 'https://r',
    cancelUrl: 'https://c',
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
    verify: jest.fn().mockReturnValue({ valid: true, eventType: 'Success' }),
  };
}

describe('RocketGatewayAdapter', () => {
  let gateway: RocketGatewayAdapter;
  let clientMock: ReturnType<typeof makeClientMock>;
  let webhookMock: ReturnType<typeof makeWebhookMock>;
  let payment: PaymentEntity;

  beforeEach(() => {
    clientMock = makeClientMock();
    webhookMock = makeWebhookMock();
    gateway = new RocketGatewayAdapter(
      clientMock as unknown as RocketClient,
      webhookMock as unknown as RocketWebhookVerifier,
    );
    payment = PaymentPrismaMapper.toDomain(
      makePrismaPaymentRow({
        method: 'mobile_banking',
        methodType: 'online',
        provider: 'rocket',
        providerEnv: 'sandbox',
        amount: 1000,
      }),
    );
  });

  it('has gatewayId = "rocket"', () => {
    expect(gateway.gatewayId).toBe('rocket');
  });

  it('isEnabled returns true', () => {
    expect(gateway.isEnabled()).toBe(true);
  });

  describe('initiate()', () => {
    it('calls client.createPayment', async () => {
      clientMock.createPayment.mockResolvedValue({
        success: true,
        rocketPaymentId: 'rp_123',
        redirectUrl: 'https://rocket.test/checkout/rp_123',
      });
      const result = await gateway.initiate({ payment, returnUrl: 'https://return' });
      expect(result.success).toBe(true);
      expect(result.gatewayPaymentId).toBe('rp_123');
      expect(result.redirectUrl).toContain('rp_123');
    });

    it('fails when client fails', async () => {
      clientMock.createPayment.mockResolvedValue({
        success: false,
        statusMessage: 'Invalid',
      });
      const result = await gateway.initiate({ payment });
      expect(result.success).toBe(false);
    });

    it('wraps thrown errors', async () => {
      clientMock.createPayment.mockRejectedValue(new Error('Network down'));
      const result = await gateway.initiate({ payment });
      expect(result.success).toBe(false);
      expect(result.error).toContain('Network down');
    });
  });

  describe('verify()', () => {
    it('verifies via client.verifyPayment', async () => {
      clientMock.verifyPayment.mockResolvedValue({
        success: true,
        status: 'Success',
        amount: '1000',
        currency: 'BDT',
      });
      const result = await gateway.verify({
        payment,
        callbackPayload: { rocketPaymentId: 'rp_123' },
      });
      expect(result.verified).toBe(true);
      expect(result.status).toBe('Success');
    });

    it('fails when status not Success', async () => {
      clientMock.verifyPayment.mockResolvedValue({
        success: true,
        status: 'Pending',
        amount: '1000',
        currency: 'BDT',
      });
      const result = await gateway.verify({
        payment,
        callbackPayload: { rocketPaymentId: 'rp_123' },
      });
      expect(result.verified).toBe(false);
    });

    it('fails without rocketPaymentId', async () => {
      const result = await gateway.verify({ payment, callbackPayload: {} });
      expect(result.verified).toBe(false);
      expect(result.error).toContain('rocketPaymentId');
    });
  });

  describe('capture()', () => {
    it('returns success', async () => {
      const result = await gateway.capture({ payment, amount: 1000 });
      expect(result.success).toBe(true);
      expect(result.capturedAt).toBeDefined();
    });

    it('rejects over-amount', async () => {
      await expect(gateway.capture({ payment, amount: 99999 })).rejects.toThrow();
    });
  });

  describe('refund()', () => {
    it('returns success with gatewayRefundId', async () => {
      const result = await gateway.refund({ payment, amount: 500 });
      expect(result.success).toBe(true);
      expect(result.gatewayRefundId).toMatch(/^rocket_rf_/);
    });
  });

  describe('cancel()', () => {
    it('returns notSupported', async () => {
      const result = await gateway.cancel(payment.id);
      expect(result.success).toBe(false);
    });
  });

  describe('verifyWebhook()', () => {
    it('delegates to webhook verifier', () => {
      const result = gateway.verifyWebhook({ headers: {}, payload: {} });
      expect(result.valid).toBe(true);
      expect(webhookMock.verify).toHaveBeenCalled();
    });
  });
});
