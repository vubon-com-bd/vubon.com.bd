import { jest } from '@jest/globals';
import { AddOrderItemHandler } from '../../../../src/module/application/commands/order-item/add-order-item.handler.js';
import { UpdateOrderItemHandler } from '../../../../src/module/application/commands/order-item/update-order-item.handler.js';
import { RemoveOrderItemHandler } from '../../../../src/module/application/commands/order-item/remove-order-item.handler.js';
import { AddOrderItemCommand } from '../../../../src/module/application/commands/order-item/add-order-item.command.js';
import { UpdateOrderItemCommand } from '../../../../src/module/application/commands/order-item/update-order-item.command.js';
import { RemoveOrderItemCommand } from '../../../../src/module/application/commands/order-item/remove-order-item.command.js';
import { ORDER_ITEM_COMMAND_HANDLERS } from '../../../../src/module/application/commands/order-item/index.js';
import { makeItem, UUID_ORDER, UUID_ITEM } from '../services/_helpers.js';

function mockService() {
  return {
    add: jest.fn().mockResolvedValue(makeItem()),
    update: jest.fn().mockResolvedValue(makeItem()),
    remove: jest.fn().mockResolvedValue(undefined),
  };
}

describe('OrderItem command handlers', () => {
  let service: ReturnType<typeof mockService>;
  beforeEach(() => { service = mockService(); });

  it('AddOrderItemHandler', async () => {
    const h = new AddOrderItemHandler(service as never);
    await h.execute(new AddOrderItemCommand({ orderId: UUID_ORDER } as never));
    expect(service.add).toHaveBeenCalled();
  });

  it('UpdateOrderItemHandler', async () => {
    const h = new UpdateOrderItemHandler(service as never);
    await h.execute(new UpdateOrderItemCommand({ itemId: UUID_ITEM } as never));
    expect(service.update).toHaveBeenCalled();
  });

  it('RemoveOrderItemHandler', async () => {
    const h = new RemoveOrderItemHandler(service as never);
    await h.execute(new RemoveOrderItemCommand({ orderId: UUID_ORDER, itemId: UUID_ITEM } as never));
    expect(service.remove).toHaveBeenCalled();
  });

  it('ORDER_ITEM_COMMAND_HANDLERS exports 3', () => {
    expect(ORDER_ITEM_COMMAND_HANDLERS).toHaveLength(3);
  });
});
