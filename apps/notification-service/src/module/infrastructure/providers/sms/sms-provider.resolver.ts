/**
 * SmsProviderResolver — picks active SMS provider
 * @module notification-service/infrastructure/providers/sms
 */
import { Inject, Injectable, Logger, Optional } from '@nestjs/common';
import { SMS_CONFIG } from '@vubon/shared-config/platform/notification';
import type { ISmsProvider, SmsSendPayload } from '../base/provider.interface.js';
import type { ProviderSendResult } from '../base/provider.types.js';
import { TwilioSmsProvider } from './twilio.provider.js';
import { SslWirelessSmsProvider } from './sslwireless.provider.js';

export const SMS_PROVIDER_RESOLVER = Symbol('SMS_PROVIDER_RESOLVER');
export const SMS_DEFAULT_PROVIDER = Symbol('SMS_DEFAULT_PROVIDER');

export interface ISmsProviderResolver {
  resolve(preferredName?: string): ISmsProvider | null;
  list(): readonly ISmsProvider[];
  send(payload: SmsSendPayload, preferredName?: string): Promise<ProviderSendResult>;
}

@Injectable()
export class SmsProviderResolver implements ISmsProviderResolver {
  private readonly logger = new Logger(SmsProviderResolver.name);
  private readonly defaultProvider: string | undefined;

  constructor(
    private readonly twilio: TwilioSmsProvider,
    private readonly sslwireless: SslWirelessSmsProvider,
    @Optional() @Inject(SMS_DEFAULT_PROVIDER) defaultProvider?: string,
  ) {
    this.defaultProvider = defaultProvider ?? SMS_CONFIG.provider;
  }

  list(): readonly ISmsProvider[] {
    return [this.twilio, this.sslwireless].filter((p) => p.isEnabled());
  }

  resolve(preferredName?: string): ISmsProvider | null {
    if (preferredName) {
      const found = this.list().find((p) => p.name === preferredName);
      if (found) return found;
    }
    if (this.defaultProvider) {
      const found = this.list().find((p) => p.name === this.defaultProvider);
      if (found) return found;
    }
    const first = this.list()[0];
    if (first) return first;
    this.logger.error('No SMS provider available');
    return null;
  }

  async send(payload: SmsSendPayload, preferredName?: string): Promise<ProviderSendResult> {
    const provider = this.resolve(preferredName);
    if (!provider) {
      return { success: false, error: 'No SMS provider available', errorCode: 'NO_PROVIDER' };
    }
    return provider.send(payload);
  }
}
