/**
 * NagadGatewayAdapter — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { NagadGatewayAdapter } from '@infrastructure/gateways/nagad/nagad.gateway';
import { NagadClient } from '@infrastructure/gateways/nagad/nagad.client';
import { NagadWebhookVerifier } from '@infrastructure/gateways/nagad/nagad.webhook';
import { PaymentPrismaMapper } from '@infrastructure/mappers/payment.prisma.mapper';
import { makePrismaPaymentRow } from '@test-infra/entity-makers';
import type { PaymentEntity } from '@domain/entities/payment.entity';

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

function makeClientMock() {
  return {
    initialize: jest.fn(),
    complete: jest.fn(),
  };
}

function makeWebhookMock() {
  return {
    verify: jest.fn().mockReturnValue({ valid: true, eventType: 'Success' }),
  };
}

describe('NagadGatewayAdapter', () => {
  let gateway: NagadGatewayAdapter;
  let clientMock: ReturnType<typeof makeClientMock>;
  let webhookMock: ReturnType<typeof makeWebhookMock>;
  let payment: PaymentEntity;

  beforeEach(() => {
    clientMock = makeClientMock();
    webhookMock = makeWebhookMock();
    gateway = new NagadGatewayAdapter(
      clientMock as unknown as NagadClient,
      webhookMock as unknown as NagadWebhookVerifier,
    );
    payment = PaymentPrismaMapper.toDomain(
      makePrismaPaymentRow({
        method: 'mobile_banking',
        methodType: 'online',
        provider: 'nagad',
        providerEnv: 'sandbox',
        amount: 1000,
      }),
    );
  });

  it('has gatewayId = "nagad"', () => {
    expect(gateway.gatewayId).toBe('nagad');
  });

  it('isEnabled returns true', () => {
    expect(gateway.isEnabled()).toBe(true);
  });

  describe('initiate()', () => {
    it('returns success with redirect URL', async () => {
      const result = await gateway.initiate({ payment });
      expect(result.success).toBe(true);
      expect(result.gatewayPaymentId).toMatch(/^nagad_/);
      expect(result.redirectUrl).toContain('nagad');
    });
  });

  describe('verify()', () => {
    it('verified when status Success', async () => {
      const result = await gateway.verify({
        payment,
        callbackPayload: { orderId: payment.id, status: 'Success', amount: '1000' },
      });
      expect(result.verified).toBe(true);
      expect(result.currency).toBe('BDT');
    });

    it('unverified when status not Success', async () => {
      const result = await gateway.verify({
        payment,
        callbackPayload: { orderId: payment.id, status: 'Failed' },
      });
      expect(result.verified).toBe(false);
    });

    it('verified when status COMPLETED', async () => {
      const result = await gateway.verify({
        payment,
        callbackPayload: { orderId: payment.id, status: 'COMPLETED', amount: '1000' },
      });
      expect(result.verified).toBe(true);
    });
  });

  describe('capture()', () => {
    it('returns success', async () => {
      const result = await gateway.capture({ payment, amount: 1000 });
      expect(result.success).toBe(true);
      expect(result.capturedAt).toBeDefined();
    });

    it('throws when amount exceeds', async () => {
      await expect(gateway.capture({ payment, amount: 99999 })).rejects.toThrow(
        /exceeds/,
      );
    });
  });

  describe('refund()', () => {
    it('returns success with refundId', async () => {
      const result = await gateway.refund({ payment, amount: 500 });
      expect(result.success).toBe(true);
      expect(result.gatewayRefundId).toMatch(/^nagad_rf_/);
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
