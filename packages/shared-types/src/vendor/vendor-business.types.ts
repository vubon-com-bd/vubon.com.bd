/**
 * Vendor Business Types
 * Type definitions for vendor business details based on shared-constants
 * @module VendorBusinessTypes
 */

import {
  BaseEntity,
  Timestamp,
  Metadata,
  ID,
  Email,
  PhoneNumber,
  Address,
  Currency,
} from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor
// ============================================================
import {
  // Vendor Type
  VendorTypeType,
  VendorTypeCategory,
  // Vendor Tier
  VendorTierType,
  VendorTierLevel,
  // Vendor Status
  VendorStatusType,
  // Vendor Commission
  VendorCommissionType,
  VendorCommissionCategory,
  VendorCommissionStatus,
  VendorCommissionTier,
  VendorCommissionPeriod,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Business Extended Types
// ============================================================

/**
 * Vendor business
 */
export interface VendorBusiness extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  legalName: string;
  tradeName?: string;
  businessType:
    | 'sole_proprietorship'
    | 'partnership'
    | 'corporation'
    | 'llc'
    | 'non_profit'
    | 'government'
    | 'other';
  businessCategory: string;
  businessSubCategory?: string;
  industry: string;
  taxId?: string;
  registrationNumber?: string;
  registrationDate?: Date;
  countryOfRegistration: string;
  stateOfRegistration?: string;
  employeeCount: number;
  annualRevenue?: number;
  currency: Currency;
  establishmentYear: number;
  website?: string;
  email: Email;
  phone: PhoneNumber;
  address: Address;
  isActive: boolean;
  isVerified: boolean;
  metadata?: Metadata;
}

/**
 * Vendor business filter
 */
export interface VendorBusinessFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  businessTypes?: (
    | 'sole_proprietorship'
    | 'partnership'
    | 'corporation'
    | 'llc'
    | 'non_profit'
    | 'government'
    | 'other'
  )[];
  industries?: string[];
  categories?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minEmployeeCount?: number;
  maxEmployeeCount?: number;
  minAnnualRevenue?: number;
  maxAnnualRevenue?: number;
  isActive?: boolean;
  isVerified?: boolean;
  searchTerm?: string;
  countryOfRegistration?: string;
}

/**
 * Vendor business statistics
 */
export interface VendorBusinessStatistics {
  vendorId: ID;
  totalBusinesses: number;
  activeBusinesses: number;
  verifiedBusinesses: number;
  byBusinessType: Record<string, number>;
  byIndustry: Record<string, number>;
  byCategory: Record<string, number>;
  byCountry: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageEmployeeCount: number;
  maxEmployeeCount: number;
  minEmployeeCount: number;
  averageAnnualRevenue: number;
  maxAnnualRevenue: number;
  minAnnualRevenue: number;
  totalAnnualRevenue: number;
  mostFrequentBusinessType: string;
  mostFrequentIndustry: string;
  mostFrequentCategory: string;
  mostFrequentCountry: string;
}

/**
 * Vendor business summary
 */
export interface VendorBusinessSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalBusinesses: number;
  active: number;
  verified: number;
  byBusinessType: Record<string, number>;
  byIndustry: Record<string, number>;
  byCategory: Record<string, number>;
  byCountry: Record<string, number>;
  businessTrend: {
    date: Date;
    total: number;
    active: number;
    verified: number;
  }[];
  topBusinessTypes: {
    type: string;
    count: number;
    label: string;
  }[];
  topIndustries: {
    industry: string;
    count: number;
  }[];
  topCategories: {
    category: string;
    count: number;
  }[];
  topCountries: {
    country: string;
    count: number;
  }[];
  financialSummary: {
    totalAnnualRevenue: number;
    averageAnnualRevenue: number;
    maxAnnualRevenue: number;
    minAnnualRevenue: number;
  };
}

/**
 * Vendor business configuration
 */
export interface VendorBusinessConfiguration {
  enabled: boolean;
  requireLegalName: boolean;
  requireBusinessType: boolean;
  requireTaxId: boolean;
  requireRegistrationNumber: boolean;
  requireRegistrationDate: boolean;
  requireEmployeeCount: boolean;
  requireEstablishmentYear: boolean;
  requireWebsite: boolean;
  requireEmail: boolean;
  requirePhone: boolean;
  requireAddress: boolean;
  autoVerify: boolean;
  allowMultipleBusinesses: boolean;
  maxBusinessesPerVendor: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnVerification: boolean;
  alertConfig?: VendorBusinessAlertConfig;
}

/**
 * Vendor business alert configuration
 */
export interface VendorBusinessAlertConfig {
  enabled: boolean;
  incompleteBusinessAlert: boolean;
  duplicateTaxIdAlert: boolean;
  duplicateRegistrationAlert: boolean;
  suspiciousBusinessAlert: boolean;
  verificationFailureAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor business history
 */
export interface VendorBusinessHistory extends BaseEntity, Timestamp {
  id: ID;
  businessId: ID;
  vendorId: ID;
  userId: ID;
  action:
    'create' | 'update' | 'verify' | 'unverify' | 'activate' | 'deactivate' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor business validation
 */
export interface VendorBusinessValidation {
  isValid: boolean;
  businessId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor business export
 */
export interface VendorBusinessExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorBusinessFilter;
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
  // Vendor Type
  VendorTypeType,
  VendorTypeCategory,
  // Vendor Tier
  VendorTierType,
  VendorTierLevel,
  // Vendor Status
  VendorStatusType,
  // Vendor Commission
  VendorCommissionType,
  VendorCommissionCategory,
  VendorCommissionStatus,
  VendorCommissionTier,
  VendorCommissionPeriod,
};
