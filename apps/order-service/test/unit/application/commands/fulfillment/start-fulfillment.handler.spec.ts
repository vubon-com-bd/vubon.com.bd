import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { StartFulfillmentHandler } from '@application/commands/fulfillment/start-fulfillment.handler.js';
import { StartFulfillmentCommand } from '@application/commands/fulfillment/start-fulfillment.command.js';
import type { IOrderFulfillmentService } from '@application/services/interfaces/order-fulfillment.service.interface.js';
import { makeFulfillmentEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { FulfillmentMapper } from '@application/mappers/fulfillment.mapper.js';

describe('StartFulfillmentHandler', () => {
  let handler: StartFulfillmentHandler;
  let service: jest.Mocked<IOrderFulfillmentService>;
  beforeEach(() => {
    service = { start: jest.fn() } as unknown as jest.Mocked<IOrderFulfillmentService>;
    handler = new StartFulfillmentHandler(service);
  });
  it('delegates to service.start', async () => {
    const dto = { orderId: FIXTURE_ID } as never;
    service.start.mockResolvedValue(FulfillmentMapper.toResponse(makeFulfillmentEntityStub()));
    await handler.execute(new StartFulfillmentCommand(dto, 'admin'));
    expect(service.start).toHaveBeenCalledWith(dto, 'admin');
  });
});
