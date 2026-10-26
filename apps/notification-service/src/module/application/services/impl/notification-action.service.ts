/**
 * NotificationActionService
 * @module notification-service/application/services/impl
 */
import { Inject, Injectable } from '@nestjs/common';

import {
  NOTIFICATION_ACTION_REPOSITORY,
  type NotificationActionRepository,
} from '@domain/repositories/notification-action.repository.interface.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import type { NotificationActionEntity } from '@domain/entities/notification-action.entity.js';

import type {
  INotificationActionService,
  ActionResponseDTO,
} from '@application/services/interfaces/notification-action.service.interface.js';

@Injectable()
export class NotificationActionService implements INotificationActionService {
  constructor(
    @Inject(NOTIFICATION_ACTION_REPOSITORY)
    private readonly repo: NotificationActionRepository,
  ) {}

  async listByNotification(notificationId: string): Promise<readonly ActionResponseDTO[]> {
    const vo = NotificationIdVO.create(notificationId);
    const items = await this.repo.findByNotification(vo);
    return items.map((e) => this.toDTO(e));
  }

  async listTriggered(notificationId: string): Promise<readonly ActionResponseDTO[]> {
    const items = await this.repo.findTriggered(notificationId);
    return items.map((e) => this.toDTO(e));
  }

  async recordTrigger(actionId: string, by: string): Promise<void> {
    const now = new Date().toISOString();
    await this.repo.recordTrigger(actionId, by, now);
  }

  private toDTO(e: NotificationActionEntity): ActionResponseDTO {
    return {
      id: e.id,
      notificationId: e.notificationId.value,
      actionType: e.action.type.value,
      label: e.action.label,
      url: e.action.url?.value,
      triggerCount: e.triggerCount,
      lastTriggeredAt: e.triggeredAt,
    };
  }
}
