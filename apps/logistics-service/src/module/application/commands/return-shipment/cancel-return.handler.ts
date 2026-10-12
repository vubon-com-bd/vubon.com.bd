import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CancelReturnCommand } from './cancel-return.command.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '../../services/interfaces/return-shipment.service.interface.js';
import type { ReturnShipmentResponseDTO } from '../../dtos/responses/return-shipment/return-shipment-response.dto.js';

@CommandHandler(CancelReturnCommand)
export class CancelReturnHandler implements ICommandHandler<CancelReturnCommand, ReturnShipmentResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(c: CancelReturnCommand): Promise<ReturnShipmentResponseDTO> { return this.service.cancel(c.dto, c.actorId); }
}
