import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetOrderByNumberHandler } from '@application/queries/order/get-order-by-number.handler.js';
import { GetOrderByNumberQuery } from '@application/queries/order/get-order-by-number.query.js';
import type { IOrderService } from '@application/services/interfaces/order.service.interface.js';
import { makeOrderEntityStub } from '@fixtures/application/entity-factories.js';
import { OrderMapper } from '@application/mappers/order.mapper.js';

describe('GetOrderByNumberHandler', () => {
  let handler: GetOrderByNumberHandler;
  let service: jest.Mocked<IOrderService>;
  beforeEach(() => {
    service = { getByNumber: jest.fn() } as unknown as jest.Mocked<IOrderService>;
    handler = new GetOrderByNumberHandler(service);
  });
  it('delegates to service.getByNumber', async () => {
    service.getByNumber.mockResolvedValue(OrderMapper.toResponse(makeOrderEntityStub()));
    const result = await handler.execute(new GetOrderByNumberQuery('ORD-2024-000123'));
    expect(service.getByNumber).toHaveBeenCalledWith('ORD-2024-000123');
    expect(result.orderNumber).toBe('ORD-2024-000123');
  });
});
