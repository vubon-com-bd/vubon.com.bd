/**
 * TwilioProviderModule
 * @module notification-service/modules/provider-gateways/providers
 */
import { Module } from '@nestjs/common';
import { TwilioProvider } from '@infrastructure/providers/sms/twilio.provider.js';

@Module({
  providers: [TwilioProvider],
  exports: [TwilioProvider],
})
export class TwilioProviderModule {}
