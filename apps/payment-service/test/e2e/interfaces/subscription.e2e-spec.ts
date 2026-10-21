/**
 * Subscription E2E — create → upgrade → pause → cancel
 * @module payment-service/test/e2e/interfaces
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { SubscriptionController } from '@interfaces/controllers/rest/subscription.controller';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';

const VALID_UUID = 'a1b2c3d4-e5f6-4789-a012-3456789abcde';

describe('Subscription Lifecycle E2E', () => {
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };
  let ctrl: SubscriptionController;
  const user = { userId: VALID_UUID, roles: ['customer'] };

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({ id: VALID_UUID })) };
    queryBus = { execute: jest.fn(async () => ({ id: VALID_UUID })) };
    ctrl = new SubscriptionController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus,
    );
  });

  it('SCENARIO: happy path — create → upgrade → cancel', async () => {
    // 1. Create
    await ctrl.create(
      {
        plan: 'basic',
        interval: 'monthly',
        intervalCount: 1,
        price: 499,
        currency: 'BDT',
        method: 'card',
        gateway: 'stripe',
      },
      user,
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(1);

    // 2. Upgrade
    await ctrl.upgrade(
      VALID_UUID,
      { newPlan: 'premium', newPrice: 999, currency: 'BDT' },
      user,
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(2);

    // 3. Cancel
    await ctrl.cancel(
      VALID_UUID,
      { reason: 'no longer needed', cancelAtPeriodEnd: true },
      user,
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(3);
  });

  it('SCENARIO: pause → resume → downgrade', async () => {
    await ctrl.pause(VALID_UUID, {}, user);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);

    await ctrl.downgrade(
      VALID_UUID,
      { newPlan: 'basic', newPrice: 499, currency: 'BDT', effectiveAt: 'period_end' },
      user,
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(2);
  });

  it('SCENARIO: list with filters', async () => {
    await ctrl.list({
      page: 1,
      limit: 20,
      status: 'active',
      plan: 'premium',
    });
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('SCENARIO: get by id', async () => {
    await ctrl.getById(VALID_UUID);
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('SCENARIO: create with trial days', async () => {
    await ctrl.create(
      {
        plan: 'premium',
        interval: 'monthly',
        intervalCount: 1,
        price: 999,
        currency: 'BDT',
        method: 'card',
        trialDays: 14,
      },
      user,
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('SCENARIO: cancel immediately', async () => {
    await ctrl.cancel(
      VALID_UUID,
      { reason: 'unhappy', cancelAtPeriodEnd: false },
      user,
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });
});
