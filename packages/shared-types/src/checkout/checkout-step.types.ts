/**
 * Checkout Step Types
 * Type definitions for checkout steps based on shared-constants
 * @module CheckoutStepTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants checkout
// ============================================================
import {
  // Checkout Core
  CheckoutType,
  CheckoutMode,
  // Checkout Step
  CHECKOUT_STEP,
  CheckoutStepType,
  CheckoutStepStatus,
  CheckoutStepPosition,
  CheckoutStepIcon,
  CheckoutStepDefault,
  checkoutstepGetStepLabel,
  checkoutstepGetStepStatusLabel,
  checkoutstepGetStepPosition,
  checkoutstepGetStepIcon,
  checkoutstepIsValidStep,
  checkoutstepIsActive,
  checkoutstepIsCompleted,
  checkoutstepCanProceed,
  checkoutstepIsLocked,
  checkoutstepGetDefaultStep,
} from '@vubon/shared-constants';

// ============================================================
// Checkout Step Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Checkout step filter
 */
export interface CheckoutStepFilter {
  checkoutIds?: ID[];
  userIds?: ID[];
  steps?: CheckoutStepType[];
  statuses?: CheckoutStepStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isCompleted?: boolean;
  canProceed?: boolean;
  isLocked?: boolean;
  searchTerm?: string;
}

/**
 * Checkout step statistics
 */
export interface CheckoutStepStatistics {
  totalSteps: number;
  activeSteps: number;
  completedSteps: number;
  lockedSteps: number;
  byStep: Record<CheckoutStepType, number>;
  byStatus: Record<CheckoutStepStatus, number>;
  byPosition: Record<CheckoutStepPosition, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageDuration: number;
  maxDuration: number;
  minDuration: number;
  mostFrequentStep: CheckoutStepType;
  mostFrequentStatus: CheckoutStepStatus;
  abandonmentRateByStep: Record<CheckoutStepType, number>;
}

/**
 * Checkout step summary
 */
export interface CheckoutStepSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  completed: number;
  locked: number;
  byStep: Record<CheckoutStepType, number>;
  byStatus: Record<CheckoutStepStatus, number>;
  byPosition: Record<CheckoutStepPosition, number>;
  stepTrend: {
    date: Date;
    step: CheckoutStepType;
    count: number;
  }[];
  topSteps: {
    step: CheckoutStepType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: CheckoutStepStatus;
    count: number;
    label: string;
  }[];
  stepFlow: {
    from: CheckoutStepType;
    to: CheckoutStepType;
    count: number;
  }[];
}

/**
 * Checkout step configuration
 */
export interface CheckoutStepConfiguration {
  enabled: boolean;
  defaultStep: CheckoutStepType;
  allowSkip: boolean;
  allowBack: boolean;
  requireComplete: boolean;
  lockAfterComplete: boolean;
  autoTransition: boolean;
  transitionDelay: number;
  notificationOnEnter: boolean;
  notificationOnComplete: boolean;
  notificationOnLock: boolean;
  alertConfig?: CheckoutStepAlertConfig;
}

/**
 * Checkout step alert configuration
 */
export interface CheckoutStepAlertConfig {
  enabled: boolean;
  stepLockAlert: boolean;
  stepTimeoutAlert: boolean;
  stepAbandonmentAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  stepTimeoutThreshold: number;
  abandonmentThreshold: number;
}

/**
 * Checkout step history
 */
export interface CheckoutStepHistory extends BaseEntity, Timestamp {
  id: ID;
  stepId: ID;
  checkoutId: ID;
  userId: ID;
  action: 'enter' | 'complete' | 'skip' | 'back' | 'lock' | 'unlock';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Checkout step validation
 */
export interface CheckoutStepValidation {
  isValid: boolean;
  step: CheckoutStepType;
  checkoutId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Checkout step progress
 */
export interface CheckoutStepProgress {
  currentStep: CheckoutStepType;
  totalSteps: number;
  completedSteps: number;
  remainingSteps: number;
  progressPercentage: number;
  isComplete: boolean;
  isLocked: boolean;
  canProceed: boolean;
  nextStep?: CheckoutStepType;
  previousStep?: CheckoutStepType;
}

/**
 * Checkout step export
 */
export interface CheckoutStepExport extends BaseEntity, Timestamp {
  id: ID;
  checkoutId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: CheckoutStepFilter;
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
  // Checkout Core
  CheckoutType,
  CheckoutMode,
  // Checkout Step
  CHECKOUT_STEP,
  CheckoutStepType,
  CheckoutStepStatus,
  CheckoutStepPosition,
  CheckoutStepIcon,
  CheckoutStepDefault,
  checkoutstepGetStepLabel,
  checkoutstepGetStepStatusLabel,
  checkoutstepGetStepPosition,
  checkoutstepGetStepIcon,
  checkoutstepIsValidStep,
  checkoutstepIsActive,
  checkoutstepIsCompleted,
  checkoutstepCanProceed,
  checkoutstepIsLocked,
  checkoutstepGetDefaultStep,
};
