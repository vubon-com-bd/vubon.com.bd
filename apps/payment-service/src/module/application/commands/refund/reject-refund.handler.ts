/**
 * RejectRefundHandler
 * @module payment-service/application/commands/refund
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RejectRefundCommand } from './reject-refund.command.js';
import {
  REFUND_SERVICE,
  type IRefundService,
} from '@application/services/interfaces/refund.service.interface.js';
import type { RefundResponseDTO } from '@application/dtos/responses/refund-response.dto.js';

@CommandHandler(RejectRefundCommand)
export class RejectRefundHandler
  implements ICommandHandler<RejectRefundCommand, RefundResponseDTO>
{
  constructor(
    @Inject(REFUND_SERVICE)
    private readonly service: IRefundService,
  ) {}
  async execute(c: RejectRefundCommand): Promise<RefundResponseDTO> {
    return this.service.reject(c.dto, c.rejectedBy);
  }
}
