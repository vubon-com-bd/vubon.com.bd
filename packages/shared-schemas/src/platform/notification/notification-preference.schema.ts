import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { NOTIFICATION_PREFERENCE } from '@vubon/shared-constants/src/platform/notification/notification-preference.constants';
import { NOTIFICATION_TYPE } from '@vubon/shared-constants/src/platform/notification/notification-type.constants';
import { NOTIFICATION_CHANNEL } from '@vubon/shared-constants/src/platform/notification/notification-channel.constants';

const notificationPreferenceTypeKeys = Object.keys(NOTIFICATION_PREFERENCE.TYPES) as [
  string,
  ...string[],
];
const notificationTypeKeys = Object.keys(NOTIFICATION_TYPE.TYPES) as [string, ...string[]];
const notificationChannelKeys = Object.keys(NOTIFICATION_CHANNEL.TYPES) as [string, ...string[]];
const notificationPreferenceOptionKeys = Object.keys(
  NOTIFICATION_PREFERENCE.PREFERENCE_OPTIONS
) as [string, ...string[]];

export const NotificationPreferenceSchema = BaseSchema.extend({
  preferenceId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  type: z.enum(notificationPreferenceTypeKeys),
  notificationType: z.enum(notificationTypeKeys),
  channel: z.enum(notificationChannelKeys),
  option: z.enum(notificationPreferenceOptionKeys),
  isAllowed: z.boolean().default(true),
  isBlocked: z.boolean().default(false),
  isDigest: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
