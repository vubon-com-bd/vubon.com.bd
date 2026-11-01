import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PickUpDeliveryCommand } from './pick-up-delivery.command.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '@application/services/interfaces/delivery.service.interface';
import type { DeliveryResponseDTO } from '@application/dtos/responses/delivery/index.js';

@CommandHandler(PickUpDeliveryCommand)
export class PickUpDeliveryHandler implements ICommandHandler<PickUpDeliveryCommand, DeliveryResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(c: PickUpDeliveryCommand): Promise<DeliveryResponseDTO> {
    return this.service.pickUp(c.dto, c.actorId);
  }
}
