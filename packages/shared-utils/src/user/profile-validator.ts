import { validateEmail } from '../common/validator/email.validator';
import { validatePhone } from '../common/validator/phone.validator';
import { UserProfile } from '@vubon/shared-types';
import { USER_PROFILE } from '@vubon/shared-constants';

export const validateProfile = (
  profile: Partial<UserProfile>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // নামের ভ্যালিডেশন
  if (profile.name) {
    if (!profile.name.value?.firstName) {
      errors.push('First name is required');
    }
    if (!profile.name.value?.lastName) {
      errors.push('Last name is required');
    }
  }

  // ইমেইল ভ্যালিডেশন (যদি থাকে)
  if (profile.email?.value && !validateEmail(profile.email.value).isValid) {
    errors.push('Invalid email format');
  }

  // ফোন নম্বর ভ্যালিডেশন (যদি থাকে)
  if (profile.phone?.value && !validatePhone(profile.phone.value).isValid) {
    errors.push('Invalid phone number format');
  }

  // ওয়েবসাইট URL ভ্যালিডেশন (যদি থাকে)
  if (profile.website) {
    try {
      new URL(profile.website);
    } catch {
      errors.push('Invalid website URL');
    }
  }

  // প্রোফাইল ভিজিবিলিটি ভ্যালিডেশন
  if (profile.visibility && !Object.keys(USER_PROFILE).includes(profile.visibility)) {
    errors.push('Invalid profile visibility setting');
  }

  return { isValid: errors.length === 0, errors };
};
