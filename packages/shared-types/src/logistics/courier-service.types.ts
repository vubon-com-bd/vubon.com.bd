/**
 * Courier Service Types
 * Type definitions for logistics courier services based on shared-constants
 * @module CourierServiceTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics courier
// ============================================================
import {
  // Courier Constants
  LogisticsCourierType,
  LogisticsCourierStatus,
  LogisticsCourierProvider,
  LogisticsCourierServiceType,
  LogisticsCourierPaymentMethod,
} from '@vubon/shared-constants';

// ============================================================
// Courier Service Extended Types
// ============================================================

/**
 * Courier service
 */
export interface CourierService extends BaseEntity, Timestamp {
  id: ID;
  courierId: ID;
  serviceType: LogisticsCourierServiceType;
  name: string;
  description?: string;
  deliveryTime: number;
  priceMultiplier: number;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Courier service filter
 */
export interface CourierServiceFilter {
  ids?: ID[];
  courierIds?: ID[];
  serviceTypes?: LogisticsCourierServiceType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  minDeliveryTime?: number;
  maxDeliveryTime?: number;
  minPriceMultiplier?: number;
  maxPriceMultiplier?: number;
  searchTerm?: string;
}

/**
 * Courier service statistics
 */
export interface CourierServiceStatistics {
  courierId: ID;
  totalServices: number;
  activeServices: number;
  byServiceType: Record<LogisticsCourierServiceType, number>;
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
  mostFrequentServiceType: LogisticsCourierServiceType;
}

/**
 * Courier service summary
 */
export interface CourierServiceSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalServices: number;
  active: number;
  byServiceType: Record<LogisticsCourierServiceType, number>;
  serviceTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topServiceTypes: {
    serviceType: LogisticsCourierServiceType;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    averageDeliveryTime: number;
    maxDeliveryTime: number;
    minDeliveryTime: number;
    averagePriceMultiplier: number;
  };
}

/**
 * Courier service configuration
 */
export interface CourierServiceConfiguration {
  enabled: boolean;
  defaultServiceType: LogisticsCourierServiceType;
  requireDescription: boolean;
  maxServicesPerCourier: number;
  autoAssign: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnStatusChange: boolean;
  alertConfig?: CourierServiceAlertConfig;
}

/**
 * Courier service alert configuration
 */
export interface CourierServiceAlertConfig {
  enabled: boolean;
  deliveryDelayAlert: boolean;
  deliveryDelayThreshold: number;
  priceChangeAlert: boolean;
  serviceUnavailableAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Courier service history
 */
export interface CourierServiceHistory extends BaseEntity, Timestamp {
  id: ID;
  serviceId: ID;
  courierId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'change';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Courier service validation
 */
export interface CourierServiceValidation {
  isValid: boolean;
  serviceId: ID;
  courierId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Courier service export
 */
export interface CourierServiceExport extends BaseEntity, Timestamp {
  id: ID;
  courierId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: CourierServiceFilter;
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
  LogisticsCourierType,
  LogisticsCourierStatus,
  LogisticsCourierProvider,
  LogisticsCourierServiceType,
  LogisticsCourierPaymentMethod,
};
