// application/commands/index.ts
export * from './shipment/index.js';
export * from './courier/index.js';
export * from './warehouse/index.js';
export * from './vehicle/index.js';
export * from './driver/index.js';
export * from './zone/index.js';
export * from './shipping-method/index.js';
export * from './packaging/index.js';
export * from './delivery/index.js';
export * from './tracking/index.js';
export * from './route/index.js';
export * from './fulfillment/index.js';
export * from './dispatch/index.js';
export * from './return-shipment/index.js';
export * from './insurance/index.js';

import { SHIPMENT_COMMAND_HANDLERS } from './shipment/index.js';
import { COURIER_COMMAND_HANDLERS } from './courier/index.js';
import { WAREHOUSE_COMMAND_HANDLERS } from './warehouse/index.js';
import { VEHICLE_COMMAND_HANDLERS } from './vehicle/index.js';
import { DRIVER_COMMAND_HANDLERS } from './driver/index.js';
import { ZONE_COMMAND_HANDLERS } from './zone/index.js';
import { SHIPPING_METHOD_COMMAND_HANDLERS } from './shipping-method/index.js';
import { PACKAGING_COMMAND_HANDLERS } from './packaging/index.js';
import { DELIVERY_COMMAND_HANDLERS } from './delivery/index.js';
import { TRACKING_COMMAND_HANDLERS } from './tracking/index.js';
import { ROUTE_COMMAND_HANDLERS } from './route/index.js';
import { FULFILLMENT_COMMAND_HANDLERS } from './fulfillment/index.js';
import { DISPATCH_COMMAND_HANDLERS } from './dispatch/index.js';
import { RETURN_SHIPMENT_COMMAND_HANDLERS } from './return-shipment/index.js';
import { INSURANCE_COMMAND_HANDLERS } from './insurance/index.js';

export const ALL_COMMAND_HANDLERS = [
  ...SHIPMENT_COMMAND_HANDLERS,
  ...COURIER_COMMAND_HANDLERS,
  ...WAREHOUSE_COMMAND_HANDLERS,
  ...VEHICLE_COMMAND_HANDLERS,
  ...DRIVER_COMMAND_HANDLERS,
  ...ZONE_COMMAND_HANDLERS,
  ...SHIPPING_METHOD_COMMAND_HANDLERS,
  ...PACKAGING_COMMAND_HANDLERS,
  ...DELIVERY_COMMAND_HANDLERS,
  ...TRACKING_COMMAND_HANDLERS,
  ...ROUTE_COMMAND_HANDLERS,
  ...FULFILLMENT_COMMAND_HANDLERS,
  ...DISPATCH_COMMAND_HANDLERS,
  ...RETURN_SHIPMENT_COMMAND_HANDLERS,
  ...INSURANCE_COMMAND_HANDLERS,
] as const;
