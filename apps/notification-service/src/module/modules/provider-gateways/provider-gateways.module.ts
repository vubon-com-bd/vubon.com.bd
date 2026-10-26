/**
 * ProviderGatewaysModule — aggregates all external provider modules
 * @module notification-service/modules/provider-gateways
 *
 * ⚠️ Provider instances are already provided by InfrastructureModule
 * (ProvidersModule). This module RE-EXPORTS them for feature-level access
 * if a feature needs a direct provider injection.
 *
 * Use this module when:
 *  - A feature needs to call a specific provider directly
 *  - You want per-provider DI isolation for testing
 */
import { Module } from '@nestjs/common';

import { SendgridProviderModule } from './providers/sendgrid.module.js';
import { MailgunProviderModule } from './providers/mailgun.module.js';
import { SesProviderModule } from './providers/ses.module.js';
import { TwilioProviderModule } from './providers/twilio.module.js';
import { FcmProviderModule } from './providers/fcm.module.js';
import { ApnsProviderModule } from './providers/apns.module.js';
import { WebhookProviderModule } from './providers/webhook.module.js';

const PROVIDER_MODULES = [
  SendgridProviderModule,
  MailgunProviderModule,
  SesProviderModule,
  TwilioProviderModule,
  FcmProviderModule,
  ApnsProviderModule,
  WebhookProviderModule,
];

@Module({
  imports: PROVIDER_MODULES,
  exports: PROVIDER_MODULES,
})
export class ProviderGatewaysModule {}
