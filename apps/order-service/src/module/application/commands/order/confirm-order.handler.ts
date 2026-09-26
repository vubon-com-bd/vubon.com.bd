import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ConfirmOrderCommand } from './confirm-order.command';
import type { OrderServiceInterface } from '../../services/interfaces/order.service.interface';
import type { OrderResponseDTO } from '../../dtos/responses/order-response.dto';

@CommandHandler(ConfirmOrderCommand)
export class ConfirmOrderHandler
  extends BaseCommandHandler<ConfirmOrderCommand, OrderResponseDTO>
  implements ICommandHandler<ConfirmOrderCommand>
{
  readonly commandType = 'order.confirm';

  constructor(
    private readonly orderService: OrderServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ConfirmOrderCommand): Promise<OrderResponseDTO> {
    return this.orderService.confirm(command.orderId, command.paymentId);
  }
}
