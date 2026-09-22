import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeletePaymentMethodCommand } from './delete-payment-method.command';
import type { PaymentMethodRepository } from '../../../domain/repositories/payment-method.repository.interface';
import { PaymentMethodIdVO } from '../../../domain/value-objects/primitives/payment-method-id.vo';
import { MethodOperationFailedError } from '../../errors/method.errors';

@CommandHandler(DeletePaymentMethodCommand)
export class DeletePaymentMethodHandler
  extends BaseCommandHandler<DeletePaymentMethodCommand, void>
  implements ICommandHandler<DeletePaymentMethodCommand>
{
  readonly commandType = 'method.delete';

  constructor(
    @Inject('PaymentMethodRepository')
    private readonly methodRepo: PaymentMethodRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: DeletePaymentMethodCommand): Promise<void> {
    const existing = await this.methodRepo.findById(
      PaymentMethodIdVO.create(command.methodId),
    );
    if (!existing) {
      throw new MethodOperationFailedError('method not found');
    }
    await this.methodRepo.delete(PaymentMethodIdVO.create(command.methodId));
  }
}
