import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { PartialRefundCommand } from './partial-refund.command';
import type { RefundRepository } from '../../../domain/repositories/refund.repository.interface';
import type { PaymentRepository } from '../../../domain/repositories/payment.repository.interface';
import { PaymentIdVO } from '../../../domain/value-objects/primitives/payment-id.vo';
import type { RefundResponseDTO } from '../../dtos/responses/refund-response.dto';
import { RefundOperationFailedError } from '../../errors/refund.errors';

@CommandHandler(PartialRefundCommand)
export class PartialRefundHandler
  extends BaseCommandHandler<PartialRefundCommand, RefundResponseDTO>
  implements ICommandHandler<PartialRefundCommand>
{
  readonly commandType = 'refund.partial';

  constructor(
    @Inject('RefundRepository')
    private readonly refundRepo: RefundRepository,
    @Inject('PaymentRepository')
    private readonly paymentRepo: PaymentRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: PartialRefundCommand): Promise<RefundResponseDTO> {
    const payment = await this.paymentRepo.findById(
      PaymentIdVO.create(command.paymentId),
    );
    if (!payment) {
      throw new RefundOperationFailedError('payment not found');
    }
    void this.refundRepo;
    void this.eventBus;
    throw new RefundOperationFailedError('not yet wired');
  }
}
