import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RequestRefundCommand } from './request-refund.command';
import type { RefundRepository } from '../../../domain/repositories/refund.repository.interface';
import type { RefundResponseDTO } from '../../dtos/responses/refund-response.dto';
import { RefundOperationFailedError } from '../../errors/refund.errors';

@CommandHandler(RequestRefundCommand)
export class RequestRefundHandler
  extends BaseCommandHandler<RequestRefundCommand, RefundResponseDTO>
  implements ICommandHandler<RequestRefundCommand>
{
  readonly commandType = 'refund.request';

  constructor(
    @Inject('RefundRepository')
    private readonly refundRepo: RefundRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RequestRefundCommand): Promise<RefundResponseDTO> {
    void this.refundRepo;
    void command;
    throw new RefundOperationFailedError('not yet wired');
  }
}
