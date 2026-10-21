/**
 * ReverseTransactionHandler — Unit Tests
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

import { ReverseTransactionHandler } from '@application/commands/transaction/reverse-transaction.handler';
import { ReverseTransactionCommand } from '@application/commands/transaction/reverse-transaction.command';
import type { ITransactionService } from '@application/services/interfaces/transaction.service.interface';

const TX_ID = '223e4567-e89b-42d3-a456-426614174001';

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

describe('ReverseTransactionHandler', () => {
  let handler: ReverseTransactionHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new ReverseTransactionHandler(service);
  });

  it('should delegate to service.reverse', async () => {
    (service.reverse as jest.Mock).mockResolvedValue({ id: TX_ID, status: 'reversed' });
    const cmd = new ReverseTransactionCommand({ transactionId: TX_ID, reason: 'mistake' }, 'admin');
    await handler.execute(cmd);
    expect(service.reverse).toHaveBeenCalledWith(cmd.dto, 'admin');
  });

  it('should have correct type', () => {
    const cmd = new ReverseTransactionCommand({ transactionId: TX_ID, reason: 'x' });
    expect(cmd.type).toBe('payment.transaction.reverse');
  });
});
