/**
 * CreateTransactionHandler — Unit Tests
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

import { CreateTransactionHandler } from '@application/commands/transaction/create-transaction.handler';
import { CreateTransactionCommand } from '@application/commands/transaction/create-transaction.command';
import type { ITransactionService } from '@application/services/interfaces/transaction.service.interface';

const PAYMENT_ID = '123e4567-e89b-42d3-a456-426614174000';

function makeMockService(): ITransactionService {
  return {
    create: jest.fn(),
    reverse: jest.fn(),
    getById: jest.fn(),
    listByPayment: jest.fn(),
    list: jest.fn(),
    getStats: jest.fn(),
  };
}

describe('CreateTransactionHandler', () => {
  let handler: CreateTransactionHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new CreateTransactionHandler(service);
  });

  it('should delegate to service.create', async () => {
    (service.create as jest.Mock).mockResolvedValue({ id: 'tx-1' });
    const cmd = new CreateTransactionCommand({
      paymentId: PAYMENT_ID,
      type: 'payment' as never,
      amount: 1000,
      currency: 'BDT',
    });
    await handler.execute(cmd);
    expect(service.create).toHaveBeenCalledWith(cmd.dto, undefined);
  });

  it('should pass actorId', async () => {
    (service.create as jest.Mock).mockResolvedValue({ id: 'tx-1' });
    const cmd = new CreateTransactionCommand(
      { paymentId: PAYMENT_ID, type: 'payment' as never, amount: 1000, currency: 'BDT' },
      'admin-1',
    );
    await handler.execute(cmd);
    expect(service.create).toHaveBeenCalledWith(cmd.dto, 'admin-1');
  });

  it('should have correct type', () => {
    const cmd = new CreateTransactionCommand({
      paymentId: PAYMENT_ID,
      type: 'payment' as never,
      amount: 1000,
      currency: 'BDT',
    });
    expect(cmd.type).toBe('payment.transaction.create');
  });
});
