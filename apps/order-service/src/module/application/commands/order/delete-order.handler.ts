import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteOrderCommand } from './delete-order.command.js';
import { ORDER_SERVICE, type IOrderService } from '../../services/interfaces/order.service.interface.js';

@CommandHandler(DeleteOrderCommand)
export class DeleteOrderHandler implements ICommandHandler<DeleteOrderCommand, void> {
  constructor(@Inject(ORDER_SERVICE) private readonly service: IOrderService) {}
  async execute(c: DeleteOrderCommand): Promise<void> {
    return this.service.delete(c.dto.orderId, c.actorId);
  }
}
