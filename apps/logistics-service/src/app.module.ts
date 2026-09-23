import { Module } from '@nestjs/common';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';
import { LogisticsInfrastructureModule } from './module/infrastructure';

import {
  ShipmentModule,
  ShipmentItemModule,
  CourierModule,
  CourierRateModule,
  DeliveryModule,
  DeliveryAttemptModule,
  TrackingModule,
  TrackingEventModule,
  WarehouseModule,
  InventoryLocationModule,
  FulfillmentModule,
  DispatchModule,
  VehicleModule,
  DriverModule,
  RouteModule,
  ZoneModule,
  ShippingMethodModule,
  PackagingModule,
  ReturnShipmentModule,
  ReturnReasonModule,
  InsuranceModule,
  LogisticsCommonModule,
} from './module/modules';

@Module({
  imports: [
    // Framework + Kernel (global)
    KernelCommonModule,
    LogisticsCommonModule,

    // Infrastructure (Prisma, Redis, queues, workers)
    LogisticsInfrastructureModule,

    // Auth Core-like feature modules
    ShipmentModule,
    ShipmentItemModule,
    CourierModule,
    CourierRateModule,
    DeliveryModule,
    DeliveryAttemptModule,
    TrackingModule,
    TrackingEventModule,

    // Warehouse + Fulfillment
    WarehouseModule,
    InventoryLocationModule,
    FulfillmentModule,
    DispatchModule,
    VehicleModule,
    DriverModule,
    RouteModule,
    ZoneModule,

    // Extended
    ShippingMethodModule,
    PackagingModule,
    ReturnShipmentModule,
    ReturnReasonModule,
    InsuranceModule,
  ],
})
export class AppModule {}
