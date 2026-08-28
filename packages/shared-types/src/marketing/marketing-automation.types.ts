/**
 * Marketing Automation Types
 * Type definitions for marketing automation based on shared-constants
 * @module MarketingAutomationTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants marketing automation
// ============================================================
import {
  // Marketing Automation Core
  MARKETINGAUTOMATION,
  MarketingAutomationType,
  MarketingAutomationCategory,
  MarketingAutomationStatus,
  MarketingAutomationPriority,
  MarketingAutomationFrequency,
  MarketingAutomationExecutionMode,
  MarketingAutomationDefault,
  MarketingAutomationLimit,
  MarketingAutomationError,
  marketingautomationGetTypeLabel,
  marketingautomationGetCategoryLabel,
  marketingautomationGetStatusLabel,
  marketingautomationGetPriorityLabel,
  marketingautomationGetFrequencyLabel,
  marketingautomationGetExecutionModeLabel,
  marketingautomationGetErrorLabel,
  marketingautomationIsActive,
  marketingautomationIsEditable,
  marketingautomationIsCompleted,
  marketingautomationCanTransition,
  // Marketing Automation Trigger
  MARKETINGAUTOMATION_TRIGGER,
  MarketingAutomationTriggerType,
  MarketingAutomationEvent,
  MarketingAutomationTimeType,
  MarketingAutomationConditionType,
  MarketingAutomationTriggerStatus,
  MarketingAutomationTriggerDefault,
  marketingautomationGetTriggerTypeLabel,
  marketingautomationGetEventLabel,
  marketingautomationGetTimeTypeLabel,
  marketingautomationGetConditionTypeLabel,
  marketingautomationGetTriggerStatusLabel,
  marketingautomationIsEventTrigger,
  marketingautomationIsTimeTrigger,
  marketingautomationIsConditionTrigger,
  marketingautomationIsScheduleTrigger,
  // Marketing Automation Action
  MARKETINGAUTOMATION_ACTION,
  MarketingAutomationActionType,
  MarketingAutomationActionCategory,
  MarketingAutomationActionStatus,
  MarketingAutomationActionExecutionOrder,
  MarketingAutomationActionDelay,
  MarketingAutomationActionDefault,
  marketingautomationGetActionTypeLabel,
  marketingautomationGetActionCategoryLabel,
  marketingautomationGetActionStatusLabel,
  marketingautomationGetExecutionOrderLabel,
  marketingautomationGetDelayLabel,
  marketingautomationIsCommunicationAction,
  marketingautomationIsDataAction,
  marketingautomationIsTaskAction,
  marketingautomationIsMarketingAction,
  marketingautomationIsSalesAction,
  marketingautomationIsIntegrationAction,
  marketingautomationGetDefaultRetryAttempts,
  marketingautomationGetDefaultTimeout,
} from '@vubon/shared-constants';

// ============================================================
// Marketing Automation Extended Types
// ============================================================

/**
 * Marketing Automation Trigger
 */
export interface MarketingAutomationTrigger extends BaseEntity, Timestamp {
  id: ID;
  automationId: ID;
  type: MarketingAutomationTriggerType;
  event: MarketingAutomationEvent;
  timeType: MarketingAutomationTimeType;
  conditionType: MarketingAutomationConditionType;
  status: MarketingAutomationTriggerStatus;
  isEventTrigger: boolean;
  isTimeTrigger: boolean;
  isConditionTrigger: boolean;
  isScheduleTrigger: boolean;
  config: Record<string, unknown>;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Marketing Automation Action
 */
export interface MarketingAutomationAction extends BaseEntity, Timestamp {
  id: ID;
  automationId: ID;
  type: MarketingAutomationActionType;
  category: MarketingAutomationActionCategory;
  status: MarketingAutomationActionStatus;
  executionOrder: MarketingAutomationActionExecutionOrder;
  delay: MarketingAutomationActionDelay;
  isCommunication: boolean;
  isData: boolean;
  isTask: boolean;
  isMarketing: boolean;
  isSales: boolean;
  isIntegration: boolean;
  config: Record<string, unknown>;
  retryAttempts: number;
  timeout: number;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Marketing Automation
 */
export interface MarketingAutomation extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  name: string;
  description?: string;
  type: MarketingAutomationType;
  category: MarketingAutomationCategory;
  status: MarketingAutomationStatus;
  priority: MarketingAutomationPriority;
  frequency: MarketingAutomationFrequency;
  executionMode: MarketingAutomationExecutionMode;
  triggers: MarketingAutomationTrigger[];
  actions: MarketingAutomationAction[];
  isActive: boolean;
  isEditable: boolean;
  isCompleted: boolean;
  startedAt: Date;
  completedAt?: Date;
  metadata?: Metadata;
}

/**
 * Marketing Automation Filter
 */
export interface MarketingAutomationFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: MarketingAutomationType[];
  categories?: MarketingAutomationCategory[];
  statuses?: MarketingAutomationStatus[];
  priorities?: MarketingAutomationPriority[];
  frequencies?: MarketingAutomationFrequency[];
  executionModes?: MarketingAutomationExecutionMode[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isEditable?: boolean;
  isCompleted?: boolean;
  hasTriggers?: boolean;
  hasActions?: boolean;
  searchTerm?: string;
}

/**
 * Marketing Automation Statistics
 */
export interface MarketingAutomationStatistics {
  userId: ID;
  totalAutomations: number;
  activeAutomations: number;
  editableAutomations: number;
  completedAutomations: number;
  byType: Record<MarketingAutomationType, number>;
  byCategory: Record<MarketingAutomationCategory, number>;
  byStatus: Record<MarketingAutomationStatus, number>;
  byPriority: Record<MarketingAutomationPriority, number>;
  byFrequency: Record<MarketingAutomationFrequency, number>;
  byExecutionMode: Record<MarketingAutomationExecutionMode, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalTriggers: number;
  averageTriggers: number;
  maxTriggers: number;
  minTriggers: number;
  totalActions: number;
  averageActions: number;
  maxActions: number;
  minActions: number;
  mostFrequentType: MarketingAutomationType;
  mostFrequentCategory: MarketingAutomationCategory;
  mostFrequentStatus: MarketingAutomationStatus;
}

/**
 * Marketing Automation Summary
 */
export interface MarketingAutomationSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalAutomations: number;
  active: number;
  editable: number;
  completed: number;
  byType: Record<MarketingAutomationType, number>;
  byCategory: Record<MarketingAutomationCategory, number>;
  byStatus: Record<MarketingAutomationStatus, number>;
  byPriority: Record<MarketingAutomationPriority, number>;
  byFrequency: Record<MarketingAutomationFrequency, number>;
  byExecutionMode: Record<MarketingAutomationExecutionMode, number>;
  automationTrend: {
    date: Date;
    total: number;
    active: number;
    completed: number;
  }[];
  topTypes: {
    type: MarketingAutomationType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: MarketingAutomationCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: MarketingAutomationStatus;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: MarketingAutomationPriority;
    count: number;
    label: string;
  }[];
}

/**
 * Marketing Automation Configuration
 */
export interface MarketingAutomationConfiguration {
  enabled: boolean;
  defaultType: MarketingAutomationType;
  defaultCategory: MarketingAutomationCategory;
  defaultStatus: MarketingAutomationStatus;
  defaultPriority: MarketingAutomationPriority;
  defaultFrequency: MarketingAutomationFrequency;
  defaultExecutionMode: MarketingAutomationExecutionMode;
  defaultTriggerType: MarketingAutomationTriggerType;
  defaultActionType: MarketingAutomationActionType;
  defaultRetryAttempts: number;
  defaultTimeout: number;
  maxAutomationsPerUser: number;
  maxTriggersPerAutomation: number;
  maxActionsPerAutomation: number;
  allowMultipleTriggers: boolean;
  allowMultipleActions: boolean;
  requireApproval: boolean;
  autoStart: boolean;
  notificationOnCreate: boolean;
  notificationOnStart: boolean;
  notificationOnComplete: boolean;
  notificationOnError: boolean;
  notificationOnDelete: boolean;
  alertConfig?: MarketingAutomationAlertConfig;
}

/**
 * Marketing Automation Alert Configuration
 */
export interface MarketingAutomationAlertConfig {
  enabled: boolean;
  executionFailureAlert: boolean;
  triggerFailureAlert: boolean;
  actionFailureAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Marketing Automation History
 */
export interface MarketingAutomationHistory extends BaseEntity, Timestamp {
  id: ID;
  automationId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'start'
    | 'pause'
    | 'resume'
    | 'complete'
    | 'fail'
    | 'archive'
    | 'restore'
    | 'delete'
    | 'trigger_executed'
    | 'action_executed';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Marketing Automation Validation
 */
export interface MarketingAutomationValidation {
  isValid: boolean;
  automationId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Marketing Automation Export
 */
export interface MarketingAutomationExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: MarketingAutomationFilter;
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
  // Marketing Automation Core
  MARKETINGAUTOMATION,
  MarketingAutomationType,
  MarketingAutomationCategory,
  MarketingAutomationStatus,
  MarketingAutomationPriority,
  MarketingAutomationFrequency,
  MarketingAutomationExecutionMode,
  MarketingAutomationDefault,
  MarketingAutomationLimit,
  MarketingAutomationError,
  marketingautomationGetTypeLabel,
  marketingautomationGetCategoryLabel,
  marketingautomationGetStatusLabel,
  marketingautomationGetPriorityLabel,
  marketingautomationGetFrequencyLabel,
  marketingautomationGetExecutionModeLabel,
  marketingautomationGetErrorLabel,
  marketingautomationIsActive,
  marketingautomationIsEditable,
  marketingautomationIsCompleted,
  marketingautomationCanTransition,
  // Marketing Automation Trigger
  MARKETINGAUTOMATION_TRIGGER,
  MarketingAutomationTriggerType,
  MarketingAutomationEvent,
  MarketingAutomationTimeType,
  MarketingAutomationConditionType,
  MarketingAutomationTriggerStatus,
  MarketingAutomationTriggerDefault,
  marketingautomationGetTriggerTypeLabel,
  marketingautomationGetEventLabel,
  marketingautomationGetTimeTypeLabel,
  marketingautomationGetConditionTypeLabel,
  marketingautomationGetTriggerStatusLabel,
  marketingautomationIsEventTrigger,
  marketingautomationIsTimeTrigger,
  marketingautomationIsConditionTrigger,
  marketingautomationIsScheduleTrigger,
  // Marketing Automation Action
  MARKETINGAUTOMATION_ACTION,
  MarketingAutomationActionType,
  MarketingAutomationActionCategory,
  MarketingAutomationActionStatus,
  MarketingAutomationActionExecutionOrder,
  MarketingAutomationActionDelay,
  MarketingAutomationActionDefault,
  marketingautomationGetActionTypeLabel,
  marketingautomationGetActionCategoryLabel,
  marketingautomationGetActionStatusLabel,
  marketingautomationGetExecutionOrderLabel,
  marketingautomationGetDelayLabel,
  marketingautomationIsCommunicationAction,
  marketingautomationIsDataAction,
  marketingautomationIsTaskAction,
  marketingautomationIsMarketingAction,
  marketingautomationIsSalesAction,
  marketingautomationIsIntegrationAction,
  marketingautomationGetDefaultRetryAttempts,
  marketingautomationGetDefaultTimeout,
};
