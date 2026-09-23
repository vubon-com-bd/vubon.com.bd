import { Module } from '@nestjs/common';
import { PrismaModule } from './persistence/prisma/prisma.module';
import { LogisticsEmailModule } from './external/email/email.module';
import { LogisticsNotificationModule } from './external/notification/notification.module';

import {
  ShipmentPrismaRepository,
  ShipmentItemPrismaRepository,
  CourierPrismaRepository,
  CourierRatePrismaRepository,
  DeliveryPrismaRepository,
  DeliveryAttemptPrismaRepository,
  TrackingPrismaRepository,
  TrackingEventPrismaRepository,
  WarehousePrismaRepository,
  InventoryLocationPrismaRepository,
  FulfillmentPrismaRepository,
  DispatchPrismaRepository,
  VehiclePrismaRepository,
  DriverPrismaRepository,
  RoutePrismaRepository,
  ZonePrismaRepository,
  ShippingMethodPrismaRepository,
  PackagingPrismaRepository,
  ReturnShipmentPrismaRepository,
  ReturnReasonPrismaRepository,
  InsurancePrismaRepository,
} from './persistence/prisma/repositories';

import {
  ShipmentCacheRepository,
  DeliveryCacheRepository,
  TrackingCacheRepository,
  CourierCacheRepository,
  WarehouseCacheRepository,
  RouteCacheRepository,
  ZoneCacheRepository,
  ShippingMethodCacheRepository,
} from './persistence/cache/repositories';

import {
  SaParibahanService,
  SundarbanService,
  RedxService,
  PathaoService,
  PaperflyService,
  SteadfastService,
  DhlService,
  FedexService,
  UpsService,
  AramexService,
  GoogleMapsService,
  OpenStreetMapService,
} from './services/external';

import {
  ShipmentNumberGeneratorService,
  TrackingNumberGeneratorService,
  ShippingRateCalculatorService,
  RouteOptimizerService,
  DistanceCalculatorService,
  EtaCalculatorService,
  PackagingSelectorService,
  InsuranceCalculatorService,
  ZoneClassifierService,
  WarehouseAllocatorService,
  FulfillmentAllocatorService,
  WeightCalculatorService,
} from './services/internal';

import { LogisticsEmailService } from './external/email';
import { LogisticsSmsService } from './external/sms';
import { LogisticsPushService } from './external/push';
import { PdfService } from './external/pdf';

import {
  ShipmentQueue,
  DeliveryQueue,
  TrackingQueue,
  CourierQueue,
  FulfillmentQueue,
  DispatchQueue,
  NotificationQueue,
  AnalyticsQueue,
} from './queues';

import {
  ShipmentProcessorWorker,
  DeliverySchedulerWorker,
  TrackingSyncWorker,
  CourierSyncWorker,
  WarehouseSyncWorker,
  FulfillmentProcessorWorker,
  DispatchProcessorWorker,
  RouteOptimizerWorker,
  InsuranceProcessorWorker,
  AnalyticsProcessorWorker,
} from './workers';

const PRISMA_REPOSITORIES = [
  ShipmentPrismaRepository,
  ShipmentItemPrismaRepository,
  CourierPrismaRepository,
  CourierRatePrismaRepository,
  DeliveryPrismaRepository,
  DeliveryAttemptPrismaRepository,
  TrackingPrismaRepository,
  TrackingEventPrismaRepository,
  WarehousePrismaRepository,
  InventoryLocationPrismaRepository,
  FulfillmentPrismaRepository,
  DispatchPrismaRepository,
  VehiclePrismaRepository,
  DriverPrismaRepository,
  RoutePrismaRepository,
  ZonePrismaRepository,
  ShippingMethodPrismaRepository,
  PackagingPrismaRepository,
  ReturnShipmentPrismaRepository,
  ReturnReasonPrismaRepository,
  InsurancePrismaRepository,
];

const CACHE_REPOSITORIES = [
  ShipmentCacheRepository,
  DeliveryCacheRepository,
  TrackingCacheRepository,
  CourierCacheRepository,
  WarehouseCacheRepository,
  RouteCacheRepository,
  ZoneCacheRepository,
  ShippingMethodCacheRepository,
];

const EXTERNAL_SERVICES = [
  SaParibahanService,
  SundarbanService,
  RedxService,
  PathaoService,
  PaperflyService,
  SteadfastService,
  DhlService,
  FedexService,
  UpsService,
  AramexService,
  GoogleMapsService,
  OpenStreetMapService,
  LogisticsEmailService,
  LogisticsSmsService,
  LogisticsPushService,
  PdfService,
];

const INTERNAL_SERVICES = [
  ShipmentNumberGeneratorService,
  TrackingNumberGeneratorService,
  ShippingRateCalculatorService,
  RouteOptimizerService,
  DistanceCalculatorService,
  EtaCalculatorService,
  PackagingSelectorService,
  InsuranceCalculatorService,
  ZoneClassifierService,
  WarehouseAllocatorService,
  FulfillmentAllocatorService,
  WeightCalculatorService,
];

const QUEUES = [
  ShipmentQueue,
  DeliveryQueue,
  TrackingQueue,
  CourierQueue,
  FulfillmentQueue,
  DispatchQueue,
  NotificationQueue,
  AnalyticsQueue,
];

const WORKERS = [
  ShipmentProcessorWorker,
  DeliverySchedulerWorker,
  TrackingSyncWorker,
  CourierSyncWorker,
  WarehouseSyncWorker,
  FulfillmentProcessorWorker,
  DispatchProcessorWorker,
  RouteOptimizerWorker,
  InsuranceProcessorWorker,
  AnalyticsProcessorWorker,
];

@Module({
  imports: [PrismaModule, LogisticsEmailModule, LogisticsNotificationModule],
  providers: [
    ...PRISMA_REPOSITORIES,
    ...CACHE_REPOSITORIES,
    ...EXTERNAL_SERVICES,
    ...INTERNAL_SERVICES,
    ...QUEUES,
    ...WORKERS,
  ],
  exports: [
    PrismaModule,
    ...PRISMA_REPOSITORIES,
    ...CACHE_REPOSITORIES,
    ...EXTERNAL_SERVICES,
    ...INTERNAL_SERVICES,
    ...QUEUES,
  ],
})
export class LogisticsInfrastructureModule {}
