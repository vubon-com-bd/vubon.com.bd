import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CancelReturnShipmentCommand } from './cancel.command.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '@application/services/interfaces/return-shipment.service.interface';
import type { ReturnShipmentResponseDTO } from '@application/dtos/responses/return-shipment/index.js';

@CommandHandler(CancelReturnShipmentCommand)
export class CancelReturnShipmentHandler implements ICommandHandler<CancelReturnShipmentCommand, ReturnShipmentResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(c: CancelReturnShipmentCommand): Promise<ReturnShipmentResponseDTO> { return this.service.cancel(c.dto, c.actorId); }
}
