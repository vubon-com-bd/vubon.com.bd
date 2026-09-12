import { z } from 'zod';
import { NOTIFICATION_TYPE } from '@vubon/shared-constants/src/platform/notification/notification-type.constants';

const notificationTypeKeys = Object.keys(NOTIFICATION_TYPE.TYPES) as [string, ...string[]];

export const NotificationTypeSchema = z.object({
  type: z.enum(notificationTypeKeys),
  category: z.literal('notification_type'),
});

export const NotificationTypeEnumSchema = z.enum(notificationTypeKeys);
