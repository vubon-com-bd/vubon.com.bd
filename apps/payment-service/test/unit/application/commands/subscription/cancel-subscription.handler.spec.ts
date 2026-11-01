import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { CancelSubscriptionHandler } from '@application/commands/subscription/cancel-subscription.handler';
import { CancelSubscriptionCommand } from '@application/commands/subscription/cancel-subscription.command';
import type { ISubscriptionService } from '@application/services/interfaces/subscription.service.interface';

const SUB_ID = '823e4567-e89b-42d3-a456-426614174007';
const USER_ID = '923e4567-e89b-42d3-a456-426614174008';

function makeMockService(): ISubscriptionService {
  return {
    create: jest.fn(), upgrade: jest.fn(), downgrade: jest.fn(),
    pause: jest.fn(), cancel: jest.fn(), getById: jest.fn(),
    listByUser: jest.fn(), list: jest.fn(), getStats: jest.fn(),
  };
}

describe('CancelSubscriptionHandler', () => {
  let handler: CancelSubscriptionHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new CancelSubscriptionHandler(service);
  });

  it('should delegate to service.cancel', async () => {
    (service.cancel as jest.Mock).mockResolvedValue({ id: SUB_ID, status: 'cancelled' });
    const cmd = new CancelSubscriptionCommand(
      { subscriptionId: SUB_ID, reason: 'x', cancelAtPeriodEnd: false },
      USER_ID,
    );
    await handler.execute(cmd);
    expect(service.cancel).toHaveBeenCalledWith(cmd.dto, USER_ID);
  });

  it('should have correct type', () => {
    const cmd = new CancelSubscriptionCommand(
      { subscriptionId: SUB_ID, reason: 'x', cancelAtPeriodEnd: true },
      USER_ID,
    );
    expect(cmd.type).toBe('payment.subscription.cancel');
  });
});
