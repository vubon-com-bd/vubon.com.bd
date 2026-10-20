import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { PackOrderHandler } from '@application/commands/fulfillment/pack-order.handler.js';
import { PackOrderCommand } from '@application/commands/fulfillment/pack-order.command.js';
import type { IOrderFulfillmentService } from '@application/services/interfaces/order-fulfillment.service.interface.js';
import { makeFulfillmentEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { FulfillmentMapper } from '@application/mappers/fulfillment.mapper.js';

describe('PackOrderHandler', () => {
  let handler: PackOrderHandler;
  let service: jest.Mocked<IOrderFulfillmentService>;
  beforeEach(() => {
    service = { pack: jest.fn() } as unknown as jest.Mocked<IOrderFulfillmentService>;
    handler = new PackOrderHandler(service);
  });
  it('delegates to service.pack', async () => {
    const dto = { fulfillmentId: FIXTURE_ID, orderId: FIXTURE_ID } as never;
    service.pack.mockResolvedValue(FulfillmentMapper.toResponse(makeFulfillmentEntityStub()));
    await handler.execute(new PackOrderCommand(dto, 'admin'));
    expect(service.pack).toHaveBeenCalledWith(dto, 'admin');
  });
});
