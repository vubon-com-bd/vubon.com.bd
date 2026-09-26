import { Module } from '@nestjs/common';

import { SendGridProviderModule } from './providers/sendgrid.module';
import { MailgunProviderModule } from './providers/mailgun.module';
import { SesProviderModule } from './providers/ses.module';
import { TwilioProviderModule } from './providers/twilio.module';
import { FcmProviderModule } from './providers/fcm.module';
import { ApnsProviderModule } from './providers/apns.module';
import { WebhookProviderModule } from './providers/webhook.module';

@Module({
  imports: [
    SendGridProviderModule,
    MailgunProviderModule,
    SesProviderModule,
    TwilioProviderModule,
    FcmProviderModule,
    ApnsProviderModule,
    WebhookProviderModule,
  ],
  exports: [
    SendGridProviderModule,
    MailgunProviderModule,
    SesProviderModule,
    TwilioProviderModule,
    FcmProviderModule,
    ApnsProviderModule,
    WebhookProviderModule,
  ],
})
export class ProviderGatewaysModule {}
