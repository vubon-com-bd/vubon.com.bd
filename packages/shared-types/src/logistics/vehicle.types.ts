/**
 * Vehicle Types
 * Type definitions for logistics vehicles based on shared-constants
 * @module VehicleTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics vehicle
// ============================================================
import {
  // Vehicle Constants
  LOGISTICS_VEHICLE,
  LogisticsVehicleType,
  LogisticsVehicleStatus,
  LogisticsVehicleFuelType,
  LogisticsVehicleCondition,
  LogisticsVehicleRegistrationType,
  logisticsVehicleGetTypeLabel,
  logisticsVehicleGetStatusLabel,
  logisticsVehicleGetFuelTypeLabel,
  logisticsVehicleGetConditionLabel,
  logisticsVehicleGetRegistrationTypeLabel,
  logisticsVehicleGetCapacity,
  logisticsVehicleIsAvailable,
  logisticsVehicleIsOperational,
  logisticsVehicleIsUnderMaintenance,
  // Vehicle Type Constants
  LOGISTICS_VEHICLE_TYPE,
  LogisticsVehicleTypeCategory,
  LogisticsVehicleTypeIcon,
  LogisticsVehicleTypeColor,
  logisticsVehicleTypeGetCategory,
  logisticsVehicleTypeGetIcon,
  logisticsVehicleTypeGetColor,
  logisticsVehicleTypeGetLicenseTypes,
  logisticsVehicleTypeGetPermitType,
  // Vehicle Status Constants
  LOGISTICS_VEHICLE_STATUS,
  LogisticsVehicleStatusType,
  LogisticsVehicleStatusCategory,
  LogisticsVehicleStatusColor,
  LogisticsVehicleStatusIcon,
  LogisticsVehicleStatusTransition,
  logisticsVehicleStatusGetLabel,
  logisticsVehicleStatusGetCategory,
  logisticsVehicleStatusIsAvailable,
  logisticsVehicleStatusIsOperational,
  logisticsVehicleStatusIsUnderMaintenance,
  logisticsVehicleStatusCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Vehicle Extended Types
// ============================================================

/**
 * Vehicle
 */
export interface Vehicle extends BaseEntity, Timestamp {
  id: ID;
  type: LogisticsVehicleType;
  status: LogisticsVehicleStatusType;
  fuelType: LogisticsVehicleFuelType;
  condition: LogisticsVehicleCondition;
  registrationType: LogisticsVehicleRegistrationType;
  name: string;
  registrationNumber: string;
  model: string;
  year: number;
  capacity: number;
  currentMileage: number;
  isAvailable: boolean;
  isOperational: boolean;
  isUnderMaintenance: boolean;
  metadata?: Metadata;
}

/**
 * Vehicle filter
 */
export interface VehicleFilter {
  ids?: ID[];
  types?: LogisticsVehicleType[];
  statuses?: LogisticsVehicleStatusType[];
  fuelTypes?: LogisticsVehicleFuelType[];
  conditions?: LogisticsVehicleCondition[];
  registrationTypes?: LogisticsVehicleRegistrationType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isAvailable?: boolean;
  isOperational?: boolean;
  isUnderMaintenance?: boolean;
  minCapacity?: number;
  maxCapacity?: number;
  minYear?: number;
  maxYear?: number;
  searchTerm?: string;
  registrationNumber?: string;
}

/**
 * Vehicle statistics
 */
export interface VehicleStatistics {
  totalVehicles: number;
  availableVehicles: number;
  operationalVehicles: number;
  underMaintenanceVehicles: number;
  byType: Record<LogisticsVehicleType, number>;
  byStatus: Record<LogisticsVehicleStatusType, number>;
  byFuelType: Record<LogisticsVehicleFuelType, number>;
  byCondition: Record<LogisticsVehicleCondition, number>;
  byRegistrationType: Record<LogisticsVehicleRegistrationType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageCapacity: number;
  maxCapacity: number;
  minCapacity: number;
  averageMileage: number;
  maxMileage: number;
  minMileage: number;
  mostFrequentType: LogisticsVehicleType;
  mostFrequentStatus: LogisticsVehicleStatusType;
  mostFrequentFuelType: LogisticsVehicleFuelType;
}

/**
 * Vehicle summary
 */
export interface VehicleSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalVehicles: number;
  available: number;
  operational: number;
  underMaintenance: number;
  byType: Record<LogisticsVehicleType, number>;
  byStatus: Record<LogisticsVehicleStatusType, number>;
  byFuelType: Record<LogisticsVehicleFuelType, number>;
  byCondition: Record<LogisticsVehicleCondition, number>;
  byRegistrationType: Record<LogisticsVehicleRegistrationType, number>;
  vehicleTrend: {
    date: Date;
    total: number;
    available: number;
    operational: number;
  }[];
  topTypes: {
    type: LogisticsVehicleType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: LogisticsVehicleStatusType;
    count: number;
    label: string;
  }[];
  topFuelTypes: {
    fuelType: LogisticsVehicleFuelType;
    count: number;
    label: string;
  }[];
  capacitySummary: {
    total: number;
    average: number;
    max: number;
    min: number;
  };
}

/**
 * Vehicle configuration
 */
export interface VehicleConfiguration {
  enabled: boolean;
  defaultType: LogisticsVehicleType;
  defaultFuelType: LogisticsVehicleFuelType;
  requireRegistration: boolean;
  requireModel: boolean;
  requireYear: boolean;
  maxVehicles: number;
  autoAssign: boolean;
  autoAssignStrategy: 'capacity' | 'availability' | 'preference' | 'type';
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnStatusChange: boolean;
  alertConfig?: VehicleAlertConfig;
}

/**
 * Vehicle alert configuration
 */
export interface VehicleAlertConfig {
  enabled: boolean;
  availabilityAlert: boolean;
  maintenanceAlert: boolean;
  capacityAlert: boolean;
  mileageAlert: boolean;
  mileageThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vehicle history
 */
export interface VehicleHistory extends BaseEntity, Timestamp {
  id: ID;
  vehicleId: ID;
  action: 'create' | 'update' | 'available' | 'operational' | 'maintenance' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vehicle validation
 */
export interface VehicleValidation {
  isValid: boolean;
  vehicleId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vehicle export
 */
export interface VehicleExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VehicleFilter;
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
  // Vehicle Constants
  LOGISTICS_VEHICLE,
  LogisticsVehicleType,
  LogisticsVehicleStatus,
  LogisticsVehicleFuelType,
  LogisticsVehicleCondition,
  LogisticsVehicleRegistrationType,
  logisticsVehicleGetTypeLabel,
  logisticsVehicleGetStatusLabel,
  logisticsVehicleGetFuelTypeLabel,
  logisticsVehicleGetConditionLabel,
  logisticsVehicleGetRegistrationTypeLabel,
  logisticsVehicleGetCapacity,
  logisticsVehicleIsAvailable,
  logisticsVehicleIsOperational,
  logisticsVehicleIsUnderMaintenance,
  // Vehicle Type Constants
  LOGISTICS_VEHICLE_TYPE,
  LogisticsVehicleTypeCategory,
  LogisticsVehicleTypeIcon,
  LogisticsVehicleTypeColor,
  logisticsVehicleTypeGetCategory,
  logisticsVehicleTypeGetIcon,
  logisticsVehicleTypeGetColor,
  logisticsVehicleTypeGetLicenseTypes,
  logisticsVehicleTypeGetPermitType,
  // Vehicle Status Constants
  LOGISTICS_VEHICLE_STATUS,
  LogisticsVehicleStatusType,
  LogisticsVehicleStatusCategory,
  LogisticsVehicleStatusColor,
  LogisticsVehicleStatusIcon,
  LogisticsVehicleStatusTransition,
  logisticsVehicleStatusGetLabel,
  logisticsVehicleStatusGetCategory,
  logisticsVehicleStatusIsAvailable,
  logisticsVehicleStatusIsOperational,
  logisticsVehicleStatusIsUnderMaintenance,
  logisticsVehicleStatusCanTransition,
};
