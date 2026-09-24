import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListFailedDeliveriesQuery } from './list-failed-deliveries.query';
import type { NotificationDeliveryRepository } from '../../../domain/repositories/notification-delivery.repository.interface';
import { NotificationDeliveryEntity } from '../../../domain/entities/notification-delivery.entity';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto';

@QueryHandler(ListFailedDeliveriesQuery)
export class ListFailedDeliveriesHandler
  extends BaseQueryHandler<ListFailedDeliveriesQuery, readonly DeliveryResponseDTO[]>
  implements IQueryHandler<ListFailedDeliveriesQuery>
{
  readonly queryType = 'delivery.list-failed';

  constructor(private readonly deliveryRepo: NotificationDeliveryRepository) {
    super();
  }

  async execute(query: ListFailedDeliveriesQuery): Promise<readonly DeliveryResponseDTO[]> {
    const entities = await this.deliveryRepo.findFailed(query.limit);
    return entities.map((e: NotificationDeliveryEntity) => this.toDTO(e));
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
