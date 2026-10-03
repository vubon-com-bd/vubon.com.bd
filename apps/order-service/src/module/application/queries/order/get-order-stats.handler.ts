import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetOrderStatsQuery } from './get-order-stats.query.js';
import { ORDER_SERVICE, type IOrderService, type OrderStatsDTO } from '../../services/interfaces/order.service.interface.js';

@QueryHandler(GetOrderStatsQuery)
export class GetOrderStatsHandler implements IQueryHandler<GetOrderStatsQuery, OrderStatsDTO> {
  constructor(@Inject(ORDER_SERVICE) private readonly service: IOrderService) {}
  async execute(q: GetOrderStatsQuery): Promise<OrderStatsDTO> {
    return this.service.getStats(q.customerId, q.vendorId);
  }
}
