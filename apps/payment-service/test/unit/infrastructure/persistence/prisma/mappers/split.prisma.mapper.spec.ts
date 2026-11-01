/**
 * SplitPaymentPrismaMapper — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { SplitPaymentPrismaMapper } from '@infrastructure/mappers/split.prisma.mapper';
import { SplitPaymentEntity } from '@domain/entities/split-payment.entity';

const ROW = {
  id: '66666666-6666-4666-8666-666666666666',
  paymentId: '11111111-1111-4111-8111-111111111111',
  type: 'percentage',
  receivers: [
    { receiverId: 'vendor-1', amount: 700, percentage: 70 },
    { receiverId: 'vendor-2', amount: 300, percentage: 30 },
  ],
  totalAmount: 1000,
  currency: 'BDT',
  executedAt: null,
  failureReason: null,
  createdAt: new Date('2025-01-14T10:00:00.000Z'),
  updatedAt: new Date('2025-01-15T10:00:00.000Z'),
  deletedAt: null,
};

describe('SplitPaymentPrismaMapper', () => {
  it('maps a percentage split', () => {
    const entity = SplitPaymentPrismaMapper.toDomain(ROW);
    expect(entity).toBeInstanceOf(SplitPaymentEntity);
    expect(entity.type.isPercentage()).toBe(true);
    expect(entity.receiverCount()).toBe(2);
    expect(entity.totalAmount).toBe(1000);
    expect(entity.currency).toBe('BDT');
    expect(entity.receivers[0].receiverId).toBe('vendor-1');
    expect(entity.receivers[0].amount.amount).toBe(700);
    expect(entity.receivers[0].percentage?.value).toBe(70);
  });

  it('handles empty receivers gracefully', () => {
    expect(() =>
      SplitPaymentPrismaMapper.toDomain({ ...ROW, receivers: [] }),
    ).toThrow(/at least 2 receivers/);
  });

  it('round-trips via toPersistence', () => {
    const entity = SplitPaymentPrismaMapper.toDomain(ROW);
    const data = SplitPaymentPrismaMapper.toPersistence(entity);
    expect(data['type']).toBe('percentage');
    expect(Array.isArray(data['receivers'])).toBe(true);
    expect(data['totalAmount']).toBe(1000);
  });
});
