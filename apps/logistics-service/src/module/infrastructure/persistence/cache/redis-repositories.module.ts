/**
 * RedisRepositoriesModule — wires all cache repositories (14)
 * @module logistics-service/infrastructure/persistence/cache
 */
import { Module } from '@nestjs/common';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache';

import { SHIPMENT_CACHE, ShipmentCacheRepository } from './repositories/shipment.cache.repository.js';
import { COURIER_CACHE, CourierCacheRepository } from './repositories/courier.cache.repository.js';
import { DELIVERY_CACHE, DeliveryCacheRepository } from './repositories/delivery.cache.repository.js';
import { TRACKING_CACHE, TrackingCacheRepository } from './repositories/tracking.cache.repository.js';
import { WAREHOUSE_CACHE, WarehouseCacheRepository } from './repositories/warehouse.cache.repository.js';
import { FULFILLMENT_CACHE, FulfillmentCacheRepository } from './repositories/fulfillment.cache.repository.js';
import { DISPATCH_CACHE, DispatchCacheRepository } from './repositories/dispatch.cache.repository.js';
import { VEHICLE_CACHE, VehicleCacheRepository } from './repositories/vehicle.cache.repository.js';
import { DRIVER_CACHE, DriverCacheRepository } from './repositories/driver.cache.repository.js';
import { ROUTE_CACHE, RouteCacheRepository } from './repositories/route.cache.repository.js';
import { ZONE_CACHE, ZoneCacheRepository } from './repositories/zone.cache.repository.js';
import { SHIPPING_METHOD_CACHE, ShippingMethodCacheRepository } from './repositories/shipping-method.cache.repository.js';
import { PACKAGING_CACHE, PackagingCacheRepository } from './repositories/packaging.cache.repository.js';
import { INSURANCE_CACHE, InsuranceCacheRepository } from './repositories/insurance.cache.repository.js';

const REPOSITORIES = [
  ShipmentCacheRepository,
  CourierCacheRepository,
  DeliveryCacheRepository,
  TrackingCacheRepository,
  WarehouseCacheRepository,
  FulfillmentCacheRepository,
  DispatchCacheRepository,
  VehicleCacheRepository,
  DriverCacheRepository,
  RouteCacheRepository,
  ZoneCacheRepository,
  ShippingMethodCacheRepository,
  PackagingCacheRepository,
  InsuranceCacheRepository,
] as const;

const CACHE_TOKENS = [
  { provide: SHIPMENT_CACHE, useExisting: ShipmentCacheRepository },
  { provide: COURIER_CACHE, useExisting: CourierCacheRepository },
  { provide: DELIVERY_CACHE, useExisting: DeliveryCacheRepository },
  { provide: TRACKING_CACHE, useExisting: TrackingCacheRepository },
  { provide: WAREHOUSE_CACHE, useExisting: WarehouseCacheRepository },
  { provide: FULFILLMENT_CACHE, useExisting: FulfillmentCacheRepository },
  { provide: DISPATCH_CACHE, useExisting: DispatchCacheRepository },
  { provide: VEHICLE_CACHE, useExisting: VehicleCacheRepository },
  { provide: DRIVER_CACHE, useExisting: DriverCacheRepository },
  { provide: ROUTE_CACHE, useExisting: RouteCacheRepository },
  { provide: ZONE_CACHE, useExisting: ZoneCacheRepository },
  { provide: SHIPPING_METHOD_CACHE, useExisting: ShippingMethodCacheRepository },
  { provide: PACKAGING_CACHE, useExisting: PackagingCacheRepository },
  { provide: INSURANCE_CACHE, useExisting: InsuranceCacheRepository },
] as const;

@Module({
  imports: [RedisModule],
  providers: [...REPOSITORIES, ...CACHE_TOKENS],
  exports: [...REPOSITORIES, ...CACHE_TOKENS],
})
export class RedisRepositoriesModule {}
