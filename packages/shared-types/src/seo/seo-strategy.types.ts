/**
 * SEO Strategy Types
 * Type definitions for SEO strategy based on shared-constants
 * @module SEOStrategyTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import common SEO types from common
// ============================================================
import type { SEOStrategyType } from '../common/seo.types';

// ============================================================
// Import from shared-constants seo strategy
// ============================================================
import {
  // SEO Strategy
  SEO_STRATEGY,
  SEOStrategyStatus,
  SEOStrategyPriority,
  SEOStrategyGoal,
  SEOStrategyKPI,
  SEOStrategyTimeline,
  SEOStrategyBudgetRange,
  SEOStrategyResource,
  SEOStrategyFrequency,
  SEOStrategyMetric,
  SEOStrategyRisk,
  SEOStrategyPhase,
  getSeostrategyTypeLabel,
  getSeostrategyStatusLabel,
  getSeostrategyPriorityLabel,
  getSeostrategyGoalLabel,
  getSeostrategyKPILabel,
  getSeostrategyTimelineLabel,
  getSeostrategyBudgetLabel,
  getSeostrategyResourceLabel,
  getSeostrategyPhaseLabel,
  getSeostrategyRiskLabel,
  isSeostrategyActive,
  isSeostrategyComplete,
  getSeostrategyStatusColor,
  // SEO Strategy Type
  SEO_STRATEGY_TYPE,
  SEOStrategyTypeCategory,
  SEOStrategyTypeSubType,
  SEOStrategyTypeApproach,
  SEOStrategyTypeFocus,
  SEOStrategyTypeComplexity,
  SEOStrategyTypeMaturity,
  getSeostrategyCategoryLabel,
  getSeostrategySubTypeLabel,
  getSeostrategyApproachLabel,
  getSeostrategyFocusLabel,
  getSeostrategyComplexityLabel,
  getSeostrategyMaturityLabel,
  isSeostrategyWhiteHat,
  isSeostrategyBlackHat,
  getSeostrategyApproachRiskLevel,
  // SEO Strategy Status
  SEO_STRATEGY_STATUS,
  SEOStrategyLifecycleStatus,
  SEOStrategyExecutionStatus,
  SEOStrategyHealthStatus,
  SEOStrategyProgressStatus,
  SEOStrategyQualityStatus,
  SEOStrategyRiskStatus,
  SEOStrategyStatusCategory,
  getSeostrategyLifecycleLabel,
  getSeostrategyExecutionLabel,
  getSeostrategyHealthLabel,
  getSeostrategyProgressLabel,
  getSeostrategyQualityLabel,
  getSeostrategyStatusRiskLabel,
  getSeostrategyStatusCategory,
  getSeostrategyStatusColorCode,
  isSeostrategyStatusActive,
  isSeostrategyStatusComplete,
  getSeostrategyProgressPercentage,
} from '@vubon/shared-constants';

// ============================================================
// SEO Strategy Extended Types
// ============================================================

/**
 * SEO strategy
 */
export interface SEOStrategy extends BaseEntity, Timestamp {
  id: ID;
  name: string;
  type: SEOStrategyType;
  status: SEOStrategyStatus;
  priority: SEOStrategyPriority;
  goal: SEOStrategyGoal;
  kpi: SEOStrategyKPI[];
  timeline: SEOStrategyTimeline;
  budgetRange: SEOStrategyBudgetRange;
  resources: SEOStrategyResource[];
  frequency: SEOStrategyFrequency;
  metrics: SEOStrategyMetric[];
  risks: SEOStrategyRisk[];
  phase: SEOStrategyPhase;
  isActive: boolean;
  isComplete: boolean;
  startedAt?: Date;
  completedAt?: Date;
  metadata?: Metadata;
}

/**
 * SEO strategy filter
 */
export interface SEOStrategyFilter {
  ids?: ID[];
  types?: SEOStrategyType[];
  statuses?: SEOStrategyStatus[];
  priorities?: SEOStrategyPriority[];
  goals?: SEOStrategyGoal[];
  phases?: SEOStrategyPhase[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isComplete?: boolean;
  isWhiteHat?: boolean;
  isBlackHat?: boolean;
  searchTerm?: string;
}

/**
 * SEO strategy statistics
 */
export interface SEOStrategyStatistics {
  totalStrategies: number;
  activeStrategies: number;
  completedStrategies: number;
  byType: Record<SEOStrategyType, number>;
  byStatus: Record<SEOStrategyStatus, number>;
  byPriority: Record<SEOStrategyPriority, number>;
  byGoal: Record<SEOStrategyGoal, number>;
  byPhase: Record<SEOStrategyPhase, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  whiteHatCount: number;
  blackHatCount: number;
  averageProgress: number;
  mostFrequentType: SEOStrategyType;
  mostFrequentStatus: SEOStrategyStatus;
  mostFrequentPriority: SEOStrategyPriority;
}

/**
 * SEO strategy summary
 */
export interface SEOStrategySummary {
  period: {
    start: Date;
    end: Date;
  };
  totalStrategies: number;
  active: number;
  completed: number;
  byType: Record<SEOStrategyType, number>;
  byStatus: Record<SEOStrategyStatus, number>;
  byPriority: Record<SEOStrategyPriority, number>;
  byGoal: Record<SEOStrategyGoal, number>;
  byPhase: Record<SEOStrategyPhase, number>;
  strategyTrend: {
    date: Date;
    total: number;
    active: number;
    completed: number;
  }[];
  topTypes: {
    type: SEOStrategyType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: SEOStrategyStatus;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: SEOStrategyPriority;
    count: number;
    label: string;
  }[];
  topGoals: {
    goal: SEOStrategyGoal;
    count: number;
    label: string;
  }[];
  topPhases: {
    phase: SEOStrategyPhase;
    count: number;
    label: string;
  }[];
}

/**
 * SEO strategy configuration
 */
export interface SEOStrategyConfiguration {
  enabled: boolean;
  defaultType: SEOStrategyType;
  defaultPriority: SEOStrategyPriority;
  defaultGoal: SEOStrategyGoal;
  defaultPhase: SEOStrategyPhase;
  allowMultipleStrategies: boolean;
  requireApproval: boolean;
  requireKPI: boolean;
  requireTimeline: boolean;
  requireBudget: boolean;
  requireResources: boolean;
  maxStrategiesPerProject: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnComplete: boolean;
  notificationOnRisk: boolean;
  alertConfig?: SEOStrategyAlertConfig;
}

/**
 * SEO strategy alert configuration
 */
export interface SEOStrategyAlertConfig {
  enabled: boolean;
  riskAlert: boolean;
  delayAlert: boolean;
  deviationAlert: boolean;
  budgetAlert: boolean;
  resourceAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  riskThreshold: number;
  delayThreshold: number;
  budgetThreshold: number;
}

/**
 * SEO strategy history
 */
export interface SEOStrategyHistory extends BaseEntity, Timestamp {
  id: ID;
  strategyId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'deactivate'
    | 'complete'
    | 'delete'
    | 'restore'
    | 'risk_update'
    | 'progress_update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * SEO strategy validation
 */
export interface SEOStrategyValidation {
  isValid: boolean;
  strategyId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * SEO strategy progress
 */
export interface SEOStrategyProgress extends BaseEntity, Timestamp {
  id: ID;
  strategyId: ID;
  phase: SEOStrategyPhase;
  progress: number;
  status: SEOStrategyStatus;
  milestones: SEOStrategyMilestone[];
  updatedAt: Date;
  metadata?: Metadata;
}

/**
 * SEO strategy milestone
 */
export interface SEOStrategyMilestone {
  id: string;
  name: string;
  description?: string;
  targetDate: Date;
  completedDate?: Date;
  isCompleted: boolean;
  progress: number;
  metadata?: Metadata;
}

/**
 * SEO strategy export
 */
export interface SEOStrategyExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: SEOStrategyFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything (শুধুমাত্র কনস্ট্যান্ট ও ফাংশন)
// ============================================================

export {
  // SEO Strategy Constants
  SEO_STRATEGY,
  SEOStrategyStatus,
  SEOStrategyPriority,
  SEOStrategyGoal,
  SEOStrategyKPI,
  SEOStrategyTimeline,
  SEOStrategyBudgetRange,
  SEOStrategyResource,
  SEOStrategyFrequency,
  SEOStrategyMetric,
  SEOStrategyRisk,
  SEOStrategyPhase,
  // SEO Strategy Type
  SEO_STRATEGY_TYPE,
  SEOStrategyTypeCategory,
  SEOStrategyTypeSubType,
  SEOStrategyTypeApproach,
  SEOStrategyTypeFocus,
  SEOStrategyTypeComplexity,
  SEOStrategyTypeMaturity,
  // SEO Strategy Status
  SEO_STRATEGY_STATUS,
  SEOStrategyLifecycleStatus,
  SEOStrategyExecutionStatus,
  SEOStrategyHealthStatus,
  SEOStrategyProgressStatus,
  SEOStrategyQualityStatus,
  SEOStrategyRiskStatus,
  SEOStrategyStatusCategory,
  // Functions
  getSeostrategyTypeLabel,
  getSeostrategyStatusLabel,
  getSeostrategyPriorityLabel,
  getSeostrategyGoalLabel,
  getSeostrategyKPILabel,
  getSeostrategyTimelineLabel,
  getSeostrategyBudgetLabel,
  getSeostrategyResourceLabel,
  getSeostrategyPhaseLabel,
  getSeostrategyRiskLabel,
  isSeostrategyActive,
  isSeostrategyComplete,
  getSeostrategyStatusColor,
  getSeostrategyCategoryLabel,
  getSeostrategySubTypeLabel,
  getSeostrategyApproachLabel,
  getSeostrategyFocusLabel,
  getSeostrategyComplexityLabel,
  getSeostrategyMaturityLabel,
  isSeostrategyWhiteHat,
  isSeostrategyBlackHat,
  getSeostrategyApproachRiskLevel,
  getSeostrategyLifecycleLabel,
  getSeostrategyExecutionLabel,
  getSeostrategyHealthLabel,
  getSeostrategyProgressLabel,
  getSeostrategyQualityLabel,
  getSeostrategyStatusRiskLabel,
  getSeostrategyStatusCategory,
  getSeostrategyStatusColorCode,
  isSeostrategyStatusActive,
  isSeostrategyStatusComplete,
  getSeostrategyProgressPercentage,
};
