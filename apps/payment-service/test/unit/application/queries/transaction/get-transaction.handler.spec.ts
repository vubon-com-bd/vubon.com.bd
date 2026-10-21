import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({ QueryHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { GetTransactionHandler } from '@application/queries/transaction/get-transaction.handler';
import { GetTransactionQuery } from '@application/queries/transaction/get-transaction.query';
import type { ITransactionService } from '@application/services/interfaces/transaction.service.interface';

const TX_ID = '623e4567-e89b-42d3-a456-426614174005';

function makeMockService(): ITransactionService {
  return {
    create: jest.fn(), reverse: jest.fn(), getById: jest.fn(),
    listByPayment: jest.fn(), list: jest.fn(), getStats: jest.fn(),
  };
}

describe('GetTransactionHandler', () => {
  let handler: GetTransactionHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new GetTransactionHandler(service);
  });

  it('should delegate to service.getById', async () => {
    (service.getById as jest.Mock).mockResolvedValue({ id: TX_ID });
    const result = await handler.execute(new GetTransactionQuery(TX_ID));
    expect(result).toEqual({ id: TX_ID });
    expect(service.getById).toHaveBeenCalledWith(TX_ID);
  });

  it('should have correct type', () => {
    expect(new GetTransactionQuery(TX_ID).type).toBe('payment.transaction.get');
  });
});
