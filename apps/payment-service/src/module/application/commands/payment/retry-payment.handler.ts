import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RetryPaymentCommand } from './retry-payment.command';
import type { PaymentRepository } from '../../../domain/repositories/payment.repository.interface';
import { PaymentIdVO } from '../../../domain/value-objects/primitives/payment-id.vo';
import type { PaymentResponseDTO } from '../../dtos/responses/payment-response.dto';
import { PaymentOperationFailedError } from '../../errors/payment.errors';

@CommandHandler(RetryPaymentCommand)
export class RetryPaymentHandler
  extends BaseCommandHandler<RetryPaymentCommand, PaymentResponseDTO>
  implements ICommandHandler<RetryPaymentCommand>
{
  readonly commandType = 'payment.retry';

  constructor(
    @Inject('PaymentRepository')
    private readonly paymentRepo: PaymentRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RetryPaymentCommand): Promise<PaymentResponseDTO> {
    const entity = await this.paymentRepo.findById(
      PaymentIdVO.create(command.paymentId),
    );
    if (!entity) {
      throw new PaymentOperationFailedError('payment not found');
    }
    void this.eventBus;
    throw new PaymentOperationFailedError('not yet wired');
  }
}
