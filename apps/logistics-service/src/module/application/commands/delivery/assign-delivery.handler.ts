import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AssignDeliveryCommand } from './assign-delivery.command.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '@application/services/interfaces/delivery.service.interface';
import type { DeliveryResponseDTO } from '@application/dtos/responses/delivery/index.js';

@CommandHandler(AssignDeliveryCommand)
export class AssignDeliveryHandler implements ICommandHandler<AssignDeliveryCommand, DeliveryResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(c: AssignDeliveryCommand): Promise<DeliveryResponseDTO> {
    return this.service.assign(c.dto, c.actorId);
  }
}
