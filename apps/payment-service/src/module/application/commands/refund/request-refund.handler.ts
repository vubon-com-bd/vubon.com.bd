import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RequestRefundCommand } from './request-refund.command.js';
import {
  REFUND_SERVICE,
  type IRefundService,
} from '../../services/interfaces/refund.service.interface.js';
import type { RefundRequestResponseDTO } from '../../dtos/responses/refund-response.dto.js';

@CommandHandler(RequestRefundCommand)
export class RequestRefundHandler
  implements ICommandHandler<RequestRefundCommand, RefundRequestResponseDTO>
{
  constructor(@Inject(REFUND_SERVICE) private readonly service: IRefundService) {}

  async execute(c: RequestRefundCommand): Promise<RefundRequestResponseDTO> {
    return this.service.request(c.dto, c.actorId);
  }
}
