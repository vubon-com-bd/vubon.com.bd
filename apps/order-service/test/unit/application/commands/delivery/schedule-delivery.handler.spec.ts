import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ScheduleDeliveryHandler } from '@application/commands/delivery/schedule-delivery.handler.js';
import { ScheduleDeliveryCommand } from '@application/commands/delivery/schedule-delivery.command.js';
import type { IDeliveryService } from '@application/services/interfaces/delivery.service.interface.js';
import { makeDeliveryEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { DeliveryMapper } from '@application/mappers/delivery.mapper.js';

describe('ScheduleDeliveryHandler', () => {
  let handler: ScheduleDeliveryHandler;
  let service: jest.Mocked<IDeliveryService>;
  beforeEach(() => {
    service = { schedule: jest.fn() } as unknown as jest.Mocked<IDeliveryService>;
    handler = new ScheduleDeliveryHandler(service);
  });
  it('delegates to service.schedule', async () => {
    const dto = { orderId: FIXTURE_ID } as never;
    service.schedule.mockResolvedValue(DeliveryMapper.toResponse(makeDeliveryEntityStub()));
    await handler.execute(new ScheduleDeliveryCommand(dto, 'admin'));
    expect(service.schedule).toHaveBeenCalledWith(dto, 'admin');
  });
});
