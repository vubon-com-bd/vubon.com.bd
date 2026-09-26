import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { HoldOrderCommand } from './hold-order.command';
import type { OrderServiceInterface } from '../../services/interfaces/order.service.interface';

@CommandHandler(HoldOrderCommand)
export class HoldOrderHandler
  extends BaseCommandHandler<HoldOrderCommand, void>
  implements ICommandHandler<HoldOrderCommand>
{
  readonly commandType = 'order.hold';

  constructor(
    private readonly orderService: OrderServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: HoldOrderCommand): Promise<void> {
    await this.orderService.hold(command.orderId, command.reason);
  }
}
