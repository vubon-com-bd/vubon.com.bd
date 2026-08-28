/**
 * Loyalty Types
 * Type definitions for loyalty programs based on shared-constants
 * @module LoyaltyTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants loyalty
// ============================================================
import {
  // Loyalty Core
  MARKETINGLOYALTY,
  MarketingLoyaltyProgram,
  MarketingLoyaltyType,
  MarketingLoyaltyStatus,
  MarketingLoyaltySource,
  MarketingLoyaltyDefault,
  MarketingLoyaltyLimit,
  marketingloyaltyGetProgramLabel,
  marketingloyaltyGetTypeLabel,
  marketingloyaltyGetSourceLabel,
  marketingloyaltyGetDefaultPointsPerPurchase,
  marketingloyaltyGetDefaultPointsExpiryDays,
  marketingloyaltyGetDefaultInactivityDays,
  marketingloyaltyIsInactiveStatus,
  // Loyalty Status
  MARKETINGLOYALTY_STATUS,
  MarketingLoyaltyStatusType,
  MarketingLoyaltyStatusColor,
  MarketingLoyaltyStatusCategory,
  MarketingLoyaltyStatusOrder,
  MarketingLoyaltyStatusTransition,
  marketingloyaltyGetStatusColor,
  marketingloyaltyGetStatusCategory,
  marketingloyaltyIsPendingStatus,
  marketingloyaltyCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Loyalty Extended Types
// ============================================================

/**
 * Loyalty Program
 */
export interface LoyaltyProgram extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  name: string;
  description?: string;
  program: MarketingLoyaltyProgram;
  type: MarketingLoyaltyType;
  status: MarketingLoyaltyStatusType;
  source: MarketingLoyaltySource;
  pointsPerPurchase: number;
  pointsExpiryDays: number;
  inactivityDays: number;
  isActive: boolean;
  isInactive: boolean;
  isPending: boolean;
  isTerminated: boolean;
  startedAt: Date;
  endedAt?: Date;
  metadata?: Metadata;
}

/**
 * Loyalty Filter
 */
export interface LoyaltyFilter {
  ids?: ID[];
  userIds?: ID[];
  programs?: MarketingLoyaltyProgram[];
  types?: MarketingLoyaltyType[];
  statuses?: MarketingLoyaltyStatusType[];
  sources?: MarketingLoyaltySource[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isInactive?: boolean;
  isPending?: boolean;
  isTerminated?: boolean;
  searchTerm?: string;
}

/**
 * Loyalty Statistics
 */
export interface LoyaltyStatistics {
  userId: ID;
  totalLoyaltyPrograms: number;
  activePrograms: number;
  inactivePrograms: number;
  pendingPrograms: number;
  terminatedPrograms: number;
  byProgram: Record<MarketingLoyaltyProgram, number>;
  byType: Record<MarketingLoyaltyType, number>;
  byStatus: Record<MarketingLoyaltyStatusType, number>;
  bySource: Record<MarketingLoyaltySource, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averagePointsPerPurchase: number;
  maxPointsPerPurchase: number;
  minPointsPerPurchase: number;
  averagePointsExpiryDays: number;
  maxPointsExpiryDays: number;
  minPointsExpiryDays: number;
  mostFrequentProgram: MarketingLoyaltyProgram;
  mostFrequentType: MarketingLoyaltyType;
  mostFrequentStatus: MarketingLoyaltyStatusType;
}

/**
 * Loyalty Summary
 */
export interface LoyaltySummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPrograms: number;
  active: number;
  inactive: number;
  pending: number;
  terminated: number;
  byProgram: Record<MarketingLoyaltyProgram, number>;
  byType: Record<MarketingLoyaltyType, number>;
  byStatus: Record<MarketingLoyaltyStatusType, number>;
  bySource: Record<MarketingLoyaltySource, number>;
  loyaltyTrend: {
    date: Date;
    total: number;
    active: number;
    inactive: number;
  }[];
  topPrograms: {
    program: MarketingLoyaltyProgram;
    count: number;
    label: string;
  }[];
  topTypes: {
    type: MarketingLoyaltyType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: MarketingLoyaltyStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * Loyalty Configuration
 */
export interface LoyaltyConfiguration {
  enabled: boolean;
  defaultProgram: MarketingLoyaltyProgram;
  defaultType: MarketingLoyaltyType;
  defaultSource: MarketingLoyaltySource;
  defaultStatus: MarketingLoyaltyStatusType;
  defaultPointsPerPurchase: number;
  defaultPointsExpiryDays: number;
  defaultInactivityDays: number;
  maxLoyaltyProgramsPerUser: number;
  allowMultiplePrograms: boolean;
  allowMultipleTypes: boolean;
  requireApproval: boolean;
  autoStart: boolean;
  notificationOnCreate: boolean;
  notificationOnStart: boolean;
  notificationOnEnd: boolean;
  notificationOnInactivity: boolean;
  notificationOnDelete: boolean;
  alertConfig?: LoyaltyAlertConfig;
}

/**
 * Loyalty Alert Configuration
 */
export interface LoyaltyAlertConfig {
  enabled: boolean;
  inactivityAlert: boolean;
  inactivityThreshold: number;
  expiryAlert: boolean;
  expiryThreshold: number;
  performanceAlert: boolean;
  performanceThreshold: number;
  pendingApprovalAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Loyalty History
 */
export interface LoyaltyHistory extends BaseEntity, Timestamp {
  id: ID;
  loyaltyId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'start'
    | 'pause'
    | 'resume'
    | 'end'
    | 'archive'
    | 'restore'
    | 'delete'
    | 'points_earned'
    | 'points_redeemed'
    | 'points_expired';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Loyalty Validation
 */
export interface LoyaltyValidation {
  isValid: boolean;
  loyaltyId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Loyalty Export
 */
export interface LoyaltyExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: LoyaltyFilter;
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
  // Loyalty Core
  MARKETINGLOYALTY,
  MarketingLoyaltyProgram,
  MarketingLoyaltyType,
  MarketingLoyaltyStatus,
  MarketingLoyaltySource,
  MarketingLoyaltyDefault,
  MarketingLoyaltyLimit,
  marketingloyaltyGetProgramLabel,
  marketingloyaltyGetTypeLabel,
  marketingloyaltyGetSourceLabel,
  marketingloyaltyGetDefaultPointsPerPurchase,
  marketingloyaltyGetDefaultPointsExpiryDays,
  marketingloyaltyGetDefaultInactivityDays,
  marketingloyaltyIsInactiveStatus,
  // Loyalty Status
  MARKETINGLOYALTY_STATUS,
  MarketingLoyaltyStatusType,
  MarketingLoyaltyStatusColor,
  MarketingLoyaltyStatusCategory,
  MarketingLoyaltyStatusOrder,
  MarketingLoyaltyStatusTransition,
  marketingloyaltyGetStatusColor,
  marketingloyaltyGetStatusCategory,
  marketingloyaltyIsPendingStatus,
  marketingloyaltyCanTransition,
};
