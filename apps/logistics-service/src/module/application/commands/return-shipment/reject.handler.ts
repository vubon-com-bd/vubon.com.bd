import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RejectReturnShipmentCommand } from './reject.command.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '@application/services/interfaces/return-shipment.service.interface';
import type { ReturnShipmentResponseDTO } from '@application/dtos/responses/return-shipment/index.js';

@CommandHandler(RejectReturnShipmentCommand)
export class RejectReturnShipmentHandler implements ICommandHandler<RejectReturnShipmentCommand, ReturnShipmentResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(c: RejectReturnShipmentCommand): Promise<ReturnShipmentResponseDTO> { return this.service.reject(c.dto, c.actorId); }
}
