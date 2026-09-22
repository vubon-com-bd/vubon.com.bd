import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { InitiatePaymentCommand } from './initiate-payment.command';
import type { PaymentRepository } from '../../../domain/repositories/payment.repository.interface';
import type { PaymentResponseDTO } from '../../dtos/responses/payment-response.dto';
import { PaymentOperationFailedError } from '../../errors/payment.errors';

@CommandHandler(InitiatePaymentCommand)
export class InitiatePaymentHandler
  extends BaseCommandHandler<InitiatePaymentCommand, PaymentResponseDTO>
  implements ICommandHandler<InitiatePaymentCommand>
{
  readonly commandType = 'payment.initiate';

  constructor(
    @Inject('PaymentRepository')
    private readonly paymentRepo: PaymentRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: InitiatePaymentCommand): Promise<PaymentResponseDTO> {
    void this.paymentRepo;
    void command;
    throw new PaymentOperationFailedError('not yet wired');
  }
}
