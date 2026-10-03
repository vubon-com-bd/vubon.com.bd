import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListOrdersByCustomerQuery } from './list-orders-by-customer.query.js';
import { ORDER_SERVICE, type IOrderService } from '../../services/interfaces/order.service.interface.js';
import type { OrderListResponseDTO } from '../../dtos/responses/order-list-response.dto.js';

@QueryHandler(ListOrdersByCustomerQuery)
export class ListOrdersByCustomerHandler implements IQueryHandler<ListOrdersByCustomerQuery, OrderListResponseDTO> {
  constructor(@Inject(ORDER_SERVICE) private readonly service: IOrderService) {}
  async execute(q: ListOrdersByCustomerQuery): Promise<OrderListResponseDTO> {
    return this.service.listByCustomer(q.customerId, q.options);
  }
}
