import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ArriveDeliveryCommand } from './arrive-delivery.command.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '@application/services/interfaces/delivery.service.interface';
import type { DeliveryResponseDTO } from '@application/dtos/responses/delivery/index.js';

@CommandHandler(ArriveDeliveryCommand)
export class ArriveDeliveryHandler implements ICommandHandler<ArriveDeliveryCommand, DeliveryResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(c: ArriveDeliveryCommand): Promise<DeliveryResponseDTO> {
    return this.service.arrive(c.dto, c.actorId);
  }
}
