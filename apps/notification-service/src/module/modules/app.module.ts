import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

// Infrastructure (global prisma, redis, queue, providers, workers)
import { InfrastructureModule } from '../infrastructure';

// Feature Modules
import { NotificationModule } from './notification';
import { EmailModule } from './email';
import { SmsModule } from './sms';
import { PushModule } from './push';
import { InAppModule } from './in-app';
import { TemplateModule } from './template';
import { ScheduleModule } from './schedule';
import { BroadcastModule } from './broadcast';
import { DigestModule } from './digest';
import { PreferenceModule } from './preference';
import { DeviceModule } from './device';
import { WebhookModule } from './webhook';
import { DeliveryModule } from './delivery';

// Provider Gateways (aggregate)
import { ProviderGatewaysModule } from './provider-gateways';

@Module({
  imports: [
    // Framework
    ConfigModule.forRoot({ isGlobal: true }),

    // Kernel (Prisma, Redis, Queue, CQRS, EventBus, Guards, Filters, Pipes)
    KernelCommonModule,

    // Application Infrastructure (repos, providers, workers, queues)
    InfrastructureModule,

    // Provider Gateways (aggregate — email, sms, push, webhook)
    ProviderGatewaysModule,

    // Feature Modules
    NotificationModule,
    EmailModule,
    SmsModule,
    PushModule,
    InAppModule,
    TemplateModule,
    ScheduleModule,
    BroadcastModule,
    DigestModule,
    PreferenceModule,
    DeviceModule,
    WebhookModule,
    DeliveryModule,
  ],
})
export class AppModule {}
