/**
 * DeleteOrderHandler — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { DeleteOrderHandler } from '@application/commands/order/delete-order.handler.js';
import { DeleteOrderCommand } from '@application/commands/order/delete-order.command.js';
import type { IOrderService } from '@application/services/interfaces/order.service.interface.js';
import { FIXTURE_ID } from '@fixtures/application/entity-factories.js';

describe('DeleteOrderHandler', () => {
  let handler: DeleteOrderHandler;
  let service: jest.Mocked<IOrderService>;

  beforeEach(() => {
    service = { delete: jest.fn() } as unknown as jest.Mocked<IOrderService>;
    handler = new DeleteOrderHandler(service);
  });

  it('delegates to service.delete', async () => {
    service.delete.mockResolvedValue(undefined);
    const dto = { orderId: FIXTURE_ID } as never;
    const cmd = new DeleteOrderCommand(dto, 'admin');

    await handler.execute(cmd);

    expect(service.delete).toHaveBeenCalledWith(dto, 'admin');
  });
});
