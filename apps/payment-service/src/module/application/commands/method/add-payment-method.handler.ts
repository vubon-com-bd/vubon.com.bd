import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AddPaymentMethodCommand } from './add-payment-method.command';
import type { PaymentMethodRepository } from '../../../domain/repositories/payment-method.repository.interface';
import type { MethodResponseDTO } from '../../dtos/responses/method-response.dto';
import { MethodOperationFailedError } from '../../errors/method.errors';

@CommandHandler(AddPaymentMethodCommand)
export class AddPaymentMethodHandler
  extends BaseCommandHandler<AddPaymentMethodCommand, MethodResponseDTO>
  implements ICommandHandler<AddPaymentMethodCommand>
{
  readonly commandType = 'method.add';

  constructor(
    @Inject('PaymentMethodRepository')
    private readonly methodRepo: PaymentMethodRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: AddPaymentMethodCommand): Promise<MethodResponseDTO> {
    void this.methodRepo;
    void command;
    throw new MethodOperationFailedError('not yet wired');
  }
}
