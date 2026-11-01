import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListDeliveriesByDriverQuery } from './list-deliveries-by-driver.query.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '@application/services/interfaces/delivery.service.interface';
import type { DeliveryListResponseDTO } from '@application/dtos/responses/delivery/index.js';

@QueryHandler(ListDeliveriesByDriverQuery)
export class ListDeliveriesByDriverHandler implements IQueryHandler<ListDeliveriesByDriverQuery, DeliveryListResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(q: ListDeliveriesByDriverQuery): Promise<DeliveryListResponseDTO> {
    return this.service.listByDriver(q.driverId);
  }
}
