import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RemoveOrderItemCommand } from './remove-order-item.command.js';
import { ORDER_ITEM_SERVICE, type IOrderItemService } from '../../services/interfaces/order-item.service.interface.js';

@CommandHandler(RemoveOrderItemCommand)
export class RemoveOrderItemHandler implements ICommandHandler<RemoveOrderItemCommand, void> {
  constructor(@Inject(ORDER_ITEM_SERVICE) private readonly service: IOrderItemService) {}
  async execute(c: RemoveOrderItemCommand): Promise<void> {
    return this.service.remove(c.dto, c.actorId);
  }
}
