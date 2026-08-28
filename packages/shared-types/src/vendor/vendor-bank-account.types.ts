/**
 * Vendor Bank Account Types
 * Type definitions for vendor bank accounts based on shared-constants
 * @module VendorBankAccountTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor
// ============================================================
import {
  // Vendor Bank Account
  VENDOR_BANK_ACCOUNT,
  VendorBankAccountType,
  VendorBankAccountStatus,
  VendorBankAccountCurrency,
  VendorBankAccountVerificationMethod,
  vendorBankAccountGetTypeLabel,
  vendorBankAccountGetStatusLabel,
  vendorBankAccountGetCurrencyLabel,
  vendorBankAccountIsActive,
  vendorBankAccountIsVerified,
  vendorBankAccountCanTransact,
  vendorBankAccountGetVerificationMethodLabel,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Bank Account Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Vendor bank account filter
 */
export interface VendorBankAccountFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  types?: VendorBankAccountType[];
  statuses?: VendorBankAccountStatus[];
  currencies?: VendorBankAccountCurrency[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isVerified?: boolean;
  canTransact?: boolean;
  isDefault?: boolean;
  isPrimary?: boolean;
  searchTerm?: string;
  bankName?: string;
  accountNumber?: string;
}

/**
 * Vendor bank account statistics
 */
export interface VendorBankAccountStatistics {
  vendorId: ID;
  totalAccounts: number;
  activeAccounts: number;
  verifiedAccounts: number;
  defaultAccounts: number;
  primaryAccounts: number;
  byType: Record<VendorBankAccountType, number>;
  byStatus: Record<VendorBankAccountStatus, number>;
  byCurrency: Record<VendorBankAccountCurrency, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: VendorBankAccountType;
  mostFrequentStatus: VendorBankAccountStatus;
  mostFrequentCurrency: VendorBankAccountCurrency;
  accountsCanTransact: number;
  accountsWithVerification: number;
}

/**
 * Vendor bank account summary
 */
export interface VendorBankAccountSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalAccounts: number;
  active: number;
  verified: number;
  default: number;
  primary: number;
  byType: Record<VendorBankAccountType, number>;
  byStatus: Record<VendorBankAccountStatus, number>;
  byCurrency: Record<VendorBankAccountCurrency, number>;
  accountTrend: {
    date: Date;
    total: number;
    active: number;
    verified: number;
  }[];
  topTypes: {
    type: VendorBankAccountType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: VendorBankAccountStatus;
    count: number;
    label: string;
  }[];
  topCurrencies: {
    currency: VendorBankAccountCurrency;
    count: number;
    label: string;
  }[];
}

/**
 * Vendor bank account configuration
 */
export interface VendorBankAccountConfiguration {
  enabled: boolean;
  requireBankName: boolean;
  requireBankCode: boolean;
  requireBranchName: boolean;
  requireAccountNumber: boolean;
  requireAccountHolderName: boolean;
  requireAccountType: boolean;
  requireCurrency: boolean;
  maxAccountsPerVendor: number;
  allowMultipleDefault: boolean;
  allowMultiplePrimary: boolean;
  requireVerification: boolean;
  verificationMethod: VendorBankAccountVerificationMethod;
  autoVerify: boolean;
  verificationAmount: number;
  verificationTimeoutDays: number;
  allowInternationalAccounts: boolean;
  allowedCurrencies: VendorBankAccountCurrency[];
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnVerification: boolean;
  alertConfig?: VendorBankAccountAlertConfig;
}

/**
 * Vendor bank account alert configuration
 */
export interface VendorBankAccountAlertConfig {
  enabled: boolean;
  duplicateAccountAlert: boolean;
  invalidAccountNumberAlert: boolean;
  invalidBankCodeAlert: boolean;
  verificationFailureAlert: boolean;
  verificationTimeoutAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor bank account verification
 */
export interface VendorBankAccountVerification extends BaseEntity, Timestamp {
  id: ID;
  accountId: ID;
  vendorId: ID;
  userId: ID;
  method: VendorBankAccountVerificationMethod;
  status: 'pending' | 'verified' | 'failed' | 'expired' | 'cancelled';
  verificationAmount?: number;
  currency: VendorBankAccountCurrency;
  attempts: number;
  maxAttempts: number;
  verifiedAt?: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Vendor bank account history
 */
export interface VendorBankAccountHistory extends BaseEntity, Timestamp {
  id: ID;
  accountId: ID;
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
 * Vendor bank account validation
 */
export interface VendorBankAccountValidation {
  isValid: boolean;
  accountId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor bank account export
 */
export interface VendorBankAccountExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorBankAccountFilter;
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
  // Vendor Bank Account
  VENDOR_BANK_ACCOUNT,
  VendorBankAccountType,
  VendorBankAccountStatus,
  VendorBankAccountCurrency,
  VendorBankAccountVerificationMethod,
  vendorBankAccountGetTypeLabel,
  vendorBankAccountGetStatusLabel,
  vendorBankAccountGetCurrencyLabel,
  vendorBankAccountIsActive,
  vendorBankAccountIsVerified,
  vendorBankAccountCanTransact,
  vendorBankAccountGetVerificationMethodLabel,
};
