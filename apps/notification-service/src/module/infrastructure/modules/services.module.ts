/**
 * Services Module — external clients + internal services
 * @module notification-service/infrastructure/modules
 */
import { Module } from '@nestjs/common';

// ─── External clients ──────────────────────
import { UserClient } from '@infrastructure/services/external/user.client.js';
import { OrderClient } from '@infrastructure/services/external/order.client.js';
import { ProductClient } from '@infrastructure/services/external/product.client.js';
import { VendorClient } from '@infrastructure/services/external/vendor.client.js';
import { PaymentClient } from '@infrastructure/services/external/payment.client.js';
import { AnalyticsClient } from '@infrastructure/services/external/analytics.client.js';

// ─── Internal services ─────────────────────
import { NotificationComposerService } from '@infrastructure/services/internal/notification-composer.service.js';
import { ChannelSelectorInfraService } from '@infrastructure/services/internal/channel-selector.service.js';
import { RecipientResolverInfraService } from '@infrastructure/services/internal/recipient-resolver.service.js';
import { RateLimiterInfraService } from '@infrastructure/services/internal/rate-limiter.service.js';
import { QuietHoursInfraService } from '@infrastructure/services/internal/quiet-hours.service.js';
import { RetrySchedulerInfraService } from '@infrastructure/services/internal/retry-scheduler.service.js';
import { BounceHandlerInfraService } from '@infrastructure/services/internal/bounce-handler.service.js';
import { UnsubscribeTokenInfraService } from '@infrastructure/services/internal/unsubscribe-token.service.js';
import { DeviceTokenValidatorInfraService } from '@infrastructure/services/internal/device-token-validator.service.js';
import { WebhookSignerInfraService } from '@infrastructure/services/internal/webhook-signer.service.js';
import { WebhookVerifierInfraService } from '@infrastructure/services/internal/webhook-verifier.service.js';
import { SmsSplitterInfraService } from '@infrastructure/services/internal/sms-splitter.service.js';
import { ContentSanitizerInfraService } from '@infrastructure/services/internal/content-sanitizer.service.js';

// ─── Template engine ───────────────────────
import { TemplateEngineModule } from '@infrastructure/template-engine/template.module.js';

const EXTERNAL_CLIENTS = [
  UserClient,
  OrderClient,
  ProductClient,
  VendorClient,
  PaymentClient,
  AnalyticsClient,
];

const INTERNAL_SERVICES = [
  NotificationComposerService,
  ChannelSelectorInfraService,
  RecipientResolverInfraService,
  RateLimiterInfraService,
  QuietHoursInfraService,
  RetrySchedulerInfraService,
  BounceHandlerInfraService,
  UnsubscribeTokenInfraService,
  DeviceTokenValidatorInfraService,
  WebhookSignerInfraService,
  WebhookVerifierInfraService,
  SmsSplitterInfraService,
  ContentSanitizerInfraService,
];

@Module({
  imports: [TemplateEngineModule],
  providers: [...EXTERNAL_CLIENTS, ...INTERNAL_SERVICES],
  exports: [...EXTERNAL_CLIENTS, ...INTERNAL_SERVICES, TemplateEngineModule],
})
export class ServicesModule {}
