/**
 * Delivery Types
 * Type definitions for logistics delivery based on shared-constants
 * @module DeliveryTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Address } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics delivery
// ============================================================
import {
  // Delivery Constants
  LOGISTICS_DELIVERY,
  LogisticsDeliveryType,
  LogisticsDeliveryStatus,
  LogisticsDeliveryMethod,
  LogisticsDeliveryZone,
  logisticsDeliveryGetTypeLabel,
  logisticsDeliveryGetStatusLabel,
  logisticsDeliveryGetMethodLabel,
  logisticsDeliveryGetZoneLabel,
  logisticsDeliveryGetCharge,
  logisticsDeliveryGetTimeEstimate,
  logisticsDeliveryIsDelivered,
  logisticsDeliveryIsInTransit,
  logisticsDeliveryIsFailed,
  logisticsDeliveryGetCODFreeAmount,
  logisticsDeliveryIsCODFree,
  logisticsDeliveryGetCODCharge,
  // Delivery Status Constants
  LOGISTICS_DELIVERY_STATUS,
  LogisticsDeliveryStatusType,
  LogisticsDeliveryStatusCategory,
  LogisticsDeliveryStatusColor,
  LogisticsDeliveryStatusIcon,
  LogisticsDeliveryStatusTransition,
  logisticsDeliveryStatusGetLabel,
  logisticsDeliveryStatusGetCategory,
  logisticsDeliveryStatusIsActive,
  logisticsDeliveryStatusIsComplete,
  logisticsDeliveryStatusCanTransition,
  // Delivery Type Constants
  LOGISTICS_DELIVERY_TYPE,
  LogisticsDeliveryTypeType,
  LogisticsDeliveryTypeCategory,
  LogisticsDeliveryTypeIcon,
  LogisticsDeliveryTypeColor,
  logisticsDeliveryTypeGetLabel,
  logisticsDeliveryTypeGetCategory,
  logisticsDeliveryTypeGetIcon,
  logisticsDeliveryTypeGetColor,
  logisticsDeliveryTypeGetDeliveryTime,
  logisticsDeliveryTypeGetPriceMultiplier,
  logisticsDeliveryTypeIsPremium,
} from '@vubon/shared-constants';

// ============================================================
// Delivery Extended Types
// ============================================================

/**
 * Delivery
 */
export interface Delivery extends BaseEntity, Timestamp {
  id: ID;
  orderId: ID;
  shipmentId: ID;
  userId: ID;
  type: LogisticsDeliveryTypeType;
  status: LogisticsDeliveryStatusType;
  method: LogisticsDeliveryMethod;
  zone: LogisticsDeliveryZone;
  fromAddress: Address;
  toAddress: Address;
  estimatedDelivery: Date;
  actualDelivery?: Date;
  charge: number;
  currency: string;
  isDelivered: boolean;
  isInTransit: boolean;
  isFailed: boolean;
  metadata?: Metadata;
}

/**
 * Delivery filter
 */
export interface DeliveryFilter {
  ids?: ID[];
  orderIds?: ID[];
  shipmentIds?: ID[];
  userIds?: ID[];
  types?: LogisticsDeliveryTypeType[];
  statuses?: LogisticsDeliveryStatusType[];
  methods?: LogisticsDeliveryMethod[];
  zones?: LogisticsDeliveryZone[];
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
 * Delivery statistics
 */
export interface DeliveryStatistics {
  orderId: ID;
  totalDeliveries: number;
  activeDeliveries: number;
  deliveredDeliveries: number;
  inTransitDeliveries: number;
  failedDeliveries: number;
  byType: Record<LogisticsDeliveryTypeType, number>;
  byStatus: Record<LogisticsDeliveryStatusType, number>;
  byMethod: Record<LogisticsDeliveryMethod, number>;
  byZone: Record<LogisticsDeliveryZone, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageDeliveryTime: number;
  maxDeliveryTime: number;
  minDeliveryTime: number;
  totalCharge: number;
  averageCharge: number;
  maxCharge: number;
  minCharge: number;
  onTimeDeliveryRate: number;
  delayedDeliveryRate: number;
  failedDeliveryRate: number;
  mostFrequentType: LogisticsDeliveryTypeType;
  mostFrequentStatus: LogisticsDeliveryStatusType;
  mostFrequentMethod: LogisticsDeliveryMethod;
}

/**
 * Delivery summary
 */
export interface DeliverySummary {
  period: {
    start: Date;
    end: Date;
  };
  totalDeliveries: number;
  active: number;
  delivered: number;
  inTransit: number;
  failed: number;
  byType: Record<LogisticsDeliveryTypeType, number>;
  byStatus: Record<LogisticsDeliveryStatusType, number>;
  byMethod: Record<LogisticsDeliveryMethod, number>;
  byZone: Record<LogisticsDeliveryZone, number>;
  deliveryTrend: {
    date: Date;
    total: number;
    delivered: number;
    failed: number;
  }[];
  topTypes: {
    type: LogisticsDeliveryTypeType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: LogisticsDeliveryStatusType;
    count: number;
    label: string;
  }[];
  topMethods: {
    method: LogisticsDeliveryMethod;
    count: number;
    label: string;
  }[];
  topZones: {
    zone: LogisticsDeliveryZone;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    onTimeDeliveryRate: number;
    delayedDeliveryRate: number;
    failedDeliveryRate: number;
    averageDeliveryTime: number;
  };
  financialSummary: {
    totalCharge: number;
    averageCharge: number;
    maxCharge: number;
    minCharge: number;
  };
}

/**
 * Delivery configuration
 */
export interface DeliveryConfiguration {
  enabled: boolean;
  defaultType: LogisticsDeliveryTypeType;
  defaultMethod: LogisticsDeliveryMethod;
  defaultZone: LogisticsDeliveryZone;
  requireAddress: boolean;
  requireContact: boolean;
  autoAssign: boolean;
  autoAssignStrategy: 'cost' | 'time' | 'zone' | 'preference';
  maxDeliveriesPerDay: number;
  maxWeightPerDelivery: number;
  maxItemsPerDelivery: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDeliver: boolean;
  notificationOnFailure: boolean;
  alertConfig?: DeliveryAlertConfig;
}

/**
 * Delivery alert configuration
 */
export interface DeliveryAlertConfig {
  enabled: boolean;
  deliveryDelayAlert: boolean;
  deliveryDelayThreshold: number;
  failureAlert: boolean;
  highValueAlert: boolean;
  highValueThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Delivery history
 */
export interface DeliveryHistory extends BaseEntity, Timestamp {
  id: ID;
  deliveryId: ID;
  orderId: ID;
  userId: ID;
  action: 'create' | 'update' | 'assign' | 'transit' | 'deliver' | 'fail' | 'return';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Delivery validation
 */
export interface DeliveryValidation {
  isValid: boolean;
  deliveryId: ID;
  orderId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Delivery export
 */
export interface DeliveryExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: DeliveryFilter;
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
  // Delivery Constants
  LOGISTICS_DELIVERY,
  LogisticsDeliveryType,
  LogisticsDeliveryStatus,
  LogisticsDeliveryMethod,
  LogisticsDeliveryZone,
  logisticsDeliveryGetTypeLabel,
  logisticsDeliveryGetStatusLabel,
  logisticsDeliveryGetMethodLabel,
  logisticsDeliveryGetZoneLabel,
  logisticsDeliveryGetCharge,
  logisticsDeliveryGetTimeEstimate,
  logisticsDeliveryIsDelivered,
  logisticsDeliveryIsInTransit,
  logisticsDeliveryIsFailed,
  logisticsDeliveryGetCODFreeAmount,
  logisticsDeliveryIsCODFree,
  logisticsDeliveryGetCODCharge,
  // Delivery Status Constants
  LOGISTICS_DELIVERY_STATUS,
  LogisticsDeliveryStatusType,
  LogisticsDeliveryStatusCategory,
  LogisticsDeliveryStatusColor,
  LogisticsDeliveryStatusIcon,
  LogisticsDeliveryStatusTransition,
  logisticsDeliveryStatusGetLabel,
  logisticsDeliveryStatusGetCategory,
  logisticsDeliveryStatusIsActive,
  logisticsDeliveryStatusIsComplete,
  logisticsDeliveryStatusCanTransition,
  // Delivery Type Constants
  LOGISTICS_DELIVERY_TYPE,
  LogisticsDeliveryTypeType,
  LogisticsDeliveryTypeCategory,
  LogisticsDeliveryTypeIcon,
  LogisticsDeliveryTypeColor,
  logisticsDeliveryTypeGetLabel,
  logisticsDeliveryTypeGetCategory,
  logisticsDeliveryTypeGetIcon,
  logisticsDeliveryTypeGetColor,
  logisticsDeliveryTypeGetDeliveryTime,
  logisticsDeliveryTypeGetPriceMultiplier,
  logisticsDeliveryTypeIsPremium,
};
