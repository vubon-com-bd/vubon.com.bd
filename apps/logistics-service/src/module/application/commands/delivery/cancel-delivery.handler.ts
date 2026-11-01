import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CancelDeliveryCommand } from './cancel-delivery.command.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '@application/services/interfaces/delivery.service.interface';
import type { DeliveryResponseDTO } from '@application/dtos/responses/delivery/index.js';

@CommandHandler(CancelDeliveryCommand)
export class CancelDeliveryHandler implements ICommandHandler<CancelDeliveryCommand, DeliveryResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(c: CancelDeliveryCommand): Promise<DeliveryResponseDTO> {
    return this.service.cancel(c.dto, c.actorId);
  }
}
