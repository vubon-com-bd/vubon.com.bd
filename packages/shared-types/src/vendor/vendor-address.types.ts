/**
 * Vendor Address Types
 * Type definitions for vendor addresses based on shared-constants
 * @module VendorAddressTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Address } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor
// ============================================================
import {
  // Core Vendor
  VendorStatusType,
  VendorTypeType,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Address Extended Types
// ============================================================

/**
 * Vendor address
 */
export interface VendorAddress extends Address, BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  type: 'business' | 'shipping' | 'billing' | 'warehouse' | 'return' | 'pickup' | 'other';
  label: string;
  isDefault: boolean;
  isPrimary: boolean;
  isVerified: boolean;
  isActive: boolean;
  latitude?: number;
  longitude?: number;
  deliveryInstructions?: string;
  metadata?: Metadata;
}

/**
 * Vendor address filter
 */
export interface VendorAddressFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  types?: ('business' | 'shipping' | 'billing' | 'warehouse' | 'return' | 'pickup' | 'other')[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isDefault?: boolean;
  isPrimary?: boolean;
  isVerified?: boolean;
  isActive?: boolean;
  searchTerm?: string;
  country?: string;
  city?: string;
}

/**
 * Vendor address statistics
 */
export interface VendorAddressStatistics {
  vendorId: ID;
  totalAddresses: number;
  activeAddresses: number;
  verifiedAddresses: number;
  defaultAddresses: number;
  primaryAddresses: number;
  byType: Record<string, number>;
  byCountry: Record<string, number>;
  byCity: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: string;
  mostFrequentCountry: string;
  mostFrequentCity: string;
  addressesWithCoordinates: number;
}

/**
 * Vendor address summary
 */
export interface VendorAddressSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalAddresses: number;
  active: number;
  verified: number;
  default: number;
  primary: number;
  byType: Record<string, number>;
  byCountry: Record<string, number>;
  byCity: Record<string, number>;
  addressTrend: {
    date: Date;
    total: number;
    active: number;
    verified: number;
  }[];
  topTypes: {
    type: string;
    count: number;
    label: string;
  }[];
  topCountries: {
    country: string;
    count: number;
  }[];
  topCities: {
    city: string;
    count: number;
  }[];
}

/**
 * Vendor address configuration
 */
export interface VendorAddressConfiguration {
  enabled: boolean;
  requireAddressLine: boolean;
  requireCity: boolean;
  requireState: boolean;
  requirePostalCode: boolean;
  requireCountry: boolean;
  requireLabel: boolean;
  maxAddressesPerVendor: number;
  allowMultipleDefault: boolean;
  allowMultiplePrimary: boolean;
  autoVerify: boolean;
  requireVerification: boolean;
  enableGeocoding: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnVerification: boolean;
  alertConfig?: VendorAddressAlertConfig;
}

/**
 * Vendor address alert configuration
 */
export interface VendorAddressAlertConfig {
  enabled: boolean;
  duplicateAddressAlert: boolean;
  invalidPostalCodeAlert: boolean;
  invalidCountryAlert: boolean;
  verificationFailureAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor address history
 */
export interface VendorAddressHistory extends BaseEntity, Timestamp {
  id: ID;
  addressId: ID;
  vendorId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'verify'
    | 'unverify'
    | 'activate'
    | 'deactivate'
    | 'delete'
    | 'restore'
    | 'set_default'
    | 'unset_default'
    | 'set_primary'
    | 'unset_primary';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor address validation
 */
export interface VendorAddressValidation {
  isValid: boolean;
  addressId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor address geocode
 */
export interface VendorAddressGeocode extends BaseEntity, Timestamp {
  id: ID;
  addressId: ID;
  vendorId: ID;
  latitude: number;
  longitude: number;
  accuracy: number;
  geocodedAt: Date;
  provider: 'google' | 'openstreetmap' | 'mapbox' | 'here' | 'other';
  metadata?: Metadata;
}

/**
 * Vendor address export
 */
export interface VendorAddressExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorAddressFilter;
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
  // Core Vendor
  VendorStatusType,
  VendorTypeType,
};
