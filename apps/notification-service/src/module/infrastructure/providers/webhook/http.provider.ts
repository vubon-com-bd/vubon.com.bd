import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AbstractProvider } from '../base/provider.abstract';
import type { ProviderSendInput, ProviderSendResult } from '../base/provider.types';

@Injectable()
export class HttpWebhookProvider extends AbstractProvider {
  readonly name = 'http-webhook';
  readonly channel = 'webhook';

  async send(input: ProviderSendInput): Promise<ProviderSendResult> {
    try {
      const { data, status } = await axios.post(
        input.recipient,
        JSON.parse(input.body || '{}'),
        { timeout: 10000 },
      );
      this.logger.log(`HTTP webhook → ${input.recipient} (${status})`);
      return this.buildResult(true, String(data?.id ?? this.generateMessageId()));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`HTTP webhook error: ${message}`);
      return this.buildResult(false, null, message);
    }
  }
}
