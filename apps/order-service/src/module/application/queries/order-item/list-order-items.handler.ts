import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListOrderItemsQuery } from './list-order-items.query.js';
import { ORDER_ITEM_SERVICE, type IOrderItemService } from '../../services/interfaces/order-item.service.interface.js';
import type { OrderItemListResponseDTO } from '../../dtos/responses/order-item-response.dto.js';

@QueryHandler(ListOrderItemsQuery)
export class ListOrderItemsHandler implements IQueryHandler<ListOrderItemsQuery, OrderItemListResponseDTO> {
  constructor(@Inject(ORDER_ITEM_SERVICE) private readonly service: IOrderItemService) {}
  async execute(q: ListOrderItemsQuery): Promise<OrderItemListResponseDTO> {
    return this.service.listByOrder(q.orderId);
  }
}
