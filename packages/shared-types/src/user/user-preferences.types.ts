/**
 * User Preferences Types
 * @module shared-types/user
 *
 * Values আসে shared-constants/user/user-preferences.constants থেকে।
 */

import type { USER_PREFERENCE, USER_PREFERENCE_CHANNEL } from '@vubon/shared-constants/user';
import type { UserId } from '../common/primitives';

export type PreferenceKey = (typeof USER_PREFERENCE)[keyof typeof USER_PREFERENCE];

export type PreferenceChannelValue =
  (typeof USER_PREFERENCE_CHANNEL)[keyof typeof USER_PREFERENCE_CHANNEL];

export interface UserPreferences {
  readonly userId: UserId;
  readonly newsletter: boolean;
  readonly promotions: boolean;
  readonly orderUpdates: boolean;
  readonly productRecommendations: boolean;
  readonly securityAlerts: boolean;
  readonly channels: PreferenceChannelSetting[];
  readonly updatedAt: string;
}

export interface PreferenceChannelSetting {
  readonly channel: PreferenceChannelValue;
  readonly enabled: boolean;
}

export interface UserPreferenceInput {
  readonly newsletter?: boolean;
  readonly promotions?: boolean;
  readonly orderUpdates?: boolean;
  readonly productRecommendations?: boolean;
  readonly securityAlerts?: boolean;
  readonly channels?: readonly PreferenceChannelSetting[];
}
