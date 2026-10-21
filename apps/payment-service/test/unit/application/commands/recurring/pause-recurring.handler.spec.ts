/**
 * PauseRecurringHandler — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

jest.mock('@nestjs/cqrs', () => ({
  CommandHandler: () => (target: unknown) => target,
}));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (target: unknown) => target,
  Inject: () => () => undefined,
  Logger: class {
    log(): void {}
    error(): void {}
    warn(): void {}
    debug(): void {}
    verbose(): void {}
  },
}));

import { PauseRecurringHandler } from '@application/commands/recurring/pause-recurring.handler';
import { PauseRecurringCommand } from '@application/commands/recurring/pause-recurring.command';
import type { IRecurringPaymentService } from '@application/services/interfaces/recurring-payment.service.interface';

const RECURRING_ID = '623e4567-e89b-42d3-a456-426614174005';

function makeMockService(): IRecurringPaymentService {
  return {
    create: jest.fn(),
    pause: jest.fn(),
    cancel: jest.fn(),
    getById: jest.fn(),
    listByPayment: jest.fn(),
    list: jest.fn(),
  };
}

describe('PauseRecurringHandler', () => {
  let handler: PauseRecurringHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new PauseRecurringHandler(service);
  });

  it('should delegate to service.pause', async () => {
    (service.pause as jest.Mock).mockResolvedValue({ id: RECURRING_ID, status: 'paused' });
    const cmd = new PauseRecurringCommand({ recurringId: RECURRING_ID }, 'admin-1');
    await handler.execute(cmd);
    expect(service.pause).toHaveBeenCalledWith(cmd.dto, 'admin-1');
  });

  it('should have correct type', () => {
    const cmd = new PauseRecurringCommand({ recurringId: RECURRING_ID });
    expect(cmd.type).toBe('payment.recurring.pause');
  });
});
