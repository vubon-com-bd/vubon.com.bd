import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { BkashWebhookController } from '../../interfaces/controllers/webhooks/bkash.webhook';
import { NagadWebhookController } from '../../interfaces/controllers/webhooks/nagad.webhook';
import { StripeWebhookController } from '../../interfaces/controllers/webhooks/stripe.webhook';
import { SslcommerzWebhookController } from '../../interfaces/controllers/webhooks/sslcommerz.webhook';
import { WebhookSignatureGuard } from '../../interfaces/guards/webhook-signature.guard';
import { HandleBkashWebhookHandler } from '../../application/commands/webhook/handle-bkash-webhook.handler';
import { HandleNagadWebhookHandler } from '../../application/commands/webhook/handle-nagad-webhook.handler';
import { HandleStripeWebhookHandler } from '../../application/commands/webhook/handle-stripe-webhook.handler';
import { HandleSslcommerzWebhookHandler } from '../../application/commands/webhook/handle-sslcommerz-webhook.handler';

@Module({
  imports: [CqrsModule],
  controllers: [
    BkashWebhookController,
    NagadWebhookController,
    StripeWebhookController,
    SslcommerzWebhookController,
  ],
  providers: [
    WebhookSignatureGuard,
    HandleBkashWebhookHandler,
    HandleNagadWebhookHandler,
    HandleStripeWebhookHandler,
    HandleSslcommerzWebhookHandler,
  ],
})
export class WebhookModule {}
