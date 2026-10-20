import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ListCancelsHandler } from '@application/queries/cancel/list-cancels.handler.js';
import { ListCancelsQuery } from '@application/queries/cancel/list-cancels.query.js';
import type { IOrderCancelService } from '@application/services/interfaces/order-cancel.service.interface.js';

describe('ListCancelsHandler', () => {
  let handler: ListCancelsHandler;
  let service: jest.Mocked<IOrderCancelService>;
  beforeEach(() => {
    service = { list: jest.fn() } as unknown as jest.Mocked<IOrderCancelService>;
    handler = new ListCancelsHandler(service);
  });
  it('delegates to service.list', async () => {
    service.list.mockResolvedValue({ items: [], total: 0, page: 1, limit: 10, totalPages: 0 });
    const options = { page: 1, limit: 10 };
    await handler.execute(new ListCancelsQuery(options));
    expect(service.list).toHaveBeenCalledWith(options);
  });
});
