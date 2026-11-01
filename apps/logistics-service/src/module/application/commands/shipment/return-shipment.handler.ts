import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ReturnShipmentCommand } from './return-shipment.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '@application/services/interfaces/shipment.service.interface';
import type { ShipmentResponseDTO } from '@application/dtos/responses/shipment/index.js';

@CommandHandler(ReturnShipmentCommand)
export class ReturnShipmentHandler implements ICommandHandler<ReturnShipmentCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: ReturnShipmentCommand): Promise<ShipmentResponseDTO> {
    return this.service.returnShipment(c.dto, c.actorId);
  }
}
