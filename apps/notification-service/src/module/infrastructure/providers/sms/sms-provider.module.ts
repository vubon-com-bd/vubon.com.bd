/**
 * SmsProviderModule — wires SMS provider adapters
 * @module notification-service/infrastructure/providers/sms
 */
import { Global, Module } from '@nestjs/common';
import { SMS_CONFIG } from '@vubon/shared-config/platform/notification';
import { TwilioSmsProvider } from './twilio.provider.js';
import { SslWirelessSmsProvider } from './sslwireless.provider.js';
import {
  SmsProviderResolver,
  SMS_PROVIDER_RESOLVER,
  SMS_DEFAULT_PROVIDER,
} from './sms-provider.resolver.js';

@Global()
@Module({
  providers: [
    TwilioSmsProvider,
    SslWirelessSmsProvider,
    { provide: SMS_DEFAULT_PROVIDER, useValue: SMS_CONFIG.provider },
    SmsProviderResolver,
    { provide: SMS_PROVIDER_RESOLVER, useExisting: SmsProviderResolver },
  ],
  exports: [
    TwilioSmsProvider,
    SslWirelessSmsProvider,
    SmsProviderResolver,
    SMS_PROVIDER_RESOLVER,
  ],
})
export class SmsProviderModule {}
