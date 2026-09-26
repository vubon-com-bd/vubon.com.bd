import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateOrderCommand } from './create-order.command';
import type { OrderServiceInterface } from '../../services/interfaces/order.service.interface';
import type { OrderResponseDTO } from '../../dtos/responses/order-response.dto';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler
  extends BaseCommandHandler<CreateOrderCommand, OrderResponseDTO>
  implements ICommandHandler<CreateOrderCommand>
{
  readonly commandType = 'order.create';

  constructor(
    private readonly orderService: OrderServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CreateOrderCommand): Promise<OrderResponseDTO> {
    void command;
    void this.orderService;
    throw new Error('create-order not yet wired');
  }
}
