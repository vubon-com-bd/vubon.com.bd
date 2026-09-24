import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetDeliveryByNotificationQuery } from './get-delivery-by-notification.query';
import type { NotificationDeliveryRepository } from '../../../domain/repositories/notification-delivery.repository.interface';
import { NotificationDeliveryEntity } from '../../../domain/entities/notification-delivery.entity';
import { NotificationIdVO } from '../../../domain/value-objects/primitives/notification-id.vo';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto';

@QueryHandler(GetDeliveryByNotificationQuery)
export class GetDeliveryByNotificationHandler
  extends BaseQueryHandler<GetDeliveryByNotificationQuery, DeliveryResponseDTO | null>
  implements IQueryHandler<GetDeliveryByNotificationQuery>
{
  readonly queryType = 'delivery.get-by-notification';

  constructor(private readonly deliveryRepo: NotificationDeliveryRepository) {
    super();
  }

  async execute(query: GetDeliveryByNotificationQuery): Promise<DeliveryResponseDTO | null> {
    const entity = await this.deliveryRepo.findByNotificationId(
      NotificationIdVO.create(query.notificationId),
    );
    return entity ? this.toDTO(entity) : null;
  }

  private toDTO(entity: NotificationDeliveryEntity): DeliveryResponseDTO {
    return {
      id: entity.id,
      notificationId: entity.notificationId.value,
      providerName: entity.providerName.value,
      providerMessageId: entity.providerMessageId?.value ?? null,
      status: entity.status.value,
      attemptCount: entity.attemptCount.value,
      lastError: entity.lastError?.value ?? null,
      deliveredAt: entity.deliveredAt?.toISOString() ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
