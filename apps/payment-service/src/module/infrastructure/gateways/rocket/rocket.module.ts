import { Module } from '@nestjs/common';
import { RocketClient } from './rocket.client';
import { RocketConfig } from './rocket.config';
import { RocketGateway } from './rocket.gateway';
import { RocketWebhook } from './rocket.webhook';

@Module({
  providers: [RocketConfig, RocketClient, RocketWebhook, RocketGateway],
  exports: [RocketGateway],
})
export class RocketModule {}
