/**
 * Vendor Shipping Types
 * Type definitions for vendor shipping based on shared-constants
 * @module VendorShippingTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor shipping
// ============================================================
import {
  // Vendor Shipping
  VENDOR_SHIPPING,
  VendorShippingType,
  VendorShippingStatus,
  VendorShippingCarrier,
  VendorShippingMethod,
  VendorShippingZone,
  vendorShippingGetTypeLabel,
  vendorShippingGetStatusLabel,
  vendorShippingGetCarrierLabel,
  vendorShippingGetMethodLabel,
  vendorShippingGetZoneLabel,
  vendorShippingIsDelivered,
  vendorShippingIsInTransit,
  vendorShippingIsFailed,
  vendorShippingGetCarrierCost,
  vendorShippingGetExpressCost,
  vendorShippingGetOvernightCost,
  vendorShippingGetSameDayCost,
  vendorShippingGetDeliveryTime,
  vendorShippingGetCODCost,
  vendorShippingIsFree,
  vendorShippingGetCheapestCarrier,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Shipping Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Vendor shipping filter
 */
export interface VendorShippingFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  types?: VendorShippingType[];
  statuses?: VendorShippingStatus[];
  carriers?: VendorShippingCarrier[];
  methods?: VendorShippingMethod[];
  zones?: VendorShippingZone[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isDelivered?: boolean;
  isInTransit?: boolean;
  isFailed?: boolean;
  isFree?: boolean;
  minCost?: number;
  maxCost?: number;
  searchTerm?: string;
  trackingNumber?: string;
}

/**
 * Vendor shipping statistics
 */
export interface VendorShippingStatistics {
  vendorId: ID;
  totalShipments: number;
  deliveredShipments: number;
  inTransitShipments: number;
  failedShipments: number;
  pendingShipments: number;
  processingShipments: number;
  returnedShipments: number;
  byType: Record<VendorShippingType, number>;
  byStatus: Record<VendorShippingStatus, number>;
  byCarrier: Record<VendorShippingCarrier, number>;
  byMethod: Record<VendorShippingMethod, number>;
  byZone: Record<VendorShippingZone, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalCost: number;
  averageCost: number;
  maxCost: number;
  minCost: number;
  totalCODCharge: number;
  averageDeliveryTime: number;
  maxDeliveryTime: number;
  minDeliveryTime: number;
  onTimeDeliveryRate: number;
  mostFrequentType: VendorShippingType;
  mostFrequentStatus: VendorShippingStatus;
  mostFrequentCarrier: VendorShippingCarrier;
  mostFrequentZone: VendorShippingZone;
}

/**
 * Vendor shipping summary
 */
export interface VendorShippingSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalShipments: number;
  delivered: number;
  inTransit: number;
  failed: number;
  pending: number;
  processing: number;
  returned: number;
  byType: Record<VendorShippingType, number>;
  byStatus: Record<VendorShippingStatus, number>;
  byCarrier: Record<VendorShippingCarrier, number>;
  byMethod: Record<VendorShippingMethod, number>;
  byZone: Record<VendorShippingZone, number>;
  shippingTrend: {
    date: Date;
    total: number;
    delivered: number;
    failed: number;
  }[];
  topTypes: {
    type: VendorShippingType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: VendorShippingStatus;
    count: number;
    label: string;
  }[];
  topCarriers: {
    carrier: VendorShippingCarrier;
    count: number;
    label: string;
  }[];
  topZones: {
    zone: VendorShippingZone;
    count: number;
    label: string;
  }[];
  costSummary: {
    totalCost: number;
    averageCost: number;
    maxCost: number;
    minCost: number;
  };
  deliverySummary: {
    averageDeliveryTime: number;
    maxDeliveryTime: number;
    minDeliveryTime: number;
    onTimeDeliveryRate: number;
  };
}

/**
 * Vendor shipping configuration
 */
export interface VendorShippingConfiguration {
  enabled: boolean;
  defaultType: VendorShippingType;
  defaultCarrier: VendorShippingCarrier;
  defaultMethod: VendorShippingMethod;
  defaultZone: VendorShippingZone;
  freeShippingThreshold: number;
  maxWeight: number;
  allowCOD: boolean;
  allowInternational: boolean;
  requireTracking: boolean;
  requireWeight: boolean;
  autoCalculateCost: boolean;
  autoCalculateDeliveryTime: boolean;
  notificationOnShip: boolean;
  notificationOnDeliver: boolean;
  notificationOnFail: boolean;
  notificationOnReturn: boolean;
  alertConfig?: VendorShippingAlertConfig;
}

/**
 * Vendor shipping alert configuration
 */
export interface VendorShippingAlertConfig {
  enabled: boolean;
  delayAlert: boolean;
  delayThresholdHours: number;
  failureAlert: boolean;
  returnAlert: boolean;
  highCostAlert: boolean;
  highCostThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor shipping history
 */
export interface VendorShippingHistory extends BaseEntity, Timestamp {
  id: ID;
  shippingId: ID;
  vendorId: ID;
  userId: ID;
  action:
    'create' | 'update' | 'ship' | 'deliver' | 'fail' | 'return' | 'track' | 'update_tracking';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor shipping validation
 */
export interface VendorShippingValidation {
  isValid: boolean;
  shippingId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor shipping export
 */
export interface VendorShippingExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorShippingFilter;
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
  // Vendor Shipping
  VENDOR_SHIPPING,
  VendorShippingType,
  VendorShippingStatus,
  VendorShippingCarrier,
  VendorShippingMethod,
  VendorShippingZone,
  vendorShippingGetTypeLabel,
  vendorShippingGetStatusLabel,
  vendorShippingGetCarrierLabel,
  vendorShippingGetMethodLabel,
  vendorShippingGetZoneLabel,
  vendorShippingIsDelivered,
  vendorShippingIsInTransit,
  vendorShippingIsFailed,
  vendorShippingGetCarrierCost,
  vendorShippingGetExpressCost,
  vendorShippingGetOvernightCost,
  vendorShippingGetSameDayCost,
  vendorShippingGetDeliveryTime,
  vendorShippingGetCODCost,
  vendorShippingIsFree,
  vendorShippingGetCheapestCarrier,
};
