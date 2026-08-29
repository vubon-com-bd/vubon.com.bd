/**
 * Shipping Method Types
 * Type definitions for logistics shipping methods based on shared-constants
 * @module ShippingMethodTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics shipping
// ============================================================
import {
  // Shipping Method Constants
  LOGISTICS_SHIPPING_METHOD,
  LogisticsShippingMethod,
  LogisticsShippingMethodType,
  LogisticsShippingMethodStatus,
  logisticsShippingMethodGetLabel,
  logisticsShippingMethodGetTypeLabel,
  logisticsShippingMethodGetStatusLabel,
  logisticsShippingMethodGetDeliveryTime,
  logisticsShippingMethodGetPriceMultiplier,
  logisticsShippingMethodIsActive,
  logisticsShippingMethodIsAvailable,
  logisticsShippingMethodGetLimits,
  // Shipping Method Type Constants
  LOGISTICS_SHIPPING_METHOD_TYPE,
  LogisticsShippingMethodTypeCategory,
  LogisticsShippingMethodTypeIcon,
  LogisticsShippingMethodTypeColor,
  logisticsShippingMethodTypeGetLabel,
  logisticsShippingMethodTypeGetIcon,
  logisticsShippingMethodTypeGetColor,
  logisticsShippingMethodTypeGetServiceLevel,
  logisticsShippingMethodTypeHasTracking,
  logisticsShippingMethodTypeHasInsurance,
} from '@vubon/shared-constants';

// ============================================================
// Shipping Method Extended Types
// ============================================================

/**
 * Shipping method
 */
export interface ShippingMethod extends BaseEntity, Timestamp {
  id: ID;
  method: LogisticsShippingMethod;
  type: LogisticsShippingMethodType;
  status: LogisticsShippingMethodStatus;
  label: string;
  deliveryTime: number;
  priceMultiplier: number;
  isActive: boolean;
  isAvailable: boolean;
  limits: {
    minWeight: number;
    maxWeight: number;
    minItems: number;
    maxItems: number;
  };
  metadata?: Metadata;
}

/**
 * Shipping method filter
 */
export interface ShippingMethodFilter {
  ids?: ID[];
  methods?: LogisticsShippingMethod[];
  types?: LogisticsShippingMethodType[];
  statuses?: LogisticsShippingMethodStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isAvailable?: boolean;
  minDeliveryTime?: number;
  maxDeliveryTime?: number;
  minPriceMultiplier?: number;
  maxPriceMultiplier?: number;
  searchTerm?: string;
}

/**
 * Shipping method statistics
 */
export interface ShippingMethodStatistics {
  totalMethods: number;
  activeMethods: number;
  availableMethods: number;
  byMethod: Record<LogisticsShippingMethod, number>;
  byType: Record<LogisticsShippingMethodType, number>;
  byStatus: Record<LogisticsShippingMethodStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageDeliveryTime: number;
  maxDeliveryTime: number;
  minDeliveryTime: number;
  averagePriceMultiplier: number;
  maxPriceMultiplier: number;
  minPriceMultiplier: number;
  mostFrequentMethod: LogisticsShippingMethod;
  mostFrequentType: LogisticsShippingMethodType;
  mostFrequentStatus: LogisticsShippingMethodStatus;
}

/**
 * Shipping method summary
 */
export interface ShippingMethodSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalMethods: number;
  active: number;
  available: number;
  byMethod: Record<LogisticsShippingMethod, number>;
  byType: Record<LogisticsShippingMethodType, number>;
  byStatus: Record<LogisticsShippingMethodStatus, number>;
  methodTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topMethods: {
    method: LogisticsShippingMethod;
    count: number;
    label: string;
  }[];
  topTypes: {
    type: LogisticsShippingMethodType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: LogisticsShippingMethodStatus;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    averageDeliveryTime: number;
    maxDeliveryTime: number;
    minDeliveryTime: number;
    averagePriceMultiplier: number;
  };
  limitsSummary: {
    averageMinWeight: number;
    averageMaxWeight: number;
    averageMinItems: number;
    averageMaxItems: number;
  };
}

/**
 * Shipping method configuration
 */
export interface ShippingMethodConfiguration {
  enabled: boolean;
  defaultMethod: LogisticsShippingMethod;
  defaultType: LogisticsShippingMethodType;
  defaultStatus: LogisticsShippingMethodStatus;
  requireLimits: boolean;
  requireDeliveryTime: boolean;
  maxMethods: number;
  autoAssign: boolean;
  autoAssignStrategy: 'time' | 'cost' | 'preference' | 'availability';
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnStatusChange: boolean;
  alertConfig?: ShippingMethodAlertConfig;
}

/**
 * Shipping method alert configuration
 */
export interface ShippingMethodAlertConfig {
  enabled: boolean;
  availabilityAlert: boolean;
  deliveryTimeAlert: boolean;
  deliveryTimeThreshold: number;
  priceChangeAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Shipping method history
 */
export interface ShippingMethodHistory extends BaseEntity, Timestamp {
  id: ID;
  methodId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'status_change' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Shipping method validation
 */
export interface ShippingMethodValidation {
  isValid: boolean;
  methodId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Shipping method export
 */
export interface ShippingMethodExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ShippingMethodFilter;
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
  // Shipping Method Constants
  LOGISTICS_SHIPPING_METHOD,
  LogisticsShippingMethod,
  LogisticsShippingMethodType,
  LogisticsShippingMethodStatus,
  logisticsShippingMethodGetLabel,
  logisticsShippingMethodGetTypeLabel,
  logisticsShippingMethodGetStatusLabel,
  logisticsShippingMethodGetDeliveryTime,
  logisticsShippingMethodGetPriceMultiplier,
  logisticsShippingMethodIsActive,
  logisticsShippingMethodIsAvailable,
  logisticsShippingMethodGetLimits,
  // Shipping Method Type Constants
  LOGISTICS_SHIPPING_METHOD_TYPE,
  LogisticsShippingMethodTypeCategory,
  LogisticsShippingMethodTypeIcon,
  LogisticsShippingMethodTypeColor,
  logisticsShippingMethodTypeGetLabel,
  logisticsShippingMethodTypeGetIcon,
  logisticsShippingMethodTypeGetColor,
  logisticsShippingMethodTypeGetServiceLevel,
  logisticsShippingMethodTypeHasTracking,
  logisticsShippingMethodTypeHasInsurance,
};
