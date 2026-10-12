/**
 * WebhooksModule — registers all courier webhook controllers
 * @module logistics-service/modules/webhooks
 */
import { Module } from '@nestjs/common';
import {
  PathaoWebhookController,
  RedxWebhookController,
  SteadfastWebhookController,
  SaParibahanWebhookController,
} from '../../interfaces/controllers/webhooks/index.js';

@Module({
  controllers: [
    PathaoWebhookController,
    RedxWebhookController,
    SteadfastWebhookController,
    SaParibahanWebhookController,
  ],
})
export class WebhooksModule {}
