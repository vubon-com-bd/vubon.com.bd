/**
 * NotificationRecipientService
 * @module notification-service/application/services/impl
 */
import { Inject, Injectable } from '@nestjs/common';

import {
  NOTIFICATION_RECIPIENT_REPOSITORY,
  type NotificationRecipientRepository,
} from '@domain/repositories/notification-recipient.repository.interface.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import type { NotificationRecipientEntity } from '@domain/entities/notification-recipient.entity.js';

import type {
  INotificationRecipientService,
  RecipientResponseDTO,
} from '@application/services/interfaces/notification-recipient.service.interface.js';

@Injectable()
export class NotificationRecipientService implements INotificationRecipientService {
  constructor(
    @Inject(NOTIFICATION_RECIPIENT_REPOSITORY)
    private readonly repo: NotificationRecipientRepository,
  ) {}

  async listByNotification(notificationId: string): Promise<readonly RecipientResponseDTO[]> {
    const vo = NotificationIdVO.create(notificationId);
    const items = await this.repo.findByNotification(vo);
    return items.map((e) => this.toDTO(e));
  }

  async listByUser(userId: string): Promise<readonly RecipientResponseDTO[]> {
    const items = await this.repo.findByUser(userId);
    return items.map((e) => this.toDTO(e));
  }

  async listUndelivered(notificationId: string): Promise<readonly RecipientResponseDTO[]> {
    const items = await this.repo.findUndelivered(notificationId);
    return items.map((e) => this.toDTO(e));
  }

  async countByStatus(notificationId: string, status: string): Promise<number> {
    return this.repo.countByDeliveryStatus(notificationId, status);
  }

  private toDTO(e: NotificationRecipientEntity): RecipientResponseDTO {
    return {
      id: e.id,
      notificationId: e.notificationId.value,
      userId: e.recipient.userId.value,
      channel: e.recipient.channel.value,
      destination: e.recipient.maskedDestination,
      deliveryStatus: e.deliveryStatus.value,
      deliveredAt: e.deliveredAt,
      readAt: e.readAt,
      failureReason: e.failureReason,
    };
  }
}
