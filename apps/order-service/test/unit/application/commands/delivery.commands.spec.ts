import { jest } from '@jest/globals';
import { ScheduleDeliveryHandler } from '../../../../src/module/application/commands/delivery/schedule-delivery.handler.js';
import { RescheduleDeliveryHandler } from '../../../../src/module/application/commands/delivery/reschedule-delivery.handler.js';
import { ConfirmDeliveryHandler } from '../../../../src/module/application/commands/delivery/confirm-delivery.handler.js';
import { ScheduleDeliveryCommand } from '../../../../src/module/application/commands/delivery/schedule-delivery.command.js';
import { DELIVERY_COMMAND_HANDLERS } from '../../../../src/module/application/commands/delivery/index.js';

function mockService() {
  return {
    schedule: jest.fn().mockResolvedValue({}),
    reschedule: jest.fn().mockResolvedValue({}),
    confirm: jest.fn().mockResolvedValue({}),
  };
}

describe('Delivery command handlers', () => {
  let service: ReturnType<typeof mockService>;
  beforeEach(() => { service = mockService(); });

  it('ScheduleDeliveryHandler', async () => {
    const h = new ScheduleDeliveryHandler(service as never);
    await h.execute(new ScheduleDeliveryCommand({} as never, 'a'));
    expect(service.schedule).toHaveBeenCalled();
  });

  it('RescheduleDeliveryHandler', async () => {
    const h = new RescheduleDeliveryHandler(service as never);
    await h.execute({ dto: {}, actorId: 'a' } as never);
    expect(service.reschedule).toHaveBeenCalled();
  });

  it('ConfirmDeliveryHandler', async () => {
    const h = new ConfirmDeliveryHandler(service as never);
    await h.execute({ dto: {}, actorId: 'a' } as never);
    expect(service.confirm).toHaveBeenCalled();
  });

  it('DELIVERY_COMMAND_HANDLERS exports 3', () => {
    expect(DELIVERY_COMMAND_HANDLERS).toHaveLength(3);
  });
});
