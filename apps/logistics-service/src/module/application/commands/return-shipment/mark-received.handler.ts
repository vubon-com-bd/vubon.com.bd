import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkReceivedReturnShipmentCommand } from './mark-received.command.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '@application/services/interfaces/return-shipment.service.interface';
import type { ReturnShipmentResponseDTO } from '@application/dtos/responses/return-shipment/index.js';

@CommandHandler(MarkReceivedReturnShipmentCommand)
export class MarkReceivedReturnShipmentHandler implements ICommandHandler<MarkReceivedReturnShipmentCommand, ReturnShipmentResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(c: MarkReceivedReturnShipmentCommand): Promise<ReturnShipmentResponseDTO> { return this.service.markReceived(c.dto, c.actorId); }
}
