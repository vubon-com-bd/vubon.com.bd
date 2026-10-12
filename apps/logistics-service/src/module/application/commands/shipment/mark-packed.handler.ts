import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkPackedCommand } from './mark-packed.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '../../services/interfaces/shipment.service.interface.js';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment/shipment-response.dto.js';

@CommandHandler(MarkPackedCommand)
export class MarkPackedHandler implements ICommandHandler<MarkPackedCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: MarkPackedCommand): Promise<ShipmentResponseDTO> {
    return this.service.markPacked(c.shipmentId, c.actorId);
  }
}
