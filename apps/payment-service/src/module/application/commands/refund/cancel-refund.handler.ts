import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CancelRefundCommand } from './cancel-refund.command.js';
import {
  REFUND_SERVICE,
  type IRefundService,
} from '../../services/interfaces/refund.service.interface.js';
import type { RefundResponseDTO } from '../../dtos/responses/refund-response.dto.js';

@CommandHandler(CancelRefundCommand)
export class CancelRefundHandler
  implements ICommandHandler<CancelRefundCommand, RefundResponseDTO>
{
  constructor(@Inject(REFUND_SERVICE) private readonly service: IRefundService) {}

  async execute(c: CancelRefundCommand): Promise<RefundResponseDTO> {
    return this.service.cancel(c.dto, c.actorId);
  }
}
