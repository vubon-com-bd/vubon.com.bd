import { BaseEntity } from '../common/base.types';
import { USER_PREFERENCES } from '@vubon/shared-constants/src/user/user-preferences.constants';

/**
 * User preferences interface
 */
export interface UserPreferences extends BaseEntity {
  preferenceId: string;
  userId: string;
  type: keyof typeof USER_PREFERENCES;
  value: unknown;
  isDefault: boolean;
  metadata: Record<string, unknown>;
}
