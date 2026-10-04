import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ProcessRefundCommand } from './process-refund.command.js';
import {
  REFUND_SERVICE,
  type IRefundService,
} from '../../services/interfaces/refund.service.interface.js';
import type { RefundResponseDTO } from '../../dtos/responses/refund-response.dto.js';

@CommandHandler(ProcessRefundCommand)
export class ProcessRefundHandler
  implements ICommandHandler<ProcessRefundCommand, RefundResponseDTO>
{
  constructor(@Inject(REFUND_SERVICE) private readonly service: IRefundService) {}

  async execute(c: ProcessRefundCommand): Promise<RefundResponseDTO> {
    return this.service.process(c.dto, c.actorId);
  }
}
