/**
 * User Address Configuration
 * @module shared-config/user/address
 */
import {
  USER_ADDRESS,
  USER_ADDRESS_TYPE,
} from '@vubon/shared-constants/user';
import { DIVISION } from '@vubon/shared-constants/common';
import {
  getOptionalEnvBool,
  getOptionalEnvInt,
} from '../../common/env/env.helper.js';

export const ADDRESS_CONFIG = Object.freeze({
  maxAddresses: USER_ADDRESS.MAX_ADDRESSES,
  lineMinLength: USER_ADDRESS.LINE_MIN_LENGTH,
  lineMaxLength: USER_ADDRESS.LINE_MAX_LENGTH,
  cityMaxLength: USER_ADDRESS.CITY_MAX_LENGTH,
  stateMaxLength: USER_ADDRESS.STATE_MAX_LENGTH,
  postalCodeLength: USER_ADDRESS.POSTAL_CODE_LENGTH,
  countryCodeLength: USER_ADDRESS.COUNTRY_CODE_LENGTH,
  labelMaxLength: USER_ADDRESS.LABEL_MAX_LENGTH,

  defaultCountry: 'BD',
  allowedTypes: Object.freeze(Object.values(USER_ADDRESS_TYPE)),
  allowedDivisions: Object.freeze(Object.values(DIVISION)),

  requirePhone: getOptionalEnvBool('ADDRESS_REQUIRE_PHONE', true),
  requirePostalCode: getOptionalEnvBool('ADDRESS_REQUIRE_POSTAL', true),
  allowMultipleDefaults: getOptionalEnvBool('ADDRESS_MULTI_DEFAULT', false),
  autoGeocode: getOptionalEnvBool('ADDRESS_AUTO_GEOCODE', false),
  verifyByDefault: getOptionalEnvBool('ADDRESS_VERIFY_DEFAULT', false),
  notifyOnChange: getOptionalEnvBool('ADDRESS_NOTIFY_CHANGE', true),
  minAddressesBeforeDelete: getOptionalEnvInt('ADDRESS_MIN_BEFORE_DELETE', 0),
});
