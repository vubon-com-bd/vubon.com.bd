/**
 * PaymentPrismaMapper — Unit Tests
 * @module payment-service/test/unit/infrastructure/persistence/prisma/mappers
 */
import { describe, it, expect } from '@jest/globals';
import {
  PaymentPrismaMapper,
  toNum,
  toIso,
} from '@infrastructure/mappers/payment.prisma.mapper';
import {
  makePrismaPaymentRow,
  TEST_UUIDS,
  TEST_DATES,
} from '@test-infra/entity-makers';
import { PaymentEntity } from '@domain/entities/payment.entity';

describe('PaymentPrismaMapper', () => {
  describe('toDomain()', () => {
    it('maps a full pending row', () => {
      const row = makePrismaPaymentRow();
      const entity = PaymentPrismaMapper.toDomain(row);

      expect(entity).toBeInstanceOf(PaymentEntity);
      expect(entity.id).toBe(TEST_UUIDS.PAYMENT_ID);
      expect(entity.orderId.value).toBe(TEST_UUIDS.ORDER_ID);
      expect(entity.userId.value).toBe(TEST_UUIDS.USER_ID);
      expect(entity.status.isPending()).toBe(true);
      expect(entity.amount.amount).toBe(1000);
      expect(entity.currency.value).toBe('BDT');
      expect(entity.provider?.provider).toBe('stripe');
      expect(entity.provider?.env).toBe('sandbox');
    });

    it('maps a captured row with capturedAt', () => {
      const row = makePrismaPaymentRow({
        status: 'captured',
        capturedAt: new Date(TEST_DATES.NOW),
        gatewayReference: 'pi_123',
      });
      const entity = PaymentPrismaMapper.toDomain(row);

      expect(entity.isCaptured()).toBe(true);
      expect(entity.capturedAt).toBe(TEST_DATES.NOW);
      expect(entity.gatewayReference?.value).toBe('pi_123');
    });

    it('maps a paid row with paidAt', () => {
      const row = makePrismaPaymentRow({
        status: 'paid',
        paidAt: new Date(TEST_DATES.NOW),
        capturedAt: new Date(TEST_DATES.NOW),
      });
      const entity = PaymentPrismaMapper.toDomain(row);
      expect(entity.isPaid()).toBe(true);
      expect(entity.paidAt).toBe(TEST_DATES.NOW);
    });

    it('handles null provider', () => {
      const row = makePrismaPaymentRow({
        provider: null,
        providerEnv: null,
        method: 'cash_on_delivery',
        methodType: 'offline',
      });
      const entity = PaymentPrismaMapper.toDomain(row);
      expect(entity.provider).toBeUndefined();
    });

    it('handles decimal-as-object amount (Prisma Decimal)', () => {
      const row = makePrismaPaymentRow({
        amount: { toNumber: () => 1500.5 } as unknown,
      });
      const entity = PaymentPrismaMapper.toDomain(row);
      expect(entity.amount.amount).toBe(1500.5);
    });

    it('handles string amount', () => {
      const row = makePrismaPaymentRow({ amount: '1000.25' as unknown });
      const entity = PaymentPrismaMapper.toDomain(row);
      expect(entity.amount.amount).toBe(1000.25);
    });

    it('maps refundedAmount when present', () => {
      const row = makePrismaPaymentRow({
        status: 'partially_refunded',
        refundedAmount: 200,
      });
      const entity = PaymentPrismaMapper.toDomain(row);
      expect(entity.refundedAmount).toBe(200);
    });

    it('maps failureReason when failed', () => {
      const row = makePrismaPaymentRow({
        status: 'failed',
        failureReason: 'card_declined',
        failureCode: 'ERR_CARD',
      });
      const entity = PaymentPrismaMapper.toDomain(row);
      expect(entity.failureReason).toBe('card_declined');
      expect(entity.failureCode).toBe('ERR_CARD');
    });
  });

  describe('toPersistence()', () => {
    it('round-trips a pending payment', () => {
      const row = makePrismaPaymentRow();
      const entity = PaymentPrismaMapper.toDomain(row);
      const data = PaymentPrismaMapper.toPersistence(entity);

      expect(data['id']).toBe(TEST_UUIDS.PAYMENT_ID);
      expect(data['orderId']).toBe(TEST_UUIDS.ORDER_ID);
      expect(data['userId']).toBe(TEST_UUIDS.USER_ID);
      expect(data['status']).toBe('pending');
      expect(data['method']).toBe('card');
      expect(data['methodType']).toBe('online');
      expect(data['provider']).toBe('stripe');
      expect(data['providerEnv']).toBe('sandbox');
      expect(data['amount']).toBe(1000);
      expect(data['currency']).toBe('BDT');
    });

    it('emits nulls for optional fields', () => {
      const row = makePrismaPaymentRow();
      const entity = PaymentPrismaMapper.toDomain(row);
      const data = PaymentPrismaMapper.toPersistence(entity);

      expect(data['gatewayReference']).toBeNull();
      expect(data['authorizedAt']).toBeNull();
      expect(data['capturedAt']).toBeNull();
      expect(data['paidAt']).toBeNull();
      expect(data['failureReason']).toBeNull();
    });

    it('serialises dates as Date objects', () => {
      const row = makePrismaPaymentRow({
        status: 'captured',
        capturedAt: new Date(TEST_DATES.NOW),
      });
      const entity = PaymentPrismaMapper.toDomain(row);
      const data = PaymentPrismaMapper.toPersistence(entity);
      expect(data['capturedAt']).toBeInstanceOf(Date);
    });
  });

  describe('helper: toNum()', () => {
    it('handles number', () => expect(toNum(100)).toBe(100));
    it('handles string', () => expect(toNum('100.5')).toBe(100.5));
    it('handles null', () => expect(toNum(null)).toBe(0));
    it('handles object with toNumber', () => {
      expect(toNum({ toNumber: () => 42 })).toBe(42);
    });
  });

  describe('helper: toIso()', () => {
    it('returns undefined for null', () => expect(toIso(null)).toBeUndefined());
    it('returns undefined for undefined', () => expect(toIso(undefined)).toBeUndefined());
    it('converts Date to ISO string', () => {
      const d = new Date('2025-01-15T10:00:00.000Z');
      expect(toIso(d)).toBe('2025-01-15T10:00:00.000Z');
    });
  });
});
