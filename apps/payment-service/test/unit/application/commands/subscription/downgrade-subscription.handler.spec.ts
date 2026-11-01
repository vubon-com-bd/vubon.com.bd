import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { DowngradeSubscriptionHandler } from '@application/commands/subscription/downgrade-subscription.handler';
import { DowngradeSubscriptionCommand } from '@application/commands/subscription/downgrade-subscription.command';
import type { ISubscriptionService } from '@application/services/interfaces/subscription.service.interface';

const SUB_ID = '423e4567-e89b-42d3-a456-426614174003';
const USER_ID = '523e4567-e89b-42d3-a456-426614174004';

function makeMockService(): ISubscriptionService {
  return {
    create: jest.fn(), upgrade: jest.fn(), downgrade: jest.fn(),
    pause: jest.fn(), cancel: jest.fn(), getById: jest.fn(),
    listByUser: jest.fn(), list: jest.fn(), getStats: jest.fn(),
  };
}

describe('DowngradeSubscriptionHandler', () => {
  let handler: DowngradeSubscriptionHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new DowngradeSubscriptionHandler(service);
  });

  it('should delegate to service.downgrade', async () => {
    (service.downgrade as jest.Mock).mockResolvedValue({ id: SUB_ID });
    const cmd = new DowngradeSubscriptionCommand(
      { subscriptionId: SUB_ID, newPlan: 'basic' as never, newPrice: 100, currency: 'BDT' },
      USER_ID,
    );
    await handler.execute(cmd);
    expect(service.downgrade).toHaveBeenCalledWith(cmd.dto, USER_ID);
  });

  it('should have correct type', () => {
    const cmd = new DowngradeSubscriptionCommand(
      { subscriptionId: SUB_ID, newPlan: 'basic' as never, newPrice: 100, currency: 'BDT' },
      USER_ID,
    );
    expect(cmd.type).toBe('payment.subscription.downgrade');
  });
});
