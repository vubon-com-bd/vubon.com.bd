/**
 * INotificationRecipientService — contract
 * @module notification-service/application/services/interfaces
 */
export const NOTIFICATION_RECIPIENT_SERVICE = Symbol('NOTIFICATION_RECIPIENT_SERVICE');

export interface RecipientResponseDTO {
  readonly id: string;
  readonly notificationId: string;
  readonly userId: string;
  readonly channel: string;
  readonly destination: string;
  readonly deliveryStatus: string;
  readonly deliveredAt?: string;
  readonly readAt?: string;
  readonly failureReason?: string;
}

export interface INotificationRecipientService {
  listByNotification(notificationId: string): Promise<readonly RecipientResponseDTO[]>;
  listByUser(userId: string): Promise<readonly RecipientResponseDTO[]>;
  listUndelivered(notificationId: string): Promise<readonly RecipientResponseDTO[]>;
  countByStatus(notificationId: string, status: string): Promise<number>;
}
