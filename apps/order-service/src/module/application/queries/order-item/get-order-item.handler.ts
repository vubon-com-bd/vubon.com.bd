import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetOrderItemQuery } from './get-order-item.query.js';
import { ORDER_ITEM_SERVICE, type IOrderItemService } from '../../services/interfaces/order-item.service.interface.js';
import type { OrderItemResponseDTO } from '../../dtos/responses/order-response.dto.js';

@QueryHandler(GetOrderItemQuery)
export class GetOrderItemHandler implements IQueryHandler<GetOrderItemQuery, OrderItemResponseDTO> {
  constructor(@Inject(ORDER_ITEM_SERVICE) private readonly service: IOrderItemService) {}
  async execute(q: GetOrderItemQuery): Promise<OrderItemResponseDTO> {
    return this.service.getById(q.itemId);
  }
}
