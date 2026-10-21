import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({ QueryHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { ListTransactionsHandler } from '@application/queries/transaction/list-transactions.handler';
import { ListTransactionsQuery } from '@application/queries/transaction/list-transactions.query';
import type { ITransactionService } from '@application/services/interfaces/transaction.service.interface';

function makeMockService(): ITransactionService {
  return {
    create: jest.fn(), reverse: jest.fn(), getById: jest.fn(),
    listByPayment: jest.fn(), list: jest.fn(), getStats: jest.fn(),
  };
}

describe('ListTransactionsHandler', () => {
  let handler: ListTransactionsHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new ListTransactionsHandler(service);
  });

  it('should delegate to service.list with filter', async () => {
    (service.list as jest.Mock).mockResolvedValue({ items: [], total: 0 });
    const query = new ListTransactionsQuery(1, 10, { paymentId: 'pay-1' }, 'createdAt', 'desc');
    await handler.execute(query);
    expect(service.list).toHaveBeenCalledWith({
      page: 1, limit: 10, filter: { paymentId: 'pay-1' },
      sortBy: 'createdAt', sortDir: 'desc',
    });
  });

  it('should have correct type', () => {
    expect(new ListTransactionsQuery(1, 10).type).toBe('payment.transaction.list');
  });
});
