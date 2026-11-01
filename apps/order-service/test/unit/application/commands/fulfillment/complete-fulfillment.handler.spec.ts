import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CompleteFulfillmentHandler } from '@application/commands/fulfillment/complete-fulfillment.handler.js';
import { CompleteFulfillmentCommand } from '@application/commands/fulfillment/complete-fulfillment.command.js';
import type { IOrderFulfillmentService } from '@application/services/interfaces/order-fulfillment.service.interface.js';
import { makeFulfillmentEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { FulfillmentMapper } from '@application/mappers/fulfillment.mapper.js';

describe('CompleteFulfillmentHandler', () => {
  let handler: CompleteFulfillmentHandler;
  let service: jest.Mocked<IOrderFulfillmentService>;
  beforeEach(() => {
    service = { complete: jest.fn() } as unknown as jest.Mocked<IOrderFulfillmentService>;
    handler = new CompleteFulfillmentHandler(service);
  });
  it('delegates to service.complete', async () => {
    const dto = { fulfillmentId: FIXTURE_ID, orderId: FIXTURE_ID } as never;
    service.complete.mockResolvedValue(FulfillmentMapper.toResponse(makeFulfillmentEntityStub()));
    await handler.execute(new CompleteFulfillmentCommand(dto, 'admin'));
    expect(service.complete).toHaveBeenCalledWith(dto, 'admin');
  });
});
