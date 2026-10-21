/**
 * PartialRefundHandler
 * @module payment-service/application/commands/refund
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PartialRefundCommand } from './partial-refund.command.js';
import {
  REFUND_SERVICE,
  type IRefundService,
} from '@application/services/interfaces/refund.service.interface.js';
import type { RefundResponseDTO } from '@application/dtos/responses/refund-response.dto.js';

@CommandHandler(PartialRefundCommand)
export class PartialRefundHandler
  implements ICommandHandler<PartialRefundCommand, RefundResponseDTO>
{
  constructor(
    @Inject(REFUND_SERVICE)
    private readonly service: IRefundService,
  ) {}
  async execute(c: PartialRefundCommand): Promise<RefundResponseDTO> {
    return this.service.partial(c.dto, c.actorId);
  }
}
