import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListDeliveriesQuery } from './list-deliveries.query.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '../../services/interfaces/delivery.service.interface.js';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto.js';

@QueryHandler(ListDeliveriesQuery)
export class ListDeliveriesHandler implements IQueryHandler<ListDeliveriesQuery, readonly DeliveryResponseDTO[]> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(q: ListDeliveriesQuery): Promise<readonly DeliveryResponseDTO[]> {
    return this.service.listByOrder(q.orderId);
  }
}
