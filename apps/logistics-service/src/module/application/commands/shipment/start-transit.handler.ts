import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StartTransitCommand } from './start-transit.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '@application/services/interfaces/shipment.service.interface';
import type { ShipmentResponseDTO } from '@application/dtos/responses/shipment/index.js';

@CommandHandler(StartTransitCommand)
export class StartTransitHandler implements ICommandHandler<StartTransitCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: StartTransitCommand): Promise<ShipmentResponseDTO> {
    return this.service.startTransit(c.dto, c.actorId);
  }
}
