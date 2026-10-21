/**
 * RequestRefundHandler
 * @module payment-service/application/commands/refund
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RequestRefundCommand } from './request-refund.command.js';
import {
  REFUND_SERVICE,
  type IRefundService,
} from '@application/services/interfaces/refund.service.interface.js';
import type { RefundInitiateResponseDTO } from '@application/dtos/responses/refund-response.dto.js';

@CommandHandler(RequestRefundCommand)
export class RequestRefundHandler
  implements ICommandHandler<RequestRefundCommand, RefundInitiateResponseDTO>
{
  constructor(
    @Inject(REFUND_SERVICE)
    private readonly service: IRefundService,
  ) {}
  async execute(c: RequestRefundCommand): Promise<RefundInitiateResponseDTO> {
    return this.service.request(c.dto, c.actorId);
  }
}
