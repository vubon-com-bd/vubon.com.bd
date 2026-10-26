/**
 * ApnsProviderModule
 * @module notification-service/modules/provider-gateways/providers
 */
import { Module } from '@nestjs/common';
import { ApnsProvider } from '@infrastructure/providers/push/apns.provider.js';

@Module({
  providers: [ApnsProvider],
  exports: [ApnsProvider],
})
export class ApnsProviderModule {}
