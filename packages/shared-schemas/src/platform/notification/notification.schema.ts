import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { NotificationChannelSchema } from './notification-channel.schema';
import { NotificationDeliveryStatusSchema } from './notification-delivery-status.schema';
import { NotificationTemplateSchema } from './notification-template.schema';
import { NotificationScheduleSchema } from './notification-schedule.schema';
import { NOTIFICATION_STATUS } from '@vubon/shared-constants/src/platform/notification/notification-status.constants';
import { PLATFORM_NOTIFICATION } from '@vubon/shared-constants/src/platform/notification/platform-notification.constants';

const notificationStatusKeys = Object.keys(NOTIFICATION_STATUS) as [string, ...string[]];
const notificationTypeKeys = Object.keys(PLATFORM_NOTIFICATION.NOTIFICATION_TYPES) as [
  string,
  ...string[],
];

export const NotificationSchema = BaseSchema.extend({
  notificationId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  title: z.string().min(1).max(255),
  body: z.string().min(1).max(1000),
  status: z.enum(notificationStatusKeys),
  type: z.enum(notificationTypeKeys),
  channel: NotificationChannelSchema,
  delivery: NotificationDeliveryStatusSchema,
  template: NotificationTemplateSchema,
  schedule: NotificationScheduleSchema,
  metadata: z.object({
    source: z.string(),
    sourceId: z.string().optional(),
    ipAddress: z.string().optional(),
    deviceId: z.string().optional(),
    sessionId: z.string().optional(),
    language: z.string().optional(),
    timezone: z.string().optional(),
    customData: z.record(z.unknown()),
  }),
  sentAt: z.date().optional(),
  deliveredAt: z.date().optional(),
  readAt: z.date().optional(),
  isRead: z.boolean().default(false),
  isDismissed: z.boolean().default(false),
  isArchived: z.boolean().default(false),
});

export const NotificationCreateSchema = NotificationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  isRead: true,
  isDismissed: true,
  isArchived: true,
  sentAt: true,
  deliveredAt: true,
  readAt: true,
});

export const NotificationUpdateSchema = NotificationCreateSchema.partial();
