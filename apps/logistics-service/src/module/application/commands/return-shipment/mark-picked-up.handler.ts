import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkPickedUpReturnShipmentCommand } from './mark-picked-up.command.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '@application/services/interfaces/return-shipment.service.interface';
import type { ReturnShipmentResponseDTO } from '@application/dtos/responses/return-shipment/index.js';

@CommandHandler(MarkPickedUpReturnShipmentCommand)
export class MarkPickedUpReturnShipmentHandler implements ICommandHandler<MarkPickedUpReturnShipmentCommand, ReturnShipmentResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(c: MarkPickedUpReturnShipmentCommand): Promise<ReturnShipmentResponseDTO> { return this.service.markPickedUp(c.dto, c.actorId); }
}
