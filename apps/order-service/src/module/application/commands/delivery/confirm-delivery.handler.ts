import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ConfirmDeliveryCommand } from './confirm-delivery.command.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '../../services/interfaces/delivery.service.interface.js';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto.js';

@CommandHandler(ConfirmDeliveryCommand)
export class ConfirmDeliveryHandler implements ICommandHandler<ConfirmDeliveryCommand, DeliveryResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(c: ConfirmDeliveryCommand): Promise<DeliveryResponseDTO> {
    return this.service.confirm(c.dto, c.actorId);
  }
}
