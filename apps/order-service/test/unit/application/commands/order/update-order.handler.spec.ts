/**
 * UpdateOrderHandler — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { UpdateOrderHandler } from '@application/commands/order/update-order.handler.js';
import { UpdateOrderCommand } from '@application/commands/order/update-order.command.js';
import type { IOrderService } from '@application/services/interfaces/order.service.interface.js';
import { makeOrderEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { OrderMapper } from '@application/mappers/order.mapper.js';

describe('UpdateOrderHandler', () => {
  let handler: UpdateOrderHandler;
  let service: jest.Mocked<IOrderService>;

  beforeEach(() => {
    service = { update: jest.fn() } as unknown as jest.Mocked<IOrderService>;
    handler = new UpdateOrderHandler(service);
  });

  it('delegates to service.update', async () => {
    const dto = { orderId: FIXTURE_ID } as never;
    const dtoResult = OrderMapper.toResponse(makeOrderEntityStub());
    service.update.mockResolvedValue(dtoResult);

    const cmd = new UpdateOrderCommand(dto, 'admin');
    const result = await handler.execute(cmd);

    expect(service.update).toHaveBeenCalledWith(dto, 'admin');
    expect(result.id).toBe(FIXTURE_ID);
  });
});
