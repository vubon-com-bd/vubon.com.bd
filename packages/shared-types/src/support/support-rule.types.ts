/**
 * Support Rule Types
 * Type definitions for support rules based on shared-constants
 * @module SupportRuleTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support support-rule
// ============================================================
import {
  // Support Rule Core
  SUPPORT_RULE,
  SupportRuleType,
  SupportRuleStatus,
  SupportRulePriority,
  SupportRuleCondition,
  SupportRuleLogic,
  SupportRuleAction,
  SupportRuleEvaluation,
  supportRuleGetTypeLabel,
  supportRuleGetStatusLabel,
  supportRuleGetPriorityLabel,
  supportRuleGetConditionLabel,
  supportRuleIsActive,
  supportRuleIsDraft,
  supportRuleGetActionLabel,
  // Support Rule Type
  SUPPORT_RULE_TYPE,
  SupportRuleCategory,
  SupportRuleScope,
  SupportRuleTrigger,
  SupportRuleComplexity,
  SupportRulePerformance,
  supportRuleTypeGetCategoryLabel,
  supportRuleTypeGetScopeLabel,
  supportRuleTypeGetTriggerLabel,
  supportRuleTypeGetComplexityLabel,
} from '@vubon/shared-constants';

// ============================================================
// Support Rule Extended Types
// ============================================================

/**
 * Support rule
 */
export interface SupportRule extends BaseEntity, Timestamp {
  id: ID;
  type: SupportRuleType;
  status: SupportRuleStatus;
  priority: SupportRulePriority;
  category: SupportRuleCategory;
  scope: SupportRuleScope;
  trigger: SupportRuleTrigger;
  complexity: SupportRuleComplexity;
  name: string;
  description?: string;
  conditions: SupportRuleCondition[];
  logic: SupportRuleLogic;
  action: SupportRuleAction;
  evaluation: SupportRuleEvaluation;
  isActive: boolean;
  isDraft: boolean;
  metadata?: Metadata;
}

/**
 * Support rule filter
 */
export interface SupportRuleFilter {
  ids?: ID[];
  types?: SupportRuleType[];
  statuses?: SupportRuleStatus[];
  priorities?: SupportRulePriority[];
  categories?: SupportRuleCategory[];
  scopes?: SupportRuleScope[];
  triggers?: SupportRuleTrigger[];
  complexities?: SupportRuleComplexity[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isDraft?: boolean;
  searchTerm?: string;
}

/**
 * Support rule statistics
 */
export interface SupportRuleStatistics {
  totalRules: number;
  activeRules: number;
  draftRules: number;
  byType: Record<SupportRuleType, number>;
  byStatus: Record<SupportRuleStatus, number>;
  byPriority: Record<SupportRulePriority, number>;
  byCategory: Record<SupportRuleCategory, number>;
  byScope: Record<SupportRuleScope, number>;
  byTrigger: Record<SupportRuleTrigger, number>;
  byComplexity: Record<SupportRuleComplexity, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageConditions: number;
  maxConditions: number;
  minConditions: number;
  mostFrequentType: SupportRuleType;
  mostFrequentStatus: SupportRuleStatus;
  mostFrequentPriority: SupportRulePriority;
  mostFrequentCategory: SupportRuleCategory;
  mostFrequentTrigger: SupportRuleTrigger;
}

/**
 * Support rule summary
 */
export interface SupportRuleSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalRules: number;
  active: number;
  draft: number;
  byType: Record<SupportRuleType, number>;
  byStatus: Record<SupportRuleStatus, number>;
  byPriority: Record<SupportRulePriority, number>;
  byCategory: Record<SupportRuleCategory, number>;
  byScope: Record<SupportRuleScope, number>;
  byTrigger: Record<SupportRuleTrigger, number>;
  byComplexity: Record<SupportRuleComplexity, number>;
  ruleTrend: {
    date: Date;
    total: number;
    active: number;
    draft: number;
  }[];
  topTypes: {
    type: SupportRuleType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: SupportRuleStatus;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: SupportRulePriority;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: SupportRuleCategory;
    count: number;
    label: string;
  }[];
  topTriggers: {
    trigger: SupportRuleTrigger;
    count: number;
    label: string;
  }[];
}

/**
 * Support rule configuration
 */
export interface SupportRuleConfiguration {
  enabled: boolean;
  defaultType: SupportRuleType;
  defaultStatus: SupportRuleStatus;
  defaultPriority: SupportRulePriority;
  defaultCategory: SupportRuleCategory;
  defaultScope: SupportRuleScope;
  defaultTrigger: SupportRuleTrigger;
  defaultComplexity: SupportRuleComplexity;
  defaultLogic: SupportRuleLogic;
  defaultEvaluation: SupportRuleEvaluation;
  requireName: boolean;
  requireDescription: boolean;
  requireConditions: boolean;
  requireAction: boolean;
  maxConditions: number;
  autoActivate: boolean;
  requireApproval: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnActivate: boolean;
  notificationOnDeactivate: boolean;
  alertConfig?: SupportRuleAlertConfig;
}

/**
 * Support rule alert configuration
 */
export interface SupportRuleAlertConfig {
  enabled: boolean;
  ruleConflictAlert: boolean;
  duplicateRuleAlert: boolean;
  inactiveRuleAlert: boolean;
  inactiveThreshold: number;
  highComplexityAlert: boolean;
  highComplexityThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Support rule history
 */
export interface SupportRuleHistory extends BaseEntity, Timestamp {
  id: ID;
  ruleId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'delete' | 'restore' | 'execute';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Support rule validation
 */
export interface SupportRuleValidation {
  isValid: boolean;
  ruleId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Support rule export
 */
export interface SupportRuleExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: SupportRuleFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Support rule execution
 */
export interface SupportRuleExecution extends BaseEntity, Timestamp {
  id: ID;
  ruleId: ID;
  ticketId: ID;
  userId: ID;
  triggeredAt: Date;
  conditionsMet: boolean;
  actionTaken: string;
  result: 'success' | 'failure' | 'partial';
  errorMessage?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Support Rule Core
  SUPPORT_RULE,
  SupportRuleType,
  SupportRuleStatus,
  SupportRulePriority,
  SupportRuleCondition,
  SupportRuleLogic,
  SupportRuleAction,
  SupportRuleEvaluation,
  supportRuleGetTypeLabel,
  supportRuleGetStatusLabel,
  supportRuleGetPriorityLabel,
  supportRuleGetConditionLabel,
  supportRuleIsActive,
  supportRuleIsDraft,
  supportRuleGetActionLabel,
  // Support Rule Type
  SUPPORT_RULE_TYPE,
  SupportRuleCategory,
  SupportRuleScope,
  SupportRuleTrigger,
  SupportRuleComplexity,
  SupportRulePerformance,
  supportRuleTypeGetCategoryLabel,
  supportRuleTypeGetScopeLabel,
  supportRuleTypeGetTriggerLabel,
  supportRuleTypeGetComplexityLabel,
};
