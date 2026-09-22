import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateOrderCommand } from './update-order.command';
import type { OrderServiceInterface } from '../../services/interfaces/order.service.interface';
import type { OrderResponseDTO } from '../../dtos/responses/order-response.dto';

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderHandler
  extends BaseCommandHandler<UpdateOrderCommand, OrderResponseDTO>
  implements ICommandHandler<UpdateOrderCommand>
{
  readonly commandType = 'order.update';

  constructor(
    private readonly orderService: OrderServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateOrderCommand): Promise<OrderResponseDTO> {
    void command;
    void this.orderService;
    throw new Error('update-order not yet wired');
  }
}
