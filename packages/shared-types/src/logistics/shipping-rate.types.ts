/**
 * Shipping Rate Types
 * Type definitions for logistics shipping rates based on shared-constants
 * @module ShippingRateTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics shipping
// ============================================================
import {
  // Shipping Rate Constants
  LOGISTICS_SHIPPING_RATE,
  LogisticsShippingRateType,
  LogisticsShippingRateStatus,
  LogisticsShippingRateZone,
  LogisticsShippingRateCalculation,
  logisticsShippingRateGetTypeLabel,
  logisticsShippingRateGetStatusLabel,
  logisticsShippingRateGetZoneLabel,
  logisticsShippingRateGetBaseRate,
  logisticsShippingRateGetWeightRate,
  logisticsShippingRateIsActive,
  logisticsShippingRateCalculate,
  // Shipping Rate Type Constants
  LOGISTICS_SHIPPING_RATE_TYPE,
  LogisticsShippingRateTypeCategory,
  LogisticsShippingRateTypeIcon,
  LogisticsShippingRateTypeColor,
  logisticsShippingRateTypeGetLabel,
  logisticsShippingRateTypeGetIcon,
  logisticsShippingRateTypeGetColor,
  logisticsShippingRateTypeGetComplexity,
  logisticsShippingRateTypeGetAccuracy,
} from '@vubon/shared-constants';

// ============================================================
// Shipping Rate Extended Types
// ============================================================

/**
 * Shipping rate
 */
export interface ShippingRate extends BaseEntity, Timestamp {
  id: ID;
  type: LogisticsShippingRateType;
  status: LogisticsShippingRateStatus;
  zone: LogisticsShippingRateZone;
  baseRate: number;
  weightRate: number;
  currency: string;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Shipping rate filter
 */
export interface ShippingRateFilter {
  ids?: ID[];
  types?: LogisticsShippingRateType[];
  statuses?: LogisticsShippingRateStatus[];
  zones?: LogisticsShippingRateZone[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  minBaseRate?: number;
  maxBaseRate?: number;
  minWeightRate?: number;
  maxWeightRate?: number;
  searchTerm?: string;
}

/**
 * Shipping rate statistics
 */
export interface ShippingRateStatistics {
  totalRates: number;
  activeRates: number;
  byType: Record<LogisticsShippingRateType, number>;
  byStatus: Record<LogisticsShippingRateStatus, number>;
  byZone: Record<LogisticsShippingRateZone, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageBaseRate: number;
  maxBaseRate: number;
  minBaseRate: number;
  averageWeightRate: number;
  maxWeightRate: number;
  minWeightRate: number;
  mostFrequentType: LogisticsShippingRateType;
  mostFrequentStatus: LogisticsShippingRateStatus;
  mostFrequentZone: LogisticsShippingRateZone;
}

/**
 * Shipping rate summary
 */
export interface ShippingRateSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalRates: number;
  active: number;
  byType: Record<LogisticsShippingRateType, number>;
  byStatus: Record<LogisticsShippingRateStatus, number>;
  byZone: Record<LogisticsShippingRateZone, number>;
  rateTrend: {
    date: Date;
    averageBaseRate: number;
    averageWeightRate: number;
  }[];
  topTypes: {
    type: LogisticsShippingRateType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: LogisticsShippingRateStatus;
    count: number;
    label: string;
  }[];
  topZones: {
    zone: LogisticsShippingRateZone;
    count: number;
    label: string;
  }[];
  financialSummary: {
    averageBaseRate: number;
    maxBaseRate: number;
    minBaseRate: number;
    averageWeightRate: number;
    maxWeightRate: number;
    minWeightRate: number;
  };
}

/**
 * Shipping rate configuration
 */
export interface ShippingRateConfiguration {
  enabled: boolean;
  defaultType: LogisticsShippingRateType;
  defaultStatus: LogisticsShippingRateStatus;
  defaultZone: LogisticsShippingRateZone;
  defaultCurrency: string;
  requireBaseRate: boolean;
  requireWeightRate: boolean;
  maxRates: number;
  autoCalculate: boolean;
  calculateStrategy: 'weight' | 'zone' | 'both' | 'fixed';
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnChange: boolean;
  alertConfig?: ShippingRateAlertConfig;
}

/**
 * Shipping rate alert configuration
 */
export interface ShippingRateAlertConfig {
  enabled: boolean;
  rateChangeAlert: boolean;
  rateChangeThreshold: number;
  minimumRateAlert: boolean;
  maximumRateAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Shipping rate history
 */
export interface ShippingRateHistory extends BaseEntity, Timestamp {
  id: ID;
  rateId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'change';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Shipping rate validation
 */
export interface ShippingRateValidation {
  isValid: boolean;
  rateId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Shipping rate export
 */
export interface ShippingRateExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ShippingRateFilter;
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
  // Shipping Rate Constants
  LOGISTICS_SHIPPING_RATE,
  LogisticsShippingRateType,
  LogisticsShippingRateStatus,
  LogisticsShippingRateZone,
  LogisticsShippingRateCalculation,
  logisticsShippingRateGetTypeLabel,
  logisticsShippingRateGetStatusLabel,
  logisticsShippingRateGetZoneLabel,
  logisticsShippingRateGetBaseRate,
  logisticsShippingRateGetWeightRate,
  logisticsShippingRateIsActive,
  logisticsShippingRateCalculate,
  // Shipping Rate Type Constants
  LOGISTICS_SHIPPING_RATE_TYPE,
  LogisticsShippingRateTypeCategory,
  LogisticsShippingRateTypeIcon,
  LogisticsShippingRateTypeColor,
  logisticsShippingRateTypeGetLabel,
  logisticsShippingRateTypeGetIcon,
  logisticsShippingRateTypeGetColor,
  logisticsShippingRateTypeGetComplexity,
  logisticsShippingRateTypeGetAccuracy,
};
