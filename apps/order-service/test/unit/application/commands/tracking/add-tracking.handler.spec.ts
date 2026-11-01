import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AddTrackingHandler } from '@application/commands/tracking/add-tracking.handler.js';
import { AddTrackingCommand } from '@application/commands/tracking/add-tracking.command.js';
import type { IOrderTrackingService } from '@application/services/interfaces/order-tracking.service.interface.js';
import { makeTrackingEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { TrackingMapper } from '@application/mappers/tracking.mapper.js';

describe('AddTrackingHandler', () => {
  let handler: AddTrackingHandler;
  let service: jest.Mocked<IOrderTrackingService>;
  beforeEach(() => {
    service = { add: jest.fn() } as unknown as jest.Mocked<IOrderTrackingService>;
    handler = new AddTrackingHandler(service);
  });
  it('delegates to service.add', async () => {
    const dto = { orderId: FIXTURE_ID } as never;
    service.add.mockResolvedValue(TrackingMapper.toResponse(makeTrackingEntityStub()));
    await handler.execute(new AddTrackingCommand(dto, 'admin'));
    expect(service.add).toHaveBeenCalledWith(dto, 'admin');
  });
});
