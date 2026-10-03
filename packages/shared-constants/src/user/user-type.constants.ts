export const USER_TYPE = {
  INDIVIDUAL: 'individual',
  BUSINESS: 'business',
  VENDOR: 'vendor',
  ADMIN: 'admin',
  STAFF: 'staff',
  GUEST: 'guest',
  SYSTEM: 'system',
} as const;

export type UserTypeType = (typeof USER_TYPE)[keyof typeof USER_TYPE];
