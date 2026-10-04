import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListOrdersQuery } from './list-orders.query.js';
import { ORDER_SERVICE, type IOrderService } from '../../services/interfaces/order.service.interface.js';
import type { OrderListResponseDTO } from '../../dtos/responses/order-list-response.dto.js';

@QueryHandler(ListOrdersQuery)
export class ListOrdersHandler implements IQueryHandler<ListOrdersQuery, OrderListResponseDTO> {
  constructor(@Inject(ORDER_SERVICE) private readonly service: IOrderService) {}
  async execute(q: ListOrdersQuery): Promise<OrderListResponseDTO> {
    return this.service.list(q.options);
  }
}
