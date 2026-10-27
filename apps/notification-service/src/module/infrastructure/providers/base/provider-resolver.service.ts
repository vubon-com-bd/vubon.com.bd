/**
 * ProviderResolverService — resolves active provider per channel
 * @module notification-service/infrastructure/providers/base
 */
import { Injectable, Logger, Optional } from '@nestjs/common';
import type { AnyProvider, IProviderResolver } from './provider.interface.js';
import type { ProviderChannel } from './provider.types.js';

// Each provider is OPTIONAL so missing providers don't break boot
import { SmtpProvider } from '../email/smtp.provider.js';
import { SendgridProvider } from '../email/sendgrid.provider.js';
import { MailgunProvider } from '../email/mailgun.provider.js';
import { SesProvider } from '../email/ses.provider.js';
import { ResendProvider } from '../email/resend.provider.js';
import { PostmarkProvider } from '../email/postmark.provider.js';

@Injectable()
export class ProviderResolverService implements IProviderResolver {
  private readonly logger = new Logger(ProviderResolverService.name);
  private readonly providers: readonly AnyProvider[];

  constructor(
    @Optional() smtp?: SmtpProvider,
    @Optional() sendgrid?: SendgridProvider,
    @Optional() mailgun?: MailgunProvider,
    @Optional() ses?: SesProvider,
    @Optional() resend?: ResendProvider,
    @Optional() postmark?: PostmarkProvider,
  ) {
    const all = [smtp, sendgrid, mailgun, ses, resend, postmark].filter(
      (p): p is NonNullable<typeof p> => p !== undefined && p !== null,
    );
    this.providers = all as unknown as readonly AnyProvider[];
    this.logger.log(`ProviderResolver: ${this.providers.length} email providers registered`);
  }

  resolve(channel: ProviderChannel, name?: string): AnyProvider {
    const available = this.resolveAll(channel);
    if (available.length === 0) {
      throw new Error(`No provider available for channel: ${channel}`);
    }

    if (name) {
      const match = available.find((p) => p.metadata.name === name);
      if (!match) throw new Error(`Provider "${name}" not found`);
      return match;
    }

    const enabled = available.filter((p) => p.isEnabled());
    if (enabled.length === 0) {
      throw new Error(`No enabled provider for channel: ${channel}`);
    }

    return enabled.sort(
      (a, b) => (a.metadata.priority ?? 999) - (b.metadata.priority ?? 999),
    )[0];
  }

  resolveAll(channel: ProviderChannel): readonly AnyProvider[] {
    return this.providers.filter((p) => p.metadata.channel === channel);
  }

  availableNames(channel: ProviderChannel): readonly string[] {
    return this.resolveAll(channel).map((p) => p.metadata.name);
  }
}
