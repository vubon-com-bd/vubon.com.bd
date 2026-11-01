import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeliveryStartTransitCommand } from './start-transit-delivery.command.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '@application/services/interfaces/delivery.service.interface';
import type { DeliveryResponseDTO } from '@application/dtos/responses/delivery/index.js';

@CommandHandler(DeliveryStartTransitCommand)
export class DeliveryStartTransitHandler implements ICommandHandler<DeliveryStartTransitCommand, DeliveryResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(c: DeliveryStartTransitCommand): Promise<DeliveryResponseDTO> {
    return this.service.startTransit(c.dto, c.actorId);
  }
}
