/**
 * Courier Types
 * Type definitions for logistics courier based on shared-constants
 * @module CourierTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics courier
// ============================================================
import {
  // Courier Constants
  LOGISTICS_COURIER,
  LogisticsCourierType,
  LogisticsCourierStatus,
  LogisticsCourierProvider,
  LogisticsCourierServiceType,
  LogisticsCourierPaymentMethod,
  logisticsCourierGetTypeLabel,
  logisticsCourierGetStatusLabel,
  logisticsCourierGetProviderLabel,
  logisticsCourierGetServiceTypeLabel,
  logisticsCourierGetPaymentMethodLabel,
  logisticsCourierGetContact,
  logisticsCourierGetWebsite,
  logisticsCourierIsActive,
  logisticsCourierIsAvailable,
  logisticsCourierGetDeliveryTime,
  // Courier Status Constants
  LOGISTICS_COURIER_STATUS,
  LogisticsCourierStatusType,
  LogisticsCourierStatusCategory,
  LogisticsCourierStatusColor,
  LogisticsCourierStatusIcon,
  LogisticsCourierStatusTransition,
  logisticsCourierStatusGetLabel,
  logisticsCourierStatusGetCategory,
  logisticsCourierStatusIsOperational,
  logisticsCourierStatusIsAvailable,
  logisticsCourierStatusCanTransition,
  // Courier Type Constants
  LOGISTICS_COURIER_TYPE,
  LogisticsCourierTypeType,
  LogisticsCourierTypeCategory,
  LogisticsCourierTypeIcon,
  LogisticsCourierTypeColor,
  logisticsCourierTypeGetLabel,
  logisticsCourierTypeGetCategory,
  logisticsCourierTypeGetIcon,
  logisticsCourierTypeGetColor,
  logisticsCourierTypeGetDeliveryTime,
  logisticsCourierTypeGetPriceMultiplier,
  logisticsCourierTypeGetCoverage,
} from '@vubon/shared-constants';

// ============================================================
// Courier Extended Types
// ============================================================

/**
 * Courier
 */
export interface Courier extends BaseEntity, Timestamp {
  id: ID;
  type: LogisticsCourierTypeType;
  status: LogisticsCourierStatusType;
  provider: LogisticsCourierProvider;
  serviceType: LogisticsCourierServiceType;
  paymentMethod: LogisticsCourierPaymentMethod;
  name: string;
  code: string;
  contact: string;
  website: string;
  deliveryTime: number;
  isActive: boolean;
  isAvailable: boolean;
  metadata?: Metadata;
}

/**
 * Courier filter
 */
export interface CourierFilter {
  ids?: ID[];
  types?: LogisticsCourierTypeType[];
  statuses?: LogisticsCourierStatusType[];
  providers?: LogisticsCourierProvider[];
  serviceTypes?: LogisticsCourierServiceType[];
  paymentMethods?: LogisticsCourierPaymentMethod[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isAvailable?: boolean;
  searchTerm?: string;
}

/**
 * Courier statistics
 */
export interface CourierStatistics {
  totalCouriers: number;
  activeCouriers: number;
  availableCouriers: number;
  byType: Record<LogisticsCourierTypeType, number>;
  byStatus: Record<LogisticsCourierStatusType, number>;
  byProvider: Record<LogisticsCourierProvider, number>;
  byServiceType: Record<LogisticsCourierServiceType, number>;
  byPaymentMethod: Record<LogisticsCourierPaymentMethod, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageDeliveryTime: number;
  maxDeliveryTime: number;
  minDeliveryTime: number;
  mostFrequentType: LogisticsCourierTypeType;
  mostFrequentStatus: LogisticsCourierStatusType;
  mostFrequentProvider: LogisticsCourierProvider;
}

/**
 * Courier summary
 */
export interface CourierSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalCouriers: number;
  active: number;
  available: number;
  byType: Record<LogisticsCourierTypeType, number>;
  byStatus: Record<LogisticsCourierStatusType, number>;
  byProvider: Record<LogisticsCourierProvider, number>;
  byServiceType: Record<LogisticsCourierServiceType, number>;
  byPaymentMethod: Record<LogisticsCourierPaymentMethod, number>;
  courierTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: LogisticsCourierTypeType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: LogisticsCourierStatusType;
    count: number;
    label: string;
  }[];
  topProviders: {
    provider: LogisticsCourierProvider;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    averageDeliveryTime: number;
    maxDeliveryTime: number;
    minDeliveryTime: number;
    availabilityRate: number;
  };
}

/**
 * Courier configuration
 */
export interface CourierConfiguration {
  enabled: boolean;
  defaultType: LogisticsCourierTypeType;
  defaultProvider: LogisticsCourierProvider;
  defaultServiceType: LogisticsCourierServiceType;
  defaultPaymentMethod: LogisticsCourierPaymentMethod;
  requireContact: boolean;
  requireWebsite: boolean;
  maxCouriers: number;
  autoAssign: boolean;
  autoAssignStrategy: 'cost' | 'time' | 'preference' | 'availability';
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnStatusChange: boolean;
  alertConfig?: CourierAlertConfig;
}

/**
 * Courier alert configuration
 */
export interface CourierAlertConfig {
  enabled: boolean;
  availabilityAlert: boolean;
  performanceAlert: boolean;
  deliveryDelayAlert: boolean;
  deliveryDelayThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Courier history
 */
export interface CourierHistory extends BaseEntity, Timestamp {
  id: ID;
  courierId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'status_change' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Courier validation
 */
export interface CourierValidation {
  isValid: boolean;
  courierId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Courier export
 */
export interface CourierExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: CourierFilter;
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
  // Courier Constants
  LOGISTICS_COURIER,
  LogisticsCourierType,
  LogisticsCourierStatus,
  LogisticsCourierProvider,
  LogisticsCourierServiceType,
  LogisticsCourierPaymentMethod,
  logisticsCourierGetTypeLabel,
  logisticsCourierGetStatusLabel,
  logisticsCourierGetProviderLabel,
  logisticsCourierGetServiceTypeLabel,
  logisticsCourierGetPaymentMethodLabel,
  logisticsCourierGetContact,
  logisticsCourierGetWebsite,
  logisticsCourierIsActive,
  logisticsCourierIsAvailable,
  logisticsCourierGetDeliveryTime,
  // Courier Status Constants
  LOGISTICS_COURIER_STATUS,
  LogisticsCourierStatusType,
  LogisticsCourierStatusCategory,
  LogisticsCourierStatusColor,
  LogisticsCourierStatusIcon,
  LogisticsCourierStatusTransition,
  logisticsCourierStatusGetLabel,
  logisticsCourierStatusGetCategory,
  logisticsCourierStatusIsOperational,
  logisticsCourierStatusIsAvailable,
  logisticsCourierStatusCanTransition,
  // Courier Type Constants
  LOGISTICS_COURIER_TYPE,
  LogisticsCourierTypeType,
  LogisticsCourierTypeCategory,
  LogisticsCourierTypeIcon,
  LogisticsCourierTypeColor,
  logisticsCourierTypeGetLabel,
  logisticsCourierTypeGetCategory,
  logisticsCourierTypeGetIcon,
  logisticsCourierTypeGetColor,
  logisticsCourierTypeGetDeliveryTime,
  logisticsCourierTypeGetPriceMultiplier,
  logisticsCourierTypeGetCoverage,
};
