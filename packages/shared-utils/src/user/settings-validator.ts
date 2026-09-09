import { USER_SETTINGS } from '@vubon/shared-constants/src/user/user-settings.constants';

export interface UserSettings {
  theme: string;
  language: string;
  timezone: string;
}

export const validateSettings = (
  settings: Partial<UserSettings>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (settings.theme && !Object.keys(USER_SETTINGS).includes(settings.theme)) {
    errors.push('Invalid theme');
  }
  return { isValid: errors.length === 0, errors };
};
