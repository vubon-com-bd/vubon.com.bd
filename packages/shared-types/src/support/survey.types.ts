/**
 * Survey Types
 * Type definitions for support surveys based on shared-constants
 * @module SurveyTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support survey
// ============================================================
import {
  // Survey Status
  SURVEY_STATUS,
  SurveyStatusType,
  SurveyStatusCategory,
  SurveyStatusColor,
  SurveyStatusIcon,
  SurveyStatusTransition,
  surveyStatusGetLabel,
  surveyStatusIsActive,
  surveyStatusIsCompleted,
  surveyStatusIsPending,
  surveyStatusGetCategory,
  surveyStatusCanTransition,
  // Survey Type
  SURVEY_TYPE,
  SurveyTypeType,
  SurveyTypeCategory,
  SurveyTypeIcon,
  SurveyTypeColor,
  surveyTypeGetLabel,
  surveyTypeGetIcon,
  surveyTypeGetColor,
  surveyTypeGetDuration,
  surveyTypeGetCategory,
} from '@vubon/shared-constants';

// ============================================================
// Survey Extended Types
// ============================================================

/**
 * Survey
 */
export interface Survey extends BaseEntity, Timestamp {
  id: ID;
  type: SurveyTypeType;
  status: SurveyStatusType;
  category: SurveyTypeCategory;
  title: string;
  description?: string;
  icon: SurveyTypeIcon;
  color: SurveyTypeColor;
  duration: number;
  isActive: boolean;
  isCompleted: boolean;
  isPending: boolean;
  questions: SurveyQuestion[];
  responseCount: number;
  completionRate: number;
  metadata?: Metadata;
}

/**
 * Survey question
 */
export interface SurveyQuestion extends BaseEntity, Timestamp {
  id: ID;
  surveyId: ID;
  type: 'text' | 'rating' | 'choice' | 'multiple_choice' | 'boolean' | 'scale' | 'date' | 'file';
  question: string;
  description?: string;
  required: boolean;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  order: number;
  metadata?: Metadata;
}

/**
 * Survey filter
 */
export interface SurveyFilter {
  ids?: ID[];
  types?: SurveyTypeType[];
  statuses?: SurveyStatusType[];
  categories?: SurveyTypeCategory[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isCompleted?: boolean;
  isPending?: boolean;
  minDuration?: number;
  maxDuration?: number;
  minResponseCount?: number;
  maxResponseCount?: number;
  searchTerm?: string;
}

/**
 * Survey statistics
 */
export interface SurveyStatistics {
  totalSurveys: number;
  activeSurveys: number;
  completedSurveys: number;
  pendingSurveys: number;
  byType: Record<SurveyTypeType, number>;
  byStatus: Record<SurveyStatusType, number>;
  byCategory: Record<SurveyTypeCategory, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageDuration: number;
  maxDuration: number;
  minDuration: number;
  totalResponses: number;
  averageResponseCount: number;
  maxResponseCount: number;
  minResponseCount: number;
  averageCompletionRate: number;
  maxCompletionRate: number;
  minCompletionRate: number;
  mostFrequentType: SurveyTypeType;
  mostFrequentStatus: SurveyStatusType;
  mostFrequentCategory: SurveyTypeCategory;
}

/**
 * Survey summary
 */
export interface SurveySummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSurveys: number;
  active: number;
  completed: number;
  pending: number;
  byType: Record<SurveyTypeType, number>;
  byStatus: Record<SurveyStatusType, number>;
  byCategory: Record<SurveyTypeCategory, number>;
  surveyTrend: {
    date: Date;
    total: number;
    active: number;
    completed: number;
  }[];
  topTypes: {
    type: SurveyTypeType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: SurveyStatusType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: SurveyTypeCategory;
    count: number;
    label: string;
  }[];
  responseMetrics: {
    totalResponses: number;
    averageResponseCount: number;
    averageCompletionRate: number;
  };
}

/**
 * Survey configuration
 */
export interface SurveyConfiguration {
  enabled: boolean;
  defaultType: SurveyTypeType;
  defaultStatus: SurveyStatusType;
  defaultCategory: SurveyTypeCategory;
  requireTitle: boolean;
  requireDescription: boolean;
  requireQuestions: boolean;
  minQuestions: number;
  maxQuestions: number;
  allowAnonymous: boolean;
  autoComplete: boolean;
  completeAfterDays: number;
  notificationOnCreate: boolean;
  notificationOnComplete: boolean;
  notificationOnResponse: boolean;
  alertConfig?: SurveyAlertConfig;
}

/**
 * Survey alert configuration
 */
export interface SurveyAlertConfig {
  enabled: boolean;
  lowResponseAlert: boolean;
  lowResponseThreshold: number;
  lowCompletionAlert: boolean;
  lowCompletionThreshold: number;
  pendingSurveyAlert: boolean;
  pendingThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Survey history
 */
export interface SurveyHistory extends BaseEntity, Timestamp {
  id: ID;
  surveyId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'complete' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Survey validation
 */
export interface SurveyValidation {
  isValid: boolean;
  surveyId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Survey export
 */
export interface SurveyExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: SurveyFilter;
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
  // Survey Status
  SURVEY_STATUS,
  SurveyStatusType,
  SurveyStatusCategory,
  SurveyStatusColor,
  SurveyStatusIcon,
  SurveyStatusTransition,
  surveyStatusGetLabel,
  surveyStatusIsActive,
  surveyStatusIsCompleted,
  surveyStatusIsPending,
  surveyStatusGetCategory,
  surveyStatusCanTransition,
  // Survey Type
  SURVEY_TYPE,
  SurveyTypeType,
  SurveyTypeCategory,
  SurveyTypeIcon,
  SurveyTypeColor,
  surveyTypeGetLabel,
  surveyTypeGetIcon,
  surveyTypeGetColor,
  surveyTypeGetDuration,
  surveyTypeGetCategory,
};
