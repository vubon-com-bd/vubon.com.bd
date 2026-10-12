import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeliverShipmentCommand } from './deliver-shipment.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '../../services/interfaces/shipment.service.interface.js';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment/shipment-response.dto.js';

@CommandHandler(DeliverShipmentCommand)
export class DeliverShipmentHandler implements ICommandHandler<DeliverShipmentCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: DeliverShipmentCommand): Promise<ShipmentResponseDTO> {
    return this.service.deliver(c.dto, c.actorId);
  }
}
