import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CancelShipmentCommand } from './cancel-shipment.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '../../services/interfaces/shipment.service.interface.js';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment/shipment-response.dto.js';

@CommandHandler(CancelShipmentCommand)
export class CancelShipmentHandler implements ICommandHandler<CancelShipmentCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: CancelShipmentCommand): Promise<ShipmentResponseDTO> {
    return this.service.cancel(c.dto, c.actorId);
  }
}
