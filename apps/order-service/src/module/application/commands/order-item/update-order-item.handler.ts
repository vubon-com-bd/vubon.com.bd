/**
 * UpdateOrderItemHandler
 * @module order-service/application/commands/order-item
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateOrderItemCommand } from './update-order-item.command.js';
import {
  ORDER_ITEM_SERVICE,
  type IOrderItemService,
} from '../../services/interfaces/order-item.service.interface.js';
import type { OrderItemResponseDTO } from '../../dtos/responses/order-item-response.dto.js';

@CommandHandler(UpdateOrderItemCommand)
export class UpdateOrderItemHandler
  implements ICommandHandler<UpdateOrderItemCommand, OrderItemResponseDTO>
{
  constructor(
    @Inject(ORDER_ITEM_SERVICE)
    private readonly service: IOrderItemService,
  ) {}

  async execute(c: UpdateOrderItemCommand): Promise<OrderItemResponseDTO> {
    return this.service.update(c.dto, c.actorId);
  }
}
