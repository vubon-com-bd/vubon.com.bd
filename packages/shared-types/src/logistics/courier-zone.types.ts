/**
 * Courier Zone Types
 * Type definitions for logistics courier zones based on shared-constants
 * @module CourierZoneTypes
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
// Import from shared-constants logistics zone
// ============================================================
import {
  // Zone Constants
  LOGISTICS_ZONE,
  LogisticsZoneType,
  LogisticsZoneDivision,
  LogisticsZoneDistrict,
  LogisticsZoneStatus,
  logisticsZoneGetTypeLabel,
  logisticsZoneGetDivisionLabel,
  logisticsZoneGetStatusLabel,
  logisticsZoneGetCoverage,
  logisticsZoneIsActive,
  logisticsZoneIsOperational,
  // Zone Type Constants
  LOGISTICS_ZONE_TYPE,
  LogisticsZoneTypeCategory,
  LogisticsZoneTypeIcon,
  LogisticsZoneTypeColor,
  LogisticsZoneAreaType,
  logisticsZoneTypeGetLabel,
  logisticsZoneTypeGetIcon,
  logisticsZoneTypeGetColor,
  logisticsZoneTypeGetDensity,
  logisticsZoneTypeGetAreaType,
} from '@vubon/shared-constants';

// ============================================================
// Courier Zone Extended Types
// ============================================================

/**
 * Courier zone
 */
export interface CourierZone extends BaseEntity, Timestamp {
  id: ID;
  courierId: ID;
  zoneId: ID;
  zoneType: LogisticsZoneTypeCategory;
  division: LogisticsZoneDivision;
  district: LogisticsZoneDistrict;
  coverage: string;
  isActive: boolean;
  isOperational: boolean;
  metadata?: Metadata;
}

/**
 * Courier zone filter
 */
export interface CourierZoneFilter {
  ids?: ID[];
  courierIds?: ID[];
  zoneIds?: ID[];
  zoneTypes?: LogisticsZoneTypeCategory[];
  divisions?: LogisticsZoneDivision[];
  districts?: LogisticsZoneDistrict[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isOperational?: boolean;
  searchTerm?: string;
}

/**
 * Courier zone statistics
 */
export interface CourierZoneStatistics {
  courierId: ID;
  totalZones: number;
  activeZones: number;
  operationalZones: number;
  byZoneType: Record<LogisticsZoneTypeCategory, number>;
  byDivision: Record<LogisticsZoneDivision, number>;
  byDistrict: Record<LogisticsZoneDistrict, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  coverage: string;
  mostFrequentZoneType: LogisticsZoneTypeCategory;
  mostFrequentDivision: LogisticsZoneDivision;
  mostFrequentDistrict: LogisticsZoneDistrict;
}

/**
 * Courier zone summary
 */
export interface CourierZoneSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalZones: number;
  active: number;
  operational: number;
  byZoneType: Record<LogisticsZoneTypeCategory, number>;
  byDivision: Record<LogisticsZoneDivision, number>;
  byDistrict: Record<LogisticsZoneDistrict, number>;
  zoneTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topZoneTypes: {
    zoneType: LogisticsZoneTypeCategory;
    count: number;
    label: string;
  }[];
  topDivisions: {
    division: LogisticsZoneDivision;
    count: number;
    label: string;
  }[];
  topDistricts: {
    district: LogisticsZoneDistrict;
    count: number;
    label: string;
  }[];
  coverageSummary: {
    totalCoverage: string;
    coveredAreas: number;
    operationalAreas: number;
  };
}

/**
 * Courier zone configuration
 */
export interface CourierZoneConfiguration {
  enabled: boolean;
  defaultZoneType: LogisticsZoneTypeCategory;
  defaultDivision: LogisticsZoneDivision;
  requireCoverage: boolean;
  maxZonesPerCourier: number;
  autoAssign: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnStatusChange: boolean;
  alertConfig?: CourierZoneAlertConfig;
}

/**
 * Courier zone alert configuration
 */
export interface CourierZoneAlertConfig {
  enabled: boolean;
  coverageAlert: boolean;
  operationalAlert: boolean;
  duplicateZoneAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Courier zone history
 */
export interface CourierZoneHistory extends BaseEntity, Timestamp {
  id: ID;
  courierZoneId: ID;
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
 * Courier zone validation
 */
export interface CourierZoneValidation {
  isValid: boolean;
  courierZoneId: ID;
  courierId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Courier zone export
 */
export interface CourierZoneExport extends BaseEntity, Timestamp {
  id: ID;
  courierId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: CourierZoneFilter;
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
  // Zone Constants
  LOGISTICS_ZONE,
  LogisticsZoneType,
  LogisticsZoneDivision,
  LogisticsZoneDistrict,
  LogisticsZoneStatus,
  logisticsZoneGetTypeLabel,
  logisticsZoneGetDivisionLabel,
  logisticsZoneGetStatusLabel,
  logisticsZoneGetCoverage,
  logisticsZoneIsActive,
  logisticsZoneIsOperational,
  // Zone Type Constants
  LOGISTICS_ZONE_TYPE,
  LogisticsZoneTypeCategory,
  LogisticsZoneTypeIcon,
  LogisticsZoneTypeColor,
  LogisticsZoneAreaType,
  logisticsZoneTypeGetLabel,
  logisticsZoneTypeGetIcon,
  logisticsZoneTypeGetColor,
  logisticsZoneTypeGetDensity,
  logisticsZoneTypeGetAreaType,
};
