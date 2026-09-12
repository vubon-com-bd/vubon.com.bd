import { z } from 'zod';
import { StatusSchema } from '../../common/status.schema';
import { NOTIFICATION_STATUS } from '@vubon/shared-constants/src/platform/notification/notification-status.constants';

const notificationStatusKeys = Object.keys(NOTIFICATION_STATUS) as [string, ...string[]];

export const NotificationStatusSchema = StatusSchema.extend({
  status: z.enum(notificationStatusKeys),
  category: z.literal('notification'),
});

export const NotificationStatusEnumSchema = z.enum(notificationStatusKeys);
