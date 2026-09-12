import { validateEmail } from '../common/validator/email.validator';
import { validatePhone } from '../common/validator/phone.validator';
import { USER_PROFILE } from '@vubon/shared-constants/src/user/user-profile.constants';

export interface UserProfile {
  email?: string;
  phone?: string;
  visibility: string;
}

export const validateProfile = (
  profile: Partial<UserProfile>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (profile.email && !validateEmail(profile.email).isValid) {
    errors.push('Invalid email');
  }
  if (profile.phone && !validatePhone(profile.phone).isValid) {
    errors.push('Invalid phone');
  }
  if (profile.visibility && !Object.keys(USER_PROFILE).includes(profile.visibility)) {
    errors.push('Invalid visibility setting');
  }
  return { isValid: errors.length === 0, errors };
};
