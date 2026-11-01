import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateShipmentCommand } from './update-shipment.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '@application/services/interfaces/shipment.service.interface';
import type { ShipmentResponseDTO } from '@application/dtos/responses/shipment/index.js';

@CommandHandler(UpdateShipmentCommand)
export class UpdateShipmentHandler implements ICommandHandler<UpdateShipmentCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: UpdateShipmentCommand): Promise<ShipmentResponseDTO> {
    return this.service.update(c.dto, c.actorId);
  }
}
