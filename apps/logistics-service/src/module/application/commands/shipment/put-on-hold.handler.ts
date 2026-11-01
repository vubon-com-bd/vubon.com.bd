import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PutOnHoldCommand } from './put-on-hold.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '@application/services/interfaces/shipment.service.interface';
import type { ShipmentResponseDTO } from '@application/dtos/responses/shipment/index.js';

@CommandHandler(PutOnHoldCommand)
export class PutOnHoldHandler implements ICommandHandler<PutOnHoldCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: PutOnHoldCommand): Promise<ShipmentResponseDTO> {
    return this.service.putOnHold(c.dto, c.actorId);
  }
}
