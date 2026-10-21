/**
 * RecurringPaymentPrismaMapper — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { RecurringPaymentPrismaMapper } from '@infrastructure/mappers/recurring.prisma.mapper';
import { RecurringPaymentEntity } from '@domain/entities/recurring-payment.entity';

const ROW = {
  id: '77777777-7777-4777-8777-777777777777',
  paymentId: '11111111-1111-4111-8111-111111111111',
  status: 'active',
  interval: 'monthly',
  intervalCount: 1,
  amount: 500,
  currency: 'BDT',
  startAt: new Date('2025-01-15T10:00:00.000Z'),
  endAt: null,
  nextRunAt: new Date('2025-02-15T10:00:00.000Z'),
  attemptCount: 0,
  cancelledAt: null,
  failureReason: null,
  createdAt: new Date('2025-01-14T10:00:00.000Z'),
  updatedAt: new Date('2025-01-15T10:00:00.000Z'),
  deletedAt: null,
};

describe('RecurringPaymentPrismaMapper', () => {
  it('maps an active recurring', () => {
    const entity = RecurringPaymentPrismaMapper.toDomain(ROW);
    expect(entity).toBeInstanceOf(RecurringPaymentEntity);
    expect(entity.status.isActive()).toBe(true);
    expect(entity.frequency.interval).toBe('monthly');
    expect(entity.frequency.intervalCount).toBe(1);
    expect(entity.amount.amount).toBe(500);
    expect(entity.attemptCount).toBe(0);
    expect(entity.nextRunAt).toBe('2025-02-15T10:00:00.000Z');
  });

  it('maps cancelled recurring', () => {
    const entity = RecurringPaymentPrismaMapper.toDomain({
      ...ROW,
      status: 'cancelled',
      cancelledAt: new Date('2025-01-16T10:00:00.000Z'),
    });
    expect(entity.isFinal()).toBe(true);
    expect(entity.cancelledAt).toBe('2025-01-16T10:00:00.000Z');
  });

  it('round-trips via toPersistence', () => {
    const entity = RecurringPaymentPrismaMapper.toDomain(ROW);
    const data = RecurringPaymentPrismaMapper.toPersistence(entity);
    expect(data['interval']).toBe('monthly');
    expect(data['intervalCount']).toBe(1);
    expect(data['amount']).toBe(500);
    expect(data['status']).toBe('active');
  });
});
