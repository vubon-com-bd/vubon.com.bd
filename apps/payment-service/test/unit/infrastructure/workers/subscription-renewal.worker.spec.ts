/**
 * SubscriptionRenewalWorker — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { SubscriptionRenewalWorker } from '@infrastructure/workers/subscription-renewal.worker';
import { SubscriptionPrismaMapper } from '@infrastructure/mappers/subscription.prisma.mapper';
import { makeMockQueueService } from '@test-infra/queue-mock';

const SUB_ID = '88888888-8888-4888-8888-888888888888';

const SUB_ROW = {
  id: SUB_ID,
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

function makeSubRepoMock() {
  return {
    findByIdVO: jest.fn(),
    save: jest.fn(),
  };
}

describe('SubscriptionRenewalWorker', () => {
  let worker: SubscriptionRenewalWorker;
  let queue: ReturnType<typeof makeMockQueueService>;
  let repo: ReturnType<typeof makeSubRepoMock>;

  beforeEach(() => {
    queue = makeMockQueueService();
    repo = makeSubRepoMock();
    worker = new SubscriptionRenewalWorker(queue as never, repo as never);
  });

  it('registers worker on init', () => {
    worker.onModuleInit();
    expect(queue.registerWorker).toHaveBeenCalled();
  });

  it('skips when subscription not found', async () => {
    repo.findByIdVO.mockResolvedValue(null);
    const result = await (worker as unknown as {
      handle: (p: { subscriptionId: string }) => Promise<unknown>;
    }).handle({ subscriptionId: SUB_ID });
    expect(result).toEqual({ skipped: true });
  });

  it('skips when not active', async () => {
    const sub = SubscriptionPrismaMapper.toDomain({
      ...SUB_ROW,
      status: 'cancelled',
      cancelledAt: new Date(),
    });
    repo.findByIdVO.mockResolvedValue(sub);
    const result = await (worker as unknown as {
      handle: (p: { subscriptionId: string }) => Promise<unknown>;
    }).handle({ subscriptionId: SUB_ID });
    expect(result).toEqual(
      expect.objectContaining({ skipped: true }),
    );
  });

  it('renews active subscription', async () => {
    const sub = SubscriptionPrismaMapper.toDomain(SUB_ROW);
    repo.findByIdVO.mockResolvedValue(sub);
    repo.save.mockResolvedValue(sub);

    const result = await (worker as unknown as {
      handle: (p: { subscriptionId: string }) => Promise<unknown>;
    }).handle({ subscriptionId: SUB_ID });

    expect(result).toEqual(
      expect.objectContaining({ renewed: true }),
    );
    expect(repo.save).toHaveBeenCalled();
    expect(sub.currentPeriodEnd).not.toBe('2025-02-15T10:00:00.000Z');
  });
});
