import { Module } from '@nestjs/common';
import { StripeClient } from './stripe.client';
import { StripeConfig } from './stripe.config';
import { StripeGateway } from './stripe.gateway';
import { StripeWebhook } from './stripe.webhook';

@Module({
  providers: [StripeConfig, StripeClient, StripeWebhook, StripeGateway],
  exports: [StripeGateway],
})
export class StripeModule {}
