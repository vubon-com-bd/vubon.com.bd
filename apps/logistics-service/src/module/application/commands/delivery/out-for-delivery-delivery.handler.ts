import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeliveryOutForDeliveryCommand } from './out-for-delivery-delivery.command.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '@application/services/interfaces/delivery.service.interface';
import type { DeliveryResponseDTO } from '@application/dtos/responses/delivery/index.js';

@CommandHandler(DeliveryOutForDeliveryCommand)
export class DeliveryOutForDeliveryHandler implements ICommandHandler<DeliveryOutForDeliveryCommand, DeliveryResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(c: DeliveryOutForDeliveryCommand): Promise<DeliveryResponseDTO> {
    return this.service.outForDelivery(c.dto, c.actorId);
  }
}
