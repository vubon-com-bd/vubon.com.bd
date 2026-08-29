/**
 * Route Types
 * Type definitions for logistics routes based on shared-constants
 * @module RouteTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Address } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics route
// ============================================================
import {
  // Route Constants
  LOGISTICS_ROUTE,
  LogisticsRouteType,
  LogisticsRouteStatus,
  LogisticsRoutePriority,
  LogisticsRouteCondition,
  LogisticsBangladeshRoute,
  logisticsRouteGetTypeLabel,
  logisticsRouteGetStatusLabel,
  logisticsRouteGetPriorityLabel,
  logisticsRouteGetDistance,
  logisticsRouteGetDuration,
  logisticsRouteGetConditionLabel,
  logisticsRouteGetBangladeshRouteLabel,
  logisticsRouteIsActive,
  logisticsRouteIsOperational,
  // Route Status Constants
  LOGISTICS_ROUTE_STATUS,
  LogisticsRouteStatusType,
  LogisticsRouteStatusCategory,
  LogisticsRouteStatusColor,
  LogisticsRouteStatusIcon,
  LogisticsRouteStatusTransition,
  logisticsRouteStatusGetLabel,
  logisticsRouteStatusGetCategory,
  logisticsRouteStatusIsOperational,
  logisticsRouteStatusIsAvailable,
  logisticsRouteStatusCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Route Extended Types
// ============================================================

/**
 * Route stop
 */
export interface RouteStop extends BaseEntity, Timestamp {
  id: ID;
  routeId: ID;
  address: Address;
  latitude: number;
  longitude: number;
  sequence: number;
  type: 'origin' | 'destination' | 'pickup' | 'dropoff' | 'waypoint';
  stopDuration: number;
  arrivalTime?: Date;
  departureTime?: Date;
  metadata?: Metadata;
}

/**
 * Route
 */
export interface Route extends BaseEntity, Timestamp {
  id: ID;
  type: LogisticsRouteType;
  status: LogisticsRouteStatusType;
  priority: LogisticsRoutePriority;
  condition: LogisticsRouteCondition;
  bangladeshRoute: LogisticsBangladeshRoute;
  name: string;
  description?: string;
  distance: number;
  duration: number;
  stops: RouteStop[];
  isActive: boolean;
  isOperational: boolean;
  metadata?: Metadata;
}

/**
 * Route filter
 */
export interface RouteFilter {
  ids?: ID[];
  types?: LogisticsRouteType[];
  statuses?: LogisticsRouteStatusType[];
  priorities?: LogisticsRoutePriority[];
  conditions?: LogisticsRouteCondition[];
  bangladeshRoutes?: LogisticsBangladeshRoute[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isOperational?: boolean;
  minDistance?: number;
  maxDistance?: number;
  minDuration?: number;
  maxDuration?: number;
  searchTerm?: string;
}

/**
 * Route statistics
 */
export interface RouteStatistics {
  totalRoutes: number;
  activeRoutes: number;
  operationalRoutes: number;
  byType: Record<LogisticsRouteType, number>;
  byStatus: Record<LogisticsRouteStatusType, number>;
  byPriority: Record<LogisticsRoutePriority, number>;
  byCondition: Record<LogisticsRouteCondition, number>;
  byBangladeshRoute: Record<LogisticsBangladeshRoute, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageDistance: number;
  maxDistance: number;
  minDistance: number;
  averageDuration: number;
  maxDuration: number;
  minDuration: number;
  mostFrequentType: LogisticsRouteType;
  mostFrequentStatus: LogisticsRouteStatusType;
  mostFrequentBangladeshRoute: LogisticsBangladeshRoute;
}

/**
 * Route summary
 */
export interface RouteSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalRoutes: number;
  active: number;
  operational: number;
  byType: Record<LogisticsRouteType, number>;
  byStatus: Record<LogisticsRouteStatusType, number>;
  byPriority: Record<LogisticsRoutePriority, number>;
  byCondition: Record<LogisticsRouteCondition, number>;
  byBangladeshRoute: Record<LogisticsBangladeshRoute, number>;
  routeTrend: {
    date: Date;
    total: number;
    active: number;
    operational: number;
  }[];
  topTypes: {
    type: LogisticsRouteType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: LogisticsRouteStatusType;
    count: number;
    label: string;
  }[];
  topBangladeshRoutes: {
    bangladeshRoute: LogisticsBangladeshRoute;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    averageDistance: number;
    maxDistance: number;
    minDistance: number;
    averageDuration: number;
    maxDuration: number;
    minDuration: number;
  };
}

/**
 * Route configuration
 */
export interface RouteConfiguration {
  enabled: boolean;
  defaultType: LogisticsRouteType;
  defaultPriority: LogisticsRoutePriority;
  defaultBangladeshRoute: LogisticsBangladeshRoute;
  requireStops: boolean;
  requireDistance: boolean;
  requireDuration: boolean;
  maxStopsPerRoute: number;
  maxRoutes: number;
  autoOptimize: boolean;
  optimizeStrategy: 'time' | 'distance' | 'cost' | 'priority';
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnStatusChange: boolean;
  alertConfig?: RouteAlertConfig;
}

/**
 * Route alert configuration
 */
export interface RouteAlertConfig {
  enabled: boolean;
  congestionAlert: boolean;
  conditionAlert: boolean;
  closureAlert: boolean;
  delayAlert: boolean;
  delayThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Route history
 */
export interface RouteHistory extends BaseEntity, Timestamp {
  id: ID;
  routeId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'status_change' | 'optimize' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Route validation
 */
export interface RouteValidation {
  isValid: boolean;
  routeId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Route export
 */
export interface RouteExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: RouteFilter;
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
  LOGISTICS_ROUTE,
  LogisticsRouteType,
  LogisticsRouteStatus,
  LogisticsRoutePriority,
  LogisticsRouteCondition,
  LogisticsBangladeshRoute,
  logisticsRouteGetTypeLabel,
  logisticsRouteGetStatusLabel,
  logisticsRouteGetPriorityLabel,
  logisticsRouteGetDistance,
  logisticsRouteGetDuration,
  logisticsRouteGetConditionLabel,
  logisticsRouteGetBangladeshRouteLabel,
  logisticsRouteIsActive,
  logisticsRouteIsOperational,
  // Route Status Constants
  LOGISTICS_ROUTE_STATUS,
  LogisticsRouteStatusType,
  LogisticsRouteStatusCategory,
  LogisticsRouteStatusColor,
  LogisticsRouteStatusIcon,
  LogisticsRouteStatusTransition,
  logisticsRouteStatusGetLabel,
  logisticsRouteStatusGetCategory,
  logisticsRouteStatusIsOperational,
  logisticsRouteStatusIsAvailable,
  logisticsRouteStatusCanTransition,
};
