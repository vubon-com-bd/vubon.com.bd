/**
 * Zone Types
 * Type definitions for logistics zones based on shared-constants
 * @module ZoneTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

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
// Zone Extended Types
// ============================================================

/**
 * Zone
 */
export interface Zone extends BaseEntity, Timestamp {
  id: ID;
  type: LogisticsZoneTypeCategory;
  division: LogisticsZoneDivision;
  district: LogisticsZoneDistrict;
  status: LogisticsZoneStatus;
  name: string;
  code: string;
  coverage: string;
  isActive: boolean;
  isOperational: boolean;
  metadata?: Metadata;
}

/**
 * Zone filter
 */
export interface ZoneFilter {
  ids?: ID[];
  types?: LogisticsZoneTypeCategory[];
  divisions?: LogisticsZoneDivision[];
  districts?: LogisticsZoneDistrict[];
  statuses?: LogisticsZoneStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isOperational?: boolean;
  searchTerm?: string;
}

/**
 * Zone statistics
 */
export interface ZoneStatistics {
  totalZones: number;
  activeZones: number;
  operationalZones: number;
  byType: Record<LogisticsZoneTypeCategory, number>;
  byDivision: Record<LogisticsZoneDivision, number>;
  byDistrict: Record<LogisticsZoneDistrict, number>;
  byStatus: Record<LogisticsZoneStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  coverage: string;
  mostFrequentType: LogisticsZoneTypeCategory;
  mostFrequentDivision: LogisticsZoneDivision;
  mostFrequentDistrict: LogisticsZoneDistrict;
  mostFrequentStatus: LogisticsZoneStatus;
}

/**
 * Zone summary
 */
export interface ZoneSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalZones: number;
  active: number;
  operational: number;
  byType: Record<LogisticsZoneTypeCategory, number>;
  byDivision: Record<LogisticsZoneDivision, number>;
  byDistrict: Record<LogisticsZoneDistrict, number>;
  byStatus: Record<LogisticsZoneStatus, number>;
  zoneTrend: {
    date: Date;
    total: number;
    active: number;
    operational: number;
  }[];
  topTypes: {
    type: LogisticsZoneTypeCategory;
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
  topStatuses: {
    status: LogisticsZoneStatus;
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
 * Zone configuration
 */
export interface ZoneConfiguration {
  enabled: boolean;
  defaultType: LogisticsZoneTypeCategory;
  defaultDivision: LogisticsZoneDivision;
  defaultDistrict: LogisticsZoneDistrict;
  requireCoverage: boolean;
  maxZones: number;
  autoAssign: boolean;
  validateCoverage: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnStatusChange: boolean;
  alertConfig?: ZoneAlertConfig;
}

/**
 * Zone alert configuration
 */
export interface ZoneAlertConfig {
  enabled: boolean;
  coverageAlert: boolean;
  operationalAlert: boolean;
  duplicateZoneAlert: boolean;
  inactiveZoneAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Zone history
 */
export interface ZoneHistory extends BaseEntity, Timestamp {
  id: ID;
  zoneId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'status_change' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Zone validation
 */
export interface ZoneValidation {
  isValid: boolean;
  zoneId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Zone export
 */
export interface ZoneExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ZoneFilter;
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
