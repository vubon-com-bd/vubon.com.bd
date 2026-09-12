import { z } from 'zod';
import { NOTIFICATION_CHANNEL } from '@vubon/shared-constants/src/platform/notification/notification-channel.constants';

const notificationChannelKeys = Object.keys(NOTIFICATION_CHANNEL.TYPES) as [string, ...string[]];
const notificationChannelPriorityKeys = Object.keys(NOTIFICATION_CHANNEL.CHANNEL_PRIORITIES) as [
  string,
  ...string[],
];

export const NotificationChannelSchema = z.object({
  channel: z.enum(notificationChannelKeys),
  category: z.literal('notification_channel'),
  priority: z.enum(notificationChannelPriorityKeys),
  isEmail: z.boolean().default(false),
  isSms: z.boolean().default(false),
  isPush: z.boolean().default(false),
  isInApp: z.boolean().default(false),
  isWebhook: z.boolean().default(false),
  isWhatsApp: z.boolean().default(false),
  isMessenger: z.boolean().default(false),
  isTelegram: z.boolean().default(false),
  isSlack: z.boolean().default(false),
  isDiscord: z.boolean().default(false),
});

export const NotificationChannelEnumSchema = z.enum(notificationChannelKeys);
