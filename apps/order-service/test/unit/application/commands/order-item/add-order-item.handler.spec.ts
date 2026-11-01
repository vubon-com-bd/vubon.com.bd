/**
 * AddOrderItemHandler — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AddOrderItemHandler } from '@application/commands/order-item/add-order-item.handler.js';
import { AddOrderItemCommand } from '@application/commands/order-item/add-order-item.command.js';
import type { IOrderItemService } from '@application/services/interfaces/order-item.service.interface.js';
import { makeOrderItemEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { OrderItemMapper } from '@application/mappers/order-item.mapper.js';

describe('AddOrderItemHandler', () => {
  let handler: AddOrderItemHandler;
  let service: jest.Mocked<IOrderItemService>;

  beforeEach(() => {
    service = { add: jest.fn() } as unknown as jest.Mocked<IOrderItemService>;
    handler = new AddOrderItemHandler(service);
  });

  it('delegates to service.add', async () => {
    const dto = { orderId: FIXTURE_ID } as never;
    service.add.mockResolvedValue(OrderItemMapper.toResponse(makeOrderItemEntityStub()));
    const cmd = new AddOrderItemCommand(dto, 'admin');
    await handler.execute(cmd);
    expect(service.add).toHaveBeenCalledWith(dto, 'admin');
  });
});
