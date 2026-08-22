/**
 * User Type Constants
 * Defines all possible user account types
 */

export const USER_TYPE = {
  CUSTOMER: 'customer',
  VENDOR: 'vendor',
  ADMIN: 'admin',
  GUEST: 'guest',
  AFFILIATE: 'affiliate',
  WHOLESALER: 'wholesaler',
  RETAILER: 'retailer',
  DISTRIBUTOR: 'distributor',
} as const;

export type UserType = (typeof USER_TYPE)[keyof typeof USER_TYPE];

export const USER_TYPE_LABELS: Record<UserType, string> = {
  [USER_TYPE.CUSTOMER]: 'Customer',
  [USER_TYPE.VENDOR]: 'Vendor',
  [USER_TYPE.ADMIN]: 'Administrator',
  [USER_TYPE.GUEST]: 'Guest',
  [USER_TYPE.AFFILIATE]: 'Affiliate',
  [USER_TYPE.WHOLESALER]: 'Wholesaler',
  [USER_TYPE.RETAILER]: 'Retailer',
  [USER_TYPE.DISTRIBUTOR]: 'Distributor',
};

export const USER_TYPE_DESCRIPTIONS: Record<UserType, string> = {
  [USER_TYPE.CUSTOMER]: 'Regular customer who purchases products',
  [USER_TYPE.VENDOR]: 'Vendor who sells products on the platform',
  [USER_TYPE.ADMIN]: 'Platform administrator with full access',
  [USER_TYPE.GUEST]: 'Guest user with limited access',
  [USER_TYPE.AFFILIATE]: 'Affiliate marketer who earns commission',
  [USER_TYPE.WHOLESALER]: 'Bulk purchaser with wholesale pricing',
  [USER_TYPE.RETAILER]: 'Retailer who buys for resale',
  [USER_TYPE.DISTRIBUTOR]: 'Distributor who supplies products',
};

export const BUSINESS_USER_TYPES: UserType[] = [
  USER_TYPE.VENDOR,
  USER_TYPE.WHOLESALER,
  USER_TYPE.RETAILER,
  USER_TYPE.DISTRIBUTOR,
];

export const CONSUMER_USER_TYPES: UserType[] = [
  USER_TYPE.CUSTOMER,
  USER_TYPE.GUEST,
  USER_TYPE.AFFILIATE,
];

export const VERIFICATION_REQUIRED_TYPES: UserType[] = [
  USER_TYPE.VENDOR,
  USER_TYPE.WHOLESALER,
  USER_TYPE.DISTRIBUTOR,
];

export function isBusinessUser(type: UserType): boolean {
  return BUSINESS_USER_TYPES.includes(type);
}

export function isConsumerUser(type: UserType): boolean {
  return CONSUMER_USER_TYPES.includes(type);
}

export function requiresVerification(type: UserType): boolean {
  return VERIFICATION_REQUIRED_TYPES.includes(type);
}

export function getUserTypeLabel(type: UserType): string {
  return USER_TYPE_LABELS[type] || 'Unknown';
}

export function getUserTypeDescription(type: UserType): string {
  return USER_TYPE_DESCRIPTIONS[type] || '';
}
