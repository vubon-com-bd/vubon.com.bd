import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { NotificationDeliveryServiceInterface } from '../interfaces/notification-delivery.service.interface';
import type { NotificationDeliveryRepository } from '../../../domain/repositories/notification-delivery.repository.interface';
import { NotificationDeliveryEntity } from '../../../domain/entities/notification-delivery.entity';
import { NotificationIdVO } from '../../../domain/value-objects/primitives/notification-id.vo';
import { ProviderMessageIdVO } from '../../../domain/value-objects/primitives/provider-message-id.vo';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto';

@Injectable()
export class NotificationDeliveryService
  extends BaseService<NotificationDeliveryEntity, string>
  implements NotificationDeliveryServiceInterface
{
  readonly name = 'NotificationDeliveryService';

  constructor(private readonly repo: NotificationDeliveryRepository) {
    super();
  }

  async findByNotificationId(notificationId: string): Promise<DeliveryResponseDTO | null> {
    const entity = await this.repo.findByNotificationId(NotificationIdVO.create(notificationId));
    return entity ? this.toDTO(entity) : null;
  }

  async findByProviderMessageId(providerMessageId: string): Promise<DeliveryResponseDTO | null> {
    const entity = await this.repo.findByProviderMessageId(
      ProviderMessageIdVO.create(providerMessageId),
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
