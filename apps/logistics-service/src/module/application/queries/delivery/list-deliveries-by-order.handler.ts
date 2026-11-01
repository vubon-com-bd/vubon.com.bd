import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListDeliveriesByOrderQuery } from './list-deliveries-by-order.query.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '@application/services/interfaces/delivery.service.interface';
import type { DeliveryListResponseDTO } from '@application/dtos/responses/delivery/index.js';

@QueryHandler(ListDeliveriesByOrderQuery)
export class ListDeliveriesByOrderHandler implements IQueryHandler<ListDeliveriesByOrderQuery, DeliveryListResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(q: ListDeliveriesByOrderQuery): Promise<DeliveryListResponseDTO> {
    return this.service.listByOrder(q.orderId);
  }
}
