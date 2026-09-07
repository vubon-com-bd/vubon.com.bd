import { USER_PREFERENCES } from '@vubon/shared-constants';

export interface UserPreferences {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isDeleted: boolean;
  preferenceId: string;
  userId: string;
  type: keyof typeof USER_PREFERENCES;
  value: unknown;
  isDefault: boolean;
  metadata: Record<string, unknown>;
}
