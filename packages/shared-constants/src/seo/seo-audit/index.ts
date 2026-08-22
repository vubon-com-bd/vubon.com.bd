/**
 * SEO Audit Constants Index
 * Export all SEO audit constants and types for easy importing
 */

// SEO Audit Main Constants
export {
  SEO_AUDIT,
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
  getSeverityColor as getAuditSeverityColorMain,
  getPriorityColor as getAuditPriorityColor,
  isAuditComplete,
  isAuditInProgress,
} from './seo-audit.constants';

export type {
  SEOAuditType,
  SEOAuditStatus,
  SEOAuditSeverity,
  SEOAuditPriority,
  SEOAuditCategory,
  SEOAuditFrequency,
  SEOAuditScope,
  SEOAuditTool,
  SEOAuditFinding,
  SEOAuditScoreRange,
  SEOAuditMetric,
} from './seo-audit.constants';

// SEO Audit Type Constants
export {
  SEO_AUDIT_TYPE,
  getSEOAuditCategoryTypeLabel,
  getSEOAuditMethodologyLabel,
  getSEOAuditApproachLabel,
  getSEOAuditComplexityLabel,
  getSEOAuditDeliverableLabel,
  getSEOAuditPhaseLabel,
  getSEOAuditDepthLabel,
  getSEOAuditFocusLabel,
} from './seo-audit-type.constants';

export type {
  SEOAuditTypeCategory,
  SEOAuditTypeMethodology,
  SEOAuditTypeApproach,
  SEOAuditTypeComplexity,
  SEOAuditTypeDeliverable,
  SEOAuditTypePhase,
  SEOAuditTypeDepth,
  SEOAuditTypeFocus,
} from './seo-audit-type.constants';

// SEO Audit Status Constants
export {
  SEO_AUDIT_STATUS,
  getSEOAuditLifecycleLabel,
  getSEOAuditExecutionLabel,
  getSEOAuditQualityLabel,
  getSEOAuditHealthLabel,
  getSEOAuditValidationLabel,
  getSEOAuditStatusCategory,
  getSEOAuditStatusColor,
  isAuditRunning,
  isAuditComplete as isAuditCompleted,
  getExecutionProgressPercentage,
} from './seo-audit-status.constants';

export type {
  SEOAuditLifecycleStatus,
  SEOAuditExecutionStatus,
  SEOAuditQualityStatus,
  SEOAuditHealthStatus,
  SEOAuditValidationStatus,
  SEOAuditStatusCategory,
} from './seo-audit-status.constants';

// SEO Audit Severity Constants
export {
  SEO_AUDIT_SEVERITY,
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
} from './seo-audit-severity.constants';

export type {
  SEOAuditSeverityLevel,
  SEOAuditSeverityScore,
  SEOAuditSeverityColor,
  SEOAuditSeverityPriority,
  SEOAuditSeverityImpact,
  SEOAuditSeverityUrgency,
  SEOAuditSeverityCategory,
} from './seo-audit-severity.constants';
