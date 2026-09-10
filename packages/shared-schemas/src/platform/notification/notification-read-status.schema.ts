import { z } from 'zod';
import { StatusSchema } from '../../common/status.schema';
import { NOTIFICATION_READ_STATUS } from '@vubon/shared-constants/src/platform/notification/notification-read-status.constants';

const notificationReadStatusKeys = Object.keys(NOTIFICATION_READ_STATUS) as [string, ...string[]];

export const NotificationReadStatusSchema = StatusSchema.extend({
  status: z.enum(notificationReadStatusKeys),
  category: z.literal('notification_read'),
});

export const NotificationReadStatusEnumSchema = z.enum(notificationReadStatusKeys);
