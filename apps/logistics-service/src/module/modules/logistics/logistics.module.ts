/**
 * LogisticsModule — aggregates all logistics feature modules
 * @module logistics-service/modules/logistics
 */
import { Module } from '@nestjs/common';

import { ShipmentModule } from '../shipment/index.js';
import { CourierModule } from '../courier/index.js';
import { WarehouseModule } from '../warehouse/index.js';
import { VehicleModule } from '../vehicle/index.js';
import { DriverModule } from '../driver/index.js';
import { ZoneModule } from '../zone/index.js';
import { ShippingMethodModule } from '../shipping-method/index.js';
import { PackagingModule } from '../packaging/index.js';
import { DeliveryModule } from '../delivery/index.js';
import { TrackingModule } from '../tracking/index.js';
import { RouteModule } from '../route/index.js';
import { FulfillmentModule } from '../fulfillment/index.js';
import { DispatchModule } from '../dispatch/index.js';
import { ReturnShipmentModule } from '../return-shipment/index.js';
import { InsuranceModule } from '../insurance/index.js';
import { PublicLogisticsModule } from '../public-logistics/index.js';
import { WebhooksModule } from '../webhooks/index.js';
import { HealthModule } from '../health/index.js';

@Module({
  imports: [
    // Feature modules
    ShipmentModule,
    CourierModule,
    WarehouseModule,
    VehicleModule,
    DriverModule,
    ZoneModule,
    ShippingMethodModule,
    PackagingModule,
    DeliveryModule,
    TrackingModule,
    RouteModule,
    FulfillmentModule,
    DispatchModule,
    ReturnShipmentModule,
    InsuranceModule,

    // Cross-cutting feature modules
    PublicLogisticsModule,
    WebhooksModule,
    HealthModule,
  ],
})
export class LogisticsModule {}
