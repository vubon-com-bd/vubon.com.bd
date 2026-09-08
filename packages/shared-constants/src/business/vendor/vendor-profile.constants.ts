import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { USER_PROFILE } from '../../user/user-profile.constants';
import { VENDOR_STATUS } from './vendor-status.constants';

export const VENDOR_PROFILE = {
  TYPES: {
    ...COMMON_TYPES,
    ...USER_PROFILE,
    PUBLIC: 'public',
    PRIVATE: 'private',
    RESTRICTED: 'restricted',
  },
  USER_PROFILE: { ...USER_PROFILE },
  VENDOR_STATUS: { ...VENDOR_STATUS },
  PROFILE_SECTIONS: [
    'basic_info',
    'business_info',
    'contact_info',
    'address',
    'bank_account',
    'documents',
    'social_links',
    'store_hours',
  ],
  MAX_DESCRIPTION_LENGTH: 5000,
  MIN_DESCRIPTION_LENGTH: 100,
} as const;
