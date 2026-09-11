import { BaseEntity } from '../common/base.types';
import { USER_PREFERENCES } from '@vubon/shared-constants/src/user/user-preferences.constants';

/**
 * User preference type value
 */
export type UserPreferenceType = (typeof USER_PREFERENCES)[keyof typeof USER_PREFERENCES];

/**
 * User preferences interface
 */
export interface UserPreferences extends BaseEntity {
  preferenceId: string;
  userId: string;
  type: UserPreferenceType;
  value: unknown;
  isDefault: boolean;
  metadata: Record<string, unknown>;
}
