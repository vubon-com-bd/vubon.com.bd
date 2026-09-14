/**
 * Notification Preference Types
 * @module shared-types/platform/notification
 */

import type {
  NOTIFICATION_PREFERENCE_TYPE,
  NOTIFICATION_PREFERENCE_FREQUENCY,
  NOTIFICATION_PREFERENCE_DEFAULT,
} from '@vubon/shared-constants/platform';
import type { UserId } from '../../common/primitives';

export type NotificationPreferenceTypeValue =
  (typeof NOTIFICATION_PREFERENCE_TYPE)[keyof typeof NOTIFICATION_PREFERENCE_TYPE];

export type NotificationPreferenceFrequencyValue =
  (typeof NOTIFICATION_PREFERENCE_FREQUENCY)[keyof typeof NOTIFICATION_PREFERENCE_FREQUENCY];

export type NotificationPreferenceDefaults = typeof NOTIFICATION_PREFERENCE_DEFAULT;

export interface NotificationPreference {
  readonly userId: UserId;
  readonly type: NotificationPreferenceTypeValue;
  readonly email: boolean;
  readonly sms: boolean;
  readonly push: boolean;
  readonly inApp: boolean;
  readonly webhook: boolean;
  readonly whatsapp: boolean;
  readonly frequency: NotificationPreferenceFrequencyValue;
  readonly quietHoursEnabled: boolean;
  readonly quietHoursStart?: number;
  readonly quietHoursEnd?: number;
  readonly timezone: string;
  readonly locale: string;
  readonly updatedAt: string;
}

export interface NotificationPreferenceUpdate {
  readonly email?: boolean;
  readonly sms?: boolean;
  readonly push?: boolean;
  readonly inApp?: boolean;
  readonly webhook?: boolean;
  readonly whatsapp?: boolean;
  readonly frequency?: NotificationPreferenceFrequencyValue;
  readonly quietHoursEnabled?: boolean;
  readonly quietHoursStart?: number;
  readonly quietHoursEnd?: number;
}
