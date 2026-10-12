import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ReleaseShipmentCommand } from './release-shipment.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '../../services/interfaces/shipment.service.interface.js';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment/shipment-response.dto.js';

@CommandHandler(ReleaseShipmentCommand)
export class ReleaseShipmentHandler implements ICommandHandler<ReleaseShipmentCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: ReleaseShipmentCommand): Promise<ShipmentResponseDTO> {
    return this.service.release(c.dto, c.actorId);
  }
}
