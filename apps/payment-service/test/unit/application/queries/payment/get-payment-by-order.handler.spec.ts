import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({ QueryHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { GetPaymentByOrderHandler } from '@application/queries/payment/get-payment-by-order.handler';
import { GetPaymentByOrderQuery } from '@application/queries/payment/get-payment-by-order.query';
import type { IPaymentService } from '@application/services/interfaces/payment.service.interface';

const ORDER_ID = '223e4567-e89b-42d3-a456-426614174001';

function makeMockService(): IPaymentService {
  return {
    initiate: jest.fn(), confirm: jest.fn(), cancel: jest.fn(), retry: jest.fn(),
    verify: jest.fn(), getById: jest.fn(), getPublic: jest.fn(), list: jest.fn(), getStats: jest.fn(),
  };
}

describe('GetPaymentByOrderHandler', () => {
  let handler: GetPaymentByOrderHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new GetPaymentByOrderHandler(service);
  });

  it('should call service.list with orderId filter', async () => {
    (service.list as jest.Mock).mockResolvedValue({ items: [], total: 0, page: 1, limit: 50, totalPages: 0 });
    const query = new GetPaymentByOrderQuery(ORDER_ID);
    await handler.execute(query);
    expect(service.list).toHaveBeenCalledWith({
      page: 1, limit: 50, filter: { orderId: ORDER_ID },
    });
  });

  it('should have correct type', () => {
    expect(new GetPaymentByOrderQuery(ORDER_ID).type).toBe('payment.payment.by_order');
  });
});
