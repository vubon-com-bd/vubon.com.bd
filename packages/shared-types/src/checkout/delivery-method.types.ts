/**
 * Delivery Method Types
 * Type definitions for delivery methods based on shared-constants
 * @module DeliveryMethodTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants checkout
// ============================================================
import {
  // Delivery Method
  DELIVERY_METHOD,
  DeliveryMethodType,
  DeliveryCategory,
  DeliveryMethodStatus,
  DeliveryMethodDefault,
  DeliveryMethodLimit,
  deliverymethodGetMethodLabel,
  deliverymethodGetCategoryLabel,
  deliverymethodGetStatusLabel,
  deliverymethodIsStandard,
  deliverymethodIsExpedited,
  deliverymethodIsPickup,
  deliverymethodIsActive,
  deliverymethodGetDefaultMethod,
  deliverymethodGetDefaultDeliveryTime,
} from '@vubon/shared-constants';

// ============================================================
// Delivery Method Extended Types
// ============================================================

/**
 * Delivery method
 */
export interface DeliveryMethod extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: DeliveryMethodType;
  category: DeliveryCategory;
  status: DeliveryMethodStatus;
  isStandard: boolean;
  isExpedited: boolean;
  isPickup: boolean;
  isActive: boolean;
  name: string;
  description?: string;
  estimatedTime: number; // in hours
  cost: number;
  currency: string;
  metadata?: Metadata;
}

/**
 * Delivery method filter
 */
export interface DeliveryMethodFilter {
  userIds?: ID[];
  types?: DeliveryMethodType[];
  categories?: DeliveryCategory[];
  statuses?: DeliveryMethodStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isStandard?: boolean;
  isExpedited?: boolean;
  isPickup?: boolean;
  isActive?: boolean;
  minCost?: number;
  maxCost?: number;
  minEstimatedTime?: number;
  maxEstimatedTime?: number;
  searchTerm?: string;
}

/**
 * Delivery method statistics
 */
export interface DeliveryMethodStatistics {
  totalMethods: number;
  activeMethods: number;
  standardMethods: number;
  expeditedMethods: number;
  pickupMethods: number;
  byType: Record<DeliveryMethodType, number>;
  byCategory: Record<DeliveryCategory, number>;
  byStatus: Record<DeliveryMethodStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageCost: number;
  maxCost: number;
  minCost: number;
  averageEstimatedTime: number;
  maxEstimatedTime: number;
  minEstimatedTime: number;
  mostFrequentType: DeliveryMethodType;
  mostFrequentCategory: DeliveryCategory;
}

/**
 * Delivery method summary
 */
export interface DeliveryMethodSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  standard: number;
  expedited: number;
  pickup: number;
  byType: Record<DeliveryMethodType, number>;
  byCategory: Record<DeliveryCategory, number>;
  byStatus: Record<DeliveryMethodStatus, number>;
  methodTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: DeliveryMethodType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: DeliveryCategory;
    count: number;
    label: string;
  }[];
  topMethods: {
    method: DeliveryMethodType;
    cost: number;
    estimatedTime: number;
  }[];
}

/**
 * Delivery method configuration
 */
export interface DeliveryMethodConfiguration {
  enabled: boolean;
  defaultMethod: DeliveryMethodType;
  defaultCategory: DeliveryCategory;
  defaultDeliveryTime: number;
  allowStandard: boolean;
  allowExpedited: boolean;
  allowPickup: boolean;
  requireEstimate: boolean;
  maxDeliveryTime: number;
  minDeliveryTime: number;
  maxCost: number;
  minCost: number;
  currency: string;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnStatusChange: boolean;
  alertConfig?: DeliveryMethodAlertConfig;
}

/**
 * Delivery method alert configuration
 */
export interface DeliveryMethodAlertConfig {
  enabled: boolean;
  costThresholdAlert: boolean;
  timeThresholdAlert: boolean;
  unavailabilityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  costThreshold: number;
  timeThreshold: number;
}

/**
 * Delivery method history
 */
export interface DeliveryMethodHistory extends BaseEntity, Timestamp {
  id: ID;
  methodId: ID;
  userId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Delivery method availability
 */
export interface DeliveryMethodAvailability extends BaseEntity, Timestamp {
  id: ID;
  methodId: ID;
  userId: ID;
  isAvailable: boolean;
  availableFrom?: Date;
  availableTo?: Date;
  unavailableReason?: string;
  metadata?: Metadata;
}

/**
 * Delivery method estimate
 */
export interface DeliveryMethodEstimate extends BaseEntity, Timestamp {
  id: ID;
  methodId: ID;
  userId: ID;
  estimatedTime: number;
  estimatedCost: number;
  currency: string;
  isGuaranteed: boolean;
  calculatedAt: Date;
  expiresAt: Date;
  metadata?: Metadata;
}

/**
 * Delivery method validation
 */
export interface DeliveryMethodValidation {
  isValid: boolean;
  method: DeliveryMethodType;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Delivery method export
 */
export interface DeliveryMethodExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: DeliveryMethodFilter;
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
  // Delivery Method
  DELIVERY_METHOD,
  DeliveryMethodType,
  DeliveryCategory,
  DeliveryMethodStatus,
  DeliveryMethodDefault,
  DeliveryMethodLimit,
  deliverymethodGetMethodLabel,
  deliverymethodGetCategoryLabel,
  deliverymethodGetStatusLabel,
  deliverymethodIsStandard,
  deliverymethodIsExpedited,
  deliverymethodIsPickup,
  deliverymethodIsActive,
  deliverymethodGetDefaultMethod,
  deliverymethodGetDefaultDeliveryTime,
};
