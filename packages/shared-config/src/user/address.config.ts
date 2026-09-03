/**
 * Address Configuration
 * ইউজার ঠিকানা কনফিগারেশন
 */

import { USER_ADDRESS } from '@vubon/shared-constants';

export interface AddressConfig {
  enabled: boolean;
  types: string[];
  countries: string[];
  divisions: string[];
  validation: {
    streetMinLength: number;
    streetMaxLength: number;
    cityMinLength: number;
    cityMaxLength: number;
    stateMinLength: number;
    stateMaxLength: number;
    postalCodeLength: number;
  };
  defaults: {
    type: string;
    country: string;
    division: string;
    isDefault: boolean;
  };
  maxAddressesPerUser: number;
}

export const createAddressConfig = (): AddressConfig => ({
  enabled: true,
  types: Object.values(USER_ADDRESS.TYPES),
  countries: Object.values(USER_ADDRESS.COUNTRIES),
  divisions: Object.values(USER_ADDRESS.DIVISIONS),
  validation: {
    streetMinLength: USER_ADDRESS.VALIDATION.STREET_MIN_LENGTH,
    streetMaxLength: USER_ADDRESS.VALIDATION.STREET_MAX_LENGTH,
    cityMinLength: USER_ADDRESS.VALIDATION.CITY_MIN_LENGTH,
    cityMaxLength: USER_ADDRESS.VALIDATION.CITY_MAX_LENGTH,
    stateMinLength: USER_ADDRESS.VALIDATION.STATE_MIN_LENGTH,
    stateMaxLength: USER_ADDRESS.VALIDATION.STATE_MAX_LENGTH,
    postalCodeLength: USER_ADDRESS.VALIDATION.POSTAL_CODE_LENGTH,
  },
  defaults: {
    type: USER_ADDRESS.DEFAULTS.TYPE,
    country: USER_ADDRESS.DEFAULTS.COUNTRY,
    division: USER_ADDRESS.DEFAULTS.DIVISION,
    isDefault: USER_ADDRESS.DEFAULTS.IS_DEFAULT,
  },
  maxAddressesPerUser: 5,
});
