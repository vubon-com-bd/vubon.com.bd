import { Module } from '@nestjs/common';
import { CryptoClient } from './crypto.client';
import { CryptoConfig } from './crypto.config';
import { CryptoGateway } from './crypto.gateway';
import { CryptoWebhook } from './crypto.webhook';

@Module({
  providers: [CryptoConfig, CryptoClient, CryptoWebhook, CryptoGateway],
  exports: [CryptoGateway],
})
export class CryptoModule {}
