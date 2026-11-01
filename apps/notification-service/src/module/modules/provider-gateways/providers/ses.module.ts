/**
 * SesProviderModule
 * @module notification-service/modules/provider-gateways/providers
 */
import { Module } from '@nestjs/common';
import { SesProvider } from '@infrastructure/providers/email/ses.provider.js';

@Module({
  providers: [SesProvider],
  exports: [SesProvider],
})
export class SesProviderModule {}
