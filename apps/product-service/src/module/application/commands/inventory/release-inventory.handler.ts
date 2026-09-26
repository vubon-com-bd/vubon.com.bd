import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ReleaseInventoryCommand } from './release-inventory.command';
import type { ProductInventoryServiceInterface } from '../../services/interfaces/product-inventory.service.interface';

@CommandHandler(ReleaseInventoryCommand)
export class ReleaseInventoryHandler
  extends BaseCommandHandler<ReleaseInventoryCommand, void>
  implements ICommandHandler<ReleaseInventoryCommand>
{
  readonly commandType = 'product.inventory.release';

  constructor(
    private readonly inventoryService: ProductInventoryServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ReleaseInventoryCommand): Promise<void> {
    await this.inventoryService.release(
      command.productId,
      command.quantity,
      command.orderId,
    );
  }
}
