/**
 * Ticket Satisfaction Types
 * Type definitions for ticket satisfaction based on shared-constants
 * @module TicketSatisfactionTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support ticket
// ============================================================
import {
  // Ticket Satisfaction
  TICKET_SATISFACTION,
  TicketSatisfactionLevel,
  TicketSatisfactionScore,
  TicketSatisfactionEmoji,
  TicketSatisfactionCategory,
  ticketSatisfactionGetLabel,
  ticketSatisfactionGetScore,
  ticketSatisfactionIsPositive,
  ticketSatisfactionIsNegative,
  ticketSatisfactionGetEmoji,
  ticketSatisfactionGetCategory,
} from '@vubon/shared-constants';

// ============================================================
// Ticket Satisfaction Extended Types
// ============================================================

/**
 * Ticket satisfaction
 */
export interface TicketSatisfaction extends BaseEntity, Timestamp {
  id: ID;
  ticketId: ID;
  userId: ID;
  level: TicketSatisfactionLevel;
  score: TicketSatisfactionScore;
  emoji: TicketSatisfactionEmoji;
  category: TicketSatisfactionCategory;
  feedback?: string;
  isPositive: boolean;
  isNegative: boolean;
  submittedAt: Date;
  metadata?: Metadata;
}

/**
 * Ticket satisfaction filter
 */
export interface TicketSatisfactionFilter {
  ids?: ID[];
  ticketIds?: ID[];
  userIds?: ID[];
  levels?: TicketSatisfactionLevel[];
  scores?: TicketSatisfactionScore[];
  categories?: TicketSatisfactionCategory[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPositive?: boolean;
  isNegative?: boolean;
  hasFeedback?: boolean;
  searchTerm?: string;
}

/**
 * Ticket satisfaction statistics
 */
export interface TicketSatisfactionStatistics {
  ticketId: ID;
  totalSatisfactions: number;
  positiveSatisfactions: number;
  negativeSatisfactions: number;
  byLevel: Record<TicketSatisfactionLevel, number>;
  byScore: Record<TicketSatisfactionScore, number>;
  byCategory: Record<TicketSatisfactionCategory, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageScore: number;
  maxScore: number;
  minScore: number;
  positiveRate: number;
  negativeRate: number;
  mostFrequentLevel: TicketSatisfactionLevel;
  mostFrequentScore: TicketSatisfactionScore;
  mostFrequentCategory: TicketSatisfactionCategory;
  feedbackCount: number;
}

/**
 * Ticket satisfaction summary
 */
export interface TicketSatisfactionSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSatisfactions: number;
  positive: number;
  negative: number;
  byLevel: Record<TicketSatisfactionLevel, number>;
  byScore: Record<TicketSatisfactionScore, number>;
  byCategory: Record<TicketSatisfactionCategory, number>;
  satisfactionTrend: {
    date: Date;
    total: number;
    positive: number;
    negative: number;
  }[];
  topLevels: {
    level: TicketSatisfactionLevel;
    count: number;
    label: string;
  }[];
  topScores: {
    score: TicketSatisfactionScore;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: TicketSatisfactionCategory;
    count: number;
    label: string;
  }[];
  metrics: {
    averageScore: number;
    positiveRate: number;
    negativeRate: number;
    csat: number;
  };
}

/**
 * Ticket satisfaction configuration
 */
export interface TicketSatisfactionConfiguration {
  enabled: boolean;
  requireFeedback: boolean;
  requireScore: boolean;
  requireEmoji: boolean;
  requireCategory: boolean;
  autoSendSurvey: boolean;
  surveyDelayHours: number;
  reminderHours: number;
  maxReminders: number;
  allowAnonymous: boolean;
  notificationOnSubmit: boolean;
  notificationOnLowScore: boolean;
  lowScoreThreshold: number;
  alertConfig?: TicketSatisfactionAlertConfig;
}

/**
 * Ticket satisfaction alert configuration
 */
export interface TicketSatisfactionAlertConfig {
  enabled: boolean;
  lowScoreAlert: boolean;
  lowScoreThreshold: number;
  negativeFeedbackAlert: boolean;
  unsubmittedSurveyAlert: boolean;
  unsubmittedSurveyThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Ticket satisfaction history
 */
export interface TicketSatisfactionHistory extends BaseEntity, Timestamp {
  id: ID;
  satisfactionId: ID;
  ticketId: ID;
  userId: ID;
  action: 'submit' | 'update' | 'remind' | 'expire';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Ticket satisfaction validation
 */
export interface TicketSatisfactionValidation {
  isValid: boolean;
  satisfactionId: ID;
  ticketId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Ticket satisfaction export
 */
export interface TicketSatisfactionExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: TicketSatisfactionFilter;
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
  // Ticket Satisfaction
  TICKET_SATISFACTION,
  TicketSatisfactionLevel,
  TicketSatisfactionScore,
  TicketSatisfactionEmoji,
  TicketSatisfactionCategory,
  ticketSatisfactionGetLabel,
  ticketSatisfactionGetScore,
  ticketSatisfactionIsPositive,
  ticketSatisfactionIsNegative,
  ticketSatisfactionGetEmoji,
  ticketSatisfactionGetCategory,
};
