import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SetDefaultMethodCommand } from './set-default-method.command';
import type { PaymentMethodRepository } from '../../../domain/repositories/payment-method.repository.interface';
import { PaymentMethodIdVO } from '../../../domain/value-objects/primitives/payment-method-id.vo';
import type { MethodResponseDTO } from '../../dtos/responses/method-response.dto';
import { MethodOperationFailedError } from '../../errors/method.errors';

@CommandHandler(SetDefaultMethodCommand)
export class SetDefaultMethodHandler
  extends BaseCommandHandler<SetDefaultMethodCommand, MethodResponseDTO>
  implements ICommandHandler<SetDefaultMethodCommand>
{
  readonly commandType = 'method.set-default';

  constructor(
    @Inject('PaymentMethodRepository')
    private readonly methodRepo: PaymentMethodRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SetDefaultMethodCommand): Promise<MethodResponseDTO> {
    const entity = await this.methodRepo.findById(
      PaymentMethodIdVO.create(command.methodId),
    );
    if (!entity) {
      throw new MethodOperationFailedError('method not found');
    }
    const updated = entity.setAsDefault();
    await this.methodRepo.save(updated);
    return {
      id: updated.id.value,
      type: updated.type.value,
      provider: updated.provider?.value ?? null,
      cardLast4: updated.cardLast4,
      cardBrand: updated.cardBrand,
      isDefault: updated.isDefault,
      isActive: updated.isActive,
      createdAt: updated.createdAt,
    };
  }
}
