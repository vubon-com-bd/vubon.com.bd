/**
 * User Address Types
 * Types for user address management
 */

import type { ID, Timestamp, JsonObject } from '../common/core-primitives.types';
import {
  USER_ADDRESS_TYPE,
  USER_ADDRESS_VERIFICATION_STATUS,
  USER_ADDRESS_LABEL,
  USER_ADDRESS_FIELD,
  USER_ADDRESS_FORMAT,
  USER_ADDRESS_TYPE_LABELS,
  USER_ADDRESS_VERIFICATION_STATUS_LABELS,
  USER_ADDRESS_FIELD_LABELS,
  USER_ADDRESS_FORMAT_LABELS,
  USER_ADDRESS_REQUIRED_FIELDS,
} from '@vubon/shared-constants';

// ============================================================
// USER ADDRESS STATUS (Local definition)
// ============================================================

/**
 * User address status
 */
export const USER_ADDRESS_STATUS = {
  /** Address is active and current */
  ACTIVE: 'active',
  /** Address is inactive */
  INACTIVE: 'inactive',
  /** Address is pending verification */
  PENDING: 'pending',
  /** Address is verified */
  VERIFIED: 'verified',
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

// ============================================================
// USER ADDRESS TYPES
// ============================================================

/**
 * User address type
 */
export type UserAddressType = (typeof USER_ADDRESS_TYPE)[keyof typeof USER_ADDRESS_TYPE];

/**
 * User address status
 */
export type UserAddressStatus = (typeof USER_ADDRESS_STATUS)[keyof typeof USER_ADDRESS_STATUS];

/**
 * User address verification status
 */
export type UserAddressVerificationStatus =
  (typeof USER_ADDRESS_VERIFICATION_STATUS)[keyof typeof USER_ADDRESS_VERIFICATION_STATUS];

/**
 * User address label
 */
export type UserAddressLabel = (typeof USER_ADDRESS_LABEL)[keyof typeof USER_ADDRESS_LABEL];

/**
 * User address field
 */
export type UserAddressField = (typeof USER_ADDRESS_FIELD)[keyof typeof USER_ADDRESS_FIELD];

/**
 * User address format
 */
export type UserAddressFormat = (typeof USER_ADDRESS_FORMAT)[keyof typeof USER_ADDRESS_FORMAT];

// ============================================================
// USER ADDRESS RECORD
// ============================================================

/**
 * User address record
 */
export interface UserAddressRecord {
  /** Unique identifier */
  id: ID;
  /** User ID */
  userId: ID;
  /** Address type */
  type: UserAddressType;
  /** Address status */
  status: UserAddressStatus;
  /** Verification status */
  verificationStatus: UserAddressVerificationStatus;
  /** Address label */
  label: UserAddressLabel;
  /** Street address */
  street: string;
  /** City */
  city: string;
  /** State/Province */
  state?: string;
  /** Postal/ZIP code */
  postalCode: string;
  /** Country */
  country: string;
  /** Building number */
  buildingNumber?: string;
  /** Apartment/Suite number */
  apartmentNumber?: string;
  /** Floor number */
  floorNumber?: string;
  /** Landmark */
  landmark?: string;
  /** Directions */
  directions?: string;
  /** Latitude */
  latitude?: number;
  /** Longitude */
  longitude?: number;
  /** Whether this is the primary address */
  isPrimary: boolean;
  /** Whether this is the default address */
  isDefault: boolean;
  /** Whether this is verified */
  isVerified: boolean;
  /** Whether this is active */
  isActive: boolean;
  /** When the address was added */
  addedAt: Timestamp;
  /** When the address was verified */
  verifiedAt?: Timestamp;
  /** When the address was last updated */
  updatedAt: Timestamp;
  /** Additional metadata */
  metadata?: JsonObject;
}

// ============================================================
// USER ADDRESS REQUEST
// ============================================================

/**
 * User address create request
 */
export interface UserAddressCreateRequest {
  /** User ID */
  userId: ID;
  /** Address type */
  type: UserAddressType;
  /** Address label */
  label?: UserAddressLabel;
  /** Street address */
  street: string;
  /** City */
  city: string;
  /** State/Province */
  state?: string;
  /** Postal/ZIP code */
  postalCode: string;
  /** Country */
  country: string;
  /** Building number */
  buildingNumber?: string;
  /** Apartment/Suite number */
  apartmentNumber?: string;
  /** Floor number */
  floorNumber?: string;
  /** Landmark */
  landmark?: string;
  /** Directions */
  directions?: string;
  /** Latitude */
  latitude?: number;
  /** Longitude */
  longitude?: number;
  /** Whether this is the primary address */
  isPrimary?: boolean;
  /** Whether this is the default address */
  isDefault?: boolean;
  /** Additional metadata */
  metadata?: JsonObject;
}

/**
 * User address update request
 */
export interface UserAddressUpdateRequest {
  /** Address ID */
  addressId: ID;
  /** Address type */
  type?: UserAddressType;
  /** Address label */
  label?: UserAddressLabel;
  /** Street address */
  street?: string;
  /** City */
  city?: string;
  /** State/Province */
  state?: string;
  /** Postal/ZIP code */
  postalCode?: string;
  /** Country */
  country?: string;
  /** Building number */
  buildingNumber?: string;
  /** Apartment/Suite number */
  apartmentNumber?: string;
  /** Floor number */
  floorNumber?: string;
  /** Landmark */
  landmark?: string;
  /** Directions */
  directions?: string;
  /** Latitude */
  latitude?: number;
  /** Longitude */
  longitude?: number;
  /** Whether this is the primary address */
  isPrimary?: boolean;
  /** Whether this is the default address */
  isDefault?: boolean;
  /** Additional metadata */
  metadata?: JsonObject;
}

/**
 * User address verify request
 */
export interface UserAddressVerifyRequest {
  /** Address ID */
  addressId: ID;
  /** Verification method */
  method?: 'admin' | 'self' | 'manual' | 'system';
  /** Verification code (if applicable) */
  code?: string;
  /** Admin ID (if verified by admin) */
  adminId?: ID;
}

// ============================================================
// USER ADDRESS RESPONSE
// ============================================================

/**
 * User address response
 */
export interface UserAddressResponse {
  /** Whether the operation was successful */
  success: boolean;
  /** Address record if successful */
  address?: UserAddressRecord;
  /** Error message if failed */
  error?: string;
}

// ============================================================
// USER ADDRESS FILTER
// ============================================================

/**
 * User address filter
 */
export interface UserAddressFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by address type */
  type?: UserAddressType | UserAddressType[];
  /** Filter by address status */
  status?: UserAddressStatus | UserAddressStatus[];
  /** Filter by verification status */
  verificationStatus?: UserAddressVerificationStatus | UserAddressVerificationStatus[];
  /** Filter by label */
  label?: UserAddressLabel | UserAddressLabel[];
  /** Filter by country */
  country?: string;
  /** Filter by city */
  city?: string;
  /** Filter by primary addresses only */
  primaryOnly?: boolean;
  /** Filter by default addresses only */
  defaultOnly?: boolean;
  /** Filter by verified addresses only */
  verifiedOnly?: boolean;
  /** Filter by active addresses only */
  activeOnly?: boolean;
  /** Filter by billing addresses only */
  billingOnly?: boolean;
  /** Filter by shipping addresses only */
  shippingOnly?: boolean;
  /** Search by street, city, or postal code */
  search?: string;
}

// ============================================================
// USER ADDRESS SUMMARY
// ============================================================

/**
 * User address summary
 */
export interface UserAddressSummary {
  /** User ID */
  userId: ID;
  /** Total addresses */
  totalAddresses: number;
  /** Active addresses */
  activeAddresses: number;
  /** Verified addresses */
  verifiedAddresses: number;
  /** Primary addresses */
  primaryAddresses: number;
  /** Default address */
  defaultAddress?: UserAddressRecord;
  /** Addresses by type */
  addressesByType: Record<UserAddressType, number>;
  /** Addresses by status */
  addressesByStatus: Record<UserAddressStatus, number>;
  /** Addresses by country */
  addressesByCountry: Record<string, number>;
  /** All addresses */
  addresses: UserAddressRecord[];
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if user address type is valid
 */
export function isValidUserAddressType(type: string): type is UserAddressType {
  return Object.values(USER_ADDRESS_TYPE).includes(type as UserAddressType);
}

/**
 * Check if user address status is valid
 */
export function isValidUserAddressStatus(status: string): status is UserAddressStatus {
  return Object.values(USER_ADDRESS_STATUS).includes(status as UserAddressStatus);
}

/**
 * Check if user address verification status is valid
 */
export function isValidUserAddressVerificationStatus(
  status: string
): status is UserAddressVerificationStatus {
  return Object.values(USER_ADDRESS_VERIFICATION_STATUS).includes(
    status as UserAddressVerificationStatus
  );
}

/**
 * Check if user address field is valid
 */
export function isValidUserAddressField(field: string): field is UserAddressField {
  return Object.values(USER_ADDRESS_FIELD).includes(field as UserAddressField);
}

/**
 * Check if user address format is valid
 */
export function isValidUserAddressFormat(format: string): format is UserAddressFormat {
  return Object.values(USER_ADDRESS_FORMAT).includes(format as UserAddressFormat);
}

/**
 * Get user address type display name
 */
export function getUserAddressTypeDisplayName(type: UserAddressType): string {
  return USER_ADDRESS_TYPE_LABELS[type] || type;
}

/**
 * Get user address status display name
 */
export function getUserAddressStatusDisplayName(status: UserAddressStatus): string {
  return USER_ADDRESS_STATUS_LABELS[status] || status;
}

/**
 * Get user address verification status display name
 */
export function getUserAddressVerificationStatusDisplayName(
  status: UserAddressVerificationStatus
): string {
  return USER_ADDRESS_VERIFICATION_STATUS_LABELS[status] || status;
}

/**
 * Get user address field display name
 */
export function getUserAddressFieldDisplayName(field: UserAddressField): string {
  return USER_ADDRESS_FIELD_LABELS[field] || field;
}

/**
 * Get user address format display name
 */
export function getUserAddressFormatDisplayName(format: UserAddressFormat): string {
  return USER_ADDRESS_FORMAT_LABELS[format] || format;
}

/**
 * Get required fields for address type
 */
export function getUserAddressRequiredFields(type: UserAddressType): UserAddressField[] {
  return (USER_ADDRESS_REQUIRED_FIELDS[type] || [
    'street',
    'city',
    'country',
  ]) as UserAddressField[];
}

/**
 * Check if address is active
 */
export function isUserAddressActive(status: UserAddressStatus): boolean {
  const activeStatuses: UserAddressStatus[] = ['active', 'verified', 'default'];
  return activeStatuses.includes(status);
}

/**
 * Check if address is verified
 */
export function isUserAddressVerified(verificationStatus: UserAddressVerificationStatus): boolean {
  const verifiedStatuses: UserAddressVerificationStatus[] = [
    'verified',
    'admin_verified',
    'self_verified',
  ];
  return verifiedStatuses.includes(verificationStatus);
}

/**
 * Check if address is default
 */
export function isUserAddressDefault(status: UserAddressStatus): boolean {
  const defaultStatuses: UserAddressStatus[] = ['default', 'primary'];
  return defaultStatuses.includes(status);
}

/**
 * Check if address is billing
 */
export function isUserAddressBilling(status: UserAddressStatus): boolean {
  return status === USER_ADDRESS_STATUS.BILLING;
}

/**
 * Check if address is shipping
 */
export function isUserAddressShipping(status: UserAddressStatus): boolean {
  return status === USER_ADDRESS_STATUS.SHIPPING;
}

/**
 * Get all user address types
 */
export function getAllUserAddressTypes(): UserAddressType[] {
  return Object.values(USER_ADDRESS_TYPE);
}

/**
 * Get all user address statuses
 */
export function getAllUserAddressStatuses(): UserAddressStatus[] {
  return Object.values(USER_ADDRESS_STATUS);
}

/**
 * Get all user address verification statuses
 */
export function getAllUserAddressVerificationStatuses(): UserAddressVerificationStatus[] {
  return Object.values(USER_ADDRESS_VERIFICATION_STATUS);
}

/**
 * Get all user address fields
 */
export function getAllUserAddressFields(): UserAddressField[] {
  return Object.values(USER_ADDRESS_FIELD);
}

/**
 * Get all user address formats
 */
export function getAllUserAddressFormats(): UserAddressFormat[] {
  return Object.values(USER_ADDRESS_FORMAT);
}

/**
 * Get billing address types
 */
export function getBillingUserAddressTypes(): UserAddressType[] {
  return ['billing', 'home', 'work'];
}

/**
 * Get shipping address types
 */
export function getShippingUserAddressTypes(): UserAddressType[] {
  return ['shipping', 'home', 'work'];
}

/**
 * Format address for display
 */
export function formatUserAddress(
  address: UserAddressRecord,
  format: UserAddressFormat = 'standard'
): string {
  const parts: string[] = [];

  switch (format) {
    case 'standard':
      parts.push(address.street);
      if (address.buildingNumber) {
        parts[parts.length - 1] = `${address.buildingNumber} ${address.street}`;
      }
      if (address.apartmentNumber) {
        parts[parts.length - 1] = `${parts[parts.length - 1]}, Apt ${address.apartmentNumber}`;
      }
      parts.push(address.city);
      if (address.state) {
        parts[parts.length - 1] = `${parts[parts.length - 1]}, ${address.state}`;
      }
      parts.push(address.postalCode);
      parts.push(address.country);
      break;

    case 'compact':
      parts.push(address.street);
      parts.push(`${address.city}, ${address.postalCode}`);
      parts.push(address.country);
      break;

    case 'full':
      parts.push(address.street);
      if (address.buildingNumber) {
        parts[parts.length - 1] = `${address.buildingNumber} ${address.street}`;
      }
      if (address.apartmentNumber) {
        parts[parts.length - 1] = `${parts[parts.length - 1]}, Apt ${address.apartmentNumber}`;
      }
      if (address.floorNumber) {
        parts[parts.length - 1] = `${parts[parts.length - 1]}, Floor ${address.floorNumber}`;
      }
      parts.push(address.city);
      if (address.state) {
        parts[parts.length - 1] = `${parts[parts.length - 1]}, ${address.state}`;
      }
      parts.push(address.postalCode);
      parts.push(address.country);
      if (address.landmark) {
        parts.push(`Landmark: ${address.landmark}`);
      }
      if (address.directions) {
        parts.push(`Directions: ${address.directions}`);
      }
      break;

    default:
      parts.push(address.street);
      parts.push(address.city);
      parts.push(address.country);
  }

  return parts.join(', ');
}

/**
 * Check if address fields are complete
 */
export function isUserAddressComplete(
  address: Partial<UserAddressRecord>,
  type: UserAddressType
): boolean {
  const requiredFields = getUserAddressRequiredFields(type);
  return requiredFields.every((field) => {
    const value = address[field as keyof typeof address];
    return value !== undefined && value !== null && value !== '';
  });
}
