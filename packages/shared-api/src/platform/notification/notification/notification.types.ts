export type NotificationChannel = 'in_app' | 'email' | 'sms' | 'push';
export type NotificationStatus = 'unread' | 'read' | 'archived';

export interface Notification {
  readonly id: string;
  readonly userId: string;
  readonly title: string;
  readonly body: string;
  readonly channel: NotificationChannel;
  readonly status: NotificationStatus;
  readonly data?: Record<string, unknown>;
  readonly createdAt: string;
}

export interface NotificationListResponse {
  readonly notifications: readonly Notification[];
  readonly total: number;
  readonly unreadCount: number;
}
