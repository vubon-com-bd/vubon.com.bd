import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ShipOrderHandler } from '@application/commands/fulfillment/ship-order.handler.js';
import { ShipOrderCommand } from '@application/commands/fulfillment/ship-order.command.js';
import type { IOrderFulfillmentService } from '@application/services/interfaces/order-fulfillment.service.interface.js';
import { makeFulfillmentEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { FulfillmentMapper } from '@application/mappers/fulfillment.mapper.js';

describe('ShipOrderHandler', () => {
  let handler: ShipOrderHandler;
  let service: jest.Mocked<IOrderFulfillmentService>;
  beforeEach(() => {
    service = { ship: jest.fn() } as unknown as jest.Mocked<IOrderFulfillmentService>;
    handler = new ShipOrderHandler(service);
  });
  it('delegates to service.ship', async () => {
    const dto = { orderId: FIXTURE_ID, fulfillmentId: FIXTURE_ID } as never;
    service.ship.mockResolvedValue(FulfillmentMapper.toResponse(makeFulfillmentEntityStub()));
    await handler.execute(new ShipOrderCommand(dto, 'admin'));
    expect(service.ship).toHaveBeenCalledWith(dto, 'admin');
  });
});
