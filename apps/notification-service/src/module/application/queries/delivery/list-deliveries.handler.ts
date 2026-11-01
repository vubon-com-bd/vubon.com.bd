import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListDeliveriesQuery } from './list-deliveries.query.js';
import {
  NOTIFICATION_DELIVERY_SERVICE,
  type INotificationDeliveryService,
} from '@application/services/interfaces/notification-delivery.service.interface.js';
import type { DeliveryResponseDTO } from '@application/dtos/responses/delivery-response.dto.js';

@QueryHandler(ListDeliveriesQuery)
export class ListDeliveriesHandler
  implements IQueryHandler<ListDeliveriesQuery, readonly DeliveryResponseDTO[]>
{
  constructor(
    @Inject(NOTIFICATION_DELIVERY_SERVICE)
    private readonly service: INotificationDeliveryService,
  ) {}

  async execute(q: ListDeliveriesQuery): Promise<readonly DeliveryResponseDTO[]> {
    return this.service.listByStatus(q.status);
  }
}
