/**
 * SSLCommerz Gateway Module
 * @module payment-service/infrastructure/gateways/sslcommerz
 */
import { Module } from '@nestjs/common';
import { SslcommerzClient } from './sslcommerz.client.js';
import { SslcommerzWebhookVerifier } from './sslcommerz.webhook.js';
import { SslcommerzGatewayAdapter } from './sslcommerz.gateway.js';

@Module({
  providers: [
    SslcommerzClient,
    SslcommerzWebhookVerifier,
    SslcommerzGatewayAdapter,
  ],
  exports: [SslcommerzGatewayAdapter],
})
export class SslcommerzModule {}
