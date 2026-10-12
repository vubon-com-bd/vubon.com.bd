import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GenerateLabelCommand } from './generate-label.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '../../services/interfaces/shipment.service.interface.js';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment/shipment-response.dto.js';

@CommandHandler(GenerateLabelCommand)
export class GenerateLabelHandler implements ICommandHandler<GenerateLabelCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: GenerateLabelCommand): Promise<ShipmentResponseDTO> {
    return this.service.generateLabel(c.dto, c.actorId);
  }
}
