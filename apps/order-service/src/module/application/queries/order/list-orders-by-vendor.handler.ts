import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListOrdersByVendorQuery } from './list-orders-by-vendor.query.js';
import { ORDER_SERVICE, type IOrderService } from '../../services/interfaces/order.service.interface.js';
import type { OrderListResponseDTO } from '../../dtos/responses/order-list-response.dto.js';

@QueryHandler(ListOrdersByVendorQuery)
export class ListOrdersByVendorHandler implements IQueryHandler<ListOrdersByVendorQuery, OrderListResponseDTO> {
  constructor(@Inject(ORDER_SERVICE) private readonly service: IOrderService) {}
  async execute(q: ListOrdersByVendorQuery): Promise<OrderListResponseDTO> {
    return this.service.listByVendor(q.vendorId, q.options);
  }
}
