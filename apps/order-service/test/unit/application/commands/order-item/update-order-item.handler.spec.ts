import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { UpdateOrderItemHandler } from '@application/commands/order-item/update-order-item.handler.js';
import { UpdateOrderItemCommand } from '@application/commands/order-item/update-order-item.command.js';
import type { IOrderItemService } from '@application/services/interfaces/order-item.service.interface.js';
import { makeOrderItemEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { OrderItemMapper } from '@application/mappers/order-item.mapper.js';

describe('UpdateOrderItemHandler', () => {
  let handler: UpdateOrderItemHandler;
  let service: jest.Mocked<IOrderItemService>;

  beforeEach(() => {
    service = { update: jest.fn() } as unknown as jest.Mocked<IOrderItemService>;
    handler = new UpdateOrderItemHandler(service);
  });

  it('delegates to service.update', async () => {
    const dto = { orderId: FIXTURE_ID, itemId: FIXTURE_ID } as never;
    service.update.mockResolvedValue(OrderItemMapper.toResponse(makeOrderItemEntityStub()));
    await handler.execute(new UpdateOrderItemCommand(dto, 'admin'));
    expect(service.update).toHaveBeenCalledWith(dto, 'admin');
  });
});
