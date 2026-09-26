import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AdjustInventoryCommand } from './adjust-inventory.command';
import type { ProductInventoryServiceInterface } from '../../services/interfaces/product-inventory.service.interface';
import type { InventoryResponseDTO } from '../../dtos/responses/inventory-response.dto';

@CommandHandler(AdjustInventoryCommand)
export class AdjustInventoryHandler
  extends BaseCommandHandler<AdjustInventoryCommand, InventoryResponseDTO>
  implements ICommandHandler<AdjustInventoryCommand>
{
  readonly commandType = 'product.inventory.adjust';

  constructor(
    private readonly inventoryService: ProductInventoryServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: AdjustInventoryCommand): Promise<InventoryResponseDTO> {
    void command.reason;
    return this.inventoryService.adjust(command.productId, command.delta);
  }
}
