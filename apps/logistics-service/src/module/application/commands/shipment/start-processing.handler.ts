import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StartProcessingCommand } from './start-processing.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '../../services/interfaces/shipment.service.interface.js';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment/shipment-response.dto.js';

@CommandHandler(StartProcessingCommand)
export class StartProcessingHandler implements ICommandHandler<StartProcessingCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: StartProcessingCommand): Promise<ShipmentResponseDTO> {
    return this.service.startProcessing(c.shipmentId, c.actorId);
  }
}
