import { Module } from '@nestjs/common';
import { NagadClient } from './nagad.client';
import { NagadConfig } from './nagad.config';
import { NagadGateway } from './nagad.gateway';
import { NagadWebhook } from './nagad.webhook';

@Module({
  providers: [NagadConfig, NagadClient, NagadWebhook, NagadGateway],
  exports: [NagadGateway],
})
export class NagadModule {}
