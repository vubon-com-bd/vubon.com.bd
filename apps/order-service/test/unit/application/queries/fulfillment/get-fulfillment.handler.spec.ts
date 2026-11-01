import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetFulfillmentHandler } from '@application/queries/fulfillment/get-fulfillment.handler.js';
import { GetFulfillmentQuery } from '@application/queries/fulfillment/get-fulfillment.query.js';
import type { IOrderFulfillmentService } from '@application/services/interfaces/order-fulfillment.service.interface.js';
import { makeFulfillmentEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { FulfillmentMapper } from '@application/mappers/fulfillment.mapper.js';

describe('GetFulfillmentHandler', () => {
  let handler: GetFulfillmentHandler;
  let service: jest.Mocked<IOrderFulfillmentService>;
  beforeEach(() => {
    service = { getById: jest.fn() } as unknown as jest.Mocked<IOrderFulfillmentService>;
    handler = new GetFulfillmentHandler(service);
  });
  it('delegates to service.getById', async () => {
    service.getById.mockResolvedValue(FulfillmentMapper.toResponse(makeFulfillmentEntityStub()));
    await handler.execute(new GetFulfillmentQuery(FIXTURE_ID));
    expect(service.getById).toHaveBeenCalledWith(FIXTURE_ID);
  });
});
