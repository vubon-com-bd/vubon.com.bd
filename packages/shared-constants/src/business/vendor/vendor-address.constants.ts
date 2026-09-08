import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { USER_ADDRESS } from '../../user/user-address.constants';
import { COUNTRY } from '../../common/country.constants';
import { DIVISIONS } from '../../common/divisions.constants';
import { DISTRICTS } from '../../common/districts.constants';

export const VENDOR_ADDRESS = {
  TYPES: {
    ...COMMON_TYPES,
    ...USER_ADDRESS,
    BUSINESS: 'business',
    WAREHOUSE: 'warehouse',
    RETURN: 'return',
    BILLING: 'billing',
  },
  USER_ADDRESS: { ...USER_ADDRESS },
  COUNTRY: { ...COUNTRY },
  DIVISIONS: { ...DIVISIONS },
  DISTRICTS: { ...DISTRICTS },
  ADDRESS_TYPES: {
    REGISTERED: 'registered',
    OPERATIONAL: 'operational',
    WAREHOUSE: 'warehouse',
  },
  MAX_ADDRESSES: 20,
  REQUIRED_FIELDS: [
    'vendor_name',
    'address_line1',
    'city',
    'division',
    'district',
    'country',
    'postal_code',
    'phone',
  ],
} as const;
