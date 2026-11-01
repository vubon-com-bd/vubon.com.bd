/**
 * ReleaseOrderHandler — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ReleaseOrderHandler } from '@application/commands/order/release-order.handler.js';
import { ReleaseOrderCommand } from '@application/commands/order/release-order.command.js';
import type { IOrderService } from '@application/services/interfaces/order.service.interface.js';
import { makeOrderEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { OrderMapper } from '@application/mappers/order.mapper.js';

describe('ReleaseOrderHandler', () => {
  let handler: ReleaseOrderHandler;
  let service: jest.Mocked<IOrderService>;

  beforeEach(() => {
    service = { release: jest.fn() } as unknown as jest.Mocked<IOrderService>;
    handler = new ReleaseOrderHandler(service);
  });

  it('delegates to service.release', async () => {
    const dto = { orderId: FIXTURE_ID } as never;
    service.release.mockResolvedValue(OrderMapper.toResponse(makeOrderEntityStub()));

    const cmd = new ReleaseOrderCommand(dto, 'admin');
    await handler.execute(cmd);

    expect(service.release).toHaveBeenCalledWith(dto, 'admin');
  });
});
