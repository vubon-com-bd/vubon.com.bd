import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AddMultipleItemsCommand } from './add-multiple-items.command';
import type { OrderItemServiceInterface } from '../../services/interfaces/order-item.service.interface';
import type { OrderItemResponseDTO } from '../../dtos/responses/order-item-response.dto';

@CommandHandler(AddMultipleItemsCommand)
export class AddMultipleItemsHandler
  extends BaseCommandHandler<AddMultipleItemsCommand, readonly OrderItemResponseDTO[]>
  implements ICommandHandler<AddMultipleItemsCommand>
{
  readonly commandType = 'order.item.add-multiple';

  constructor(
    private readonly itemService: OrderItemServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(
    command: AddMultipleItemsCommand,
  ): Promise<readonly OrderItemResponseDTO[]> {
    const results: OrderItemResponseDTO[] = [];
    for (const item of command.items) {
      const dto = await this.itemService.add({
        orderId: command.orderId,
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        variantId: item.variantId,
      });
      results.push(dto);
    }
    return results;
  }
}
