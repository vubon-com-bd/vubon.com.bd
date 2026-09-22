import { Module } from '@nestjs/common';
import { PaypalClient } from './paypal.client';
import { PaypalConfig } from './paypal.config';
import { PaypalGateway } from './paypal.gateway';
import { PaypalWebhook } from './paypal.webhook';

@Module({
  providers: [PaypalConfig, PaypalClient, PaypalWebhook, PaypalGateway],
  exports: [PaypalGateway],
})
export class PaypalModule {}
