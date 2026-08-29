/**
 * Logistics Settings Types
 * Type definitions for logistics settings based on shared-constants
 * @module LogisticsSettingsTypes
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
// Logistics Settings Types
// ============================================================

/**
 * Logistics settings
 */
export interface LogisticsSettings extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  defaultShipmentType: LogisticsShipmentType;
  defaultDeliveryType: LogisticsDeliveryType;
  defaultCourierType: LogisticsCourierType;
  defaultWarehouseType: LogisticsWarehouseType;
  defaultFulfillmentType: LogisticsFulfillmentType;
  defaultDispatchType: LogisticsDispatchType;
  defaultVehicleType: LogisticsVehicleType;
  defaultDriverType: LogisticsDriverType;
  defaultRouteType: LogisticsRouteType;
  defaultZoneType: LogisticsZoneType;
  defaultShippingMethod: LogisticsShippingMethod;
  defaultPackagingType: LogisticsPackagingType;
  defaultReturnType: LogisticsReturnShipmentType;
  defaultInsuranceType: LogisticsInsuranceType;
  metadata?: Metadata;
}

/**
 * Logistics settings configuration
 */
export interface LogisticsSettingsConfiguration {
  enabled: boolean;
  defaultShipmentType: LogisticsShipmentType;
  defaultDeliveryType: LogisticsDeliveryType;
  defaultCourierType: LogisticsCourierType;
  defaultWarehouseType: LogisticsWarehouseType;
  defaultFulfillmentType: LogisticsFulfillmentType;
  defaultDispatchType: LogisticsDispatchType;
  defaultVehicleType: LogisticsVehicleType;
  defaultDriverType: LogisticsDriverType;
  defaultRouteType: LogisticsRouteType;
  defaultZoneType: LogisticsZoneType;
  defaultShippingMethod: LogisticsShippingMethod;
  defaultPackagingType: LogisticsPackagingType;
  defaultReturnType: LogisticsReturnShipmentType;
  defaultInsuranceType: LogisticsInsuranceType;
  autoAssign: boolean;
  autoAssignStrategy: 'cost' | 'time' | 'availability' | 'preference' | 'distance';
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnError: boolean;
  alertConfig?: LogisticsSettingsAlertConfig;
}

/**
 * Logistics settings filter
 */
export interface LogisticsSettingsFilter {
  ids?: ID[];
  userIds?: ID[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchTerm?: string;
}

/**
 * Logistics settings summary
 */
export interface LogisticsSettingsSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSettings: number;
  activeSettings: number;
  defaultShipmentType: LogisticsShipmentType;
  defaultDeliveryType: LogisticsDeliveryType;
  defaultCourierType: LogisticsCourierType;
  defaultWarehouseType: LogisticsWarehouseType;
  defaultFulfillmentType: LogisticsFulfillmentType;
  defaultDispatchType: LogisticsDispatchType;
  defaultVehicleType: LogisticsVehicleType;
  defaultDriverType: LogisticsDriverType;
  defaultRouteType: LogisticsRouteType;
  defaultZoneType: LogisticsZoneType;
  defaultShippingMethod: LogisticsShippingMethod;
  defaultPackagingType: LogisticsPackagingType;
  defaultReturnType: LogisticsReturnShipmentType;
  defaultInsuranceType: LogisticsInsuranceType;
}

/**
 * Logistics settings configuration
 */
export interface LogisticsSettingsConfigurationType {
  enabled: boolean;
  defaultShipmentType: LogisticsShipmentType;
  defaultDeliveryType: LogisticsDeliveryType;
  defaultCourierType: LogisticsCourierType;
  defaultWarehouseType: LogisticsWarehouseType;
  defaultFulfillmentType: LogisticsFulfillmentType;
  defaultDispatchType: LogisticsDispatchType;
  defaultVehicleType: LogisticsVehicleType;
  defaultDriverType: LogisticsDriverType;
  defaultRouteType: LogisticsRouteType;
  defaultZoneType: LogisticsZoneType;
  defaultShippingMethod: LogisticsShippingMethod;
  defaultPackagingType: LogisticsPackagingType;
  defaultReturnType: LogisticsReturnShipmentType;
  defaultInsuranceType: LogisticsInsuranceType;
  requireApproval: boolean;
  requireVerification: boolean;
  autoAssign: boolean;
  autoAssignStrategy: 'cost' | 'time' | 'availability' | 'preference' | 'distance';
  maxShipmentsPerDay: number;
  maxDeliveriesPerDay: number;
  maxItemsPerShipment: number;
  maxWeightPerShipment: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnError: boolean;
  alertConfig?: LogisticsSettingsAlertConfig;
}

/**
 * Logistics settings alert configuration
 */
export interface LogisticsSettingsAlertConfig {
  enabled: boolean;
  updateFailureAlert: boolean;
  invalidSettingAlert: boolean;
  conflictAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Logistics settings history
 */
export interface LogisticsSettingsHistory extends BaseEntity, Timestamp {
  id: ID;
  settingsId: ID;
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
 * Logistics settings validation
 */
export interface LogisticsSettingsValidation {
  isValid: boolean;
  settingsId: ID;
  key: string;
  value: unknown;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Logistics settings export
 */
export interface LogisticsSettingsExport extends BaseEntity, Timestamp {
  id: ID;
  userId?: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  settings: LogisticsSettings;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Logistics settings import
 */
export interface LogisticsSettingsImport extends BaseEntity, Timestamp {
  id: ID;
  userId?: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  data: string;
  filename: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  importedSettings: number;
  failedSettings: number;
  importErrors?: string[];
  importedAt?: Date;
  metadata?: Metadata;
}

/**
 * Logistics settings default
 */
export interface LogisticsSettingsDefault {
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
