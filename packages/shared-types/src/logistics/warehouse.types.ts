/**
 * Warehouse Types
 * Type definitions for logistics warehouses based on shared-constants
 * @module WarehouseTypes
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
  // Warehouse Type Constants
  LOGISTICS_WAREHOUSE_TYPE,
  LogisticsWarehouseTypeType,
  LogisticsWarehouseTypeCategory,
  LogisticsWarehouseTypeIcon,
  LogisticsWarehouseTypeColor,
  logisticsWarehouseTypeGetLabel,
  logisticsWarehouseTypeGetCategory,
  logisticsWarehouseTypeGetIcon,
  logisticsWarehouseTypeGetColor,
  logisticsWarehouseTypeGetCapacityMultiplier,
  logisticsWarehouseTypeGetServices,
  // Warehouse Status Constants
  LOGISTICS_WAREHOUSE_STATUS,
  LogisticsWarehouseStatusType,
  LogisticsWarehouseStatusCategory,
  LogisticsWarehouseStatusColor,
  LogisticsWarehouseStatusIcon,
  LogisticsWarehouseStatusTransition,
  logisticsWarehouseStatusGetLabel,
  logisticsWarehouseStatusGetCategory,
  logisticsWarehouseStatusIsOperational,
  logisticsWarehouseStatusIsAvailable,
  logisticsWarehouseStatusIsFull,
  logisticsWarehouseStatusCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Warehouse Extended Types
// ============================================================

/**
 * Warehouse
 */
export interface Warehouse extends BaseEntity, Timestamp {
  id: ID;
  type: LogisticsWarehouseTypeType;
  status: LogisticsWarehouseStatusType;
  location: LogisticsWarehouseLocation;
  storageType: LogisticsWarehouseStorageType;
  zone: LogisticsWarehouseZone;
  name: string;
  code: string;
  address: Address;
  capacity: number;
  usedCapacity: number;
  availableCapacity: number;
  isActive: boolean;
  isOperational: boolean;
  operatingHours: {
    start: string;
    end: string;
  };
  metadata?: Metadata;
}

/**
 * Warehouse filter
 */
export interface WarehouseFilter {
  ids?: ID[];
  types?: LogisticsWarehouseTypeType[];
  statuses?: LogisticsWarehouseStatusType[];
  locations?: LogisticsWarehouseLocation[];
  storageTypes?: LogisticsWarehouseStorageType[];
  zones?: LogisticsWarehouseZone[];
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
 * Warehouse statistics
 */
export interface WarehouseStatistics {
  totalWarehouses: number;
  activeWarehouses: number;
  operationalWarehouses: number;
  byType: Record<LogisticsWarehouseTypeType, number>;
  byStatus: Record<LogisticsWarehouseStatusType, number>;
  byLocation: Record<LogisticsWarehouseLocation, number>;
  byStorageType: Record<LogisticsWarehouseStorageType, number>;
  byZone: Record<LogisticsWarehouseZone, number>;
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
  mostFrequentType: LogisticsWarehouseTypeType;
  mostFrequentStatus: LogisticsWarehouseStatusType;
  mostFrequentLocation: LogisticsWarehouseLocation;
}

/**
 * Warehouse summary
 */
export interface WarehouseSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalWarehouses: number;
  active: number;
  operational: number;
  byType: Record<LogisticsWarehouseTypeType, number>;
  byStatus: Record<LogisticsWarehouseStatusType, number>;
  byLocation: Record<LogisticsWarehouseLocation, number>;
  byStorageType: Record<LogisticsWarehouseStorageType, number>;
  byZone: Record<LogisticsWarehouseZone, number>;
  warehouseTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: LogisticsWarehouseTypeType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: LogisticsWarehouseStatusType;
    count: number;
    label: string;
  }[];
  topLocations: {
    location: LogisticsWarehouseLocation;
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
 * Warehouse configuration
 */
export interface WarehouseConfiguration {
  enabled: boolean;
  defaultType: LogisticsWarehouseTypeType;
  defaultLocation: LogisticsWarehouseLocation;
  defaultStorageType: LogisticsWarehouseStorageType;
  defaultZone: LogisticsWarehouseZone;
  requireAddress: boolean;
  requireOperatingHours: boolean;
  maxWarehouses: number;
  autoAssign: boolean;
  autoAssignStrategy: 'capacity' | 'location' | 'preference' | 'zone';
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnStatusChange: boolean;
  alertConfig?: WarehouseAlertConfig;
}

/**
 * Warehouse alert configuration
 */
export interface WarehouseAlertConfig {
  enabled: boolean;
  capacityAlert: boolean;
  capacityThreshold: number;
  fullWarehouseAlert: boolean;
  operationalAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Warehouse history
 */
export interface WarehouseHistory extends BaseEntity, Timestamp {
  id: ID;
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
 * Warehouse validation
 */
export interface WarehouseValidation {
  isValid: boolean;
  warehouseId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Warehouse inventory
 */
export interface WarehouseInventory extends BaseEntity, Timestamp {
  id: ID;
  warehouseId: ID;
  productId: ID;
  variantId?: ID;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  lastUpdatedAt: Date;
  metadata?: Metadata;
}

/**
 * Warehouse export
 */
export interface WarehouseExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: WarehouseFilter;
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
  // Warehouse Type Constants
  LOGISTICS_WAREHOUSE_TYPE,
  LogisticsWarehouseTypeType,
  LogisticsWarehouseTypeCategory,
  LogisticsWarehouseTypeIcon,
  LogisticsWarehouseTypeColor,
  logisticsWarehouseTypeGetLabel,
  logisticsWarehouseTypeGetCategory,
  logisticsWarehouseTypeGetIcon,
  logisticsWarehouseTypeGetColor,
  logisticsWarehouseTypeGetCapacityMultiplier,
  logisticsWarehouseTypeGetServices,
  // Warehouse Status Constants
  LOGISTICS_WAREHOUSE_STATUS,
  LogisticsWarehouseStatusType,
  LogisticsWarehouseStatusCategory,
  LogisticsWarehouseStatusColor,
  LogisticsWarehouseStatusIcon,
  LogisticsWarehouseStatusTransition,
  logisticsWarehouseStatusGetLabel,
  logisticsWarehouseStatusGetCategory,
  logisticsWarehouseStatusIsOperational,
  logisticsWarehouseStatusIsAvailable,
  logisticsWarehouseStatusIsFull,
  logisticsWarehouseStatusCanTransition,
};
