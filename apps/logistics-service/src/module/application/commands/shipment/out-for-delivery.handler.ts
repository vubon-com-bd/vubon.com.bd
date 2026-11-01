import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { OutForDeliveryCommand } from './out-for-delivery.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '@application/services/interfaces/shipment.service.interface';
import type { ShipmentResponseDTO } from '@application/dtos/responses/shipment/index.js';

@CommandHandler(OutForDeliveryCommand)
export class OutForDeliveryHandler implements ICommandHandler<OutForDeliveryCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: OutForDeliveryCommand): Promise<ShipmentResponseDTO> {
    return this.service.outForDelivery(c.dto, c.actorId);
  }
}
