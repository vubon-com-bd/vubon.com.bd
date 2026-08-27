/**
 * Deal Rule Types
 * Type definitions for deal rules based on shared-constants
 * @module DealRuleTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants flash-sales rule
// ============================================================
import {
  // Rule Core
  FLASH_SALE_RULE,
  FlashSaleRuleType,
  FlashSaleRuleCategory,
  FlashSaleRulePriority,
  FlashSaleRuleOperator,
  FlashSaleRuleCondition,
  FlashSaleRuleAction,
  FlashSaleRuleEffect,
  flashsalesRuleGetTypeLabel,
  flashsalesRuleGetCategoryLabel,
  flashsalesRuleGetPriorityLabel,
  flashsalesRuleGetOperatorLabel,
  flashsalesRuleGetConditionLabel,
  flashsalesRuleGetActionLabel,
  flashsalesRuleGetEffectLabel,
  flashsalesRuleIsValidType,
  flashsalesRuleIsValidPriority,
  flashsalesRuleIsValidOperator,
  flashsalesRuleIsValidAction,
  flashsalesRuleIsHighPriority,
  flashsalesRuleIsLowPriority,
  flashsalesRuleGetDefaultPriority,
  flashsalesRuleGetDefaultOperator,
  flashsalesRuleGetDefaultCondition,
  flashsalesRuleGetMaxRules,
  flashsalesRuleGetMaxConditions,
  flashsalesRuleGetMaxActions,
  flashsalesRuleGetMaxNesting,
  // Rule Type
  FLASH_SALE_RULE_TYPE,
  FlashSaleRuleTypeCategory,
  FlashSaleRuleTypeComplexity,
  FlashSaleRuleTypeScope,
  FlashSaleRuleTypeFrequency,
  FlashSaleRuleTypeTrigger,
  FlashSaleRuleTypeExecution,
  FlashSaleRuleTypeValidation,
  flashsalesRuleTypeGetCategoryLabel,
  flashsalesRuleTypeGetComplexityLabel,
  flashsalesRuleTypeGetScopeLabel,
  flashsalesRuleTypeGetFrequencyLabel,
  flashsalesRuleTypeGetTriggerLabel,
  flashsalesRuleTypeGetExecutionLabel,
  flashsalesRuleTypeGetValidationLabel,
  flashsalesRuleTypeIsValidCategory,
  flashsalesRuleTypeIsValidScope,
  flashsalesRuleTypeIsValidTrigger,
  flashsalesRuleTypeIsComplex,
  flashsalesRuleTypeIsSimple,
  // Rule Status
  FLASH_SALE_RULE_STATUS,
  FlashSaleRuleStatusType,
  FlashSaleRuleStatusCategory,
  FlashSaleRuleStatusColor,
  FlashSaleRuleStatusPriority,
  flashsalesRuleStatusGetLabel,
  flashsalesRuleStatusGetCategory,
  flashsalesRuleStatusGetColor,
  flashsalesRuleStatusGetPriority,
  flashsalesRuleStatusIsActive,
  flashsalesRuleStatusIsApproved,
  flashsalesRuleStatusIsArchived,
  flashsalesRuleStatusCanTransitionTo,
  flashsalesRuleStatusGetAvailableTransitions,
  flashsalesRuleStatusCanApprove,
  flashsalesRuleStatusCanReject,
  flashsalesRuleStatusCanActivate,
  flashsalesRuleStatusCanPause,
  flashsalesRuleStatusCanResume,
  flashsalesRuleStatusCanDeprecate,
  flashsalesRuleStatusCanDelete,
  flashsalesRuleStatusIsValid,
} from '@vubon/shared-constants';

// ============================================================
// Deal Rule Extended Types
// ============================================================

/**
 * Deal Rule Condition Detail
 */
export interface DealRuleConditionDetail extends BaseEntity, Timestamp {
  id: ID;
  ruleId: ID;
  dealId: ID;
  flashSaleId: ID;
  operator: FlashSaleRuleOperator;
  field: string;
  value: unknown;
  nested?: DealRuleConditionDetail[];
  metadata?: Metadata;
}

/**
 * Deal Rule Action Detail
 */
export interface DealRuleActionDetail extends BaseEntity, Timestamp {
  id: ID;
  ruleId: ID;
  dealId: ID;
  flashSaleId: ID;
  type: FlashSaleRuleAction;
  target: string;
  value: unknown;
  metadata?: Metadata;
}

/**
 * Deal Rule
 */
export interface DealRule extends BaseEntity, Timestamp {
  id: ID;
  dealId: ID;
  flashSaleId: ID;
  name: string;
  description?: string;
  type: FlashSaleRuleType;
  category: FlashSaleRuleCategory;
  priority: FlashSaleRulePriority;
  status: FlashSaleRuleStatusType;
  operator: FlashSaleRuleOperator;
  condition: FlashSaleRuleCondition;
  action: FlashSaleRuleAction;
  effect: FlashSaleRuleEffect;
  conditions: DealRuleConditionDetail[];
  actions: DealRuleActionDetail[];
  isActive: boolean;
  isApproved: boolean;
  isArchived: boolean;
  isHighPriority: boolean;
  isLowPriority: boolean;
  isComplex: boolean;
  isSimple: boolean;
  metadata?: Metadata;
}

/**
 * Deal Rule Filter
 */
export interface DealRuleFilter {
  ids?: ID[];
  dealIds?: ID[];
  flashSaleIds?: ID[];
  types?: FlashSaleRuleType[];
  categories?: FlashSaleRuleCategory[];
  priorities?: FlashSaleRulePriority[];
  statuses?: FlashSaleRuleStatusType[];
  operators?: FlashSaleRuleOperator[];
  conditions?: FlashSaleRuleCondition[];
  actions?: FlashSaleRuleAction[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isApproved?: boolean;
  isArchived?: boolean;
  isHighPriority?: boolean;
  isLowPriority?: boolean;
  isComplex?: boolean;
  isSimple?: boolean;
  searchTerm?: string;
}

/**
 * Deal Rule Statistics
 */
export interface DealRuleStatistics {
  dealId: ID;
  totalRules: number;
  activeRules: number;
  approvedRules: number;
  archivedRules: number;
  highPriorityRules: number;
  lowPriorityRules: number;
  complexRules: number;
  simpleRules: number;
  byType: Record<FlashSaleRuleType, number>;
  byCategory: Record<FlashSaleRuleCategory, number>;
  byPriority: Record<FlashSaleRulePriority, number>;
  byStatus: Record<FlashSaleRuleStatusType, number>;
  byOperator: Record<FlashSaleRuleOperator, number>;
  byCondition: Record<FlashSaleRuleCondition, number>;
  byAction: Record<FlashSaleRuleAction, number>;
  byEffect: Record<FlashSaleRuleEffect, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: FlashSaleRuleType;
  mostFrequentCategory: FlashSaleRuleCategory;
  mostFrequentPriority: FlashSaleRulePriority;
  mostFrequentStatus: FlashSaleRuleStatusType;
  mostFrequentOperator: FlashSaleRuleOperator;
}

/**
 * Deal Rule Summary
 */
export interface DealRuleSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalRules: number;
  active: number;
  approved: number;
  archived: number;
  highPriority: number;
  lowPriority: number;
  complex: number;
  simple: number;
  byType: Record<FlashSaleRuleType, number>;
  byCategory: Record<FlashSaleRuleCategory, number>;
  byPriority: Record<FlashSaleRulePriority, number>;
  byStatus: Record<FlashSaleRuleStatusType, number>;
  byOperator: Record<FlashSaleRuleOperator, number>;
  byCondition: Record<FlashSaleRuleCondition, number>;
  byAction: Record<FlashSaleRuleAction, number>;
  byEffect: Record<FlashSaleRuleEffect, number>;
  ruleTrend: {
    date: Date;
    total: number;
    active: number;
    approved: number;
  }[];
  topTypes: {
    type: FlashSaleRuleType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: FlashSaleRuleCategory;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: FlashSaleRulePriority;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: FlashSaleRuleStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * Deal Rule Configuration
 */
export interface DealRuleConfiguration {
  enabled: boolean;
  defaultType: FlashSaleRuleType;
  defaultCategory: FlashSaleRuleCategory;
  defaultPriority: FlashSaleRulePriority;
  defaultStatus: FlashSaleRuleStatusType;
  defaultOperator: FlashSaleRuleOperator;
  defaultCondition: FlashSaleRuleCondition;
  defaultAction: FlashSaleRuleAction;
  maxRules: number;
  maxConditions: number;
  maxActions: number;
  maxNesting: number;
  requireApproval: boolean;
  allowComplexRules: boolean;
  allowSimpleRules: boolean;
  autoActivate: boolean;
  notificationOnCreate: boolean;
  notificationOnApprove: boolean;
  notificationOnReject: boolean;
  notificationOnActivate: boolean;
  notificationOnPause: boolean;
  notificationOnResume: boolean;
  notificationOnDeprecate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: DealRuleAlertConfig;
}

/**
 * Deal Rule Alert Configuration
 */
export interface DealRuleAlertConfig {
  enabled: boolean;
  highPriorityAlert: boolean;
  ruleConflictAlert: boolean;
  ruleViolationAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Deal Rule History
 */
export interface DealRuleHistory extends BaseEntity, Timestamp {
  id: ID;
  ruleId: ID;
  dealId: ID;
  flashSaleId: ID;
  action:
    | 'create'
    | 'update'
    | 'approve'
    | 'reject'
    | 'activate'
    | 'pause'
    | 'resume'
    | 'deprecate'
    | 'delete'
    | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Deal Rule Validation
 */
export interface DealRuleValidation {
  isValid: boolean;
  ruleId: ID;
  dealId: ID;
  flashSaleId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Deal Rule Export
 */
export interface DealRuleExport extends BaseEntity, Timestamp {
  id: ID;
  dealId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: DealRuleFilter;
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
  // Rule Core
  FLASH_SALE_RULE,
  FlashSaleRuleType,
  FlashSaleRuleCategory,
  FlashSaleRulePriority,
  FlashSaleRuleOperator,
  FlashSaleRuleCondition,
  FlashSaleRuleAction,
  FlashSaleRuleEffect,
  flashsalesRuleGetTypeLabel,
  flashsalesRuleGetCategoryLabel,
  flashsalesRuleGetPriorityLabel,
  flashsalesRuleGetOperatorLabel,
  flashsalesRuleGetConditionLabel,
  flashsalesRuleGetActionLabel,
  flashsalesRuleGetEffectLabel,
  flashsalesRuleIsValidType,
  flashsalesRuleIsValidPriority,
  flashsalesRuleIsValidOperator,
  flashsalesRuleIsValidAction,
  flashsalesRuleIsHighPriority,
  flashsalesRuleIsLowPriority,
  flashsalesRuleGetDefaultPriority,
  flashsalesRuleGetDefaultOperator,
  flashsalesRuleGetDefaultCondition,
  flashsalesRuleGetMaxRules,
  flashsalesRuleGetMaxConditions,
  flashsalesRuleGetMaxActions,
  flashsalesRuleGetMaxNesting,
  // Rule Type
  FLASH_SALE_RULE_TYPE,
  FlashSaleRuleTypeCategory,
  FlashSaleRuleTypeComplexity,
  FlashSaleRuleTypeScope,
  FlashSaleRuleTypeFrequency,
  FlashSaleRuleTypeTrigger,
  FlashSaleRuleTypeExecution,
  FlashSaleRuleTypeValidation,
  flashsalesRuleTypeGetCategoryLabel,
  flashsalesRuleTypeGetComplexityLabel,
  flashsalesRuleTypeGetScopeLabel,
  flashsalesRuleTypeGetFrequencyLabel,
  flashsalesRuleTypeGetTriggerLabel,
  flashsalesRuleTypeGetExecutionLabel,
  flashsalesRuleTypeGetValidationLabel,
  flashsalesRuleTypeIsValidCategory,
  flashsalesRuleTypeIsValidScope,
  flashsalesRuleTypeIsValidTrigger,
  flashsalesRuleTypeIsComplex,
  flashsalesRuleTypeIsSimple,
  // Rule Status
  FLASH_SALE_RULE_STATUS,
  FlashSaleRuleStatusType,
  FlashSaleRuleStatusCategory,
  FlashSaleRuleStatusColor,
  FlashSaleRuleStatusPriority,
  flashsalesRuleStatusGetLabel,
  flashsalesRuleStatusGetCategory,
  flashsalesRuleStatusGetColor,
  flashsalesRuleStatusGetPriority,
  flashsalesRuleStatusIsActive,
  flashsalesRuleStatusIsApproved,
  flashsalesRuleStatusIsArchived,
  flashsalesRuleStatusCanTransitionTo,
  flashsalesRuleStatusGetAvailableTransitions,
  flashsalesRuleStatusCanApprove,
  flashsalesRuleStatusCanReject,
  flashsalesRuleStatusCanActivate,
  flashsalesRuleStatusCanPause,
  flashsalesRuleStatusCanResume,
  flashsalesRuleStatusCanDeprecate,
  flashsalesRuleStatusCanDelete,
  flashsalesRuleStatusIsValid,
};
