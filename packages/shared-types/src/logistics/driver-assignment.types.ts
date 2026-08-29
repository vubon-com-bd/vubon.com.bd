/**
 * Driver Assignment Types
 * Type definitions for logistics driver assignments based on shared-constants
 * @module DriverAssignmentTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics driver
// ============================================================
import {
  // Driver Constants
  LogisticsDriverType,
  LogisticsDriverStatus,
  LogisticsDriverLicenseType,
  LogisticsDriverLicenseClass,
  LogisticsDriverExperienceLevel,
  LogisticsDriverDocumentType,
} from '@vubon/shared-constants';

// ============================================================
// Driver Assignment Extended Types
// ============================================================

/**
 * Driver assignment
 */
export interface DriverAssignment extends BaseEntity, Timestamp {
  id: ID;
  driverId: ID;
  shipmentId: ID;
  deliveryId: ID;
  orderId: ID;
  userId: ID;
  assignedAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  status: 'assigned' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  notes?: string;
  metadata?: Metadata;
}

/**
 * Driver assignment filter
 */
export interface DriverAssignmentFilter {
  ids?: ID[];
  driverIds?: ID[];
  shipmentIds?: ID[];
  deliveryIds?: ID[];
  orderIds?: ID[];
  userIds?: ID[];
  statuses?: ('assigned' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'failed')[];
  priorities?: ('low' | 'medium' | 'high' | 'critical')[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isCompleted?: boolean;
  isInProgress?: boolean;
  isCancelled?: boolean;
  isFailed?: boolean;
  searchTerm?: string;
}

/**
 * Driver assignment statistics
 */
export interface DriverAssignmentStatistics {
  driverId: ID;
  totalAssignments: number;
  completedAssignments: number;
  inProgressAssignments: number;
  cancelledAssignments: number;
  failedAssignments: number;
  byStatus: Record<string, number>;
  byPriority: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageCompletionTime: number;
  maxCompletionTime: number;
  minCompletionTime: number;
  completionRate: number;
  failureRate: number;
  cancellationRate: number;
  mostFrequentStatus: string;
  mostFrequentPriority: string;
}

/**
 * Driver assignment summary
 */
export interface DriverAssignmentSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalAssignments: number;
  assigned: number;
  confirmed: number;
  inProgress: number;
  completed: number;
  cancelled: number;
  failed: number;
  byStatus: Record<string, number>;
  byPriority: Record<string, number>;
  assignmentTrend: {
    date: Date;
    total: number;
    completed: number;
    inProgress: number;
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
  performanceMetrics: {
    completionRate: number;
    failureRate: number;
    cancellationRate: number;
    averageCompletionTime: number;
  };
}

/**
 * Driver assignment configuration
 */
export interface DriverAssignmentConfiguration {
  enabled: boolean;
  defaultPriority: 'low' | 'medium' | 'high' | 'critical';
  requireConfirmation: boolean;
  maxAssignmentsPerDriver: number;
  maxAssignmentsPerDay: number;
  autoAssign: boolean;
  autoAssignStrategy: 'availability' | 'proximity' | 'experience' | 'preference';
  notificationOnAssign: boolean;
  notificationOnConfirm: boolean;
  notificationOnStart: boolean;
  notificationOnComplete: boolean;
  notificationOnCancel: boolean;
  notificationOnFailure: boolean;
  alertConfig?: DriverAssignmentAlertConfig;
}

/**
 * Driver assignment alert configuration
 */
export interface DriverAssignmentAlertConfig {
  enabled: boolean;
  capacityAlert: boolean;
  capacityThreshold: number;
  delayAlert: boolean;
  delayThreshold: number;
  failureAlert: boolean;
  cancellationAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Driver assignment history
 */
export interface DriverAssignmentHistory extends BaseEntity, Timestamp {
  id: ID;
  assignmentId: ID;
  driverId: ID;
  action: 'assign' | 'confirm' | 'start' | 'complete' | 'cancel' | 'fail' | 'update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Driver assignment validation
 */
export interface DriverAssignmentValidation {
  isValid: boolean;
  assignmentId: ID;
  driverId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Driver assignment export
 */
export interface DriverAssignmentExport extends BaseEntity, Timestamp {
  id: ID;
  driverId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: DriverAssignmentFilter;
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
  // Driver Constants
  LogisticsDriverType,
  LogisticsDriverStatus,
  LogisticsDriverLicenseType,
  LogisticsDriverLicenseClass,
  LogisticsDriverExperienceLevel,
  LogisticsDriverDocumentType,
};
