/**
 * ConfirmOrderHandler — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ConfirmOrderHandler } from '@application/commands/order/confirm-order.handler.js';
import { ConfirmOrderCommand } from '@application/commands/order/confirm-order.command.js';
import type { IOrderService } from '@application/services/interfaces/order.service.interface.js';
import { makeOrderEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { OrderMapper } from '@application/mappers/order.mapper.js';

describe('ConfirmOrderHandler', () => {
  let handler: ConfirmOrderHandler;
  let service: jest.Mocked<IOrderService>;

  beforeEach(() => {
    service = { confirm: jest.fn() } as unknown as jest.Mocked<IOrderService>;
    handler = new ConfirmOrderHandler(service);
  });

  it('delegates to service.confirm', async () => {
    const dto = { orderId: FIXTURE_ID } as never;
    service.confirm.mockResolvedValue(OrderMapper.toResponse(makeOrderEntityStub()));

    const cmd = new ConfirmOrderCommand(dto, 'admin');
    const result = await handler.execute(cmd);

    expect(service.confirm).toHaveBeenCalledWith(dto, 'admin');
    expect(result.id).toBe(FIXTURE_ID);
  });
});
