import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SetDefaultVariantCommand } from './set-default-variant.command';
import type { ProductVariantServiceInterface } from '../../services/interfaces/product-variant.service.interface';

@CommandHandler(SetDefaultVariantCommand)
export class SetDefaultVariantHandler
  extends BaseCommandHandler<SetDefaultVariantCommand, void>
  implements ICommandHandler<SetDefaultVariantCommand>
{
  readonly commandType = 'product.variant.set-default';

  constructor(
    private readonly variantService: ProductVariantServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SetDefaultVariantCommand): Promise<void> {
    await this.variantService.setDefault(command.productId, command.variantId);
  }
}
