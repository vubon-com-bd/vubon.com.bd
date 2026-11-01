/**
 * SubscriptionPrismaMapper — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { SubscriptionPrismaMapper } from '@infrastructure/mappers/subscription.prisma.mapper';
import { SubscriptionEntity } from '@domain/entities/subscription.entity';

const ROW = {
  id: '88888888-8888-4888-8888-888888888888',
  userId: '33333333-3333-4333-8333-333333333333',
  status: 'active',
  plan: 'premium',
  interval: 'monthly',
  intervalCount: 1,
  price: 500,
  currency: 'BDT',
  startedAt: new Date('2025-01-15T10:00:00.000Z'),
  currentPeriodStart: new Date('2025-01-15T10:00:00.000Z'),
  currentPeriodEnd: new Date('2025-02-15T10:00:00.000Z'),
  trialEndsAt: null,
  cancelledAt: null,
  cancelAtPeriodEnd: false,
  createdAt: new Date('2025-01-14T10:00:00.000Z'),
  updatedAt: new Date('2025-01-15T10:00:00.000Z'),
  deletedAt: null,
};

describe('SubscriptionPrismaMapper', () => {
  it('maps an active subscription', () => {
    const entity = SubscriptionPrismaMapper.toDomain(ROW);
    expect(entity).toBeInstanceOf(SubscriptionEntity);
    expect(entity.isActive()).toBe(true);
    expect(entity.plan.value).toBe('premium');
    expect(entity.frequency.interval).toBe('monthly');
    expect(entity.price.amount).toBe(500);
    expect(entity.userId.value).toBe(ROW.userId);
    expect(entity.currentPeriodEnd).toBe('2025-02-15T10:00:00.000Z');
  });

  it('maps a trialing subscription with trialEndsAt', () => {
    const entity = SubscriptionPrismaMapper.toDomain({
      ...ROW,
      status: 'trialing',
      trialEndsAt: new Date('2025-01-22T10:00:00.000Z'),
    });
    expect(entity.isInTrial()).toBe(true);
    expect(entity.trialEndsAt).toBe('2025-01-22T10:00:00.000Z');
  });

  it('maps a cancelled subscription', () => {
    const entity = SubscriptionPrismaMapper.toDomain({
      ...ROW,
      status: 'cancelled',
      cancelledAt: new Date('2025-01-16T10:00:00.000Z'),
    });
    expect(entity.cancelledAt).toBe('2025-01-16T10:00:00.000Z');
  });

  it('round-trips via toPersistence', () => {
    const entity = SubscriptionPrismaMapper.toDomain(ROW);
    const data = SubscriptionPrismaMapper.toPersistence(entity);
    expect(data['plan']).toBe('premium');
    expect(data['interval']).toBe('monthly');
    expect(data['price']).toBe(500);
    expect(data['cancelAtPeriodEnd']).toBe(false);
  });
});
