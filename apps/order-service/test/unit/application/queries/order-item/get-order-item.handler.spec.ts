import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetOrderItemHandler } from '@application/queries/order-item/get-order-item.handler.js';
import { GetOrderItemQuery } from '@application/queries/order-item/get-order-item.query.js';
import type { IOrderItemService } from '@application/services/interfaces/order-item.service.interface.js';
import { makeOrderItemEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { OrderItemMapper } from '@application/mappers/order-item.mapper.js';

describe('GetOrderItemHandler', () => {
  let handler: GetOrderItemHandler;
  let service: jest.Mocked<IOrderItemService>;
  beforeEach(() => {
    service = { getById: jest.fn() } as unknown as jest.Mocked<IOrderItemService>;
    handler = new GetOrderItemHandler(service);
  });
  it('delegates to service.getById', async () => {
    service.getById.mockResolvedValue(OrderItemMapper.toResponse(makeOrderItemEntityStub()));
    await handler.execute(new GetOrderItemQuery(FIXTURE_ID));
    expect(service.getById).toHaveBeenCalledWith(FIXTURE_ID);
  });
});
