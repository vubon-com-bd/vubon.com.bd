import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { USER_ADDRESS } from '../../user/user-address.constants';
import { COUNTRY } from '../../common/country.constants';

export const BILLING_ADDRESS = {
  TYPES: {
    ...COMMON_TYPES,
    ...USER_ADDRESS,
    SAME_AS_SHIPPING: 'same_as_shipping',
    DIFFERENT: 'different',
    NEW: 'new',
    SAVED: 'saved',
  },
  COUNTRY: { ...COUNTRY },
  REQUIRED_FIELDS: ['full_name', 'phone', 'address_line1', 'city', 'country', 'postal_code'],
  MAX_ADDRESS_LENGTH: 255,
} as const;
