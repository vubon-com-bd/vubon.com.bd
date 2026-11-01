import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CompleteDeliveryCommand } from './complete-delivery.command.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '@application/services/interfaces/delivery.service.interface';
import type { DeliveryResponseDTO } from '@application/dtos/responses/delivery/index.js';

@CommandHandler(CompleteDeliveryCommand)
export class CompleteDeliveryHandler implements ICommandHandler<CompleteDeliveryCommand, DeliveryResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(c: CompleteDeliveryCommand): Promise<DeliveryResponseDTO> {
    return this.service.complete(c.dto, c.actorId);
  }
}
