import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { RescheduleDeliveryHandler } from '@application/commands/delivery/reschedule-delivery.handler.js';
import { RescheduleDeliveryCommand } from '@application/commands/delivery/reschedule-delivery.command.js';
import type { IDeliveryService } from '@application/services/interfaces/delivery.service.interface.js';
import { makeDeliveryEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { DeliveryMapper } from '@application/mappers/delivery.mapper.js';

describe('RescheduleDeliveryHandler', () => {
  let handler: RescheduleDeliveryHandler;
  let service: jest.Mocked<IDeliveryService>;
  beforeEach(() => {
    service = { reschedule: jest.fn() } as unknown as jest.Mocked<IDeliveryService>;
    handler = new RescheduleDeliveryHandler(service);
  });
  it('delegates to service.reschedule', async () => {
    const dto = { deliveryId: FIXTURE_ID, orderId: FIXTURE_ID, reason: 'customer' } as never;
    service.reschedule.mockResolvedValue(DeliveryMapper.toResponse(makeDeliveryEntityStub()));
    await handler.execute(new RescheduleDeliveryCommand(dto, 'admin'));
    expect(service.reschedule).toHaveBeenCalledWith(dto, 'admin');
  });
});
