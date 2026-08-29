/**
 * Shipment Tracking Types
 * Type definitions for logistics shipment tracking based on shared-constants
 * @module ShipmentTrackingTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics tracking
// ============================================================
import {
  // Tracking Constants
  LOGISTICS_TRACKING,
  LogisticsTrackingType,
  LogisticsTrackingStatus,
  LogisticsTrackingEvent,
  LogisticsTrackingEventType,
  LogisticsTrackingProvider,
  logisticsTrackingGetTypeLabel,
  logisticsTrackingGetStatusLabel,
  logisticsTrackingGetProviderLabel,
  logisticsTrackingGetProviderURL,
  logisticsTrackingIsDelivered,
  logisticsTrackingIsInTransit,
  logisticsTrackingIsComplete,
  logisticsTrackingIsFailed,
  logisticsTrackingGetEventLabel,
  // Tracking Status Constants
  LOGISTICS_TRACKING_STATUS,
  LogisticsTrackingStatusType,
  LogisticsTrackingStatusCategory,
  LogisticsTrackingStatusColor,
  LogisticsTrackingStatusIcon,
  LogisticsTrackingStatusTransition,
  logisticsTrackingStatusGetLabel,
  logisticsTrackingStatusGetCategory,
  logisticsTrackingStatusIsActive,
  logisticsTrackingStatusIsComplete,
  logisticsTrackingStatusCanTransition,
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
// Shipment Tracking Event Type
// ============================================================

/**
 * Shipment tracking event
 */
export interface ShipmentTrackingEvent extends BaseEntity, Timestamp {
  id: ID;
  trackingId: ID;
  shipmentId: ID;
  type: LogisticsTrackingEventTypeType;
  category: LogisticsTrackingEventCategory;
  severity: LogisticsTrackingEventSeverity;
  description: string;
  location?: string;
  timestamp: Date;
  metadata?: Metadata;
}

// ============================================================
// Shipment Tracking Extended Types
// ============================================================

/**
 * Shipment tracking filter
 */
export interface ShipmentTrackingFilter {
  ids?: ID[];
  shipmentIds?: ID[];
  providers?: LogisticsTrackingProvider[];
  types?: LogisticsTrackingType[];
  statuses?: LogisticsTrackingStatusType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isDelivered?: boolean;
  isInTransit?: boolean;
  isComplete?: boolean;
  isFailed?: boolean;
  searchTerm?: string;
  trackingNumber?: string;
}

/**
 * Shipment tracking statistics
 */
export interface ShipmentTrackingStatistics {
  shipmentId: ID;
  totalTrackingEvents: number;
  byProvider: Record<LogisticsTrackingProvider, number>;
  byStatus: Record<LogisticsTrackingStatusType, number>;
  byType: Record<LogisticsTrackingType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageEventsPerShipment: number;
  maxEventsPerShipment: number;
  minEventsPerShipment: number;
  deliveredRate: number;
  inTransitRate: number;
  failedRate: number;
  mostFrequentProvider: LogisticsTrackingProvider;
  mostFrequentStatus: LogisticsTrackingStatusType;
}

/**
 * Shipment tracking summary
 */
export interface ShipmentTrackingSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalShipments: number;
  delivered: number;
  inTransit: number;
  complete: number;
  failed: number;
  byProvider: Record<LogisticsTrackingProvider, number>;
  byStatus: Record<LogisticsTrackingStatusType, number>;
  byType: Record<LogisticsTrackingType, number>;
  trackingTrend: {
    date: Date;
    total: number;
    delivered: number;
    failed: number;
  }[];
  topProviders: {
    provider: LogisticsTrackingProvider;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: LogisticsTrackingStatusType;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    deliveredRate: number;
    inTransitRate: number;
    failedRate: number;
    averageDeliveryTime: number;
  };
}

/**
 * Shipment tracking configuration
 */
export interface ShipmentTrackingConfiguration {
  enabled: boolean;
  defaultProvider: LogisticsTrackingProvider;
  defaultType: LogisticsTrackingType;
  requireTrackingNumber: boolean;
  autoUpdate: boolean;
  updateIntervalMinutes: number;
  maxEventsPerShipment: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDeliver: boolean;
  notificationOnFailure: boolean;
  alertConfig?: ShipmentTrackingAlertConfig;
}

/**
 * Shipment tracking alert configuration
 */
export interface ShipmentTrackingAlertConfig {
  enabled: boolean;
  updateFailureAlert: boolean;
  delayedUpdateAlert: boolean;
  delayedUpdateThreshold: number;
  suspiciousActivityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Shipment tracking history
 */
export interface ShipmentTrackingHistory extends BaseEntity, Timestamp {
  id: ID;
  trackingId: ID;
  shipmentId: ID;
  action: 'create' | 'update' | 'event_add' | 'deliver' | 'fail' | 'complete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Shipment tracking validation
 */
export interface ShipmentTrackingValidation {
  isValid: boolean;
  trackingId: ID;
  shipmentId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Shipment tracking export
 */
export interface ShipmentTrackingExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ShipmentTrackingFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything (শুধুমাত্র কনস্ট্যান্ট এবং ফাংশন)
// ============================================================

export {
  // Tracking Constants
  LOGISTICS_TRACKING,
  LogisticsTrackingType,
  LogisticsTrackingStatus,
  LogisticsTrackingEvent,
  LogisticsTrackingEventType,
  LogisticsTrackingProvider,
  logisticsTrackingGetTypeLabel,
  logisticsTrackingGetStatusLabel,
  logisticsTrackingGetProviderLabel,
  logisticsTrackingGetProviderURL,
  logisticsTrackingIsDelivered,
  logisticsTrackingIsInTransit,
  logisticsTrackingIsComplete,
  logisticsTrackingIsFailed,
  logisticsTrackingGetEventLabel,
  // Tracking Status Constants
  LOGISTICS_TRACKING_STATUS,
  LogisticsTrackingStatusCategory,
  LogisticsTrackingStatusColor,
  LogisticsTrackingStatusIcon,
  LogisticsTrackingStatusTransition,
  logisticsTrackingStatusGetLabel,
  logisticsTrackingStatusGetCategory,
  logisticsTrackingStatusIsActive,
  logisticsTrackingStatusIsComplete,
  logisticsTrackingStatusCanTransition,
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
