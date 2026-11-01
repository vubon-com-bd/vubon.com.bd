import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetDeliveryHandler } from '@application/queries/delivery/get-delivery.handler.js';
import { GetDeliveryQuery } from '@application/queries/delivery/get-delivery.query.js';
import type { IDeliveryService } from '@application/services/interfaces/delivery.service.interface.js';
import { makeDeliveryEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { DeliveryMapper } from '@application/mappers/delivery.mapper.js';

describe('GetDeliveryHandler', () => {
  let handler: GetDeliveryHandler;
  let service: jest.Mocked<IDeliveryService>;
  beforeEach(() => {
    service = { getById: jest.fn() } as unknown as jest.Mocked<IDeliveryService>;
    handler = new GetDeliveryHandler(service);
  });
  it('delegates to service.getById', async () => {
    service.getById.mockResolvedValue(DeliveryMapper.toResponse(makeDeliveryEntityStub()));
    await handler.execute(new GetDeliveryQuery(FIXTURE_ID));
    expect(service.getById).toHaveBeenCalledWith(FIXTURE_ID);
  });
});
