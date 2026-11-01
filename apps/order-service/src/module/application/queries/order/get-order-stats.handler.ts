/**
 * GetOrderStatsHandler
 * @module order-service/application/queries/order
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetOrderStatsQuery } from './get-order-stats.query.js';
import {
  ORDER_SERVICE,
  type IOrderService,
} from '../../services/interfaces/order.service.interface.js';
import type { OrderStatsResponseDTO } from '../../dtos/responses/order-response.dto.js';

@QueryHandler(GetOrderStatsQuery)
export class GetOrderStatsHandler
  implements IQueryHandler<GetOrderStatsQuery, OrderStatsResponseDTO>
{
  constructor(
    @Inject(ORDER_SERVICE)
    private readonly service: IOrderService,
  ) {}

  async execute(q: GetOrderStatsQuery): Promise<OrderStatsResponseDTO> {
    return this.service.getStats(q.customerId);
  }
}
