/**
 * CreateRecurringHandler — Unit Tests
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

import { CreateRecurringHandler } from '@application/commands/recurring/create-recurring.handler';
import { CreateRecurringCommand } from '@application/commands/recurring/create-recurring.command';
import type { IRecurringPaymentService } from '@application/services/interfaces/recurring-payment.service.interface';

const PAYMENT_ID = '423e4567-e89b-42d3-a456-426614174003';
const USER_ID = '523e4567-e89b-42d3-a456-426614174004';

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

describe('CreateRecurringHandler', () => {
  let handler: CreateRecurringHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new CreateRecurringHandler(service);
  });

  it('should delegate to service.create', async () => {
    (service.create as jest.Mock).mockResolvedValue({ id: 'rec-1' });
    const cmd = new CreateRecurringCommand(
      {
        paymentId: PAYMENT_ID,
        amount: 500,
        currency: 'BDT',
        interval: 'monthly' as never,
        intervalCount: 1,
        startAt: '2025-01-15T10:00:00.000Z',
      },
      USER_ID,
    );
    await handler.execute(cmd);
    expect(service.create).toHaveBeenCalledWith(cmd.dto, USER_ID);
  });

  it('should have correct type', () => {
    const cmd = new CreateRecurringCommand(
      {
        paymentId: PAYMENT_ID,
        amount: 500,
        currency: 'BDT',
        interval: 'monthly' as never,
        intervalCount: 1,
        startAt: '2025-01-15T10:00:00.000Z',
      },
      USER_ID,
    );
    expect(cmd.type).toBe('payment.recurring.create');
  });
});
