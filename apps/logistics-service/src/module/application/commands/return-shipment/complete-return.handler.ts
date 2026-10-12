import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CompleteReturnCommand } from './complete-return.command.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '../../services/interfaces/return-shipment.service.interface.js';
import type { ReturnShipmentResponseDTO } from '../../dtos/responses/return-shipment/return-shipment-response.dto.js';

@CommandHandler(CompleteReturnCommand)
export class CompleteReturnHandler implements ICommandHandler<CompleteReturnCommand, ReturnShipmentResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(c: CompleteReturnCommand): Promise<ReturnShipmentResponseDTO> { return this.service.complete(c.dto, c.actorId); }
}
