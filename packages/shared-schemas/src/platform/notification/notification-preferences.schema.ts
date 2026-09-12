import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { NOTIFICATION_PREFERENCES } from '@vubon/shared-constants/src/platform/notification/notification-preferences.constants';
import { NOTIFICATION_CHANNEL } from '@vubon/shared-constants/src/platform/notification/notification-channel.constants';
import { NOTIFICATION_TYPE } from '@vubon/shared-constants/src/platform/notification/notification-type.constants';
import { NotificationSettingsSchema } from './notification-settings.schema';

const notificationPreferencesTypeKeys = Object.keys(NOTIFICATION_PREFERENCES.TYPES) as [
  string,
  ...string[],
];
const notificationPreferencesGroupKeys = Object.keys(
  NOTIFICATION_PREFERENCES.PREFERENCE_GROUPS
) as [string, ...string[]];
const notificationChannelKeys = Object.keys(NOTIFICATION_CHANNEL.TYPES) as [string, ...string[]];
const notificationTypeKeys = Object.keys(NOTIFICATION_TYPE.TYPES) as [string, ...string[]];

export const NotificationPreferencesSchema = BaseSchema.extend({
  preferenceId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  type: z.enum(notificationPreferencesTypeKeys),
  group: z.enum(notificationPreferencesGroupKeys),
  channels: z.array(z.enum(notificationChannelKeys)),
  notificationTypes: z.array(z.enum(notificationTypeKeys)),
  settings: NotificationSettingsSchema,
  isActive: z.boolean().default(true),
  isDefault: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
