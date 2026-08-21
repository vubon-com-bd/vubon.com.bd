/**
 * User Address Types Module
 * User address management types for the e-commerce platform
 * Handles billing and shipping addresses, address verification, and validation
 */

import { UserId, Email, PhoneNumber, Timestamp } from '../auth/core-primitives.types';

/**
 * Address Type
 * Types of addresses
 */
export type AddressType = 'billing' | 'shipping' | 'both';

/**
 * Address Status
 * Status of an address
 */
export type AddressStatus = 'active' | 'inactive' | 'pending' | 'verified' | 'rejected';

/**
 * Address Verification Status
 * Verification status of an address
 */
export type AddressVerificationStatus =
  'unverified' | 'pending' | 'verified' | 'failed' | 'manual_review';

/**
 * Address
 * User address information
 */
export interface Address {
  id: string;
  userId: UserId;
  type: AddressType;
  label?: string;
  firstName: string;
  lastName: string;
  company?: string;
  street: string;
  street2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phoneNumber?: PhoneNumber;
  email?: Email;
  isDefault: boolean;
  isVerified: boolean;
  verificationStatus: AddressVerificationStatus;
  status: AddressStatus;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
  verifiedAt?: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Address Create Request
 * Request to create address
 */
export interface AddressCreateRequest {
  userId: UserId;
  type: AddressType;
  label?: string;
  firstName: string;
  lastName: string;
  company?: string;
  street: string;
  street2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phoneNumber?: PhoneNumber;
  email?: Email;
  isDefault?: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * Address Create Response
 * Response after address creation
 */
export interface AddressCreateResponse {
  success: boolean;
  data?: {
    address: Address;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Address Update Request
 * Request to update address
 */
export interface AddressUpdateRequest {
  addressId: string;
  userId: UserId;
  type?: AddressType;
  label?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  street?: string;
  street2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phoneNumber?: PhoneNumber;
  email?: Email;
  isDefault?: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * Address Update Response
 * Response after address update
 */
export interface AddressUpdateResponse {
  success: boolean;
  data?: {
    address: Address;
    updatedFields: string[];
    updatedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Address Delete Request
 * Request to delete address
 */
export interface AddressDeleteRequest {
  addressId: string;
  userId: UserId;
  reason?: string;
}

/**
 * Address Delete Response
 * Response after address deletion
 */
export interface AddressDeleteResponse {
  success: boolean;
  data?: {
    addressId: string;
    deletedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Address Get Request
 * Request to get address
 */
export interface AddressGetRequest {
  addressId: string;
  userId: UserId;
}

/**
 * Address Get Response
 * Response after getting address
 */
export interface AddressGetResponse {
  success: boolean;
  data?: {
    address: Address;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Address List Request
 * Request to list addresses
 */
export interface AddressListRequest {
  userId: UserId;
  type?: AddressType[];
  status?: AddressStatus[];
  isDefault?: boolean;
  isVerified?: boolean;
  limit?: number;
  offset?: number;
}

/**
 * Address List Response
 * Response after listing addresses
 */
export interface AddressListResponse {
  success: boolean;
  data?: {
    addresses: Address[];
    total: number;
    limit: number;
    offset: number;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Address Set Default Request
 * Request to set default address
 */
export interface AddressSetDefaultRequest {
  addressId: string;
  userId: UserId;
  type: AddressType;
}

/**
 * Address Set Default Response
 * Response after setting default address
 */
export interface AddressSetDefaultResponse {
  success: boolean;
  data?: {
    addressId: string;
    type: AddressType;
    isDefault: boolean;
    updatedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Address Verify Request
 * Request to verify address
 */
export interface AddressVerifyRequest {
  addressId: string;
  userId: UserId;
  method: 'manual' | 'api' | 'document' | 'self_verification';
  metadata?: Record<string, unknown>;
}

/**
 * Address Verify Response
 * Response after address verification
 */
export interface AddressVerifyResponse {
  success: boolean;
  data?: {
    addressId: string;
    verificationStatus: AddressVerificationStatus;
    verifiedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Address Filter
 * Filter criteria for address queries
 */
export interface AddressFilter {
  userId?: UserId[];
  type?: AddressType[];
  status?: AddressStatus[];
  country?: string[];
  city?: string[];
  isDefault?: boolean;
  isVerified?: boolean;
  dateRange?: {
    start: Timestamp;
    end: Timestamp;
  };
}

/**
 * Address Response Builder
 * Helper for building address responses
 */
export interface AddressResponseBuilder {
  createSuccess(response: AddressCreateResponse): AddressCreateResponse;
  updateSuccess(response: AddressUpdateResponse): AddressUpdateResponse;
  deleteSuccess(response: AddressDeleteResponse): AddressDeleteResponse;
  getSuccess(response: AddressGetResponse): AddressGetResponse;
  listSuccess(response: AddressListResponse): AddressListResponse;
  setDefaultSuccess(response: AddressSetDefaultResponse): AddressSetDefaultResponse;
  verifySuccess(response: AddressVerifyResponse): AddressVerifyResponse;
  error(code: string, message: string, details?: Record<string, unknown>): AddressErrorResponse;
}

/**
 * Address Error Response
 * Error response for address operations
 */
export interface AddressErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Address Constants
 * Address-related constants
 */
export const ADDRESS_TYPES = {
  BILLING: 'billing',
  SHIPPING: 'shipping',
  BOTH: 'both',
} as const;

export const ADDRESS_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
} as const;

export const ADDRESS_VERIFICATION_STATUS = {
  UNVERIFIED: 'unverified',
  PENDING: 'pending',
  VERIFIED: 'verified',
  FAILED: 'failed',
  MANUAL_REVIEW: 'manual_review',
} as const;

/**
 * Default Address Configuration
 */
export const DEFAULT_ADDRESS_CONFIG = {
  maxAddressesPerUser: 10,
  requireVerification: false,
  enableGeocoding: true,
  allowMultipleBilling: true,
  allowMultipleShipping: true,
  defaultAddressType: 'both' as AddressType,
} as const;

/**
 * Address Audit Log
 * Audit log for address operations
 */
export interface AddressAuditLog {
  id: string;
  userId: UserId;
  addressId: string;
  operation: 'create' | 'update' | 'delete' | 'verify' | 'set_default' | 'validate';
  details: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Timestamp;
}

/**
 * Address Statistics
 * Statistical data about addresses
 */
export interface AddressStatistics {
  totalAddresses: number;
  byType: Record<AddressType, number>;
  byStatus: Record<AddressStatus, number>;
  byVerificationStatus: Record<AddressVerificationStatus, number>;
  byCountry: Record<string, number>;
  defaultAddresses: number;
  verifiedAddresses: number;
  unverifiedAddresses: number;
  averageAddressesPerUser: number;
  timestamp: Timestamp;
}
