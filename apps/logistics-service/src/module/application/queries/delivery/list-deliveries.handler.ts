import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListDeliveriesQuery } from './list-deliveries.query.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '@application/services/interfaces/delivery.service.interface';
import type { DeliveryListResponseDTO } from '@application/dtos/responses/delivery/index.js';

@QueryHandler(ListDeliveriesQuery)
export class ListDeliveriesHandler implements IQueryHandler<ListDeliveriesQuery, DeliveryListResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(q: ListDeliveriesQuery): Promise<DeliveryListResponseDTO> {
    return this.service.list(q.options);
  }
}
