import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AddDeliveryAttemptCommand } from './add-delivery-attempt.command.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '../../services/interfaces/delivery.service.interface.js';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery/delivery-response.dto.js';

@CommandHandler(AddDeliveryAttemptCommand)
export class AddDeliveryAttemptHandler implements ICommandHandler<AddDeliveryAttemptCommand, DeliveryResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(c: AddDeliveryAttemptCommand): Promise<DeliveryResponseDTO> { return this.service.addAttempt(c.dto, c.actorId); }
}
