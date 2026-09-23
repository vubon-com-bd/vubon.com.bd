// Domain Errors — Logistics Service

export {
  ShipmentNotFoundError,
  ShipmentCannotBeCancelledError,
  InvalidShipmentNumberError,
} from './shipment.errors';

export {
  DeliveryFailedError,
  DeliveryWindowExpiredError,
  DeliveryAttemptExceededError,
} from './delivery.errors';

export {
  TrackingNotFoundError,
  InvalidTrackingNumberError,
} from './tracking.errors';

export {
  CourierNotFoundError,
  CourierUnavailableError,
  CourierRateNotFoundError,
} from './courier.errors';

export {
  WarehouseNotFoundError,
  CapacityExceededError,
} from './warehouse.errors';

export {
  FulfillmentFailedError,
  ItemNotAvailableError,
} from './fulfillment.errors';

export {
  DispatchAlreadyStartedError,
  DispatchNotFoundError,
} from './dispatch.errors';

export {
  VehicleNotAvailableError,
  VehicleNotFoundError,
} from './vehicle.errors';

export {
  DriverNotAvailableError,
  DriverNotFoundError,
} from './driver.errors';

export {
  RouteNotFoundError,
  RouteTooLongError,
} from './route.errors';

export {
  ZoneNotCoveredError,
  ZoneNotFoundError,
} from './zone.errors';

export {
  ShippingRateNotFoundError,
  WeightLimitExceededError,
} from './shipping.errors';

export {
  ReturnWindowExpiredError,
  ReturnShipmentNotFoundError,
} from './return.errors';

export {
  InsuranceNotAvailableError,
  InsuranceClaimFailedError,
} from './insurance.errors';
