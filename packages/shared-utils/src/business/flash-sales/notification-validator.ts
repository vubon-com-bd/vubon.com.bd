import { FLASH_SALE_NOTIFICATION } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-notification.constants';

export interface NotificationInput {
  flashSaleId: string;
  type: string;
  subject: string;
  body: string;
  status: string;
}

export const validateNotification = (
  notification: Partial<NotificationInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!notification.flashSaleId) errors.push('Flash sale ID is required');
  if (!notification.type) errors.push('Notification type is required');
  if (!notification.subject) errors.push('Subject is required');
  if (!notification.body) errors.push('Body is required');
  if (
    notification.status &&
    !Object.keys(FLASH_SALE_NOTIFICATION.STATUS).includes(notification.status)
  ) {
    errors.push('Invalid notification status');
  }
  return { isValid: errors.length === 0, errors };
};
