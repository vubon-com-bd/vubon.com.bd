/**
 * Vehicle Maintenance Types
 * Type definitions for logistics vehicle maintenance based on shared-constants
 * @module VehicleMaintenanceTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics vehicle
// ============================================================
import {
  // Vehicle Constants
  LogisticsVehicleType,
  LogisticsVehicleStatus,
  LogisticsVehicleFuelType,
  LogisticsVehicleCondition,
  LogisticsVehicleRegistrationType,
} from '@vubon/shared-constants';

// ============================================================
// Vehicle Maintenance Extended Types
// ============================================================

/**
 * Vehicle maintenance
 */
export interface VehicleMaintenance extends BaseEntity, Timestamp {
  id: ID;
  vehicleId: ID;
  type: 'routine' | 'repair' | 'inspection' | 'emergency' | 'scheduled';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'delayed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  cost: number;
  currency: string;
  scheduledDate: Date;
  startedAt?: Date;
  completedAt?: Date;
  estimatedDuration: number;
  actualDuration?: number;
  performedBy?: string;
  notes?: string;
  metadata?: Metadata;
}

/**
 * Vehicle maintenance filter
 */
export interface VehicleMaintenanceFilter {
  ids?: ID[];
  vehicleIds?: ID[];
  types?: ('routine' | 'repair' | 'inspection' | 'emergency' | 'scheduled')[];
  statuses?: ('scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'delayed')[];
  priorities?: ('low' | 'medium' | 'high' | 'critical')[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minCost?: number;
  maxCost?: number;
  minEstimatedDuration?: number;
  maxEstimatedDuration?: number;
  searchTerm?: string;
}

/**
 * Vehicle maintenance statistics
 */
export interface VehicleMaintenanceStatistics {
  vehicleId: ID;
  totalMaintenances: number;
  scheduledMaintenances: number;
  inProgressMaintenances: number;
  completedMaintenances: number;
  cancelledMaintenances: number;
  delayedMaintenances: number;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
  byPriority: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalCost: number;
  averageCost: number;
  maxCost: number;
  minCost: number;
  averageDuration: number;
  maxDuration: number;
  minDuration: number;
  mostFrequentType: string;
  mostFrequentStatus: string;
  mostFrequentPriority: string;
}

/**
 * Vehicle maintenance summary
 */
export interface VehicleMaintenanceSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalMaintenances: number;
  scheduled: number;
  inProgress: number;
  completed: number;
  cancelled: number;
  delayed: number;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
  byPriority: Record<string, number>;
  maintenanceTrend: {
    date: Date;
    total: number;
    completed: number;
    scheduled: number;
  }[];
  topTypes: {
    type: string;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: string;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: string;
    count: number;
    label: string;
  }[];
  financialSummary: {
    totalCost: number;
    averageCost: number;
    maxCost: number;
    minCost: number;
  };
  performanceMetrics: {
    onTimeCompletionRate: number;
    averageDuration: number;
    maxDuration: number;
    minDuration: number;
  };
}

/**
 * Vehicle maintenance configuration
 */
export interface VehicleMaintenanceConfiguration {
  enabled: boolean;
  defaultPriority: 'low' | 'medium' | 'high' | 'critical';
  requireDescription: boolean;
  requireCost: boolean;
  requireScheduledDate: boolean;
  maxMaintenancesPerVehicle: number;
  autoSchedule: boolean;
  autoScheduleInterval: number;
  notificationOnSchedule: boolean;
  notificationOnStart: boolean;
  notificationOnComplete: boolean;
  notificationOnDelay: boolean;
  notificationOnCancel: boolean;
  alertConfig?: VehicleMaintenanceAlertConfig;
}

/**
 * Vehicle maintenance alert configuration
 */
export interface VehicleMaintenanceAlertConfig {
  enabled: boolean;
  delayAlert: boolean;
  delayThreshold: number;
  costAlert: boolean;
  costThreshold: number;
  overdueAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vehicle maintenance history
 */
export interface VehicleMaintenanceHistory extends BaseEntity, Timestamp {
  id: ID;
  maintenanceId: ID;
  vehicleId: ID;
  action: 'create' | 'schedule' | 'start' | 'complete' | 'cancel' | 'delay' | 'update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vehicle maintenance validation
 */
export interface VehicleMaintenanceValidation {
  isValid: boolean;
  maintenanceId: ID;
  vehicleId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vehicle maintenance export
 */
export interface VehicleMaintenanceExport extends BaseEntity, Timestamp {
  id: ID;
  vehicleId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VehicleMaintenanceFilter;
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
  LogisticsVehicleType,
  LogisticsVehicleStatus,
  LogisticsVehicleFuelType,
  LogisticsVehicleCondition,
  LogisticsVehicleRegistrationType,
};
