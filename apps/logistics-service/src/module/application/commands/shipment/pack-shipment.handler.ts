import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PackShipmentCommand } from './pack-shipment.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '@application/services/interfaces/shipment.service.interface';
import type { ShipmentResponseDTO } from '@application/dtos/responses/shipment/index.js';

@CommandHandler(PackShipmentCommand)
export class PackShipmentHandler implements ICommandHandler<PackShipmentCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: PackShipmentCommand): Promise<ShipmentResponseDTO> {
    return this.service.pack(c.dto, c.actorId);
  }
}
