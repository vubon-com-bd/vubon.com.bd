import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CancelDeliveryCommand } from './cancel-delivery.command.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '../../services/interfaces/delivery.service.interface.js';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery/delivery-response.dto.js';

@CommandHandler(CancelDeliveryCommand)
export class CancelDeliveryHandler implements ICommandHandler<CancelDeliveryCommand, DeliveryResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(c: CancelDeliveryCommand): Promise<DeliveryResponseDTO> { return this.service.cancel(c.dto, c.actorId); }
}
