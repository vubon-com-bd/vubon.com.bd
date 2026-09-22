import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RejectRefundCommand } from './reject-refund.command';
import type { RefundRepository } from '../../../domain/repositories/refund.repository.interface';
import { RefundIdVO } from '../../../domain/value-objects/primitives/refund-id.vo';
import type { RefundResponseDTO } from '../../dtos/responses/refund-response.dto';
import { RefundOperationFailedError } from '../../errors/refund.errors';

@CommandHandler(RejectRefundCommand)
export class RejectRefundHandler
  extends BaseCommandHandler<RejectRefundCommand, RefundResponseDTO>
  implements ICommandHandler<RejectRefundCommand>
{
  readonly commandType = 'refund.reject';

  constructor(
    @Inject('RefundRepository')
    private readonly refundRepo: RefundRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RejectRefundCommand): Promise<RefundResponseDTO> {
    const entity = await this.refundRepo.findById(RefundIdVO.create(command.refundId));
    if (!entity) {
      throw new RefundOperationFailedError('refund not found');
    }
    void this.eventBus;
    throw new RefundOperationFailedError('not yet wired');
  }
}
