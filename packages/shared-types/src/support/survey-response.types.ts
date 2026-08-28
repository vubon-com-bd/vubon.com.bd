/**
 * Survey Response Types
 * Type definitions for survey responses based on shared-constants
 * @module SurveyResponseTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support survey
// ============================================================
import {
  // Survey Status
  SurveyStatusType,
  SurveyStatusCategory,
  SurveyStatusColor,
  SurveyStatusIcon,
  SurveyStatusTransition,
  // Survey Type
  SurveyTypeType,
  SurveyTypeCategory,
  SurveyTypeIcon,
  SurveyTypeColor,
} from '@vubon/shared-constants';

// ============================================================
// Survey Response Extended Types
// ============================================================

/**
 * Survey response
 */
export interface SurveyResponse extends BaseEntity, Timestamp {
  id: ID;
  surveyId: ID;
  userId: ID;
  answers: SurveyAnswer[];
  isCompleted: boolean;
  startedAt: Date;
  completedAt?: Date;
  duration?: number;
  metadata?: Metadata;
}

/**
 * Survey answer
 */
export interface SurveyAnswer {
  questionId: ID;
  value: string | number | boolean | string[] | File;
  metadata?: Metadata;
}

/**
 * Survey response filter
 */
export interface SurveyResponseFilter {
  ids?: ID[];
  surveyIds?: ID[];
  userIds?: ID[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isCompleted?: boolean;
  minDuration?: number;
  maxDuration?: number;
  searchTerm?: string;
}

/**
 * Survey response statistics
 */
export interface SurveyResponseStatistics {
  surveyId: ID;
  totalResponses: number;
  completedResponses: number;
  partialResponses: number;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageDuration: number;
  maxDuration: number;
  minDuration: number;
  completionRate: number;
  responseRate: number;
}

/**
 * Survey response summary
 */
export interface SurveyResponseSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalResponses: number;
  completed: number;
  partial: number;
  responseTrend: {
    date: Date;
    total: number;
    completed: number;
    partial: number;
  }[];
  metrics: {
    completionRate: number;
    responseRate: number;
    averageDuration: number;
  };
}

/**
 * Survey response configuration
 */
export interface SurveyResponseConfiguration {
  enabled: boolean;
  requireLogin: boolean;
  allowMultiple: boolean;
  allowPartial: boolean;
  autoComplete: boolean;
  notificationOnSubmit: boolean;
  notificationOnPartial: boolean;
  alertConfig?: SurveyResponseAlertConfig;
}

/**
 * Survey response alert configuration
 */
export interface SurveyResponseAlertConfig {
  enabled: boolean;
  lowResponseRateAlert: boolean;
  lowResponseRateThreshold: number;
  partialResponseAlert: boolean;
  partialResponseThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Survey response validation
 */
export interface SurveyResponseValidation {
  isValid: boolean;
  responseId: ID;
  surveyId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Survey response export
 */
export interface SurveyResponseExport extends BaseEntity, Timestamp {
  id: ID;
  surveyId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: SurveyResponseFilter;
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
  SurveyStatusType,
  SurveyStatusCategory,
  SurveyStatusColor,
  SurveyStatusIcon,
  SurveyStatusTransition,
  // Survey Type
  SurveyTypeType,
  SurveyTypeCategory,
  SurveyTypeIcon,
  SurveyTypeColor,
};
