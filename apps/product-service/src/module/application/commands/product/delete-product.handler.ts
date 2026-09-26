import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeleteProductCommand } from './delete-product.command';
import type { ProductServiceInterface } from '../../services/interfaces/product.service.interface';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  extends BaseCommandHandler<DeleteProductCommand, void>
  implements ICommandHandler<DeleteProductCommand>
{
  readonly commandType = 'product.delete';

  constructor(
    private readonly productService: ProductServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: DeleteProductCommand): Promise<void> {
    await this.productService.delete(command.productId);
  }
}
