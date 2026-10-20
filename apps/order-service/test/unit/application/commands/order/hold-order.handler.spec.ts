/**
 * HoldOrderHandler — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { HoldOrderHandler } from '@application/commands/order/hold-order.handler.js';
import { HoldOrderCommand } from '@application/commands/order/hold-order.command.js';
import type { IOrderService } from '@application/services/interfaces/order.service.interface.js';
import { makeOrderEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { OrderMapper } from '@application/mappers/order.mapper.js';

describe('HoldOrderHandler', () => {
  let handler: HoldOrderHandler;
  let service: jest.Mocked<IOrderService>;

  beforeEach(() => {
    service = { hold: jest.fn() } as unknown as jest.Mocked<IOrderService>;
    handler = new HoldOrderHandler(service);
  });

  it('delegates to service.hold', async () => {
    const dto = { orderId: FIXTURE_ID, reason: 'customer requested' } as never;
    service.hold.mockResolvedValue(OrderMapper.toResponse(makeOrderEntityStub()));

    const cmd = new HoldOrderCommand(dto, 'admin');
    await handler.execute(cmd);

    expect(service.hold).toHaveBeenCalledWith(dto, 'admin');
  });
});
