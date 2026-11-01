import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({ QueryHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { ListPaymentsHandler } from '@application/queries/payment/list-payments.handler';
import { ListPaymentsQuery } from '@application/queries/payment/list-payments.query';
import type { IPaymentService } from '@application/services/interfaces/payment.service.interface';

function makeMockService(): IPaymentService {
  return {
    initiate: jest.fn(), confirm: jest.fn(), cancel: jest.fn(), retry: jest.fn(),
    verify: jest.fn(), getById: jest.fn(), getPublic: jest.fn(), list: jest.fn(), getStats: jest.fn(),
  };
}

describe('ListPaymentsHandler', () => {
  let handler: ListPaymentsHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new ListPaymentsHandler(service);
  });

  it('should delegate to service.list with pagination', async () => {
    (service.list as jest.Mock).mockResolvedValue({ items: [], total: 0, page: 1, limit: 10, totalPages: 0 });
    const query = new ListPaymentsQuery(1, 10, { status: 'paid' as never }, 'createdAt', 'desc');
    await handler.execute(query);
    expect(service.list).toHaveBeenCalledWith({
      page: 1, limit: 10, filter: { status: 'paid' }, sortBy: 'createdAt', sortDir: 'desc',
    });
  });

  it('should have correct type', () => {
    expect(new ListPaymentsQuery(1, 10).type).toBe('payment.payment.list');
  });
});
