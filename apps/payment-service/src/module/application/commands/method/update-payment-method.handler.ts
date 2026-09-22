import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdatePaymentMethodCommand } from './update-payment-method.command';
import type { PaymentMethodRepository } from '../../../domain/repositories/payment-method.repository.interface';
import type { MethodResponseDTO } from '../../dtos/responses/method-response.dto';
import { MethodOperationFailedError } from '../../errors/method.errors';

@CommandHandler(UpdatePaymentMethodCommand)
export class UpdatePaymentMethodHandler
  extends BaseCommandHandler<UpdatePaymentMethodCommand, MethodResponseDTO>
  implements ICommandHandler<UpdatePaymentMethodCommand>
{
  readonly commandType = 'method.update';

  constructor(
    @Inject('PaymentMethodRepository')
    private readonly methodRepo: PaymentMethodRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdatePaymentMethodCommand): Promise<MethodResponseDTO> {
    void this.methodRepo;
    void command;
    throw new MethodOperationFailedError('not yet wired');
  }
}
