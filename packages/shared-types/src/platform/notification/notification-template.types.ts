import { BaseEntity } from '../../common/base.types';
import { NOTIFICATION_TEMPLATE } from '@vubon/shared-constants/src/platform/notification/notification-template.constants';
import { Notification } from './notification.types';

export interface NotificationTemplate extends BaseEntity {
  templateId: string;
  notificationId: string;
  notification: Notification;
  status: keyof typeof NOTIFICATION_TEMPLATE.STATUS | string;
  type: keyof typeof NOTIFICATION_TEMPLATE.TYPES | string;
  format: keyof typeof NOTIFICATION_TEMPLATE.TEMPLATE_FORMATS | string;
  name: string;
  description?: string;
  subject: string;
  body: string;
  variables: string[];
  isActive: boolean;
  isDefault: boolean;
  metadata: Record<string, unknown>;
}
