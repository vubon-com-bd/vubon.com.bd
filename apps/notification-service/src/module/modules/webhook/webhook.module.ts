import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { WebhookController } from '../../interfaces/controllers/rest/webhook.controller';
import { SendGridWebhookController } from '../../interfaces/controllers/webhooks/sendgrid.webhook';
import { MailgunWebhookController } from '../../interfaces/controllers/webhooks/mailgun.webhook';
import { SesWebhookController } from '../../interfaces/controllers/webhooks/ses.webhook';
import { TwilioWebhookController } from '../../interfaces/controllers/webhooks/twilio.webhook';
import { VonageWebhookController } from '../../interfaces/controllers/webhooks/vonage.webhook';
import { FcmWebhookController } from '../../interfaces/controllers/webhooks/fcm.webhook';
import { ApnsWebhookController } from '../../interfaces/controllers/webhooks/apns.webhook';

import { WebhookService } from '../../application/services/impl/webhook.service';
import {
  WebhookSignerService,
  WebhookVerifierService,
} from '../../infrastructure/services/internal';

import { HttpWebhookProvider } from '../../infrastructure/providers/webhook/http.provider';
import { SlackProvider } from '../../infrastructure/providers/webhook/slack.provider';
import { DiscordProvider } from '../../infrastructure/providers/webhook/discord.provider';
import { TelegramProvider } from '../../infrastructure/providers/webhook/telegram.provider';

import { WebhookPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/webhook.prisma.repository';

import { WebhookSenderWorker } from '../../infrastructure/workers/webhook-sender.worker';
import { WebhookQueue } from '../../infrastructure/queues/webhook.queue';

import {
  CreateWebhookHandler,
  UpdateWebhookHandler,
  TestWebhookHandler,
} from '../../application/commands/webhook';

import {
  HandleSendGridWebhookHandler,
  HandleTwilioWebhookHandler,
  HandleFcmWebhookHandler,
  HandleApnsWebhookHandler,
} from '../../application/commands/provider-webhook';

import {
  GetWebhookHandler,
  ListWebhooksHandler,
} from '../../application/queries/webhook';

@Module({
  imports: [CqrsModule],
  controllers: [
    WebhookController,
    SendGridWebhookController,
    MailgunWebhookController,
    SesWebhookController,
    TwilioWebhookController,
    VonageWebhookController,
    FcmWebhookController,
    ApnsWebhookController,
  ],
  providers: [
    WebhookPrismaRepository,
    WebhookService,
    WebhookSignerService,
    WebhookVerifierService,
    HttpWebhookProvider,
    SlackProvider,
    DiscordProvider,
    TelegramProvider,
    WebhookQueue,
    WebhookSenderWorker,
    CreateWebhookHandler,
    UpdateWebhookHandler,
    TestWebhookHandler,
    HandleSendGridWebhookHandler,
    HandleTwilioWebhookHandler,
    HandleFcmWebhookHandler,
    HandleApnsWebhookHandler,
    GetWebhookHandler,
    ListWebhooksHandler,
  ],
  exports: [
    WebhookService,
    WebhookPrismaRepository,
    WebhookQueue,
    WebhookSignerService,
    WebhookVerifierService,
  ],
})
export class WebhookModule {}
