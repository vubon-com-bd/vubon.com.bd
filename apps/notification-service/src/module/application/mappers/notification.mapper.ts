import { BaseMapper } from '@vubon/shared-kernel/application/mappers/base.mapper';
import { NotificationEntity } from '../../domain/entities/notification.entity';
import type { NotificationResponseDTO } from '../dtos/responses/notification-response.dto';

export class NotificationMapper extends BaseMapper<NotificationEntity, NotificationResponseDTO> {
  toTarget(source: NotificationEntity): NotificationResponseDTO {
    return {
      id: source.id.value,
      type: source.type.value as NotificationResponseDTO['type'],
      category: source.category.value as NotificationResponseDTO['category'],
      channel: source.channel.value as NotificationResponseDTO['channel'],
      priority: source.priority.value as NotificationResponseDTO['priority'],
      status: source.status.value as NotificationResponseDTO['status'],
      title: '',
      body: '',
      createdAt: source.createdAt,
      read: source.isRead ? { status: 'read' } : { status: 'unread' },
    };
  }

  toSource(target: NotificationResponseDTO): NotificationEntity {
    void target;
    throw new Error('NotificationMapper.toSource not supported (DTO → Entity is lossy)');
  }
}
