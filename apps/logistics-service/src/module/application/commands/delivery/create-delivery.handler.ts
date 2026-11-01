import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateDeliveryCommand } from './create-delivery.command.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '@application/services/interfaces/delivery.service.interface';
import type { DeliveryResponseDTO } from '@application/dtos/responses/delivery/index.js';

@CommandHandler(CreateDeliveryCommand)
export class CreateDeliveryHandler implements ICommandHandler<CreateDeliveryCommand, DeliveryResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(c: CreateDeliveryCommand): Promise<DeliveryResponseDTO> {
    return this.service.create(c.dto, c.actorId);
  }
}
