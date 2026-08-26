/**
 * Cart Settings Types
 * Type definitions for cart settings based on shared-constants
 * @module CartSettingsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants cart
// ============================================================
import {
  // Cart Settings
  CART_SETTINGS,
  CartSettingsCategory,
  CartSettingType,
  CartSettingStatus,
  CartSettingScope,
  CartSettingDefault,
  CartSettingsLimit,
  CartSettingsError,
  cartsettingsGetCategoryLabel,
  cartsettingsGetTypeLabel,
  cartsettingsGetStatusLabel,
  cartsettingsGetScopeLabel,
  cartsettingsGetErrorLabel,
  cartsettingsIsActive,
  cartsettingsIsGlobal,
  cartsettingsIsUserScope,
  cartsettingsGetDefaultCurrency,
  cartsettingsGetDefaultLocale,
  cartsettingsGetDefaultMaxItems,
  cartsettingsGetDefaultSessionTimeout,
} from '@vubon/shared-constants';

// ============================================================
// Cart Settings Extended Types
// ============================================================

/**
 * Cart setting
 */
export interface CartSetting extends BaseEntity, Timestamp {
  id: ID;
  userId?: ID;
  category: CartSettingsCategory;
  type: CartSettingType;
  status: CartSettingStatus;
  scope: CartSettingScope;
  key: string;
  value: unknown;
  label: string;
  description?: string;
  isActive: boolean;
  isGlobal: boolean;
  isUserScope: boolean;
  metadata?: Metadata;
}

/**
 * Cart settings filter
 */
export interface CartSettingsFilter {
  userIds?: ID[];
  categories?: CartSettingsCategory[];
  types?: CartSettingType[];
  statuses?: CartSettingStatus[];
  scopes?: CartSettingScope[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isGlobal?: boolean;
  isUserScope?: boolean;
  searchTerm?: string;
}

/**
 * Cart settings statistics
 */
export interface CartSettingsStatistics {
  totalSettings: number;
  activeSettings: number;
  globalSettings: number;
  userSettings: number;
  byCategory: Record<CartSettingsCategory, number>;
  byType: Record<CartSettingType, number>;
  byStatus: Record<CartSettingStatus, number>;
  byScope: Record<CartSettingScope, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentCategory: CartSettingsCategory;
  mostFrequentType: CartSettingType;
  mostFrequentStatus: CartSettingStatus;
}

/**
 * Cart settings summary
 */
export interface CartSettingsSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  global: number;
  user: number;
  byCategory: Record<CartSettingsCategory, number>;
  byType: Record<CartSettingType, number>;
  byStatus: Record<CartSettingStatus, number>;
  byScope: Record<CartSettingScope, number>;
  settingsTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topCategories: {
    category: CartSettingsCategory;
    count: number;
    label: string;
  }[];
  topTypes: {
    type: CartSettingType;
    count: number;
    label: string;
  }[];
}

/**
 * Cart settings configuration
 */
export interface CartSettingsConfiguration {
  enabled: boolean;
  defaultCurrency: string;
  defaultLocale: string;
  defaultMaxItems: number;
  defaultSessionTimeout: number;
  allowUserSettings: boolean;
  allowGlobalSettings: boolean;
  autoApplyDefaults: boolean;
  validateSettings: boolean;
  notificationOnUpdate: boolean;
  notificationOnError: boolean;
  alertConfig?: CartSettingsAlertConfig;
}

/**
 * Cart settings alert configuration
 */
export interface CartSettingsAlertConfig {
  enabled: boolean;
  updateFailureAlert: boolean;
  invalidSettingAlert: boolean;
  scopeConflictAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Cart settings history
 */
export interface CartSettingsHistory extends BaseEntity, Timestamp {
  id: ID;
  settingId: ID;
  userId?: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Cart settings validation
 */
export interface CartSettingsValidation {
  isValid: boolean;
  settingId: ID;
  key: string;
  value: unknown;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Cart settings export
 */
export interface CartSettingsExport extends BaseEntity, Timestamp {
  id: ID;
  userId?: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  settings: CartSetting[];
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Cart settings import
 */
export interface CartSettingsImport extends BaseEntity, Timestamp {
  id: ID;
  userId?: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  data: string;
  filename: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  importedSettings: number;
  failedSettings: number;
  importErrors?: string[];
  importedAt?: Date;
  metadata?: Metadata;
}

/**
 * Cart settings default
 */
export interface CartSettingsDefault {
  currency: string;
  locale: string;
  maxItems: number;
  sessionTimeout: number;
  expiryHours: number;
  maxPromotions: number;
  maxCoupons: number;
  allowGuestCart: boolean;
  allowMultipleCarts: boolean;
  autoMergeOnLogin: boolean;
  notificationOnAbandon: boolean;
  notificationOnConvert: boolean;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Cart Settings
  CART_SETTINGS,
  CartSettingsCategory,
  CartSettingType,
  CartSettingStatus,
  CartSettingScope,
  CartSettingDefault,
  CartSettingsLimit,
  CartSettingsError,
  cartsettingsGetCategoryLabel,
  cartsettingsGetTypeLabel,
  cartsettingsGetStatusLabel,
  cartsettingsGetScopeLabel,
  cartsettingsGetErrorLabel,
  cartsettingsIsActive,
  cartsettingsIsGlobal,
  cartsettingsIsUserScope,
  cartsettingsGetDefaultCurrency,
  cartsettingsGetDefaultLocale,
  cartsettingsGetDefaultMaxItems,
  cartsettingsGetDefaultSessionTimeout,
};
