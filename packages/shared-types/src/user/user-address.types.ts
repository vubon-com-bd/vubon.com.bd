/**
 * User Address Types
 * Type definitions for user addresses based on shared-constants
 * @module UserAddressTypes
 */

import {
  BaseEntity,
  Timestamp,
  Metadata,
  ID,
  Address as BaseAddress,
} from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants user address
// ============================================================
import {
  // Core Address Constants
  USER_ADDRESS,
  DIVISIONS,
  DISTRICTS,
  UserAddressType,
  UserAddressDivision,
  UserAddressDistrict,
  getCoreAddressTypeLabel,
  getDivisionLabel,
  getDistrictsByDivision,
  getAllDivisions,
  getAllDistricts,
  getDivisionByDistrict,
  getAddressStatusMessage,
  isDefaultAddress,
  getFullAddress,
  validatePostalCode,
  validateAddressLine,
  isValidAddress,
  validatePhoneNumber,
  // Address Type Constants
  USER_ADDRESS_TYPE,
  USER_ADDRESS_TYPE_LABELS,
  USER_ADDRESS_TYPE_DESCRIPTIONS,
  SHIPPING_ADDRESS_TYPES,
  BILLING_ADDRESS_TYPES,
  RESIDENTIAL_ADDRESS_TYPES,
  BUSINESS_ADDRESS_TYPES,
  AddressType,
  isShippingAddress,
  isBillingAddress,
  isResidentialAddress,
  isBusinessAddress,
  getAddressTypeLabel,
  getAddressTypeDescription,
  getAddressTypeByValue,
  // Address Status Constants
  USER_ADDRESS_STATUS,
  USER_ADDRESS_STATUS_LABELS,
  USER_ADDRESS_STATUS_COLORS,
  ACTIVE_ADDRESS_STATUSES,
  INACTIVE_ADDRESS_STATUSES,
  RESTRICTED_ADDRESS_STATUSES,
  VERIFICATION_REQUIRED_ADDRESS_STATUSES,
  UserAddressStatus,
  isAddressActive,
  isAddressRestricted,
  canUseAddress,
  getAddressStatusLabel,
  getAddressStatusColor,
} from '@vubon/shared-constants';

// ============================================================
// User Address Extended Types
// ============================================================

/**
 * User address with additional metadata
 */
export interface UserAddressExtended extends BaseAddress, BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: UserAddressType;
  status: UserAddressStatus;
  division: UserAddressDivision;
  district: UserAddressDistrict;
  isDefault: boolean;
  isVerified: boolean;
  label?: string;
  phone?: string;
  isShipping: boolean;
  isBilling: boolean;
  isResidential: boolean;
  isBusiness: boolean;
  isActive: boolean;
  isRestricted: boolean;
  canUse: boolean;
  metadata?: Metadata;
}

/**
 * User address filter
 */
export interface UserAddressFilter {
  userIds?: ID[];
  types?: UserAddressType[];
  statuses?: UserAddressStatus[];
  divisions?: UserAddressDivision[];
  districts?: UserAddressDistrict[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isDefault?: boolean;
  isVerified?: boolean;
  isActive?: boolean;
  isRestricted?: boolean;
  isShipping?: boolean;
  isBilling?: boolean;
  isResidential?: boolean;
  isBusiness?: boolean;
  searchTerm?: string;
}

/**
 * User address statistics
 */
export interface UserAddressStatistics {
  userId: ID;
  totalAddresses: number;
  defaultAddresses: number;
  verifiedAddresses: number;
  activeAddresses: number;
  restrictedAddresses: number;
  byType: Record<UserAddressType, number>;
  byStatus: Record<UserAddressStatus, number>;
  byDivision: Record<UserAddressDivision, number>;
  byDistrict: Record<UserAddressDistrict, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: UserAddressType;
  mostFrequentDivision: UserAddressDivision;
  mostFrequentDistrict: UserAddressDistrict;
}

/**
 * User address summary
 */
export interface UserAddressSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  default: number;
  verified: number;
  active: number;
  restricted: number;
  byType: Record<UserAddressType, number>;
  byStatus: Record<UserAddressStatus, number>;
  byDivision: Record<UserAddressDivision, number>;
  byDistrict: Record<UserAddressDistrict, number>;
  addressTrend: {
    date: Date;
    total: number;
    active: number;
    verified: number;
  }[];
  topTypes: {
    type: UserAddressType;
    count: number;
    label: string;
  }[];
  topDivisions: {
    division: UserAddressDivision;
    count: number;
    label: string;
  }[];
}

/**
 * User address validation
 */
export interface UserAddressValidation {
  isValid: boolean;
  address: UserAddressExtended;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
  metadata?: Metadata;
}

/**
 * User address history
 */
export interface UserAddressHistory extends BaseEntity, Timestamp {
  id: ID;
  addressId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'delete'
    | 'restore'
    | 'verify'
    | 'unverify'
    | 'set_default'
    | 'unset_default';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

/**
 * User address export
 */
export interface UserAddressExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: UserAddressFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * User address verification
 */
export interface UserAddressVerification extends BaseEntity, Timestamp {
  id: ID;
  addressId: ID;
  userId: ID;
  method: 'postal' | 'phone' | 'document' | 'manual';
  status: 'pending' | 'verified' | 'rejected' | 'expired';
  verifiedAt?: Date;
  expiresAt?: Date;
  verifiedBy?: ID;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Core Address Constants
  USER_ADDRESS,
  DIVISIONS,
  DISTRICTS,
  UserAddressType,
  UserAddressDivision,
  UserAddressDistrict,
  getCoreAddressTypeLabel,
  getDivisionLabel,
  getDistrictsByDivision,
  getAllDivisions,
  getAllDistricts,
  getDivisionByDistrict,
  getAddressStatusMessage,
  isDefaultAddress,
  getFullAddress,
  validatePostalCode,
  validateAddressLine,
  isValidAddress,
  validatePhoneNumber,
  // Address Type Constants
  USER_ADDRESS_TYPE,
  USER_ADDRESS_TYPE_LABELS,
  USER_ADDRESS_TYPE_DESCRIPTIONS,
  SHIPPING_ADDRESS_TYPES,
  BILLING_ADDRESS_TYPES,
  RESIDENTIAL_ADDRESS_TYPES,
  BUSINESS_ADDRESS_TYPES,
  AddressType,
  isShippingAddress,
  isBillingAddress,
  isResidentialAddress,
  isBusinessAddress,
  getAddressTypeLabel,
  getAddressTypeDescription,
  getAddressTypeByValue,
  // Address Status Constants
  USER_ADDRESS_STATUS,
  USER_ADDRESS_STATUS_LABELS,
  USER_ADDRESS_STATUS_COLORS,
  ACTIVE_ADDRESS_STATUSES,
  INACTIVE_ADDRESS_STATUSES,
  RESTRICTED_ADDRESS_STATUSES,
  VERIFICATION_REQUIRED_ADDRESS_STATUSES,
  UserAddressStatus,
  isAddressActive,
  isAddressRestricted,
  canUseAddress,
  getAddressStatusLabel,
  getAddressStatusColor,
};
