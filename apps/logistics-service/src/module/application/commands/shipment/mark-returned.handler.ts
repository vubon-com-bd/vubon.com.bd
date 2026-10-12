import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkReturnedCommand } from './mark-returned.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '../../services/interfaces/shipment.service.interface.js';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment/shipment-response.dto.js';

@CommandHandler(MarkReturnedCommand)
export class MarkReturnedHandler implements ICommandHandler<MarkReturnedCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: MarkReturnedCommand): Promise<ShipmentResponseDTO> {
    return this.service.markReturned(c.dto, c.actorId);
  }
}
