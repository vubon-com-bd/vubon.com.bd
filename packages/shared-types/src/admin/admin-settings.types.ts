/**
 * Admin Settings Types
 * Type definitions for admin settings based on shared-constants
 * @module AdminSettingsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants admin settings
// ============================================================
import {
  // Constants
  ADMIN_SETTINGS,
  ADMIN_SETTINGS_CATEGORY_LABELS,
  ADMIN_SETTINGS_CATEGORY_ICONS,
  ADMIN_SETTINGS_TYPE_LABELS,
  ADMIN_SETTINGS_STATUS_LABELS,
  ADMIN_SETTINGS_STATUS_COLORS,
  ADMIN_SETTINGS_SCOPE_LABELS,
  ADMIN_SETTINGS_VISIBILITY_LABELS,
  ADMIN_SETTINGS_SENSITIVITY_LABELS,
  ADMIN_SETTINGS_SENSITIVITY_COLORS,
  ADMIN_SETTINGS_PRIORITY_LABELS,
  ADMIN_SETTINGS_GROUP_LABELS,
  // Types
  AdminSettingsCategory,
  AdminSettingsType,
  AdminSettingsStatus,
  AdminSettingsScope,
  AdminSettingsVisibility,
  AdminSettingsSensitivity,
  AdminSettingsPriority,
  AdminSettingsGroup,
  // Functions
  getAdminSettingsCategoryLabel,
  getAdminSettingsCategoryIcon,
  getAdminSettingsTypeLabel,
  getAdminSettingsStatusLabel,
  getAdminSettingsStatusColor,
  getAdminSettingsScopeLabel,
  getAdminSettingsVisibilityLabel,
  getAdminSettingsSensitivityLabel,
  getAdminSettingsSensitivityColor,
  getAdminSettingsPriorityLabel,
  getAdminSettingsGroupLabel,
  isAdminSettingsActive,
  isAdminSettingsInactive,
  isAdminSettingsLocked,
  isAdminSettingsSynced,
  isAdminVisibleSettings,
  getAdminSettingsModification,
  getAdminSettingsSourceLabel,
} from '@vubon/shared-constants';

// ============================================================
// Admin Settings Extended Types
// ============================================================

/**
 * Admin settings with additional metadata
 */
export interface AdminSettingsExtended extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  category: AdminSettingsCategory;
  type: AdminSettingsType;
  status: AdminSettingsStatus;
  scope: AdminSettingsScope;
  visibility: AdminSettingsVisibility;
  sensitivity: AdminSettingsSensitivity;
  priority: AdminSettingsPriority;
  group: AdminSettingsGroup;
  key: string;
  value: unknown;
  defaultValue?: unknown;
  label: string;
  description?: string;
  isRequired: boolean;
  isSystem: boolean;
  isEncrypted: boolean;
  version?: number;
  metadata?: Metadata;
}

/**
 * Admin settings group detail (extends the imported type)
 */
export interface AdminSettingsGroupDetail extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  name: string;
  label: string;
  category: AdminSettingsCategory;
  priority: AdminSettingsPriority;
  settings: AdminSettingsExtended[];
  isCollapsed: boolean;
  metadata?: Metadata;
}

/**
 * Admin settings category with its groups
 */
export interface AdminSettingsCategoryDetail {
  category: AdminSettingsCategory;
  label: string;
  icon?: string;
  groups: AdminSettingsGroupDetail[];
  count: number;
  priority: number;
}

/**
 * Admin settings change history
 */
export interface AdminSettingsChangeHistory extends BaseEntity, Timestamp {
  id: ID;
  settingId: ID;
  adminId: ID;
  previousValue: unknown;
  newValue: unknown;
  changedBy: ID;
  reason?: string;
  metadata?: Metadata;
}

/**
 * Admin settings validation result
 */
export interface AdminSettingsValidationResult {
  isValid: boolean;
  settingKey: string;
  value: unknown;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Admin settings import/export
 */
export interface AdminSettingsImportExport {
  adminId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  version: string;
  data: Record<string, unknown>;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * Admin settings search filter
 */
export interface AdminSettingsSearchFilter {
  category?: AdminSettingsCategory[];
  type?: AdminSettingsType[];
  status?: AdminSettingsStatus[];
  scope?: AdminSettingsScope[];
  visibility?: AdminSettingsVisibility[];
  sensitivity?: AdminSettingsSensitivity[];
  priority?: AdminSettingsPriority[];
  group?: AdminSettingsGroup[];
  searchTerm?: string;
  isRequired?: boolean;
  isSystem?: boolean;
  isEncrypted?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

/**
 * Admin settings page
 */
export interface AdminSettingsPage {
  id: string;
  title: string;
  category: AdminSettingsCategory;
  groups: AdminSettingsGroupDetail[];
  order: number;
  isActive: boolean;
}

/**
 * Admin settings dependency
 */
export interface AdminSettingsDependency {
  settingKey: string;
  dependsOn: string;
  condition: (value: unknown) => boolean;
  action: 'show' | 'hide' | 'enable' | 'disable' | 'require';
}

/**
 * Admin settings audit
 */
export interface AdminSettingsAudit extends BaseEntity, Timestamp {
  id: ID;
  settingId: ID;
  adminId: ID;
  action: 'create' | 'update' | 'delete' | 'restore' | 'lock' | 'unlock' | 'encrypt' | 'decrypt';
  changes: AdminSettingsChangeHistory[];
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

/**
 * Admin settings export configuration
 */
export interface AdminSettingsExportConfig {
  format: 'json' | 'yaml' | 'xml' | 'csv';
  includeMetadata: boolean;
  includeHistory: boolean;
  includeAudit: boolean;
  filter?: AdminSettingsSearchFilter;
  encryption?: {
    enabled: boolean;
    algorithm: string;
    keyId?: string;
  };
  compression?: {
    enabled: boolean;
    algorithm: string;
  };
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Constants
  ADMIN_SETTINGS,
  ADMIN_SETTINGS_CATEGORY_LABELS,
  ADMIN_SETTINGS_CATEGORY_ICONS,
  ADMIN_SETTINGS_TYPE_LABELS,
  ADMIN_SETTINGS_STATUS_LABELS,
  ADMIN_SETTINGS_STATUS_COLORS,
  ADMIN_SETTINGS_SCOPE_LABELS,
  ADMIN_SETTINGS_VISIBILITY_LABELS,
  ADMIN_SETTINGS_SENSITIVITY_LABELS,
  ADMIN_SETTINGS_SENSITIVITY_COLORS,
  ADMIN_SETTINGS_PRIORITY_LABELS,
  ADMIN_SETTINGS_GROUP_LABELS,
  // Types
  AdminSettingsCategory,
  AdminSettingsType,
  AdminSettingsStatus,
  AdminSettingsScope,
  AdminSettingsVisibility,
  AdminSettingsSensitivity,
  AdminSettingsPriority,
  AdminSettingsGroup,
  // Functions
  getAdminSettingsCategoryLabel,
  getAdminSettingsCategoryIcon,
  getAdminSettingsTypeLabel,
  getAdminSettingsStatusLabel,
  getAdminSettingsStatusColor,
  getAdminSettingsScopeLabel,
  getAdminSettingsVisibilityLabel,
  getAdminSettingsSensitivityLabel,
  getAdminSettingsSensitivityColor,
  getAdminSettingsPriorityLabel,
  getAdminSettingsGroupLabel,
  isAdminSettingsActive,
  isAdminSettingsInactive,
  isAdminSettingsLocked,
  isAdminSettingsSynced,
  isAdminVisibleSettings,
  getAdminSettingsModification,
  getAdminSettingsSourceLabel,
};
