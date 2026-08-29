/**
 * Inventory Location Types
 * Type definitions for logistics inventory locations based on shared-constants
 * @module InventoryLocationTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics inventory
// ============================================================
import {
  // Inventory Location Constants
  LOGISTICS_INVENTORY_LOCATION,
  LogisticsInventoryLocationType,
  LogisticsInventoryLocationStatus,
  LogisticsInventoryLocationZone,
  LogisticsInventoryStorageType,
  logisticsInventoryLocationGetTypeLabel,
  logisticsInventoryLocationGetStatusLabel,
  logisticsInventoryLocationGetZoneLabel,
  logisticsInventoryLocationGetCapacity,
  logisticsInventoryLocationIsActive,
  logisticsInventoryLocationIsOperational,
  logisticsInventoryLocationGetStorageTypeLabel,
  // Inventory Location Type Constants
  LOGISTICS_INVENTORY_LOCATION_TYPE,
  LogisticsInventoryLocationTypeCategory,
  LogisticsInventoryLocationTypeIcon,
  LogisticsInventoryLocationTypeColor,
  LogisticsInventoryLocationAccessType,
  LogisticsInventoryLocationEnvironmentType,
  logisticsInventoryLocationTypeGetCategory,
  logisticsInventoryLocationTypeGetIcon,
  logisticsInventoryLocationTypeGetColor,
  logisticsInventoryLocationTypeGetAccessLabel,
  logisticsInventoryLocationTypeGetEnvironmentLabel,
} from '@vubon/shared-constants';

// ============================================================
// Inventory Location Extended Types
// ============================================================

/**
 * Inventory location
 */
export interface InventoryLocation extends BaseEntity, Timestamp {
  id: ID;
  warehouseId: ID;
  type: LogisticsInventoryLocationType;
  status: LogisticsInventoryLocationStatus;
  zone: LogisticsInventoryLocationZone;
  storageType: LogisticsInventoryStorageType;
  name: string;
  code: string;
  capacity: number;
  usedCapacity: number;
  availableCapacity: number;
  isActive: boolean;
  isOperational: boolean;
  metadata?: Metadata;
}

/**
 * Inventory location filter
 */
export interface InventoryLocationFilter {
  ids?: ID[];
  warehouseIds?: ID[];
  types?: LogisticsInventoryLocationType[];
  statuses?: LogisticsInventoryLocationStatus[];
  zones?: LogisticsInventoryLocationZone[];
  storageTypes?: LogisticsInventoryStorageType[];
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
 * Inventory location statistics
 */
export interface InventoryLocationStatistics {
  warehouseId: ID;
  totalLocations: number;
  activeLocations: number;
  operationalLocations: number;
  byType: Record<LogisticsInventoryLocationType, number>;
  byStatus: Record<LogisticsInventoryLocationStatus, number>;
  byZone: Record<LogisticsInventoryLocationZone, number>;
  byStorageType: Record<LogisticsInventoryStorageType, number>;
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
  mostFrequentType: LogisticsInventoryLocationType;
  mostFrequentStatus: LogisticsInventoryLocationStatus;
  mostFrequentZone: LogisticsInventoryLocationZone;
}

/**
 * Inventory location summary
 */
export interface InventoryLocationSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalLocations: number;
  active: number;
  operational: number;
  byType: Record<LogisticsInventoryLocationType, number>;
  byStatus: Record<LogisticsInventoryLocationStatus, number>;
  byZone: Record<LogisticsInventoryLocationZone, number>;
  byStorageType: Record<LogisticsInventoryStorageType, number>;
  locationTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: LogisticsInventoryLocationType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: LogisticsInventoryLocationStatus;
    count: number;
    label: string;
  }[];
  topZones: {
    zone: LogisticsInventoryLocationZone;
    count: number;
    label: string;
  }[];
  topStorageTypes: {
    storageType: LogisticsInventoryStorageType;
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
 * Inventory location configuration
 */
export interface InventoryLocationConfiguration {
  enabled: boolean;
  defaultType: LogisticsInventoryLocationType;
  defaultZone: LogisticsInventoryLocationZone;
  defaultStorageType: LogisticsInventoryStorageType;
  maxLocations: number;
  autoAssign: boolean;
  requireCode: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnStatusChange: boolean;
  alertConfig?: InventoryLocationAlertConfig;
}

/**
 * Inventory location alert configuration
 */
export interface InventoryLocationAlertConfig {
  enabled: boolean;
  capacityAlert: boolean;
  capacityThreshold: number;
  operationalAlert: boolean;
  locationFullAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Inventory location history
 */
export interface InventoryLocationHistory extends BaseEntity, Timestamp {
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
 * Inventory location validation
 */
export interface InventoryLocationValidation {
  isValid: boolean;
  locationId: ID;
  warehouseId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Inventory location export
 */
export interface InventoryLocationExport extends BaseEntity, Timestamp {
  id: ID;
  warehouseId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: InventoryLocationFilter;
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
  // Inventory Location Constants
  LOGISTICS_INVENTORY_LOCATION,
  LogisticsInventoryLocationType,
  LogisticsInventoryLocationStatus,
  LogisticsInventoryLocationZone,
  LogisticsInventoryStorageType,
  logisticsInventoryLocationGetTypeLabel,
  logisticsInventoryLocationGetStatusLabel,
  logisticsInventoryLocationGetZoneLabel,
  logisticsInventoryLocationGetCapacity,
  logisticsInventoryLocationIsActive,
  logisticsInventoryLocationIsOperational,
  logisticsInventoryLocationGetStorageTypeLabel,
  // Inventory Location Type Constants
  LOGISTICS_INVENTORY_LOCATION_TYPE,
  LogisticsInventoryLocationTypeCategory,
  LogisticsInventoryLocationTypeIcon,
  LogisticsInventoryLocationTypeColor,
  LogisticsInventoryLocationAccessType,
  LogisticsInventoryLocationEnvironmentType,
  logisticsInventoryLocationTypeGetCategory,
  logisticsInventoryLocationTypeGetIcon,
  logisticsInventoryLocationTypeGetColor,
  logisticsInventoryLocationTypeGetAccessLabel,
  logisticsInventoryLocationTypeGetEnvironmentLabel,
};
