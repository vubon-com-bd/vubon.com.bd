import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({ QueryHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { ListSubscriptionsHandler } from '@application/queries/subscription/list-subscriptions.handler';
import { ListSubscriptionsQuery } from '@application/queries/subscription/list-subscriptions.query';
import type { ISubscriptionService } from '@application/services/interfaces/subscription.service.interface';

function makeMockService(): ISubscriptionService {
  return {
    create: jest.fn(), upgrade: jest.fn(), downgrade: jest.fn(),
    pause: jest.fn(), cancel: jest.fn(), getById: jest.fn(),
    listByUser: jest.fn(), list: jest.fn(), getStats: jest.fn(),
  };
}

describe('ListSubscriptionsHandler', () => {
  let handler: ListSubscriptionsHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new ListSubscriptionsHandler(service);
  });

  it('should delegate to service.list', async () => {
    (service.list as jest.Mock).mockResolvedValue({ items: [], total: 0 });
    const query = new ListSubscriptionsQuery(1, 10, { status: 'active' }, 'createdAt', 'desc');
    await handler.execute(query);
    expect(service.list).toHaveBeenCalledWith({
      page: 1, limit: 10, filter: { status: 'active' },
      sortBy: 'createdAt', sortDir: 'desc',
    });
  });

  it('should have correct type', () => {
    expect(new ListSubscriptionsQuery(1, 10).type).toBe('payment.subscription.list');
  });
});
