import { NOTIFICATION_PREFERENCE } from '@vubon/shared-constants/src/platform/notification/notification-preference.constants';
import { NOTIFICATION_TYPE } from '@vubon/shared-constants/src/platform/notification/notification-type.constants';
import { NOTIFICATION_CHANNEL } from '@vubon/shared-constants/src/platform/notification/notification-channel.constants';

export interface PreferenceInput {
  userId: string;
  type: string;
  notificationType: string;
  channel: string;
  option: string;
}

export const validatePreference = (
  pref: Partial<PreferenceInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!pref.userId) errors.push('User ID is required');
  if (pref.type && !Object.keys(NOTIFICATION_PREFERENCE.TYPES).includes(pref.type)) {
    errors.push('Invalid preference type');
  }
  if (
    pref.notificationType &&
    !Object.keys(NOTIFICATION_TYPE.TYPES).includes(pref.notificationType)
  ) {
    errors.push('Invalid notification type');
  }
  if (pref.channel && !Object.keys(NOTIFICATION_CHANNEL.TYPES).includes(pref.channel)) {
    errors.push('Invalid channel');
  }
  if (
    pref.option &&
    !Object.keys(NOTIFICATION_PREFERENCE.PREFERENCE_OPTIONS).includes(pref.option)
  ) {
    errors.push('Invalid preference option');
  }
  return { isValid: errors.length === 0, errors };
};
