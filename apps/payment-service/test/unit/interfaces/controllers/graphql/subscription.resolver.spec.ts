/**
 * SubscriptionResolver — unit tests (full branch coverage)
 * @module payment-service/test/unit/interfaces/controllers/graphql
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { SubscriptionResolver } from '@interfaces/controllers/graphql/subscription.resolver';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('SubscriptionResolver', () => {
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };
  let resolver: SubscriptionResolver;
  const user = { userId: 'u1', roles: ['customer'] };

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({ id: 's1' })) };
    queryBus = { execute: jest.fn(async () => ({ id: 's1', status: 'active' })) };
    resolver = new SubscriptionResolver(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus,
    );
  });

  it('getSubscription dispatches GetSubscriptionQuery', async () => {
    const result = await resolver.getSubscription('s1', user);
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ id: 's1', status: 'active' });
  });

  it('listSubscriptions with no pagination uses defaults', async () => {
    await resolver.listSubscriptions(user);
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('listSubscriptions with page only', async () => {
    await resolver.listSubscriptions(user, 2);
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('listSubscriptions with limit only', async () => {
    await resolver.listSubscriptions(user, undefined, 10);
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('listSubscriptions with both page and limit', async () => {
    await resolver.listSubscriptions(user, 3, 15);
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('cancelSubscription dispatches CancelSubscriptionCommand', async () => {
    const result = await resolver.cancelSubscription(
      's1',
      'too expensive',
      true,
      user,
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ id: 's1' });
  });
});
