/**
 * ApplicationQueriesModule — all aggregate query handlers
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ShipmentModule } from '../shipment/index.js';
import { CourierModule } from '../courier/index.js';
import { DeliveryModule } from '../delivery/index.js';
import { TrackingModule } from '../tracking/index.js';
import { WarehouseModule } from '../warehouse/index.js';
import { FulfillmentModule } from '../fulfillment/index.js';
import { DispatchModule } from '../dispatch/index.js';
import { VehicleModule } from '../vehicle/index.js';
import { DriverModule } from '../driver/index.js';
import { RouteModule } from '../route/index.js';
import { ZoneModule } from '../zone/index.js';
import { ShippingMethodModule } from '../shipping-method/index.js';
import { PackagingModule } from '../packaging/index.js';
import { ReturnShipmentModule } from '../return-shipment/index.js';
import { ReturnReasonModule } from '../return-reason/index.js';
import { InsuranceModule } from '../insurance/index.js';

import { SHIPMENT_QUERY_HANDLERS } from '@application/queries/shipment/handlers.index';
import { COURIER_QUERY_HANDLERS } from '@application/queries/courier/handlers.index';
import { DELIVERY_QUERY_HANDLERS } from '@application/queries/delivery/handlers.index';
import { TRACKING_QUERY_HANDLERS } from '@application/queries/tracking/handlers.index';
import { WAREHOUSE_QUERY_HANDLERS } from '@application/queries/warehouse/handlers.index';
import { FULFILLMENT_QUERY_HANDLERS } from '@application/queries/fulfillment/handlers.index';
import { DISPATCH_QUERY_HANDLERS } from '@application/queries/dispatch/handlers.index';
import { VEHICLE_QUERY_HANDLERS } from '@application/queries/vehicle/handlers.index';
import { DRIVER_QUERY_HANDLERS } from '@application/queries/driver/handlers.index';
import { ROUTE_QUERY_HANDLERS } from '@application/queries/route/handlers.index';
import { ZONE_QUERY_HANDLERS } from '@application/queries/zone/handlers.index';
import { SHIPPING_METHOD_QUERY_HANDLERS } from '@application/queries/shipping-method/handlers.index';
import { PACKAGING_QUERY_HANDLERS } from '@application/queries/packaging/handlers.index';
import { RETURN_SHIPMENT_QUERY_HANDLERS } from '@application/queries/return-shipment/handlers.index';
import { RETURN_REASON_QUERY_HANDLERS } from '@application/queries/return-reason/handlers.index';
import { INSURANCE_QUERY_HANDLERS } from '@application/queries/insurance/handlers.index';

@Module({
  imports: [
    CqrsModule,
    ShipmentModule, CourierModule, DeliveryModule, TrackingModule, WarehouseModule,
    FulfillmentModule, DispatchModule, VehicleModule, DriverModule, RouteModule,
    ZoneModule, ShippingMethodModule, PackagingModule, ReturnShipmentModule,
    ReturnReasonModule, InsuranceModule,
  ],
  providers: [
    ...(SHIPMENT_QUERY_HANDLERS as unknown as never[]),
    ...(COURIER_QUERY_HANDLERS as unknown as never[]),
    ...(DELIVERY_QUERY_HANDLERS as unknown as never[]),
    ...(TRACKING_QUERY_HANDLERS as unknown as never[]),
    ...(WAREHOUSE_QUERY_HANDLERS as unknown as never[]),
    ...(FULFILLMENT_QUERY_HANDLERS as unknown as never[]),
    ...(DISPATCH_QUERY_HANDLERS as unknown as never[]),
    ...(VEHICLE_QUERY_HANDLERS as unknown as never[]),
    ...(DRIVER_QUERY_HANDLERS as unknown as never[]),
    ...(ROUTE_QUERY_HANDLERS as unknown as never[]),
    ...(ZONE_QUERY_HANDLERS as unknown as never[]),
    ...(SHIPPING_METHOD_QUERY_HANDLERS as unknown as never[]),
    ...(PACKAGING_QUERY_HANDLERS as unknown as never[]),
    ...(RETURN_SHIPMENT_QUERY_HANDLERS as unknown as never[]),
    ...(RETURN_REASON_QUERY_HANDLERS as unknown as never[]),
    ...(INSURANCE_QUERY_HANDLERS as unknown as never[]),
  ],
})
export class ApplicationQueriesModule {}
