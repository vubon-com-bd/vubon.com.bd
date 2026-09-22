import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RemoveVariantCommand } from './remove-variant.command';
import type { ProductVariantServiceInterface } from '../../services/interfaces/product-variant.service.interface';

@CommandHandler(RemoveVariantCommand)
export class RemoveVariantHandler
  extends BaseCommandHandler<RemoveVariantCommand, void>
  implements ICommandHandler<RemoveVariantCommand>
{
  readonly commandType = 'product.variant.remove';

  constructor(
    private readonly variantService: ProductVariantServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RemoveVariantCommand): Promise<void> {
    await this.variantService.remove(command.variantId);
  }
}
