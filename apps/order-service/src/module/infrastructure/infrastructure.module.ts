import { Module } from '@nestjs/common';

import { PrismaModule } from './persistence/prisma/prisma.module';

import {
  OrderPrismaRepository,
  OrderItemPrismaRepository,
  CheckoutPrismaRepository,
  CheckoutSessionPrismaRepository,
  DeliveryPrismaRepository,
  DeliveryMethodPrismaRepository,
  ShippingAddressPrismaRepository,
  BillingAddressPrismaRepository,
  OrderCancelPrismaRepository,
  OrderReturnPrismaRepository,
  OrderFulfillmentPrismaRepository,
  OrderHistoryPrismaRepository,
  OrderTrackingPrismaRepository,
} from './persistence/prisma/repositories';

import {
  OrderCacheRepository,
  CheckoutCacheRepository,
  DeliveryCacheRepository,
  OrderTrackingCacheRepository,
} from './persistence/cache/repositories';

import {
  OrderNumberGeneratorService,
  OrderTotalCalculatorService,
  OrderSnapshotService,
  DeliverySchedulerService,
  TrackingNumberGeneratorService,
  StatusTransitionService,
} from './services/internal';

import {
  PaymentGatewayService,
  ShippingProviderService,
  NotificationService,
  AnalyticsService,
} from './services/external';

import {
  OrderQueue,
  CheckoutQueue,
  DeliveryQueue,
  NotificationQueue,
  AnalyticsQueue,
} from './queues';

import {
  OrderProcessorWorker,
  CheckoutCleanupWorker,
  DeliveryTrackerWorker,
  OrderTimeoutWorker,
  ReturnProcessorWorker,
  AnalyticsProcessorWorker,
} from './workers';

import { PaymentModule } from './external/payment';
import { ShippingModule } from './external/shipping';
import { OrderNotificationModule } from './external/notification';

const REPOSITORIES = [
  OrderPrismaRepository,
  OrderItemPrismaRepository,
  CheckoutPrismaRepository,
  CheckoutSessionPrismaRepository,
  DeliveryPrismaRepository,
  DeliveryMethodPrismaRepository,
  ShippingAddressPrismaRepository,
  BillingAddressPrismaRepository,
  OrderCancelPrismaRepository,
  OrderReturnPrismaRepository,
  OrderFulfillmentPrismaRepository,
  OrderHistoryPrismaRepository,
  OrderTrackingPrismaRepository,
];

const CACHE_REPOSITORIES = [
  OrderCacheRepository,
  CheckoutCacheRepository,
  DeliveryCacheRepository,
  OrderTrackingCacheRepository,
];

const INTERNAL_SERVICES = [
  OrderNumberGeneratorService,
  OrderTotalCalculatorService,
  OrderSnapshotService,
  DeliverySchedulerService,
  TrackingNumberGeneratorService,
  StatusTransitionService,
];

const EXTERNAL_SERVICES = [
  PaymentGatewayService,
  ShippingProviderService,
  NotificationService,
  AnalyticsService,
];

const QUEUES = [OrderQueue, CheckoutQueue, DeliveryQueue, NotificationQueue, AnalyticsQueue];

const WORKERS = [
  OrderProcessorWorker,
  CheckoutCleanupWorker,
  DeliveryTrackerWorker,
  OrderTimeoutWorker,
  ReturnProcessorWorker,
  AnalyticsProcessorWorker,
];

@Module({
  imports: [
    PrismaModule,
    PaymentModule,
    ShippingModule,
    OrderNotificationModule,
  ],
  providers: [
    ...REPOSITORIES,
    ...CACHE_REPOSITORIES,
    ...INTERNAL_SERVICES,
    ...EXTERNAL_SERVICES,
    ...QUEUES,
    ...WORKERS,
  ],
  exports: [
    PrismaModule,
    PaymentModule,
    ShippingModule,
    OrderNotificationModule,
    ...REPOSITORIES,
    ...CACHE_REPOSITORIES,
    ...INTERNAL_SERVICES,
    ...EXTERNAL_SERVICES,
    ...QUEUES,
  ],
})
export class InfrastructureModule {}
