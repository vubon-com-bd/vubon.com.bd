import { BaseEntity } from '../../common/base.types';
import { User } from '../../user/user.types';
import { NOTIFICATION_PREFERENCES } from '@vubon/shared-constants/src/platform/notification/notification-preferences.constants';
import { NotificationSettings } from './notification-settings.types';
import { NOTIFICATION_TYPE } from '@vubon/shared-constants/src/platform/notification/notification-type.constants';
import { NOTIFICATION_CHANNEL } from '@vubon/shared-constants/src/platform/notification/notification-channel.constants';

export interface PlatformNotificationPreferences extends BaseEntity {
  preferenceId: string;
  userId: string;
  user: User;
  type: keyof typeof NOTIFICATION_PREFERENCES.TYPES | string;
  group: keyof typeof NOTIFICATION_PREFERENCES.PREFERENCE_GROUPS | string;
  channels: (keyof typeof NOTIFICATION_CHANNEL.TYPES | string)[];
  notificationTypes: (keyof typeof NOTIFICATION_TYPE.TYPES | string)[];
  settings: NotificationSettings;
  isActive: boolean;
  isDefault: boolean;
  metadata: Record<string, unknown>;
}
