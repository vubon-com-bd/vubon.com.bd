import { Module } from '@nestjs/common';
import { TwilioProvider } from '../../../infrastructure/providers/sms/twilio.provider';

@Module({
  providers: [TwilioProvider],
  exports: [TwilioProvider],
})
export class TwilioProviderModule {}
