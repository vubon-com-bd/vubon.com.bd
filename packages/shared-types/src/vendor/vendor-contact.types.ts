/**
 * Vendor Contact Types
 * Type definitions for vendor contacts based on shared-constants
 * @module VendorContactTypes
 */

import {
  BaseEntity,
  Timestamp,
  Metadata,
  ID,
  Email,
  PhoneNumber,
} from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor
// ============================================================
import {
  // Core Vendor
  VendorStatusType,
  VendorTypeType,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Contact Extended Types
// ============================================================

/**
 * Vendor contact
 */
export interface VendorContact extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  type:
    | 'primary'
    | 'secondary'
    | 'billing'
    | 'shipping'
    | 'technical'
    | 'support'
    | 'emergency'
    | 'marketing'
    | 'other';
  name: string;
  email: Email;
  phone: PhoneNumber;
  alternatePhone?: PhoneNumber;
  position: string;
  department?: string;
  isPrimary: boolean;
  isActive: boolean;
  isVerified: boolean;
  preferredContactMethod: 'email' | 'phone' | 'sms' | 'whatsapp' | 'telegram' | 'other';
  notes?: string;
  metadata?: Metadata;
}

/**
 * Vendor contact filter
 */
export interface VendorContactFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  types?: (
    | 'primary'
    | 'secondary'
    | 'billing'
    | 'shipping'
    | 'technical'
    | 'support'
    | 'emergency'
    | 'marketing'
    | 'other'
  )[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPrimary?: boolean;
  isActive?: boolean;
  isVerified?: boolean;
  searchTerm?: string;
  email?: string;
  phone?: string;
}

/**
 * Vendor contact statistics
 */
export interface VendorContactStatistics {
  vendorId: ID;
  totalContacts: number;
  activeContacts: number;
  verifiedContacts: number;
  primaryContacts: number;
  byType: Record<string, number>;
  byDepartment: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  preferredContactMethods: Record<string, number>;
  mostFrequentType: string;
  mostFrequentDepartment: string;
  mostFrequentContactMethod: string;
}

/**
 * Vendor contact summary
 */
export interface VendorContactSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalContacts: number;
  active: number;
  verified: number;
  primary: number;
  byType: Record<string, number>;
  byDepartment: Record<string, number>;
  contactTrend: {
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
  topDepartments: {
    department: string;
    count: number;
  }[];
  topContactMethods: {
    method: string;
    count: number;
    label: string;
  }[];
}

/**
 * Vendor contact configuration
 */
export interface VendorContactConfiguration {
  enabled: boolean;
  requireName: boolean;
  requireEmail: boolean;
  requirePhone: boolean;
  requirePosition: boolean;
  maxContactsPerVendor: number;
  allowMultiplePrimary: boolean;
  autoVerify: boolean;
  requireVerification: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnVerification: boolean;
  alertConfig?: VendorContactAlertConfig;
}

/**
 * Vendor contact alert configuration
 */
export interface VendorContactAlertConfig {
  enabled: boolean;
  duplicateContactAlert: boolean;
  invalidEmailAlert: boolean;
  invalidPhoneAlert: boolean;
  verificationFailureAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor contact history
 */
export interface VendorContactHistory extends BaseEntity, Timestamp {
  id: ID;
  contactId: ID;
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
 * Vendor contact validation
 */
export interface VendorContactValidation {
  isValid: boolean;
  contactId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor contact export
 */
export interface VendorContactExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx' | 'vcard';
  filter: VendorContactFilter;
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
