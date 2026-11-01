/**
 * InterfaceModule — HTTP adapter wiring
 */
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache';

import { InfrastructureModule } from '../infrastructure/infrastructure.module.js';
import { ShipmentModule } from '../modules/shipment/index.js';
import { CourierModule } from '../modules/courier/index.js';
import { DeliveryModule } from '../modules/delivery/index.js';
import { TrackingModule } from '../modules/tracking/index.js';
import { WarehouseModule } from '../modules/warehouse/index.js';
import { FulfillmentModule } from '../modules/fulfillment/index.js';
import { DispatchModule } from '../modules/dispatch/index.js';
import { VehicleModule } from '../modules/vehicle/index.js';
import { DriverModule } from '../modules/driver/index.js';
import { RouteModule } from '../modules/route/index.js';
import { ZoneModule } from '../modules/zone/index.js';
import { ShippingMethodModule } from '../modules/shipping-method/index.js';
import { PackagingModule } from '../modules/packaging/index.js';
import { ReturnReasonModule } from '../modules/return-reason/index.js';
import { InventoryLocationModule } from '../modules/inventory-location/index.js';
import { ReturnShipmentModule } from '../modules/return-shipment/index.js';
import { InsuranceModule } from '../modules/insurance/index.js';

import { ShipmentController } from './controllers/rest/shipment.controller.js';
import { CourierController } from './controllers/rest/courier.controller.js';
import { DeliveryController } from './controllers/rest/delivery.controller.js';
import { TrackingController } from './controllers/rest/tracking.controller.js';
import { WarehouseController } from './controllers/rest/warehouse.controller.js';
import { FulfillmentController } from './controllers/rest/fulfillment.controller.js';
import { DispatchController } from './controllers/rest/dispatch.controller.js';
import { VehicleController } from './controllers/rest/vehicle.controller.js';
import { DriverController } from './controllers/rest/driver.controller.js';
import { RouteController } from './controllers/rest/route.controller.js';
import { ZoneController } from './controllers/rest/zone.controller.js';
import { ShippingMethodController } from './controllers/rest/shipping-method.controller.js';
import { PackagingController } from './controllers/rest/packaging.controller.js';
import { ReturnReasonController } from './controllers/rest/return-reason.controller.js';
import { InventoryLocationController } from './controllers/rest/inventory-location.controller.js';
import { ReturnShipmentController } from './controllers/rest/return-shipment.controller.js';
import { InsuranceController } from './controllers/rest/insurance.controller.js';
import {
  SaParibahanWebhookController,
  SundarbanWebhookController,
  RedxWebhookController,
  PathaoWebhookController,
  PaperflyWebhookController,
  SteadfastWebhookController,
  DhlWebhookController,
  FedexWebhookController,
  UpsWebhookController,
  AramexWebhookController,
} from './controllers/webhooks/index.js';

import { ShipmentOwnerGuard } from './guards/shipment-owner.guard.js';
import { WebhookSignatureGuard } from './guards/webhook-signature.guard.js';

import { ShipmentLoggingInterceptor } from './interceptors/shipment-logging.interceptor.js';
import { ShipmentTimeoutInterceptor } from './interceptors/shipment-timeout.interceptor.js';
import { CourierLoggingInterceptor } from './interceptors/courier-logging.interceptor.js';
import { CourierTimeoutInterceptor } from './interceptors/courier-timeout.interceptor.js';
import { DeliveryLoggingInterceptor } from './interceptors/delivery-logging.interceptor.js';
import { DeliveryTimeoutInterceptor } from './interceptors/delivery-timeout.interceptor.js';
import { TrackingLoggingInterceptor } from './interceptors/tracking-logging.interceptor.js';
import { TrackingTimeoutInterceptor } from './interceptors/tracking-timeout.interceptor.js';
import { WarehouseLoggingInterceptor } from './interceptors/warehouse-logging.interceptor.js';
import { WarehouseTimeoutInterceptor } from './interceptors/warehouse-timeout.interceptor.js';
import { FulfillmentLoggingInterceptor } from './interceptors/fulfillment-logging.interceptor.js';
import { FulfillmentTimeoutInterceptor } from './interceptors/fulfillment-timeout.interceptor.js';
import { DispatchLoggingInterceptor } from './interceptors/dispatch-logging.interceptor.js';
import { DispatchTimeoutInterceptor } from './interceptors/dispatch-timeout.interceptor.js';
import { VehicleLoggingInterceptor } from './interceptors/vehicle-logging.interceptor.js';
import { VehicleTimeoutInterceptor } from './interceptors/vehicle-timeout.interceptor.js';
import { DriverLoggingInterceptor } from './interceptors/driver-logging.interceptor.js';
import { DriverTimeoutInterceptor } from './interceptors/driver-timeout.interceptor.js';
import { RouteLoggingInterceptor } from './interceptors/route-logging.interceptor.js';
import { RouteTimeoutInterceptor } from './interceptors/route-timeout.interceptor.js';
import { ZoneLoggingInterceptor } from './interceptors/zone-logging.interceptor.js';
import { ZoneTimeoutInterceptor } from './interceptors/zone-timeout.interceptor.js';
import { ShippingMethodLoggingInterceptor } from './interceptors/shipping-method-logging.interceptor.js';
import { ShippingMethodTimeoutInterceptor } from './interceptors/shipping-method-timeout.interceptor.js';
import { PackagingLoggingInterceptor } from './interceptors/packaging-logging.interceptor.js';
import { PackagingTimeoutInterceptor } from './interceptors/packaging-timeout.interceptor.js';
import { ReturnReasonLoggingInterceptor } from './interceptors/return-reason-logging.interceptor.js';
import { ReturnReasonTimeoutInterceptor } from './interceptors/return-reason-timeout.interceptor.js';
import { InventoryLocationLoggingInterceptor } from './interceptors/inventory-location-logging.interceptor.js';
import { InventoryLocationTimeoutInterceptor } from './interceptors/inventory-location-timeout.interceptor.js';
import { ReturnShipmentLoggingInterceptor } from './interceptors/return-shipment-logging.interceptor.js';
import { ReturnShipmentTimeoutInterceptor } from './interceptors/return-shipment-timeout.interceptor.js';
import { InsuranceLoggingInterceptor } from './interceptors/insurance-logging.interceptor.js';
import { InsuranceTimeoutInterceptor } from './interceptors/insurance-timeout.interceptor.js';

import { IdempotencyMiddleware } from './middlewares/idempotency.middleware.js';
import { CorrelationIdMiddleware } from './middlewares/correlation-id.middleware.js';

@Module({
  imports: [
    CqrsModule, InfrastructureModule,
    ShipmentModule, CourierModule, DeliveryModule, TrackingModule,
    WarehouseModule, FulfillmentModule, DispatchModule, VehicleModule, DriverModule,
    RouteModule, ZoneModule, ShippingMethodModule, PackagingModule, ReturnReasonModule, InventoryLocationModule, ReturnShipmentModule, InsuranceModule,
    RedisModule,
  ],
  controllers: [
    ShipmentController, CourierController, DeliveryController, TrackingController,
    WarehouseController, FulfillmentController, DispatchController, VehicleController,
    DriverController, RouteController, ZoneController, ShippingMethodController, PackagingController, ReturnReasonController, InventoryLocationController, ReturnShipmentController, InsuranceController,

    // ─── Webhook Controllers ───
    SaParibahanWebhookController,
    SundarbanWebhookController,
    RedxWebhookController,
    PathaoWebhookController,
    PaperflyWebhookController,
    SteadfastWebhookController,
    DhlWebhookController,
    FedexWebhookController,
    UpsWebhookController,
    AramexWebhookController,
],
  providers: [
    ShipmentOwnerGuard,
    WebhookSignatureGuard,
    ShipmentLoggingInterceptor, ShipmentTimeoutInterceptor,
    CourierLoggingInterceptor, CourierTimeoutInterceptor,
    DeliveryLoggingInterceptor, DeliveryTimeoutInterceptor,
    TrackingLoggingInterceptor, TrackingTimeoutInterceptor,
    WarehouseLoggingInterceptor, WarehouseTimeoutInterceptor,
    FulfillmentLoggingInterceptor, FulfillmentTimeoutInterceptor,
    DispatchLoggingInterceptor, DispatchTimeoutInterceptor,
    VehicleLoggingInterceptor, VehicleTimeoutInterceptor,
    DriverLoggingInterceptor, DriverTimeoutInterceptor,
    RouteLoggingInterceptor, RouteTimeoutInterceptor,
    ZoneLoggingInterceptor, ZoneTimeoutInterceptor,
    ShippingMethodLoggingInterceptor, ShippingMethodTimeoutInterceptor,
    PackagingLoggingInterceptor, PackagingTimeoutInterceptor,
    ReturnReasonLoggingInterceptor, ReturnReasonTimeoutInterceptor,
    InventoryLocationLoggingInterceptor, InventoryLocationTimeoutInterceptor,
    ReturnShipmentLoggingInterceptor, ReturnShipmentTimeoutInterceptor,
    InsuranceLoggingInterceptor, InsuranceTimeoutInterceptor,
  ],
  exports: [
    ShipmentLoggingInterceptor, ShipmentTimeoutInterceptor,
    CourierLoggingInterceptor, CourierTimeoutInterceptor,
    DeliveryLoggingInterceptor, DeliveryTimeoutInterceptor,
    TrackingLoggingInterceptor, TrackingTimeoutInterceptor,
    WarehouseLoggingInterceptor, WarehouseTimeoutInterceptor,
    FulfillmentLoggingInterceptor, FulfillmentTimeoutInterceptor,
    DispatchLoggingInterceptor, DispatchTimeoutInterceptor,
    VehicleLoggingInterceptor, VehicleTimeoutInterceptor,
    DriverLoggingInterceptor, DriverTimeoutInterceptor,
    RouteLoggingInterceptor, RouteTimeoutInterceptor,
    ZoneLoggingInterceptor, ZoneTimeoutInterceptor,
    ShippingMethodLoggingInterceptor, ShippingMethodTimeoutInterceptor,
    PackagingLoggingInterceptor, PackagingTimeoutInterceptor,
    ReturnReasonLoggingInterceptor, ReturnReasonTimeoutInterceptor,
    InventoryLocationLoggingInterceptor, InventoryLocationTimeoutInterceptor,
    ReturnShipmentLoggingInterceptor, ReturnShipmentTimeoutInterceptor,
    InsuranceLoggingInterceptor, InsuranceTimeoutInterceptor,
  ],
})
export class InterfaceModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(IdempotencyMiddleware, CorrelationIdMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
