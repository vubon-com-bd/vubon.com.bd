import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CompleteRefundCommand } from './complete-refund.command.js';
import {
  REFUND_SERVICE,
  type IRefundService,
} from '../../services/interfaces/refund.service.interface.js';
import type { RefundResponseDTO } from '../../dtos/responses/refund-response.dto.js';

@CommandHandler(CompleteRefundCommand)
export class CompleteRefundHandler
  implements ICommandHandler<CompleteRefundCommand, RefundResponseDTO>
{
  constructor(@Inject(REFUND_SERVICE) private readonly service: IRefundService) {}

  async execute(c: CompleteRefundCommand): Promise<RefundResponseDTO> {
    return this.service.complete(c.dto, c.actorId);
  }
}
