import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PickupShipmentCommand } from './pickup-shipment.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '../../services/interfaces/shipment.service.interface.js';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment/shipment-response.dto.js';

@CommandHandler(PickupShipmentCommand)
export class PickupShipmentHandler implements ICommandHandler<PickupShipmentCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: PickupShipmentCommand): Promise<ShipmentResponseDTO> {
    return this.service.pickup(c.dto, c.actorId);
  }
}
