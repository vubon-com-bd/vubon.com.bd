import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ListReturnsHandler } from '@application/queries/return/list-returns.handler.js';
import { ListReturnsQuery } from '@application/queries/return/list-returns.query.js';
import type { IOrderReturnService } from '@application/services/interfaces/order-return.service.interface.js';

describe('ListReturnsHandler', () => {
  let handler: ListReturnsHandler;
  let service: jest.Mocked<IOrderReturnService>;
  beforeEach(() => {
    service = { list: jest.fn() } as unknown as jest.Mocked<IOrderReturnService>;
    handler = new ListReturnsHandler(service);
  });
  it('delegates to service.list', async () => {
    service.list.mockResolvedValue({ items: [], total: 0, page: 1, limit: 10, totalPages: 0 });
    await handler.execute(new ListReturnsQuery({ page: 1, limit: 10 }));
    expect(service.list).toHaveBeenCalled();
  });
});
