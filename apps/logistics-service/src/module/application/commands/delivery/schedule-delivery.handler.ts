import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ScheduleDeliveryCommand } from './schedule-delivery.command.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '@application/services/interfaces/delivery.service.interface';
import type { DeliveryResponseDTO } from '@application/dtos/responses/delivery/index.js';

@CommandHandler(ScheduleDeliveryCommand)
export class ScheduleDeliveryHandler implements ICommandHandler<ScheduleDeliveryCommand, DeliveryResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(c: ScheduleDeliveryCommand): Promise<DeliveryResponseDTO> {
    return this.service.schedule(c.dto, c.actorId);
  }
}
