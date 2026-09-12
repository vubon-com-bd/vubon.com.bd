import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { NOTIFICATION_SETTINGS } from '@vubon/shared-constants/src/platform/notification/notification-settings.constants';

const notificationSettingsTypeKeys = Object.keys(NOTIFICATION_SETTINGS.TYPES) as [
  string,
  ...string[],
];
const notificationSettingsCategoryKeys = Object.keys(NOTIFICATION_SETTINGS.SETTINGS_CATEGORIES) as [
  string,
  ...string[],
];

export const NotificationSettingsSchema = BaseSchema.extend({
  settingsId: z.string().uuid(),
  type: z.enum(notificationSettingsTypeKeys),
  key: z.enum(notificationSettingsCategoryKeys),
  value: z.unknown(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});

export const NotificationSettingsValuesSchema = z.object({
  enableEmail: z.boolean().default(true),
  enableSms: z.boolean().default(true),
  enablePush: z.boolean().default(true),
  enableInApp: z.boolean().default(true),
  enableWebhook: z.boolean().default(false),
  maxDailyNotifications: z.number().int().min(1),
  maxHourlyNotifications: z.number().int().min(1),
  retryAttempts: z.number().int().min(0),
  retryInterval: z.number().int().min(1),
  defaultPriority: z.string(),
  timezone: z.string(),
  language: z.string(),
});
