import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeliverShipmentCommand } from './deliver-shipment.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '@application/services/interfaces/shipment.service.interface';
import type { ShipmentResponseDTO } from '@application/dtos/responses/shipment/index.js';

@CommandHandler(DeliverShipmentCommand)
export class DeliverShipmentHandler implements ICommandHandler<DeliverShipmentCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: DeliverShipmentCommand): Promise<ShipmentResponseDTO> {
    return this.service.deliver(c.dto, c.actorId);
  }
}
