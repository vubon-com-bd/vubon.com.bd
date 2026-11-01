import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InspectReturnShipmentCommand } from './inspect.command.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '@application/services/interfaces/return-shipment.service.interface';
import type { ReturnShipmentResponseDTO } from '@application/dtos/responses/return-shipment/index.js';

@CommandHandler(InspectReturnShipmentCommand)
export class InspectReturnShipmentHandler implements ICommandHandler<InspectReturnShipmentCommand, ReturnShipmentResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(c: InspectReturnShipmentCommand): Promise<ReturnShipmentResponseDTO> { return this.service.inspect(c.dto, c.actorId); }
}
