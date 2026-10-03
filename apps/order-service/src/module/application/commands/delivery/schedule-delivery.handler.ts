import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ScheduleDeliveryCommand } from './schedule-delivery.command.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '../../services/interfaces/delivery.service.interface.js';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto.js';

@CommandHandler(ScheduleDeliveryCommand)
export class ScheduleDeliveryHandler implements ICommandHandler<ScheduleDeliveryCommand, DeliveryResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(c: ScheduleDeliveryCommand): Promise<DeliveryResponseDTO> {
    return this.service.schedule(c.dto, c.actorId);
  }
}
