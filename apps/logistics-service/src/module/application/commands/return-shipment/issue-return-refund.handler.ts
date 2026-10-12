import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IssueReturnRefundCommand } from './issue-return-refund.command.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '../../services/interfaces/return-shipment.service.interface.js';
import type { ReturnShipmentResponseDTO } from '../../dtos/responses/return-shipment/return-shipment-response.dto.js';

@CommandHandler(IssueReturnRefundCommand)
export class IssueReturnRefundHandler implements ICommandHandler<IssueReturnRefundCommand, ReturnShipmentResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(c: IssueReturnRefundCommand): Promise<ReturnShipmentResponseDTO> { return this.service.issueRefund(c.dto, c.actorId); }
}
