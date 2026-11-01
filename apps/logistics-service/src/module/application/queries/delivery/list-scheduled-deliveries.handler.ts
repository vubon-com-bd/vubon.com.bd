import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListScheduledDeliveriesQuery } from './list-scheduled-deliveries.query.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '@application/services/interfaces/delivery.service.interface';
import type { DeliveryListResponseDTO } from '@application/dtos/responses/delivery/index.js';

@QueryHandler(ListScheduledDeliveriesQuery)
export class ListScheduledDeliveriesHandler implements IQueryHandler<ListScheduledDeliveriesQuery, DeliveryListResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(): Promise<DeliveryListResponseDTO> {
    return this.service.listScheduled();
  }
}
