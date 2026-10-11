/**
 * InfrastructureModule — aggregates every infrastructure sub-module
 * @module notification-service/infrastructure
 */
import { Global, Module } from '@nestjs/common';

import { EmailModule } from '@vubon/shared-kernel/infrastructure/external';
import { SmsModule } from '@vubon/shared-kernel/infrastructure/external';
import { PushModule } from '@vubon/shared-kernel/infrastructure/external';

import { PrismaRepositoriesModule } from './persistence/prisma/prisma-repositories.module.js';
import { RedisRepositoriesModule } from './persistence/cache/redis-repositories.module.js';
import { QueuesWorkersModule } from './queues-workers.module.js';

// Provider adapters (real, free-tier ready)
import { EmailProviderModule } from './providers/email/email-provider.module.js';
import { SmsProviderModule } from './providers/sms/sms-provider.module.js';
import { PushProviderModule } from './providers/push/push-provider.module.js';

import { TemplateRendererService } from './services/internal/template-renderer.service.js';
import { RateLimiterService } from './services/internal/rate-limiter.service.js';
import { QuietHoursService } from './services/internal/quiet-hours.service.js';
import { PreferenceCheckerService } from './services/internal/preference-checker.service.js';
import { ChannelSelectorService } from './services/internal/channel-selector.service.js';
import { SignatureService } from './services/internal/signature.service.js';
import { RetryPolicyService } from './services/internal/retry-policy.service.js';
import { UnsubscribeService } from './services/internal/unsubscribe.service.js';

import { UserServiceClient } from './services/external/user-service.client.js';
import { OrderServiceClient } from './services/external/order-service.client.js';
import { ProductServiceClient } from './services/external/product-service.client.js';
import { VendorServiceClient } from './services/external/vendor-service.client.js';
import { PaymentServiceClient } from './services/external/payment-service.client.js';
import { AnalyticsCollectorService } from './services/external/analytics-collector.service.js';

const INTERNAL_SERVICES = [
  TemplateRendererService,
  RateLimiterService,
  QuietHoursService,
  PreferenceCheckerService,
  ChannelSelectorService,
  SignatureService,
  RetryPolicyService,
  UnsubscribeService,
];

const EXTERNAL_SERVICES = [
  UserServiceClient,
  OrderServiceClient,
  ProductServiceClient,
  VendorServiceClient,
  PaymentServiceClient,
  AnalyticsCollectorService,
];

@Global()
@Module({
  imports: [
    EmailModule,
    SmsModule,
    PushModule,
    PrismaRepositoriesModule,
    RedisRepositoriesModule,
    QueuesWorkersModule,
    EmailProviderModule,
    SmsProviderModule,
    PushProviderModule,
  ],
  providers: [...INTERNAL_SERVICES, ...EXTERNAL_SERVICES],
  exports: [
    EmailModule,
    SmsModule,
    PushModule,
    PrismaRepositoriesModule,
    RedisRepositoriesModule,
    QueuesWorkersModule,
    EmailProviderModule,
    SmsProviderModule,
    PushProviderModule,
    ...INTERNAL_SERVICES,
    ...EXTERNAL_SERVICES,
  ],
})
export class InfrastructureModule {}
