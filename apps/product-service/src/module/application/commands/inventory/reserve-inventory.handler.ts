import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ReserveInventoryCommand } from './reserve-inventory.command';
import type { ProductInventoryServiceInterface } from '../../services/interfaces/product-inventory.service.interface';

@CommandHandler(ReserveInventoryCommand)
export class ReserveInventoryHandler
  extends BaseCommandHandler<ReserveInventoryCommand, void>
  implements ICommandHandler<ReserveInventoryCommand>
{
  readonly commandType = 'product.inventory.reserve';

  constructor(
    private readonly inventoryService: ProductInventoryServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ReserveInventoryCommand): Promise<void> {
    await this.inventoryService.reserve(
      command.productId,
      command.quantity,
      command.orderId,
    );
  }
}
