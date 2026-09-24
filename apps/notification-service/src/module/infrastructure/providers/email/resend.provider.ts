import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AbstractProvider } from '../base/provider.abstract';
import type { ProviderSendInput, ProviderSendResult } from '../base/provider.types';

@Injectable()
export class ResendProvider extends AbstractProvider {
  readonly name = 'resend';
  readonly channel = 'email';

  async send(input: ProviderSendInput): Promise<ProviderSendResult> {
    try {
      const apiKey = this.config.apiKey ?? process.env.RESEND_API_KEY;
      if (!apiKey) {
        throw new Error('Resend API key not configured');
      }

      const fromAddress =
        this.config.fromAddress ?? process.env.RESEND_FROM ?? 'no-reply@vubon.com';

      const { data } = await axios.post(
        'https://api.resend.com/emails',
        {
          from: fromAddress,
          to: input.recipient,
          subject: input.subject ?? '(no subject)',
          html: input.bodyHtml ?? input.body,
          text: input.body,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        },
      );

      const messageId = String(data?.id ?? this.generateMessageId());
      this.logger.log(`Resend → ${input.recipient} (${messageId})`);
      return this.buildResult(true, messageId);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Resend error for ${input.recipient}: ${message}`);
      return this.buildResult(false, null, message);
    }
  }

  async isAvailable(): Promise<boolean> {
    return Boolean(process.env.RESEND_API_KEY);
  }
}
