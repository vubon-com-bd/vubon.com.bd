/**
 * SEO Audit Types
 * Type definitions for SEO audit based on shared-constants
 * @module SEOAuditTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import common SEO types from common
// ============================================================
import type { SEOAuditType, SEOAuditSeverity } from '../common/seo.types';

// ============================================================
// Import from shared-constants seo audit
// ============================================================
import {
  // SEO Audit Main
  SEO_AUDIT,
  SEOAuditStatus,
  SEOAuditPriority,
  SEOAuditCategory,
  SEOAuditFrequency,
  SEOAuditScope,
  SEOAuditTool,
  SEOAuditFinding,
  SEOAuditScoreRange,
  SEOAuditMetric,
  getSEOAuditTypeLabel,
  getSEOAuditStatusLabel,
  getSEOAuditSeverityLabel,
  getSEOAuditPriorityLabel,
  getSEOAuditCategoryLabel,
  getSEOAuditFrequencyLabel,
  getSEOAuditScopeLabel,
  getSEOAuditToolLabel,
  getSEOAuditFindingLabel,
  getAuditScoreLabel,
  getAuditScoreColor,
  getAuditSeverityColorMain,
  getAuditPriorityColor,
  isAuditComplete,
  isAuditInProgress,
  // SEO Audit Type
  SEO_AUDIT_TYPE,
  SEOAuditTypeCategory,
  SEOAuditTypeMethodology,
  SEOAuditTypeApproach,
  SEOAuditTypeComplexity,
  SEOAuditTypeDeliverable,
  SEOAuditTypePhase,
  SEOAuditTypeDepth,
  SEOAuditTypeFocus,
  getSEOAuditCategoryTypeLabel,
  getSEOAuditMethodologyLabel,
  getSEOAuditApproachLabel,
  getSEOAuditComplexityLabel,
  getSEOAuditDeliverableLabel,
  getSEOAuditPhaseLabel,
  getSEOAuditDepthLabel,
  getSEOAuditFocusLabel,
  // SEO Audit Status
  SEO_AUDIT_STATUS,
  SEOAuditLifecycleStatus,
  SEOAuditExecutionStatus,
  SEOAuditQualityStatus,
  SEOAuditHealthStatus,
  SEOAuditValidationStatus,
  SEOAuditStatusCategory,
  getSEOAuditLifecycleLabel,
  getSEOAuditExecutionLabel,
  getSEOAuditQualityLabel,
  getSEOAuditHealthLabel,
  getSEOAuditValidationLabel,
  getSEOAuditStatusCategory,
  getSEOAuditStatusColor,
  isAuditRunning,
  isAuditCompleted,
  getExecutionProgressPercentage,
  // SEO Audit Severity
  SEO_AUDIT_SEVERITY,
  SEOAuditSeverityLevel,
  SEOAuditSeverityScore,
  SEOAuditSeverityColor,
  SEOAuditSeverityPriority,
  SEOAuditSeverityImpact,
  SEOAuditSeverityUrgency,
  SEOAuditSeverityCategory,
  getAuditSeverityLevelLabel,
  getAuditSeverityScore,
  getAuditSeverityColor,
  getAuditSeverityPriority,
  getAuditSeverityImpact,
  getAuditSeverityUrgency,
  getAuditSeverityCategory,
  getAuditSeverityWeight,
  isAuditSeverityActionable,
  getAuditSeverityRecommendation,
} from '@vubon/shared-constants';

// ============================================================
// SEO Audit Extended Types
// ============================================================

/**
 * SEO audit
 */
export interface SEOAudit extends BaseEntity, Timestamp {
  id: ID;
  url: string;
  type: SEOAuditType;
  status: SEOAuditStatus;
  severity: SEOAuditSeverity;
  priority: SEOAuditPriority;
  category: SEOAuditCategory;
  frequency: SEOAuditFrequency;
  scope: SEOAuditScope;
  tool: SEOAuditTool;
  findings: SEOAuditFinding[];
  score: number;
  scoreRange: SEOAuditScoreRange;
  metric: SEOAuditMetric;
  isComplete: boolean;
  isInProgress: boolean;
  scheduledAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  metadata?: Metadata;
}

/**
 * SEO audit filter
 */
export interface SEOAuditFilter {
  ids?: ID[];
  urls?: string[];
  types?: SEOAuditType[];
  statuses?: SEOAuditStatus[];
  severities?: SEOAuditSeverity[];
  priorities?: SEOAuditPriority[];
  categories?: SEOAuditCategory[];
  frequencies?: SEOAuditFrequency[];
  scopes?: SEOAuditScope[];
  tools?: SEOAuditTool[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isComplete?: boolean;
  isInProgress?: boolean;
  isActionable?: boolean;
  minScore?: number;
  maxScore?: number;
  searchTerm?: string;
}

/**
 * SEO audit statistics
 */
export interface SEOAuditStatistics {
  totalAudits: number;
  completeAudits: number;
  inProgressAudits: number;
  byType: Record<SEOAuditType, number>;
  byStatus: Record<SEOAuditStatus, number>;
  bySeverity: Record<SEOAuditSeverity, number>;
  byPriority: Record<SEOAuditPriority, number>;
  byCategory: Record<SEOAuditCategory, number>;
  byFrequency: Record<SEOAuditFrequency, number>;
  byScope: Record<SEOAuditScope, number>;
  byTool: Record<SEOAuditTool, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageScore: number;
  maxScore: number;
  minScore: number;
  totalFindings: number;
  averageFindings: number;
  mostFrequentType: SEOAuditType;
  mostFrequentSeverity: SEOAuditSeverity;
  mostFrequentCategory: SEOAuditCategory;
}

/**
 * SEO audit summary
 */
export interface SEOAuditSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalAudits: number;
  complete: number;
  inProgress: number;
  byType: Record<SEOAuditType, number>;
  byStatus: Record<SEOAuditStatus, number>;
  bySeverity: Record<SEOAuditSeverity, number>;
  byPriority: Record<SEOAuditPriority, number>;
  byCategory: Record<SEOAuditCategory, number>;
  byFrequency: Record<SEOAuditFrequency, number>;
  byScope: Record<SEOAuditScope, number>;
  byTool: Record<SEOAuditTool, number>;
  auditTrend: {
    date: Date;
    total: number;
    complete: number;
    inProgress: number;
  }[];
  topTypes: {
    type: SEOAuditType;
    count: number;
    label: string;
  }[];
  topSeverities: {
    severity: SEOAuditSeverity;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: SEOAuditCategory;
    count: number;
    label: string;
  }[];
  scoreSummary: {
    average: number;
    max: number;
    min: number;
  };
  findingSummary: {
    total: number;
    average: number;
    max: number;
    min: number;
  };
}

/**
 * SEO audit configuration
 */
export interface SEOAuditConfiguration {
  enabled: boolean;
  defaultType: SEOAuditType;
  defaultSeverity: SEOAuditSeverity;
  defaultPriority: SEOAuditPriority;
  defaultCategory: SEOAuditCategory;
  defaultFrequency: SEOAuditFrequency;
  defaultScope: SEOAuditScope;
  defaultTool: SEOAuditTool;
  minScore: number;
  maxScore: number;
  autoSchedule: boolean;
  autoRun: boolean;
  autoFix: boolean;
  requireApproval: boolean;
  requireSeverityCheck: boolean;
  requirePriorityCheck: boolean;
  maxFindingsPerAudit: number;
  notificationOnCreate: boolean;
  notificationOnStart: boolean;
  notificationOnComplete: boolean;
  notificationOnFinding: boolean;
  alertConfig?: SEOAuditAlertConfig;
}

/**
 * SEO audit alert configuration
 */
export interface SEOAuditAlertConfig {
  enabled: boolean;
  criticalFindingAlert: boolean;
  highSeverityAlert: boolean;
  scoreDropAlert: boolean;
  auditFailureAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  scoreThreshold: number;
  severityThreshold: number;
}

/**
 * SEO audit history
 */
export interface SEOAuditHistory extends BaseEntity, Timestamp {
  id: ID;
  auditId: ID;
  action:
    | 'create'
    | 'update'
    | 'start'
    | 'complete'
    | 'fail'
    | 'schedule'
    | 'activate'
    | 'deactivate'
    | 'delete'
    | 'restore'
    | 'finding_add'
    | 'finding_update'
    | 'finding_resolve';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * SEO audit validation
 */
export interface SEOAuditValidation {
  isValid: boolean;
  auditId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * SEO audit finding
 */
export interface SEOAuditFindingDetail extends BaseEntity, Timestamp {
  id: ID;
  auditId: ID;
  type: SEOAuditFinding;
  severity: SEOAuditSeverity;
  priority: SEOAuditPriority;
  description: string;
  recommendation: string;
  location: string;
  isResolved: boolean;
  resolvedAt?: Date;
  metadata?: Metadata;
}

/**
 * SEO audit export
 */
export interface SEOAuditExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx' | 'html';
  filter: SEOAuditFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything (SEOAuditType ও SEOAuditSeverity বাদে)
// ============================================================

export {
  // SEO Audit Main (SEOAuditType ও SEOAuditSeverity বাদে)
  SEO_AUDIT,
  SEOAuditStatus,
  SEOAuditPriority,
  SEOAuditCategory,
  SEOAuditFrequency,
  SEOAuditScope,
  SEOAuditTool,
  SEOAuditFinding,
  SEOAuditScoreRange,
  SEOAuditMetric,
  getSEOAuditTypeLabel,
  getSEOAuditStatusLabel,
  getSEOAuditSeverityLabel,
  getSEOAuditPriorityLabel,
  getSEOAuditCategoryLabel,
  getSEOAuditFrequencyLabel,
  getSEOAuditScopeLabel,
  getSEOAuditToolLabel,
  getSEOAuditFindingLabel,
  getAuditScoreLabel,
  getAuditScoreColor,
  getAuditSeverityColorMain,
  getAuditPriorityColor,
  isAuditComplete,
  isAuditInProgress,
  // SEO Audit Type (SEOAuditType বাদে)
  SEO_AUDIT_TYPE,
  SEOAuditTypeCategory,
  SEOAuditTypeMethodology,
  SEOAuditTypeApproach,
  SEOAuditTypeComplexity,
  SEOAuditTypeDeliverable,
  SEOAuditTypePhase,
  SEOAuditTypeDepth,
  SEOAuditTypeFocus,
  getSEOAuditCategoryTypeLabel,
  getSEOAuditMethodologyLabel,
  getSEOAuditApproachLabel,
  getSEOAuditComplexityLabel,
  getSEOAuditDeliverableLabel,
  getSEOAuditPhaseLabel,
  getSEOAuditDepthLabel,
  getSEOAuditFocusLabel,
  // SEO Audit Status
  SEO_AUDIT_STATUS,
  SEOAuditLifecycleStatus,
  SEOAuditExecutionStatus,
  SEOAuditQualityStatus,
  SEOAuditHealthStatus,
  SEOAuditValidationStatus,
  SEOAuditStatusCategory,
  getSEOAuditLifecycleLabel,
  getSEOAuditExecutionLabel,
  getSEOAuditQualityLabel,
  getSEOAuditHealthLabel,
  getSEOAuditValidationLabel,
  getSEOAuditStatusCategory,
  getSEOAuditStatusColor,
  isAuditRunning,
  isAuditCompleted,
  getExecutionProgressPercentage,
  // SEO Audit Severity (SEOAuditSeverity বাদে)
  SEO_AUDIT_SEVERITY,
  SEOAuditSeverityLevel,
  SEOAuditSeverityScore,
  SEOAuditSeverityColor,
  SEOAuditSeverityPriority,
  SEOAuditSeverityImpact,
  SEOAuditSeverityUrgency,
  SEOAuditSeverityCategory,
  getAuditSeverityLevelLabel,
  getAuditSeverityScore,
  getAuditSeverityColor,
  getAuditSeverityPriority,
  getAuditSeverityImpact,
  getAuditSeverityUrgency,
  getAuditSeverityCategory,
  getAuditSeverityWeight,
  isAuditSeverityActionable,
  getAuditSeverityRecommendation,
};
