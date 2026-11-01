import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PickUpShipmentCommand } from './pick-up-shipment.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '@application/services/interfaces/shipment.service.interface';
import type { ShipmentResponseDTO } from '@application/dtos/responses/shipment/index.js';

@CommandHandler(PickUpShipmentCommand)
export class PickUpShipmentHandler implements ICommandHandler<PickUpShipmentCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: PickUpShipmentCommand): Promise<ShipmentResponseDTO> {
    return this.service.pickUp(c.dto, c.actorId);
  }
}
