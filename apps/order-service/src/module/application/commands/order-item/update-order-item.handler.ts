import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateOrderItemCommand } from './update-order-item.command';
import type { OrderItemServiceInterface } from '../../services/interfaces/order-item.service.interface';
import type { OrderItemResponseDTO } from '../../dtos/responses/order-item-response.dto';

@CommandHandler(UpdateOrderItemCommand)
export class UpdateOrderItemHandler
  extends BaseCommandHandler<UpdateOrderItemCommand, OrderItemResponseDTO>
  implements ICommandHandler<UpdateOrderItemCommand>
{
  readonly commandType = 'order.item.update';

  constructor(
    private readonly itemService: OrderItemServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateOrderItemCommand): Promise<OrderItemResponseDTO> {
    return this.itemService.update({
      itemId: command.itemId,
      quantity: command.quantity,
      price: command.price,
    });
  }
}
