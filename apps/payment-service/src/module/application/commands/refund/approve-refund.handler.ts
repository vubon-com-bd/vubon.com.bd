/**
 * ApproveRefundHandler
 * @module payment-service/application/commands/refund
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ApproveRefundCommand } from './approve-refund.command.js';
import {
  REFUND_SERVICE,
  type IRefundService,
} from '@application/services/interfaces/refund.service.interface.js';
import type { RefundResponseDTO } from '@application/dtos/responses/refund-response.dto.js';

@CommandHandler(ApproveRefundCommand)
export class ApproveRefundHandler
  implements ICommandHandler<ApproveRefundCommand, RefundResponseDTO>
{
  constructor(
    @Inject(REFUND_SERVICE)
    private readonly service: IRefundService,
  ) {}
  async execute(c: ApproveRefundCommand): Promise<RefundResponseDTO> {
    return this.service.approve(c.dto, c.approvedBy);
  }
}
