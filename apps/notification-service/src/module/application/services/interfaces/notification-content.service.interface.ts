/**
 * INotificationContentService — contract
 * @module notification-service/application/services/interfaces
 */
export const NOTIFICATION_CONTENT_SERVICE = Symbol('NOTIFICATION_CONTENT_SERVICE');

export interface NotificationContentResponseDTO {
  readonly id: string;
  readonly notificationId: string;
  readonly subject: string;
  readonly body: string;
  readonly imageUrl?: string;
  readonly iconUrl?: string;
  readonly actionUrl?: string;
  readonly data: Readonly<Record<string, unknown>>;
  readonly renderedAt?: string;
}

export interface INotificationContentService {
  getByNotification(notificationId: string): Promise<NotificationContentResponseDTO | null>;
  getUnrendered(): Promise<readonly NotificationContentResponseDTO[]>;
  markRendered(contentId: string): Promise<void>;
}
