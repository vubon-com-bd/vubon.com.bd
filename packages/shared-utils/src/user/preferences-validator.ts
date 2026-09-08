import { USER_PREFERENCES } from '@vubon/shared-constants';
import { UserPreferences } from '@vubon/shared-types';

export const validatePreferences = (
  prefs: Partial<UserPreferences>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (prefs.type && !Object.keys(USER_PREFERENCES).includes(prefs.type)) {
    errors.push('Invalid preference type');
  }
  return { isValid: errors.length === 0, errors };
};
