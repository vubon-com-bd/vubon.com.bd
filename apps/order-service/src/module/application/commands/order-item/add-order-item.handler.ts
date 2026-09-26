import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AddOrderItemCommand } from './add-order-item.command';
import type { OrderItemServiceInterface } from '../../services/interfaces/order-item.service.interface';
import type { OrderItemResponseDTO } from '../../dtos/responses/order-item-response.dto';

@CommandHandler(AddOrderItemCommand)
export class AddOrderItemHandler
  extends BaseCommandHandler<AddOrderItemCommand, OrderItemResponseDTO>
  implements ICommandHandler<AddOrderItemCommand>
{
  readonly commandType = 'order.item.add';

  constructor(
    private readonly itemService: OrderItemServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: AddOrderItemCommand): Promise<OrderItemResponseDTO> {
    return this.itemService.add({
      orderId: command.orderId,
      productId: command.productId,
      productName: command.productName,
      quantity: command.quantity,
      price: command.price,
      variantId: command.variantId,
    });
  }
}
