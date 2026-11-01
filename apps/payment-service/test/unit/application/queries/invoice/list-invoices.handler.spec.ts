import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({ QueryHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { ListInvoicesHandler } from '@application/queries/invoice/list-invoices.handler';
import { ListInvoicesQuery } from '@application/queries/invoice/list-invoices.query';
import type { IInvoiceService } from '@application/services/interfaces/invoice.service.interface';

function makeMockService(): IInvoiceService {
  return {
    generate: jest.fn(), send: jest.fn(), void: jest.fn(),
    getById: jest.fn(), listByUser: jest.fn(), list: jest.fn(), getStats: jest.fn(),
  };
}

describe('ListInvoicesHandler', () => {
  let handler: ListInvoicesHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new ListInvoicesHandler(service);
  });

  it('should delegate to service.list', async () => {
    (service.list as jest.Mock).mockResolvedValue({ items: [], total: 0 });
    const query = new ListInvoicesQuery(1, 10, { status: 'issued' }, 'createdAt', 'desc');
    await handler.execute(query);
    expect(service.list).toHaveBeenCalledWith({
      page: 1, limit: 10, filter: { status: 'issued' },
      sortBy: 'createdAt', sortDir: 'desc',
    });
  });

  it('should have correct type', () => {
    expect(new ListInvoicesQuery(1, 10).type).toBe('payment.invoice.list');
  });
});
