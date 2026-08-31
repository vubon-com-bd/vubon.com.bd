/**
 * User Address Constants
 * All possible user address-related constants in the system
 * Imports common values where applicable
 */

import { STATUS } from '../common/status.constants';

/**
 * User address types
 * Defines the types of addresses a user can have
 */
export const USER_ADDRESS_TYPE = {
  /** Residential/Home address */
  HOME: 'home',
  /** Work/Office address */
  WORK: 'work',
  /** Billing address */
  BILLING: 'billing',
  /** Shipping/Delivery address */
  SHIPPING: 'shipping',
  /** Other address */
  OTHER: 'other',
  /** Temporary address */
  TEMPORARY: 'temporary',
  /** Permanent address */
  PERMANENT: 'permanent',
  /** Vacation address */
  VACATION: 'vacation',
  /** PO Box address */
  PO_BOX: 'po_box',
} as const;

/**
 * User address status
 * Status of user addresses
 */
export const USER_ADDRESS_STATUS = {
  /** Address is active and current */
  ACTIVE: STATUS.ACTIVE,
  /** Address is inactive */
  INACTIVE: STATUS.INACTIVE,
  /** Address is pending verification */
  PENDING: STATUS.PENDING,
  /** Address is verified */
  VERIFIED: STATUS.VERIFIED,
  /** Address has been removed */
  REMOVED: 'removed',
  /** Address is set as default */
  DEFAULT: 'default',
  /** Address is set as billing address */
  BILLING: 'billing',
  /** Address is set as shipping address */
  SHIPPING: 'shipping',
  /** Address is primary */
  PRIMARY: 'primary',
  /** Address is secondary */
  SECONDARY: 'secondary',
} as const;

/**
 * User address verification status
 * Status of address verification
 */
export const USER_ADDRESS_VERIFICATION_STATUS = {
  /** Address is not verified */
  UNVERIFIED: 'unverified',
  /** Address is verified */
  VERIFIED: STATUS.VERIFIED,
  /** Verification is pending */
  PENDING: STATUS.PENDING,
  /** Verification has failed */
  FAILED: STATUS.FAILED,
  /** Verification requires manual review */
  REQUIRES_REVIEW: 'requires_review',
  /** Address is verified by admin */
  ADMIN_VERIFIED: 'admin_verified',
  /** Address is self-verified */
  SELF_VERIFIED: 'self_verified',
} as const;

/**
 * User address label types
 * Labels for different address fields
 */
export const USER_ADDRESS_LABEL = {
  /** Home label */
  HOME: 'home',
  /** Work label */
  WORK: 'work',
  /** Other label */
  OTHER: 'other',
  /** Billing label */
  BILLING: 'billing',
  /** Shipping label */
  SHIPPING: 'shipping',
  /** Primary label */
  PRIMARY: 'primary',
  /** Secondary label */
  SECONDARY: 'secondary',
} as const;

/**
 * User address field types
 * Types of address fields
 */
export const USER_ADDRESS_FIELD = {
  /** Street address */
  STREET: 'street',
  /** City */
  CITY: 'city',
  /** State/Province */
  STATE: 'state',
  /** Postal/ZIP code */
  POSTAL_CODE: 'postal_code',
  /** Country */
  COUNTRY: 'country',
  /** Building number */
  BUILDING_NUMBER: 'building_number',
  /** Apartment/Suite number */
  APARTMENT_NUMBER: 'apartment_number',
  /** Floor number */
  FLOOR_NUMBER: 'floor_number',
  /** Landmark */
  LANDMARK: 'landmark',
  /** Directions */
  DIRECTIONS: 'directions',
  /** Latitude */
  LATITUDE: 'latitude',
  /** Longitude */
  LONGITUDE: 'longitude',
} as const;

/**
 * User address status labels
 * Human-readable labels for UI
 */
export const USER_ADDRESS_TYPE_LABELS: Record<string, string> = {
  [USER_ADDRESS_TYPE.HOME]: 'Home',
  [USER_ADDRESS_TYPE.WORK]: 'Work',
  [USER_ADDRESS_TYPE.BILLING]: 'Billing',
  [USER_ADDRESS_TYPE.SHIPPING]: 'Shipping',
  [USER_ADDRESS_TYPE.OTHER]: 'Other',
  [USER_ADDRESS_TYPE.TEMPORARY]: 'Temporary',
  [USER_ADDRESS_TYPE.PERMANENT]: 'Permanent',
  [USER_ADDRESS_TYPE.VACATION]: 'Vacation',
  [USER_ADDRESS_TYPE.PO_BOX]: 'PO Box',
};

/**
 * User address status labels
 */
export const USER_ADDRESS_STATUS_LABELS: Record<string, string> = {
  [USER_ADDRESS_STATUS.ACTIVE]: 'Active',
  [USER_ADDRESS_STATUS.INACTIVE]: 'Inactive',
  [USER_ADDRESS_STATUS.PENDING]: 'Pending',
  [USER_ADDRESS_STATUS.VERIFIED]: 'Verified',
  [USER_ADDRESS_STATUS.REMOVED]: 'Removed',
  [USER_ADDRESS_STATUS.DEFAULT]: 'Default',
  [USER_ADDRESS_STATUS.BILLING]: 'Billing',
  [USER_ADDRESS_STATUS.SHIPPING]: 'Shipping',
  [USER_ADDRESS_STATUS.PRIMARY]: 'Primary',
  [USER_ADDRESS_STATUS.SECONDARY]: 'Secondary',
};

/**
 * User address verification status labels
 */
export const USER_ADDRESS_VERIFICATION_STATUS_LABELS: Record<string, string> = {
  [USER_ADDRESS_VERIFICATION_STATUS.UNVERIFIED]: 'Unverified',
  [USER_ADDRESS_VERIFICATION_STATUS.VERIFIED]: 'Verified',
  [USER_ADDRESS_VERIFICATION_STATUS.PENDING]: 'Verification Pending',
  [USER_ADDRESS_VERIFICATION_STATUS.FAILED]: 'Verification Failed',
  [USER_ADDRESS_VERIFICATION_STATUS.REQUIRES_REVIEW]: 'Requires Review',
  [USER_ADDRESS_VERIFICATION_STATUS.ADMIN_VERIFIED]: 'Admin Verified',
  [USER_ADDRESS_VERIFICATION_STATUS.SELF_VERIFIED]: 'Self Verified',
};

/**
 * User address field labels
 */
export const USER_ADDRESS_FIELD_LABELS: Record<string, string> = {
  [USER_ADDRESS_FIELD.STREET]: 'Street Address',
  [USER_ADDRESS_FIELD.CITY]: 'City',
  [USER_ADDRESS_FIELD.STATE]: 'State/Province',
  [USER_ADDRESS_FIELD.POSTAL_CODE]: 'Postal/ZIP Code',
  [USER_ADDRESS_FIELD.COUNTRY]: 'Country',
  [USER_ADDRESS_FIELD.BUILDING_NUMBER]: 'Building Number',
  [USER_ADDRESS_FIELD.APARTMENT_NUMBER]: 'Apartment/Suite Number',
  [USER_ADDRESS_FIELD.FLOOR_NUMBER]: 'Floor Number',
  [USER_ADDRESS_FIELD.LANDMARK]: 'Landmark',
  [USER_ADDRESS_FIELD.DIRECTIONS]: 'Directions',
  [USER_ADDRESS_FIELD.LATITUDE]: 'Latitude',
  [USER_ADDRESS_FIELD.LONGITUDE]: 'Longitude',
};

/**
 * Check if user address type is valid
 */
export function isValidUserAddressType(type: string): boolean {
  return Object.values(USER_ADDRESS_TYPE).includes(
    type as (typeof USER_ADDRESS_TYPE)[keyof typeof USER_ADDRESS_TYPE]
  );
}

/**
 * Check if user address status is valid
 */
export function isValidUserAddressStatus(status: string): boolean {
  return Object.values(USER_ADDRESS_STATUS).includes(
    status as (typeof USER_ADDRESS_STATUS)[keyof typeof USER_ADDRESS_STATUS]
  );
}

/**
 * Check if user address verification status is valid
 */
export function isValidUserAddressVerificationStatus(status: string): boolean {
  return Object.values(USER_ADDRESS_VERIFICATION_STATUS).includes(
    status as (typeof USER_ADDRESS_VERIFICATION_STATUS)[keyof typeof USER_ADDRESS_VERIFICATION_STATUS]
  );
}

/**
 * Check if user address field is valid
 */
export function isValidUserAddressField(field: string): boolean {
  return Object.values(USER_ADDRESS_FIELD).includes(
    field as (typeof USER_ADDRESS_FIELD)[keyof typeof USER_ADDRESS_FIELD]
  );
}

/**
 * Get user address type label
 */
export function getUserAddressTypeLabel(type: string): string {
  return USER_ADDRESS_TYPE_LABELS[type] || type;
}

/**
 * Get user address status label
 */
export function getUserAddressStatusLabel(status: string): string {
  return USER_ADDRESS_STATUS_LABELS[status] || status;
}

/**
 * Get user address verification status label
 */
export function getUserAddressVerificationStatusLabel(status: string): string {
  return USER_ADDRESS_VERIFICATION_STATUS_LABELS[status] || status;
}

/**
 * Get user address field label
 */
export function getUserAddressFieldLabel(field: string): string {
  return USER_ADDRESS_FIELD_LABELS[field] || field;
}

/**
 * Check if address is active
 */
export function isUserAddressActive(status: string): boolean {
  return (
    status === USER_ADDRESS_STATUS.ACTIVE ||
    status === USER_ADDRESS_STATUS.VERIFIED ||
    status === USER_ADDRESS_STATUS.DEFAULT
  );
}

/**
 * Check if address is verified
 */
export function isUserAddressVerified(status: string): boolean {
  return (
    status === USER_ADDRESS_STATUS.VERIFIED ||
    status === USER_ADDRESS_VERIFICATION_STATUS.VERIFIED ||
    status === USER_ADDRESS_VERIFICATION_STATUS.ADMIN_VERIFIED ||
    status === USER_ADDRESS_VERIFICATION_STATUS.SELF_VERIFIED
  );
}

/**
 * Check if address is default
 */
export function isUserAddressDefault(status: string): boolean {
  return status === USER_ADDRESS_STATUS.DEFAULT || status === USER_ADDRESS_STATUS.PRIMARY;
}

/**
 * Check if address is billing
 */
export function isUserAddressBilling(status: string): boolean {
  return status === USER_ADDRESS_STATUS.BILLING;
}

/**
 * Check if address is shipping
 */
export function isUserAddressShipping(status: string): boolean {
  return status === USER_ADDRESS_STATUS.SHIPPING;
}

/**
 * Get all user address types
 */
export function getAllUserAddressTypes(): string[] {
  return Object.values(USER_ADDRESS_TYPE);
}

/**
 * Get all user address statuses
 */
export function getAllUserAddressStatuses(): string[] {
  return Object.values(USER_ADDRESS_STATUS);
}

/**
 * Get all user address verification statuses
 */
export function getAllUserAddressVerificationStatuses(): string[] {
  return Object.values(USER_ADDRESS_VERIFICATION_STATUS);
}

/**
 * Get all user address fields
 */
export function getAllUserAddressFields(): string[] {
  return Object.values(USER_ADDRESS_FIELD);
}

/**
 * Get billing address types
 */
export function getBillingUserAddressTypes(): string[] {
  return [USER_ADDRESS_TYPE.BILLING, USER_ADDRESS_TYPE.HOME, USER_ADDRESS_TYPE.WORK];
}

/**
 * Get shipping address types
 */
export function getShippingUserAddressTypes(): string[] {
  return [USER_ADDRESS_TYPE.SHIPPING, USER_ADDRESS_TYPE.HOME, USER_ADDRESS_TYPE.WORK];
}

/**
 * User address required fields mapping
 */
export const USER_ADDRESS_REQUIRED_FIELDS: Record<string, string[]> = {
  [USER_ADDRESS_TYPE.HOME]: [
    USER_ADDRESS_FIELD.STREET,
    USER_ADDRESS_FIELD.CITY,
    USER_ADDRESS_FIELD.POSTAL_CODE,
    USER_ADDRESS_FIELD.COUNTRY,
  ],
  [USER_ADDRESS_TYPE.WORK]: [
    USER_ADDRESS_FIELD.STREET,
    USER_ADDRESS_FIELD.CITY,
    USER_ADDRESS_FIELD.POSTAL_CODE,
    USER_ADDRESS_FIELD.COUNTRY,
  ],
  [USER_ADDRESS_TYPE.BILLING]: [
    USER_ADDRESS_FIELD.STREET,
    USER_ADDRESS_FIELD.CITY,
    USER_ADDRESS_FIELD.POSTAL_CODE,
    USER_ADDRESS_FIELD.COUNTRY,
  ],
  [USER_ADDRESS_TYPE.SHIPPING]: [
    USER_ADDRESS_FIELD.STREET,
    USER_ADDRESS_FIELD.CITY,
    USER_ADDRESS_FIELD.POSTAL_CODE,
    USER_ADDRESS_FIELD.COUNTRY,
  ],
  [USER_ADDRESS_TYPE.TEMPORARY]: [
    USER_ADDRESS_FIELD.STREET,
    USER_ADDRESS_FIELD.CITY,
    USER_ADDRESS_FIELD.COUNTRY,
  ],
  [USER_ADDRESS_TYPE.PERMANENT]: [
    USER_ADDRESS_FIELD.STREET,
    USER_ADDRESS_FIELD.CITY,
    USER_ADDRESS_FIELD.POSTAL_CODE,
    USER_ADDRESS_FIELD.COUNTRY,
  ],
  [USER_ADDRESS_TYPE.PO_BOX]: [USER_ADDRESS_FIELD.POSTAL_CODE, USER_ADDRESS_FIELD.COUNTRY],
};

/**
 * Get required fields for address type
 */
export function getUserAddressRequiredFields(type: string): string[] {
  return (
    USER_ADDRESS_REQUIRED_FIELDS[type] || [
      USER_ADDRESS_FIELD.STREET,
      USER_ADDRESS_FIELD.CITY,
      USER_ADDRESS_FIELD.COUNTRY,
    ]
  );
}

/**
 * User address format patterns
 */
export const USER_ADDRESS_FORMAT = {
  /** Standard format with street, city, state, postal, country */
  STANDARD: 'standard',
  /** Compact format for display */
  COMPACT: 'compact',
  /** Full format with all details */
  FULL: 'full',
  /** Format for shipping labels */
  SHIPPING_LABEL: 'shipping_label',
  /** Format for billing */
  BILLING_FORMAT: 'billing_format',
} as const;

/**
 * User address format labels
 */
export const USER_ADDRESS_FORMAT_LABELS: Record<string, string> = {
  [USER_ADDRESS_FORMAT.STANDARD]: 'Standard',
  [USER_ADDRESS_FORMAT.COMPACT]: 'Compact',
  [USER_ADDRESS_FORMAT.FULL]: 'Full',
  [USER_ADDRESS_FORMAT.SHIPPING_LABEL]: 'Shipping Label',
  [USER_ADDRESS_FORMAT.BILLING_FORMAT]: 'Billing Format',
};

/**
 * Check if user address format is valid
 */
export function isValidUserAddressFormat(format: string): boolean {
  return Object.values(USER_ADDRESS_FORMAT).includes(
    format as (typeof USER_ADDRESS_FORMAT)[keyof typeof USER_ADDRESS_FORMAT]
  );
}

/**
 * Get user address format label
 */
export function getUserAddressFormatLabel(format: string): string {
  return USER_ADDRESS_FORMAT_LABELS[format] || format;
}

/**
 * Get all user address formats
 */
export function getAllUserAddressFormats(): string[] {
  return Object.values(USER_ADDRESS_FORMAT);
}
