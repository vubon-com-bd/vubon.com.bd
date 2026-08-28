/**
 * Support Script Types
 * Type definitions for support scripts based on shared-constants
 * @module SupportScriptTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support support-script
// ============================================================
import {
  // Support Script Core
  SUPPORT_SCRIPT,
  SupportScriptType,
  SupportScriptStatus,
  SupportScriptCategory,
  SupportScriptFormat,
  supportScriptGetTypeLabel,
  supportScriptGetStatusLabel,
  supportScriptGetCategoryLabel,
  supportScriptGetFormatLabel,
  supportScriptIsActive,
  // Support Script Category
  SUPPORT_SCRIPT_CATEGORY,
  SupportScriptCategoryType,
  SupportScriptCategoryScope,
  SupportScriptCategoryPriority,
  SupportScriptCategoryColor,
  SupportScriptCategoryIcon,
  supportScriptCategoryGetLabel,
  supportScriptCategoryGetScopeLabel,
  supportScriptCategoryGetPriorityLabel,
  supportScriptCategoryGetColor,
  supportScriptCategoryGetIcon,
} from '@vubon/shared-constants';

// ============================================================
// Support Script Extended Types
// ============================================================

/**
 * Support script
 */
export interface SupportScript extends BaseEntity, Timestamp {
  id: ID;
  type: SupportScriptType;
  status: SupportScriptStatus;
  category: SupportScriptCategory;
  format: SupportScriptFormat;
  name: string;
  description?: string;
  content: string;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Support script filter
 */
export interface SupportScriptFilter {
  ids?: ID[];
  types?: SupportScriptType[];
  statuses?: SupportScriptStatus[];
  categories?: SupportScriptCategory[];
  formats?: SupportScriptFormat[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  searchTerm?: string;
}

/**
 * Support script statistics
 */
export interface SupportScriptStatistics {
  totalScripts: number;
  activeScripts: number;
  byType: Record<SupportScriptType, number>;
  byStatus: Record<SupportScriptStatus, number>;
  byCategory: Record<SupportScriptCategory, number>;
  byFormat: Record<SupportScriptFormat, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: SupportScriptType;
  mostFrequentStatus: SupportScriptStatus;
  mostFrequentCategory: SupportScriptCategory;
  mostFrequentFormat: SupportScriptFormat;
}

/**
 * Support script summary
 */
export interface SupportScriptSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalScripts: number;
  active: number;
  byType: Record<SupportScriptType, number>;
  byStatus: Record<SupportScriptStatus, number>;
  byCategory: Record<SupportScriptCategory, number>;
  byFormat: Record<SupportScriptFormat, number>;
  scriptTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: SupportScriptType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: SupportScriptStatus;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: SupportScriptCategory;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: SupportScriptFormat;
    count: number;
    label: string;
  }[];
}

/**
 * Support script configuration
 */
export interface SupportScriptConfiguration {
  enabled: boolean;
  defaultType: SupportScriptType;
  defaultStatus: SupportScriptStatus;
  defaultCategory: SupportScriptCategory;
  defaultFormat: SupportScriptFormat;
  requireName: boolean;
  requireDescription: boolean;
  requireContent: boolean;
  maxScriptsPerUser: number;
  autoActivate: boolean;
  requireApproval: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnActivate: boolean;
  alertConfig?: SupportScriptAlertConfig;
}

/**
 * Support script alert configuration
 */
export interface SupportScriptAlertConfig {
  enabled: boolean;
  duplicateScriptAlert: boolean;
  inactiveScriptAlert: boolean;
  inactiveThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Support script history
 */
export interface SupportScriptHistory extends BaseEntity, Timestamp {
  id: ID;
  scriptId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Support script validation
 */
export interface SupportScriptValidation {
  isValid: boolean;
  scriptId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Support script export
 */
export interface SupportScriptExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx' | 'html' | 'markdown';
  filter: SupportScriptFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Support script usage
 */
export interface SupportScriptUsage extends BaseEntity, Timestamp {
  id: ID;
  scriptId: ID;
  ticketId: ID;
  userId: ID;
  usedAt: Date;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Support Script Core
  SUPPORT_SCRIPT,
  SupportScriptType,
  SupportScriptStatus,
  SupportScriptCategory,
  SupportScriptFormat,
  supportScriptGetTypeLabel,
  supportScriptGetStatusLabel,
  supportScriptGetCategoryLabel,
  supportScriptGetFormatLabel,
  supportScriptIsActive,
  // Support Script Category
  SUPPORT_SCRIPT_CATEGORY,
  SupportScriptCategoryType,
  SupportScriptCategoryScope,
  SupportScriptCategoryPriority,
  SupportScriptCategoryColor,
  SupportScriptCategoryIcon,
  supportScriptCategoryGetLabel,
  supportScriptCategoryGetScopeLabel,
  supportScriptCategoryGetPriorityLabel,
  supportScriptCategoryGetColor,
  supportScriptCategoryGetIcon,
};
