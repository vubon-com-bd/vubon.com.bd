/**
 * Stripe Gateway Module
 * @module payment-service/infrastructure/gateways/stripe
 */
import { Module } from '@nestjs/common';
import { StripeClient } from './stripe.client.js';
import { StripeWebhookVerifier } from './stripe.webhook.js';
import { StripeGatewayAdapter } from './stripe.gateway.js';

@Module({
  providers: [StripeClient, StripeWebhookVerifier, StripeGatewayAdapter],
  exports: [StripeGatewayAdapter],
})
export class StripeModule {}
