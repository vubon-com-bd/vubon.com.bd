import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeleteOrderCommand } from './delete-order.command';
import type { OrderServiceInterface } from '../../services/interfaces/order.service.interface';

@CommandHandler(DeleteOrderCommand)
export class DeleteOrderHandler
  extends BaseCommandHandler<DeleteOrderCommand, void>
  implements ICommandHandler<DeleteOrderCommand>
{
  readonly commandType = 'order.delete';

  constructor(
    private readonly orderService: OrderServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: DeleteOrderCommand): Promise<void> {
    await this.orderService.delete(command.orderId);
  }
}
