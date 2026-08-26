/**
 * SEO Robots Types
 * Type definitions for SEO robots based on shared-constants
 * @module SEORobotsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import common SEO types from common
// ============================================================
import type { SEORobotsDirective } from '../common/seo.types';

// ============================================================
// Import from shared-constants seo robots
// ============================================================
import {
  // SEO Robots Main
  SEO_ROBOTS,
  SEORobotsType,
  SEORobotsStatus,
  SEORobotsUserAgent,
  SEORobotsParameter,
  SEORobotsErrorType,
  SEORobotsMetric,
  getSEORobotsTypeLabel,
  getSEORobotsStatusLabel,
  getSEORobotsDirectiveLabel,
  getSEORobotsUserAgentLabel,
  getSEORobotsErrorLabel,
  getRobotsStatusColor,
  isRobotsValid,
  isRobotsActive,
  getCombinedDirectives,
  formatRobotsDirective,
  // SEO Robots Type
  SEO_ROBOTS_TYPE,
  SEORobotsTypeCategory,
  SEORobotsTypeMetaSubType,
  SEORobotsTypeXRobotsSubType,
  SEORobotsTypeLinkSubType,
  SEORobotsTypeScope,
  SEORobotsTypePriority,
  SEORobotsTypeImplementation,
  getSEORobotsCategoryLabel,
  getSEORobotsMetaSubTypeLabel,
  getSEORobotsXRobotsSubTypeLabel,
  getSEORobotsLinkSubTypeLabel,
  getSEORobotsScopeLabel,
  getSEORobotsPriorityLabel,
  getSEORobotsImplementationLabel,
  // SEO Robots Status
  SEO_ROBOTS_STATUS,
  SEORobotsLifecycleStatus,
  SEORobotsHealthStatus,
  SEORobotsComplianceStatus,
  SEORobotsPerformanceStatus,
  SEORobotsValidationStatus,
  SEORobotsStatusCategory,
  getSEORobotsLifecycleLabel,
  getSEORobotsHealthLabel,
  getSEORobotsComplianceLabel,
  getSEORobotsPerformanceLabel,
  getSEORobotsValidationLabel,
  getSEORobotsStatusCategory,
  getSEORobotsStatusColor,
  isRobotsLifecycleValid,
  isRobotsProcessing,
} from '@vubon/shared-constants';

// ============================================================
// SEO Robots Extended Types
// ============================================================

/**
 * SEO robots
 */
export interface SEORobots extends BaseEntity, Timestamp {
  id: ID;
  url: string;
  type: SEORobotsType;
  status: SEORobotsStatus;
  directives: SEORobotsDirective[];
  userAgent: SEORobotsUserAgent;
  parameters: SEORobotsParameter[];
  isActive: boolean;
  isValid: boolean;
  isProcessing: boolean;
  checkedAt: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * SEO robots filter
 */
export interface SEORobotsFilter {
  ids?: ID[];
  urls?: string[];
  types?: SEORobotsType[];
  statuses?: SEORobotsStatus[];
  userAgents?: SEORobotsUserAgent[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isValid?: boolean;
  isProcessing?: boolean;
  searchTerm?: string;
}

/**
 * SEO robots statistics
 */
export interface SEORobotsStatistics {
  totalRobots: number;
  activeRobots: number;
  validRobots: number;
  processingRobots: number;
  byType: Record<SEORobotsType, number>;
  byStatus: Record<SEORobotsStatus, number>;
  byUserAgent: Record<SEORobotsUserAgent, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: SEORobotsType;
  mostFrequentStatus: SEORobotsStatus;
  mostFrequentUserAgent: SEORobotsUserAgent;
}

/**
 * SEO robots summary
 */
export interface SEORobotsSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalRobots: number;
  active: number;
  valid: number;
  processing: number;
  byType: Record<SEORobotsType, number>;
  byStatus: Record<SEORobotsStatus, number>;
  byUserAgent: Record<SEORobotsUserAgent, number>;
  robotsTrend: {
    date: Date;
    total: number;
    active: number;
    valid: number;
  }[];
  topTypes: {
    type: SEORobotsType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: SEORobotsStatus;
    count: number;
    label: string;
  }[];
  topUserAgents: {
    userAgent: SEORobotsUserAgent;
    count: number;
    label: string;
  }[];
}

/**
 * SEO robots configuration
 */
export interface SEORobotsConfiguration {
  enabled: boolean;
  defaultType: SEORobotsType;
  defaultStatus: SEORobotsStatus;
  defaultUserAgent: SEORobotsUserAgent;
  defaultDirectives: SEORobotsDirective[];
  autoGenerate: boolean;
  autoValidate: boolean;
  requireValidation: boolean;
  requireDirectives: boolean;
  maxRobotsPerSite: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnValidation: boolean;
  notificationOnError: boolean;
  alertConfig?: SEORobotsAlertConfig;
}

/**
 * SEO robots alert configuration
 */
export interface SEORobotsAlertConfig {
  enabled: boolean;
  validationFailureAlert: boolean;
  directiveConflictAlert: boolean;
  generationErrorAlert: boolean;
  securityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * SEO robots history
 */
export interface SEORobotsHistory extends BaseEntity, Timestamp {
  id: ID;
  robotsId: ID;
  action:
    | 'create'
    | 'update'
    | 'generate'
    | 'validate'
    | 'invalidate'
    | 'activate'
    | 'deactivate'
    | 'delete'
    | 'restore'
    | 'directive_add'
    | 'directive_remove'
    | 'directive_update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * SEO robots validation (নাম পরিবর্তন করা হয়েছে)
 */
export interface SEORobotsValidationType {
  isValid: boolean;
  robotsId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * SEO robots directive detail
 */
export interface SEORobotsDirectiveDetail extends BaseEntity, Timestamp {
  id: ID;
  robotsId: ID;
  directive: SEORobotsDirective;
  value?: string;
  isActive: boolean;
  order: number;
  metadata?: Metadata;
}

/**
 * SEO robots export
 */
export interface SEORobotsExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx' | 'txt';
  filter: SEORobotsFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything (SEORobotsDirective ও SEORobotsValidation বাদে)
// ============================================================

export {
  // SEO Robots Main (SEORobotsDirective বাদে)
  SEO_ROBOTS,
  SEORobotsType,
  SEORobotsStatus,
  SEORobotsUserAgent,
  SEORobotsParameter,
  SEORobotsErrorType,
  SEORobotsMetric,
  getSEORobotsTypeLabel,
  getSEORobotsStatusLabel,
  getSEORobotsDirectiveLabel,
  getSEORobotsUserAgentLabel,
  getSEORobotsErrorLabel,
  getRobotsStatusColor,
  isRobotsValid,
  isRobotsActive,
  getCombinedDirectives,
  formatRobotsDirective,
  // SEO Robots Type
  SEO_ROBOTS_TYPE,
  SEORobotsTypeCategory,
  SEORobotsTypeMetaSubType,
  SEORobotsTypeXRobotsSubType,
  SEORobotsTypeLinkSubType,
  SEORobotsTypeScope,
  SEORobotsTypePriority,
  SEORobotsTypeImplementation,
  getSEORobotsCategoryLabel,
  getSEORobotsMetaSubTypeLabel,
  getSEORobotsXRobotsSubTypeLabel,
  getSEORobotsLinkSubTypeLabel,
  getSEORobotsScopeLabel,
  getSEORobotsPriorityLabel,
  getSEORobotsImplementationLabel,
  // SEO Robots Status
  SEO_ROBOTS_STATUS,
  SEORobotsLifecycleStatus,
  SEORobotsHealthStatus,
  SEORobotsComplianceStatus,
  SEORobotsPerformanceStatus,
  SEORobotsValidationStatus,
  SEORobotsStatusCategory,
  getSEORobotsLifecycleLabel,
  getSEORobotsHealthLabel,
  getSEORobotsComplianceLabel,
  getSEORobotsPerformanceLabel,
  getSEORobotsValidationLabel,
  getSEORobotsStatusCategory,
  getSEORobotsStatusColor,
  isRobotsLifecycleValid,
  isRobotsProcessing,
};
