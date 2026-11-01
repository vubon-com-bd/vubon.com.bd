export const COURIER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  PENDING: 'pending',
  TERMINATED: 'terminated',
} as const;

export const COURIER_TYPE = {
  LOCAL: 'local',
  NATIONAL: 'national',
  INTERNATIONAL: 'international',
  THIRD_PARTY: 'third_party',
  IN_HOUSE: 'in_house',
  MARKETPLACE: 'marketplace',
} as const;

export const COURIER_NAME = {
  SA_PARIBAHAN: 'sa_paribahan',
  SUNDARBAN: 'sundarban',
  KARATOYA: 'karatoya',
  SHOHAGH: 'shohagh',
  TRC: 'trc',
  DHL: 'dhl',
  FEDEX: 'fedex',
  UPS: 'ups',
  ARAMEX: 'aramex',
  PATHao: 'pathao',
  REDX: 'redx',
  PAPERFLY: 'paperfly',
  STEADFAST: 'steadfast',
  ECURIER: 'ecourier',
} as const;

export const COURIER = {
  STATUS: COURIER_STATUS,
  TYPE: COURIER_TYPE,
  NAME: COURIER_NAME,
  MAX_ACTIVE_COURIERS: 50,
  API_TIMEOUT_SECONDS: 30,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY_SECONDS: 60,
  AUTO_SELECT_CHEAPEST: false,
  PREFER_FASTEST: true,
  REQUIRE_API_KEY: true,
  TRACK_ENABLED: true,
} as const;

export type CourierStatusType = (typeof COURIER_STATUS)[keyof typeof COURIER_STATUS];
export type CourierTypeType = (typeof COURIER_TYPE)[keyof typeof COURIER_TYPE];
export type CourierNameType = (typeof COURIER_NAME)[keyof typeof COURIER_NAME];
