import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ConfirmShipmentCommand } from './confirm-shipment.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '../../services/interfaces/shipment.service.interface.js';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment/shipment-response.dto.js';

@CommandHandler(ConfirmShipmentCommand)
export class ConfirmShipmentHandler implements ICommandHandler<ConfirmShipmentCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: ConfirmShipmentCommand): Promise<ShipmentResponseDTO> {
    return this.service.confirm(c.shipmentId, c.actorId);
  }
}
