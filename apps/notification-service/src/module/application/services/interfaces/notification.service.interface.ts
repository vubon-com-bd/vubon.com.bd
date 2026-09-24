import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { NotificationEntity } from '../../../domain/entities/notification.entity';
import type { NotificationResponseDTO } from '../../dtos/responses/notification-response.dto';
import type { NotificationDetailResponseDTO } from '../../dtos/responses/notification-detail-response.dto';
import type { NotificationListResponseDTO } from '../../dtos/responses/notification-list-response.dto';

export interface NotificationServiceInterface
  extends BaseServiceInterface<NotificationEntity, string> {
  persist(entity: NotificationEntity): Promise<NotificationEntity>;
  findById(id: string): Promise<NotificationDetailResponseDTO | null>;
  findByUser(
    userId: string,
    limit?: number,
  ): Promise<NotificationListResponseDTO>;
  markAsRead(notificationId: string): Promise<NotificationResponseDTO>;
  delete(notificationId: string): Promise<void>;
}
