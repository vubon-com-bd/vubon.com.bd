import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetOrderByNumberQuery } from './get-order-by-number.query.js';
import { ORDER_SERVICE, type IOrderService } from '../../services/interfaces/order.service.interface.js';
import type { OrderResponseDTO } from '../../dtos/responses/order-response.dto.js';

@QueryHandler(GetOrderByNumberQuery)
export class GetOrderByNumberHandler implements IQueryHandler<GetOrderByNumberQuery, OrderResponseDTO> {
  constructor(@Inject(ORDER_SERVICE) private readonly service: IOrderService) {}
  async execute(q: GetOrderByNumberQuery): Promise<OrderResponseDTO> {
    return this.service.getByNumber(q.orderNumber);
  }
}
