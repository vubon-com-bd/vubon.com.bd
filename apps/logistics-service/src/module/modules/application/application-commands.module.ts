/**
 * ApplicationCommandsModule — all aggregate command handlers
 * Imports all feature modules to inject their service tokens.
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

import { SHIPMENT_COMMAND_HANDLERS } from '@application/commands/shipment/handlers.index';
import { COURIER_COMMAND_HANDLERS } from '@application/commands/courier/handlers.index';
import { DELIVERY_COMMAND_HANDLERS } from '@application/commands/delivery/handlers.index';
import { TRACKING_COMMAND_HANDLERS } from '@application/commands/tracking/handlers.index';
import { WAREHOUSE_COMMAND_HANDLERS } from '@application/commands/warehouse/handlers.index';
import { FULFILLMENT_COMMAND_HANDLERS } from '@application/commands/fulfillment/handlers.index';
import { DISPATCH_COMMAND_HANDLERS } from '@application/commands/dispatch/handlers.index';
import { VEHICLE_COMMAND_HANDLERS } from '@application/commands/vehicle/handlers.index';
import { DRIVER_COMMAND_HANDLERS } from '@application/commands/driver/handlers.index';
import { ROUTE_COMMAND_HANDLERS } from '@application/commands/route/handlers.index';
import { ZONE_COMMAND_HANDLERS } from '@application/commands/zone/handlers.index';
import { SHIPPING_METHOD_COMMAND_HANDLERS } from '@application/commands/shipping-method/handlers.index';
import { PACKAGING_COMMAND_HANDLERS } from '@application/commands/packaging/handlers.index';
import { RETURN_SHIPMENT_COMMAND_HANDLERS } from '@application/commands/return-shipment/handlers.index';
import { RETURN_REASON_COMMAND_HANDLERS } from '@application/commands/return-reason/handlers.index';
import { INSURANCE_COMMAND_HANDLERS } from '@application/commands/insurance/handlers.index';

@Module({
  imports: [
    CqrsModule,
    ShipmentModule, CourierModule, DeliveryModule, TrackingModule, WarehouseModule,
    FulfillmentModule, DispatchModule, VehicleModule, DriverModule, RouteModule,
    ZoneModule, ShippingMethodModule, PackagingModule, ReturnShipmentModule,
    ReturnReasonModule, InsuranceModule,
  ],
  providers: [
    ...(SHIPMENT_COMMAND_HANDLERS as unknown as never[]),
    ...(COURIER_COMMAND_HANDLERS as unknown as never[]),
    ...(DELIVERY_COMMAND_HANDLERS as unknown as never[]),
    ...(TRACKING_COMMAND_HANDLERS as unknown as never[]),
    ...(WAREHOUSE_COMMAND_HANDLERS as unknown as never[]),
    ...(FULFILLMENT_COMMAND_HANDLERS as unknown as never[]),
    ...(DISPATCH_COMMAND_HANDLERS as unknown as never[]),
    ...(VEHICLE_COMMAND_HANDLERS as unknown as never[]),
    ...(DRIVER_COMMAND_HANDLERS as unknown as never[]),
    ...(ROUTE_COMMAND_HANDLERS as unknown as never[]),
    ...(ZONE_COMMAND_HANDLERS as unknown as never[]),
    ...(SHIPPING_METHOD_COMMAND_HANDLERS as unknown as never[]),
    ...(PACKAGING_COMMAND_HANDLERS as unknown as never[]),
    ...(RETURN_SHIPMENT_COMMAND_HANDLERS as unknown as never[]),
    ...(RETURN_REASON_COMMAND_HANDLERS as unknown as never[]),
    ...(INSURANCE_COMMAND_HANDLERS as unknown as never[]),
  ],
})
export class ApplicationCommandsModule {}
