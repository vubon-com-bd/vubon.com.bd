import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FailDeliveryCommand } from './fail-delivery.command.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '../../services/interfaces/delivery.service.interface.js';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery/delivery-response.dto.js';

@CommandHandler(FailDeliveryCommand)
export class FailDeliveryHandler implements ICommandHandler<FailDeliveryCommand, DeliveryResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(c: FailDeliveryCommand): Promise<DeliveryResponseDTO> { return this.service.fail(c.dto, c.actorId); }
}
