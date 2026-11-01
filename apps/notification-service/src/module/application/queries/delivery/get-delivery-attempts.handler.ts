import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDeliveryAttemptsQuery } from './get-delivery-attempts.query.js';
import {
  NOTIFICATION_ATTEMPT_SERVICE,
  type INotificationAttemptService,
} from '@application/services/interfaces/notification-attempt.service.interface.js';
import type { DeliveryAttemptResponseDTO } from '@application/dtos/responses/delivery-response.dto.js';

@QueryHandler(GetDeliveryAttemptsQuery)
export class GetDeliveryAttemptsHandler
  implements IQueryHandler<GetDeliveryAttemptsQuery, readonly DeliveryAttemptResponseDTO[]>
{
  constructor(
    @Inject(NOTIFICATION_ATTEMPT_SERVICE)
    private readonly service: INotificationAttemptService,
  ) {}

  async execute(q: GetDeliveryAttemptsQuery): Promise<readonly DeliveryAttemptResponseDTO[]> {
    return this.service.listByNotification(q.notificationId);
  }
}
