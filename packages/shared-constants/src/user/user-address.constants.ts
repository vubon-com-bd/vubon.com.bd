/**
 * User Address Constants
 * ইউজার ঠিকানা সম্পর্কিত কনস্ট্যান্টস
 */

import { DIVISIONS } from '../common';

export const USER_ADDRESS = {
  // Address types
  TYPES: {
    SHIPPING: 'shipping',
    BILLING: 'billing',
    BOTH: 'both',
    OFFICE: 'office',
    HOME: 'home',
    OTHER: 'other',
  },

  // Divisions (from common)
  DIVISIONS: DIVISIONS,

  // Country codes
  COUNTRIES: {
    BD: 'BD',
    US: 'US',
    UK: 'UK',
    AE: 'AE',
    IN: 'IN',
    SG: 'SG',
    MY: 'MY',
  },

  // Default values
  DEFAULTS: {
    TYPE: 'both',
    COUNTRY: 'BD',
    DIVISION: DIVISIONS.DHAKA,
    IS_DEFAULT: false,
  },

  // Validation rules
  VALIDATION: {
    STREET_MIN_LENGTH: 2,
    STREET_MAX_LENGTH: 200,
    CITY_MIN_LENGTH: 2,
    CITY_MAX_LENGTH: 50,
    STATE_MIN_LENGTH: 2,
    STATE_MAX_LENGTH: 50,
    POSTAL_CODE_LENGTH: 4,
  },
} as const;

export type UserAddressType = (typeof USER_ADDRESS.TYPES)[keyof typeof USER_ADDRESS.TYPES];
export type UserAddressCountry =
  (typeof USER_ADDRESS.COUNTRIES)[keyof typeof USER_ADDRESS.COUNTRIES];
