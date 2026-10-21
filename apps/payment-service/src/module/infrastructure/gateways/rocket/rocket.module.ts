/**
 * Rocket Gateway Module
 * @module payment-service/infrastructure/gateways/rocket
 */
import { Module } from '@nestjs/common';
import { RocketClient } from './rocket.client.js';
import { RocketWebhookVerifier } from './rocket.webhook.js';
import { RocketGatewayAdapter } from './rocket.gateway.js';

@Module({
  providers: [RocketClient, RocketWebhookVerifier, RocketGatewayAdapter],
  exports: [RocketGatewayAdapter],
})
export class RocketModule {}
