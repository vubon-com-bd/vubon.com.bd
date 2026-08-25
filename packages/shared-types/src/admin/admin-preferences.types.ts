/**
 * Admin Preferences Types
 * Type definitions for admin preferences based on shared-constants
 * @module AdminPreferencesTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants admin preferences
// ============================================================
import {
  // Constants
  ADMIN_PREFERENCES,
  ADMIN_PREFERENCES_CATEGORY_LABELS,
  ADMIN_PREFERENCES_CATEGORY_ICONS,
  ADMIN_PREFERENCES_TYPE_LABELS,
  ADMIN_PREFERENCES_STATUS_LABELS,
  ADMIN_PREFERENCES_STATUS_COLORS,
  ADMIN_PREFERENCES_SCOPE_LABELS,
  ADMIN_PREFERENCES_VISIBILITY_LABELS,
  ADMIN_PREFERENCES_SENSITIVITY_LABELS,
  ADMIN_PREFERENCES_SENSITIVITY_COLORS,
  ADMIN_PREFERENCES_GROUP_LABELS,
  // Types
  AdminPreferenceCategory,
  AdminPreferenceType,
  AdminPreferenceStatus,
  AdminPreferenceScope,
  AdminPreferenceVisibility,
  AdminPreferenceSensitivity,
  AdminPreferenceGroup,
  // Functions
  getAdminPreferenceCategoryLabel,
  getAdminPreferenceCategoryIcon,
  getAdminPreferenceTypeLabel,
  getAdminPreferenceStatusLabel,
  getAdminPreferenceStatusColor,
  getAdminPreferenceScopeLabel,
  getAdminPreferenceVisibilityLabel,
  getAdminPreferenceSensitivityLabel,
  getAdminPreferenceSensitivityColor,
  getAdminPreferenceGroupLabel,
  isAdminPreferenceActive,
  isAdminPreferenceInactive,
  isAdminPreferenceLocked,
} from '@vubon/shared-constants';

// ============================================================
// Admin Preferences Extended Types
// ============================================================

/**
 * Admin preferences with additional metadata
 */
export interface AdminPreferencesExtended extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  category: AdminPreferenceCategory;
  type: AdminPreferenceType;
  status: AdminPreferenceStatus;
  scope: AdminPreferenceScope;
  visibility: AdminPreferenceVisibility;
  sensitivity: AdminPreferenceSensitivity;
  group: AdminPreferenceGroup;
  key: string;
  value: unknown;
  defaultValue?: unknown;
  label: string;
  description?: string;
  isRequired: boolean;
  isSystem: boolean;
  version?: number;
  metadata?: Metadata;
}

/**
 * Admin preferences group detail
 */
export interface AdminPreferencesGroupDetail extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  name: string;
  label: string;
  category: AdminPreferenceCategory;
  preferences: AdminPreferencesExtended[];
  isCollapsed: boolean;
  order: number;
  metadata?: Metadata;
}

/**
 * Admin preferences category with its groups
 */
export interface AdminPreferencesCategoryDetail {
  category: AdminPreferenceCategory;
  label: string;
  icon?: string;
  groups: AdminPreferencesGroupDetail[];
  count: number;
  order: number;
}

/**
 * Admin preferences change history
 */
export interface AdminPreferencesChangeHistory extends BaseEntity, Timestamp {
  id: ID;
  preferenceId: ID;
  adminId: ID;
  previousValue: unknown;
  newValue: unknown;
  changedBy: ID;
  reason?: string;
  metadata?: Metadata;
}

/**
 * Admin preferences validation result
 */
export interface AdminPreferencesValidationResult {
  isValid: boolean;
  preferenceKey: string;
  value: unknown;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Admin preferences import/export
 */
export interface AdminPreferencesImportExport {
  adminId: ID;
  format: 'json' | 'yaml' | 'xml';
  version: string;
  data: Record<string, unknown>;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * Admin preferences search filter
 */
export interface AdminPreferencesSearchFilter {
  category?: AdminPreferenceCategory[];
  type?: AdminPreferenceType[];
  status?: AdminPreferenceStatus[];
  scope?: AdminPreferenceScope[];
  visibility?: AdminPreferenceVisibility[];
  sensitivity?: AdminPreferenceSensitivity[];
  group?: AdminPreferenceGroup[];
  searchTerm?: string;
  isRequired?: boolean;
  isSystem?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

/**
 * Admin preferences page
 */
export interface AdminPreferencesPage {
  id: string;
  title: string;
  category: AdminPreferenceCategory;
  groups: AdminPreferencesGroupDetail[];
  order: number;
  isActive: boolean;
}

/**
 * Admin preferences theme
 */
export interface AdminPreferencesTheme {
  mode: 'light' | 'dark' | 'system';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  density: 'compact' | 'comfortable' | 'spacious';
  animations: boolean;
  customCss?: string;
}

/**
 * Admin preferences language
 */
export interface AdminPreferencesLanguage {
  code: string;
  name: string;
  direction: 'ltr' | 'rtl';
  dateFormat: string;
  timeFormat: string;
  numberFormat: string;
  currencyFormat: string;
}

/**
 * Admin preferences notification
 */
export interface AdminPreferencesNotification {
  email: boolean;
  inApp: boolean;
  push: boolean;
  categories: {
    system: boolean;
    security: boolean;
    team: boolean;
    task: boolean;
    report: boolean;
    marketing: boolean;
    other: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
    timezone: string;
  };
}

/**
 * Admin preferences dashboard
 */
export interface AdminPreferencesDashboard {
  layout: 'grid' | 'list' | 'compact';
  widgets: string[];
  order: string[];
  defaultView: string;
  refreshInterval: number;
  showRecentActivity: boolean;
  showNotifications: boolean;
  showAnalytics: boolean;
  customWidgets?: Record<string, unknown>;
}

/**
 * Admin preferences accessibility
 */
export interface AdminPreferencesAccessibility {
  highContrast: boolean;
  reduceMotion: boolean;
  screenReader: boolean;
  fontSize: number;
  lineHeight: number;
  colorBlindMode: boolean;
  keyboardNavigation: boolean;
  focusIndicator: boolean;
}

/**
 * Admin preferences complete
 */
export interface AdminPreferencesComplete extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  theme: AdminPreferencesTheme;
  language: AdminPreferencesLanguage;
  notifications: AdminPreferencesNotification;
  dashboard: AdminPreferencesDashboard;
  accessibility: AdminPreferencesAccessibility;
  timezone: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Constants
  ADMIN_PREFERENCES,
  ADMIN_PREFERENCES_CATEGORY_LABELS,
  ADMIN_PREFERENCES_CATEGORY_ICONS,
  ADMIN_PREFERENCES_TYPE_LABELS,
  ADMIN_PREFERENCES_STATUS_LABELS,
  ADMIN_PREFERENCES_STATUS_COLORS,
  ADMIN_PREFERENCES_SCOPE_LABELS,
  ADMIN_PREFERENCES_VISIBILITY_LABELS,
  ADMIN_PREFERENCES_SENSITIVITY_LABELS,
  ADMIN_PREFERENCES_SENSITIVITY_COLORS,
  ADMIN_PREFERENCES_GROUP_LABELS,
  // Types
  AdminPreferenceCategory,
  AdminPreferenceType,
  AdminPreferenceStatus,
  AdminPreferenceScope,
  AdminPreferenceVisibility,
  AdminPreferenceSensitivity,
  AdminPreferenceGroup,
  // Functions
  getAdminPreferenceCategoryLabel,
  getAdminPreferenceCategoryIcon,
  getAdminPreferenceTypeLabel,
  getAdminPreferenceStatusLabel,
  getAdminPreferenceStatusColor,
  getAdminPreferenceScopeLabel,
  getAdminPreferenceVisibilityLabel,
  getAdminPreferenceSensitivityLabel,
  getAdminPreferenceSensitivityColor,
  getAdminPreferenceGroupLabel,
  isAdminPreferenceActive,
  isAdminPreferenceInactive,
  isAdminPreferenceLocked,
};
