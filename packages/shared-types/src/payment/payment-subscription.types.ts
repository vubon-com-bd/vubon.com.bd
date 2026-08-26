/**
 * Payment Subscription Types
 * Type definitions for payment subscriptions based on shared-constants
 * @module PaymentSubscriptionTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants checkout
// ============================================================
import {
  // Payment Status
  PaymentStatusType,
  // Payment Method
  PaymentMethodType,
  // Payment Gateway
  PaymentGatewayType,
  // Transaction Type
  TransactionTypeType,
  TransactionCategory,
  TransactionDirection,
  // Transaction Status
  TransactionStatusType,
} from '@vubon/shared-constants';

// ============================================================
// Payment Subscription Extended Types
// ============================================================

/**
 * Subscription plan
 */
export interface SubscriptionPlan extends BaseEntity, Timestamp {
  id: ID;
  name: string;
  description?: string;
  amount: number;
  currency: string;
  interval: 'day' | 'week' | 'month' | 'quarter' | 'year';
  intervalCount: number;
  trialPeriodDays?: number;
  trialAmount?: number;
  setupFee?: number;
  cancellationFee?: number;
  maxCycles?: number;
  isActive: boolean;
  isFeatured: boolean;
  metadata?: Metadata;
}

/**
 * Payment subscription
 */
export interface PaymentSubscription extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  planId: ID;
  orderId?: ID;
  method: PaymentMethodType;
  gateway: PaymentGatewayType;
  status:
    | 'active'
    | 'trialing'
    | 'past_due'
    | 'paused'
    | 'cancelled'
    | 'expired'
    | 'incomplete'
    | 'incomplete_expired';
  amount: number;
  currency: string;
  startDate: Date;
  trialStartDate?: Date;
  trialEndDate?: Date;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  cancelledAt?: Date;
  endedAt?: Date;
  metadata?: Metadata;
}

/**
 * Subscription invoice
 */
export interface SubscriptionInvoice extends BaseEntity, Timestamp {
  id: ID;
  subscriptionId: ID;
  userId: ID;
  amount: number;
  currency: string;
  status: 'draft' | 'open' | 'paid' | 'uncollectible' | 'void' | 'pending' | 'failed';
  periodStart: Date;
  periodEnd: Date;
  dueDate?: Date;
  paidAt?: Date;
  transactionId?: string;
  gatewayReference?: string;
  metadata?: Metadata;
}

/**
 * Subscription filter
 */
export interface SubscriptionFilter {
  ids?: ID[];
  userIds?: ID[];
  planIds?: ID[];
  orderIds?: ID[];
  statuses?: (
    | 'active'
    | 'trialing'
    | 'past_due'
    | 'paused'
    | 'cancelled'
    | 'expired'
    | 'incomplete'
    | 'incomplete_expired'
  )[];
  methods?: PaymentMethodType[];
  gateways?: PaymentGatewayType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minAmount?: number;
  maxAmount?: number;
  isActive?: boolean;
  isTrialing?: boolean;
  isPastDue?: boolean;
  isPaused?: boolean;
  isCancelled?: boolean;
  isExpired?: boolean;
  isIncomplete?: boolean;
  hasTrial?: boolean;
  cancelAtPeriodEnd?: boolean;
  searchTerm?: string;
}

/**
 * Subscription statistics
 */
export interface SubscriptionStatistics {
  userId: ID;
  totalSubscriptions: number;
  activeSubscriptions: number;
  trialingSubscriptions: number;
  pastDueSubscriptions: number;
  pausedSubscriptions: number;
  cancelledSubscriptions: number;
  expiredSubscriptions: number;
  incompleteSubscriptions: number;
  byStatus: Record<string, number>;
  byMethod: Record<PaymentMethodType, number>;
  byGateway: Record<PaymentGatewayType, number>;
  byPlan: Record<ID, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalAmount: number;
  averageAmount: number;
  maxAmount: number;
  minAmount: number;
  totalTrials: number;
  totalCancelAtPeriodEnd: number;
  churnRate: number;
  retentionRate: number;
  mostFrequentStatus: string;
  mostFrequentMethod: PaymentMethodType;
  mostFrequentGateway: PaymentGatewayType;
  mostFrequentPlan: ID;
}

/**
 * Subscription summary
 */
export interface SubscriptionSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSubscriptions: number;
  active: number;
  trialing: number;
  pastDue: number;
  paused: number;
  cancelled: number;
  expired: number;
  incomplete: number;
  byStatus: Record<string, number>;
  byMethod: Record<PaymentMethodType, number>;
  byGateway: Record<PaymentGatewayType, number>;
  byPlan: Record<ID, number>;
  subscriptionTrend: {
    date: Date;
    total: number;
    active: number;
    cancelled: number;
  }[];
  topStatuses: {
    status: string;
    count: number;
    label: string;
  }[];
  topMethods: {
    method: PaymentMethodType;
    count: number;
    label: string;
  }[];
  topGateways: {
    gateway: PaymentGatewayType;
    count: number;
    label: string;
  }[];
  topPlans: {
    planId: ID;
    name: string;
    count: number;
  }[];
  financialSummary: {
    totalAmount: number;
    averageAmount: number;
    maxAmount: number;
    minAmount: number;
    totalRevenue: number;
    churnRevenue: number;
    netRevenue: number;
  };
}

/**
 * Subscription configuration
 */
export interface SubscriptionConfiguration {
  enabled: boolean;
  defaultMethod: PaymentMethodType;
  defaultGateway: PaymentGatewayType;
  requirePaymentMethod: boolean;
  requirePlan: boolean;
  allowTrial: boolean;
  defaultTrialDays: number;
  allowPause: boolean;
  allowCancel: boolean;
  cancelAtPeriodEnd: boolean;
  gracePeriodDays: number;
  notificationOnCreate: boolean;
  notificationOnPayment: boolean;
  notificationOnFailure: boolean;
  notificationOnPause: boolean;
  notificationOnCancel: boolean;
  notificationOnExpiry: boolean;
  notificationOnTrialEnd: boolean;
  alertConfig?: SubscriptionAlertConfig;
}

/**
 * Subscription alert configuration
 */
export interface SubscriptionAlertConfig {
  enabled: boolean;
  paymentFailureAlert: boolean;
  trialEndAlert: boolean;
  expiryAlert: boolean;
  highChurnRateAlert: boolean;
  highChurnRateThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Subscription history
 */
export interface SubscriptionHistory extends BaseEntity, Timestamp {
  id: ID;
  subscriptionId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'pause'
    | 'resume'
    | 'cancel'
    | 'expire'
    | 'payment_success'
    | 'payment_failure'
    | 'trial_start'
    | 'trial_end'
    | 'plan_change';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Subscription validation
 */
export interface SubscriptionValidation {
  isValid: boolean;
  subscriptionId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Subscription export
 */
export interface SubscriptionExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: SubscriptionFilter;
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
  // Payment Status
  PaymentStatusType,
  // Payment Method
  PaymentMethodType,
  // Payment Gateway
  PaymentGatewayType,
  // Transaction Type
  TransactionTypeType,
  TransactionCategory,
  TransactionDirection,
  // Transaction Status
  TransactionStatusType,
};
