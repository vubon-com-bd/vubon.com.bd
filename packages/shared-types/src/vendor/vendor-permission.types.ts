/**
 * Vendor Permission Types
 * Type definitions for vendor permissions based on shared-constants
 * @module VendorPermissionTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor permission
// ============================================================
import {
  // Vendor Permission
  VENDOR_PERMISSION_MODULES,
  VENDOR_PERMISSION_ACTIONS,
  VENDOR_PERMISSION_ROLES,
  VENDOR_PERMISSION_LEVELS,
  VENDOR_PERMISSION_DEFAULTS,
  VendorPermissionModule,
  VendorPermissionAction,
  VendorPermissionRole,
  VendorPermissionLevel,
  vendorPermissionGetModuleLabel,
  vendorPermissionGetActionLabel,
  vendorPermissionGetRoleLabel,
  vendorPermissionGetLevelLabel,
  vendorPermissionHasPermission,
  vendorPermissionGetRolePermissions,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Permission Extended Types
// ============================================================

/**
 * Vendor permission
 */
export interface VendorPermission extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  module: VendorPermissionModule;
  action: VendorPermissionAction;
  role: VendorPermissionRole;
  level: VendorPermissionLevel;
  isActive: boolean;
  isDefault: boolean;
  metadata?: Metadata;
}

/**
 * Vendor permission filter
 */
export interface VendorPermissionFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  modules?: VendorPermissionModule[];
  actions?: VendorPermissionAction[];
  roles?: VendorPermissionRole[];
  levels?: VendorPermissionLevel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isDefault?: boolean;
  searchTerm?: string;
}

/**
 * Vendor permission statistics
 */
export interface VendorPermissionStatistics {
  vendorId: ID;
  totalPermissions: number;
  activePermissions: number;
  defaultPermissions: number;
  byModule: Record<VendorPermissionModule, number>;
  byAction: Record<VendorPermissionAction, number>;
  byRole: Record<VendorPermissionRole, number>;
  byLevel: Record<VendorPermissionLevel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentModule: VendorPermissionModule;
  mostFrequentAction: VendorPermissionAction;
  mostFrequentRole: VendorPermissionRole;
  mostFrequentLevel: VendorPermissionLevel;
}

/**
 * Vendor permission summary
 */
export interface VendorPermissionSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPermissions: number;
  active: number;
  default: number;
  byModule: Record<VendorPermissionModule, number>;
  byAction: Record<VendorPermissionAction, number>;
  byRole: Record<VendorPermissionRole, number>;
  byLevel: Record<VendorPermissionLevel, number>;
  permissionTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topModules: {
    module: VendorPermissionModule;
    count: number;
    label: string;
  }[];
  topActions: {
    action: VendorPermissionAction;
    count: number;
    label: string;
  }[];
  topRoles: {
    role: VendorPermissionRole;
    count: number;
    label: string;
  }[];
  topLevels: {
    level: VendorPermissionLevel;
    count: number;
    label: string;
  }[];
}

/**
 * Vendor permission configuration
 */
export interface VendorPermissionConfiguration {
  enabled: boolean;
  defaultRole: VendorPermissionRole;
  defaultLevel: VendorPermissionLevel;
  allowCustomPermissions: boolean;
  allowRoleOverride: boolean;
  allowLevelOverride: boolean;
  maxPermissionsPerUser: number;
  autoAssignDefaults: boolean;
  requireApproval: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: VendorPermissionAlertConfig;
}

/**
 * Vendor permission alert configuration
 */
export interface VendorPermissionAlertConfig {
  enabled: boolean;
  permissionChangeAlert: boolean;
  roleChangeAlert: boolean;
  levelChangeAlert: boolean;
  suspiciousPermissionAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor permission history
 */
export interface VendorPermissionHistory extends BaseEntity, Timestamp {
  id: ID;
  permissionId: ID;
  vendorId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'delete'
    | 'restore'
    | 'role_change'
    | 'level_change'
    | 'activate'
    | 'deactivate';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor permission validation
 */
export interface VendorPermissionValidation {
  isValid: boolean;
  permissionId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor permission check
 */
export interface VendorPermissionCheck {
  userId: ID;
  vendorId: ID;
  module: VendorPermissionModule;
  action: VendorPermissionAction;
  hasPermission: boolean;
  role: VendorPermissionRole;
  level: VendorPermissionLevel;
  reason?: string;
}

/**
 * Vendor permission export
 */
export interface VendorPermissionExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorPermissionFilter;
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
  // Vendor Permission
  VENDOR_PERMISSION_MODULES,
  VENDOR_PERMISSION_ACTIONS,
  VENDOR_PERMISSION_ROLES,
  VENDOR_PERMISSION_LEVELS,
  VENDOR_PERMISSION_DEFAULTS,
  VendorPermissionModule,
  VendorPermissionAction,
  VendorPermissionRole,
  VendorPermissionLevel,
  vendorPermissionGetModuleLabel,
  vendorPermissionGetActionLabel,
  vendorPermissionGetRoleLabel,
  vendorPermissionGetLevelLabel,
  vendorPermissionHasPermission,
  vendorPermissionGetRolePermissions,
};
