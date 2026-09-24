import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AbstractProvider } from '../base/provider.abstract';
import type { ProviderSendInput, ProviderSendResult } from '../base/provider.types';

@Injectable()
export class BulkSmsBdProvider extends AbstractProvider {
  readonly name = 'bulksmsbd';
  readonly channel = 'sms';

  async send(input: ProviderSendInput): Promise<ProviderSendResult> {
    try {
      const apiKey = this.config.apiKey ?? process.env.BULKSMSBD_API_KEY;
      if (!apiKey) {
        throw new Error('BulkSMSBD API key not configured');
      }

      const from = this.config.fromNumber ?? process.env.BULKSMSBD_SENDER_ID ?? 'Vubon';

      const { data } = await axios.post(
        'https://bulksmsbd.net/api/smsapi',
        null,
        {
          params: {
            api_key: apiKey,
            type: 'text',
            number: input.recipient,
            senderid: from,
            message: input.body,
          },
          timeout: 10000,
        },
      );

      const messageId = String(data?.response_id ?? this.generateMessageId());
      this.logger.log(`BulkSMSBD → ${input.recipient} (${messageId})`);
      return this.buildResult(true, messageId);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`BulkSMSBD error for ${input.recipient}: ${message}`);
      return this.buildResult(false, null, message);
    }
  }

  async isAvailable(): Promise<boolean> {
    return Boolean(process.env.BULKSMSBD_API_KEY);
  }
}
