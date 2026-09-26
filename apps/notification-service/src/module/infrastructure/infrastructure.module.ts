import { Module } from '@nestjs/common';

// Kernel modules (global) — re-imported for DI
import {
  PrismaModule,
  RedisModule,
  QueueModule,
} from '@vubon/shared-kernel/infrastructure';

// App-level Prisma module
import { PrismaModule as AppPrismaModule } from './persistence/prisma/prisma.module';

// Prisma Repositories (18)
import {
  NotificationPrismaRepository,
  NotificationContentPrismaRepository,
  NotificationRecipientPrismaRepository,
  NotificationActionPrismaRepository,
  NotificationDeliveryPrismaRepository,
  NotificationAttemptPrismaRepository,
  TemplatePrismaRepository,
  TemplateVariablePrismaRepository,
  SchedulePrismaRepository,
  BroadcastPrismaRepository,
  BroadcastResultPrismaRepository,
  DigestPrismaRepository,
  DigestItemPrismaRepository,
  PreferencePrismaRepository,
  PreferenceMatrixPrismaRepository,
  DevicePrismaRepository,
  DeviceTokenPrismaRepository,
  WebhookPrismaRepository,
} from './persistence/prisma/repositories';

// Cache Repositories (4)
import {
  NotificationCacheRepository,
  TemplateCacheRepository,
  PreferenceCacheRepository,
  DeviceCacheRepository,
} from './persistence/cache/repositories';

// Providers (21)
import {
  SendGridProvider,
  MailgunProvider,
  SesProvider,
  PostmarkProvider,
  ResendProvider,
  SmtpProvider,
} from './providers/email';
import {
  TwilioProvider,
  VonageProvider,
  BulkSmsBdProvider,
  BanglalinkProvider,
  GrameenphoneProvider,
} from './providers/sms';
import {
  FcmProvider,
  ApnsProvider,
  WebPushProvider,
  OneSignalProvider,
} from './providers/push';
import { WebSocketProvider, SseProvider } from './providers/in-app';
import {
  HttpWebhookProvider,
  SlackProvider,
  DiscordProvider,
  TelegramProvider,
} from './providers/webhook';

// Template Engine
import { TemplateEngineModule } from './template-engine/template.module';

// Internal services (12)
import {
  NotificationComposerService,
  ChannelSelectorService,
  RateLimiterService,
  QuietHoursService,
  RetrySchedulerService,
  BounceHandlerService,
  UnsubscribeTokenService,
  DeviceTokenValidatorService,
  WebhookSignerService,
  WebhookVerifierService,
  SmsSplitterService,
  ContentSanitizerService,
} from './services/internal';

// External services (6)
import {
  UserClient,
  OrderClient,
  ProductClient,
  VendorClient,
  PaymentClient,
  AnalyticsClient,
} from './services/external';

// Queues (10)
import {
  NotificationQueue,
  EmailQueue,
  SmsQueue,
  PushQueue,
  InAppQueue,
  WebhookQueue,
  ScheduleQueue,
  BroadcastQueue,
  DigestQueue,
  RetryQueue,
} from './queues';

// Workers (10)
import {
  NotificationSenderWorker,
  EmailSenderWorker,
  SmsSenderWorker,
  PushSenderWorker,
  InAppSenderWorker,
  WebhookSenderWorker,
  ScheduleTriggerWorker,
  BroadcastProcessorWorker,
  DigestProcessorWorker,
  RetryProcessorWorker,
} from './workers';

// External integrations
import { StorageModule } from './external/storage';
import { AnalyticsModule } from './external/analytics';

// ─── Arrays for readability ────────────────────────────────
const PRISMA_REPOSITORIES = [
  NotificationPrismaRepository,
  NotificationContentPrismaRepository,
  NotificationRecipientPrismaRepository,
  NotificationActionPrismaRepository,
  NotificationDeliveryPrismaRepository,
  NotificationAttemptPrismaRepository,
  TemplatePrismaRepository,
  TemplateVariablePrismaRepository,
  SchedulePrismaRepository,
  BroadcastPrismaRepository,
  BroadcastResultPrismaRepository,
  DigestPrismaRepository,
  DigestItemPrismaRepository,
  PreferencePrismaRepository,
  PreferenceMatrixPrismaRepository,
  DevicePrismaRepository,
  DeviceTokenPrismaRepository,
  WebhookPrismaRepository,
];

const CACHE_REPOSITORIES = [
  NotificationCacheRepository,
  TemplateCacheRepository,
  PreferenceCacheRepository,
  DeviceCacheRepository,
];

const PROVIDERS = [
  // Email
  SendGridProvider,
  MailgunProvider,
  SesProvider,
  PostmarkProvider,
  ResendProvider,
  SmtpProvider,
  // SMS
  TwilioProvider,
  VonageProvider,
  BulkSmsBdProvider,
  BanglalinkProvider,
  GrameenphoneProvider,
  // Push
  FcmProvider,
  ApnsProvider,
  WebPushProvider,
  OneSignalProvider,
  // In-App
  WebSocketProvider,
  SseProvider,
  // Webhook
  HttpWebhookProvider,
  SlackProvider,
  DiscordProvider,
  TelegramProvider,
];

const INTERNAL_SERVICES = [
  NotificationComposerService,
  ChannelSelectorService,
  RateLimiterService,
  QuietHoursService,
  RetrySchedulerService,
  BounceHandlerService,
  UnsubscribeTokenService,
  DeviceTokenValidatorService,
  WebhookSignerService,
  WebhookVerifierService,
  SmsSplitterService,
  ContentSanitizerService,
];

const EXTERNAL_CLIENTS = [
  UserClient,
  OrderClient,
  ProductClient,
  VendorClient,
  PaymentClient,
  AnalyticsClient,
];

const QUEUES = [
  NotificationQueue,
  EmailQueue,
  SmsQueue,
  PushQueue,
  InAppQueue,
  WebhookQueue,
  ScheduleQueue,
  BroadcastQueue,
  DigestQueue,
  RetryQueue,
];

const WORKERS = [
  NotificationSenderWorker,
  EmailSenderWorker,
  SmsSenderWorker,
  PushSenderWorker,
  InAppSenderWorker,
  WebhookSenderWorker,
  ScheduleTriggerWorker,
  BroadcastProcessorWorker,
  DigestProcessorWorker,
  RetryProcessorWorker,
];

@Module({
  imports: [
    // Kernel
    PrismaModule,
    RedisModule,
    QueueModule,

    // App-level Prisma
    AppPrismaModule,

    // Template engine
    TemplateEngineModule,

    // External integrations
    StorageModule,
    AnalyticsModule,
  ],
  providers: [
    ...PRISMA_REPOSITORIES,
    ...CACHE_REPOSITORIES,
    ...PROVIDERS,
    ...INTERNAL_SERVICES,
    ...EXTERNAL_CLIENTS,
    ...QUEUES,
    ...WORKERS,
  ],
  exports: [
    AppPrismaModule,
    TemplateEngineModule,
    StorageModule,
    AnalyticsModule,

    ...PRISMA_REPOSITORIES,
    ...CACHE_REPOSITORIES,
    ...PROVIDERS,
    ...INTERNAL_SERVICES,
    ...EXTERNAL_CLIENTS,
    ...QUEUES,
  ],
})
export class InfrastructureModule {}
