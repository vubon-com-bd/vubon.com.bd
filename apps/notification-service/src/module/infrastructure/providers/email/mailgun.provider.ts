import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AbstractProvider } from '../base/provider.abstract';
import type { ProviderSendInput, ProviderSendResult } from '../base/provider.types';

@Injectable()
export class MailgunProvider extends AbstractProvider {
  readonly name = 'mailgun';
  readonly channel = 'email';

  async send(input: ProviderSendInput): Promise<ProviderSendResult> {
    try {
      const apiKey = this.config.apiKey ?? process.env.MAILGUN_API_KEY;
      const domain = process.env.MAILGUN_DOMAIN ?? 'sandbox.mailgun.org';

      if (!apiKey) {
        throw new Error('Mailgun API key not configured');
      }

      const fromAddress = this.config.fromAddress ?? `no-reply@${domain}`;

      const form = new URLSearchParams();
      form.append('from', fromAddress);
      form.append('to', input.recipient);
      form.append('subject', input.subject ?? '(no subject)');
      form.append('text', input.body);
      if (input.bodyHtml) form.append('html', input.bodyHtml);

      const { data } = await axios.post(
        `https://api.mailgun.net/v3/${domain}/messages`,
        form.toString(),
        {
          auth: { username: 'api', password: apiKey },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          timeout: 10000,
        },
      );

      const messageId = String(data?.id ?? this.generateMessageId());
      this.logger.log(`Mailgun → ${input.recipient} (${messageId})`);
      return this.buildResult(true, messageId);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Mailgun error for ${input.recipient}: ${message}`);
      return this.buildResult(false, null, message);
    }
  }

  async isAvailable(): Promise<boolean> {
    return Boolean(process.env.MAILGUN_API_KEY);
  }
}
