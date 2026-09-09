import { BaseEntity } from '../../common/base.types';
import { User } from '../../user/user.types';
import { NOTIFICATION_STATUS } from '@vubon/shared-constants/src/platform/notification/notification-status.constants';
import { NOTIFICATION_TYPE } from '@vubon/shared-constants/src/platform/notification/notification-type.constants';
import { NOTIFICATION_CATEGORY } from '@vubon/shared-constants/src/platform/notification/notification-category.constants';
import { NOTIFICATION_PRIORITY } from '@vubon/shared-constants/src/platform/notification/notification-priority.constants';
import { NotificationChannel } from './notification-channel.types';
import { NotificationDelivery } from './notification-delivery.types';
import { NotificationAction } from './notification-action.types';
import { NotificationTemplate } from './notification-template.types';
import { NotificationSchedule } from './notification-schedule.types';

export interface NotificationMetadata {
  source: string;
  sourceId?: string;
  ipAddress?: string;
  deviceId?: string;
  sessionId?: string;
  language?: string;
  timezone?: string;
  customData: Record<string, unknown>;
}

export interface Notification extends BaseEntity {
  notificationId: string;
  userId: string;
  user: User;
  title: string;
  body: string;
  status: keyof typeof NOTIFICATION_STATUS | string;
  type: keyof typeof NOTIFICATION_TYPE.TYPES | string;
  category: keyof typeof NOTIFICATION_CATEGORY.TYPES | string;
  priority: keyof typeof NOTIFICATION_PRIORITY.TYPES | string;
  channel: NotificationChannel;
  delivery: NotificationDelivery;
  actions: NotificationAction[];
  template: NotificationTemplate;
  schedule: NotificationSchedule;
  metadata: NotificationMetadata;
  sentAt?: Date;
  deliveredAt?: Date;
  readAt?: Date;
  isRead: boolean;
  isDismissed: boolean;
  isArchived: boolean;
}
