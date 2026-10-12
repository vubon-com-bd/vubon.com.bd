import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkInTransitCommand } from './mark-in-transit.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '../../services/interfaces/shipment.service.interface.js';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment/shipment-response.dto.js';

@CommandHandler(MarkInTransitCommand)
export class MarkInTransitHandler implements ICommandHandler<MarkInTransitCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: MarkInTransitCommand): Promise<ShipmentResponseDTO> {
    return this.service.markInTransit(c.shipmentId, c.actorId);
  }
}
