import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { USER_ADDRESS } from '../../user/user-address.constants';
import { COUNTRY } from '../../common/country.constants';
import { DIVISIONS } from '../../common/divisions.constants';
import { DISTRICTS } from '../../common/districts.constants';

export const SHIPPING_ADDRESS = {
  TYPES: {
    ...COMMON_TYPES,
    ...USER_ADDRESS,
    HOME: 'home',
    OFFICE: 'office',
    OTHER: 'other',
  },
  COUNTRY: { ...COUNTRY },
  DIVISIONS: { ...DIVISIONS },
  DISTRICTS: { ...DISTRICTS },
  REQUIRED_FIELDS: [
    'full_name',
    'phone',
    'address_line1',
    'city',
    'division',
    'district',
    'country',
    'postal_code',
  ],
  MAX_ADDRESS_LENGTH: 255,
} as const;
