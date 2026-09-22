import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const ADDRESS_CONFIG = Object.freeze({
  maxAddressesPerUser: getOptionalEnvInt('ADDRESS_MAX_PER_USER', 10),
  requirePostalCode: true,
  defaultCountry: 'BD',
  minLineLength: 3,
  maxLineLength: 255,
} as const);
