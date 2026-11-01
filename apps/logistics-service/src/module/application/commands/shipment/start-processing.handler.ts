import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StartProcessingCommand } from './start-processing.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '@application/services/interfaces/shipment.service.interface';
import type { ShipmentResponseDTO } from '@application/dtos/responses/shipment/index.js';

@CommandHandler(StartProcessingCommand)
export class StartProcessingHandler implements ICommandHandler<StartProcessingCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: StartProcessingCommand): Promise<ShipmentResponseDTO> {
    return this.service.startProcessing(c.dto, c.actorId);
  }
}
