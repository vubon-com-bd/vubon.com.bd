import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetTrackingHandler } from '@application/queries/tracking/get-tracking.handler.js';
import { GetTrackingQuery } from '@application/queries/tracking/get-tracking.query.js';
import type { IOrderTrackingService } from '@application/services/interfaces/order-tracking.service.interface.js';
import { makeTrackingEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { TrackingMapper } from '@application/mappers/tracking.mapper.js';

describe('GetTrackingHandler', () => {
  let handler: GetTrackingHandler;
  let service: jest.Mocked<IOrderTrackingService>;
  beforeEach(() => {
    service = { getById: jest.fn() } as unknown as jest.Mocked<IOrderTrackingService>;
    handler = new GetTrackingHandler(service);
  });
  it('delegates to service.getById', async () => {
    service.getById.mockResolvedValue(TrackingMapper.toResponse(makeTrackingEntityStub()));
    await handler.execute(new GetTrackingQuery(FIXTURE_ID));
    expect(service.getById).toHaveBeenCalledWith(FIXTURE_ID);
  });
});
