import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ReleaseOrderCommand } from './release-order.command';
import type { OrderServiceInterface } from '../../services/interfaces/order.service.interface';

@CommandHandler(ReleaseOrderCommand)
export class ReleaseOrderHandler
  extends BaseCommandHandler<ReleaseOrderCommand, void>
  implements ICommandHandler<ReleaseOrderCommand>
{
  readonly commandType = 'order.release';

  constructor(
    private readonly orderService: OrderServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ReleaseOrderCommand): Promise<void> {
    await this.orderService.release(command.orderId);
  }
}
