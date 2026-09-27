/**
 * Address Config
 */
import { USER_ADDRESS } from '@vubon/shared-constants/user';

export const ADDRESS_CONFIG = Object.freeze({
  maxAddresses: USER_ADDRESS.MAX_ADDRESSES,
  lineMinLength: USER_ADDRESS.LINE_MIN_LENGTH,
  lineMaxLength: USER_ADDRESS.LINE_MAX_LENGTH,
  cityMaxLength: USER_ADDRESS.CITY_MAX_LENGTH,
  labelMaxLength: USER_ADDRESS.LABEL_MAX_LENGTH,
  postalCodeLength: USER_ADDRESS.POSTAL_CODE_LENGTH,
} as const);

export type AddressConfig = typeof ADDRESS_CONFIG;
