/**
 * PayPal Gateway Module
 * @module payment-service/infrastructure/gateways/paypal
 */
import { Module } from '@nestjs/common';
import { PaypalClient } from './paypal.client.js';
import { PaypalWebhookVerifier } from './paypal.webhook.js';
import { PaypalGatewayAdapter } from './paypal.gateway.js';

@Module({
  providers: [PaypalClient, PaypalWebhookVerifier, PaypalGatewayAdapter],
  exports: [PaypalGatewayAdapter],
})
export class PaypalModule {}
