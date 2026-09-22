import { Module } from '@nestjs/common';
import { SslcommerzClient } from './sslcommerz.client';
import { SslcommerzConfig } from './sslcommerz.config';
import { SslcommerzGateway } from './sslcommerz.gateway';
import { SslcommerzWebhook } from './sslcommerz.webhook';

@Module({
  providers: [SslcommerzConfig, SslcommerzClient, SslcommerzWebhook, SslcommerzGateway],
  exports: [SslcommerzGateway],
})
export class SslcommerzModule {}
