import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ConfirmShipmentCommand } from './confirm-shipment.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '@application/services/interfaces/shipment.service.interface';
import type { ShipmentResponseDTO } from '@application/dtos/responses/shipment/index.js';

@CommandHandler(ConfirmShipmentCommand)
export class ConfirmShipmentHandler implements ICommandHandler<ConfirmShipmentCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: ConfirmShipmentCommand): Promise<ShipmentResponseDTO> {
    return this.service.confirm(c.dto, c.actorId);
  }
}
