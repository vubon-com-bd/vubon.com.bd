/**
 * NotificationContentService
 * @module notification-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import {
  NOTIFICATION_CONTENT_REPOSITORY,
  type NotificationContentRepository,
} from '@domain/repositories/notification-content.repository.interface.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';

import type {
  INotificationContentService,
  NotificationContentResponseDTO,
} from '@application/services/interfaces/notification-content.service.interface.js';

@Injectable()
export class NotificationContentService implements INotificationContentService {
  private readonly logger = new Logger(NotificationContentService.name);

  constructor(
    @Inject(NOTIFICATION_CONTENT_REPOSITORY)
    private readonly repo: NotificationContentRepository,
  ) {}

  async getByNotification(
    notificationId: string,
  ): Promise<NotificationContentResponseDTO | null> {
    const vo = NotificationIdVO.create(notificationId);
    const entity = await this.repo.findByNotification(vo);
    if (!entity) return null;
    return {
      id: entity.id,
      notificationId: entity.notificationId.value,
      subject: entity.content.subject.value,
      body: entity.content.body.value,
      imageUrl: entity.content.imageUrl?.value,
      iconUrl: entity.content.iconUrl?.value,
      actionUrl: entity.content.actionUrl?.value,
      data: { ...entity.content.data.value },
      renderedAt: entity.renderedAt,
    };
  }

  async getUnrendered(): Promise<readonly NotificationContentResponseDTO[]> {
    const items = await this.repo.findUnrendered();
    return items.map((e) => ({
      id: e.id,
      notificationId: e.notificationId.value,
      subject: e.content.subject.value,
      body: e.content.body.value,
      data: { ...e.content.data.value },
    }));
  }

  async markRendered(contentId: string): Promise<void> {
    const now = new Date().toISOString();
    await this.repo.markRendered(contentId, now);
    this.logger.debug(`Content ${contentId} marked rendered`);
  }
}
