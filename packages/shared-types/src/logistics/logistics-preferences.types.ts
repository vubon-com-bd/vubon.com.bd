/**
 * Logistics Preferences Types
 * Type definitions for logistics preferences based on shared-constants
 * @module LogisticsPreferencesTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics
// ============================================================
import {
  // Logistics Main
  LogisticsType,
  LogisticsStatus,
  LogisticsCourierService,
  LogisticsDeliveryZone,
  LogisticsServiceType,
  LogisticsPaymentMethod,
  LogisticsTimeSlot,
  LogisticsTrackingStatus,
  // Shipment
  LogisticsShipmentType,
  LogisticsShipmentStatus,
  LogisticsShipmentPriority,
  // Delivery
  LogisticsDeliveryType,
  LogisticsDeliveryStatus,
  LogisticsDeliveryMethod,
  // Courier
  LogisticsCourierType,
  LogisticsCourierStatus,
  LogisticsCourierProvider,
  LogisticsCourierServiceType,
  LogisticsCourierPaymentMethod,
  // Warehouse
  LogisticsWarehouseType,
  LogisticsWarehouseStatus,
  LogisticsWarehouseLocation,
  LogisticsWarehouseStorageType,
  LogisticsWarehouseZone,
  // Fulfillment
  LogisticsFulfillmentType,
  LogisticsFulfillmentStatus,
  LogisticsFulfillmentMethod,
  LogisticsFulfillmentPriority,
  LogisticsFulfillmentCenter,
  // Dispatch
  LogisticsDispatchType,
  LogisticsDispatchStatus,
  LogisticsDispatchMethod,
  LogisticsDispatchPriority,
  LogisticsDispatchWindow,
  // Vehicle
  LogisticsVehicleType,
  LogisticsVehicleStatus,
  LogisticsVehicleFuelType,
  LogisticsVehicleCondition,
  LogisticsVehicleRegistrationType,
  // Driver
  LogisticsDriverType,
  LogisticsDriverStatus,
  LogisticsDriverLicenseType,
  LogisticsDriverLicenseClass,
  LogisticsDriverExperienceLevel,
  LogisticsDriverDocumentType,
  // Route
  LogisticsRouteType,
  LogisticsRouteStatus,
  LogisticsRoutePriority,
  LogisticsRouteCondition,
  LogisticsBangladeshRoute,
  // Zone
  LogisticsZoneType,
  LogisticsZoneDivision,
  LogisticsZoneDistrict,
  LogisticsZoneStatus,
  // Shipping
  LogisticsShippingMethod,
  LogisticsShippingMethodType,
  LogisticsShippingMethodStatus,
  LogisticsShippingRateType,
  LogisticsShippingRateStatus,
  LogisticsShippingRateZone,
  // Packaging
  LogisticsPackagingType,
  LogisticsPackagingStatus,
  LogisticsPackagingMaterial,
  LogisticsPackagingSize,
  LogisticsPackagingEcoFriendly,
  // Return
  LogisticsReturnShipmentType,
  LogisticsReturnShipmentStatus,
  LogisticsReturnShipmentPriority,
  LogisticsReturnShipmentMethod,
  LogisticsReturnReason,
  LogisticsReturnReasonCategory,
  LogisticsReturnReasonType,
  LogisticsReturnReasonSeverity,
  // Insurance
  LogisticsInsuranceType,
  LogisticsInsuranceStatus,
  LogisticsInsuranceProvider,
  LogisticsInsuranceCoverageType,
} from '@vubon/shared-constants';

// ============================================================
// Logistics Preferences Types
// ============================================================

/**
 * Logistics preferences
 */
export interface LogisticsPreferences extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  preferredShipmentType: LogisticsShipmentType;
  preferredDeliveryType: LogisticsDeliveryType;
  preferredCourierType: LogisticsCourierType;
  preferredWarehouseType: LogisticsWarehouseType;
  preferredFulfillmentType: LogisticsFulfillmentType;
  preferredDispatchType: LogisticsDispatchType;
  preferredVehicleType: LogisticsVehicleType;
  preferredDriverType: LogisticsDriverType;
  preferredRouteType: LogisticsRouteType;
  preferredZoneType: LogisticsZoneType;
  preferredShippingMethod: LogisticsShippingMethod;
  preferredPackagingType: LogisticsPackagingType;
  preferredReturnType: LogisticsReturnShipmentType;
  preferredInsuranceType: LogisticsInsuranceType;
  metadata?: Metadata;
}

/**
 * Logistics preferences filter
 */
export interface LogisticsPreferencesFilter {
  ids?: ID[];
  userIds?: ID[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchTerm?: string;
}

/**
 * Logistics preferences summary
 */
export interface LogisticsPreferencesSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPreferences: number;
  preferredShipmentType: LogisticsShipmentType;
  preferredDeliveryType: LogisticsDeliveryType;
  preferredCourierType: LogisticsCourierType;
  preferredWarehouseType: LogisticsWarehouseType;
  preferredFulfillmentType: LogisticsFulfillmentType;
  preferredDispatchType: LogisticsDispatchType;
  preferredVehicleType: LogisticsVehicleType;
  preferredDriverType: LogisticsDriverType;
  preferredRouteType: LogisticsRouteType;
  preferredZoneType: LogisticsZoneType;
  preferredShippingMethod: LogisticsShippingMethod;
  preferredPackagingType: LogisticsPackagingType;
  preferredReturnType: LogisticsReturnShipmentType;
  preferredInsuranceType: LogisticsInsuranceType;
}

/**
 * Logistics preferences configuration
 */
export interface LogisticsPreferencesConfiguration {
  enabled: boolean;
  defaultPreferences: LogisticsPreferences;
  allowCustomization: boolean;
  requireApproval: boolean;
  maxPreferencesPerUser: number;
  notificationOnUpdate: boolean;
  notificationOnError: boolean;
  alertConfig?: LogisticsPreferencesAlertConfig;
}

/**
 * Logistics preferences alert configuration
 */
export interface LogisticsPreferencesAlertConfig {
  enabled: boolean;
  updateFailureAlert: boolean;
  invalidPreferenceAlert: boolean;
  conflictAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Logistics preferences history
 */
export interface LogisticsPreferencesHistory extends BaseEntity, Timestamp {
  id: ID;
  preferencesId: ID;
  userId?: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Logistics preferences validation
 */
export interface LogisticsPreferencesValidation {
  isValid: boolean;
  preferencesId: ID;
  key: string;
  value: unknown;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Logistics preferences export
 */
export interface LogisticsPreferencesExport extends BaseEntity, Timestamp {
  id: ID;
  userId?: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  preferences: LogisticsPreferences;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Logistics preferences import
 */
export interface LogisticsPreferencesImport extends BaseEntity, Timestamp {
  id: ID;
  userId?: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  data: string;
  filename: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  importedPreferences: number;
  failedPreferences: number;
  importErrors?: string[];
  importedAt?: Date;
  metadata?: Metadata;
}

/**
 * Logistics preferences default
 */
export interface LogisticsPreferencesDefault {
  shipmentType: LogisticsShipmentType;
  deliveryType: LogisticsDeliveryType;
  courierType: LogisticsCourierType;
  warehouseType: LogisticsWarehouseType;
  fulfillmentType: LogisticsFulfillmentType;
  dispatchType: LogisticsDispatchType;
  vehicleType: LogisticsVehicleType;
  driverType: LogisticsDriverType;
  routeType: LogisticsRouteType;
  zoneType: LogisticsZoneType;
  shippingMethod: LogisticsShippingMethod;
  packagingType: LogisticsPackagingType;
  returnType: LogisticsReturnShipmentType;
  insuranceType: LogisticsInsuranceType;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Logistics Main
  LogisticsType,
  LogisticsStatus,
  LogisticsCourierService,
  LogisticsDeliveryZone,
  LogisticsServiceType,
  LogisticsPaymentMethod,
  LogisticsTimeSlot,
  LogisticsTrackingStatus,
  // Shipment
  LogisticsShipmentType,
  LogisticsShipmentStatus,
  LogisticsShipmentPriority,
  // Delivery
  LogisticsDeliveryType,
  LogisticsDeliveryStatus,
  LogisticsDeliveryMethod,
  // Courier
  LogisticsCourierType,
  LogisticsCourierStatus,
  LogisticsCourierProvider,
  LogisticsCourierServiceType,
  LogisticsCourierPaymentMethod,
  // Warehouse
  LogisticsWarehouseType,
  LogisticsWarehouseStatus,
  LogisticsWarehouseLocation,
  LogisticsWarehouseStorageType,
  LogisticsWarehouseZone,
  // Fulfillment
  LogisticsFulfillmentType,
  LogisticsFulfillmentStatus,
  LogisticsFulfillmentMethod,
  LogisticsFulfillmentPriority,
  LogisticsFulfillmentCenter,
  // Dispatch
  LogisticsDispatchType,
  LogisticsDispatchStatus,
  LogisticsDispatchMethod,
  LogisticsDispatchPriority,
  LogisticsDispatchWindow,
  // Vehicle
  LogisticsVehicleType,
  LogisticsVehicleStatus,
  LogisticsVehicleFuelType,
  LogisticsVehicleCondition,
  LogisticsVehicleRegistrationType,
  // Driver
  LogisticsDriverType,
  LogisticsDriverStatus,
  LogisticsDriverLicenseType,
  LogisticsDriverLicenseClass,
  LogisticsDriverExperienceLevel,
  LogisticsDriverDocumentType,
  // Route
  LogisticsRouteType,
  LogisticsRouteStatus,
  LogisticsRoutePriority,
  LogisticsRouteCondition,
  LogisticsBangladeshRoute,
  // Zone
  LogisticsZoneType,
  LogisticsZoneDivision,
  LogisticsZoneDistrict,
  LogisticsZoneStatus,
  // Shipping
  LogisticsShippingMethod,
  LogisticsShippingMethodType,
  LogisticsShippingMethodStatus,
  LogisticsShippingRateType,
  LogisticsShippingRateStatus,
  LogisticsShippingRateZone,
  // Packaging
  LogisticsPackagingType,
  LogisticsPackagingStatus,
  LogisticsPackagingMaterial,
  LogisticsPackagingSize,
  LogisticsPackagingEcoFriendly,
  // Return
  LogisticsReturnShipmentType,
  LogisticsReturnShipmentStatus,
  LogisticsReturnShipmentPriority,
  LogisticsReturnShipmentMethod,
  LogisticsReturnReason,
  LogisticsReturnReasonCategory,
  LogisticsReturnReasonType,
  LogisticsReturnReasonSeverity,
  // Insurance
  LogisticsInsuranceType,
  LogisticsInsuranceStatus,
  LogisticsInsuranceProvider,
  LogisticsInsuranceCoverageType,
};
