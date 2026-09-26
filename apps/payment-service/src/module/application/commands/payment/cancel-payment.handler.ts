import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CancelPaymentCommand } from './cancel-payment.command';
import type { PaymentRepository } from '../../../domain/repositories/payment.repository.interface';
import type { PaymentResponseDTO } from '../../dtos/responses/payment-response.dto';
import { PaymentOperationFailedError } from '../../errors/payment.errors';

@CommandHandler(CancelPaymentCommand)
export class CancelPaymentHandler
  extends BaseCommandHandler<CancelPaymentCommand, PaymentResponseDTO>
  implements ICommandHandler<CancelPaymentCommand>
{
  readonly commandType = 'payment.cancel';

  constructor(
    @Inject('PaymentRepository')
    private readonly paymentRepo: PaymentRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CancelPaymentCommand): Promise<PaymentResponseDTO> {
    void this.paymentRepo;
    void command;
    throw new PaymentOperationFailedError('not yet wired');
  }
}
