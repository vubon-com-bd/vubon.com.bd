/**
 * Notification Rule Types
 * Type definitions for notification rules based on shared-constants
 * @module NotificationRuleTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants notification rule
// ============================================================
import {
  // Notification Rule
  NOTIFICATIONRULE,
  NotificationRuleType,
  NotificationRuleCategory,
  NotificationRuleOperator,
  NotificationRuleCondition,
  NotificationRulePriority,
  NotificationRuleEffect,
  NotificationRuleDefault,
  NotificationRuleLimit,
  NotificationRuleError,
  notificationruleGetTypeLabel,
  notificationruleGetCategoryLabel,
  notificationruleGetOperatorLabel,
  notificationruleGetConditionLabel,
  notificationruleGetEffectLabel,
  notificationruleGetErrorLabel,
  notificationruleIsInclusion,
  notificationruleIsExclusion,
  notificationruleIsFilter,
  notificationruleIsPriority,
  notificationruleGetDefaultPriority,
  notificationruleGetMaxRulesPerNotification,
  // Notification Rule Type
  NOTIFICATIONRULE_TYPE,
  NotificationRuleCategoryType,
  NotificationRuleSubType,
  NotificationRuleComplexity,
  NotificationRuleScope,
  NotificationRuleEvaluationOrder,
  notificationRuleTypeGetCategoryLabel,
  notificationruleGetSubTypeLabel,
  notificationruleGetComplexityLabel,
  notificationruleGetScopeLabel,
  notificationruleGetEvaluationOrderLabel,
  notificationruleIsUserCategory,
  notificationruleIsContentCategory,
  notificationruleIsChannelCategory,
  notificationruleIsTimeCategory,
  // Notification Rule Status
  NOTIFICATIONRULE_STATUS,
  NotificationRuleStatusType,
  NotificationRuleStatusColor,
  NotificationRuleStatusCategory,
  NotificationRuleStatusOrder,
  NotificationRuleStatusTransition,
  notificationruleGetStatusLabel,
  notificationruleGetStatusColor,
  notificationruleGetStatusCategory,
  notificationruleIsActive,
  notificationruleIsPending,
  notificationruleIsFailed,
  notificationruleIsEditable,
  notificationruleCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Notification Rule Extended Types
// ============================================================

/**
 * Notification Rule Condition Detail
 */
export interface NotificationRuleConditionDetail {
  field: string;
  operator: NotificationRuleOperator;
  value: unknown;
  metadata?: Metadata;
}

/**
 * Notification Rule
 */
export interface NotificationRule extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: NotificationRuleType;
  category: NotificationRuleCategory;
  operator: NotificationRuleOperator;
  condition: NotificationRuleConditionDetail;
  effect: NotificationRuleEffect;
  priority: NotificationRulePriority;
  status: NotificationRuleStatusType;
  name: string;
  description?: string;
  isInclusion: boolean;
  isExclusion: boolean;
  isFilter: boolean;
  isPriority: boolean;
  isActive: boolean;
  isPending: boolean;
  isFailed: boolean;
  isEditable: boolean;
  metadata?: Metadata;
}

/**
 * Notification Rule Filter
 */
export interface NotificationRuleFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: NotificationRuleType[];
  categories?: NotificationRuleCategory[];
  operators?: NotificationRuleOperator[];
  effects?: NotificationRuleEffect[];
  priorities?: NotificationRulePriority[];
  statuses?: NotificationRuleStatusType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isInclusion?: boolean;
  isExclusion?: boolean;
  isFilter?: boolean;
  isPriority?: boolean;
  isActive?: boolean;
  isPending?: boolean;
  isFailed?: boolean;
  isEditable?: boolean;
  searchTerm?: string;
  name?: string;
}

/**
 * Notification Rule Statistics
 */
export interface NotificationRuleStatistics {
  userId: ID;
  totalRules: number;
  activeRules: number;
  pendingRules: number;
  failedRules: number;
  editableRules: number;
  byType: Record<NotificationRuleType, number>;
  byCategory: Record<NotificationRuleCategory, number>;
  byOperator: Record<NotificationRuleOperator, number>;
  byEffect: Record<NotificationRuleEffect, number>;
  byPriority: Record<NotificationRulePriority, number>;
  byStatus: Record<NotificationRuleStatusType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  inclusionRules: number;
  exclusionRules: number;
  filterRules: number;
  priorityRules: number;
  mostFrequentType: NotificationRuleType;
  mostFrequentCategory: NotificationRuleCategory;
  mostFrequentOperator: NotificationRuleOperator;
  mostFrequentEffect: NotificationRuleEffect;
  mostFrequentPriority: NotificationRulePriority;
  mostFrequentStatus: NotificationRuleStatusType;
}

/**
 * Notification Rule Summary
 */
export interface NotificationRuleSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalRules: number;
  active: number;
  pending: number;
  failed: number;
  editable: number;
  byType: Record<NotificationRuleType, number>;
  byCategory: Record<NotificationRuleCategory, number>;
  byOperator: Record<NotificationRuleOperator, number>;
  byEffect: Record<NotificationRuleEffect, number>;
  byPriority: Record<NotificationRulePriority, number>;
  byStatus: Record<NotificationRuleStatusType, number>;
  ruleTrend: {
    date: Date;
    total: number;
    active: number;
    pending: number;
  }[];
  topTypes: {
    type: NotificationRuleType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: NotificationRuleCategory;
    count: number;
    label: string;
  }[];
  topOperators: {
    operator: NotificationRuleOperator;
    count: number;
    label: string;
  }[];
  topEffects: {
    effect: NotificationRuleEffect;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: NotificationRulePriority;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: NotificationRuleStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * Notification Rule Configuration
 */
export interface NotificationRuleConfiguration {
  enabled: boolean;
  defaultType: NotificationRuleType;
  defaultCategory: NotificationRuleCategory;
  defaultOperator: NotificationRuleOperator;
  defaultEffect: NotificationRuleEffect;
  defaultPriority: NotificationRulePriority;
  maxRulesPerNotification: number;
  maxRulesPerUser: number;
  allowInclusion: boolean;
  allowExclusion: boolean;
  allowFilter: boolean;
  allowPriority: boolean;
  requireName: boolean;
  requireDescription: boolean;
  requireCondition: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnStatusChange: boolean;
  alertConfig?: NotificationRuleAlertConfig;
}

/**
 * Notification Rule Alert Configuration
 */
export interface NotificationRuleAlertConfig {
  enabled: boolean;
  ruleConflictAlert: boolean;
  highPriorityAlert: boolean;
  maxLimitAlert: boolean;
  ruleFailureAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Notification Rule History
 */
export interface NotificationRuleHistory extends BaseEntity, Timestamp {
  id: ID;
  ruleId: ID;
  userId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'delete' | 'restore' | 'fail' | 'retry';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Notification Rule Validation
 */
export interface NotificationRuleValidation {
  isValid: boolean;
  ruleId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Notification Rule Export
 */
export interface NotificationRuleExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: NotificationRuleFilter;
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
  // Notification Rule
  NOTIFICATIONRULE,
  NotificationRuleType,
  NotificationRuleCategory,
  NotificationRuleOperator,
  NotificationRuleCondition,
  NotificationRulePriority,
  NotificationRuleEffect,
  NotificationRuleDefault,
  NotificationRuleLimit,
  NotificationRuleError,
  notificationruleGetTypeLabel,
  notificationruleGetCategoryLabel,
  notificationruleGetOperatorLabel,
  notificationruleGetConditionLabel,
  notificationruleGetEffectLabel,
  notificationruleGetErrorLabel,
  notificationruleIsInclusion,
  notificationruleIsExclusion,
  notificationruleIsFilter,
  notificationruleIsPriority,
  notificationruleGetDefaultPriority,
  notificationruleGetMaxRulesPerNotification,
  // Notification Rule Type
  NOTIFICATIONRULE_TYPE,
  NotificationRuleCategoryType,
  NotificationRuleSubType,
  NotificationRuleComplexity,
  NotificationRuleScope,
  NotificationRuleEvaluationOrder,
  notificationRuleTypeGetCategoryLabel,
  notificationruleGetSubTypeLabel,
  notificationruleGetComplexityLabel,
  notificationruleGetScopeLabel,
  notificationruleGetEvaluationOrderLabel,
  notificationruleIsUserCategory,
  notificationruleIsContentCategory,
  notificationruleIsChannelCategory,
  notificationruleIsTimeCategory,
  // Notification Rule Status
  NOTIFICATIONRULE_STATUS,
  NotificationRuleStatusType,
  NotificationRuleStatusColor,
  NotificationRuleStatusCategory,
  NotificationRuleStatusOrder,
  NotificationRuleStatusTransition,
  notificationruleGetStatusLabel,
  notificationruleGetStatusColor,
  notificationruleGetStatusCategory,
  notificationruleIsActive,
  notificationruleIsPending,
  notificationruleIsFailed,
  notificationruleIsEditable,
  notificationruleCanTransition,
};
