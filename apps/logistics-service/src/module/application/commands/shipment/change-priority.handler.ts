import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ChangePriorityCommand } from './change-priority.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '../../services/interfaces/shipment.service.interface.js';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment/shipment-response.dto.js';

@CommandHandler(ChangePriorityCommand)
export class ChangePriorityHandler implements ICommandHandler<ChangePriorityCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: ChangePriorityCommand): Promise<ShipmentResponseDTO> {
    return this.service.changePriority(c.dto, c.actorId);
  }
}
