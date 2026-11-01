import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { RemoveOrderItemHandler } from '@application/commands/order-item/remove-order-item.handler.js';
import { RemoveOrderItemCommand } from '@application/commands/order-item/remove-order-item.command.js';
import type { IOrderItemService } from '@application/services/interfaces/order-item.service.interface.js';
import { FIXTURE_ID } from '@fixtures/application/entity-factories.js';

describe('RemoveOrderItemHandler', () => {
  let handler: RemoveOrderItemHandler;
  let service: jest.Mocked<IOrderItemService>;

  beforeEach(() => {
    service = { remove: jest.fn() } as unknown as jest.Mocked<IOrderItemService>;
    handler = new RemoveOrderItemHandler(service);
  });

  it('delegates to service.remove', async () => {
    service.remove.mockResolvedValue(undefined);
    const dto = { orderId: FIXTURE_ID, itemId: FIXTURE_ID } as never;
    await handler.execute(new RemoveOrderItemCommand(dto, 'admin'));
    expect(service.remove).toHaveBeenCalledWith(dto, 'admin');
  });
});
