import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { PauseSubscriptionHandler } from '@application/commands/subscription/pause-subscription.handler';
import { PauseSubscriptionCommand } from '@application/commands/subscription/pause-subscription.command';
import type { ISubscriptionService } from '@application/services/interfaces/subscription.service.interface';

const SUB_ID = '623e4567-e89b-42d3-a456-426614174005';
const USER_ID = '723e4567-e89b-42d3-a456-426614174006';

function makeMockService(): ISubscriptionService {
  return {
    create: jest.fn(), upgrade: jest.fn(), downgrade: jest.fn(),
    pause: jest.fn(), cancel: jest.fn(), getById: jest.fn(),
    listByUser: jest.fn(), list: jest.fn(), getStats: jest.fn(),
  };
}

describe('PauseSubscriptionHandler', () => {
  let handler: PauseSubscriptionHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new PauseSubscriptionHandler(service);
  });

  it('should delegate to service.pause', async () => {
    (service.pause as jest.Mock).mockResolvedValue({ id: SUB_ID, status: 'paused' });
    const cmd = new PauseSubscriptionCommand({ subscriptionId: SUB_ID }, USER_ID);
    await handler.execute(cmd);
    expect(service.pause).toHaveBeenCalledWith(cmd.dto, USER_ID);
  });

  it('should have correct type', () => {
    const cmd = new PauseSubscriptionCommand({ subscriptionId: SUB_ID }, USER_ID);
    expect(cmd.type).toBe('payment.subscription.pause');
  });
});
