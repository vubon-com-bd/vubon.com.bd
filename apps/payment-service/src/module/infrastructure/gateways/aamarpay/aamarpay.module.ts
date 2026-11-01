/**
 * aamarPay Gateway Module
 * @module payment-service/infrastructure/gateways/aamarpay
 */
import { Module } from '@nestjs/common';
import { AamarpayClient } from './aamarpay.client.js';
import { AamarpayWebhookVerifier } from './aamarpay.webhook.js';
import { AamarpayGatewayAdapter } from './aamarpay.gateway.js';

@Module({
  providers: [AamarpayClient, AamarpayWebhookVerifier, AamarpayGatewayAdapter],
  exports: [AamarpayGatewayAdapter],
})
export class AamarpayModule {}
