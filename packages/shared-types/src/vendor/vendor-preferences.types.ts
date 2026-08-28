/**
 * Vendor Preferences Types
 * Type definitions for vendor preferences based on shared-constants
 * @module VendorPreferencesTypes
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
// Vendor Preferences Extended Types
// ============================================================

/**
 * Vendor preferences
 */
export interface VendorPreferences extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  general: VendorGeneralPreferences;
  display: VendorDisplayPreferences;
  notification: VendorNotificationPreferences;
  dashboard: VendorDashboardPreferences;
  accessibility: VendorAccessibilityPreferences;
  language: VendorLanguagePreferences;
  metadata?: Metadata;
}

/**
 * Vendor general preferences
 */
export interface VendorGeneralPreferences {
  defaultCurrency: Currency;
  defaultLanguage: string;
  defaultTimezone: string;
  dateFormat: string;
  timeFormat: string;
  numberFormat: string;
  weekStart: 'sunday' | 'monday' | 'saturday';
  compactMode: boolean;
  animations: boolean;
  confirmActions: boolean;
  autoSave: boolean;
}

/**
 * Vendor display preferences
 */
export interface VendorDisplayPreferences {
  theme: 'light' | 'dark' | 'system';
  accentColor: string;
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  density: 'compact' | 'comfortable' | 'spacious';
  reducedMotion: boolean;
  highContrast: boolean;
  showAvatars: boolean;
  showStatusIndicators: boolean;
  showTooltips: boolean;
  customCSS?: string;
}

/**
 * Vendor notification preferences
 */
export interface VendorNotificationPreferences {
  email: {
    enabled: boolean;
    frequency: 'realtime' | 'daily' | 'weekly' | 'never';
    digest: boolean;
    digestFrequency: 'daily' | 'weekly';
  };
  sms: {
    enabled: boolean;
    frequency: 'realtime' | 'daily' | 'weekly' | 'never';
    digest: boolean;
    digestFrequency: 'daily' | 'weekly';
  };
  push: {
    enabled: boolean;
    frequency: 'realtime' | 'daily' | 'weekly' | 'never';
    sound: boolean;
    badge: boolean;
    vibration: boolean;
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
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
    timezone: string;
  };
}

/**
 * Vendor dashboard preferences
 */
export interface VendorDashboardPreferences {
  layout: 'grid' | 'list' | 'compact';
  widgets: string[];
  order: string[];
  defaultView: string;
  refreshInterval: number;
  showRecentOrders: boolean;
  showAnalytics: boolean;
  showNotifications: boolean;
  showTasks: boolean;
  showInventory: boolean;
  showRevenue: boolean;
  showPerformance: boolean;
  customWidgets?: Record<string, unknown>;
}

/**
 * Vendor accessibility preferences
 */
export interface VendorAccessibilityPreferences {
  highContrast: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  focusIndicator: boolean;
  fontSizeMultiplier: number;
  colorBlindMode: boolean;
  darkMode: boolean;
  largeText: boolean;
  descriptiveLinks: boolean;
}

/**
 * Vendor language preferences
 */
export interface VendorLanguagePreferences {
  primaryLanguage: string;
  secondaryLanguage?: string;
  dateFormat: string;
  timeFormat: string;
  numberFormat: string;
  currencyFormat: string;
  direction: 'ltr' | 'rtl';
  pluralRules: string;
  translationPreferences: {
    autoTranslate: boolean;
    fallbackLanguage: string;
  };
}

/**
 * Vendor preferences filter
 */
export interface VendorPreferencesFilter {
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
 * Vendor preferences statistics
 */
export interface VendorPreferencesStatistics {
  vendorId: ID;
  totalPreferences: number;
  generalPreferences: number;
  displayPreferences: number;
  notificationPreferences: number;
  dashboardPreferences: number;
  accessibilityPreferences: number;
  languagePreferences: number;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentTheme: string;
  mostFrequentLanguage: string;
  mostFrequentTimezone: string;
}

/**
 * Vendor preferences history
 */
export interface VendorPreferencesHistory extends BaseEntity, Timestamp {
  id: ID;
  preferencesId: ID;
  vendorId: ID;
  userId: ID;
  section: 'general' | 'display' | 'notification' | 'dashboard' | 'accessibility' | 'language';
  field: string;
  oldValue: unknown;
  newValue: unknown;
  changedBy: ID;
  reason?: string;
  metadata?: Metadata;
}

/**
 * Vendor preferences validation
 */
export interface VendorPreferencesValidation {
  isValid: boolean;
  preferencesId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor preferences export
 */
export interface VendorPreferencesExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  sections: ('general' | 'display' | 'notification' | 'dashboard' | 'accessibility' | 'language')[];
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
