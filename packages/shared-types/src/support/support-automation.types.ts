/**
 * Support Automation Types
 * Type definitions for support automation based on shared-constants
 * @module SupportAutomationTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support support-automation
// ============================================================
import {
  // Support Automation Core
  SUPPORT_AUTOMATION,
  SupportAutomationType,
  SupportAutomationStatus,
  SupportAutomationPriority,
  SupportAutomationCategory,
  SupportAutomationExecution,
  SupportAutomationComplexity,
  supportAutomationGetTypeLabel,
  supportAutomationGetStatusLabel,
  supportAutomationGetPriorityLabel,
  supportAutomationIsActive,
  supportAutomationIsDraft,
  supportAutomationIsError,
  supportAutomationGetCategoryLabel,
  // Support Automation Type
  SUPPORT_AUTOMATION_TYPE,
  SupportAutomationTypeCategory,
  SupportAutomationTypeScope,
  SupportAutomationTypeFrequency,
  SupportAutomationTypeMode,
  SupportAutomationTypeComplexityLevel,
  SupportAutomationTypeDependency,
  supportAutomationTypeGetCategoryLabel,
  supportAutomationTypeGetScopeLabel,
  supportAutomationTypeGetFrequencyLabel,
  supportAutomationTypeGetModeLabel,
  // Support Automation Trigger
  SUPPORT_AUTOMATION_TRIGGER,
  SupportAutomationTriggerType,
  SupportAutomationTriggerEvent,
  SupportAutomationTriggerCondition,
  SupportAutomationTriggerTiming,
  SupportAutomationTriggerPriority,
  SupportAutomationTriggerStatus,
  supportAutomationTriggerGetTypeLabel,
  supportAutomationTriggerGetEventLabel,
  supportAutomationTriggerIsActive,
  supportAutomationTriggerGetPriorityLabel,
  supportAutomationTriggerGetTimingLabel,
  // Support Automation Action
  SUPPORT_AUTOMATION_ACTION,
  SupportAutomationActionType,
  SupportAutomationTicketAction,
  SupportAutomationNotificationAction,
  SupportAutomationActionTiming,
  SupportAutomationActionStatus,
  SupportAutomationActionPriority,
  SupportAutomationActionExecution,
  supportAutomationActionGetTypeLabel,
  supportAutomationActionGetTicketActionLabel,
  supportAutomationActionGetNotificationActionLabel,
  supportAutomationActionIsCompleted,
  supportAutomationActionIsFailed,
  supportAutomationActionIsPending,
} from '@vubon/shared-constants';

// ============================================================
// Support Automation Extended Types
// ============================================================

/**
 * Support automation
 */
export interface SupportAutomation extends BaseEntity, Timestamp {
  id: ID;
  type: SupportAutomationType;
  status: SupportAutomationStatus;
  priority: SupportAutomationPriority;
  category: SupportAutomationCategory;
  execution: SupportAutomationExecution;
  complexity: SupportAutomationComplexity;
  name: string;
  description?: string;
  isActive: boolean;
  isDraft: boolean;
  isError: boolean;
  trigger: SupportAutomationTrigger;
  action: SupportAutomationAction;
  metadata?: Metadata;
}

/**
 * Support automation trigger
 */
export interface SupportAutomationTrigger extends BaseEntity, Timestamp {
  id: ID;
  automationId: ID;
  type: SupportAutomationTriggerType;
  event: SupportAutomationTriggerEvent;
  condition: SupportAutomationTriggerCondition;
  timing: SupportAutomationTriggerTiming;
  priority: SupportAutomationTriggerPriority;
  status: SupportAutomationTriggerStatus;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Support automation action
 */
export interface SupportAutomationAction extends BaseEntity, Timestamp {
  id: ID;
  automationId: ID;
  type: SupportAutomationActionType;
  ticketAction: SupportAutomationTicketAction;
  notificationAction: SupportAutomationNotificationAction;
  timing: SupportAutomationActionTiming;
  status: SupportAutomationActionStatus;
  priority: SupportAutomationActionPriority;
  execution: SupportAutomationActionExecution;
  isCompleted: boolean;
  isFailed: boolean;
  isPending: boolean;
  metadata?: Metadata;
}

/**
 * Support automation filter
 */
export interface SupportAutomationFilter {
  ids?: ID[];
  types?: SupportAutomationType[];
  statuses?: SupportAutomationStatus[];
  priorities?: SupportAutomationPriority[];
  categories?: SupportAutomationCategory[];
  executions?: SupportAutomationExecution[];
  complexities?: SupportAutomationComplexity[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isDraft?: boolean;
  isError?: boolean;
  searchTerm?: string;
}

/**
 * Support automation statistics
 */
export interface SupportAutomationStatistics {
  totalAutomations: number;
  activeAutomations: number;
  draftAutomations: number;
  errorAutomations: number;
  byType: Record<SupportAutomationType, number>;
  byStatus: Record<SupportAutomationStatus, number>;
  byPriority: Record<SupportAutomationPriority, number>;
  byCategory: Record<SupportAutomationCategory, number>;
  byExecution: Record<SupportAutomationExecution, number>;
  byComplexity: Record<SupportAutomationComplexity, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: SupportAutomationType;
  mostFrequentStatus: SupportAutomationStatus;
  mostFrequentPriority: SupportAutomationPriority;
  mostFrequentCategory: SupportAutomationCategory;
  mostFrequentExecution: SupportAutomationExecution;
  errorRate: number;
  successRate: number;
}

/**
 * Support automation summary
 */
export interface SupportAutomationSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalAutomations: number;
  active: number;
  draft: number;
  error: number;
  byType: Record<SupportAutomationType, number>;
  byStatus: Record<SupportAutomationStatus, number>;
  byPriority: Record<SupportAutomationPriority, number>;
  byCategory: Record<SupportAutomationCategory, number>;
  byExecution: Record<SupportAutomationExecution, number>;
  byComplexity: Record<SupportAutomationComplexity, number>;
  automationTrend: {
    date: Date;
    total: number;
    active: number;
    error: number;
  }[];
  topTypes: {
    type: SupportAutomationType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: SupportAutomationStatus;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: SupportAutomationPriority;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: SupportAutomationCategory;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    successRate: number;
    errorRate: number;
    averageExecutionTime: number;
  };
}

/**
 * Support automation configuration
 */
export interface SupportAutomationConfiguration {
  enabled: boolean;
  defaultType: SupportAutomationType;
  defaultStatus: SupportAutomationStatus;
  defaultPriority: SupportAutomationPriority;
  defaultCategory: SupportAutomationCategory;
  defaultExecution: SupportAutomationExecution;
  defaultComplexity: SupportAutomationComplexity;
  requireName: boolean;
  requireDescription: boolean;
  requireTrigger: boolean;
  requireAction: boolean;
  maxAutomationsPerUser: number;
  autoActivate: boolean;
  requireApproval: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnActivate: boolean;
  notificationOnError: boolean;
  alertConfig?: SupportAutomationAlertConfig;
}

/**
 * Support automation alert configuration
 */
export interface SupportAutomationAlertConfig {
  enabled: boolean;
  errorAlert: boolean;
  highErrorRateAlert: boolean;
  highErrorRateThreshold: number;
  inactiveAutomationAlert: boolean;
  inactiveThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Support automation history
 */
export interface SupportAutomationHistory extends BaseEntity, Timestamp {
  id: ID;
  automationId: ID;
  action:
    'create' | 'update' | 'activate' | 'deactivate' | 'delete' | 'restore' | 'execute' | 'error';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Support automation validation
 */
export interface SupportAutomationValidation {
  isValid: boolean;
  automationId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Support automation export
 */
export interface SupportAutomationExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: SupportAutomationFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Support automation execution log
 */
export interface SupportAutomationExecutionLog extends BaseEntity, Timestamp {
  id: ID;
  automationId: ID;
  ticketId: ID;
  userId: ID;
  triggerId: ID;
  actionId: ID;
  status: 'pending' | 'executing' | 'completed' | 'failed' | 'skipped';
  startedAt: Date;
  completedAt?: Date;
  duration?: number;
  errorMessage?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Support Automation Core
  SUPPORT_AUTOMATION,
  SupportAutomationType,
  SupportAutomationStatus,
  SupportAutomationPriority,
  SupportAutomationCategory,
  SupportAutomationExecution,
  SupportAutomationComplexity,
  supportAutomationGetTypeLabel,
  supportAutomationGetStatusLabel,
  supportAutomationGetPriorityLabel,
  supportAutomationIsActive,
  supportAutomationIsDraft,
  supportAutomationIsError,
  supportAutomationGetCategoryLabel,
  // Support Automation Type
  SUPPORT_AUTOMATION_TYPE,
  SupportAutomationTypeCategory,
  SupportAutomationTypeScope,
  SupportAutomationTypeFrequency,
  SupportAutomationTypeMode,
  SupportAutomationTypeComplexityLevel,
  SupportAutomationTypeDependency,
  supportAutomationTypeGetCategoryLabel,
  supportAutomationTypeGetScopeLabel,
  supportAutomationTypeGetFrequencyLabel,
  supportAutomationTypeGetModeLabel,
  // Support Automation Trigger
  SUPPORT_AUTOMATION_TRIGGER,
  SupportAutomationTriggerType,
  SupportAutomationTriggerEvent,
  SupportAutomationTriggerCondition,
  SupportAutomationTriggerTiming,
  SupportAutomationTriggerPriority,
  SupportAutomationTriggerStatus,
  supportAutomationTriggerGetTypeLabel,
  supportAutomationTriggerGetEventLabel,
  supportAutomationTriggerIsActive,
  supportAutomationTriggerGetPriorityLabel,
  supportAutomationTriggerGetTimingLabel,
  // Support Automation Action
  SUPPORT_AUTOMATION_ACTION,
  SupportAutomationActionType,
  SupportAutomationTicketAction,
  SupportAutomationNotificationAction,
  SupportAutomationActionTiming,
  SupportAutomationActionStatus,
  SupportAutomationActionPriority,
  SupportAutomationActionExecution,
  supportAutomationActionGetTypeLabel,
  supportAutomationActionGetTicketActionLabel,
  supportAutomationActionGetNotificationActionLabel,
  supportAutomationActionIsCompleted,
  supportAutomationActionIsFailed,
  supportAutomationActionIsPending,
};
