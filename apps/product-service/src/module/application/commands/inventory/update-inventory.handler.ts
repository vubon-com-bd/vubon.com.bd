import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateInventoryCommand } from './update-inventory.command';
import type { ProductInventoryServiceInterface } from '../../services/interfaces/product-inventory.service.interface';
import type { InventoryResponseDTO } from '../../dtos/responses/inventory-response.dto';

@CommandHandler(UpdateInventoryCommand)
export class UpdateInventoryHandler
  extends BaseCommandHandler<UpdateInventoryCommand, InventoryResponseDTO>
  implements ICommandHandler<UpdateInventoryCommand>
{
  readonly commandType = 'product.inventory.update';

  constructor(
    private readonly inventoryService: ProductInventoryServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateInventoryCommand): Promise<InventoryResponseDTO> {
    return this.inventoryService.updateQuantity(command.productId, command.quantity);
  }
}
