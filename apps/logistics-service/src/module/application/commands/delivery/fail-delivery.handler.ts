import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FailDeliveryCommand } from './fail-delivery.command.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '@application/services/interfaces/delivery.service.interface';
import type { DeliveryResponseDTO } from '@application/dtos/responses/delivery/index.js';

@CommandHandler(FailDeliveryCommand)
export class FailDeliveryHandler implements ICommandHandler<FailDeliveryCommand, DeliveryResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(c: FailDeliveryCommand): Promise<DeliveryResponseDTO> {
    return this.service.fail(c.dto, c.actorId);
  }
}
