import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CompleteReturnShipmentCommand } from './complete.command.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '@application/services/interfaces/return-shipment.service.interface';
import type { ReturnShipmentResponseDTO } from '@application/dtos/responses/return-shipment/index.js';

@CommandHandler(CompleteReturnShipmentCommand)
export class CompleteReturnShipmentHandler implements ICommandHandler<CompleteReturnShipmentCommand, ReturnShipmentResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(c: CompleteReturnShipmentCommand): Promise<ReturnShipmentResponseDTO> { return this.service.complete(c.dto, c.actorId); }
}
