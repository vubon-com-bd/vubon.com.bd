/**
 * FcmProviderModule
 * @module notification-service/modules/provider-gateways/providers
 */
import { Module } from '@nestjs/common';
import { FcmProvider } from '@infrastructure/providers/push/fcm.provider.js';

@Module({
  providers: [FcmProvider],
  exports: [FcmProvider],
})
export class FcmProviderModule {}
