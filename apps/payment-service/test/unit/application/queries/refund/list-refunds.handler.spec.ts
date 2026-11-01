import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({ QueryHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { ListRefundsHandler } from '@application/queries/refund/list-refunds.handler';
import { ListRefundsQuery } from '@application/queries/refund/list-refunds.query';
import type { IRefundService } from '@application/services/interfaces/refund.service.interface';

function makeMockService(): IRefundService {
  return {
    request: jest.fn(), approve: jest.fn(), reject: jest.fn(), partial: jest.fn(),
    getById: jest.fn(), listByPayment: jest.fn(), list: jest.fn(), getStats: jest.fn(),
  };
}

describe('ListRefundsHandler', () => {
  let handler: ListRefundsHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new ListRefundsHandler(service);
  });

  it('should delegate to service.list', async () => {
    (service.list as jest.Mock).mockResolvedValue({ items: [], total: 0 });
    const query = new ListRefundsQuery(1, 10, { status: 'completed' }, 'createdAt', 'desc');
    await handler.execute(query);
    expect(service.list).toHaveBeenCalledWith({
      page: 1, limit: 10, filter: { status: 'completed' },
      sortBy: 'createdAt', sortDir: 'desc',
    });
  });

  it('should have correct type', () => {
    expect(new ListRefundsQuery(1, 10).type).toBe('payment.refund.list');
  });
});
