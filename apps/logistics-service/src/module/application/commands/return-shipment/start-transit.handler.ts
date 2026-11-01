import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StartTransitReturnShipmentCommand } from './start-transit.command.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '@application/services/interfaces/return-shipment.service.interface';
import type { ReturnShipmentResponseDTO } from '@application/dtos/responses/return-shipment/index.js';

@CommandHandler(StartTransitReturnShipmentCommand)
export class StartTransitReturnShipmentHandler implements ICommandHandler<StartTransitReturnShipmentCommand, ReturnShipmentResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(c: StartTransitReturnShipmentCommand): Promise<ReturnShipmentResponseDTO> { return this.service.startTransit(c.dto, c.actorId); }
}
