export const USER_ADDRESS_TYPE = {
  HOME: 'home',
  WORK: 'work',
  BILLING: 'billing',
  SHIPPING: 'shipping',
  OTHER: 'other',
} as const;

export const USER_ADDRESS = {
  MAX_ADDRESSES: 10,
  LINE_MIN_LENGTH: 3,
  LINE_MAX_LENGTH: 255,
  CITY_MAX_LENGTH: 100,
  STATE_MAX_LENGTH: 100,
  POSTAL_CODE_LENGTH: 4,
  COUNTRY_CODE_LENGTH: 2,
  LABEL_MAX_LENGTH: 50,
} as const;

export type UserAddressType = (typeof USER_ADDRESS_TYPE)[keyof typeof USER_ADDRESS_TYPE];
