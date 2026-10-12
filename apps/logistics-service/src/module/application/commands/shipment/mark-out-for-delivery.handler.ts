import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkOutForDeliveryCommand } from './mark-out-for-delivery.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '../../services/interfaces/shipment.service.interface.js';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment/shipment-response.dto.js';

@CommandHandler(MarkOutForDeliveryCommand)
export class MarkOutForDeliveryHandler implements ICommandHandler<MarkOutForDeliveryCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: MarkOutForDeliveryCommand): Promise<ShipmentResponseDTO> {
    return this.service.markOutForDelivery(c.shipmentId, c.actorId);
  }
}
