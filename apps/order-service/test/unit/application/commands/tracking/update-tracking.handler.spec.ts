import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { UpdateTrackingHandler } from '@application/commands/tracking/update-tracking.handler.js';
import { UpdateTrackingCommand } from '@application/commands/tracking/update-tracking.command.js';
import type { IOrderTrackingService } from '@application/services/interfaces/order-tracking.service.interface.js';
import { makeTrackingEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { TrackingMapper } from '@application/mappers/tracking.mapper.js';

describe('UpdateTrackingHandler', () => {
  let handler: UpdateTrackingHandler;
  let service: jest.Mocked<IOrderTrackingService>;
  beforeEach(() => {
    service = { update: jest.fn() } as unknown as jest.Mocked<IOrderTrackingService>;
    handler = new UpdateTrackingHandler(service);
  });
  it('delegates to service.update', async () => {
    const dto = { trackingId: FIXTURE_ID, orderId: FIXTURE_ID } as never;
    service.update.mockResolvedValue(TrackingMapper.toResponse(makeTrackingEntityStub()));
    await handler.execute(new UpdateTrackingCommand(dto, 'admin'));
    expect(service.update).toHaveBeenCalledWith(dto, 'admin');
  });
});
