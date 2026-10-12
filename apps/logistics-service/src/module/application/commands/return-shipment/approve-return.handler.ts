import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ApproveReturnCommand } from './approve-return.command.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '../../services/interfaces/return-shipment.service.interface.js';
import type { ReturnShipmentResponseDTO } from '../../dtos/responses/return-shipment/return-shipment-response.dto.js';

@CommandHandler(ApproveReturnCommand)
export class ApproveReturnHandler implements ICommandHandler<ApproveReturnCommand, ReturnShipmentResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(c: ApproveReturnCommand): Promise<ReturnShipmentResponseDTO> { return this.service.approve(c.dto, c.actorId); }
}
