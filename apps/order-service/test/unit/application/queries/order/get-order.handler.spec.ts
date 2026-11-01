import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetOrderHandler } from '@application/queries/order/get-order.handler.js';
import { GetOrderQuery } from '@application/queries/order/get-order.query.js';
import type { IOrderService } from '@application/services/interfaces/order.service.interface.js';
import { makeOrderEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { OrderMapper } from '@application/mappers/order.mapper.js';

describe('GetOrderHandler', () => {
  let handler: GetOrderHandler;
  let service: jest.Mocked<IOrderService>;
  beforeEach(() => {
    service = { getById: jest.fn() } as unknown as jest.Mocked<IOrderService>;
    handler = new GetOrderHandler(service);
  });
  it('delegates to service.getById', async () => {
    service.getById.mockResolvedValue(OrderMapper.toResponse(makeOrderEntityStub()));
    const result = await handler.execute(new GetOrderQuery(FIXTURE_ID));
    expect(service.getById).toHaveBeenCalledWith(FIXTURE_ID);
    expect(result.id).toBe(FIXTURE_ID);
  });
});
