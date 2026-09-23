// Application Errors — Logistics Service

export {
  ShipmentOperationFailedError,
  ShipmentAlreadyExistsError,
  ShipmentCreateFailedError,
} from './shipment.errors';

export {
  DeliveryOperationFailedError,
  DeliveryScheduleFailedError,
} from './delivery.errors';

export {
  TrackingOperationFailedError,
  TrackingSyncFailedError,
} from './tracking.errors';

export {
  CourierOperationFailedError,
  CourierIntegrationFailedError,
  CourierRateCalculationFailedError,
} from './courier.errors';

export {
  WarehouseOperationFailedError,
  InventoryAssignmentFailedError,
} from './warehouse.errors';

export {
  FulfillmentOperationFailedError,
  PickingFailedError,
  PackingFailedError,
} from './fulfillment.errors';

export {
  DispatchOperationFailedError,
  DriverAssignmentFailedError,
  VehicleAssignmentFailedError,
} from './dispatch.errors';

export {
  VehicleOperationFailedError,
  VehicleRegistrationFailedError,
} from './vehicle.errors';

export {
  DriverOperationFailedError,
  DriverRegistrationFailedError,
} from './driver.errors';

export {
  RouteOperationFailedError,
  RouteOptimizationFailedError,
} from './route.errors';

export {
  ZoneOperationFailedError,
  ZoneLookupFailedError,
} from './zone.errors';

export {
  ShippingRateFailedError,
  ShippingMethodNotFoundError,
} from './shipping.errors';

export {
  ReturnOperationFailedError,
  ReturnNotEligibleError,
} from './return.errors';

export {
  InsuranceOperationFailedError,
  InsuranceCalculationFailedError,
  InsuranceClaimProcessingFailedError,
} from './insurance.errors';
