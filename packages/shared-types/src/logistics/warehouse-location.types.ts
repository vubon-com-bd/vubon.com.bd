/**
 * Warehouse Location Types
 * Type definitions for logistics warehouse locations based on shared-constants
 * @module WarehouseLocationTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Address } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics warehouse
// ============================================================
import {
  // Warehouse Constants
  LOGISTICS_WAREHOUSE,
  LogisticsWarehouseType,
  LogisticsWarehouseStatus,
  LogisticsWarehouseLocation,
  LogisticsWarehouseStorageType,
  LogisticsWarehouseZone,
  logisticsWarehouseGetTypeLabel,
  logisticsWarehouseGetStatusLabel,
  logisticsWarehouseGetLocationLabel,
  logisticsWarehouseGetCapacity,
  logisticsWarehouseGetZoneLabel,
  logisticsWarehouseIsActive,
  logisticsWarehouseIsOperational,
  logisticsWarehouseGetStorageTypeLabel,
  logisticsWarehouseIsWithinOperatingHours,
} from '@vubon/shared-constants';

// ============================================================
// Warehouse Location Extended Types
// ============================================================

/**
 * Warehouse location
 */
export interface WarehouseLocation extends BaseEntity, Timestamp {
  id: ID;
  warehouseId: ID;
  location: LogisticsWarehouseLocation;
  address: Address;
  zone: LogisticsWarehouseZone;
  storageType: LogisticsWarehouseStorageType;
  capacity: number;
  usedCapacity: number;
  availableCapacity: number;
  isActive: boolean;
  isOperational: boolean;
  metadata?: Metadata;
}

/**
 * Warehouse location filter
 */
export interface WarehouseLocationFilter {
  ids?: ID[];
  warehouseIds?: ID[];
  locations?: LogisticsWarehouseLocation[];
  zones?: LogisticsWarehouseZone[];
  storageTypes?: LogisticsWarehouseStorageType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isOperational?: boolean;
  minCapacity?: number;
  maxCapacity?: number;
  minAvailableCapacity?: number;
  maxAvailableCapacity?: number;
  searchTerm?: string;
}

/**
 * Warehouse location statistics
 */
export interface WarehouseLocationStatistics {
  warehouseId: ID;
  totalLocations: number;
  activeLocations: number;
  operationalLocations: number;
  byLocation: Record<LogisticsWarehouseLocation, number>;
  byZone: Record<LogisticsWarehouseZone, number>;
  byStorageType: Record<LogisticsWarehouseStorageType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalCapacity: number;
  totalUsedCapacity: number;
  totalAvailableCapacity: number;
  averageCapacity: number;
  maxCapacity: number;
  minCapacity: number;
  utilizationRate: number;
  mostFrequentLocation: LogisticsWarehouseLocation;
  mostFrequentZone: LogisticsWarehouseZone;
}

/**
 * Warehouse location summary
 */
export interface WarehouseLocationSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalLocations: number;
  active: number;
  operational: number;
  byLocation: Record<LogisticsWarehouseLocation, number>;
  byZone: Record<LogisticsWarehouseZone, number>;
  byStorageType: Record<LogisticsWarehouseStorageType, number>;
  locationTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topLocations: {
    location: LogisticsWarehouseLocation;
    count: number;
    label: string;
  }[];
  topZones: {
    zone: LogisticsWarehouseZone;
    count: number;
    label: string;
  }[];
  topStorageTypes: {
    storageType: LogisticsWarehouseStorageType;
    count: number;
    label: string;
  }[];
  capacitySummary: {
    total: number;
    used: number;
    available: number;
    utilization: number;
  };
}

/**
 * Warehouse location configuration
 */
export interface WarehouseLocationConfiguration {
  enabled: boolean;
  defaultLocation: LogisticsWarehouseLocation;
  defaultZone: LogisticsWarehouseZone;
  defaultStorageType: LogisticsWarehouseStorageType;
  requireAddress: boolean;
  maxLocationsPerWarehouse: number;
  autoAssign: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnStatusChange: boolean;
  alertConfig?: WarehouseLocationAlertConfig;
}

/**
 * Warehouse location alert configuration
 */
export interface WarehouseLocationAlertConfig {
  enabled: boolean;
  capacityAlert: boolean;
  capacityThreshold: number;
  operationalAlert: boolean;
  locationFullAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Warehouse location history
 */
export interface WarehouseLocationHistory extends BaseEntity, Timestamp {
  id: ID;
  locationId: ID;
  warehouseId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'deactivate'
    | 'status_change'
    | 'capacity_change'
    | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Warehouse location validation
 */
export interface WarehouseLocationValidation {
  isValid: boolean;
  locationId: ID;
  warehouseId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Warehouse location export
 */
export interface WarehouseLocationExport extends BaseEntity, Timestamp {
  id: ID;
  warehouseId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: WarehouseLocationFilter;
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
  // Warehouse Constants
  LOGISTICS_WAREHOUSE,
  LogisticsWarehouseType,
  LogisticsWarehouseStatus,
  LogisticsWarehouseLocation,
  LogisticsWarehouseStorageType,
  LogisticsWarehouseZone,
  logisticsWarehouseGetTypeLabel,
  logisticsWarehouseGetStatusLabel,
  logisticsWarehouseGetLocationLabel,
  logisticsWarehouseGetCapacity,
  logisticsWarehouseGetZoneLabel,
  logisticsWarehouseIsActive,
  logisticsWarehouseIsOperational,
  logisticsWarehouseGetStorageTypeLabel,
  logisticsWarehouseIsWithinOperatingHours,
};
