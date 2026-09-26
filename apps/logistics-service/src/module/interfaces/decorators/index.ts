export { OwnShipment, OWN_SHIPMENT_KEY } from './own-shipment.decorator';
export { VendorShipment, VENDOR_SHIPMENT_KEY } from './vendor-shipment.decorator';
export { RequireShipmentStatus } from './shipment-status.decorator';
export { RequireCourierActive, COURIER_ACTIVE_KEY } from './courier-active.decorator';
export { RequireWarehouseActive, WAREHOUSE_ACTIVE_KEY } from './warehouse-active.decorator';
export { RequireDriverAvailable, DRIVER_AVAILABLE_KEY } from './driver-available.decorator';
export { RequireVehicleAvailable, VEHICLE_AVAILABLE_KEY } from './vehicle-available.decorator';

// Re-export kernel decorators for convenience
export {
  Public,
  Roles,
  Permissions,
  RateLimit,
  Owner,
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
