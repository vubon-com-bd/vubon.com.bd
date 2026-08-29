/**
 * Shipment Types
 * Type definitions for logistics shipments based on shared-constants
 * @module ShipmentTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Address } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics
// ============================================================
import {
  // Logistics Main
  LOGISTICS,
  LogisticsType,
  LogisticsStatus,
  LogisticsCourierService,
  LogisticsDeliveryZone,
  LogisticsServiceType,
  LogisticsPaymentMethod,
  LogisticsTimeSlot,
  LogisticsTrackingStatus,
  logisticsGetTypeLabel,
  logisticsGetStatusLabel,
  logisticsGetCourierLabel,
  logisticsGetZoneLabel,
  logisticsGetServiceTypeLabel,
  logisticsGetPaymentMethodLabel,
  logisticsGetTimeSlotLabel,
  logisticsGetTrackingStatusLabel,
  logisticsIsDelivered,
  logisticsIsInTransit,
  logisticsIsFailed,
  logisticsGetCourierContact,
  logisticsGetCourierWebsite,
  // Shipment
  LogisticsShipmentStatus,
  LogisticsShipmentType,
  LogisticsShipmentPriority,
  // Delivery
  LogisticsDeliveryStatus,
  LogisticsDeliveryType,
  LogisticsDeliveryTimeSlotType,
  // Courier
  LogisticsCourierStatus,
  LogisticsCourierType,
  // Tracking
  LogisticsTrackingStatus as LogisticsTrackingStatusType,
  // Warehouse
  LogisticsWarehouseStatus,
  LogisticsWarehouseType,
  // Fulfillment
  LogisticsFulfillmentStatus,
  LogisticsFulfillmentType,
  // Dispatch
  LogisticsDispatchStatus,
  // Vehicle
  LogisticsVehicleStatus,
  LogisticsVehicleType,
  // Driver
  LogisticsDriverStatus,
  // Route
  LogisticsRouteStatus,
  // Zone
  LogisticsZoneType,
  // Shipping
  LogisticsShippingMethod,
  LogisticsShippingMethodType,
  LogisticsShippingRateType,
  // Packaging
  LogisticsPackagingType,
  // Return
  LogisticsReturnShipmentStatus,
  LogisticsReturnReason,
  LogisticsReturnReasonType,
  // Insurance
  LogisticsInsuranceStatus,
  LogisticsInsuranceType,
} from '@vubon/shared-constants';

// ============================================================
// Shipment Extended Types
// ============================================================

/**
 * Shipment item
 */
export interface ShipmentItem extends BaseEntity, Timestamp {
  id: ID;
  shipmentId: ID;
  orderId: ID;
  orderItemId: ID;
  productId: ID;
  variantId?: ID;
  sku: string;
  name: string;
  quantity: number;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  metadata?: Metadata;
}

/**
 * Shipment
 */
export interface Shipment extends BaseEntity, Timestamp {
  id: ID;
  orderId: ID;
  userId: ID;
  type: LogisticsShipmentType;
  status: LogisticsShipmentStatus;
  priority: LogisticsShipmentPriority;
  trackingNumber: string;
  courier: LogisticsCourierService;
  serviceType: LogisticsServiceType;
  zone: LogisticsDeliveryZone;
  items: ShipmentItem[];
  totalWeight: number;
  totalItems: number;
  packagingType: LogisticsPackagingType;
  shippingMethod: LogisticsShippingMethod;
  shippingRate: number;
  currency: string;
  paymentMethod: LogisticsPaymentMethod;
  fromAddress: Address;
  toAddress: Address;
  estimatedDelivery: Date;
  actualDelivery?: Date;
  isDelivered: boolean;
  isInTransit: boolean;
  isFailed: boolean;
  metadata?: Metadata;
}

/**
 * Shipment filter
 */
export interface ShipmentFilter {
  ids?: ID[];
  orderIds?: ID[];
  userIds?: ID[];
  types?: LogisticsShipmentType[];
  statuses?: LogisticsShipmentStatus[];
  priorities?: LogisticsShipmentPriority[];
  couriers?: LogisticsCourierService[];
  serviceTypes?: LogisticsServiceType[];
  zones?: LogisticsDeliveryZone[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isDelivered?: boolean;
  isInTransit?: boolean;
  isFailed?: boolean;
  searchTerm?: string;
  trackingNumber?: string;
}

/**
 * Shipment statistics
 */
export interface ShipmentStatistics {
  orderId: ID;
  totalShipments: number;
  activeShipments: number;
  deliveredShipments: number;
  inTransitShipments: number;
  failedShipments: number;
  byType: Record<LogisticsShipmentType, number>;
  byStatus: Record<LogisticsShipmentStatus, number>;
  byPriority: Record<LogisticsShipmentPriority, number>;
  byCourier: Record<LogisticsCourierService, number>;
  byServiceType: Record<LogisticsServiceType, number>;
  byZone: Record<LogisticsDeliveryZone, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageDeliveryTime: number;
  maxDeliveryTime: number;
  minDeliveryTime: number;
  totalWeight: number;
  totalItems: number;
  totalShippingCost: number;
  averageShippingCost: number;
  maxShippingCost: number;
  minShippingCost: number;
  onTimeDeliveryRate: number;
  delayedDeliveryRate: number;
  failedDeliveryRate: number;
  mostFrequentType: LogisticsShipmentType;
  mostFrequentStatus: LogisticsShipmentStatus;
  mostFrequentCourier: LogisticsCourierService;
}

/**
 * Shipment summary
 */
export interface ShipmentSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalShipments: number;
  active: number;
  delivered: number;
  inTransit: number;
  failed: number;
  byType: Record<LogisticsShipmentType, number>;
  byStatus: Record<LogisticsShipmentStatus, number>;
  byPriority: Record<LogisticsShipmentPriority, number>;
  byCourier: Record<LogisticsCourierService, number>;
  byServiceType: Record<LogisticsServiceType, number>;
  byZone: Record<LogisticsDeliveryZone, number>;
  shipmentTrend: {
    date: Date;
    total: number;
    delivered: number;
    failed: number;
  }[];
  topTypes: {
    type: LogisticsShipmentType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: LogisticsShipmentStatus;
    count: number;
    label: string;
  }[];
  topCouriers: {
    courier: LogisticsCourierService;
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
    totalShippingCost: number;
    averageShippingCost: number;
    maxShippingCost: number;
    minShippingCost: number;
  };
}

/**
 * Shipment configuration
 */
export interface ShipmentConfiguration {
  enabled: boolean;
  defaultType: LogisticsShipmentType;
  defaultPriority: LogisticsShipmentPriority;
  defaultCourier: LogisticsCourierService;
  defaultServiceType: LogisticsServiceType;
  defaultZone: LogisticsDeliveryZone;
  defaultPackagingType: LogisticsPackagingType;
  defaultShippingMethod: LogisticsShippingMethod;
  requireTrackingNumber: boolean;
  requireWeight: boolean;
  requireDimensions: boolean;
  autoAssignCourier: boolean;
  autoCalculateShipping: boolean;
  maxShipmentsPerOrder: number;
  maxWeightPerShipment: number;
  maxItemsPerShipment: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDeliver: boolean;
  notificationOnFailure: boolean;
  alertConfig?: ShipmentAlertConfig;
}

/**
 * Shipment alert configuration
 */
export interface ShipmentAlertConfig {
  enabled: boolean;
  deliveryDelayAlert: boolean;
  deliveryDelayThreshold: number;
  failureAlert: boolean;
  highWeightAlert: boolean;
  highWeightThreshold: number;
  highValueAlert: boolean;
  highValueThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Shipment history
 */
export interface ShipmentHistory extends BaseEntity, Timestamp {
  id: ID;
  shipmentId: ID;
  orderId: ID;
  userId: ID;
  action: 'create' | 'update' | 'assign' | 'pickup' | 'transit' | 'deliver' | 'fail' | 'return';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Shipment validation
 */
export interface ShipmentValidation {
  isValid: boolean;
  shipmentId: ID;
  orderId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Shipment tracking
 */
export interface ShipmentTracking extends BaseEntity, Timestamp {
  id: ID;
  shipmentId: ID;
  trackingNumber: string;
  status: LogisticsTrackingStatusType;
  location?: string;
  timestamp: Date;
  description: string;
  metadata?: Metadata;
}

/**
 * Shipment export
 */
export interface ShipmentExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ShipmentFilter;
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
  // Logistics Main
  LOGISTICS,
  LogisticsType,
  LogisticsStatus,
  LogisticsCourierService,
  LogisticsDeliveryZone,
  LogisticsServiceType,
  LogisticsPaymentMethod,
  LogisticsTimeSlot,
  LogisticsTrackingStatus,
  logisticsGetTypeLabel,
  logisticsGetStatusLabel,
  logisticsGetCourierLabel,
  logisticsGetZoneLabel,
  logisticsGetServiceTypeLabel,
  logisticsGetPaymentMethodLabel,
  logisticsGetTimeSlotLabel,
  logisticsGetTrackingStatusLabel,
  logisticsIsDelivered,
  logisticsIsInTransit,
  logisticsIsFailed,
  logisticsGetCourierContact,
  logisticsGetCourierWebsite,
  // Shipment
  LogisticsShipmentStatus,
  LogisticsShipmentType,
  LogisticsShipmentPriority,
  // Delivery
  LogisticsDeliveryStatus,
  LogisticsDeliveryType,
  LogisticsDeliveryTimeSlotType,
  // Courier
  LogisticsCourierStatus,
  LogisticsCourierType,
  // Tracking
  LogisticsTrackingStatus as LogisticsTrackingStatusType,
  // Warehouse
  LogisticsWarehouseStatus,
  LogisticsWarehouseType,
  // Fulfillment
  LogisticsFulfillmentStatus,
  LogisticsFulfillmentType,
  // Dispatch
  LogisticsDispatchStatus,
  // Vehicle
  LogisticsVehicleStatus,
  LogisticsVehicleType,
  // Driver
  LogisticsDriverStatus,
  // Route
  LogisticsRouteStatus,
  // Zone
  LogisticsZoneType,
  // Shipping
  LogisticsShippingMethod,
  LogisticsShippingMethodType,
  LogisticsShippingRateType,
  // Packaging
  LogisticsPackagingType,
  // Return
  LogisticsReturnShipmentStatus,
  LogisticsReturnReason,
  LogisticsReturnReasonType,
  // Insurance
  LogisticsInsuranceStatus,
  LogisticsInsuranceType,
};
