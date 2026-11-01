/**
 * StripeGatewayAdapter — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { StripeGatewayAdapter } from '@infrastructure/gateways/stripe/stripe.gateway';
import { StripeClient } from '@infrastructure/gateways/stripe/stripe.client';
import { StripeWebhookVerifier } from '@infrastructure/gateways/stripe/stripe.webhook';
import { PaymentPrismaMapper } from '@infrastructure/mappers/payment.prisma.mapper';
import { makePrismaPaymentRow } from '@test-infra/entity-makers';
import type { PaymentEntity } from '@domain/entities/payment.entity';

jest.mock('@infrastructure/gateways/stripe/stripe.config', () => ({
  PAYMENT_STRIPE_CONFIG: {
    enabled: true,
    secretKey: 'sk_test',
    publishableKey: 'pk_test',
    webhookSecret: 'whsec_test',
    apiVersion: '2024-10-28.acacia',
    timeoutMs: 5000,
    maxRetries: 3,
    captureMethod: 'automatic',
    returnUrl: 'https://r',
    successUrl: 'https://s',
    cancelUrl: 'https://c',
  },
}));

function makeClientMock() {
  return {
    createPaymentIntent: jest.fn(),
    capturePaymentIntent: jest.fn(),
    retrievePaymentIntent: jest.fn(),
    cancelPaymentIntent: jest.fn(),
    createRefund: jest.fn(),
  };
}

function makeWebhookMock() {
  return {
    verify: jest.fn().mockReturnValue({ valid: true, eventType: 'payment_intent.succeeded' }),
    verifySignature: jest.fn().mockResolvedValue(true),
  };
}

describe('StripeGatewayAdapter', () => {
  let gateway: StripeGatewayAdapter;
  let clientMock: ReturnType<typeof makeClientMock>;
  let webhookMock: ReturnType<typeof makeWebhookMock>;
  let payment: PaymentEntity;

  beforeEach(() => {
    clientMock = makeClientMock();
    webhookMock = makeWebhookMock();
    gateway = new StripeGatewayAdapter(
      clientMock as unknown as StripeClient,
      webhookMock as unknown as StripeWebhookVerifier,
    );
    payment = PaymentPrismaMapper.toDomain(
      makePrismaPaymentRow({
        method: 'card',
        methodType: 'online',
        provider: 'stripe',
        providerEnv: 'sandbox',
        amount: 1000,
        currency: 'BDT',
      }),
    );
  });

  it('has gatewayId = "stripe"', () => {
    expect(gateway.gatewayId).toBe('stripe');
  });

  it('isEnabled returns true', () => {
    expect(gateway.isEnabled()).toBe(true);
  });

  describe('initiate()', () => {
    it('returns redirect with client_secret', async () => {
      clientMock.createPaymentIntent.mockResolvedValue({
        id: 'pi_123',
        status: 'requires_payment_method',
        client_secret: 'pi_123_secret',
      });
      const result = await gateway.initiate({ payment, returnUrl: 'https://r' });
      expect(result.success).toBe(true);
      expect(result.gatewayPaymentId).toBe('pi_123');
      expect(result.redirectUrl).toContain('client_secret');
    });

    it('uses redirect_to_url if next_action present', async () => {
      clientMock.createPaymentIntent.mockResolvedValue({
        id: 'pi_456',
        status: 'requires_action',
        next_action: {
          type: 'redirect_to_url',
          redirect_to_url: { url: 'https://stripe.test/3ds/pi_456' },
        },
      });
      const result = await gateway.initiate({ payment });
      expect(result.redirectUrl).toBe('https://stripe.test/3ds/pi_456');
    });

    it('fails on canceled intent', async () => {
      clientMock.createPaymentIntent.mockResolvedValue({
        id: 'pi_789',
        status: 'canceled',
      });
      const result = await gateway.initiate({ payment });
      expect(result.success).toBe(false);
    });

    it('wraps errors', async () => {
      clientMock.createPaymentIntent.mockRejectedValue(new Error('boom'));
      const result = await gateway.initiate({ payment });
      expect(result.success).toBe(false);
      expect(result.error).toContain('boom');
    });
  });

  describe('verify()', () => {
    it('verified when status succeeded', async () => {
      clientMock.retrievePaymentIntent.mockResolvedValue({
        id: 'pi_123',
        status: 'succeeded',
        amount: 100000,
        currency: 'bdt',
      });
      const result = await gateway.verify({
        payment,
        callbackPayload: { payment_intent: 'pi_123' },
      });
      expect(result.verified).toBe(true);
      expect(result.amount).toBe(1000);
      expect(result.currency).toBe('BDT');
    });

    it('verified when requires_capture', async () => {
      clientMock.retrievePaymentIntent.mockResolvedValue({
        id: 'pi_123',
        status: 'requires_capture',
        amount: 100000,
        currency: 'bdt',
      });
      const result = await gateway.verify({
        payment,
        callbackPayload: { payment_intent: 'pi_123' },
      });
      expect(result.verified).toBe(true);
    });

    it('unverified when status pending', async () => {
      clientMock.retrievePaymentIntent.mockResolvedValue({
        id: 'pi_123',
        status: 'processing',
        amount: 100000,
        currency: 'bdt',
      });
      const result = await gateway.verify({ payment, callbackPayload: {} });
      expect(result.verified).toBe(false);
    });

    it('fails without intent id', async () => {
      const result = await gateway.verify({ payment, callbackPayload: {} });
      expect(result.verified).toBe(false);
      expect(result.error).toContain('payment_intent');
    });
  });

  describe('capture()', () => {
    it('calls capturePaymentIntent', async () => {
      clientMock.capturePaymentIntent.mockResolvedValue({
        id: 'pi_123',
        status: 'succeeded',
      });
      const result = await gateway.capture({ payment, amount: 1000 });
      expect(result.success).toBe(true);
      expect(result.capturedAt).toBeDefined();
    });

    it('rejects over-amount', async () => {
      await expect(gateway.capture({ payment, amount: 99999 })).rejects.toThrow();
    });
  });

  describe('refund()', () => {
    it('returns refund', async () => {
      clientMock.createRefund.mockResolvedValue({
        id: 're_123',
        status: 'succeeded',
      });
      const result = await gateway.refund({ payment, amount: 500 });
      expect(result.success).toBe(true);
      expect(result.gatewayRefundId).toBe('re_123');
    });

    it('fails on declined refund', async () => {
      clientMock.createRefund.mockResolvedValue({
        id: 're_456',
        status: 'failed',
      });
      const result = await gateway.refund({ payment, amount: 500 });
      expect(result.success).toBe(false);
    });
  });

  describe('cancel()', () => {
    it('cancels intent', async () => {
      clientMock.cancelPaymentIntent.mockResolvedValue({
        id: 'pi_123',
        status: 'canceled',
      });
      const result = await gateway.cancel('pi_123');
      expect(result.success).toBe(true);
    });

    it('fails when not canceled', async () => {
      clientMock.cancelPaymentIntent.mockResolvedValue({
        id: 'pi_123',
        status: 'succeeded',
      });
      const result = await gateway.cancel('pi_123');
      expect(result.success).toBe(false);
    });

    it('wraps errors', async () => {
      clientMock.cancelPaymentIntent.mockRejectedValue(new Error('boom'));
      const result = await gateway.cancel('pi_123');
      expect(result.success).toBe(false);
      expect(result.error).toContain('boom');
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
