import { Module } from '@nestjs/common';
import { BkashClient } from './bkash.client';
import { BkashConfig } from './bkash.config';
import { BkashGateway } from './bkash.gateway';
import { BkashWebhook } from './bkash.webhook';

@Module({
  providers: [BkashConfig, BkashClient, BkashWebhook, BkashGateway],
  exports: [BkashGateway],
})
export class BkashModule {}
