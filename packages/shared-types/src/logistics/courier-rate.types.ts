/**
 * Courier Rate Types
 * Type definitions for logistics courier rates based on shared-constants
 * @module CourierRateTypes
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
// Courier Rate Extended Types
// ============================================================

/**
 * Courier rate
 */
export interface CourierRate extends BaseEntity, Timestamp {
  id: ID;
  courierId: ID;
  zoneId: ID;
  baseRate: number;
  ratePerKg: number;
  ratePerKm: number;
  minimumRate: number;
  maximumRate: number;
  currency: string;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Courier rate filter
 */
export interface CourierRateFilter {
  ids?: ID[];
  courierIds?: ID[];
  zoneIds?: ID[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  minBaseRate?: number;
  maxBaseRate?: number;
  minRatePerKg?: number;
  maxRatePerKg?: number;
  minRatePerKm?: number;
  maxRatePerKm?: number;
  searchTerm?: string;
}

/**
 * Courier rate statistics
 */
export interface CourierRateStatistics {
  courierId: ID;
  totalRates: number;
  activeRates: number;
  byZone: Record<ID, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageBaseRate: number;
  maxBaseRate: number;
  minBaseRate: number;
  averageRatePerKg: number;
  maxRatePerKg: number;
  minRatePerKg: number;
  averageRatePerKm: number;
  maxRatePerKm: number;
  minRatePerKm: number;
}

/**
 * Courier rate summary
 */
export interface CourierRateSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalRates: number;
  active: number;
  byZone: Record<ID, number>;
  rateTrend: {
    date: Date;
    averageRate: number;
    minRate: number;
    maxRate: number;
  }[];
  topZones: {
    zoneId: ID;
    rateCount: number;
    averageRate: number;
  }[];
  financialSummary: {
    averageBaseRate: number;
    averageRatePerKg: number;
    averageRatePerKm: number;
    minRate: number;
    maxRate: number;
  };
}

/**
 * Courier rate configuration
 */
export interface CourierRateConfiguration {
  enabled: boolean;
  defaultCurrency: string;
  autoCalculate: boolean;
  calculateStrategy: 'weight' | 'distance' | 'both' | 'fixed';
  weightThreshold: number;
  distanceThreshold: number;
  rounding: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnChange: boolean;
  alertConfig?: CourierRateAlertConfig;
}

/**
 * Courier rate alert configuration
 */
export interface CourierRateAlertConfig {
  enabled: boolean;
  rateChangeAlert: boolean;
  rateChangeThreshold: number;
  minimumRateAlert: boolean;
  maximumRateAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Courier rate history
 */
export interface CourierRateHistory extends BaseEntity, Timestamp {
  id: ID;
  rateId: ID;
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
 * Courier rate validation
 */
export interface CourierRateValidation {
  isValid: boolean;
  rateId: ID;
  courierId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Courier rate export
 */
export interface CourierRateExport extends BaseEntity, Timestamp {
  id: ID;
  courierId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: CourierRateFilter;
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
