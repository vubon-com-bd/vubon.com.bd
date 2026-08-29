/**
 * Route Stop Types
 * Type definitions for logistics route stops based on shared-constants
 * @module RouteStopTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics route
// ============================================================
import {
  // Route Constants
  LogisticsRouteType,
  LogisticsRouteStatus,
  LogisticsRoutePriority,
  LogisticsRouteCondition,
  LogisticsBangladeshRoute,
} from '@vubon/shared-constants';

// ============================================================
// Route Stop Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Route stop filter
 */
export interface RouteStopFilter {
  ids?: ID[];
  routeIds?: ID[];
  types?: ('origin' | 'destination' | 'pickup' | 'dropoff' | 'waypoint')[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minSequence?: number;
  maxSequence?: number;
  minStopDuration?: number;
  maxStopDuration?: number;
  searchTerm?: string;
}

/**
 * Route stop statistics
 */
export interface RouteStopStatistics {
  routeId: ID;
  totalStops: number;
  originStops: number;
  destinationStops: number;
  pickupStops: number;
  dropoffStops: number;
  waypointStops: number;
  byType: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageSequence: number;
  maxSequence: number;
  minSequence: number;
  averageStopDuration: number;
  maxStopDuration: number;
  minStopDuration: number;
  mostFrequentType: string;
}

/**
 * Route stop summary
 */
export interface RouteStopSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalStops: number;
  origin: number;
  destination: number;
  pickup: number;
  dropoff: number;
  waypoint: number;
  byType: Record<string, number>;
  stopTrend: {
    date: Date;
    total: number;
    origin: number;
    destination: number;
  }[];
  topTypes: {
    type: string;
    count: number;
    label: string;
  }[];
  sequenceMetrics: {
    average: number;
    max: number;
    min: number;
  };
  durationMetrics: {
    average: number;
    max: number;
    min: number;
  };
}

/**
 * Route stop configuration
 */
export interface RouteStopConfiguration {
  enabled: boolean;
  requireAddress: boolean;
  requireCoordinates: boolean;
  requireSequence: boolean;
  maxStopsPerRoute: number;
  maxStopDuration: number;
  minStopDuration: number;
  autoSequence: boolean;
  validateAddress: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: RouteStopAlertConfig;
}

/**
 * Route stop alert configuration
 */
export interface RouteStopAlertConfig {
  enabled: boolean;
  duplicateStopAlert: boolean;
  invalidAddressAlert: boolean;
  sequenceGapAlert: boolean;
  durationAlert: boolean;
  durationThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Route stop history
 */
export interface RouteStopHistory extends BaseEntity, Timestamp {
  id: ID;
  stopId: ID;
  routeId: ID;
  action: 'create' | 'update' | 'delete' | 'reorder' | 'status_change';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Route stop validation
 */
export interface RouteStopValidation {
  isValid: boolean;
  stopId: ID;
  routeId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Route stop export
 */
export interface RouteStopExport extends BaseEntity, Timestamp {
  id: ID;
  routeId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: RouteStopFilter;
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
  // Route Constants
  LogisticsRouteType,
  LogisticsRouteStatus,
  LogisticsRoutePriority,
  LogisticsRouteCondition,
  LogisticsBangladeshRoute,
};
