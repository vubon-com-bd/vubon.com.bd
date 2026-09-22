import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { VerifyPaymentCommand } from './verify-payment.command';
import type { PaymentRepository } from '../../../domain/repositories/payment.repository.interface';
import type { PaymentVerifyResponseDTO } from '../../dtos/responses/payment-response.dto';
import { PaymentOperationFailedError } from '../../errors/payment.errors';

@CommandHandler(VerifyPaymentCommand)
export class VerifyPaymentHandler
  extends BaseCommandHandler<VerifyPaymentCommand, PaymentVerifyResponseDTO>
  implements ICommandHandler<VerifyPaymentCommand>
{
  readonly commandType = 'payment.verify';

  constructor(
    @Inject('PaymentRepository')
    private readonly paymentRepo: PaymentRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: VerifyPaymentCommand): Promise<PaymentVerifyResponseDTO> {
    void this.paymentRepo;
    void command;
    throw new PaymentOperationFailedError('not yet wired');
  }
}
