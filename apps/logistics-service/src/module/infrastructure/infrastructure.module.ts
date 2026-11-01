/**
 * InfrastructureModule — aggregates all infrastructure sub-modules
 * @module logistics-service/infrastructure
 */
import { DynamicModule, Global, Module } from '@nestjs/common';
import { EventBusModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache';

// Persistence
import { LogisticsPrismaModule } from './persistence/prisma/prisma.module.js';
import { PrismaRepositoriesModule } from './persistence/prisma/prisma-repositories.module.js';
import { RedisRepositoriesModule } from './persistence/cache/redis-repositories.module.js';
import { SearchModule } from './persistence/search/search.module.js';

// Queues + Workers
import { QueuesWorkersModule } from './queues-workers.module.js';

// Security
import { SecurityModule } from './security/security.module.js';

// External integrations
import { CouriersModule } from './external/couriers/index.js';
import { MapsModule } from './external/maps/index.js';
import { StorageModule } from './external/storage/index.js';
import { EmailModule } from './external/email/index.js';
import { SlackModule } from './external/slack/index.js';
import { ChartModule } from './external/chart/index.js';

// Internal services (SignatureService etc. via provider injection later)
import { InternalServicesModule } from './services/internal/internal-services.module.js';

// Cross-service HTTP clients
import { OrderClient } from './services/external/order.client.js';
import { ProductClient } from './services/external/product.client.js';
import { UserClient } from './services/external/user.client.js';
import { VendorClient } from './services/external/vendor.client.js';
import { PaymentClient } from './services/external/payment.client.js';
import { NotificationClient } from './services/external/notification.client.js';
import { CartClient } from './services/external/cart.client.js';
import { IdentityClient } from './services/external/identity.client.js';

const EXTERNAL_CLIENTS = [
  OrderClient,
  ProductClient,
  UserClient,
  VendorClient,
  PaymentClient,
  NotificationClient,
  CartClient,
  IdentityClient,
] as const;

@Global()
@Module({})
export class InfrastructureModule {
  static forRoot(): DynamicModule {
    return {
      module: InfrastructureModule,
      global: true,
      imports: [
        // Core messaging + cache
        EventBusModule,
        EventBridgeModule,
        RedisModule,

        // Persistence
        LogisticsPrismaModule,
        PrismaRepositoriesModule,
        RedisRepositoriesModule,
        SearchModule,

        // Background jobs
        QueuesWorkersModule,

        // Security
        SecurityModule,

        // External integrations
        CouriersModule,
        MapsModule,
        StorageModule,
        EmailModule,
        SlackModule,
        ChartModule,

        // Internal services
        InternalServicesModule,
      ],
      providers: [...EXTERNAL_CLIENTS],
      exports: [
        EventBusModule,
        EventBridgeModule,
        RedisModule,
        LogisticsPrismaModule,
        PrismaRepositoriesModule,
        RedisRepositoriesModule,
        SearchModule,
        QueuesWorkersModule,
        SecurityModule,
        CouriersModule,
        MapsModule,
        StorageModule,
        EmailModule,
        SlackModule,
        ChartModule,
        InternalServicesModule,
        ...EXTERNAL_CLIENTS,
      ],
    };
  }
}
