/**
 * CancelRecurringHandler — Unit Tests
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

import { CancelRecurringHandler } from '@application/commands/recurring/cancel-recurring.handler';
import { CancelRecurringCommand } from '@application/commands/recurring/cancel-recurring.command';
import type { IRecurringPaymentService } from '@application/services/interfaces/recurring-payment.service.interface';

const RECURRING_ID = '723e4567-e89b-42d3-a456-426614174006';

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

describe('CancelRecurringHandler', () => {
  let handler: CancelRecurringHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new CancelRecurringHandler(service);
  });

  it('should delegate to service.cancel', async () => {
    (service.cancel as jest.Mock).mockResolvedValue({ id: RECURRING_ID, status: 'cancelled' });
    const cmd = new CancelRecurringCommand({ recurringId: RECURRING_ID, reason: 'x' }, 'admin');
    await handler.execute(cmd);
    expect(service.cancel).toHaveBeenCalledWith(cmd.dto, 'admin');
  });

  it('should have correct type', () => {
    const cmd = new CancelRecurringCommand({ recurringId: RECURRING_ID, reason: 'x' });
    expect(cmd.type).toBe('payment.recurring.cancel');
  });
});
