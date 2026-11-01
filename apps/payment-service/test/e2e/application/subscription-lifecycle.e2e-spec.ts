/**
 * Subscription Lifecycle — E2E
 * @module payment-service/test/e2e/application
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { SubscriptionService } from '@application/services/impl/subscription.service';
import { CreateSubscriptionHandler } from '@application/commands/subscription/create-subscription.handler';
import { PauseSubscriptionHandler } from '@application/commands/subscription/pause-subscription.handler';
import { CancelSubscriptionHandler } from '@application/commands/subscription/cancel-subscription.handler';
import { CreateSubscriptionCommand } from '@application/commands/subscription/create-subscription.command';
import { PauseSubscriptionCommand } from '@application/commands/subscription/pause-subscription.command';
import { CancelSubscriptionCommand } from '@application/commands/subscription/cancel-subscription.command';
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
    save: jest.fn(), findByIdVO: jest.fn(), findByUser: jest.fn(),
    findByStatus: jest.fn(), findByPlan: jest.fn(), findPaginated: jest.fn(),
    getStats: jest.fn(), findExpiringPeriods: jest.fn(),
    findExpiredTrials: jest.fn(), findPastDue: jest.fn(),
    findById: jest.fn(), findAll: jest.fn(), delete: jest.fn(),
    exists: jest.fn(), softDelete: jest.fn(),
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

describe('E2E: Subscription Lifecycle', () => {
  let repo: ReturnType<typeof makeMockRepo>;
  let service: SubscriptionService;

  beforeEach(() => {
    repo = makeMockRepo();
    service = new SubscriptionService(repo as unknown as SubscriptionRepository);
  });

  it('should create → pause → cancel subscription', async () => {
    // Step 1: create
    repo.save.mockImplementation(async (e: unknown) => e);
    const createHandler = new CreateSubscriptionHandler(service);
    const created = await createHandler.execute(
      new CreateSubscriptionCommand(
        {
          plan: 'premium' as never,
          interval: 'monthly' as never,
          intervalCount: 1,
          price: 500,
          currency: 'BDT',
          method: 'card' as never,
        },
        USER_ID,
      ),
    );
    expect(created.status).toBe('active');

    // Step 2: pause
    repo.findByIdVO.mockResolvedValue(makeSubEntity());
    const pauseHandler = new PauseSubscriptionHandler(service);
    const paused = await pauseHandler.execute(
      new PauseSubscriptionCommand({ subscriptionId: SUB_ID }, USER_ID),
    );
    expect(paused.status).toBe('paused');

    // Step 3: cancel
    repo.findByIdVO.mockResolvedValue(makeSubEntity());
    const cancelHandler = new CancelSubscriptionHandler(service);
    const cancelled = await cancelHandler.execute(
      new CancelSubscriptionCommand(
        { subscriptionId: SUB_ID, reason: 'customer request', cancelAtPeriodEnd: false },
        USER_ID,
      ),
    );
    expect(cancelled.status).toBe('cancelled');
  });

  it('should reject pause for non-existent subscription', async () => {
    repo.findByIdVO.mockResolvedValue(null);
    const handler = new PauseSubscriptionHandler(service);
    await expect(
      handler.execute(new PauseSubscriptionCommand({ subscriptionId: SUB_ID }, USER_ID)),
    ).rejects.toThrow();
  });
});
