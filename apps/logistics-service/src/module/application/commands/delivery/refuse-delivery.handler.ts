import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RefuseDeliveryCommand } from './refuse-delivery.command.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '@application/services/interfaces/delivery.service.interface';
import type { DeliveryResponseDTO } from '@application/dtos/responses/delivery/index.js';

@CommandHandler(RefuseDeliveryCommand)
export class RefuseDeliveryHandler implements ICommandHandler<RefuseDeliveryCommand, DeliveryResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(c: RefuseDeliveryCommand): Promise<DeliveryResponseDTO> {
    return this.service.refuse(c.dto, c.actorId);
  }
}
