/**
 * SubscriptionMapper — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { SubscriptionMapper } from '@application/mappers/subscription.mapper';
import type { SubscriptionEntity } from '@domain/entities/subscription.entity';

function makeMockEntity(): SubscriptionEntity {
  return {
    id: 'sub-1',
    userId: { value: 'user-1' },
    status: { value: 'active' },
    plan: { value: 'premium' },
    frequency: { interval: 'monthly', intervalCount: 1 },
    price: { amount: 500, currency: 'BDT' },
    startedAt: '2025-01-01T00:00:00.000Z',
    currentPeriodStart: '2025-01-01T00:00:00.000Z',
    currentPeriodEnd: '2025-02-01T00:00:00.000Z',
    trialEndsAt: undefined,
    cancelledAt: undefined,
    cancelAtPeriodEnd: false,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  } as unknown as SubscriptionEntity;
}

describe('SubscriptionMapper', () => {
  describe('toResponse', () => {
    it('should map full subscription', () => {
      const dto = SubscriptionMapper.toResponse(makeMockEntity());
      expect(dto.id).toBe('sub-1');
      expect(dto.userId).toBe('user-1');
      expect(dto.status).toBe('active');
      expect(dto.plan).toBe('premium');
      expect(dto.interval).toBe('monthly');
      expect(dto.price).toBe(500);
      expect(dto.currency).toBe('BDT');
      expect(dto.cancelAtPeriodEnd).toBe(false);
    });
  });

  describe('toSummary', () => {
    it('should map minimal fields', () => {
      const dto = SubscriptionMapper.toSummary(makeMockEntity());
      expect(dto.id).toBe('sub-1');
      expect(dto.plan).toBe('premium');
      expect(dto.price).toBe(500);
      expect(dto.currentPeriodEnd).toBe('2025-02-01T00:00:00.000Z');
    });
  });

  describe('toListResponse', () => {
    it('should paginate', () => {
      const dto = SubscriptionMapper.toListResponse([makeMockEntity()], 10, 2, 5);
      expect(dto.totalPages).toBe(2);
      expect(dto.page).toBe(2);
    });
  });
});
