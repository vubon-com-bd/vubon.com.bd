import { TypeObject } from '../../common/types.types';
import { NOTIFICATION_ACTION } from '@vubon/shared-constants/src/platform/notification/notification-action.constants';
import { Notification } from './notification.types';

export interface NotificationAction extends TypeObject {
  actionId: string;
  notificationId: string;
  notification: Notification;
  type: keyof typeof NOTIFICATION_ACTION.TYPES | string;
  label: string;
  url?: string;
  icon?: string;
  handler: keyof typeof NOTIFICATION_ACTION.ACTION_HANDLERS | string;
  isPrimary: boolean;
  isDanger: boolean;
  metadata: Record<string, unknown>;
}

export type NotificationActionKey = keyof typeof NOTIFICATION_ACTION.TYPES;
