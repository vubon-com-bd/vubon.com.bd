import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AssignDeliveryDriverCommand } from './assign-delivery-driver.command.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '../../services/interfaces/delivery.service.interface.js';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery/delivery-response.dto.js';

@CommandHandler(AssignDeliveryDriverCommand)
export class AssignDeliveryDriverHandler implements ICommandHandler<AssignDeliveryDriverCommand, DeliveryResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(c: AssignDeliveryDriverCommand): Promise<DeliveryResponseDTO> { return this.service.assignDriver(c.dto, c.actorId); }
}
