import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PutOnHoldCommand } from './put-on-hold.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '../../services/interfaces/shipment.service.interface.js';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment/shipment-response.dto.js';

@CommandHandler(PutOnHoldCommand)
export class PutOnHoldHandler implements ICommandHandler<PutOnHoldCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: PutOnHoldCommand): Promise<ShipmentResponseDTO> {
    return this.service.putOnHold(c.dto, c.actorId);
  }
}
