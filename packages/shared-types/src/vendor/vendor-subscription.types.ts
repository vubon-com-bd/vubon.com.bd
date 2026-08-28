/**
 * Vendor Subscription Types
 * Type definitions for vendor subscriptions based on shared-constants
 * @module VendorSubscriptionTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor subscription
// ============================================================
import {
  // Vendor Subscription
  VENDOR_SUBSCRIPTION_TYPES,
  VENDOR_SUBSCRIPTION_STATUSES,
  VENDOR_SUBSCRIPTION_BILLING_CYCLES,
  VENDOR_SUBSCRIPTION_FEATURES,
  VENDOR_SUBSCRIPTION_PAYMENT_METHODS,
  VENDOR_SUBSCRIPTION_LIMITS,
  VENDOR_SUBSCRIPTION_PRICING,
  VendorSubscriptionType,
  VendorSubscriptionStatus,
  VendorBillingCycle,
  VendorSubscriptionFeature,
  VendorSubscriptionPaymentMethod,
  VendorSubscriptionLimits,
  VendorSubscriptionPricing,
  vendorSubscriptionGetTypeLabel,
  vendorSubscriptionGetStatusLabel,
  vendorSubscriptionGetBillingCycleLabel,
  vendorSubscriptionGetPaymentMethodLabel,
  vendorSubscriptionIsActive,
  vendorSubscriptionCanRenew,
  vendorSubscriptionGetPlanLimits,
  // Vendor Subscription Status
  VENDOR_SUBSCRIPTION_STATUS,
  VendorSubscriptionStatusType,
  VendorSubscriptionStatusCategory,
  VendorSubscriptionStatusColor,
  VendorSubscriptionStatusIcon,
  VendorSubscriptionStatusTransition,
  vendorSubscriptionStatusGetLabel,
  vendorSubscriptionStatusIsActive,
  vendorSubscriptionStatusIsPending,
  vendorSubscriptionStatusIsTerminated,
  vendorSubscriptionStatusGetCategory,
  vendorSubscriptionStatusCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Subscription Extended Types
// ============================================================

/**
 * Vendor subscription
 */
export interface VendorSubscription extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  type: VendorSubscriptionType;
  status: VendorSubscriptionStatusType;
  billingCycle: VendorBillingCycle;
  paymentMethod: VendorSubscriptionPaymentMethod;
  features: VendorSubscriptionFeature[];
  limits: VendorSubscriptionLimits;
  pricing: VendorSubscriptionPricing;
  isActive: boolean;
  canRenew: boolean;
  isPending: boolean;
  isTerminated: boolean;
  startDate: Date;
  endDate?: Date;
  nextBillingDate?: Date;
  lastBillingDate?: Date;
  metadata?: Metadata;
}

/**
 * Vendor subscription filter
 */
export interface VendorSubscriptionFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  types?: VendorSubscriptionType[];
  statuses?: VendorSubscriptionStatusType[];
  billingCycles?: VendorBillingCycle[];
  paymentMethods?: VendorSubscriptionPaymentMethod[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  canRenew?: boolean;
  isPending?: boolean;
  isTerminated?: boolean;
  searchTerm?: string;
}

/**
 * Vendor subscription statistics
 */
export interface VendorSubscriptionStatistics {
  vendorId: ID;
  totalSubscriptions: number;
  activeSubscriptions: number;
  pendingSubscriptions: number;
  terminatedSubscriptions: number;
  byType: Record<VendorSubscriptionType, number>;
  byStatus: Record<VendorSubscriptionStatusType, number>;
  byBillingCycle: Record<VendorBillingCycle, number>;
  byPaymentMethod: Record<VendorSubscriptionPaymentMethod, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averagePricing: number;
  maxPricing: number;
  minPricing: number;
  totalRevenue: number;
  mostFrequentType: VendorSubscriptionType;
  mostFrequentStatus: VendorSubscriptionStatusType;
  mostFrequentBillingCycle: VendorBillingCycle;
  mostFrequentPaymentMethod: VendorSubscriptionPaymentMethod;
}

/**
 * Vendor subscription summary
 */
export interface VendorSubscriptionSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSubscriptions: number;
  active: number;
  pending: number;
  terminated: number;
  byType: Record<VendorSubscriptionType, number>;
  byStatus: Record<VendorSubscriptionStatusType, number>;
  byBillingCycle: Record<VendorBillingCycle, number>;
  byPaymentMethod: Record<VendorSubscriptionPaymentMethod, number>;
  subscriptionTrend: {
    date: Date;
    total: number;
    active: number;
    terminated: number;
  }[];
  topTypes: {
    type: VendorSubscriptionType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: VendorSubscriptionStatusType;
    count: number;
    label: string;
  }[];
  topBillingCycles: {
    cycle: VendorBillingCycle;
    count: number;
    label: string;
  }[];
  topPaymentMethods: {
    method: VendorSubscriptionPaymentMethod;
    count: number;
    label: string;
  }[];
  financialSummary: {
    totalRevenue: number;
    averagePricing: number;
    maxPricing: number;
    minPricing: number;
  };
}

/**
 * Vendor subscription configuration
 */
export interface VendorSubscriptionConfiguration {
  enabled: boolean;
  defaultType: VendorSubscriptionType;
  defaultBillingCycle: VendorBillingCycle;
  defaultPaymentMethod: VendorSubscriptionPaymentMethod;
  allowAutoRenew: boolean;
  allowTrial: boolean;
  trialPeriodDays: number;
  cancellationWindowDays: number;
  maxSubscriptionsPerVendor: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnRenew: boolean;
  notificationOnExpiry: boolean;
  notificationOnCancellation: boolean;
  alertConfig?: VendorSubscriptionAlertConfig;
}

/**
 * Vendor subscription alert configuration
 */
export interface VendorSubscriptionAlertConfig {
  enabled: boolean;
  expiryAlert: boolean;
  expiryThresholdDays: number;
  cancellationAlert: boolean;
  renewalFailureAlert: boolean;
  paymentFailureAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor subscription history
 */
export interface VendorSubscriptionHistory extends BaseEntity, Timestamp {
  id: ID;
  subscriptionId: ID;
  vendorId: ID;
  userId: ID;
  action: 'create' | 'update' | 'renew' | 'cancel' | 'terminate' | 'expire' | 'pause' | 'resume';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor subscription validation
 */
export interface VendorSubscriptionValidation {
  isValid: boolean;
  subscriptionId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor subscription export
 */
export interface VendorSubscriptionExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorSubscriptionFilter;
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
  // Vendor Subscription
  VENDOR_SUBSCRIPTION_TYPES,
  VENDOR_SUBSCRIPTION_STATUSES,
  VENDOR_SUBSCRIPTION_BILLING_CYCLES,
  VENDOR_SUBSCRIPTION_FEATURES,
  VENDOR_SUBSCRIPTION_PAYMENT_METHODS,
  VENDOR_SUBSCRIPTION_LIMITS,
  VENDOR_SUBSCRIPTION_PRICING,
  VendorSubscriptionType,
  VendorSubscriptionStatus,
  VendorBillingCycle,
  VendorSubscriptionFeature,
  VendorSubscriptionPaymentMethod,
  VendorSubscriptionLimits,
  VendorSubscriptionPricing,
  vendorSubscriptionGetTypeLabel,
  vendorSubscriptionGetStatusLabel,
  vendorSubscriptionGetBillingCycleLabel,
  vendorSubscriptionGetPaymentMethodLabel,
  vendorSubscriptionIsActive,
  vendorSubscriptionCanRenew,
  vendorSubscriptionGetPlanLimits,
  // Vendor Subscription Status
  VENDOR_SUBSCRIPTION_STATUS,
  VendorSubscriptionStatusType,
  VendorSubscriptionStatusCategory,
  VendorSubscriptionStatusColor,
  VendorSubscriptionStatusIcon,
  VendorSubscriptionStatusTransition,
  vendorSubscriptionStatusGetLabel,
  vendorSubscriptionStatusIsActive,
  vendorSubscriptionStatusIsPending,
  vendorSubscriptionStatusIsTerminated,
  vendorSubscriptionStatusGetCategory,
  vendorSubscriptionStatusCanTransition,
};
