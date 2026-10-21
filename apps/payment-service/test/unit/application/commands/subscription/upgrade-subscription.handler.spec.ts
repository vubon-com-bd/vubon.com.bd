import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { UpgradeSubscriptionHandler } from '@application/commands/subscription/upgrade-subscription.handler';
import { UpgradeSubscriptionCommand } from '@application/commands/subscription/upgrade-subscription.command';
import type { ISubscriptionService } from '@application/services/interfaces/subscription.service.interface';

const SUB_ID = '223e4567-e89b-42d3-a456-426614174001';
const USER_ID = '323e4567-e89b-42d3-a456-426614174002';

function makeMockService(): ISubscriptionService {
  return {
    create: jest.fn(), upgrade: jest.fn(), downgrade: jest.fn(),
    pause: jest.fn(), cancel: jest.fn(), getById: jest.fn(),
    listByUser: jest.fn(), list: jest.fn(), getStats: jest.fn(),
  };
}

describe('UpgradeSubscriptionHandler', () => {
  let handler: UpgradeSubscriptionHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new UpgradeSubscriptionHandler(service);
  });

  it('should delegate to service.upgrade', async () => {
    (service.upgrade as jest.Mock).mockResolvedValue({ id: SUB_ID });
    const cmd = new UpgradeSubscriptionCommand(
      { subscriptionId: SUB_ID, newPlan: 'enterprise' as never, newPrice: 50000, currency: 'BDT' },
      USER_ID,
    );
    await handler.execute(cmd);
    expect(service.upgrade).toHaveBeenCalledWith(cmd.dto, USER_ID);
  });

  it('should have correct type', () => {
    const cmd = new UpgradeSubscriptionCommand(
      { subscriptionId: SUB_ID, newPlan: 'enterprise' as never, newPrice: 50000, currency: 'BDT' },
      USER_ID,
    );
    expect(cmd.type).toBe('payment.subscription.upgrade');
  });
});
