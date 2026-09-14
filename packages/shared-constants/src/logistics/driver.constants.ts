export const DRIVER_STATUS = {
  AVAILABLE: 'available',
  ON_DUTY: 'on_duty',
  ON_BREAK: 'on_break',
  OFF_DUTY: 'off_duty',
  ON_LEAVE: 'on_leave',
  SUSPENDED: 'suspended',
  INACTIVE: 'inactive',
} as const;

export const DRIVER_TYPE = {
  FULL_TIME: 'full_time',
  PART_TIME: 'part_time',
  CONTRACT: 'contract',
  FREELANCE: 'freelance',
  THIRD_PARTY: 'third_party',
} as const;

export const DRIVER_LICENSE_TYPE = {
  MOTORCYCLE: 'motorcycle',
  LIGHT: 'light',
  MEDIUM: 'medium',
  HEAVY: 'heavy',
  PROFESSIONAL: 'professional',
} as const;

export const DRIVER = {
  STATUS: DRIVER_STATUS,
  TYPE: DRIVER_TYPE,
  LICENSE_TYPE: DRIVER_LICENSE_TYPE,
  MAX_ACTIVE_DRIVERS: 10000,
  MIN_AGE: 18,
  MAX_AGE: 70,
  MAX_WORKING_HOURS_PER_DAY: 10,
  MAX_DELIVERIES_PER_DAY: 50,
  BREAK_DURATION_MINUTES: 30,
  MIN_RATING: 3.0,
  MAX_RATING: 5.0,
  LICENSE_EXPIRY_WARNING_DAYS: 30,
  REQUIRE_LICENSE: true,
  REQUIRE_BACKGROUND_CHECK: true,
  REQUIRE_TRAINING: true,
  ALLOW_CASH_COLLECTION: true,
  MAX_CASH_LIMIT: 50000,
} as const;

export type DriverStatusType = (typeof DRIVER_STATUS)[keyof typeof DRIVER_STATUS];
export type DriverTypeType = (typeof DRIVER_TYPE)[keyof typeof DRIVER_TYPE];
export type DriverLicenseTypeType = (typeof DRIVER_LICENSE_TYPE)[keyof typeof DRIVER_LICENSE_TYPE];
