import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkDelayedCommand } from './mark-delayed.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '../../services/interfaces/shipment.service.interface.js';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment/shipment-response.dto.js';

@CommandHandler(MarkDelayedCommand)
export class MarkDelayedHandler implements ICommandHandler<MarkDelayedCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: MarkDelayedCommand): Promise<ShipmentResponseDTO> {
    return this.service.markDelayed(c.dto, c.actorId);
  }
}
