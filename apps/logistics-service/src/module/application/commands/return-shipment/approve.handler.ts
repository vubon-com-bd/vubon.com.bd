import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ApproveReturnShipmentCommand } from './approve.command.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '@application/services/interfaces/return-shipment.service.interface';
import type { ReturnShipmentResponseDTO } from '@application/dtos/responses/return-shipment/index.js';

@CommandHandler(ApproveReturnShipmentCommand)
export class ApproveReturnShipmentHandler implements ICommandHandler<ApproveReturnShipmentCommand, ReturnShipmentResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(c: ApproveReturnShipmentCommand): Promise<ReturnShipmentResponseDTO> { return this.service.approve(c.dto, c.actorId); }
}
