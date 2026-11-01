/**
 * PrismaRepositoriesModule — wires all 17 Prisma repositories
 * @module logistics-service/infrastructure/persistence/prisma
 */
import { Module } from '@nestjs/common';
import { LogisticsPrismaModule } from './prisma.module.js';

// Repositories
import { ShipmentPrismaRepository } from './repositories/shipment.prisma.repository.js';
import { CourierPrismaRepository } from './repositories/courier.prisma.repository.js';
import { DeliveryPrismaRepository } from './repositories/delivery.prisma.repository.js';
import { TrackingPrismaRepository } from './repositories/tracking.prisma.repository.js';
import { WarehousePrismaRepository } from './repositories/warehouse.prisma.repository.js';
import { FulfillmentPrismaRepository } from './repositories/fulfillment.prisma.repository.js';
import { DispatchPrismaRepository } from './repositories/dispatch.prisma.repository.js';
import { VehiclePrismaRepository } from './repositories/vehicle.prisma.repository.js';
import { DriverPrismaRepository } from './repositories/driver.prisma.repository.js';
import { RoutePrismaRepository } from './repositories/route.prisma.repository.js';
import { ZonePrismaRepository } from './repositories/zone.prisma.repository.js';
import { ShippingMethodPrismaRepository } from './repositories/shipping-method.prisma.repository.js';
import { PackagingPrismaRepository } from './repositories/packaging.prisma.repository.js';
import { ReturnReasonPrismaRepository } from './repositories/return-reason.prisma.repository.js';
import { InventoryLocationPrismaRepository } from './repositories/inventory-location.prisma.repository.js';
import { ReturnShipmentPrismaRepository } from './repositories/return-shipment.prisma.repository.js';
import { InsurancePrismaRepository } from './repositories/insurance.prisma.repository.js';

// Domain tokens
import { SHIPMENT_REPOSITORY } from '@domain/repositories/shipment.repository.interface';
import { COURIER_REPOSITORY } from '@domain/repositories/courier.repository.interface';
import { DELIVERY_REPOSITORY } from '@domain/repositories/delivery.repository.interface';
import { TRACKING_REPOSITORY } from '@domain/repositories/tracking.repository.interface';
import { WAREHOUSE_REPOSITORY } from '@domain/repositories/warehouse.repository.interface';
import { FULFILLMENT_REPOSITORY } from '@domain/repositories/fulfillment.repository.interface';
import { DISPATCH_REPOSITORY } from '@domain/repositories/dispatch.repository.interface';
import { VEHICLE_REPOSITORY } from '@domain/repositories/vehicle.repository.interface';
import { DRIVER_REPOSITORY } from '@domain/repositories/driver.repository.interface';
import { ROUTE_REPOSITORY } from '@domain/repositories/route.repository.interface';
import { ZONE_REPOSITORY } from '@domain/repositories/zone.repository.interface';
import { SHIPPING_METHOD_REPOSITORY } from '@domain/repositories/shipping-method.repository.interface';
import { PACKAGING_REPOSITORY } from '@domain/repositories/packaging.repository.interface';
import { RETURN_REASON_REPOSITORY } from '@domain/repositories/return-reason.repository.interface';
import { INVENTORY_LOCATION_REPOSITORY } from '@domain/repositories/inventory-location.repository.interface';
import { RETURN_SHIPMENT_REPOSITORY } from '@domain/repositories/return-shipment.repository.interface';
import { INSURANCE_REPOSITORY } from '@domain/repositories/insurance.repository.interface';

const REPOSITORIES = [
  ShipmentPrismaRepository,
  CourierPrismaRepository,
  DeliveryPrismaRepository,
  TrackingPrismaRepository,
  WarehousePrismaRepository,
  FulfillmentPrismaRepository,
  DispatchPrismaRepository,
  VehiclePrismaRepository,
  DriverPrismaRepository,
  RoutePrismaRepository,
  ZonePrismaRepository,
  ShippingMethodPrismaRepository,
  PackagingPrismaRepository,
  ReturnReasonPrismaRepository,
  InventoryLocationPrismaRepository,
  ReturnShipmentPrismaRepository,
  InsurancePrismaRepository,
] as const;

const REPOSITORY_TOKENS = [
  { provide: SHIPMENT_REPOSITORY, useExisting: ShipmentPrismaRepository },
  { provide: COURIER_REPOSITORY, useExisting: CourierPrismaRepository },
  { provide: DELIVERY_REPOSITORY, useExisting: DeliveryPrismaRepository },
  { provide: TRACKING_REPOSITORY, useExisting: TrackingPrismaRepository },
  { provide: WAREHOUSE_REPOSITORY, useExisting: WarehousePrismaRepository },
  { provide: FULFILLMENT_REPOSITORY, useExisting: FulfillmentPrismaRepository },
  { provide: DISPATCH_REPOSITORY, useExisting: DispatchPrismaRepository },
  { provide: VEHICLE_REPOSITORY, useExisting: VehiclePrismaRepository },
  { provide: DRIVER_REPOSITORY, useExisting: DriverPrismaRepository },
  { provide: ROUTE_REPOSITORY, useExisting: RoutePrismaRepository },
  { provide: ZONE_REPOSITORY, useExisting: ZonePrismaRepository },
  { provide: SHIPPING_METHOD_REPOSITORY, useExisting: ShippingMethodPrismaRepository },
  { provide: PACKAGING_REPOSITORY, useExisting: PackagingPrismaRepository },
  { provide: RETURN_REASON_REPOSITORY, useExisting: ReturnReasonPrismaRepository },
  { provide: INVENTORY_LOCATION_REPOSITORY, useExisting: InventoryLocationPrismaRepository },
  { provide: RETURN_SHIPMENT_REPOSITORY, useExisting: ReturnShipmentPrismaRepository },
  { provide: INSURANCE_REPOSITORY, useExisting: InsurancePrismaRepository },
] as const;

@Module({
  imports: [LogisticsPrismaModule],
  providers: [...REPOSITORIES, ...REPOSITORY_TOKENS],
  exports: [...REPOSITORIES, ...REPOSITORY_TOKENS],
})
export class PrismaRepositoriesModule {}
