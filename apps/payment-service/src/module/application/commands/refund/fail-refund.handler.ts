import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FailRefundCommand } from './fail-refund.command.js';
import {
  REFUND_SERVICE,
  type IRefundService,
} from '../../services/interfaces/refund.service.interface.js';
import type { RefundResponseDTO } from '../../dtos/responses/refund-response.dto.js';

@CommandHandler(FailRefundCommand)
export class FailRefundHandler
  implements ICommandHandler<FailRefundCommand, RefundResponseDTO>
{
  constructor(@Inject(REFUND_SERVICE) private readonly service: IRefundService) {}

  async execute(c: FailRefundCommand): Promise<RefundResponseDTO> {
    return this.service.fail(c.dto, c.actorId);
  }
}
