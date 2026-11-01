/**
 * CreateSubscriptionHandler — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { CreateSubscriptionHandler } from '@application/commands/subscription/create-subscription.handler';
import { CreateSubscriptionCommand } from '@application/commands/subscription/create-subscription.command';
import type { ISubscriptionService } from '@application/services/interfaces/subscription.service.interface';

const USER_ID = '123e4567-e89b-42d3-a456-426614174000';

function makeMockService(): ISubscriptionService {
  return {
    create: jest.fn(),
    upgrade: jest.fn(),
    downgrade: jest.fn(),
    pause: jest.fn(),
    cancel: jest.fn(),
    getById: jest.fn(),
    listByUser: jest.fn(),
    list: jest.fn(),
    getStats: jest.fn(),
  };
}

describe('CreateSubscriptionHandler', () => {
  let handler: CreateSubscriptionHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new CreateSubscriptionHandler(service);
  });

  it('should delegate to service.create', async () => {
    (service.create as jest.Mock).mockResolvedValue({ id: 'sub-1' });
    const cmd = new CreateSubscriptionCommand(
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
    await handler.execute(cmd);
    expect(service.create).toHaveBeenCalledWith(cmd.dto, USER_ID);
  });

  it('should have correct type', () => {
    const cmd = new CreateSubscriptionCommand(
      { plan: 'premium' as never, interval: 'monthly' as never, intervalCount: 1, price: 500, currency: 'BDT', method: 'card' as never },
      USER_ID,
    );
    expect(cmd.type).toBe('payment.subscription.create');
  });
});
