import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetDeliveryQuery } from './get-delivery.query';
import type { NotificationDeliveryRepository } from '../../../domain/repositories/notification-delivery.repository.interface';
import { NotificationDeliveryEntity } from '../../../domain/entities/notification-delivery.entity';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto';

@QueryHandler(GetDeliveryQuery)
export class GetDeliveryHandler
  extends BaseQueryHandler<GetDeliveryQuery, DeliveryResponseDTO | null>
  implements IQueryHandler<GetDeliveryQuery>
{
  readonly queryType = 'delivery.get';

  constructor(private readonly deliveryRepo: NotificationDeliveryRepository) {
    super();
  }

  async execute(query: GetDeliveryQuery): Promise<DeliveryResponseDTO | null> {
    const entity = await this.deliveryRepo.findById(query.deliveryId);
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
