/**
 * Payment Settings Types
 * Type definitions for payment settings based on shared-constants
 * @module PaymentSettingsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants checkout
// ============================================================
import {
  // Payment Method
  PaymentMethodType,
  // Payment Gateway
  PaymentGatewayType,
  // Payment Status
  PaymentStatusType,
} from '@vubon/shared-constants';

// ============================================================
// Payment Settings Extended Types
// ============================================================

/**
 * Payment settings
 */
export interface PaymentSettings extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  defaultMethod: PaymentMethodType;
  defaultGateway: PaymentGatewayType;
  defaultCurrency: string;
  defaultCountry: string;
  preferredMethods: PaymentMethodType[];
  autoSaveCards: boolean;
  autoSelectBestMethod: boolean;
  requireVerification: boolean;
  requireConfirmation: boolean;
  notificationOnPayment: boolean;
  notificationOnFailure: boolean;
  notificationOnRefund: boolean;
  metadata?: Metadata;
}

/**
 * Payment settings filter
 */
export interface PaymentSettingsFilter {
  ids?: ID[];
  userIds?: ID[];
  defaultMethods?: PaymentMethodType[];
  defaultGateways?: PaymentGatewayType[];
  currencies?: string[];
  countries?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  autoSaveCards?: boolean;
  autoSelectBestMethod?: boolean;
  requireVerification?: boolean;
  requireConfirmation?: boolean;
  notificationOnPayment?: boolean;
  notificationOnFailure?: boolean;
  notificationOnRefund?: boolean;
  searchTerm?: string;
}

/**
 * Payment settings statistics
 */
export interface PaymentSettingsStatistics {
  userId: ID;
  totalSettings: number;
  defaultMethodDistribution: Record<PaymentMethodType, number>;
  defaultGatewayDistribution: Record<PaymentGatewayType, number>;
  currencyDistribution: Record<string, number>;
  countryDistribution: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  autoSaveCardsCount: number;
  autoSelectBestMethodCount: number;
  requireVerificationCount: number;
  requireConfirmationCount: number;
  mostFrequentDefaultMethod: PaymentMethodType;
  mostFrequentDefaultGateway: PaymentGatewayType;
  mostFrequentCurrency: string;
  mostFrequentCountry: string;
}

/**
 * Payment settings summary
 */
export interface PaymentSettingsSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSettings: number;
  defaultMethodDistribution: Record<PaymentMethodType, number>;
  defaultGatewayDistribution: Record<PaymentGatewayType, number>;
  currencyDistribution: Record<string, number>;
  countryDistribution: Record<string, number>;
  settingsTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topDefaultMethods: {
    method: PaymentMethodType;
    count: number;
    label: string;
  }[];
  topDefaultGateways: {
    gateway: PaymentGatewayType;
    count: number;
    label: string;
  }[];
  topCurrencies: {
    currency: string;
    count: number;
    label: string;
  }[];
  topCountries: {
    country: string;
    count: number;
    label: string;
  }[];
}

/**
 * Payment settings configuration
 */
export interface PaymentSettingsConfiguration {
  enabled: boolean;
  defaultMethod: PaymentMethodType;
  defaultGateway: PaymentGatewayType;
  defaultCurrency: string;
  defaultCountry: string;
  allowedMethods: PaymentMethodType[];
  allowedGateways: PaymentGatewayType[];
  allowedCurrencies: string[];
  allowedCountries: string[];
  autoSaveCards: boolean;
  autoSelectBestMethod: boolean;
  requireVerification: boolean;
  requireConfirmation: boolean;
  notificationOnPayment: boolean;
  notificationOnFailure: boolean;
  notificationOnRefund: boolean;
  maxRetries: number;
  retryDelayMinutes: number;
  alertConfig?: PaymentSettingsAlertConfig;
}

/**
 * Payment settings alert configuration
 */
export interface PaymentSettingsAlertConfig {
  enabled: boolean;
  invalidSettingsAlert: boolean;
  methodUnavailableAlert: boolean;
  gatewayUnavailableAlert: boolean;
  currencyUnavailableAlert: boolean;
  countryUnavailableAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Payment settings history
 */
export interface PaymentSettingsHistory extends BaseEntity, Timestamp {
  id: ID;
  settingsId: ID;
  userId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Payment settings validation
 */
export interface PaymentSettingsValidation {
  isValid: boolean;
  settingsId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Payment settings export
 */
export interface PaymentSettingsExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: PaymentSettingsFilter;
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
  // Payment Method
  PaymentMethodType,
  // Payment Gateway
  PaymentGatewayType,
  // Payment Status
  PaymentStatusType,
};
