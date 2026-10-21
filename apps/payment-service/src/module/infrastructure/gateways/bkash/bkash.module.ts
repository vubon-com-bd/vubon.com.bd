/**
 * Bkash Gateway Module
 * @module payment-service/infrastructure/gateways/bkash
 */
import { Module } from '@nestjs/common';
import { BkashClient } from './bkash.client.js';
import { BkashWebhookVerifier } from './bkash.webhook.js';
import { BkashGatewayAdapter } from './bkash.gateway.js';

@Module({
  providers: [BkashClient, BkashWebhookVerifier, BkashGatewayAdapter],
  exports: [BkashGatewayAdapter],
})
export class BkashModule {}
