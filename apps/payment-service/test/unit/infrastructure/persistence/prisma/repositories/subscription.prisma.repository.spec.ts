/**
 * SubscriptionPrismaRepository — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { SubscriptionPrismaRepository } from '@infrastructure/repos/subscription.prisma.repository';
import { SubscriptionPrismaMapper } from '@infrastructure/mappers/subscription.prisma.mapper';
import { makeMockPrismaService, type MockPrismaService } from '@test-infra/prisma-mock';

const ROW = {
  id: 'sub-1',
  userId: 'user-1',
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

describe('SubscriptionPrismaRepository', () => {
  let prisma: MockPrismaService;
  let repo: SubscriptionPrismaRepository;
  let delegate: ReturnType<MockPrismaService['__delegate']>;

  beforeEach(() => {
    prisma = makeMockPrismaService();
    repo = new SubscriptionPrismaRepository(prisma as never);
    delegate = prisma.__delegate('subscription');
  });

  it('findById returns entity', async () => {
    delegate.findFirst.mockResolvedValue(ROW);
    const entity = await repo.findById('sub-1');
    expect(entity?.id).toBe('sub-1');
    expect(entity?.plan.value).toBe('premium');
  });

  it('findByUser filters userId', async () => {
    delegate.findMany.mockResolvedValue([ROW]);
    const list = await repo.findByUser('user-1');
    expect(list).toHaveLength(1);
  });

  it('findByStatus filters status', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findByStatus('active');
    expect(delegate.findMany).toHaveBeenCalled();
  });

  it('findByPlan filters plan', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findByPlan('premium');
    const args = delegate.findMany.mock.calls[0][0] as { where: Record<string, unknown> };
    expect(args.where['plan']).toBe('premium');
  });

  it('getStats aggregates active/trialing/cancelled + MRR', async () => {
    delegate.findMany.mockResolvedValue([
      { status: 'active', plan: 'premium', price: 500, interval: 'monthly', intervalCount: 1, currency: 'BDT' },
      { status: 'active', plan: 'premium', price: 500, interval: 'monthly', intervalCount: 1, currency: 'BDT' },
      { status: 'trialing', plan: 'basic', price: 100, interval: 'monthly', intervalCount: 1, currency: 'BDT' },
      { status: 'cancelled', plan: 'basic', price: 100, interval: 'monthly', intervalCount: 1, currency: 'BDT' },
    ]);
    const stats = await repo.getStats();
    expect(stats.total).toBe(4);
    expect(stats.active).toBe(2);
    expect(stats.trialing).toBe(1);
    expect(stats.cancelled).toBe(1);
    expect(stats.totalMrr).toBe(1200);
    expect(stats.byPlan['premium']).toBe(2);
    expect(stats.byPlan['basic']).toBe(2);
  });

  it('findExpiringPeriods filters by currentPeriodEnd cutoff', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findExpiringPeriods(7);
    expect(delegate.findMany).toHaveBeenCalled();
  });

  it('findExpiredTrials filters trialing with trialEndsAt cutoff', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findExpiredTrials();
    const args = delegate.findMany.mock.calls[0][0] as { where: Record<string, unknown> };
    expect(args.where['status']).toBe('trialing');
  });

  it('findPastDue filters past_due', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findPastDue(3);
    const args = delegate.findMany.mock.calls[0][0] as { where: Record<string, unknown> };
    expect(args.where['status']).toBe('past_due');
  });
});
