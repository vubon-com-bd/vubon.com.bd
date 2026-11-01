/**
 * NotificationAttempt Repository Interface
 * @module notification-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { NotificationAttemptEntity } from '@domain/entities/notification-attempt.entity.js';
import type { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';

export const NOTIFICATION_ATTEMPT_REPOSITORY = Symbol('NOTIFICATION_ATTEMPT_REPOSITORY');

export interface NotificationAttemptRepository
  extends BaseRepository<NotificationAttemptEntity, string> {
  findByNotification(notificationId: NotificationIdVO | string): Promise<readonly NotificationAttemptEntity[]>;
  findLatest(notificationId: string): Promise<NotificationAttemptEntity | null>;
  countAttempts(notificationId: string): Promise<number>;
  countSuccessful(notificationId: string): Promise<number>;
}
