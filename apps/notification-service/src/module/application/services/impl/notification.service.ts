import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { NotificationServiceInterface } from '../interfaces/notification.service.interface';
import type { NotificationRepository } from '../../../domain/repositories/notification.repository.interface';
import { NotificationEntity } from '../../../domain/entities/notification.entity';
import { NotificationIdVO } from '../../../domain/value-objects/primitives/notification-id.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { NotificationResponseDTO } from '../../dtos/responses/notification-response.dto';
import type { NotificationDetailResponseDTO } from '../../dtos/responses/notification-detail-response.dto';
import type { NotificationListResponseDTO } from '../../dtos/responses/notification-list-response.dto';

@Injectable()
export class NotificationService
  extends BaseService<NotificationEntity, string>
  implements NotificationServiceInterface
{
  readonly name = 'NotificationService';

  constructor(
    private readonly notificationRepo: NotificationRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async persist(entity: NotificationEntity): Promise<NotificationEntity> {
    const saved = await this.notificationRepo.save(entity);
    const events = saved.pullDomainEvents();
    for (const event of events) {
      await this.eventBus.publish(event as never);
    }
    return saved;
  }

  async findById(id: string): Promise<NotificationDetailResponseDTO | null> {
    const entity = await this.notificationRepo.findById(
      NotificationIdVO.create(id),
    );
    return entity ? this.toDetailDTO(entity) : null;
  }

  async findByUser(
    userId: string,
    limit = 50,
  ): Promise<NotificationListResponseDTO> {
    const entities = await this.notificationRepo.findByUser(
      UserIdVO.create(userId),
      limit,
    );
    const items = entities.map((e: NotificationEntity) => this.toDTO(e));
    return {
      items,
      total: items.length,
      page: 1,
      limit,
      hasNext: false,
    };
  }

  async markAsRead(notificationId: string): Promise<NotificationResponseDTO> {
    const entity = await this.notificationRepo.findById(
      NotificationIdVO.create(notificationId),
    );
    if (!entity) {
      throw new Error(`Notification not found: ${notificationId}`);
    }
    const updated = entity.markAsRead();
    await this.notificationRepo.save(updated);

    const events = updated.pullDomainEvents();
    for (const event of events) {
      await this.eventBus.publish(event as never);
    }

    return this.toDTO(updated);
  }

  async delete(notificationId: string): Promise<void> {
    await this.notificationRepo.delete(NotificationIdVO.create(notificationId));
  }

  private toDTO(entity: NotificationEntity): NotificationResponseDTO {
    return {
      id: entity.id.value,
      type: entity.type.value as NotificationResponseDTO['type'],
      category: entity.category.value as NotificationResponseDTO['category'],
      channel: entity.channel.value as NotificationResponseDTO['channel'],
      priority: entity.priority.value as NotificationResponseDTO['priority'],
      status: entity.status.value as NotificationResponseDTO['status'],
      title: '',
      body: '',
      createdAt: entity.createdAt,
      read: entity.isRead
        ? { status: 'read' as const }
        : { status: 'unread' as const },
    };
  }

  private toDetailDTO(entity: NotificationEntity): NotificationDetailResponseDTO {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      type: entity.type.value,
      category: entity.category.value,
      channel: entity.channel.value,
      priority: entity.priority.value,
      status: entity.status.value,
      title: '',
      body: '',
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as NotificationDetailResponseDTO;
  }
}
