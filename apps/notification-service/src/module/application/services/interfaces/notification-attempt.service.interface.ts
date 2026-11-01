/**
 * INotificationAttemptService — contract
 * @module notification-service/application/services/interfaces
 */
import type { DeliveryAttemptResponseDTO } from '@application/dtos/responses/delivery-response.dto.js';

export const NOTIFICATION_ATTEMPT_SERVICE = Symbol('NOTIFICATION_ATTEMPT_SERVICE');

export interface INotificationAttemptService {
  listByNotification(notificationId: string): Promise<readonly DeliveryAttemptResponseDTO[]>;
  getLatest(notificationId: string): Promise<DeliveryAttemptResponseDTO | null>;
  countAttempts(notificationId: string): Promise<number>;
}
