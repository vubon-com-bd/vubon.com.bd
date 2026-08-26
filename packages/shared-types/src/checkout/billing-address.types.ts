/**
 * Billing Address Types
 * Type definitions for billing addresses based on shared-constants
 * @module BillingAddressTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Address } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants checkout
// ============================================================
import {
  // Billing Address
  BILLING_ADDRESS,
  BillingAddressType,
  BillingAddressStatus,
  BillingAddressField,
  BillingAddressDefault,
  BillingAddressLimit,
  billingaddressGetTypeLabel,
  billingaddressGetStatusLabel,
  billingaddressGetFieldLabel,
  billingaddressIsResidential,
  billingaddressIsCommercial,
  billingaddressIsVerified,
  billingaddressGetDefaultCountry,
  billingaddressGetDefaultCountryCode,
  billingaddressGetDefaultPostalCode,
} from '@vubon/shared-constants';

// ============================================================
// Billing Address Extended Types
// ============================================================

/**
 * Billing address
 */
export interface BillingAddress extends Address, BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: BillingAddressType;
  status: BillingAddressStatus;
  isResidential: boolean;
  isCommercial: boolean;
  isVerified: boolean;
  label?: string;
  metadata?: Metadata;
}

/**
 * Billing address filter
 */
export interface BillingAddressFilter {
  userIds?: ID[];
  types?: BillingAddressType[];
  statuses?: BillingAddressStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isResidential?: boolean;
  isCommercial?: boolean;
  isVerified?: boolean;
  country?: string;
  city?: string;
  searchTerm?: string;
}

/**
 * Billing address statistics
 */
export interface BillingAddressStatistics {
  userId: ID;
  totalAddresses: number;
  residentialAddresses: number;
  commercialAddresses: number;
  verifiedAddresses: number;
  byType: Record<BillingAddressType, number>;
  byStatus: Record<BillingAddressStatus, number>;
  byCountry: Record<string, number>;
  byCity: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: BillingAddressType;
  mostFrequentCountry: string;
  mostFrequentCity: string;
}

/**
 * Billing address summary
 */
export interface BillingAddressSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  residential: number;
  commercial: number;
  verified: number;
  byType: Record<BillingAddressType, number>;
  byStatus: Record<BillingAddressStatus, number>;
  byCountry: Record<string, number>;
  byCity: Record<string, number>;
  addressTrend: {
    date: Date;
    total: number;
    verified: number;
  }[];
  topTypes: {
    type: BillingAddressType;
    count: number;
    label: string;
  }[];
  topCountries: {
    country: string;
    count: number;
  }[];
}

/**
 * Billing address configuration
 */
export interface BillingAddressConfiguration {
  enabled: boolean;
  defaultType: BillingAddressType;
  defaultCountry: string;
  defaultCountryCode: string;
  defaultPostalCode: string;
  requireVerification: boolean;
  requirePhone: boolean;
  requireEmail: boolean;
  allowMultiple: boolean;
  maxAddressesPerUser: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnVerification: boolean;
  alertConfig?: BillingAddressAlertConfig;
}

/**
 * Billing address alert configuration
 */
export interface BillingAddressAlertConfig {
  enabled: boolean;
  verificationAlert: boolean;
  suspiciousAddressAlert: boolean;
  duplicateAddressAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Billing address history
 */
export interface BillingAddressHistory extends BaseEntity, Timestamp {
  id: ID;
  addressId: ID;
  userId: ID;
  action: 'create' | 'update' | 'delete' | 'verify' | 'unverify';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Billing address verification
 */
export interface BillingAddressVerification extends BaseEntity, Timestamp {
  id: ID;
  addressId: ID;
  userId: ID;
  method: 'postal' | 'phone' | 'email' | 'document' | 'manual';
  status: 'pending' | 'verified' | 'rejected' | 'expired';
  verifiedAt?: Date;
  expiresAt?: Date;
  verifiedBy?: ID;
  metadata?: Metadata;
}

/**
 * Billing address validation
 */
export interface BillingAddressValidation {
  isValid: boolean;
  address: Address;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Billing address export
 */
export interface BillingAddressExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: BillingAddressFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Billing Address
  BILLING_ADDRESS,
  BillingAddressType,
  BillingAddressStatus,
  BillingAddressField,
  BillingAddressDefault,
  BillingAddressLimit,
  billingaddressGetTypeLabel,
  billingaddressGetStatusLabel,
  billingaddressGetFieldLabel,
  billingaddressIsResidential,
  billingaddressIsCommercial,
  billingaddressIsVerified,
  billingaddressGetDefaultCountry,
  billingaddressGetDefaultCountryCode,
  billingaddressGetDefaultPostalCode,
};
