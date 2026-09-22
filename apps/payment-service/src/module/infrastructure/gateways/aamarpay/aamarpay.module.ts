import { Module } from '@nestjs/common';
import { AamarpayClient } from './aamarpay.client';
import { AamarpayConfig } from './aamarpay.config';
import { AamarpayGateway } from './aamarpay.gateway';
import { AamarpayWebhook } from './aamarpay.webhook';

@Module({
  providers: [AamarpayConfig, AamarpayClient, AamarpayWebhook, AamarpayGateway],
  exports: [AamarpayGateway],
})
export class AamarpayModule {}
