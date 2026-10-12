// application/queries/index.ts
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

import { SHIPMENT_QUERY_HANDLERS } from './shipment/index.js';
import { COURIER_QUERY_HANDLERS } from './courier/index.js';
import { WAREHOUSE_QUERY_HANDLERS } from './warehouse/index.js';
import { VEHICLE_QUERY_HANDLERS } from './vehicle/index.js';
import { DRIVER_QUERY_HANDLERS } from './driver/index.js';
import { ZONE_QUERY_HANDLERS } from './zone/index.js';
import { SHIPPING_METHOD_QUERY_HANDLERS } from './shipping-method/index.js';
import { PACKAGING_QUERY_HANDLERS } from './packaging/index.js';
import { DELIVERY_QUERY_HANDLERS } from './delivery/index.js';
import { TRACKING_QUERY_HANDLERS } from './tracking/index.js';
import { ROUTE_QUERY_HANDLERS } from './route/index.js';
import { FULFILLMENT_QUERY_HANDLERS } from './fulfillment/index.js';
import { DISPATCH_QUERY_HANDLERS } from './dispatch/index.js';
import { RETURN_SHIPMENT_QUERY_HANDLERS } from './return-shipment/index.js';
import { INSURANCE_QUERY_HANDLERS } from './insurance/index.js';

export const ALL_QUERY_HANDLERS = [
  ...SHIPMENT_QUERY_HANDLERS,
  ...COURIER_QUERY_HANDLERS,
  ...WAREHOUSE_QUERY_HANDLERS,
  ...VEHICLE_QUERY_HANDLERS,
  ...DRIVER_QUERY_HANDLERS,
  ...ZONE_QUERY_HANDLERS,
  ...SHIPPING_METHOD_QUERY_HANDLERS,
  ...PACKAGING_QUERY_HANDLERS,
  ...DELIVERY_QUERY_HANDLERS,
  ...TRACKING_QUERY_HANDLERS,
  ...ROUTE_QUERY_HANDLERS,
  ...FULFILLMENT_QUERY_HANDLERS,
  ...DISPATCH_QUERY_HANDLERS,
  ...RETURN_SHIPMENT_QUERY_HANDLERS,
  ...INSURANCE_QUERY_HANDLERS,
] as const;
