import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({ QueryHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { GetSubscriptionHandler } from '@application/queries/subscription/get-subscription.handler';
import { GetSubscriptionQuery } from '@application/queries/subscription/get-subscription.query';
import type { ISubscriptionService } from '@application/services/interfaces/subscription.service.interface';

const SUB_ID = '223e4567-e89b-42d3-a456-426614174001';

function makeMockService(): ISubscriptionService {
  return {
    create: jest.fn(), upgrade: jest.fn(), downgrade: jest.fn(),
    pause: jest.fn(), cancel: jest.fn(), getById: jest.fn(),
    listByUser: jest.fn(), list: jest.fn(), getStats: jest.fn(),
  };
}

describe('GetSubscriptionHandler', () => {
  let handler: GetSubscriptionHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new GetSubscriptionHandler(service);
  });

  it('should delegate to service.getById', async () => {
    (service.getById as jest.Mock).mockResolvedValue({ id: SUB_ID });
    const result = await handler.execute(new GetSubscriptionQuery(SUB_ID));
    expect(result).toEqual({ id: SUB_ID });
    expect(service.getById).toHaveBeenCalledWith(SUB_ID);
  });

  it('should have correct type', () => {
    expect(new GetSubscriptionQuery(SUB_ID).type).toBe('payment.subscription.get');
  });
});
