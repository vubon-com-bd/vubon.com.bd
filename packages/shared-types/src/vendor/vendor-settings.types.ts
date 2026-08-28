/**
 * Vendor Settings Types
 * Type definitions for vendor settings based on shared-constants
 * @module VendorSettingsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Currency } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor
// ============================================================
import {
  // Core Vendor
  VendorStatusType,
  VendorTypeType,
  VendorTierType,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Settings Extended Types
// ============================================================

/**
 * Vendor settings
 */
export interface VendorSettings extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  general: VendorGeneralSettings;
  notification: VendorNotificationSettings;
  security: VendorSecuritySettings;
  payment: VendorPaymentSettings;
  shipping: VendorShippingSettings;
  invoice: VendorInvoiceSettings;
  communication: VendorCommunicationSettings;
  metadata?: Metadata;
}

/**
 * Vendor general settings
 */
export interface VendorGeneralSettings {
  defaultCurrency: Currency;
  defaultLanguage: string;
  defaultTimezone: string;
  dateFormat: string;
  timeFormat: string;
  numberFormat: string;
  unitSystem: 'metric' | 'imperial';
  autoApproveOrders: boolean;
  autoAssignInventory: boolean;
  allowBackorder: boolean;
  maxOrderItems: number;
  defaultOrderStatus: string;
}

/**
 * Vendor notification settings
 */
export interface VendorNotificationSettings {
  email: {
    enabled: boolean;
    frequency: 'realtime' | 'daily' | 'weekly' | 'never';
    language: string;
  };
  sms: {
    enabled: boolean;
    frequency: 'realtime' | 'daily' | 'weekly' | 'never';
  };
  push: {
    enabled: boolean;
    frequency: 'realtime' | 'daily' | 'weekly' | 'never';
    sound: boolean;
    badge: boolean;
  };
  inApp: {
    enabled: boolean;
    frequency: 'realtime' | 'daily' | 'weekly' | 'never';
    sound: boolean;
    badge: boolean;
  };
  categories: {
    order: boolean;
    payment: boolean;
    product: boolean;
    inventory: boolean;
    shipping: boolean;
    support: boolean;
    marketing: boolean;
    system: boolean;
  };
}

/**
 * Vendor security settings
 */
export interface VendorSecuritySettings {
  twoFactorAuth: {
    enabled: boolean;
    method: 'email' | 'sms' | 'authenticator' | 'backup_codes';
  };
  sessionTimeout: number;
  loginAttempts: number;
  lockoutDuration: number;
  requirePasswordChange: boolean;
  passwordChangeInterval: number;
  maxActiveSessions: number;
  allowRememberMe: boolean;
  rememberMeDays: number;
  ipWhitelist: string[];
  ipBlacklist: string[];
  deviceVerification: boolean;
}

/**
 * Vendor payment settings
 */
export interface VendorPaymentSettings {
  defaultPaymentMethod: string;
  defaultPayoutMethod: string;
  defaultCurrency: Currency;
  minPayoutAmount: number;
  maxPayoutAmount: number;
  payoutFrequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  autoPayout: boolean;
  holdPayoutDays: number;
  allowPartialPayout: boolean;
  allowMultiplePayoutMethods: boolean;
  requirePaymentVerification: boolean;
  taxRate: number;
  taxIncluded: boolean;
}

/**
 * Vendor shipping settings
 */
export interface VendorShippingSettings {
  defaultCarrier: string;
  defaultMethod: string;
  defaultZone: string;
  freeShippingThreshold: number;
  defaultWeight: number;
  weightUnit: 'kg' | 'lb' | 'g' | 'oz';
  defaultDimensions: {
    length: number;
    width: number;
    height: number;
  };
  dimensionUnit: 'cm' | 'in' | 'mm' | 'ft';
  allowInternational: boolean;
  allowCOD: boolean;
  codCharge: number;
  requireTracking: boolean;
  autoCalculateShipping: boolean;
  defaultShippingCost: number;
}

/**
 * Vendor invoice settings
 */
export interface VendorInvoiceSettings {
  autoGenerate: boolean;
  invoiceNumberPrefix: string;
  invoiceNumberLength: number;
  taxRate: number;
  taxIncluded: boolean;
  discountEnabled: boolean;
  discountType: 'percentage' | 'fixed';
  defaultDiscount: number;
  paymentTerms: 'net_7' | 'net_15' | 'net_30' | 'net_45' | 'net_60';
  dueDateOffsetDays: number;
  requireApproval: boolean;
  notificationOnCreate: boolean;
  notificationOnPaid: boolean;
  notificationOnOverdue: boolean;
}

/**
 * Vendor communication settings
 */
export interface VendorCommunicationSettings {
  email: {
    enabled: boolean;
    frequency: 'realtime' | 'daily' | 'weekly' | 'never';
    language: string;
    format: 'html' | 'text';
  };
  sms: {
    enabled: boolean;
    frequency: 'realtime' | 'daily' | 'weekly' | 'never';
    language: string;
  };
  chat: {
    enabled: boolean;
    autoStart: boolean;
    offlineMessage: boolean;
  };
  support: {
    enabled: boolean;
    channels: ('email' | 'phone' | 'chat' | 'ticket')[];
    responseTime: number;
    autoAssign: boolean;
  };
}

/**
 * Vendor settings filter
 */
export interface VendorSettingsFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchTerm?: string;
}

/**
 * Vendor settings statistics
 */
export interface VendorSettingsStatistics {
  vendorId: ID;
  totalSettings: number;
  generalSettings: number;
  notificationSettings: number;
  securitySettings: number;
  paymentSettings: number;
  shippingSettings: number;
  invoiceSettings: number;
  communicationSettings: number;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentCurrency: Currency;
  mostFrequentLanguage: string;
  mostFrequentTimezone: string;
}

/**
 * Vendor settings history
 */
export interface VendorSettingsHistory extends BaseEntity, Timestamp {
  id: ID;
  settingsId: ID;
  vendorId: ID;
  userId: ID;
  section:
    'general' | 'notification' | 'security' | 'payment' | 'shipping' | 'invoice' | 'communication';
  field: string;
  oldValue: unknown;
  newValue: unknown;
  changedBy: ID;
  reason?: string;
  metadata?: Metadata;
}

/**
 * Vendor settings validation
 */
export interface VendorSettingsValidation {
  isValid: boolean;
  settingsId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor settings export
 */
export interface VendorSettingsExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  sections: (
    'general' | 'notification' | 'security' | 'payment' | 'shipping' | 'invoice' | 'communication'
  )[];
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
  VendorTierType,
};
