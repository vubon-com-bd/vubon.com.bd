/**
 * SubscriptionController — unit tests
 * @module payment-service/test/unit/interfaces/controllers/rest
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { SubscriptionController } from '@interfaces/controllers/rest/subscription.controller';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('SubscriptionController', () => {
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };
  let controller: SubscriptionController;
  const user = { userId: 'u1', roles: ['customer'] };

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({ id: 's1' })) };
    queryBus = { execute: jest.fn(async () => ({ items: [], total: 0 })) };
    controller = new SubscriptionController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus,
    );
  });

  it('create dispatches CreateSubscriptionCommand', async () => {
    await controller.create(
      {
        plan: 'premium',
        interval: 'monthly',
        intervalCount: 1,
        price: 999,
        currency: 'BDT',
        method: 'card',
      },
      user,
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('upgrade dispatches UpgradeSubscriptionCommand', async () => {
    await controller.upgrade(
      's1',
      { newPlan: 'enterprise', newPrice: 1999, currency: 'BDT' },
      user,
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('downgrade dispatches DowngradeSubscriptionCommand', async () => {
    await controller.downgrade(
      's1',
      { newPlan: 'basic', newPrice: 499, currency: 'BDT' },
      user,
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('pause dispatches PauseSubscriptionCommand', async () => {
    await controller.pause('s1', {}, user);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('cancel dispatches CancelSubscriptionCommand', async () => {
    await controller.cancel(
      's1',
      { reason: 'too expensive', cancelAtPeriodEnd: true },
      user,
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('list dispatches ListSubscriptionsQuery', async () => {
    await controller.list({ page: 1, limit: 20 });
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('getById dispatches GetSubscriptionQuery', async () => {
    await controller.getById('s1');
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });
});
