import { Module } from '@nestjs/common';

// Kernel global modules
import {
  PrismaModule as KernelPrismaModule,
  RedisModule as KernelRedisModule,
  EmailModule as KernelEmailModule,
  SmsModule as KernelSmsModule,
  PushModule as KernelPushModule,
  QueueModule as KernelQueueModule,
} from '@vubon/shared-kernel/infrastructure';

// App-level modules
import { PrismaModule as AppPrismaModule } from './persistence/prisma/prisma.module';
import { CartRedisModule as AppRedisModule } from './persistence/redis/redis.module';

// Prisma repositories
import {
  CartPrismaRepository,
  SavedForLaterPrismaRepository,
  AbandonedCartPrismaRepository,
} from './persistence/prisma/repositories';

// Redis repositories
import {
  CartRedisRepository,
  CartItemRedisRepository,
  CartCouponRedisRepository,
  GuestCartRedisRepository,
} from './persistence/redis/repositories';

// Cache repositories
import {
  CartTotalsCacheRepository,
  CartSummaryCacheRepository,
} from './persistence/cache/repositories';

// External cross-service clients
import {
  ProductClient,
  VendorClient,
  UserClient,
  PricingClient,
  TaxClient,
  ShippingClient,
  CouponClient,
} from './services/external';

// Internal services
import {
  CartCalculationService,
  CartMergeService,
  PriceSyncService,
  StockCheckService,
  GuestTokenService,
  AbandonmentDetectorService,
} from './services/internal';

// Queues
import {
  CartQueue,
  AbandonmentQueue,
  ReminderQueue,
  PriceSyncQueue,
  AnalyticsQueue,
} from './queues';

// Workers
import {
  CartExpiryWorker,
  CartAbandonmentWorker,
  CartReminderWorker,
  PriceSyncWorker,
  StockSyncWorker,
  CartCleanupWorker,
  AnalyticsProcessorWorker,
} from './workers';

// External service modules
import { CartEmailModule } from './external/email';
import { CartSmsModule } from './external/sms';
import { CartPushModule } from './external/push';

const PRISMA_REPOSITORIES = [
  CartPrismaRepository,
  SavedForLaterPrismaRepository,
  AbandonedCartPrismaRepository,
];

const REDIS_REPOSITORIES = [
  CartRedisRepository,
  CartItemRedisRepository,
  CartCouponRedisRepository,
  GuestCartRedisRepository,
];

const CACHE_REPOSITORIES = [
  CartTotalsCacheRepository,
  CartSummaryCacheRepository,
];

const EXTERNAL_CLIENTS = [
  ProductClient,
  VendorClient,
  UserClient,
  PricingClient,
  TaxClient,
  ShippingClient,
  CouponClient,
];

const INTERNAL_SERVICES = [
  CartCalculationService,
  CartMergeService,
  PriceSyncService,
  StockCheckService,
  GuestTokenService,
  AbandonmentDetectorService,
];

const QUEUES = [
  CartQueue,
  AbandonmentQueue,
  ReminderQueue,
  PriceSyncQueue,
  AnalyticsQueue,
];

const WORKERS = [
  CartExpiryWorker,
  CartAbandonmentWorker,
  CartReminderWorker,
  PriceSyncWorker,
  StockSyncWorker,
  CartCleanupWorker,
  AnalyticsProcessorWorker,
];

const REPOSITORY_BINDINGS = [
  { provide: 'CartRepository', useExisting: CartRedisRepository },
  { provide: 'CartItemRepository', useExisting: CartItemRedisRepository },
  { provide: 'CartCouponRepository', useExisting: CartCouponRedisRepository },
  { provide: 'GuestCartRepository', useExisting: GuestCartRedisRepository },
  { provide: 'SavedForLaterRepository', useExisting: SavedForLaterPrismaRepository },
  { provide: 'AbandonedCartRepository', useExisting: AbandonedCartPrismaRepository },
];

const SERVICE_BINDINGS = [
  { provide: 'ProductClient', useExisting: ProductClient },
  { provide: 'VendorClient', useExisting: VendorClient },
  { provide: 'UserClient', useExisting: UserClient },
  { provide: 'PricingClient', useExisting: PricingClient },
  { provide: 'TaxClient', useExisting: TaxClient },
  { provide: 'ShippingClient', useExisting: ShippingClient },
  { provide: 'CouponClient', useExisting: CouponClient },
];

@Module({
  imports: [
    KernelPrismaModule,
    KernelRedisModule,
    KernelEmailModule,
    KernelSmsModule,
    KernelPushModule,
    KernelQueueModule,

    AppPrismaModule,
    AppRedisModule,
    CartEmailModule,
    CartSmsModule,
    CartPushModule,
  ],
  providers: [
    ...PRISMA_REPOSITORIES,
    ...REDIS_REPOSITORIES,
    ...CACHE_REPOSITORIES,
    ...EXTERNAL_CLIENTS,
    ...INTERNAL_SERVICES,
    ...QUEUES,
    ...WORKERS,
    ...REPOSITORY_BINDINGS,
    ...SERVICE_BINDINGS,
  ],
  exports: [
    AppPrismaModule,
    AppRedisModule,
    CartEmailModule,
    CartSmsModule,
    CartPushModule,
    ...PRISMA_REPOSITORIES,
    ...REDIS_REPOSITORIES,
    ...CACHE_REPOSITORIES,
    ...EXTERNAL_CLIENTS,
    ...INTERNAL_SERVICES,
    ...QUEUES,
    ...REPOSITORY_BINDINGS,
    ...SERVICE_BINDINGS,
  ],
})
export class InfrastructureModule {}
