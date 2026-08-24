/**
 * Logistics Constants Index
 * Export all logistics constants and types for easy importing
 */

// Logistics Main Constants
export {
  LOGISTICS,
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
} from './logistics.constants';

export type {
  LogisticsType,
  LogisticsStatus,
  LogisticsCourierService,
  LogisticsDeliveryZone,
  LogisticsServiceType,
  LogisticsPaymentMethod,
  LogisticsTimeSlot,
  LogisticsTrackingStatus,
} from './logistics.constants';

// Logistics Error Constants
export {
  LOGISTICS_ERROR,
  logisticsErrorGetMessage,
  logisticsErrorGetCategory,
  logisticsErrorGetSeverity,
  logisticsErrorIsRetryable,
  logisticsErrorGetHttpStatus,
} from './logistics-error.constants';

export type {
  LogisticsErrorCode,
  LogisticsErrorCategory,
  LogisticsErrorSeverity,
} from './logistics-error.constants';

// Logistics Permission Constants
export {
  LOGISTICS_PERMISSION,
  logisticsPermissionGetRoleLabel,
  logisticsPermissionGetActionLabel,
  logisticsPermissionGetLevelLabel,
  logisticsPermissionGetScopeLabel,
  logisticsPermissionHasPermission,
  logisticsPermissionGetRolePermissions,
  logisticsPermissionGetAllRolePermissions,
} from './logistics-permission.constants';

export type {
  LogisticsPermissionModule,
  LogisticsPermissionAction,
  LogisticsPermissionRole,
  LogisticsPermissionLevel,
  LogisticsPermissionScope,
} from './logistics-permission.constants';

// Shipment Constants
export * from './shipment/shipment.constants';
export * from './shipment/shipment-status.constants';
export * from './shipment/shipment-type.constants';
export * from './shipment/shipment-priority.constants';

// Delivery Constants
export * from './delivery/delivery.constants';
export * from './delivery/delivery-status.constants';
export * from './delivery/delivery-type.constants';
export * from './delivery/delivery-time-slot.constants';

// Courier Constants
export * from './courier/courier.constants';
export * from './courier/courier-status.constants';
export * from './courier/courier-type.constants';

// Tracking Constants
export * from './tracking/tracking.constants';
export * from './tracking/tracking-status.constants';

// Tracking Event Constants
export {
  LOGISTICS_TRACKING_EVENT,
  logisticsTrackingEventGetLabel,
  logisticsTrackingEventGetCategory,
  logisticsTrackingEventGetSeverity,
  logisticsTrackingEventGetColor,
  logisticsTrackingEventGetIcon,
  logisticsTrackingEventGetDescription,
} from './tracking/tracking-event.constants';

export type {
  LogisticsTrackingEventType as LogisticsTrackingEventTypeType,
  LogisticsTrackingEventCategory,
  LogisticsTrackingEventSeverity,
  LogisticsTrackingEventColor,
  LogisticsTrackingEventIcon,
} from './tracking/tracking-event.constants';

// Tracking Event Type Constants
export {
  LOGISTICS_TRACKING_EVENT_TYPE,
  logisticsTrackingEventTypeGetCategoryLabel,
  logisticsTrackingEventTypeGetSeverityLabel,
  logisticsTrackingEventTypeGetPriorityLabel,
  logisticsTrackingEventTypeGetVisibilityLabel,
  logisticsTrackingEventTypeGetTriggerLabel,
  logisticsTrackingEventTypeGetLifecycleLabel,
} from './tracking/tracking-event-type.constants';

export type {
  LogisticsTrackingEventTypeCategory,
  LogisticsTrackingEventTypeSeverity,
  LogisticsTrackingEventTypePriority,
  LogisticsTrackingEventTypeVisibility,
  LogisticsTrackingEventTypeTrigger,
  LogisticsTrackingEventTypeLifecycle,
} from './tracking/tracking-event-type.constants';

// Warehouse Constants
export * from './warehouse/warehouse.constants';
export * from './warehouse/warehouse-type.constants';
export * from './warehouse/warehouse-status.constants';

// Inventory Location Constants
export * from './inventory/inventory-location.constants';
export * from './inventory/inventory-location-type.constants';

// Fulfillment Constants
export * from './fulfillment/fulfillment.constants';
export * from './fulfillment/fulfillment-status.constants';
export * from './fulfillment/fulfillment-type.constants';

// Dispatch Constants
export * from './dispatch/dispatch.constants';
export * from './dispatch/dispatch-status.constants';

// Vehicle Constants
export * from './vehicle/vehicle.constants';
export * from './vehicle/vehicle-type.constants';
export * from './vehicle/vehicle-status.constants';

// Driver Constants
export * from './driver/driver.constants';
export * from './driver/driver-status.constants';

// Route Constants
export * from './route/route.constants';
export * from './route/route-status.constants';

// Zone Constants
export * from './zone/zone.constants';
export * from './zone/zone-type.constants';

// Shipping Constants
export * from './shipping/shipping-method.constants';
export * from './shipping/shipping-method-type.constants';
export * from './shipping/shipping-rate.constants';
export * from './shipping/shipping-rate-type.constants';

// Packaging Constants
export * from './packaging/packaging.constants';
export * from './packaging/packaging-type.constants';

// Return Shipment Constants
export * from './return/return-shipment.constants';
export * from './return/return-shipment-status.constants';
export * from './return/return-reason.constants';
export * from './return/return-reason-type.constants';

// Insurance Constants
export * from './insurance/insurance.constants';
export * from './insurance/insurance-type.constants';
export * from './insurance/insurance-status.constants';
