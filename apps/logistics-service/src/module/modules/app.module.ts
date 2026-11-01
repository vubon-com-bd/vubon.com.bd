/**
 * AppModule — logistics-service root
 * @module logistics-service/modules
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtStrategy } from '../infrastructure/security/jwt.strategy.js';
import { InfrastructureModule } from '../infrastructure/infrastructure.module.js';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { EventBusModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

// ─── Feature Modules (16 aggregates) ───
import { HealthModule } from './health/index.js';
import { ShipmentModule } from './shipment/index.js';
import { CourierModule } from './courier/index.js';
import { DeliveryModule } from './delivery/index.js';
import { TrackingModule } from './tracking/index.js';
import { WarehouseModule } from './warehouse/index.js';
import { FulfillmentModule } from './fulfillment/index.js';
import { DispatchModule } from './dispatch/index.js';
import { VehicleModule } from './vehicle/index.js';
import { DriverModule } from './driver/index.js';
import { RouteModule } from './route/index.js';
import { ZoneModule } from './zone/index.js';
import { ShippingMethodModule } from './shipping-method/index.js';
import { PackagingModule } from './packaging/index.js';
import { ReturnShipmentModule } from './return-shipment/index.js';
import { ReturnReasonModule } from './return-reason/index.js';
import { InsuranceModule } from './insurance/index.js';
import { ShipmentItemModule } from './shipment-item/index.js';
import { CourierRateModule } from './courier-rate/index.js';
import { DeliveryAttemptModule } from './delivery-attempt/index.js';
import { TrackingEventModule } from './tracking-event/index.js';
import { PublicLogisticsModule } from './public-logistics/index.js';
import { CommonModule } from './common/index.js';

// ─── Category Modules (application layer) ───
import { ApplicationCommandsModule } from './application/application-commands.module.js';
import { ApplicationQueriesModule } from './application/application-queries.module.js';
import { ApplicationEventsModule } from './application/application-events.module.js';
import { ApplicationSagasModule } from './application/application-sagas.module.js';
import { ApplicationWebhooksModule } from './application/application-webhooks.module.js';
import { InterfaceModule } from '../interfaces/interfaces.module.js';

@Module({
  imports: [
    // ─── Infrastructure (Global providers + queues/workers) ───
    InfrastructureModule.forRoot(),

    // ─── Core ───
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env', cache: true }),
    CqrsModule.forRoot(),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    EventBridgeModule,
    EventBusModule,

    // ─── Feature Modules ───
    HealthModule,
    ShipmentModule,
    CourierModule,
    DeliveryModule,
    TrackingModule,
    WarehouseModule,
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
    ShipmentItemModule,
    CourierRateModule,
    DeliveryAttemptModule,
    TrackingEventModule,
    PublicLogisticsModule,
    CommonModule,

    // ─── Category Modules (Application Layer) ───
    ApplicationCommandsModule,
    ApplicationQueriesModule,
    ApplicationEventsModule,
    ApplicationSagasModule,
    ApplicationWebhooksModule,
    InterfaceModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}