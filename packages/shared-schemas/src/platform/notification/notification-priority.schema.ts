import { z } from 'zod';
import { NOTIFICATION_PRIORITY } from '@vubon/shared-constants/src/platform/notification/notification-priority.constants';

const notificationPriorityTypeKeys = Object.keys(NOTIFICATION_PRIORITY.TYPES) as [
  string,
  ...string[],
];
const notificationPriorityLevelKeys = Object.keys(NOTIFICATION_PRIORITY.PRIORITY_LEVELS) as [
  string,
  ...string[],
];

export const NotificationPrioritySchema = z.object({
  priority: z.enum(notificationPriorityTypeKeys),
  category: z.literal('notification_priority'),
  level: z.enum(notificationPriorityLevelKeys),
  deliveryTimeoutMinutes: z.number().int().min(1),
  isLow: z.boolean().default(false),
  isMedium: z.boolean().default(false),
  isHigh: z.boolean().default(false),
  isUrgent: z.boolean().default(false),
  isCritical: z.boolean().default(false),
});

export const NotificationPriorityEnumSchema = z.enum(notificationPriorityTypeKeys);
