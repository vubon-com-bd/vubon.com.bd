// ═══════════════════════════════════════════════════════════
// Domain Primitives — Logistics Service
// ═══════════════════════════════════════════════════════════

// ── IDs ─────────────────────────────────────────────────────
export { ShipmentIdVO, type ShipmentId } from './shipment-id.vo';
export { TrackingIdVO, type TrackingId } from './tracking-id.vo';
export { CourierIdVO, type CourierId } from './courier-id.vo';
export { DeliveryIdVO, type DeliveryId } from './delivery-id.vo';
export { WarehouseIdVO, type WarehouseId } from './warehouse-id.vo';
export { LocationIdVO, type LocationId } from './location-id.vo';
export { FulfillmentIdVO, type FulfillmentId } from './fulfillment-id.vo';
export { DispatchIdVO, type DispatchId } from './dispatch-id.vo';
export { VehicleIdVO, type VehicleId } from './vehicle-id.vo';
export { DriverIdVO, type DriverId } from './driver-id.vo';
export { RouteIdVO, type RouteId } from './route-id.vo';
export { ZoneIdVO, type ZoneId } from './zone-id.vo';
export { InsuranceIdVO, type InsuranceId } from './insurance-id.vo';

// ── Reference IDs ───────────────────────────────────────────
export { OrderIdVO, type OrderRefId } from './order-id.vo';
export { VendorIdVO, type VendorRefId } from './vendor-id.vo';
export { UserIdVO, type UserRefId } from './user-id.vo';
export { ProductIdVO, type ProductRefId } from './product-id.vo';
export { AddressIdVO, type AddressRefId } from './address-id.vo';

// ── Codes ───────────────────────────────────────────────────
export { ShipmentNumberVO } from './shipment-number.vo';
export { TrackingNumberVO } from './tracking-number.vo';
export { TrackingEventVO } from './tracking-event.vo';
export { DeliveryWindowVO } from './delivery-window.vo';
export { DeliveryAttemptVO } from './delivery-attempt.vo';
export { DeliveryNoteVO } from './delivery-note.vo';
export { WarehouseCodeVO } from './warehouse-code.vo';
export { LocationCodeVO } from './location-code.vo';
export { DriverLicenseVO } from './driver-license.vo';
export { VehicleNumberVO } from './vehicle-number.vo';
export { PackagingSizeVO } from './packaging-size.vo';
export { ReturnReasonVO } from './return-reason.vo';
export { InsuranceCoverageVO } from './insurance-coverage.vo';
export { DimensionVO } from './dimension.vo';

// ── Status ──────────────────────────────────────────────────
export { ShipmentStatusVO } from './shipment-status.vo';
export { TrackingStatusVO } from './tracking-status.vo';
export { CourierStatusVO } from './courier-status.vo';
export { DeliveryStatusVO } from './delivery-status.vo';
export { WarehouseStatusVO } from './warehouse-status.vo';
export { VehicleStatusVO } from './vehicle-status.vo';
export { DriverStatusVO } from './driver-status.vo';
export { RouteStatusVO } from './route-status.vo';
export { ZoneStatusVO } from './zone-status.vo';
export { FulfillmentStatusVO } from './fulfillment-status.vo';
export { DispatchStatusVO } from './dispatch-status.vo';
export { LocationStatusVO } from './location-status.vo';
export { ReturnShipmentStatusVO } from './return-shipment-status.vo';
export { InsuranceStatusVO } from './insurance-status.vo';

// ── Types ───────────────────────────────────────────────────
export { ShipmentTypeVO } from './shipment-type.vo';
export { ShipmentPriorityVO } from './shipment-priority.vo';
export { CourierTypeVO } from './courier-type.vo';
export { DeliveryTypeVO } from './delivery-type.vo';
export { VehicleTypeVO } from './vehicle-type.vo';
export { VehicleFuelTypeVO } from './vehicle-fuel-type.vo';
export { DriverTypeVO } from './driver-type.vo';
export { RouteTypeVO } from './route-type.vo';
export { RouteOptimizationVO } from './route-optimization.vo';
export { ZoneTypeVO } from './zone-type.vo';
export { FulfillmentTypeVO } from './fulfillment-type.vo';
export { DispatchTypeVO } from './dispatch-type.vo';
export { LocationTypeVO } from './location-type.vo';
export { PickingStrategyVO } from './picking-strategy.vo';
export { PackagingTypeVO } from './packaging-type.vo';
export { PackagingMaterialVO } from './packaging-material.vo';
export { ShippingMethodTypeVO } from './shipping-method-type.vo';
export { ReturnReasonTypeVO } from './return-reason-type.vo';

// ── Names ───────────────────────────────────────────────────
export { CourierNameVO } from './courier-name.vo';
export { WarehouseNameVO } from './warehouse-name.vo';
export { LocationNameVO } from './location-name.vo';
export { DriverNameVO } from './driver-name.vo';
export { RouteNameVO } from './route-name.vo';
export { ZoneNameVO } from './zone-name.vo';
export { InsuranceProviderVO } from './insurance-provider.vo';

// ── Quantities ──────────────────────────────────────────────
export { WeightVO } from './weight.vo';
export { RouteDistanceVO } from './route-distance.vo';
export { VehicleCapacityVO } from './vehicle-capacity.vo';
