import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AddOrderItemCommand } from './add-order-item.command.js';
import { ORDER_ITEM_SERVICE, type IOrderItemService } from '../../services/interfaces/order-item.service.interface.js';
import type { OrderItemResponseDTO } from '../../dtos/responses/order-response.dto.js';

@CommandHandler(AddOrderItemCommand)
export class AddOrderItemHandler implements ICommandHandler<AddOrderItemCommand, OrderItemResponseDTO> {
  constructor(@Inject(ORDER_ITEM_SERVICE) private readonly service: IOrderItemService) {}
  async execute(c: AddOrderItemCommand): Promise<OrderItemResponseDTO> {
    return this.service.add(c.dto, c.actorId);
  }
}
