import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FailShipmentCommand } from './fail-shipment.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '@application/services/interfaces/shipment.service.interface';
import type { ShipmentResponseDTO } from '@application/dtos/responses/shipment/index.js';

@CommandHandler(FailShipmentCommand)
export class FailShipmentHandler implements ICommandHandler<FailShipmentCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: FailShipmentCommand): Promise<ShipmentResponseDTO> {
    return this.service.fail(c.dto, c.actorId);
  }
}
