import { USER_SETTINGS } from '@vubon/shared-constants';
import { UserSettings } from '@vubon/shared-types';

export const validateSettings = (
  settings: Partial<UserSettings>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (settings.theme && !Object.keys(USER_SETTINGS).includes(settings.theme)) {
    errors.push('Invalid theme');
  }
  return { isValid: errors.length === 0, errors };
};
