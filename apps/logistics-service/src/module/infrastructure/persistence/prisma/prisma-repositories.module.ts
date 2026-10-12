/**
 * PrismaRepositoriesModule — wires Prisma repositories + tokens
 * @module logistics-service/infrastructure/persistence/prisma
 */
import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '@vubon/shared-kernel/infrastructure/persistence/prisma';

import {
  SHIPMENT_REPOSITORY, COURIER_REPOSITORY, WAREHOUSE_REPOSITORY,
  VEHICLE_REPOSITORY, DRIVER_REPOSITORY, ZONE_REPOSITORY,
  SHIPPING_METHOD_REPOSITORY, PACKAGING_REPOSITORY, DELIVERY_REPOSITORY,
  TRACKING_REPOSITORY, ROUTE_REPOSITORY, FULFILLMENT_REPOSITORY,
  DISPATCH_REPOSITORY, RETURN_SHIPMENT_REPOSITORY, INSURANCE_REPOSITORY,
} from '../../../domain/repositories/index.js';

import { ShipmentPrismaRepository } from './repositories/shipment.prisma.repository.js';
import { CourierPrismaRepository } from './repositories/courier.prisma.repository.js';
import { WarehousePrismaRepository } from './repositories/warehouse.prisma.repository.js';
import { VehiclePrismaRepository } from './repositories/vehicle.prisma.repository.js';
import { DriverPrismaRepository } from './repositories/driver.prisma.repository.js';
import { ZonePrismaRepository } from './repositories/zone.prisma.repository.js';
import { ShippingMethodPrismaRepository } from './repositories/shipping-method.prisma.repository.js';
import { PackagingPrismaRepository } from './repositories/packaging.prisma.repository.js';
import { DeliveryPrismaRepository } from './repositories/delivery.prisma.repository.js';
import { TrackingPrismaRepository } from './repositories/tracking.prisma.repository.js';
import { RoutePrismaRepository } from './repositories/route.prisma.repository.js';
import { FulfillmentPrismaRepository } from './repositories/fulfillment.prisma.repository.js';
import { DispatchPrismaRepository } from './repositories/dispatch.prisma.repository.js';
import { ReturnShipmentPrismaRepository } from './repositories/return-shipment.prisma.repository.js';
import { InsurancePrismaRepository } from './repositories/insurance.prisma.repository.js';

const REPS = [
  ShipmentPrismaRepository, CourierPrismaRepository, WarehousePrismaRepository,
  VehiclePrismaRepository, DriverPrismaRepository, ZonePrismaRepository,
  ShippingMethodPrismaRepository, PackagingPrismaRepository, DeliveryPrismaRepository,
  TrackingPrismaRepository, RoutePrismaRepository, FulfillmentPrismaRepository,
  DispatchPrismaRepository, ReturnShipmentPrismaRepository, InsurancePrismaRepository,
] as const;

const BINDINGS = [
  { provide: SHIPMENT_REPOSITORY, useExisting: ShipmentPrismaRepository },
  { provide: COURIER_REPOSITORY, useExisting: CourierPrismaRepository },
  { provide: WAREHOUSE_REPOSITORY, useExisting: WarehousePrismaRepository },
  { provide: VEHICLE_REPOSITORY, useExisting: VehiclePrismaRepository },
  { provide: DRIVER_REPOSITORY, useExisting: DriverPrismaRepository },
  { provide: ZONE_REPOSITORY, useExisting: ZonePrismaRepository },
  { provide: SHIPPING_METHOD_REPOSITORY, useExisting: ShippingMethodPrismaRepository },
  { provide: PACKAGING_REPOSITORY, useExisting: PackagingPrismaRepository },
  { provide: DELIVERY_REPOSITORY, useExisting: DeliveryPrismaRepository },
  { provide: TRACKING_REPOSITORY, useExisting: TrackingPrismaRepository },
  { provide: ROUTE_REPOSITORY, useExisting: RoutePrismaRepository },
  { provide: FULFILLMENT_REPOSITORY, useExisting: FulfillmentPrismaRepository },
  { provide: DISPATCH_REPOSITORY, useExisting: DispatchPrismaRepository },
  { provide: RETURN_SHIPMENT_REPOSITORY, useExisting: ReturnShipmentPrismaRepository },
  { provide: INSURANCE_REPOSITORY, useExisting: InsurancePrismaRepository },
] as const;

@Global()
@Module({
  imports: [PrismaModule],
  providers: [...REPS, ...BINDINGS],
  exports: [...REPS, ...BINDINGS],
})
export class PrismaRepositoriesModule {}
