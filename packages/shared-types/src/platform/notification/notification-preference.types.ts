import { BaseEntity } from '../../common/base.types';
import { User } from '../../user/user.types';
import { NOTIFICATION_PREFERENCE } from '@vubon/shared-constants/src/platform/notification/notification-preference.constants';
import { NOTIFICATION_TYPE } from '@vubon/shared-constants/src/platform/notification/notification-type.constants';
import { NOTIFICATION_CHANNEL } from '@vubon/shared-constants/src/platform/notification/notification-channel.constants';

export interface NotificationPreference extends BaseEntity {
  preferenceId: string;
  userId: string;
  user: User;
  type: keyof typeof NOTIFICATION_PREFERENCE.TYPES | string;
  notificationType: keyof typeof NOTIFICATION_TYPE.TYPES | string;
  channel: keyof typeof NOTIFICATION_CHANNEL.TYPES | string;
  option: keyof typeof NOTIFICATION_PREFERENCE.PREFERENCE_OPTIONS | string;
  isAllowed: boolean;
  isBlocked: boolean;
  isDigest: boolean;
  metadata: Record<string, unknown>;
}
