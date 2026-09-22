import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RemoveOrderItemCommand } from './remove-order-item.command';
import type { OrderItemServiceInterface } from '../../services/interfaces/order-item.service.interface';

@CommandHandler(RemoveOrderItemCommand)
export class RemoveOrderItemHandler
  extends BaseCommandHandler<RemoveOrderItemCommand, void>
  implements ICommandHandler<RemoveOrderItemCommand>
{
  readonly commandType = 'order.item.remove';

  constructor(
    private readonly itemService: OrderItemServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RemoveOrderItemCommand): Promise<void> {
    await this.itemService.remove(command.itemId);
  }
}
