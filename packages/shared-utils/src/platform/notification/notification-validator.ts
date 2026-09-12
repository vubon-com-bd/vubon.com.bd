import { PLATFORM_NOTIFICATION } from '@vubon/shared-constants/src/platform/notification/platform-notification.constants';

export interface PlatformNotificationInput {
  userId: string;
  title: string;
  body: string;
  status: string;
  type: string;
  priority: string;
  isActive: boolean;
  isRead: boolean;
}

export const validatePlatformNotification = (
  notification: Partial<PlatformNotificationInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!notification.userId) errors.push('User ID is required');
  if (!notification.title) errors.push('Title is required');
  if (!notification.body) errors.push('Body is required');
  if (
    notification.status &&
    !Object.keys(PLATFORM_NOTIFICATION.STATUS).includes(notification.status)
  ) {
    errors.push('Invalid notification status');
  }
  if (
    notification.type &&
    !Object.keys(PLATFORM_NOTIFICATION.NOTIFICATION_TYPES).includes(notification.type)
  ) {
    errors.push('Invalid notification type');
  }
  return { isValid: errors.length === 0, errors };
};

export const isPlatformNotificationValid = (notification: PlatformNotificationInput): boolean => {
  return (
    notification.isActive && notification.status !== 'failed' && notification.status !== 'expired'
  );
};

export const isPlatformNotificationRead = (notification: PlatformNotificationInput): boolean => {
  return notification.isRead || notification.status === 'read';
};
