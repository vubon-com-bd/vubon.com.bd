import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AbstractProvider } from '../base/provider.abstract';
import type { ProviderSendInput, ProviderSendResult } from '../base/provider.types';

@Injectable()
export class PostmarkProvider extends AbstractProvider {
  readonly name = 'postmark';
  readonly channel = 'email';

  async send(input: ProviderSendInput): Promise<ProviderSendResult> {
    try {
      const serverToken = this.config.apiKey ?? process.env.POSTMARK_SERVER_TOKEN;
      if (!serverToken) {
        throw new Error('Postmark server token not configured');
      }

      const fromAddress =
        this.config.fromAddress ?? process.env.POSTMARK_FROM ?? 'no-reply@vubon.com';

      const { data } = await axios.post(
        'https://api.postmarkapp.com/email',
        {
          From: fromAddress,
          To: input.recipient,
          Subject: input.subject ?? '(no subject)',
          TextBody: input.body,
          HtmlBody: input.bodyHtml ?? input.body,
          MessageStream: 'outbound',
        },
        {
          headers: {
            'X-Postmark-Server-Token': serverToken,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        },
      );

      const messageId = String(data?.MessageID ?? this.generateMessageId());
      this.logger.log(`Postmark → ${input.recipient} (${messageId})`);
      return this.buildResult(true, messageId);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Postmark error for ${input.recipient}: ${message}`);
      return this.buildResult(false, null, message);
    }
  }

  async isAvailable(): Promise<boolean> {
    return Boolean(process.env.POSTMARK_SERVER_TOKEN);
  }
}
