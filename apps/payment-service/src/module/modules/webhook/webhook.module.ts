/**
 * WebhookModule — feature wiring for all gateway webhook endpoints
 * @module payment-service/modules/webhook
 *
 * Hosts webhook controllers for all 8 gateways. Handlers registered here
 * cover the four that use dedicated commands. The remaining four (rocket,
 * paypal, aamarpay, crypto) call ConfirmPaymentCommand directly from the
 * controller, so no extra handler is needed here.
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// ─── Controllers ────────────────────────────
import { BkashWebhookController } from '@interfaces/controllers/webhooks/bkash.webhook';
import { NagadWebhookController } from '@interfaces/controllers/webhooks/nagad.webhook';
import { RocketWebhookController } from '@interfaces/controllers/webhooks/rocket.webhook';
import { StripeWebhookController } from '@interfaces/controllers/webhooks/stripe.webhook';
import { PaypalWebhookController } from '@interfaces/controllers/webhooks/paypal.webhook';
import { SslcommerzWebhookController } from '@interfaces/controllers/webhooks/sslcommerz.webhook';
import { AamarpayWebhookController } from '@interfaces/controllers/webhooks/aamarpay.webhook';
import { CryptoWebhookController } from '@interfaces/controllers/webhooks/crypto.webhook';

// ─── Handler arrays ─────────────────────────
import { WEBHOOK_COMMAND_HANDLERS } from './commands/index.js';

@Module({
  imports: [CqrsModule],
  controllers: [
    BkashWebhookController,
    NagadWebhookController,
    RocketWebhookController,
    StripeWebhookController,
    PaypalWebhookController,
    SslcommerzWebhookController,
    AamarpayWebhookController,
    CryptoWebhookController,
  ],
  providers: [
    ...(WEBHOOK_COMMAND_HANDLERS as readonly unknown[] as never[]),
  ],
})
export class WebhookModule {}
