import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ConfirmDeliveryHandler } from '@application/commands/delivery/confirm-delivery.handler.js';
import { ConfirmDeliveryCommand } from '@application/commands/delivery/confirm-delivery.command.js';
import type { IDeliveryService } from '@application/services/interfaces/delivery.service.interface.js';
import { makeDeliveryEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { DeliveryMapper } from '@application/mappers/delivery.mapper.js';

describe('ConfirmDeliveryHandler', () => {
  let handler: ConfirmDeliveryHandler;
  let service: jest.Mocked<IDeliveryService>;
  beforeEach(() => {
    service = { confirm: jest.fn() } as unknown as jest.Mocked<IDeliveryService>;
    handler = new ConfirmDeliveryHandler(service);
  });
  it('delegates to service.confirm', async () => {
    const dto = { deliveryId: FIXTURE_ID, orderId: FIXTURE_ID } as never;
    service.confirm.mockResolvedValue(DeliveryMapper.toResponse(makeDeliveryEntityStub()));
    await handler.execute(new ConfirmDeliveryCommand(dto, 'admin'));
    expect(service.confirm).toHaveBeenCalledWith(dto, 'admin');
  });
});
