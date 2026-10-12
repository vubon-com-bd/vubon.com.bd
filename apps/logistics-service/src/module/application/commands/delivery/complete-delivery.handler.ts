import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CompleteDeliveryCommand } from './complete-delivery.command.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '../../services/interfaces/delivery.service.interface.js';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery/delivery-response.dto.js';

@CommandHandler(CompleteDeliveryCommand)
export class CompleteDeliveryHandler implements ICommandHandler<CompleteDeliveryCommand, DeliveryResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(c: CompleteDeliveryCommand): Promise<DeliveryResponseDTO> { return this.service.complete(c.dto, c.actorId); }
}
