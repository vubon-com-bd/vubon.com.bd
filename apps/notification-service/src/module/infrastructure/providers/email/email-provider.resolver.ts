/**
 * EmailProviderResolver — picks the active email provider per config
 * @module notification-service/infrastructure/providers/email
 */
import { Inject, Injectable, Logger, Optional } from '@nestjs/common';
import { EMAIL_CONFIG } from '@vubon/shared-config/platform/notification';
import type { EmailSendPayload, IEmailProvider } from '../base/provider.interface.js';
import type { ProviderSendResult } from '../base/provider.types.js';
import { ResendEmailProvider } from './resend.provider.js';
import { SmtpEmailProvider } from './smtp.provider.js';

export const EMAIL_PROVIDER_RESOLVER = Symbol('EMAIL_PROVIDER_RESOLVER');
export const EMAIL_DEFAULT_PROVIDER = Symbol('EMAIL_DEFAULT_PROVIDER');

export interface IEmailProviderResolver {
  resolve(preferredName?: string): IEmailProvider | null;
  list(): readonly IEmailProvider[];
  send(payload: EmailSendPayload, preferredName?: string): Promise<ProviderSendResult>;
}

@Injectable()
export class EmailProviderResolver implements IEmailProviderResolver {
  private readonly logger = new Logger(EmailProviderResolver.name);
  private readonly defaultProvider: string | undefined;

  constructor(
    private readonly resend: ResendEmailProvider,
    private readonly smtp: SmtpEmailProvider,
    @Optional() @Inject(EMAIL_DEFAULT_PROVIDER) defaultProvider?: string,
  ) {
    this.defaultProvider = defaultProvider ?? EMAIL_CONFIG.provider;
  }

  list(): readonly IEmailProvider[] {
    return [this.resend, this.smtp].filter((p) => p.isEnabled());
  }

  resolve(preferredName?: string): IEmailProvider | null {
    if (preferredName) {
      const found = this.list().find((p) => p.name === preferredName);
      if (found) return found;
      this.logger.warn(`Preferred email provider "${preferredName}" not available`);
    }
    if (this.defaultProvider) {
      const found = this.list().find((p) => p.name === this.defaultProvider);
      if (found) return found;
    }
    const first = this.list()[0];
    if (first) return first;
    this.logger.error('No email provider available');
    return null;
  }

  async send(payload: EmailSendPayload, preferredName?: string): Promise<ProviderSendResult> {
    const provider = this.resolve(preferredName);
    if (!provider) {
      return { success: false, error: 'No email provider available', errorCode: 'NO_PROVIDER' };
    }
    return provider.send(payload);
  }
}
