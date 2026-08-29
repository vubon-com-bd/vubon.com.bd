/**
 * Shipment Tracking Event Types
 * Type definitions for logistics shipment tracking events based on shared-constants
 * @module ShipmentTrackingEventTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics tracking
// ============================================================
import {
  // Tracking Event Constants
  LOGISTICS_TRACKING_EVENT,
  LogisticsTrackingEventTypeType,
  LogisticsTrackingEventCategory,
  LogisticsTrackingEventSeverity,
  LogisticsTrackingEventColor,
  LogisticsTrackingEventIcon,
  logisticsTrackingEventGetLabel,
  logisticsTrackingEventGetCategory,
  logisticsTrackingEventGetSeverity,
  logisticsTrackingEventGetColor,
  logisticsTrackingEventGetIcon,
  logisticsTrackingEventGetDescription,
  // Tracking Event Type Constants
  LOGISTICS_TRACKING_EVENT_TYPE,
  LogisticsTrackingEventTypeCategory,
  LogisticsTrackingEventTypeSeverity,
  LogisticsTrackingEventTypePriority,
  LogisticsTrackingEventTypeVisibility,
  LogisticsTrackingEventTypeTrigger,
  LogisticsTrackingEventTypeLifecycle,
  logisticsTrackingEventTypeGetCategoryLabel,
  logisticsTrackingEventTypeGetSeverityLabel,
  logisticsTrackingEventTypeGetPriorityLabel,
  logisticsTrackingEventTypeGetVisibilityLabel,
  logisticsTrackingEventTypeGetTriggerLabel,
  logisticsTrackingEventTypeGetLifecycleLabel,
} from '@vubon/shared-constants';

// ============================================================
// Shipment Tracking Event Extended Types
// ============================================================

/**
 * Shipment tracking event filter
 */
export interface ShipmentTrackingEventFilter {
  ids?: ID[];
  trackingIds?: ID[];
  shipmentIds?: ID[];
  types?: LogisticsTrackingEventTypeType[];
  categories?: LogisticsTrackingEventCategory[];
  severities?: LogisticsTrackingEventSeverity[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isDelivered?: boolean;
  isInTransit?: boolean;
  isFailed?: boolean;
  searchTerm?: string;
}

/**
 * Shipment tracking event statistics
 */
export interface ShipmentTrackingEventStatistics {
  trackingId: ID;
  totalEvents: number;
  byType: Record<LogisticsTrackingEventTypeType, number>;
  byCategory: Record<LogisticsTrackingEventCategory, number>;
  bySeverity: Record<LogisticsTrackingEventSeverity, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageEventsPerShipment: number;
  maxEventsPerShipment: number;
  minEventsPerShipment: number;
  mostFrequentType: LogisticsTrackingEventTypeType;
  mostFrequentCategory: LogisticsTrackingEventCategory;
  mostFrequentSeverity: LogisticsTrackingEventSeverity;
}

/**
 * Shipment tracking event summary
 */
export interface ShipmentTrackingEventSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalEvents: number;
  byType: Record<LogisticsTrackingEventTypeType, number>;
  byCategory: Record<LogisticsTrackingEventCategory, number>;
  bySeverity: Record<LogisticsTrackingEventSeverity, number>;
  eventTrend: {
    date: Date;
    total: number;
    delivered: number;
    failed: number;
  }[];
  topTypes: {
    type: LogisticsTrackingEventTypeType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: LogisticsTrackingEventCategory;
    count: number;
    label: string;
  }[];
  topSeverities: {
    severity: LogisticsTrackingEventSeverity;
    count: number;
    label: string;
  }[];
}

/**
 * Shipment tracking event configuration
 */
export interface ShipmentTrackingEventConfiguration {
  enabled: boolean;
  logAllEvents: boolean;
  logDelivered: boolean;
  logInTransit: boolean;
  logFailed: boolean;
  maxEventsPerShipment: number;
  retentionDays: number;
  notificationOnDelivered: boolean;
  notificationOnFailed: boolean;
  alertConfig?: ShipmentTrackingEventAlertConfig;
}

/**
 * Shipment tracking event alert configuration
 */
export interface ShipmentTrackingEventAlertConfig {
  enabled: boolean;
  highSeverityAlert: boolean;
  highSeverityThreshold: number;
  failureAlert: boolean;
  suspiciousEventAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Shipment tracking event history
 */
export interface ShipmentTrackingEventHistory extends BaseEntity, Timestamp {
  id: ID;
  eventId: ID;
  trackingId: ID;
  shipmentId: ID;
  action: 'create' | 'update' | 'deliver' | 'fail' | 'complete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Shipment tracking event validation
 */
export interface ShipmentTrackingEventValidation {
  isValid: boolean;
  eventId: ID;
  trackingId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Shipment tracking event export
 */
export interface ShipmentTrackingEventExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ShipmentTrackingEventFilter;
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
  // Tracking Event Constants
  LOGISTICS_TRACKING_EVENT,
  LogisticsTrackingEventTypeType,
  LogisticsTrackingEventCategory,
  LogisticsTrackingEventSeverity,
  LogisticsTrackingEventColor,
  LogisticsTrackingEventIcon,
  logisticsTrackingEventGetLabel,
  logisticsTrackingEventGetCategory,
  logisticsTrackingEventGetSeverity,
  logisticsTrackingEventGetColor,
  logisticsTrackingEventGetIcon,
  logisticsTrackingEventGetDescription,
  // Tracking Event Type Constants
  LOGISTICS_TRACKING_EVENT_TYPE,
  LogisticsTrackingEventTypeCategory,
  LogisticsTrackingEventTypeSeverity,
  LogisticsTrackingEventTypePriority,
  LogisticsTrackingEventTypeVisibility,
  LogisticsTrackingEventTypeTrigger,
  LogisticsTrackingEventTypeLifecycle,
  logisticsTrackingEventTypeGetCategoryLabel,
  logisticsTrackingEventTypeGetSeverityLabel,
  logisticsTrackingEventTypeGetPriorityLabel,
  logisticsTrackingEventTypeGetVisibilityLabel,
  logisticsTrackingEventTypeGetTriggerLabel,
  logisticsTrackingEventTypeGetLifecycleLabel,
};
