/**
 * NotificationAttemptService
 * @module notification-service/application/services/impl
 */
import { Inject, Injectable } from '@nestjs/common';

import {
  NOTIFICATION_ATTEMPT_REPOSITORY,
  type NotificationAttemptRepository,
} from '@domain/repositories/notification-attempt.repository.interface.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import type { NotificationAttemptEntity } from '@domain/entities/notification-attempt.entity.js';

import type {
  INotificationAttemptService,
} from '@application/services/interfaces/notification-attempt.service.interface.js';
import type { DeliveryAttemptResponseDTO } from '@application/dtos/responses/delivery-response.dto.js';

@Injectable()
export class NotificationAttemptService implements INotificationAttemptService {
  constructor(
    @Inject(NOTIFICATION_ATTEMPT_REPOSITORY)
    private readonly repo: NotificationAttemptRepository,
  ) {}

  async listByNotification(notificationId: string): Promise<readonly DeliveryAttemptResponseDTO[]> {
    const vo = NotificationIdVO.create(notificationId);
    const items = await this.repo.findByNotification(vo);
    return items.map((e) => this.toDTO(e));
  }

  async getLatest(notificationId: string): Promise<DeliveryAttemptResponseDTO | null> {
    const entity = await this.repo.findLatest(notificationId);
    if (!entity) return null;
    return this.toDTO(entity);
  }

  async countAttempts(notificationId: string): Promise<number> {
    return this.repo.countAttempts(notificationId);
  }

  private toDTO(e: NotificationAttemptEntity): DeliveryAttemptResponseDTO {
    return {
      attemptNumber: e.attempt.attempt.attemptNumber,
      succeeded: e.attempt.succeeded,
      attemptedAt: e.attempt.attempt.attemptedAt,
      providerMessageId: e.attempt.attempt.providerMessageId,
      errorMessage: e.attempt.error?.message,
    };
  }
}
