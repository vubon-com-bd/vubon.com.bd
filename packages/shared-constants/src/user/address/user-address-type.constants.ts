/**
 * User Address Type Constants
 * Defines all possible user address types
 */

export const USER_ADDRESS_TYPE = {
  SHIPPING: 'shipping',
  BILLING: 'billing',
  BOTH: 'both',
  WORK: 'work',
  HOME: 'home',
  OTHER: 'other',
} as const;

export type UserAddressType = (typeof USER_ADDRESS_TYPE)[keyof typeof USER_ADDRESS_TYPE];

export const USER_ADDRESS_TYPE_LABELS: Record<UserAddressType, string> = {
  [USER_ADDRESS_TYPE.SHIPPING]: 'Shipping Address',
  [USER_ADDRESS_TYPE.BILLING]: 'Billing Address',
  [USER_ADDRESS_TYPE.BOTH]: 'Shipping & Billing',
  [USER_ADDRESS_TYPE.WORK]: 'Work Address',
  [USER_ADDRESS_TYPE.HOME]: 'Home Address',
  [USER_ADDRESS_TYPE.OTHER]: 'Other Address',
};

export const USER_ADDRESS_TYPE_DESCRIPTIONS: Record<UserAddressType, string> = {
  [USER_ADDRESS_TYPE.SHIPPING]: 'Address for shipping orders',
  [USER_ADDRESS_TYPE.BILLING]: 'Address for billing and invoices',
  [USER_ADDRESS_TYPE.BOTH]: 'Address for both shipping and billing',
  [USER_ADDRESS_TYPE.WORK]: 'Workplace or office address',
  [USER_ADDRESS_TYPE.HOME]: 'Home or residential address',
  [USER_ADDRESS_TYPE.OTHER]: 'Other type of address',
};

export const SHIPPING_ADDRESS_TYPES: UserAddressType[] = [
  USER_ADDRESS_TYPE.SHIPPING,
  USER_ADDRESS_TYPE.BOTH,
];

export const BILLING_ADDRESS_TYPES: UserAddressType[] = [
  USER_ADDRESS_TYPE.BILLING,
  USER_ADDRESS_TYPE.BOTH,
];

export const RESIDENTIAL_ADDRESS_TYPES: UserAddressType[] = [
  USER_ADDRESS_TYPE.HOME,
  USER_ADDRESS_TYPE.BOTH,
];

export const BUSINESS_ADDRESS_TYPES: UserAddressType[] = [
  USER_ADDRESS_TYPE.WORK,
  USER_ADDRESS_TYPE.OTHER,
];

export function isShippingAddress(type: UserAddressType): boolean {
  return SHIPPING_ADDRESS_TYPES.includes(type);
}

export function isBillingAddress(type: UserAddressType): boolean {
  return BILLING_ADDRESS_TYPES.includes(type);
}

export function isResidentialAddress(type: UserAddressType): boolean {
  return RESIDENTIAL_ADDRESS_TYPES.includes(type);
}

export function isBusinessAddress(type: UserAddressType): boolean {
  return BUSINESS_ADDRESS_TYPES.includes(type);
}

export function getAddressTypeLabel(type: UserAddressType): string {
  return USER_ADDRESS_TYPE_LABELS[type] || 'Unknown';
}

export function getAddressTypeDescription(type: UserAddressType): string {
  return USER_ADDRESS_TYPE_DESCRIPTIONS[type] || '';
}

export function getAddressTypeByValue(value: string): UserAddressType | null {
  const normalized = value.toLowerCase();
  const types = Object.values(USER_ADDRESS_TYPE);
  return types.find((type) => type.toLowerCase() === normalized) || null;
}
