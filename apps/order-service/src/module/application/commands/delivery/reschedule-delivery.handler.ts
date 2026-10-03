import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RescheduleDeliveryCommand } from './reschedule-delivery.command.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '../../services/interfaces/delivery.service.interface.js';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto.js';

@CommandHandler(RescheduleDeliveryCommand)
export class RescheduleDeliveryHandler implements ICommandHandler<RescheduleDeliveryCommand, DeliveryResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(c: RescheduleDeliveryCommand): Promise<DeliveryResponseDTO> {
    return this.service.reschedule(c.dto, c.actorId);
  }
}
