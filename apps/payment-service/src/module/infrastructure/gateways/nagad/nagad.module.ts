/**
 * Nagad Gateway Module
 * @module payment-service/infrastructure/gateways/nagad
 */
import { Module } from '@nestjs/common';
import { NagadClient } from './nagad.client.js';
import { NagadWebhookVerifier } from './nagad.webhook.js';
import { NagadGatewayAdapter } from './nagad.gateway.js';

@Module({
  providers: [NagadClient, NagadWebhookVerifier, NagadGatewayAdapter],
  exports: [NagadGatewayAdapter],
})
export class NagadModule {}
