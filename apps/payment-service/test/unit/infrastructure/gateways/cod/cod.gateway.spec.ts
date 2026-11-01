/**
 * CodGatewayAdapter — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { CodGatewayAdapter } from '@infrastructure/gateways/cod/cod.gateway';
import { PaymentPrismaMapper } from '@infrastructure/mappers/payment.prisma.mapper';
import { makePrismaPaymentRow } from '@test-infra/entity-makers';
import type { PaymentEntity } from '@domain/entities/payment.entity';

describe('CodGatewayAdapter', () => {
  let gateway: CodGatewayAdapter;
  let payment: PaymentEntity;

  beforeEach(() => {
    gateway = new CodGatewayAdapter();
    payment = PaymentPrismaMapper.toDomain(
      makePrismaPaymentRow({
        method: 'cash_on_delivery',
        methodType: 'offline',
        provider: null,
        providerEnv: null,
        amount: 500,
      }),
    );
  });

  it('has gatewayId = "cod"', () => {
    expect(gateway.gatewayId).toBe('cod');
  });

  it('isEnabled returns true (no config required)', () => {
    expect(gateway.isEnabled()).toBe(true);
  });

  describe('initiate()', () => {
    it('returns success with gateway ref, no redirect', async () => {
      const result = await gateway.initiate({ payment });
      expect(result.success).toBe(true);
      expect(result.gatewayPaymentId).toMatch(/^cod_/);
      expect(result.redirectUrl).toBeUndefined();
      expect(result.rawResponse).toEqual(
        expect.objectContaining({ gateway: 'cod' }),
      );
    });
  });

  describe('verify()', () => {
    it('always returns verified with BDT', async () => {
      const result = await gateway.verify({
        payment,
        callbackPayload: {},
      });
      expect(result.verified).toBe(true);
      expect(result.currency).toBe('BDT');
      expect(result.status).toBe('pending');
    });
  });

  describe('capture()', () => {
    it('succeeds with amount', async () => {
      const result = await gateway.capture({ payment, amount: 500 });
      expect(result.success).toBe(true);
      expect(result.capturedAt).toBeDefined();
      expect(result.rawResponse).toEqual(
        expect.objectContaining({ gateway: 'cod' }),
      );
    });

    it('gatewayPaymentId is undefined when payment has no gatewayReference', async () => {
      const result = await gateway.capture({ payment, amount: 500 });
      expect(result.gatewayPaymentId).toBeUndefined();
    });

    it('throws when amount > payment amount', async () => {
      await expect(gateway.capture({ payment, amount: 9999 })).rejects.toThrow(
        /exceeds payment amount/,
      );
    });

    it('throws when amount <= 0', async () => {
      await expect(gateway.capture({ payment, amount: 0 })).rejects.toThrow(
        /Invalid capture amount/,
      );
    });
  });

  describe('refund()', () => {
    it('returns notSupported', async () => {
      const result = await gateway.refund({ payment, amount: 100 });
      expect(result.success).toBe(false);
      expect(result.error).toContain('cod');
      expect(result.error).toContain('refund');
    });
  });

  describe('cancel()', () => {
    it('returns success', async () => {
      const result = await gateway.cancel(payment.id);
      expect(result.success).toBe(true);
    });
  });

  describe('verifyWebhook()', () => {
    it('returns valid with cod.noop event', () => {
      const result = gateway.verifyWebhook({ headers: {}, payload: {} });
      expect(result.valid).toBe(true);
      expect(result.eventType).toBe('cod.noop');
    });
  });
});
