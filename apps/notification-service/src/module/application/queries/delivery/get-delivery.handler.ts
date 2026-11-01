import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDeliveryQuery } from './get-delivery.query.js';
import {
  NOTIFICATION_DELIVERY_SERVICE,
  type INotificationDeliveryService,
} from '@application/services/interfaces/notification-delivery.service.interface.js';
import type { DeliveryResponseDTO } from '@application/dtos/responses/delivery-response.dto.js';

@QueryHandler(GetDeliveryQuery)
export class GetDeliveryHandler
  implements IQueryHandler<GetDeliveryQuery, DeliveryResponseDTO | null>
{
  constructor(
    @Inject(NOTIFICATION_DELIVERY_SERVICE)
    private readonly service: INotificationDeliveryService,
  ) {}

  async execute(q: GetDeliveryQuery): Promise<DeliveryResponseDTO | null> {
    return this.service.getByNotification(q.notificationId);
  }
}
