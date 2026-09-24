import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { NotificationDeliveryEntity } from '../../../domain/entities/notification-delivery.entity';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto';

export interface NotificationDeliveryServiceInterface
  extends BaseServiceInterface<NotificationDeliveryEntity, string> {
  findByNotificationId(notificationId: string): Promise<DeliveryResponseDTO | null>;
  findByProviderMessageId(providerMessageId: string): Promise<DeliveryResponseDTO | null>;
}
