/**
 * SubscriptionService — Unit Tests (full branch coverage)
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

jest.mock('@nestjs/common', () => ({
  Injectable: () => (target: unknown) => target,
  Inject: () => () => undefined,
  Logger: class {
    log(): void {}
    error(): void {}
    warn(): void {}
    debug(): void {}
    verbose(): void {}
  },
}));

import { SubscriptionService } from '@application/services/impl/subscription.service';
import type { SubscriptionRepository } from '@domain/repositories/subscription.repository.interface';
import { SubscriptionEntity } from '@domain/entities/subscription.entity';
import { SubscriptionIdVO } from '@domain/primitives/subscription-id.vo';
import { SubscriptionPlanVO } from '@domain/primitives/subscription-plan.vo';
import { RecurringFrequencyVO } from '@domain/primitives/recurring-frequency.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';

const USER_ID = '123e4567-e89b-42d3-a456-426614174000';
const SUB_ID = '223e4567-e89b-42d3-a456-426614174099';

function makeMockRepo() {
  return {
    save: jest.fn(),
    findByIdVO: jest.fn(),
    findByUser: jest.fn(),
    findByStatus: jest.fn(),
    findByPlan: jest.fn(),
    findPaginated: jest.fn(),
    getStats: jest.fn(),
    findExpiringPeriods: jest.fn(),
    findExpiredTrials: jest.fn(),
    findPastDue: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    softDelete: jest.fn(),
  };
}

function makeSubEntity() {
  return SubscriptionEntity.create({
    id: SubscriptionIdVO.create(SUB_ID),
    now: '2025-01-15T10:00:00.000Z',
    props: {
      userId: UserIdVO.create(USER_ID),
      plan: SubscriptionPlanVO.create('premium'),
      frequency: RecurringFrequencyVO.create('monthly', 1),
      price: PaymentAmountVO.create(500, 'BDT'),
      startedAt: '2025-01-15T10:00:00.000Z',
      currentPeriodStart: '2025-01-15T10:00:00.000Z',
      currentPeriodEnd: '2025-02-15T10:00:00.000Z',
    },
  });
}

describe('SubscriptionService', () => {
  let service: SubscriptionService;
  let mockRepo: ReturnType<typeof makeMockRepo>;

  beforeEach(() => {
    mockRepo = makeMockRepo();
    service = new SubscriptionService(mockRepo as unknown as SubscriptionRepository);
  });

  describe('create', () => {
    it('should create monthly subscription', async () => {
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.create(
        {
          plan: 'premium' as never,
          interval: 'monthly' as never,
          intervalCount: 1,
          price: 500,
          currency: 'BDT',
          method: 'card' as never,
        },
        USER_ID,
      );
      expect(result.plan).toBe('premium');
      expect(result.status).toBe('active');
    });

    it('should create yearly subscription', async () => {
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.create(
        {
          plan: 'enterprise' as never,
          interval: 'yearly' as never,
          intervalCount: 1,
          price: 50000,
          currency: 'BDT',
          method: 'card' as never,
        },
        USER_ID,
      );
      expect(result.plan).toBe('enterprise');
    });

    it('should handle weekly interval', async () => {
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.create(
        {
          plan: 'basic' as never,
          interval: 'weekly' as never,
          intervalCount: 1,
          price: 100,
          currency: 'BDT',
          method: 'card' as never,
        },
        USER_ID,
      );
      expect(result.interval).toBe('weekly');
    });
  });

  describe('upgrade', () => {
    it('should upgrade to enterprise', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeSubEntity());
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.upgrade(
        { subscriptionId: SUB_ID, newPlan: 'enterprise' as never, newPrice: 5000, currency: 'BDT' },
        USER_ID,
      );
      expect(result.plan).toBe('enterprise');
    });

    it('should throw on not found', async () => {
      mockRepo.findByIdVO.mockResolvedValue(null);
      await expect(
        service.upgrade(
          { subscriptionId: SUB_ID, newPlan: 'enterprise' as never, newPrice: 5000, currency: 'BDT' },
          USER_ID,
        ),
      ).rejects.toThrow();
    });
  });

  describe('downgrade', () => {
    it('should downgrade to basic', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeSubEntity());
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.downgrade(
        { subscriptionId: SUB_ID, newPlan: 'basic' as never, newPrice: 100, currency: 'BDT' },
        USER_ID,
      );
      expect(result.plan).toBe('basic');
    });

    it('should throw on not found', async () => {
      mockRepo.findByIdVO.mockResolvedValue(null);
      await expect(
        service.downgrade(
          { subscriptionId: SUB_ID, newPlan: 'basic' as never, newPrice: 100, currency: 'BDT' },
          USER_ID,
        ),
      ).rejects.toThrow();
    });
  });

  describe('pause', () => {
    it('should pause active subscription', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeSubEntity());
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.pause({ subscriptionId: SUB_ID }, USER_ID);
      expect(result.status).toBe('paused');
    });

    it('should throw on not found', async () => {
      mockRepo.findByIdVO.mockResolvedValue(null);
      await expect(
        service.pause({ subscriptionId: SUB_ID }, USER_ID),
      ).rejects.toThrow();
    });
  });

  describe('cancel', () => {
    it('should cancel immediately', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeSubEntity());
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.cancel(
        { subscriptionId: SUB_ID, reason: 'x', cancelAtPeriodEnd: false },
        USER_ID,
      );
      expect(result.status).toBe('cancelled');
    });

    it('should cancel at period end', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeSubEntity());
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.cancel(
        { subscriptionId: SUB_ID, reason: 'x', cancelAtPeriodEnd: true },
        USER_ID,
      );
      expect(result.cancelAtPeriodEnd).toBe(true);
    });

    it('should throw on not found', async () => {
      mockRepo.findByIdVO.mockResolvedValue(null);
      await expect(
        service.cancel(
          { subscriptionId: SUB_ID, reason: 'x', cancelAtPeriodEnd: false },
          USER_ID,
        ),
      ).rejects.toThrow();
    });
  });

  describe('getById', () => {
    it('should return DTO', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeSubEntity());
      expect((await service.getById(SUB_ID)).id).toBe(SUB_ID);
    });

    it('should throw on not found', async () => {
      mockRepo.findByIdVO.mockResolvedValue(null);
      await expect(service.getById(SUB_ID)).rejects.toThrow();
    });
  });

  describe('listByUser', () => {
    it('should return empty', async () => {
      mockRepo.findByUser.mockResolvedValue([]);
      expect(await service.listByUser(USER_ID)).toHaveLength(0);
    });

    it('should return one', async () => {
      mockRepo.findByUser.mockResolvedValue([makeSubEntity()]);
      expect(await service.listByUser(USER_ID)).toHaveLength(1);
    });
  });

  describe('list', () => {
    it('should paginate', async () => {
      mockRepo.findPaginated.mockResolvedValue({
        items: [makeSubEntity()],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      });
      const result = await service.list({ page: 1, limit: 10 });
      expect(result.items).toHaveLength(1);
    });
  });

  describe('getStats', () => {
    it('should return stats', async () => {
      mockRepo.getStats.mockResolvedValue({
        total: 20,
        active: 15,
        trialing: 3,
        cancelled: 2,
        totalMrr: 50000,
        currency: 'BDT',
        byPlan: { premium: 15, basic: 5 },
      });
      const stats = await service.getStats();
      expect(stats.total).toBe(20);
    });
  });
});
